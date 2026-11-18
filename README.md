# Veteran Assist

Independent Australian DVA field guide. Not DVA. Not Defence.

Changing something? Read [AGENTS.md](AGENTS.md) and [CONTRIBUTING.md](CONTRIBUTING.md) first: pull requests only, and how facts are checked and reported.

## Local development

Needs Node 22 (`nvm use 22`).

```bash
npm install
npm run dev        # http://localhost:8080, uses an embedded in-memory database when DATABASE_URL is not set
npm test           # Node 22 test runner
npm run lint
npm run typecheck
```

Local dev needs no environment variables. Without `DATABASE_URL` the dev server uses an
embedded PGLite database (data is lost on restart). That fallback exists only in dev: a
production build has it removed.

## Deploying

Do not connect this public repository to Vercel, Neon, or any other host. The live site deploys from a separate private copy. A connection writes the hosting account name into public commit checks. Live site: [https://veteranassist.au](https://veteranassist.au). See "Publishing identity" in [AGENTS.md](AGENTS.md).

Vercel Web Analytics (anonymous page views, no cookies) is loaded in production from
`src/routes/__root.tsx`; query strings are stripped before sending. It must be enabled in the
project's Analytics tab. The privacy page describes it.

Already set on Production, and not stored in git: `DATABASE_URL` (Neon, through the
Vercel–Neon integration), `RATE_LIMIT_SECRET`, `FEEDBACK_REVIEW_CODE`.

The built-in AI question tool (Ask, which called xAI) was removed on 20 October 2026 so the site
costs nothing to run and sends nothing to an AI company. `/ask` now redirects to the
"Asking an AI" guide. `XAI_API_KEY` was deleted from Vercel the same day; revoke the key at
console.x.ai if that has not been done.

The Neon integration also adds `POSTGRES_*`, `PG*`, `NEON_*` and `VITE_NEON_AUTH_URL`.
The app reads only `DATABASE_URL`; Neon Auth is not used (login tables were dropped in
migration 0007).

Still to do:

1. When the PayID exists, set `HOSTING_PAYID` and `HOSTING_MONTHLY_TARGET_CENTS`
   (the monthly cost in cents, from 100 to 100000). Both are required before the meter appears.

Checklist:

1. **Framework preset: Other.** Leave Output Directory blank (Nitro writes the Build Output itself).
2. **Region: `syd1`** (already set in `vercel.json` and `vite.config.ts`).
3. **Node.js version: 22.x** (set by `engines` in `package.json`; the Vercel project setting matches).
4. **Build command:** the default, `npm run build` (runs `vite build`, then the database migrations).
5. **Database:** create a Neon Postgres in **ap-southeast-2 (Sydney)**. Use the pooled
   (`-pooler`) connection string.
6. **Environment variables** (names only, never commit values):

   | Name | Scope | Needed | Notes |
   | --- | --- | --- | --- |
   | `DATABASE_URL` | **Production only** | Yes | Neon pooled connection string. |
   | `VITE_PUBLIC_HOSTNAME` | Production | After the domain resolves | `veteranassist.au` (no `https://`). Used for canonical links, `og:url`, `og:image`, `robots.txt` and the sitemap. Leave unset until `https://veteranassist.au` answers, or the live site will advertise an address that does not load. |
   | `FEEDBACK_REVIEW_CODE` | Production | For the keeper inbox | A random string of **24+ characters**. Shorter or unset = inbox stays locked. |
   | `RATE_LIMIT_SECRET` | Production | Recommended | Random string used to hash IP addresses for rate limiting. Falls back to a value derived from `DATABASE_URL`. |
   | `HOSTING_MONTHLY_TARGET_CENTS` | Production | Optional | Monthly target in cents (100 to 100000). With `HOSTING_PAYID` it switches the hosting meter on. Unset = meter hidden and nothing collected. |
   | `HOSTING_PAYID` | Production | Optional | PayID shown on `/hosting`. |
   | `HOSTING_PAYPAL_ME` | Production | Optional | PayPal.me fallback (username only). |
   | `VITE_PRIVACY_CONTACT_EMAIL` | Production | Optional | If set, shown on the Privacy and Terms pages as a contact for deletion requests, privacy questions and reports of a problem. Build-time value: redeploy after changing it. Use a mailbox set up for the site, not a personal address. |
   | `CSP_REPORT_ONLY` | Any | Optional | Set to `1` to send the Content-Security-Policy as Report-Only (roll-back lever). |
   | `DB_POOL_MAX` | Any | Optional | Max connections per function instance. Default 5. |
   | `VITE_GROK_EXTENSIONS` | Never | Leave unset | The grok.com extensions script is off unless this is `1`. Do not turn it on. |

7. **Migrations** run during every build (`scripts/migrate.mjs`), one transaction per file,
   tracked in `_migrations`:
   - A build with no `DATABASE_URL` skips migrations and still publishes. Pages that need the
     database say they are unavailable.
   - A build with `DATABASE_URL` set fails if the database is unreachable or a migration fails.
   - `MIGRATE_STRICT=1` also fails the build when `DATABASE_URL` is missing.

### Preview deployments

`DATABASE_URL` should be scoped to **Production only**, or Preview should get a **separate Neon
branch**. If a Preview deployment can see the production `DATABASE_URL`, every pull request
build will run migrations against the production database.

### Behaviour if configuration is missing

- No `DATABASE_URL`: the site still publishes. Pages that do not need a database load. Feedback
  and the keeper inbox say they are not available.
- No `FEEDBACK_REVIEW_CODE` (or under 24 characters): the keeper inbox is locked.
- No `HOSTING_*`: the hosting meter is hidden and collects nothing.

### Data kept and retention

Feedback notes and hosting references are deleted automatically after 12 months (see
`src/lib/retention.ts`; the privacy page reads the same numbers). Rate-limit counters hold a
keyed hash of the IP address, never the address, and are deleted after about two days.

### Local production check

```bash
VERCEL_ENV=production DATABASE_URL=postgres://... npm run build
npx nitro preview   # or deploy a Preview and test there
```

(`vite preview` does not work with the Nitro build.)
