import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Check } from "lucide-react";
import { Disclaimer } from "@/components/disclaimer";
import { FeedbackPanel } from "@/components/feedback-panel";
import { LastChecked } from "@/components/last-checked";
import { pageTitle } from "@/lib/brand";
import { copyText } from "@/lib/clipboard";
import { rates, ratesWindowSentence } from "@/content/rates";

export const Route = createFileRoute("/transition")({
  component: TransitionPage,
  head: () => ({
    meta: [
      { title: pageTitle("What changed on 1 July 2026") },
      {
        name: "description",
        content:
          "What the VETS Act did to veterans already in the system, including the traps nobody warned about.",
      },
    ],
  }),
});

function AskThis({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await copyText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard can fail in some previews */
    }
  }
  return (
    <blockquote className="mt-4 rounded-md border border-forest/30 bg-info-bg px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold tracking-wide text-forest uppercase">Ask this</p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-forest"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-1 type-body text-ink italic">{text}</p>
    </blockquote>
  );
}

function TransitionPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">1 July 2026</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        What changed on 1 July 2026
      </h1>
      <p className="mt-4 text-lg leading-7 font-medium text-ink">
        The VETS Act closed the DRCA and the VEA to new claims. Everything new is decided under the
        MRCA.
      </p>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Your accepted conditions did not disappear. Your payments did not stop. But{" "}
        <strong className="font-semibold text-ink">how future claims are assessed changed</strong>,
        and some of the changes affect how much is paid.
      </p>
      <p className="mt-3 type-body text-ink-soft">
        The list below summarises the main changes. Six sections follow.
      </p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 type-body text-ink">
        <li>New claims from 1 July 2026 use one Act, the MRCA. The older Acts are closed to new claims.</li>
        <li>A payment you already receive continues.</li>
        <li>Permanent impairment on a worsening is measured from a baseline. It has to rise by at least five points before more compensation is paid.</li>
        <li>Being eligible for the Special Rate Disability Pension is not the same as choosing the payment. The choice cannot be undone.</li>
        <li>Turning incapacity into a lump sum has a weekly ceiling. Over that ceiling, the lump is not available.</li>
      </ol>
      <LastChecked
        className="mt-3"
        date={rates.lastChecked}
        sourceLabel={rates.sourceLabel}
        sourceHref={rates.sourceHref}
      />
      <p className="mt-2 text-sm leading-6 text-ink-soft">{ratesWindowSentence()}.</p>

      <nav aria-label="On this page" className="mt-8 rounded-md border border-rule bg-card p-4 text-sm">
        <p className="font-semibold text-ink">On this page</p>
        <ol className="mt-2 space-y-1 text-ink-soft">
          <li>
            <a className="text-forest underline underline-offset-2" href="#liability">
              1. Liability and impairment are two claims
            </a>
          </li>
          <li>
            <a className="text-forest underline underline-offset-2" href="#baseline">
              2. The baseline and the five-point gate
            </a>
          </li>
          <li>
            <a className="text-forest underline underline-offset-2" href="#withdrew">
              3. If you withdrew a claim before 1 July 2026
            </a>
          </li>
          <li>
            <a className="text-forest underline underline-offset-2" href="#redemption">
              4. Incapacity went up — and that can close the cash-out
            </a>
          </li>
          <li>
            <a className="text-forest underline underline-offset-2" href="#reverse-trap">
              5. A redemption may cost you SRDP
            </a>
          </li>
          <li>
            <a className="text-forest underline underline-offset-2" href="#srdp">
              6. SRDP — eligibility and election are not the same
            </a>
          </li>
        </ol>
      </nav>

      <article className="mt-10 space-y-12">
        <section id="liability" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            1. Your liability claim and your impairment claim are two different claims
          </h2>
          <p className="mt-3 type-body text-ink-soft">
            DVA decides these separately.
          </p>
          <ul className="mt-3 space-y-2">
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">Initial liability</strong> asks: is this
              condition service related?
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">Permanent impairment</strong> asks: how much
              is it worth?
            </li>
          </ul>
          <p className="mt-3 type-body text-ink-soft">
            They are separate claims, with separate numbers, and{" "}
            <strong className="font-semibold text-ink">separate lodgement dates</strong>.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            A liability claim lodged before 1 July 2026 is decided under the DRCA. But the permanent
            impairment claim you make <em>after</em> liability is accepted is a new claim, with its
            own date — and DVA has said DRCA is closed to new claims from 1 July 2026.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">
              What nobody has published is which rules apply to that later impairment claim.
            </strong>{" "}
            It may be assessed under the old Approved DRCA Guide because the liability claim predates
            transition. It may be assessed under GARP M Chapter 25, with a baseline and a five-point
            gate. We do not know, and we are not going to guess.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Asking DVA:</strong> a written question can ask DVA to{" "}
            <strong className="font-semibold text-ink">identify the transitional provision it relies on</strong>.
            The question below is a template.
          </p>
          <AskThis text="Where liability for a condition is accepted under the DRCA on a claim lodged before 1 July 2026, is the subsequent permanent impairment assessment made under the DRCA and the Approved Guide, or under the MRCA with the Chapter 25 Step 2 requirement for an increase of at least five impairment points above the Chapter 26 baseline? Please identify the transitional provision relied on." />
        </section>

        <section id="baseline" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            2. The baseline, and the five-point gate
          </h2>
          <p className="mt-3 type-body text-ink-soft">
            Under the <em>Guide to Determining Impairment and Compensation 2026</em> (GARP M 2026):
          </p>
          <ul className="mt-3 space-y-2">
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">Chapter 26</strong> gives you a{" "}
              <strong className="font-semibold text-ink">Baseline Impairment Rating</strong> — a
              number representing impairment you have already been compensated for.
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">Chapter 25, Step 2</strong> requires an
              increase of <strong className="font-semibold text-ink">at least five impairment points above that baseline</strong>{" "}
              before further MRCA permanent impairment compensation is payable.
            </li>
          </ul>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Why this matters more than it sounds.</strong>{" "}
            If your baseline is already high, the gate sits five points above it. On a scale that
            stops at 100, a baseline in the nineties puts the gate out of reach entirely. Further
            permanent impairment compensation may be arithmetically impossible, no matter how many
            new conditions are accepted.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">The baseline is not shown in the usual places.</strong>{" "}
            It is not on your card, not on MyService, and not in your determination letters.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Asking DVA:</strong> a written request can ask for the
            baseline and the working. The question below is a template.
          </p>
          <AskThis text="What is my baseline impairment rating under Chapter 26? Please identify the conditions and ratings used, the Approved DRCA Guide table each was rated under, and the method by which those ratings were expressed as impairment points. Please provide the assessment worksheet." />
          <aside className="mt-4 rounded-md border border-warn/40 bg-warn-bg px-4 py-3">
            <p className="text-sm font-semibold tracking-wide uppercase">A warning about numbers</p>
            <p className="mt-1 type-body">
              A baseline figure that does not come from DVA, including one from this site or an AI,
              is not DVA’s figure. A baseline calculated from your own reading of your determination
              letters is a working estimate. Only DVA’s figure counts. The{" "}
              <Link to="/calculator" className="font-semibold text-forest underline">
                Impairment calculator
              </Link>{" "}
              does not calculate a Chapter 26 baseline.
            </p>
          </aside>
        </section>

        <section id="withdrew" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            3. If you withdrew a claim before 1 July 2026
          </h2>
          <p className="mt-3 type-body text-ink-soft">
            DVA’s withdrawal letters say you are <em>“free to lodge a new claim for these conditions in the future.”</em>
          </p>
          <p className="mt-3 type-body text-ink-soft">
            That was true when it was written.{" "}
            <strong className="font-semibold text-ink">It means something different now.</strong>
          </p>
          <p className="mt-3 type-body text-ink-soft">
            A claim re-lodged today is a new claim under the MRCA — which means the baseline and the
            five-point gate in section 2. Withdrawing a DRCA claim may have converted a per-condition
            assessment with no gate into one you cannot clear.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            If you withdrew a claim in the last few years intending to come back to it — because a
            doctor would not complete a form, because you were told to, because you got tired —{" "}
            <strong className="font-semibold text-ink">this affects you.</strong>
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Asking DVA:</strong> a new claim can be determined under
            a different Act or Guide from the earlier one, and a written question can ask which applies.
            The question below is a template.
          </p>
          <AskThis text="If I lodge a new claim for [condition], which Act will determine liability, and which Guide will determine any permanent impairment? Was my earlier claim [number] withdrawn, and on what basis?" />
        </section>

        <section id="redemption" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            4. Incapacity payments went up — and that can close the cash-out
          </h2>
          <p className="mt-3 type-body text-ink-soft">
            Three things changed for people on incapacity payments:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              The <strong className="font-semibold text-ink">ADF salary</strong> component is now
              paid at <strong className="font-semibold text-ink">current military salary rates</strong>,
              instead of being indexed by the Wage Price Index.
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              A <strong className="font-semibold text-ink">remuneration loading</strong> was added
              for discharged members.
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              The deduction representing a{" "}
              <strong className="font-semibold text-ink">notional superannuation contribution</strong>{" "}
              was removed.
            </li>
          </ul>
          <p className="mt-3 type-body text-ink-soft">
            These changes affect how the weekly figure is worked out. The arithmetic is on{" "}
            <a
              className="font-semibold text-forest underline"
              href="https://www.dva.gov.au/incapacity-payments"
              target="_blank"
              rel="noreferrer"
            >
              DVA’s incapacity payments page
            </a>
            .
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">If two payments now land in the same fortnight, that can be the offsetting change, not a bank error.</strong>{" "}
            DVA’s incapacity page says a VEA Disability Compensation Payment you were already receiving continues, and you may also be eligible for MRCA incapacity — both at the same time. From 1 July 2026 only{" "}
            <strong className="font-semibold text-ink">above-general-rate</strong> DCP (Special Rate, Intermediate Rate, Temporary Special Rate, or a loss-of-earnings allowance) is reduced because of incapacity. The general-rate amount can still be paid. Veterans on Special / Intermediate / EDA can still have a portion offset; they keep a general-rate equivalent. CSC / MSBS invalidity is a different offset against incapacity and usually still applies.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">The workings:</strong> the calculation sheet shows how DVA reached the figure. Without it, whether an uplift is lawful or wrong cannot be seen. The question below asks for it.
          </p>
          <AskThis text="Please provide the calculation of my current weekly incapacity entitlement and of any VEA Disability Compensation Payment paid with it: normal weekly earnings, remuneration loading, superannuation deduction (if any), each offset (including CSC invalidity and above-general-rate DCP), and the weekly result. Identify the provisions applied from 1 July 2026." />
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Here is the trap.</strong> A{" "}
            <strong className="font-semibold text-ink">redemption</strong> — converting ongoing
            incapacity payments into a single lump sum — is only available if your weekly entitlement
            is <strong className="font-semibold text-ink">below a ceiling</strong>. The MRCA
            redemption ceiling is{" "}
            <strong className="font-semibold text-ink">{rates.redemptionWeekly} gross per week</strong>{" "}
            <em>
              ({ratesWindowSentence()}; check the current figure)
            </em>
            .
          </p>
          <p className="mt-3 type-body text-ink-soft">
            If the transition pushed your weekly entitlement above that ceiling,{" "}
            <strong className="font-semibold text-ink">
              the redemption you were considering is gone
            </strong>{" "}
            — not refused on discretion, but unavailable by operation of law. Nobody is required to
            write and tell you.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Asking DVA:</strong> a written question can ask for the
            current weekly entitlement and the redemption ceiling. The question below is a template.
          </p>
          <AskThis text="What is my current weekly incapacity entitlement, and what is the current redemption ceiling? Am I eligible for a redemption under MRCA section 138?" />
        </section>

        <section id="reverse-trap" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            5. The reverse trap — a redemption may cost you SRDP
          </h2>
          <p className="mt-3 type-body text-ink-soft">
            Before you chase a lump sum, know what it may cost.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            To be offered the <strong className="font-semibold text-ink">Special Rate Disability Pension</strong>,
            DVA’s own page requires (among other things) that you:
          </p>
          <blockquote className="mt-3 border-l-4 border-gold bg-paper-2 px-4 py-3 type-body text-ink">
            “are in receipt of MRCA incapacity payments or have had your MRCA incapacity payments
            reduced to nil because of commonwealth superannuation offsetting or because you received
            a lump sum amount of MRCA incapacity payments”
            <cite className="mt-2 block text-sm not-italic text-muted">
              DVA Special Rate Disability Pension page, last updated 1 July 2026
            </cite>
          </blockquote>
          <p className="mt-3 type-body text-ink-soft">
            A <strong className="font-semibold text-ink">DRCA redemption is none of those three things.</strong>
          </p>
          <p className="mt-3 type-body text-ink-soft">
            That matters because of what SRDP eligibility carries with it — see section 6. In short:
            taking a lump sum may cost you the pathway that reaches your children.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">Asking DVA:</strong> a written question can ask what a
            redemption does to SRDP eligibility. The question below is a template.
          </p>
          <AskThis text="If I accept a redemption, what effect does that have on my eligibility for the Special Rate Disability Pension under MRCA section 199?" />
        </section>

        <section id="srdp" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            6. SRDP — eligibility and election are not the same thing
          </h2>
          <p className="mt-3 type-body text-ink-soft">
            This is the most valuable thing on this page, and almost nobody knows it.
          </p>
          <p className="mt-3 type-body text-ink-soft">DVA’s own SRDP page says:</p>
          <blockquote className="mt-3 border-l-4 border-gold bg-paper-2 px-4 py-3 type-body text-ink">
            “Once you are eligible for SRDP,{" "}
            <strong className="font-semibold">even if you choose not to receive the SRDP payment</strong>,
            you will receive a Veteran Card - All Conditions embossed with the letters 'TPI'
            and the high rate of the MRCA Supplement payment. In addition, your dependent children
            will be eligible for education assistance through the Military Rehabilitation and
            Compensation Act Education and Training Scheme (MRCAETS).”
            <cite className="mt-2 block text-sm not-italic text-muted">
              DVA Special Rate Disability Pension page, last updated 1 July 2026
            </cite>
          </blockquote>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">
              So the card, the supplement and your children’s education assistance attach to being
              found eligible — not to taking the payment.
            </strong>
          </p>
          <p className="mt-3 type-body text-ink-soft">
            That matters because the SRDP payment is often worth less than it looks. The maximum weekly
            rate on DVA’s MRCA page is currently{" "}
            <strong className="font-semibold text-ink">{rates.srdpWeekly}</strong> (includes Energy
            Supplement). It is reduced by
            60 cents in the dollar of Commonwealth-funded superannuation, and then{" "}
            <strong className="font-semibold text-ink">
              dollar-for-dollar by the weekly value of permanent impairment compensation already paid
              — including lump sums paid under the DRCA.
            </strong>{" "}
            For a veteran with a long DRCA payment history, the SRDP payment can come out at nil
            while incapacity payments continue at a higher rate.
          </p>
          <p className="mt-3 type-body text-ink-soft">
            <strong className="font-semibold text-ink">
              So ask for the eligibility assessment, not the payment.
            </strong>
          </p>
          <p className="mt-3 type-body text-ink-soft">Three more things:</p>
          <ul className="mt-3 space-y-2">
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">The election is irreversible.</strong> Once
              you choose SRDP, you cannot change back.
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">You have 12 months</strong> from the written
              offer to decide.{" "}
              <Link to="/deadlines" className="font-semibold text-forest underline">
                Count that clock
              </Link>
              .
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">Financial advice is mandatory</strong> before
              SRDP can commence, and <strong className="font-semibold text-ink">DVA reimburses the cost</strong>{" "}
              up to a maximum amount (up to {rates.adviceCap} combined financial and legal advice on DVA’s
              MRCA rates page, {rates.currentFrom} – {rates.currentTo}). Take it even if you intend to
              decline.
            </li>
          </ul>
          <AskThis text="Please assess my eligibility for the Special Rate Disability Pension under MRCA section 199. I am asking for an eligibility determination, not a payment." />
        </section>

        <section id="unknown" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">What we do not know</h2>
          <p className="mt-3 type-body text-ink-soft">
            Being straight with you about the limits of this page:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="relative border-l-2 border-warn/50 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">
                Whether a permanent impairment claim made after 1 July 2026, on a liability claim
                lodged before it, is assessed under the DRCA or under Chapter 25.
              </strong>{" "}
              Nobody has published the transitional provision. This is the single most consequential
              unanswered question for DRCA veterans.
            </li>
            <li className="relative border-l-2 border-warn/50 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">
                How DVA converts old DRCA whole-person-impairment percentages into GARP M impairment
                points
              </strong>{" "}
              for the Chapter 26 baseline. The Guide sets out cohorts but the conversion is not
              spelled out.
            </li>
            <li className="relative border-l-2 border-warn/50 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">
                Whether the thresholds for the Gold Card, SRDP and additional dependant compensation
                are tested against your baseline, against a current overall rating, or against a
                single claim.
              </strong>
            </li>
          </ul>
          <p className="mt-3 type-body text-ink-soft">
            If you get a written answer to any of these from DVA, please send it to us through{" "}
            <Link to="/feedback" className="font-semibold text-forest underline">
              Feedback
            </Link>
            . It will help every veteran who reads this page.
          </p>
        </section>

        <section id="before-you-act" className="scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Before you act on any of this
          </h2>
          <ul className="mt-3 space-y-2">
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">Check your own decision letter.</strong> It
              carries your review rights and your deadline. This page does not.{" "}
              <Link to="/deadlines" className="font-semibold text-forest underline">
                What clock am I on?
              </Link>
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              <strong className="font-semibold text-ink">An ATDP-accredited advocate is free.</strong>{" "}
              If you are heading to the VRB or the ART, get one.{" "}
              <a
                className="font-semibold text-forest underline"
                href="https://www.advocateregister.org.au/"
              >
                Advocacy Register
              </a>
              .
            </li>
            <li className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft">
              If this is weighing on you, Open Arms is{" "}
              <a className="font-semibold text-forest underline" href="tel:1800011046">
                1800 011 046
              </a>
              , 24 hours. In an emergency, 000.
            </li>
          </ul>
        </section>
      </article>

      <section className="mt-12 rounded-md border border-rule bg-card p-5">
        <h2 className="font-display text-2xl font-semibold">Official sources</h2>
        <ul className="mt-3 space-y-2 type-body">
          <li>
            <a
              className="text-forest underline underline-offset-2"
              href="https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/eligibility-for-disability-compensation-payments/special-rate-disability-pension"
              target="_blank"
              rel="noreferrer"
            >
              DVA — Special Rate Disability Pension
            </a>{" "}
            (quotes above; last updated 1 July 2026)
          </li>
          <li>
            <a
              className="text-forest underline underline-offset-2"
              href="https://www.dva.gov.au/access-benefits/payment-rates/compensation-payment-rates/compensation-payment-rates-for-mrca"
              target="_blank"
              rel="noreferrer"
            >
              DVA — Compensation payment rates for MRCA
            </a>{" "}
            (redemption {rates.redemptionWeekly}; current {rates.currentFrom} – {rates.currentTo})
          </li>
          <li>
            <a
              className="text-forest underline underline-offset-2"
              href="https://www.legislation.gov.au/F2026L00595/asmade/text"
              target="_blank"
              rel="noreferrer"
            >
              GARP M 2026 (legislation)
            </a>
          </li>
          <li>
            <Link
              to="/guides/$slug"
              params={{ slug: "vets-act-2026" }}
              className="text-forest underline underline-offset-2"
            >
              Field guide: the VETS Act
            </Link>
          </li>
          <li>
            <Link to="/calculator" className="text-forest underline underline-offset-2">
              Impairment calculator
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer lastChecked={rates.lastChecked} />
      </div>
    </main>
  );
}
