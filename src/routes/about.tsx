import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandPlate } from "@/components/brand-plate";
import { LegalNotice } from "@/components/legal-notice";
import { APP_NAME, pageTitle } from "@/lib/brand";
import { DEADLINES_LAST_CHECKED } from "@/content/deadlines";
import { peopleUpdated } from "@/content/people";
import { processingTimes } from "@/content/processing-times";
import { rates } from "@/content/rates";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: pageTitle("About") }],
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">About {APP_NAME}</h1>
      <p className="mt-3 text-lg leading-7 font-semibold text-ink">
        Built by a veteran. For veterans. Australia. Not for DVA.
      </p>
      <p className="mt-2 text-sm text-muted">Last updated 18 November 2026.</p>
      <section className="mt-8 space-y-4 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Who runs this site</h2>
        <p>
          This site is run by one Australian veteran, unpaid, in their own time. There is no company,
          no partners, no advertisers, no sponsors, and no government or ex-service organisation
          funding.
        </p>
        <p>
          The publisher is not named, by choice, because they have their own live matters with DVA.
          Accountability runs through the{" "}
          <Link to="/feedback/inbox" className="text-forest underline">
            Site keeper inbox
          </Link>
          , which is read by the publisher.
        </p>
        <p>
          Optional hosting chip-ins only cover running costs, as described on{" "}
          <Link to="/hosting" className="text-forest underline">
            Hosting this month
          </Link>
          .
        </p>
        <p>
          <Link to="/privacy" className="text-forest underline">
            Privacy
          </Link>
          {" · "}
          <Link to="/terms" className="text-forest underline">
            Terms of use
          </Link>
        </p>
      </section>
      <LegalNotice title="Not a lawyer. Not an ATDP practice." className="mt-6">
        <p>
          The publisher is not an Australian legal practitioner. This site is not a law practice
          and not an ATDP practice. It does not act as your advocate, agent, or representative.
          Nothing here is legal, financial, or clinical advice. Using it does not create a
          professional relationship.
        </p>
        <p>
          You remain responsible for your claim. You copy. You send. If this site and an official
          page disagree, the official page wins. Use an{" "}
          <a className="underline underline-offset-2" href="https://www.advocateregister.org.au/">
            ATDP-accredited advocate
          </a>{" "}
          or a solicitor on a live or time-critical matter if you can.
        </p>
      </LegalNotice>
      <div className="mt-8">
        <BrandPlate caption="Independent of DVA and Defence. Tri-service. Not an official Defence or DVA mark." />
      </div>
      <div className="mt-8 space-y-5 type-body text-ink-soft">
        <p>
          This site exists because one Australian veteran has spent a long time fighting the
          Department of Veterans’ Affairs — on delays, hardship and Acute Support Package,
          household services and attendant care, medical evidence and impairment, incapacity
          offsets, FOI, Ombudsman complaints, CDDA, and communication restrictions — and watched
          too many others get lost in the same fog.
        </p>
        <p>
          {APP_NAME} is that map, written so you can find the next step in DVA’s own process
          without paying a consultant. It is independent of DVA and Defence. It is not Open Arms, not an ex-service organisation, and not a law
          firm. The person who writes this site is not named. They are not an Australian legal
          practitioner and this site is not an ATDP practice.
        </p>
        <p>
          Each page that quotes a figure carries its own last-checked date. That date is for that
          page, not for the whole site. MRCA payment rates were last checked {rates.lastChecked}{" "}
          (they apply {rates.currentFrom} to {rates.currentTo}). Review clocks were last checked{" "}
          {DEADLINES_LAST_CHECKED}. Processing times were last checked {processingTimes.lastChecked}{" "}
          (DVA’s figures are as at {processingTimes.asAt}). Office-holders were last checked{" "}
          {peopleUpdated}. Personal claim numbers, medical files, and staff names are not published.
          Time limits and rates change — read your decision letter. If this site and an official
          page disagree, the official page wins. Use an{" "}
          <a className="text-forest underline" href="https://www.advocateregister.org.au/">
            ATDP-accredited advocate
          </a>{" "}
          on a live claim if you can.
        </p>
        <p>
          Full terms — including that this is general information, that we do not lodge anything
          for you, and the limits on liability the law allows — are on the{" "}
          <Link to="/terms" className="text-forest underline">
            terms of use
          </Link>{" "}
          page. They are part of using the site.
        </p>
        <p>
          Where an argument is contested — for example whether{" "}
          <em>Douglas v Commissioner of Taxation</em> [2020] FCAFC 220 changes incapacity offsets —
          we say so, and we put DVA’s counter-argument on the same page. Being agreeable at the
          cost of being correct is a failure.
        </p>
        <p>
          Privacy: letters, Pathfinder, My file, the WPI calculator, and the postcode lookup stay in
          your browser. We do not keep a server copy of what you type, and nothing is sent to an AI
          company.{" "}
          <Link to="/privacy" className="text-forest underline">
            Full privacy page
          </Link>
          .
        </p>
        <p>
          The site is free. If an optional hosting contribution is open, it is a voluntary
          chip-in toward running costs. It is not a donation, not a charity, and not tax
          deductible, and collection stops once the month is covered.{" "}
          <Link to="/hosting" className="text-forest underline">
            Hosting this month
          </Link>
          .
        </p>
        <p>
          If you are in crisis, skip this site:{" "}
          <a className="font-semibold text-forest underline" href="tel:1800011046">
            Open Arms 1800 011 046
          </a>{" "}
          or 000.
        </p>
      </div>
      <p className="mt-8 text-sm text-muted">
        Start at the{" "}
        <Link to="/pathfinder" className="underline">
          Pathfinder
        </Link>
        {" · "}
        <Link to="/feedback" className="underline">
          Send feedback
        </Link>
        {" · "}
        <Link to="/feedback/inbox" className="underline">
          Site keeper inbox
        </Link>
        .
      </p>
    </main>
  );
}
