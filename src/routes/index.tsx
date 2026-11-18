import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  HeartPulse,
  Home as HomeIcon,
  ListChecks,
  MapPin,
  MessageSquareText,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { guides } from "@/content/guides";
import { Linkify } from "@/components/linkify";
import { FeedbackPanel } from "@/components/feedback-panel";
import { WaitBanner } from "@/components/wait-banner";
import { RecentChanges } from "@/components/recent-changes";
import { SouthernCross } from "@/components/southern-cross";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: pageTitle("Independent DVA field guide") },
      {
        name: "description",
        content:
          "Independent field guide for Australian veterans navigating DVA: claims, delays, impairment, hardship, and appeals.",
      },
    ],
  }),
});

const choiceClass =
  "group flex min-h-14 items-center justify-between gap-3 rounded-md border border-paper/30 bg-forest-2 px-5 py-4 text-lg font-semibold text-paper hover:border-gold hover:bg-forest-2/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function Home() {
  const featured = guides.filter((g) =>
    ["start-here", "hardship-asp", "household-services", "abuse-support"].includes(g.slug),
  );

  return (
    <main>
      <section className="relative overflow-hidden border-b border-forest-2 bg-forest text-paper">
        <SouthernCross className="pointer-events-none absolute top-6 right-10 hidden size-72 text-gold opacity-25 md:block" />
        <div className="relative mx-auto max-w-3xl px-4 py-10 md:py-14">
          <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.16em] text-gold uppercase">
            <SouthernCross className="size-9 shrink-0" />
            Independent · Australia
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-paper">
            What do you need help with?
          </h1>
          <p className="mt-4 text-lg leading-7 text-paper/90">
            A free, independent guide to DVA (the Department of Veterans’ Affairs) for veterans. Not
            DVA, not Defence.
          </p>

          <nav aria-label="What do you need help with?" className="mt-7">
            <ul className="grid gap-3">
              <li>
                <Link to="/guides/$slug" params={{ slug: "start-here" }} className={choiceClass}>
                  I’ve just left Defence or I’m new to DVA
                  <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/pathfinder" search={{ start: "stuck" }} className={choiceClass}>
                  I’m waiting on a claim
                  <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/pathfinder" search={{ start: "decision" }} className={choiceClass}>
                  I got a decision I disagree with
                  <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/pathfinder" search={{ start: "money" }} className={choiceClass}>
                  Money is tight right now
                  <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/guides" className={choiceClass}>
                  I just want to read
                  <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link to="/postcode" className={choiceClass}>
                  Find a person near me
                  <ArrowRight className="size-5 shrink-0 text-gold" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <p className="mt-5 type-body text-paper/90">
            To speak to DVA, call{" "}
            <a href="tel:1800838372" className="font-semibold text-gold underline underline-offset-2">
              1800 VETERAN (1800 838 372)
            </a>
            . That is the claims line, not counselling. Open Arms, above, is for a crisis. Ringing
            DVA?{" "}
            <Link to="/call-sheet" className="font-semibold text-gold underline underline-offset-2">
              Print the call sheet
            </Link>{" "}
            first.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="bg-gold text-ink hover:bg-gold-2">
              <Link to="/pathfinder">
                Not sure? Start the Pathfinder <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="type-body text-paper/85">
              A few plain questions, then it points you to the right guide.
            </p>
          </div>
          <p className="mt-6 type-body text-paper/85">
            New rules started on 1 July 2026.{" "}
            <Link to="/transition" className="font-semibold text-gold underline underline-offset-2">
              What changed
            </Link>
            .
          </p>
          <p className="mt-4 type-body text-paper/80">
            <Link
              to="/guides/$slug"
              params={{ slug: "abuse-support" }}
              className="font-semibold text-gold underline underline-offset-2"
            >
              Abuse during service
            </Link>
          </p>
          <p className="mt-3 text-sm leading-6 text-paper/75">
            On a phone, add this site to your home screen so you can open it without searching. On an
            iPhone, use the Share menu, then Add to Home Screen.
          </p>
        </div>
      </section>

      <WaitBanner />
      <RecentChanges />

      <section className="mx-auto max-w-6xl px-4 py-6">
        <details className="group rounded-md border border-rule bg-card">
          <summary className="flex min-h-11 cursor-pointer items-center px-5 py-3 font-display text-2xl font-semibold marker:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">
            More tools and guides
          </summary>
          <div className="border-t border-rule">
            <div className="mx-auto max-w-6xl px-5 py-6">
              <p className="type-body text-ink-soft">
                Looking for a word you don’t know? Try the{" "}
                <Link
                  to="/glossary"
                  className="font-semibold text-forest underline underline-offset-2"
                >
                  glossary
                </Link>
                . Wondering how long DVA takes?{" "}
                <Link
                  to="/guides/$slug"
                  params={{ slug: "delays" }}
                  className="font-semibold text-forest underline underline-offset-2"
                >
                  Read about delays
                </Link>
                .
              </p>
            </div>
            <section className="border-b border-rule bg-army text-paper">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold tracking-[0.14em] uppercase text-gold-3">
                    Crisis support · no form
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-paper">
                    Acute Support Package — short-term help when the household is in crisis.
                  </h2>
                  <p className="mt-2 type-body text-paper/90">
                    <Linkify
                      onDark
                      text="The Acute Support Package (ASP) is not cash in your account and it is not household services. DVA pays providers for things like childcare, tutoring, and help around the home when a new circumstance has knocked the family over. Call 1800 VETERAN (1800 838 372). There is no form."
                    />
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-gold text-ink hover:bg-gold-2">
                    <Link to="/guides/$slug" params={{ slug: "hardship-asp" }}>
                      ASP guide <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="border border-paper/40 text-paper hover:bg-paper/10 hover:text-paper"
                  >
                    <Link to="/pathfinder" search={{ start: "money" }}>
                      I need support this month
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Tools
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  to="/deadlines"
                  className="group flex h-full flex-col rounded-md border border-rule bg-card p-5 hover:border-forest/40 hover:shadow-panel"
                >
                  <ListChecks className="size-6 text-forest" />
                  <p className="font-display mt-3 text-xl font-semibold">What clock am I on?</p>
                  <p className="mt-2 type-body text-ink-soft">
                    The Veterans’ Review Board (VRB) is usually 12 months. The Administrative Review
                    Tribunal (ART) after that is 3 months, not 90 days. A Freedom of Information
                    (FOI) practical refusal is 14 days — silence withdraws the request.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-forest group-hover:underline">
                    Count the window
                  </p>
                </Link>
                <Link
                  to="/transition"
                  className="group flex h-full flex-col rounded-md border border-rule bg-card p-5 hover:border-forest/40 hover:shadow-panel"
                >
                  <Shield className="size-6 text-forest" />
                  <p className="font-display mt-3 text-xl font-semibold">What changed</p>
                  <p className="mt-2 type-body text-ink-soft">
                    Five-point gate, Chapter 26 baseline, $287.94 redemption ceiling, and why
                    Special Rate Disability Pension (SRDP) eligibility is not the same as taking the
                    payment.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-forest group-hover:underline">
                    What actually changed
                  </p>
                </Link>
                <Link
                  to="/guides/$slug"
                  params={{ slug: "household-services" }}
                  className="group flex h-full flex-col rounded-md border border-rule bg-card p-5 hover:border-forest/40 hover:shadow-panel"
                >
                  <HomeIcon className="size-6 text-forest" />
                  <p className="font-display mt-3 text-xl font-semibold">Household services</p>
                  <p className="mt-2 type-body text-ink-soft">
                    Cleaning, laundry, meals, shopping, some garden work — if accepted conditions
                    stop you doing them. Form D9319 to hhs@dva.gov.au. Not the Acute Support
                    Package, not Veterans’ Home Care.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-forest group-hover:underline">
                    Read the guide
                  </p>
                </Link>
                <Link
                  to="/calculator"
                  className="group flex h-full flex-col rounded-md border border-rule bg-card p-5 hover:border-forest/40 hover:shadow-panel"
                >
                  <Calculator className="size-6 text-forest" />
                  <p className="font-display mt-3 text-xl font-semibold">
                    Impairment points calculator
                  </p>
                  <p className="mt-2 flex-1 type-body text-ink-soft">
                    44 + 40 is not 84. Combined the GARP way it is 66. Four combined points short of
                    Gold Card is not four points on a new letter. Old-scheme (DRCA) files are
                    different after 1 July 2026.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-forest group-hover:underline">
                    Combine your letter points
                  </p>
                </Link>
                <Link
                  to="/postcode"
                  className="group flex h-full flex-col rounded-md border border-rule bg-card p-5 hover:border-forest/40 hover:shadow-panel"
                >
                  <MapPin className="size-6 text-forest" />
                  <p className="font-display mt-3 text-xl font-semibold">Find local support</p>
                  <p className="mt-2 type-body text-ink-soft">
                    Postcode in, sitting federal member, senators, DVA’s state office, and the
                    official registers for an advocate, a council, and a state MP. Runs in this
                    browser.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-forest group-hover:underline">
                    Enter a postcode
                  </p>
                </Link>
                <Link
                  to="/guides/$slug"
                  params={{ slug: "abuse-support" }}
                  className="group flex h-full flex-col rounded-md border border-rule bg-card p-5 hover:border-forest/40 hover:shadow-panel"
                >
                  <HeartPulse className="size-6 text-forest" />
                  <p className="font-display mt-3 text-xl font-semibold">
                    If you were abused in service
                  </p>
                  <p className="mt-2 type-body text-ink-soft">
                    Treatment first — mental health care does not need you to prove service caused
                    the condition. Compensation is a specialised team. Reparation is a different
                    door.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-forest group-hover:underline">
                    Pathways, in order
                  </p>
                </Link>
              </div>
            </section>

            <section className="border-y border-rule bg-paper-2">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold tracking-[0.14em] text-forest uppercase">
                    Get the papers
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                    Your file shows what DVA recorded.
                  </h2>
                  <p className="mt-2 type-body text-ink-soft">
                    <Linkify text="Personal Information Request is faster for your own file. FOI is the legal right — 14 days to acknowledge, 30 days to decide — with review at DVA then the OAIC. Lodge the FOI webform or PIR webform, or email Information.Access@dva.gov.au with form D8601." />
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/guides/$slug" params={{ slug: "foi" }}>
                      FOI guide <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/pathfinder" search={{ start: "file" }}>
                      Get my file
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            <section className="border-y border-rule bg-paper-2/60">
              <div className="mx-auto max-w-6xl px-4 py-12">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  Start with these
                </h2>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {featured.map((g) => (
                    <Link
                      key={g.slug}
                      to="/guides/$slug"
                      params={{ slug: g.slug }}
                      className="rounded-md border border-rule bg-card p-5 hover:border-forest/40"
                    >
                      <p className="text-xs font-semibold tracking-wide text-forest uppercase">
                        {g.category}
                      </p>
                      <p className="font-display mt-1 text-xl font-semibold">{g.title}</p>
                      <p className="mt-2 type-body text-muted">{g.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 py-12">
              <div className="rounded-md border border-rule bg-card p-5 md:p-6">
                <p className="text-sm font-semibold tracking-wide text-forest uppercase">
                  Who sits above DVA
                </p>
                <h2 className="font-display mt-2 text-2xl font-semibold">
                  Ministers, shadow, and the Commission
                </h2>
                <p className="mt-2 max-w-3xl type-body text-ink-soft">
                  Use a current name when you write. Roles move — check the official page before you
                  send. Writing to a minister does not pause a VRB time limit.
                </p>
                <p className="mt-3 type-body text-ink">
                  Minister Matt Keogh · Shadow Michael McCormack · Secretary Alison Frame
                </p>
                <Link
                  to="/people"
                  className="mt-3 inline-flex min-h-11 items-center font-semibold text-forest underline underline-offset-2"
                >
                  Full list and official links
                </Link>
              </div>
            </section>

            <section className="mx-auto max-w-6xl px-4 pb-12">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-md border border-rule bg-card p-5">
                  <Shield className="size-5 text-forest" />
                  <h3 className="font-display mt-3 text-xl font-semibold">Veteran-built</h3>
                  <p className="mt-2 type-body text-ink-soft">
                    Not DVA. Not Defence. Written from a long fight with the department, checked
                    against official sources, with the counter-arguments included.{" "}
                    <Link
                      to="/about"
                      className="font-semibold text-forest underline underline-offset-2"
                    >
                      Why this exists
                    </Link>
                  </p>
                </div>
                <div className="rounded-md border border-rule bg-card p-5">
                  <ListChecks className="size-5 text-forest" />
                  <h3 className="font-display mt-3 text-xl font-semibold">Keep your own file</h3>
                  <p className="mt-2 type-body text-ink-soft">
                    Track numbers and dates in this browser only — never stored on our servers.{" "}
                    <Link
                      to="/file"
                      className="font-semibold text-forest underline underline-offset-2"
                    >
                      My file
                    </Link>
                    .{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold text-forest underline underline-offset-2"
                    >
                      Privacy
                    </Link>
                  </p>
                </div>
                <div className="rounded-md border border-rule bg-card p-5">
                  <MessageSquareText className="size-5 text-forest" />
                  <h3 className="font-display mt-3 text-xl font-semibold">Crisis is separate</h3>
                  <p className="mt-2 type-body text-ink-soft">
                    <Linkify text="Open Arms 1800 011 046" /> sits on every page for a reason.
                    Claims can wait an hour. Safety cannot.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <FeedbackPanel />
              </div>
            </section>
          </div>
        </details>
      </section>
    </main>
  );
}
