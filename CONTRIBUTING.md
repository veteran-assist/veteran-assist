# Working on Veteran Assist

**AI agents and anyone doing a review or fact-check: read [AGENTS.md](AGENTS.md) first.** It has the full method, the places a fact hides, the mistakes already made, and how to report. This file is the short version.

For anyone changing this repo, human or AI. The site is read by veterans and checked by DVA staff, so a wrong figure does real harm.

## How changes get in

1. Pull the latest `main` first. Make a branch. Never push to `main` directly.
2. Open a pull request. CI must pass (`checks`: lint, types, tests). `links` runs weekly and on PRs.
3. One topic per pull request. Say what changed and which official page each fact came from.
4. A push to `main` without a pull request fails the "Direct push alarm" run and emails the person who pushed. This repo is private on the free plan, so GitHub cannot block the push. The alarm is how it is noticed.

## Facts

- Explain what stays stable (how a process works, what to do first, what a term means). Link the official page for it.
- A figure that changes (a rate, a wait time, phone hours, a deadline) needs an "as at" date, or a link and one line instead.
- Do not invent legislation, form numbers, rates or processing times. If an official page does not say it, mark it unverified or leave it out.
- Open the official page before you change a figure or a guide's `lastChecked`. A timeout or a 403 is not a check. Do not stamp the whole site with one date.
- `publishedOn`, `asAt` and `pageUpdated` are the official page's dates, not the day you checked.
- Before you add a form or link, open it on DVA's site and check the title, that it loads, and that it is still current (DVA closed the VEA to new compensation claims on 1 July 2026, so a form that was right last year can be withdrawn). Add it to `src/content/source-watch.ts`.
- DVA's site blocks automated fetching. Read pages in a real browser.
- Every guide with outside facts needs an official `https` link in `officialLinks` that is also in `src/content/source-watch.ts`. `scripts/freshness.test.mjs` enforces this. A guide not re-checked for 60 days shows readers a "Not checked recently" notice.

## Writing

Australian English. Plain words a veteran who has never lodged a claim can follow. Say what to do first. Do not describe a claim as likely to succeed.

## Promises this site keeps

- It costs nothing to run and sends nothing to an AI company. No AI keys, no paid services.
- No accounts, no tracking cookies. Analytics are anonymous page views with query strings removed. The privacy page must stay accurate.
- No secrets in the repo. `DATABASE_URL`, `RATE_LIMIT_SECRET` and `FEEDBACK_REVIEW_CODE` live in Vercel.

## Before you open the pull request

```bash
npm run lint
npm run typecheck
npm test
```

More detail on checking facts is in `src/content/source-watch.ts` (`SOURCE_WATCH_RULES`).
