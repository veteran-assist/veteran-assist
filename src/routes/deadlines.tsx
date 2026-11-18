import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  clocks,
  computeClock,
  DEADLINES_LAST_CHECKED,
  defaultReceivedIso,
  formatDisplay,
  getClock,
  parseLocalDate,
  runsFromLabel,
  windowLabel,
} from "@/content/deadlines";
import { Disclaimer } from "@/components/disclaimer";
import { FeedbackPanel } from "@/components/feedback-panel";
import { LastChecked } from "@/components/last-checked";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pageTitle } from "@/lib/brand";

type Search = { clock?: string; letter?: string };

export const Route = createFileRoute("/deadlines")({
  component: DeadlinesPage,
  validateSearch: (search: Record<string, unknown>): Search => ({
    clock: typeof search.clock === "string" && getClock(search.clock) ? search.clock : undefined,
    letter: typeof search.letter === "string" && parseLocalDate(search.letter) ? search.letter : undefined,
  }),
  head: () => ({
    meta: [
      { title: pageTitle("What clock am I on?") },
      {
        name: "description",
        content:
          "Count the review window on a DVA, VRB, ART, FOI or SRDP letter. Your letter is the source.",
      },
    ],
  }),
});

function DeadlinesPage() {
  const search = Route.useSearch();
  const [clockId, setClockId] = useState(search.clock ?? clocks[0].id);
  const [letter, setLetter] = useState(search.letter ?? "");
  const [received, setReceived] = useState(search.letter ? defaultReceivedIso(search.letter) : "");

  const clock = getClock(clockId) ?? clocks[0];
  const result = useMemo(
    () =>
      letter
        ? computeClock({
            clock,
            letterIso: letter,
            receivedIso: received || undefined,
          })
        : null,
    [clock, letter, received],
  );
  const dualDiffers =
    result?.letterExpiry && result.expiry.getTime() !== result.letterExpiry.getTime();

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Tools</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        What clock am I on?
      </h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Pick the decision type, enter the date on the letter, and this tool counts the window.{" "}
        <strong className="font-semibold text-ink">Your letter wins.</strong>
      </p>
      <LastChecked className="mt-3" date={DEADLINES_LAST_CHECKED} />

      <form className="mt-8 grid gap-4 rounded-md border border-rule bg-card p-5" autoComplete="off">
        <div>
          <Label htmlFor="clock">Decision type</Label>
          <select
            id="clock"
            className="mt-1 h-11 w-full rounded-sm border border-rule bg-card px-3 text-sm"
            value={clockId}
            onChange={(e) => setClockId(e.target.value)}
          >
            {clocks.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="letter">Date on the letter</Label>
            <Input
              id="letter"
              type="date"
              className="mt-1 min-w-0 w-full"
              value={letter}
              onChange={(e) => {
                const next = e.target.value;
                setLetter(next);
                if (!received && next) setReceived(defaultReceivedIso(next));
              }}
            />
          </div>
          <div>
            <Label htmlFor="received">Date you received it (optional)</Label>
            <Input
              id="received"
              type="date"
              className="mt-1 min-w-0 w-full"
              value={received}
              onChange={(e) => setReceived(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted">
              Defaults to letter date + 3 days. Change it if the envelope or MyService stamp is
              later. For clocks that run from the notice date, this field is unused.
            </p>
          </div>
        </div>
      </form>

      <section className="mt-6 rounded-md border border-rule bg-card p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              clock.confidence === "Confirmed"
                ? "rounded-sm bg-forest px-2 py-1 text-xs font-semibold tracking-wide text-paper uppercase"
                : "rounded-sm bg-warn-bg px-2 py-1 text-xs font-semibold tracking-wide text-ink uppercase"
            }
          >
            {clock.confidence === "Confirmed" ? "Confirmed" : "Check"}
          </span>
          {clock.irreversible ? (
            <span className="rounded-sm bg-crisis px-2 py-1 text-xs font-semibold tracking-wide text-crisis-fg uppercase">
              Irreversible
            </span>
          ) : null}
          <span className="text-sm text-muted">Last checked {DEADLINES_LAST_CHECKED}</span>
        </div>
        <p className="font-display mt-3 text-2xl font-semibold">{clock.label}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-muted">Window</dt>
            <dd className="mt-1 text-ink">{windowLabel(clock)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-muted">Runs from</dt>
            <dd className="mt-1 text-ink">{runsFromLabel(clock)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-ink-soft type-body">{clock.note}</p>
        <p className="mt-2 type-body">
          <a
            className="font-semibold text-forest underline underline-offset-2"
            href={clock.sourceHref}
            target="_blank"
            rel="noreferrer"
          >
            {clock.sourceLabel}
          </a>
        </p>
      </section>

      {clock.dualWording ? (
        <aside className="mt-4 rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
          Two official wordings. ART.gov.au counts from when you receive the decision. DVA’s
          single-review page says “from a VRB decision.” If those dates differ, this tool uses the
          earlier one for the days remaining.
        </aside>
      ) : null}

      {clock.cautionExtra ? (
        <aside className="mt-4 rounded-md border border-crisis bg-crisis px-4 py-3 text-crisis-fg">
          <p className="text-sm font-semibold tracking-wide uppercase">This one is different</p>
          <p className="mt-1 type-body">{clock.cautionExtra}</p>
        </aside>
      ) : null}

      {result ? (
        <section
          className={
            result.daysRemaining < 0
              ? "mt-6 rounded-md border border-crisis bg-crisis/5 p-5"
              : result.daysRemaining <= 14
                ? "mt-6 rounded-md border border-warn/50 bg-warn-bg p-5"
                : "mt-6 rounded-md border border-forest/40 bg-info-bg p-5"
          }
        >
          <p className="text-sm font-semibold tracking-wide text-forest uppercase">Counted window</p>
          <p className="font-display mt-2 text-3xl font-semibold tracking-tight">
            {result.daysRemaining > 0
              ? `${result.daysRemaining} day${result.daysRemaining === 1 ? "" : "s"} remaining`
              : result.daysRemaining === 0
                ? "Due today"
                : `${Math.abs(result.daysRemaining)} day${Math.abs(result.daysRemaining) === 1 ? "" : "s"} past the counted date`}
          </p>
          <p className="mt-2 text-ink type-body">
            Clock started {formatDisplay(result.start)}. Expires{" "}
            <strong>{formatDisplay(result.saferExpiry ?? result.expiry)}</strong>.
          </p>
          {dualDiffers && result.letterExpiry ? (
            <p className="mt-2 text-ink type-body">
              Receipt-based expiry: {formatDisplay(result.expiry)}. Letter-date expiry:{" "}
              {formatDisplay(result.letterExpiry)}. The days remaining use the earlier date.
            </p>
          ) : null}
          {result.usedDefaultReceipt && clock.runsFrom === "receipt" ? (
            <p className="mt-2 text-sm text-muted">
              Receipt was left blank, so we used the letter date plus three days. Change it if you
              know the real date.
            </p>
          ) : null}
          {result.daysRemaining < 0 ? (
            <p className="mt-3 type-body">
              If the date on the letter has passed, the review-rights paragraph, or the body it names,
              says what applies. This site cannot say whether a late application is accepted.
            </p>
          ) : null}
          <p className="mt-3 text-sm font-semibold text-ink">Your letter is the source.</p>
        </section>
      ) : (
        <p className="mt-6 text-sm text-muted">Enter the date on the letter to count the window.</p>
      )}

      <aside className="mt-6 rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
        This is a guide, not the source.{" "}
        <strong className="font-semibold">
          Your decision letter states your actual review rights and time limit — check it.
        </strong>{" "}
        An estimate, not an entitlement — check your own letter.
      </aside>

      <p className="mt-6 text-ink-soft type-body">
        Related:{" "}
        <Link
          to="/guides/$slug"
          params={{ slug: "appeals-vrb-art" }}
          className="font-semibold text-forest underline"
        >
          Appeals guide
        </Link>
        {" · "}
        <Link to="/guides/$slug" params={{ slug: "foi" }} className="font-semibold text-forest underline">
          FOI
        </Link>
        {" · "}
        <Link to="/transition" hash="srdp" className="font-semibold text-forest underline">
          SRDP election
        </Link>
        {" · "}
        <Link to="/letters" className="font-semibold text-forest underline">
          Letters
        </Link>
      </p>

      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer lastChecked={DEADLINES_LAST_CHECKED} />
      </div>
    </main>
  );
}
