# Read this before you change anything

This file is for any AI agent (Grok or otherwise) or person working on Veteran Assist. Read all of it, then read [CONTRIBUTING.md](CONTRIBUTING.md). If this file and your own habits disagree, this file wins.

Veteran Assist is an independent plain-English guide to the Department of Veterans' Affairs (DVA) for Australian veterans. Veterans use it while stressed, often with a deadline running. DVA staff and advocates read it too. A wrong date, form or figure can cost someone their right to review, so **being right matters more than being fast, new or polished.**

The aim of this file is that you find problems the way a careful reviewer would, fix them completely, and say honestly what you did and did not check.

---

## Publishing identity

This repository is public. The publisher is not named. Read this before any commit, pull request, or hosting change. If it conflicts with "pull requests only" below, this section wins.

- The only allowed Git author and committer is `Veteran Assist <358109600+veteran-assist@users.noreply.github.com>`. Set both name and email to that before you commit. Then run `git log --format='%an <%ae> | %cn <%ce>'` and stop if any other name or email appears.
- Do not commit a personal name, a personal email, a Gmail address, or a GitHub noreply address that contains a personal username. Do not write any of those into a file, a commit message, a workflow, or this document. Do not add them in order to warn about them.
- Do not use the GitHub website editor while signed in as a personal account. GitHub records that account on the commit.
- Do not open a pull request, push, or merge while authenticated as a personal GitHub account. The pull request author, the Actions run, and the push event show that username to anyone. If that is the only access you have, stop and tell the owner. Do not push "just this once".
- Do not import, rebase onto, or push history from any other repository. This history starts at one commit. Add new commits on top of it only.
- Do not connect this repository to Vercel, Neon, or any other host. The live site deploys from a separate private repository. A connection writes the hosting account name into public commit checks. Do not create or pay for a hosting team to get around this.
- Do not add a legal name, a billing email, a domain registration record, or an account username to the site or the repository.
- If you find any of those already present, do not copy them into a new file. Say so and stop.

---

## 1. The six rules that matter most

1. **Pull requests only. Never push to `main`.** Pull the latest `main`, make a branch, open a pull request, wait for CI. A direct push fails the "Direct push alarm" and emails the person who pushed. Seven direct pushes on 26 and 29 October 2026 shipped a dead form link and a broken regex because no check ran on them.
2. **Your memory is out of date.** DVA changed a great deal on 1 July 2026 (see section 6). Never state a figure, deadline, form number, law or office-holder from memory. Open the official page, today, and read it.
3. **"Checked" means you opened the page.** A search result snippet, a timeout, a 403, or "it looked right" is not a check. If you could not open it, say so and leave the content as it was, or mark it unverified.
4. **A fact lives in many places. Fix every one.** When the OAIC clock was wrong (30 days instead of 60), it was wrong in five places: the FOI guide, the deadline calculator, the glossary, the Pathfinder and a playbook. Fixing one and stopping leaves the site contradicting itself. See section 4, step 5.
5. **Say what you did not verify.** Every report ends with what is unchecked, what rests on a source you could only partly read, and what a human should confirm. Do not invent confidence ratings or percentages. Name weak points directly.
6. **Keep the promises.** No accounts, no tracking cookies, no AI keys, no paid services, nothing sent to an AI company, no secrets in the repo. The site must cost nothing to run. See section 9.

---

## 2. Before you start

```bash
git checkout main && git pull
git checkout -b <short-topic-branch>      # one topic per branch
```

Then read, in this order:

- [CONTRIBUTING.md](CONTRIBUTING.md): the rules in short form.
- `SOURCE_WATCH_RULES` at the bottom of `src/content/source-watch.ts`: the content policy.
- The files for the area you are about to touch (section 3).

Check what already changed recently, so you do not undo someone's fix or repeat it:

```bash
git log --since="14 days ago" --format='%h %an %ad | %s' --date=short
```

If your tools cannot reach the package registry or a site, say so. Do not work around a block (no mirrors, no caches, no invented stand-ins).

---

## 3. Where things live

| Area | Files |
| --- | --- |
| Guides (22) | `src/content/guides.ts`. Each has `updated`, `lastChecked`, `officialLinks`, `blocks`. |
| Letters, playbooks | `src/content/letters.ts`, `src/content/playbooks.ts` |
| Deadline calculator | `src/content/deadlines.ts`, `src/routes/deadlines.tsx` |
| Impairment calculator | `src/routes/calculator.tsx`, `src/lib/wpi.ts` |
| Dollar figures | `src/content/rates.ts` (MRCA rates, quoted from one place) |
| DVA wait times | `src/content/processing-times.ts`, `src/components/wait-banner.tsx` |
| Pathfinder (the questions flow) | `src/content/pathfinder.ts`, `src/routes/pathfinder.tsx` |
| Glossary | `src/content/glossary.ts` |
| Forms page | `src/content/forms.ts`, `src/routes/forms.tsx`, `src/components/linkify.tsx` |
| Contacts and links | `src/content/resources.ts`, `src/content/people.ts`, `src/content/postcode/` |
| What changed on 1 July 2026 | `src/routes/transition.tsx` |
| Front page | `src/routes/index.tsx`, `src/components/recent-changes.tsx`, `src/content/recent-changes.ts` |
| Site search | `src/content/search.ts` (its own text; it can contradict a guide) |
| Source watch (what the weekly check covers) | `src/content/source-watch.ts` |
| Freshness notice | `src/lib/freshness.ts`, `src/components/stale-notice.tsx` |
| Layout | `src/components/layout/` (header, footer, bars) |
| Tests | `scripts/*.test.mjs`. CI runs `npm test`. |

Workflows are in `.github/workflows/`: `ci.yml` (lint, types, tests), `links.yml` (external links; fails only on 404 or 410), `direct-push-alarm.yml`.

---

## 4. The method: find it, prove it, fix it everywhere, show your working

This is the loop to follow for every fact check, bug or content change.

### Step 1. Sort the claim

- **Stable**: how a process works, what to do first, what a term means. Explain it. Link the official page.
- **Volatile**: a rate, a wait time, a phone line or hours, a deadline, a form number, an office-holder, a law section. It needs an "as at" date, or replace it with a link and one line. If a number does not help the reader decide anything, drop it.

### Step 2. Open the official page

- DVA, state government, OAIC and legislation sites often refuse automated fetching. Use a real browser if you have one. A refusal is not a result.
- Read the page itself, including "Last updated". If the page says something different from the site, the official page wins. This site yields.
- For a PDF form: open the URL, check that it loads, and check that its title and form number match what the site says. A 404 or a title mismatch is a finding. Also open DVA's own claim or "how to claim" page to see whether the form is still the current route.
- For legislation: read the section, not a summary. If you can only see a secondary source, say so ("rests on OAIC's published table; the Act's own section was not read").
- Record what you read: the URL, the page's own "last updated" date, and the exact figure or wording.

### Step 3. Compare, and look for the second-order problem

Ask what else the page implies that the site gets wrong. Examples that have happened here:

- A figure matched, but the site's explanation of who it applies to was out of date.
- A link pointed at the wrong Act. The identifier looked plausible and was a different law.
- A form was listed as a way to make a claim that DVA no longer accepts.
- A form is "paper" only when you are not using an advocate. An advocate's claim must be lodged online.
- A clock ran from a different event than the site said (notice of decision versus date of decision).

### Step 4. Decide what to do with what you cannot prove

If DVA's pages disagree with each other, or you cannot read the source, do not pick the answer you prefer. Keep the safer wording, say it is unverified, and put the open question in your report.

### Step 5. Find every place the fact appears

Search the whole `src/` tree, using several phrasings of the fact, not just the exact string:

```bash
grep -rniE "oaic|60 days|30 days" src
grep -rn "D2051" src
```

Check all of these surfaces for the same fact: guides, `deadlines.ts`, `glossary.ts`, `pathfinder.ts`, `playbooks.ts`, `letters.ts`, `resources.ts`, `search.ts` (the search index text), `transition.tsx`, `index.tsx`, the calculator pages, and `recent-changes.ts`. Make them say the same thing, in the same words where possible.

### Step 6. Make the smallest change that fixes it

- Change only what you verified.
- **Link before new text.** When a reader's question is already answered by a guide, the fix is search wording (`src/content/search.ts`) or a link, not a new paragraph. Check coverage first: grep `src/content` for the topic and its synonyms. Add new text only where DVA publishes the answer and no page here says it, and then keep it to a paraphrase of the official page with its date and link. Where DVA publishes nothing, say so. Do not add pages, components or routes to cover a gap unless the owner agrees. Every new fact needs a `source-watch.ts` entry, so add only what can be kept checked.
- Read the content-gaps log with suspicion: entries go stale. Several items logged as gaps (flights and accommodation, MEPI processing time) were already in the guides.
- Keep Australian English and plain words. Say what to do first. Never describe a claim as likely to succeed.
- Update `lastChecked` only on the item you actually re-read, and only to the day you read it. **Never stamp the whole site with one date.** `publishedOn`, `asAt` and `pageUpdated` are the official page's dates, not yours.
- A figure that does not match: change it, set its date, and make sure the source is in `source-watch.ts`.
- A new form or official link: add it to `source-watch.ts` (the test fails if a form PDF is missing). A new guide with outside facts needs an official `https` link in `officialLinks` that is also in `source-watch.ts`.
- Add a one-line entry to `src/content/recent-changes.ts` for a change readers would care about (newest first, the date it shipped).

### Step 7. Prove it, and guard it

- Run `npm run lint`, `npm run typecheck`, `npm test`. If you cannot install dependencies, say so; CI will run them.
- A bug that slipped through means a test was missing. Add one in `scripts/` (see `forms.test.mjs`, `freshness.test.mjs` for the pattern). Example: the form-linking regex broke on 29 October and nothing tested it.
- There is no hosting preview on this public repository. Do not connect one. Check locally, or say that you did not look at a preview. See "Publishing identity" above.

---

## 5. Pull requests

- One topic per pull request. Several fixes are fine if they are one theme (for example "forms review"), not a grab-bag.
- The description says what changed and **which official page each fact came from**, with that page's date. It lists what you checked, what you did not, and what remains uncertain.
- CI must pass. If it fails, read the failure and fix it. Do not merge around it.
- The person who runs the site merges. Do not merge your own pull request, force-push over someone else's work, or delete branches you did not create.

---

## 6. Facts that have already caught people out (verified 25 to 30 October 2026)

These are here so you do not repeat them. They can change. Re-open the official page before relying on any of them.

- **1 July 2026:** the VETS Act closed the VEA and DRCA to new rehabilitation and compensation claims. New claims go under an improved MRCA, using GARP M for impairment. Existing payments continue. Do not assume other VEA benefits closed too: DVA still publishes the Service Pension forms (D0503, D0504, D0507) and the funeral benefit form (D0307), so check each benefit on its own DVA page. Form D2582 (VEA compensation claim) was withdrawn and the site removed it on 30 October 2026.
- **Paper claims:** D2051 (with D2049 attached) is the MRCA paper claim, and only for people not using an advocate. If an advocate helps, the claim must be lodged online in MyService. D2053 is for dependants.
- **OAIC review of an FOI decision:** 60 days after written notice of an access refusal or charge decision; 30 days if you object to access being given to someone else. OAIC does not publish a shorter limit for an internal review decision, so say to lodge as soon as you can. The decision letter is the clock. Applying for internal review is a separate, shorter step (in writing within 30 days of the decision). The claim that the OAIC window after internal review is "60 days" rests on OAIC's published table. The Act's section itself was not read. Keep that caveat visible.
- **AHRC complaint:** 60 days from the termination date, with the court's permission needed in some cases.
- **SRDP:** being eligible is not the same as accepting. The election is 12 months from the written offer and cannot be undone.
- **Review limits:** most compensation decisions made from 21 April 2025 go to the VRB within 12 months. VEA pension rate and attendant allowance are 3 months. Always check the letter.
- **Wait times:** DVA publishes figures per stream and does not publish one grand total. The site's headline total is the sum of four streams and says so. Keep it like-for-like and keep the note.
- **Legislation links:** check that a legislation.gov.au identifier is the Act you mean. A wrong one looked right and was a different law.
- **MRCA dollar rates** are quoted only from `rates.ts`. Never type a rate into a guide.
- **DVA's site blocks automated fetching**, and PDFs do not return page text. Read them in a browser; the document title is a quick check that it is the right form.

---

## 7. Layout and design rules

- **Type scale.** Reading text is `type-body` (17px, defined in `src/styles.css`). Notes and captions are `text-sm`. Small labels are `text-xs`. Page titles are `text-4xl` on every page, phones included. Page intro lines are `text-lg`. Do not invent one-off sizes (`text-[1.05rem]` and similar), and do not change size at a breakpoint inside reading text.
- **Phones first.** Most veterans arrive on an iPhone. Check key pages at 390px wide. Nothing scrolls sideways. Tap targets are at least 44px high.
- **Print.** The call sheet prints on A4 as two pages. If you touch it, check print.
- **Southern Cross.** It is decorative only (`aria-hidden`). It is not the flag and not an official mark. Do not add the Commonwealth Star, the flag, DVA or Defence logos or colours, or anything that could make the site look like DVA.
- **Colour and contrast.** Use the existing colour tokens. Keep text readable on its background.
- **Independence.** "Independent of DVA and Defence" stays visible. Do not write copy that implies DVA endorses the site.

---

## 8. Checking your work for real

1. **Preview:** this public repository has no hosting preview. Do not connect Vercel or any other host to get one (see "Publishing identity"). Check the pages you can run locally, at phone width and desktop width, and say what you looked at. If you could not run it, say that.
2. **After the merge:** the live site can show an old cached page for a while. Add a cache-buster (`?v=2`) when you look. Confirm the change is live, not just merged.
3. **For a full site check:** every guide, letter, playbook and static page loads. A nonexistent address shows the "Page not found" page. External links: CI's `links` run shows broken links and lists the ones needing a manual look. Console errors. Phone layout of the pages you touched. Report which of these you did and which you did not.
   A full-spectrum check also runs every week as a scheduled task (Mondays, Sydney time). It reads the live site, tries the calculators, compares the privacy page with the code, scans for advice-style wording, and re-reads the sources in `source-watch.ts`. It opens a pull request only for facts the official pages changed (branch `watch/YYYY-MM-DD`); everything else it reports to the owner. Review its pull requests like any other (section 5).
4. **Reviewing someone else's changes** (Grok's or mine): list the commits (`git log`), open each diff, and check each factual line against its official page. Check whether each commit came through a pull request (`gh api repos/<owner>/<repo>/commits/<sha>/pulls`) and whether CI ran. Open every new link. Search for the same fact elsewhere in `src/`. Report by severity: wrong on the live site now; smaller problems; confirmed fine; process.

---

## 9. Promises the site keeps (never break these)

- It costs nothing to run. No paid services, no AI keys, nothing sent to an AI company. Do not add a feature that needs one.
- No accounts. No tracking cookies. Analytics are anonymous page views with query strings removed. The privacy page must stay accurate. If you change what the site collects or sends, update `/privacy` and the terms in the same pull request.
- No secrets in the repo, in a commit message, in a pull request, in logs or in chat. `DATABASE_URL`, `RATE_LIMIT_SECRET` and `FEEDBACK_REVIEW_CODE` live in Vercel only. Never ask for, print, store or paste the feedback review code.
- Do not use someone's personal credentials for anything beyond the task. Do not create accounts or connect new paid services.
- Feedback left through the site is the visitor's. Do not copy it anywhere.
- Do not give legal, financial or medical advice, and do not describe a claim as likely to succeed. The site says it is not a law firm and not an ATDP practice. Keep that true. The full set of legal guardrails is in section 13.

---

## 10. How to report

Use this shape, in plain words. Keep it short.

1. **What I changed**, one line each, with the pull request link.
2. **What I verified, and against what.** Official page, the page's own date, what it said.
3. **What I did not verify**, and why (blocked page, could not read the Act, could not install, did not look at phone width).
4. **Weak points and open questions** for a human.
5. **Anything surprising.** For example: a commit that bypassed a pull request, a new claim that contradicts another page, or a dead link.

Rules for the report:

- Do not say "verified", "confirmed" or "all good" unless you opened the source.
- No invented confidence scores, percentages or estimates you cannot support.
- If you made a mistake, say so plainly, say what it affected, and fix it.
- If an earlier answer of yours turns out wrong, correct it before moving on.

---

## 11. When to stop and ask a human

Stop and ask instead of guessing when:

- two official pages disagree, or you cannot tell which Act applies;
- the change would alter what the privacy page says, add a service, or cost money;
- the change affects whether the site looks like DVA, or touches branding;
- a figure or deadline cannot be verified but the site currently states it confidently;
- an action cannot be undone (deleting data, changing settings, anything in Vercel, Neon or GitHub settings).

---

## 12. Quick checklist before you open a pull request

- [ ] Branch from the latest `main`. Not pushing to `main`.
- [ ] I opened every official page I relied on, today, and noted its own date.
- [ ] I searched all of `src/` for the same fact and fixed every copy (guides, deadlines, glossary, Pathfinder, playbooks, letters, resources, search index, transition, front page).
- [ ] New forms and links are in `src/content/source-watch.ts`. New guide facts have an official link in `officialLinks`.
- [ ] `lastChecked` changed only on items I re-read.
- [ ] Lint, types and tests pass (or I said I could not run them).
- [ ] I added or updated a test if a bug slipped through.
- [ ] Checked the preview at phone width and desktop width.
- [ ] No secrets, no new tracking, no new paid service, privacy page still accurate.
- [ ] My description lists sources, what I did not verify, and open questions.
- [ ] Legal guardrails (section 13) respected: no advice-style wording, disclaimers intact, no copied DVA text, no accusations, nothing that changes what the privacy page must say.

---

## 13. Legal guardrails

The person who runs this site is not a lawyer, and no solicitor has reviewed the site. Veterans rely on it while under pressure. These rules lower the risk to readers and to the publisher. They are working rules, not legal advice. `/terms` and `/privacy` still need a solicitor's review, and you must not tell anyone they have had one.

**Information, not advice**

- The line: **information** says what a rule, form, deadline or DVA process is, what options exist, and what DVA's own pages say people can do. **Advice** says which option a person should choose, how to argue their case, what to say to a delegate or assessor, whether to sign or accept something, or what DVA will "try". Information stays. Advice goes.
- Write "the rule is…", "DVA's page says…", or "a written question can ask DVA for…". Do not write "you should appeal", "you are entitled", "DVA must", "do not sign", "do not tough it out", "the highest-leverage move" or "get it in writing before you cancel".
- Plain procedure is fine when it is DVA's own process: "the claim form is D9319, emailed to hhs@dva.gov.au". Safety lines are fine: crisis numbers, "do not paste your file into an AI", "do not share your MyService login".
- Never write a quantifier you cannot source ("most veterans never claim it", "the usual fight"). If DVA does not publish the figure, leave the claim out.
- The Pathfinder's "Next steps" and `transition.tsx`'s "Asking DVA" blocks list steps in DVA's process and templates for written questions. Keep them in that form.
- Never promise or predict an outcome ("you will win", "this will be approved"). The AI guide already tells readers to ban those phrases. Hold the site to the same standard.
- Every page that gives a time limit must send the reader to their decision letter as the clock. Never say or imply that a person's deadline can be extended, or has passed.
- Calculators and tools give an estimate from what the visitor typed. Keep the "estimate, not an entitlement" wording on them.

**The protections stay**

- Do not remove, shorten or soften the footer disclaimer, the Australian Consumer Law box on `/terms`, the "not a law firm / not an ATDP practice" wording, the solicitor note, or the "estimate, not an entitlement" lines. `scripts/legal.test.mjs` fails if key ones go. If you think one is wrong, stop and ask (section 11).
- Do not write a total waiver of liability or of Australian Consumer Law rights. Keep the "where the law allows" form.
- When you change `/terms` or `/privacy`, update the "Last updated" date, say in the pull request what changed in plain words, and say that a solicitor has not reviewed it.

**Other people's material**

- DVA's main website copyright notice (read 30 October 2026) lets people reproduce its material in unaltered form for personal, non-commercial and educational use and reserves all other rights. So paraphrase in our own words and link to the source. Do not paste DVA paragraphs, forms, images or logos into the site. Quote only the few words you need, and name the source. For legislation, give the section number and link; do not paste whole sections.
- Never use the Commonwealth coat of arms, DVA or Defence logos, or wording that suggests the site is part of DVA or endorsed by it (see section 7).

**What the site says about people and DVA**

- Do not state as fact that DVA, a person or a company acted unlawfully, dishonestly, negligently or in bad faith. Report what the official record says, with its source and date.
- Name office-holders only by their official role, from an official page (`people.ts`). Do not name private individuals, including veterans, advocates, lawyers or providers, and do not rate or recommend a fee-charging provider.
- Do not add testimonials, reviews or "veterans say" quotes unless they are real, permitted and cannot identify anyone. Do not invent usage figures for the site.

**Money and advocacy**

- The site is free information. Do not add anything that charges for, sells or promises help with a claim, or takes payment tied to an outcome. Do not describe the publisher as an advocate.
- The Commonwealth has consulted on regulating fee-charging veteran advocacy (DVA consultation paper, 9 February 2026). It was a consultation, and as far as we know it is not yet law. Ask the owner before adding anything about money.
- Hosting contributions are voluntary and buy nothing. Any change to the hosting wording or flow is the owner's decision. Tax, ABN and business-name questions are still open.

**Privacy and accessibility**

- The privacy page must match the code. If you change what is collected, stored, or sent anywhere, or add a service, script, font, embed or widget, stop and ask first (section 11), and update `/privacy` in the same pull request.
- Keep the site usable by keyboard and screen reader (labels, focus, contrast). Do not claim a conformance level that has not been audited.

**If a legal issue turns up**

- If feedback or a complaint raises copyright, defamation, privacy or a takedown, do not reply for the site and do not copy the feedback anywhere. Tell the owner.
