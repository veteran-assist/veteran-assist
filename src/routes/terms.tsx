import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalNotice, SolicitorNote } from "@/components/legal-notice";
import { pageTitle } from "@/lib/brand";
import { contactEmail } from "@/lib/contact";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [{ title: pageTitle("Terms of use") }],
  }),
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms of use</h1>
      <p className="mt-3 text-lg font-semibold leading-7 text-ink">
        Veteran Assist is a free field guide. It is not a firm, not a service you hire, and not
        DVA. These terms apply when you use the site. If you do not agree with them, please do
        not use it.
      </p>
      <p className="mt-2 text-sm text-muted">Last updated 30 October 2026.</p>

      <LegalNotice title="Australian Consumer Law is not excluded." className="mt-8">
        <p>
          Nothing on this page excludes, restricts, or modifies a consumer guarantee, right, or
          remedy under the Australian Consumer Law that cannot lawfully be excluded. We do not write
          a total waiver.
        </p>
        <p>
          Where those guarantees apply and we are liable, our liability is limited, where the law
          allows, to supplying the information again.
        </p>
      </LegalNotice>
      <SolicitorNote className="mt-4" />

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What this site is</h2>
        <p>
          Independent, unpaid information written by an Australian veteran from public legislation,
          DVA pages, and hard-won process knowledge. The point is to make claims, reviews, FOI,
          hardship, household services, and complaints less daunting — so you can navigate them
          yourself or take a clearer brief to an advocate.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What this site is not</h2>
        <ul className="space-y-2">
          <li className="border-l-2 border-forest/40 pl-4">
            Not legal advice. Not a law practice. Nothing here creates a solicitor–client
            relationship.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Not financial, tax, or superannuation advice. Not a financial services licensee.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Not clinical, medical, or counselling advice. Open Arms and your treating
            practitioners are the clinical channel.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Not an ATDP advocate acting for you, not an ex-service organisation, not DVA, not
            Defence, not the Ombudsman, and not the OAIC.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            Not a place that lodges claims, FOI requests, reviews, or complaints on your behalf.
            You copy, check, and send.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Your claim stays yours</h2>
        <p>
          Time limits, eligibility, and rates live on your decision letter and on official pages.
          If this site and the letter disagree, the letter and the law win. Missing a review
          window, sending an incomplete form, or relying on a page that has gone stale is a risk
          you carry — not a retainer with us. Use an{" "}
          <a className="text-forest underline" href="https://www.advocateregister.org.au/">
            ATDP-accredited advocate
          </a>{" "}
          or a lawyer on a live or time-critical matter if you can.
        </p>
        <p className="font-semibold text-ink">
          If a deadline is close, or may already have passed, do not wait on this site. Check your
          decision letter and ask DVA, an advocate, or a lawyer now. This site cannot tell you
          whether a time limit has been missed, or whether it can be extended.
        </p>
        <p>
          Letter templates are starting points. You must check names, dates, claim numbers, and
          facts before you send them. Pathfinder is a sequence, not a decision. The calculators
          and the Deadlines tool give estimates from the numbers you type in; DVA’s own figure or
          date is the one that counts.
          Guides summarise public rules; they are not a substitute for the Act, the instrument, or
          the page on dva.gov.au.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Accuracy and change</h2>
        <p>
          We take care, and we correct mistakes when veterans tell us. Legislation, GARP M, rates,
          forms, and DVA practice still move. A page dated August 2026 can be wrong in September.
          Official sources and your file override this site. Where an argument is contested, we
          try to put both sides on the same page — that is not a promise that either side will
          win.
        </p>
        <p>
          Each guide shows when it was last checked against the official page. That is the day
          someone last looked, not a promise that nothing has changed since.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Other people’s sites and forms</h2>
        <p>
          Links to DVA, MyService, the VRB, ART, OAIC, Ombudsman, legislation, and PDF forms go to
          those organisations. We do not control them. Commonwealth forms stay Commonwealth
          copyright; we link, we do not host a filled copy of your form. If a link is dead, that
          is not a DVA decision about your claim. A link is a pointer, not an endorsement.
        </p>
        <p>
          If you use an AI tool, as the Asking an AI guide describes, its answers are not ours and
          can be wrong. This site does not run one.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Hosting the site</h2>
        <p>
          If an optional hosting contribution is open, it is voluntary and goes toward running
          costs. It does not buy advice, a claim, a faster answer, or a professional relationship.
          Collection stops when that calendar month’s published target is covered. It is not a
          charitable donation and is not tax deductible. Nothing on this site is a paid service,
          and a transfer does not change the Australian Consumer Law position set out below.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Feedback</h2>
        <p>
          A feedback note is a message about this field guide. It is not a complaint to DVA, not a
          request that we represent you, and not a claim. Do not send other people’s personal
          information, and do not send abusive or unlawful content; we may delete it. If you
          suggest an improvement, we may use the idea without paying for it. How feedback is stored
          is on the{" "}
          <Link to="/privacy" className="font-semibold text-forest underline underline-offset-2">
            Privacy page
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Tell us about a problem</h2>
        <p>
          If something here looks wrong, is hard to use with your device or assistive technology,
          or you think it infringes your copyright or privacy, tell us through{" "}
          <Link to="/feedback" className="font-semibold text-forest underline underline-offset-2">
            Feedback
          </Link>
          {contactEmail ? (
            <>
              {" "}
              or by email to{" "}
              <a className="font-semibold text-forest underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </>
          ) : null}
          . Say which page and what you think is wrong, without claim numbers or medical detail.
          We will look at it and correct what we can.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Liability</h2>
        <p>
          This site is provided free, as is, for general information. To the maximum extent
          permitted by law — and subject to the Australian Consumer Law box at the top of this
          page — the publisher is not liable for loss or damage (including lost payments, missed
          time limits, or distress) arising from use of, or reliance on, this site.
        </p>
        <p className="font-semibold text-ink">
          Nothing on this page excludes, restricts, or modifies a consumer guarantee, right, or
          remedy under the Australian Consumer Law that cannot lawfully be excluded. We do not write
          a total waiver. If those guarantees apply and we are liable, our liability is limited,
          where the law allows, to supplying the information again.
        </p>
      </section>

      <section className="mt-10 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Use of the site</h2>
        <p>
          Use it to understand process and to prepare your own correspondence. Do not use it to
          impersonate anyone, to harvest other veterans’ details, or to attack DVA staff. We may
          change or take down pages without notice.
        </p>
        <p>
          You may print or copy a page for your own use, or to show an advocate, a lawyer, or
          another veteran. If you share it more widely, link to the site rather than republishing
          whole guides, and do not present it as your own work or as DVA’s. We summarise official
          material in our own words and link to the source.
        </p>
        <p>
          These terms are governed by the laws of Australia. Privacy is on a{" "}
          <Link to="/privacy" className="font-semibold text-forest underline underline-offset-2">
            separate page
          </Link>
          , because veteran privacy is not a footnote.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        If you are in crisis:{" "}
        <a className="underline" href="tel:1800011046">
          Open Arms 1800 011 046
        </a>{" "}
        or 000.
      </p>
    </main>
  );
}
