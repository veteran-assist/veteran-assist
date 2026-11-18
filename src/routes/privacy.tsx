import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalNotice, SolicitorNote } from "@/components/legal-notice";
import { pageTitle } from "@/lib/brand";
import { contactEmail } from "@/lib/contact";
import { FEEDBACK_RETENTION_MONTHS, HOSTING_RETENTION_MONTHS } from "@/lib/retention";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: pageTitle("Privacy") },
      {
        name: "description",
        content: "What Veteran Assist stores, what stays in this browser, how long things are kept, and how to ask for deletion.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-3 text-lg font-semibold leading-7 text-ink">
        Veteran privacy is the design constraint, not a slogan. This page says what actually
        happens — including the limits. We will not pretend a browser is a vault.
      </p>
      <p className="mt-2 text-sm text-muted">Last updated 18 November 2026.</p>
      <LegalNotice title="Do not send us your file." className="mt-6">
        <p>
          Do not type claim numbers, names, dates of birth, addresses, or diagnoses into
          Feedback. Letters stay in this browser. You copy them. You send them. We never lodge.
        </p>
      </LegalNotice>
      <SolicitorNote className="mt-4" />

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What we do not keep</h2>
        <p>
          Veteran Assist does <strong>not</strong> store letters, Pathfinder answers, search queries, the
          WPI calculator, Deadlines dates, the postcode lookup, or My file notes on our servers. Those run in your browser. Closing the tab
          (or wiping My file) removes them from this site’s reach. We do not sell data. We do not run
          ads. We do not use tracking cookies.
        </p>
        <p>
          My file is a notepad in this browser only. Default: it clears when the browser session
          ends. If you tick “keep on this device”, it sits in this browser’s storage on this
          computer until you wipe it. Anyone who can unlock this device and this browser profile
          can read it. Do not use that option on a shared or work computer.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What is stored on our servers</h2>
        <p>Only these things are stored on the server, and only in the cases described:</p>
        <ul className="space-y-2">
          <li className="border-l-2 border-forest/40 pl-4">
            <strong>Feedback you choose to send.</strong> If you tap Send on a feedback note, we
            store the note, the kind of note, the page you were on, the time, and the email only if
            you chose to add one for a reply. Do not include claim numbers, names, or medical
            detail.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            <strong>Hosting references, if a hosting meter is switched on.</strong> If you generate
            a reference to chip in toward hosting, we store the amount, the month, the reference and
            the time. No name, and no claim number. The PayID you pay from stays with your bank.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            <strong>A rate-limit counter.</strong> To stop automated abuse of Feedback and the
            hosting reference tool, we keep a count against a scrambled one-way code made from your
            IP address (for a newer IPv6 address, from its network half). The IP address itself is
            not stored. A counter is deleted once it is two days old, the next time anyone uses
            Feedback or the hosting reference tool.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            <strong>Standard server logs.</strong> Our hosting provider, Vercel, records basic
            request details such as IP address, time and page for security and operations, under
            its own policy.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            <strong>Anonymous visit counts.</strong> We use Vercel Web Analytics to count how many
            people use the site and which pages help most: the page, the site that linked you here,
            your rough location (country, state and city), and the type of device and browser. It
            sets no cookies, and it does not identify you, follow you to other sites, or record
            anything you type into a form. Vercel tells visitors apart with a code worked out from
            the request and discards it after 24 hours, so a visit cannot be linked to you or to
            another day. The part of the address after a “?” (where the Deadlines tool can put a
            letter date and the postcode lookup a postcode) is removed before anything is sent.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Who holds it, and where</h2>
        <p>
          Veteran Assist is published by an Australian veteran who is not named on the site. The
          Privacy Act 1988 does not apply to every small operator, so we do not rely on it to
          protect you. We have set the site up to collect as little as possible, to say plainly what
          we keep, to keep it for a limited time, and to delete it when asked.
        </p>
        <p>
          Feedback notes and hosting references are stored in a database in Sydney, run by Neon on
          Amazon Web Services. The site’s own code also runs in Sydney, on Vercel. Neon and Vercel
          are United States companies. Vercel’s network can deliver pages, and process request logs
          and visit counts, from servers outside Australia, under Vercel’s own policy.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">No AI on this site</h2>
        <p>
          Veteran Assist does not send anything you type to an AI company. It used to have a
          built-in question tool; that was removed on 20 October 2026. If you use your own AI, the{" "}
          <Link
            to="/guides/$slug"
            params={{ slug: "asking-an-ai" }}
            className="font-semibold text-forest underline underline-offset-2"
          >
            Asking an AI guide
          </Link>{" "}
          has a prompt to paste. What you type there is governed by that company, not by us, so
          leave out your name, claim number, date of birth, address and medical file.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">No accounts, no third-party scripts or fonts</h2>
        <p>
          There is no sign-in and no account. You cannot create one. Guides, letters, Pathfinder,
          the calculator, Deadlines, the postcode lookup and My file all work without an identity.
        </p>
        <p>
          The pages load no advertising scripts and nothing from another company’s servers. The one
          analytics script (anonymous visit counts, described above) is served from this site’s own
          address, and the fonts are served from this site, not from Google or any other font
          service. Links to dva.gov.au and other
          sites only leave this site when you tap them.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">How long we keep things</h2>
        <ul className="space-y-2">
          <li className="border-l-2 border-forest/40 pl-4">
            Feedback notes (and any email on them): deleted automatically after{" "}
            {FEEDBACK_RETENTION_MONTHS} months. The clean-up runs whenever a feedback note is sent or the keeper opens the inbox.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Hosting references: deleted automatically after {HOSTING_RETENTION_MONTHS} months.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Rate-limit counters: deleted once they are two days old, the next time anyone uses
            Feedback or the hosting reference tool.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Server logs held by Vercel follow Vercel’s own retention.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Ask to see, correct or delete something</h2>
        <p>
          If you left an email on a feedback note and want the note deleted sooner, send a new note
          through{" "}
          <Link to="/feedback" className="text-forest underline">
            Feedback
          </Link>{" "}
          saying “please delete my earlier note” and put the same email in the email box so it can
          be matched.
          {contactEmail ? (
            <>
              {" "}
              You can also email{" "}
              <a className="text-forest underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </>
          ) : null}{" "}
          A note sent without an email cannot be matched to you, so we cannot find it to delete it
          before the {FEEDBACK_RETENTION_MONTHS}-month limit. That is another reason to keep
          feedback free of personal detail.
        </p>
        <p>
          The same route works if you want to see, or correct, a note you left with your email on
          it.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Who is responsible for this site</h2>
        <p>
          The publisher is not named, by choice, because they have their own live matters with DVA.
          Accountability runs through the{" "}
          <Link to="/feedback/inbox" className="text-forest underline">
            Site keeper inbox
          </Link>
          , which is read by the publisher.
        </p>
        <p>
          To see, correct or delete a feedback note, send a request through{" "}
          <Link to="/feedback" className="text-forest underline">
            Feedback
          </Link>
          . The publisher reads that request in the Site keeper inbox. How to match a note is set
          out above.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Automated decisions</h2>
        <p>
          This site does not use any computer program to make, or help make, decisions about people.
          Pathfinder, the WPI calculator, Deadlines and the letter tools run in your browser. They
          give general information only. They do not use or keep your personal information on our
          servers.
        </p>
        <p>
          From 10 December 2026, organisations covered by the Privacy Act must describe such
          automated decisions in their privacy policy. This site has none to describe.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">If you are unhappy</h2>
        <p>
          If you think we have mishandled something you sent us, tell us first through{" "}
          <Link to="/feedback" className="text-forest underline">
            Feedback
          </Link>
          {contactEmail ? (
            <>
              {" "}
              or by email to{" "}
              <a className="text-forest underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </>
          ) : null}
          . Say what happened and when, without claim numbers or medical detail. You can also
          contact the Office of the Australian Information Commissioner at{" "}
          <a className="text-forest underline" href="https://www.oaic.gov.au/">
            oaic.gov.au
          </a>
          . It can act only where the Privacy Act applies, which is for it to decide.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What we built so this is harder to exploit</h2>
        <ul className="space-y-2">
          <li className="border-l-2 border-forest/40 pl-4">
            Claim notes are not written to a database, so they are not on our servers to be
            stolen.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Letter fields never submit to us. Copy them yourself. Autocomplete is off on those
            forms so the browser is less likely to hoard claim numbers.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Feedback blocks claim-style numbers, dates of birth, and addresses. It is stored only
            if you tap Send, and is deleted automatically after the period above.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Pages send no referrer to other sites, and cannot be shown inside another site’s frame.
            Camera, microphone, and location are disabled.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Official DVA forms download from dva.gov.au. We do not host a copy of your completed
            form.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What we cannot promise</h2>
        <p>
          This is a website. We take reasonable steps to protect what we do store, but no website
          can promise it will never be breached. Your device, your browser, your network, and a
          screen-reader or shared computer are outside our control. Do not type secrets into a
          machine you do not trust. For live claims, keep the real file in paper or a folder you own, and use an{" "}
          <a className="text-forest underline" href="https://www.advocateregister.org.au/">
            ATDP-accredited advocate
          </a>{" "}
          if you can.
        </p>
        <p>
          Veteran Assist is not DVA and is not a health service. If you are in crisis:{" "}
          <a className="font-semibold text-forest underline" href="tel:1800011046">
            Open Arms 1800 011 046
          </a>{" "}
          or 000.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link to="/file" className="underline">
          Wipe My file
        </Link>
        {" · "}
        <Link to="/about" className="underline">
          About
        </Link>
        {" · "}
        <Link to="/terms" className="underline">
          Terms of use
        </Link>
        {" · "}
        <Link to="/" className="underline">
          Home
        </Link>
      </p>
    </main>
  );
}
