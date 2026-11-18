import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BODY_SYSTEMS,
  DEFAULT_FLAGS,
  THRESHOLDS,
  additionalIndependentToReach,
  combineAll,
  combineSteps,
  distancesAhead,
  duplicateSystems,
  goldHeadline,
  goldPaths,
  nextThreshold,
  type WpiFlags,
  type WpiSource,
} from "@/lib/wpi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Disclaimer } from "@/components/disclaimer";
import { FeedbackPanel } from "@/components/feedback-panel";
import { LastChecked } from "@/components/last-checked";
import { pageTitle } from "@/lib/brand";
import { uid } from "@/lib/id";

/** GARP combining rules and Gold Card thresholds. Not the MRCA dollar-rate date. */
const CALCULATOR_LAST_CHECKED = "19 October 2026";

export const Route = createFileRoute("/calculator")({
  component: CalculatorPage,
  head: () => ({
    meta: [
      { title: pageTitle("Whole-person impairment calculator") },
      {
        name: "description",
        content:
          "Combine accepted impairment points the GARP way and see the distance to Gold Card. Estimate only.",
      },
    ],
  }),
});

type Row = { id: string; label: string; points: string; system: string };
type LodgeWhen = "before" | "after" | "not-yet" | "unknown" | "";

function newRow(): Row {
  return { id: uid(), label: "", points: "", system: "" };
}

function CalculatorPage() {
  const [rows, setRows] = useState<Row[]>([
    { id: "cond-1", label: "", points: "", system: "" },
    { id: "cond-2", label: "", points: "", system: "" },
  ]);
  const [flags, setFlags] = useState<WpiFlags>(DEFAULT_FLAGS);
  const [lodgeWhen, setLodgeWhen] = useState<LodgeWhen>("");

  const numeric = rows
    .map((r) => Number.parseInt(r.points, 10))
    .filter((n) => Number.isFinite(n) && n > 0)
    .map((n) => Math.min(100, n));
  const added = numeric.reduce((a, b) => a + b, 0);
  const combined = combineAll(numeric);
  const steps = combineSteps(numeric);
  const next = nextThreshold(combined, flags);
  const ahead = distancesAhead(numeric, flags);
  const paths = goldPaths(combined, flags);
  const headline = goldHeadline(combined, flags, next);
  const dupes = duplicateSystems(rows.map((r) => r.system));
  const overstated = added > combined ? added - combined : 0;
  const postTransition = lodgeWhen === "after" || lodgeWhen === "not-yet" || lodgeWhen === "unknown" || lodgeWhen === "";

  function patchFlag<K extends keyof WpiFlags>(key: K, value: WpiFlags[K]) {
    setFlags((f) => ({ ...f, [key]: value }));
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Tools</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        Whole-person impairment calculator
      </h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Enter impairment points from decision letters. They are combined the GARP Combined Values
        Chart way — highest first, not added — and the distance to Gold Card is worked as a new
        independent rating, not as “60 minus current.”
      </p>
      <p className="mt-3 rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
        Estimate only. Not a DVA decision and not medical or legal advice. Same-system conditions
        are often rated as one chapter total; two knee scores on this page can overstate the
        combined figure. Lifestyle ratings (0–7) change the dollar amount of PI, not these points.{" "}
        <Link to="/terms" className="font-semibold text-forest underline">
          Terms
        </Link>
        . Nothing typed here leaves this browser.
      </p>
      <LastChecked className="mt-3" date={CALCULATOR_LAST_CHECKED} />
      <p className="mt-2 text-ink-soft type-body">
        GARP M (F2026L00595) was still in force on 19 October 2026. The 30, 50 and 60 point Gold Card
        paths were last read in the Act on 17 September 2026. Dollar rates are dated on What changed.
      </p>

      <section className="mt-8 rounded-md border border-forest/30 bg-info-bg p-5">
        <fieldset>
          <legend className="text-base font-semibold">
            Was your permanent impairment claim lodged before or after 1 July 2026?
          </legend>
          <div className="mt-3 grid gap-2">
            {(
              [
                ["before", "Before 1 July 2026"],
                ["after", "On or after 1 July 2026"],
                ["not-yet", "I have not lodged one yet"],
                ["unknown", "I don’t know"],
              ] as [LodgeWhen, string][]
            ).map(([value, label]) => (
              <label key={value} className="flex min-h-11 cursor-pointer items-center gap-2 text-base">
                <input
                  type="radio"
                  name="lodge-when"
                  checked={lodgeWhen === value}
                  onChange={() => setLodgeWhen(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="mt-8 space-y-3">
        {rows.map((row, i) => (
          <div key={row.id} className="grid gap-2 rounded-md border border-rule bg-card p-3 sm:border-0 sm:bg-transparent sm:p-0 sm:grid-cols-[1fr_6.5rem_11rem_auto]">
            <div>
              <Label htmlFor={`lab-${row.id}`}>Condition {i + 1} (optional label)</Label>
              <Input
                id={`lab-${row.id}`}
                className="mt-1"
                autoComplete="off"
                value={row.label}
                placeholder="e.g. letter combined, or lumbar"
                onChange={(e) =>
                  setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, label: e.target.value } : r)))
                }
              />
            </div>
            <div>
              <Label htmlFor={`pts-${row.id}`}>Points</Label>
              <Input
                id={`pts-${row.id}`}
                className="mt-1"
                inputMode="numeric"
                autoComplete="off"
                value={row.points}
                placeholder="0–100"
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 3);
                  const n = digits === "" ? "" : String(Math.min(100, Number.parseInt(digits, 10) || 0));
                  setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, points: n } : r)));
                }}
              />
            </div>
            <div>
              <Label htmlFor={`sys-${row.id}`}>Body system</Label>
              <select
                id={`sys-${row.id}`}
                className="mt-1 h-11 w-full rounded-sm border border-rule bg-card px-2 text-sm"
                value={row.system}
                onChange={(e) =>
                  setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, system: e.target.value } : r)))
                }
              >
                {BODY_SYSTEMS.map((s) => (
                  <option key={s.id || "none"} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                disabled={rows.length <= 1}
                onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={() => setRows((rs) => [...rs, newRow()])}>
          Add another condition
        </Button>
        <p className="text-sm text-muted">
          If a letter already shows a combined figure, enter that as one row and any new condition
          as another. Do not re-enter the conditions that sit inside that combined figure.
        </p>
        {dupes.length ? (
          <p className="rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
            Two or more rows share a body system (
            {dupes
              .map((id) => BODY_SYSTEMS.find((s) => s.id === id)?.label ?? id)
              .join(", ")}
            ). DVA often rates that chapter once. This combined total may be high.
          </p>
        ) : null}
      </section>

      <section className="mt-8 rounded-md border border-rule bg-card p-5">
        <p className="text-sm font-semibold tracking-wide text-forest uppercase">Which Act, which path</p>
        <fieldset className="mt-3">
          <legend className="text-base font-semibold">Where these points come from</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {(
              [
                ["unsure", "Not sure / mix"],
                ["mrca", "MRCA PI points"],
                ["drca-vea", "Mostly DRCA / VEA"],
              ] as [WpiSource, string][]
            ).map(([value, label]) => (
              <label key={value} className="flex min-h-11 cursor-pointer items-center gap-2 text-base">
                <input
                  type="radio"
                  name="wpi-source"
                  checked={flags.source === value}
                  onChange={() => patchFlag("source", value)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-4 grid gap-2">
          <label className="flex min-h-11 cursor-pointer items-start gap-2 text-base">
            <input
              className="mt-1"
              type="checkbox"
              checked={flags.servicePension}
              onChange={(e) => patchFlag("servicePension", e.target.checked)}
            />
            <span>I receive a Service Pension (opens the 30-point Gold Card path if the 30 are MRCA points)</span>
          </label>
          <label className="flex min-h-11 cursor-pointer items-start gap-2 text-base">
            <input
              className="mt-1"
              type="checkbox"
              checked={flags.qualifyingServiceAge70}
              onChange={(e) => patchFlag("qualifyingServiceAge70", e.target.checked)}
            />
            <span>Qualifying service and I am 70 or over (Gold Card path that is not about these points)</span>
          </label>
          <label className="flex min-h-11 cursor-pointer items-start gap-2 text-base">
            <input
              className="mt-1"
              type="checkbox"
              checked={flags.srdpCandidate}
              onChange={(e) => patchFlag("srdpCandidate", e.target.checked)}
            />
            <span>I am eligible for, or being assessed for, SRDP (s 282 Gold Card if the other tests are met)</span>
          </label>
          <label className="flex min-h-11 cursor-pointer items-start gap-2 text-base">
            <input
              className="mt-1"
              type="checkbox"
              checked={flags.eligibleYoungPerson}
              onChange={(e) => patchFlag("eligibleYoungPerson", e.target.checked)}
            />
            <span>There is an eligible young person (s 80 extra PI at 80 points)</span>
          </label>
        </div>
      </section>

      <section className="mt-8 rounded-md border border-rule bg-card p-5">
        <p className="text-sm font-semibold tracking-wide text-forest uppercase">Combined whole-person</p>
        <p className="font-display mt-2 text-5xl font-semibold tabular-nums text-forest">{combined}</p>
        <p className="mt-1 text-sm text-muted">
          Simple add {added || 0}
          {overstated ? ` · combination removes ${overstated} (overlap, not a deduction DVA “took”)` : ""}.
          Formula for each pair: A + B − AB/100, then round. Highest first.
        </p>
        {steps.length > 1 ? (
          <ol className="mt-4 space-y-1 text-ink-soft type-body">
            {steps.map((s, i) => (
              <li key={`${s.add}-${i}`}>
                {s.from === 0
                  ? `Start with ${s.add}`
                  : `${s.from} with ${s.add} → ${s.to} (${s.from} + ${s.add} − ${s.deducted.toFixed(1)})`}
              </li>
            ))}
          </ol>
        ) : null}

        <div className="mt-6">
          <div className="flex justify-between text-xs font-semibold text-muted">
            <span>0</span>
            <span>Gold 60</span>
            <span>100</span>
          </div>
          <div className="mt-1 h-3 overflow-hidden rounded-sm bg-paper-3">
            <div className="h-full bg-gold" style={{ width: `${Math.min(100, combined)}%` }} />
          </div>
        </div>

        <p className="mt-4 text-base font-semibold text-ink">{headline}</p>

        {lodgeWhen === "before" ? (
          <p className="mt-4 rounded-md border border-rule bg-paper-2 px-4 py-3 type-body">
            This combined figure is an estimate under the Approved DRCA Guide. It is not an
            entitlement and it is not DVA’s assessment. Only DVA’s determination counts.
          </p>
        ) : (
          <p className="mt-4 rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
            <strong className="font-semibold">This number may not be the one that matters.</strong> For
            claims from 1 July 2026, DVA works from a baseline impairment rating (Chapter 26) and
            asks whether your impairment has increased by at least five points above it (Chapter 25).{" "}
            <strong className="font-semibold">The increase is what is compensated, not the total.</strong>{" "}
            This tool does not know your baseline. A written question can ask DVA what it is. See{" "}
            <Link to="/transition" hash="baseline" className="font-semibold text-forest underline">
              What changed on 1 July 2026
            </Link>
            .
          </p>
        )}
        <p className="mt-3 font-medium text-ink type-body">
          An estimate, not an entitlement. DVA’s determination is the only number that counts.
        </p>
      </section>

      {ahead.length ? (
        <section className="mt-8 rounded-md border border-rule bg-card p-5">
          <h2 className="font-display text-2xl font-semibold">Distance is not subtraction</h2>
          <p className="mt-2 text-ink-soft type-body">
            Combined shortfall is what the chart still needs. A <em>new</em> condition is combined
            with what you already have, so it has to be larger than that shortfall. Worsening an
            existing rating replaces that number, then the set is recombined — often fewer extra
            points than a brand-new condition.
          </p>
          {postTransition ? (
            <p className="mt-2 text-ink-soft type-body">
              After 1 July 2026 the five-point gate above your Chapter 26 baseline can matter more
              than the distance to 60. This table does not know your baseline.
            </p>
          ) : null}
          <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label="Impairment table, scrolls sideways">
            <table className="w-full min-w-[22rem] text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-muted">
                  <th className="py-2 pr-3 font-semibold">Mark</th>
                  <th className="py-2 pr-3 font-semibold">Combined short</th>
                  <th className="py-2 pr-3 font-semibold">New condition</th>
                  <th className="py-2 font-semibold">Worsen highest</th>
                </tr>
              </thead>
              <tbody>
                {ahead.slice(0, 4).map((d) => (
                  <tr key={d.threshold.id} className="border-b border-rule/70">
                    <td className="py-2 pr-3">{d.threshold.points}</td>
                    <td className="py-2 pr-3 tabular-nums">{d.combinedShortfall}</td>
                    <td className="py-2 pr-3 tabular-nums">
                      {d.newIndependent == null ? "Cannot with one extra" : d.newIndependent}
                    </td>
                    <td className="py-2 tabular-nums">
                      {d.worsenLargest == null
                        ? "Highest to 100 still short"
                        : d.worsenLargest.increase === 0
                          ? "—"
                          : `+${d.worsenLargest.increase} (${d.worsenLargest.from}→${d.worsenLargest.to})`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {numeric.length >= 1 && next && additionalIndependentToReach(combined, next.points) !== next.points - combined ? (
            <p className="mt-3 text-ink-soft type-body">
              Example of the trap: {combined} combined looking at {next.points} looks like a{" "}
              {next.points - combined}-point gap. A new independent condition would need{" "}
              {additionalIndependentToReach(combined, next.points)} points on the letter.
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Gold Card paths on these figures</h2>
        <ul className="mt-3 space-y-2">
          {paths.map((p) => (
            <li
              key={p.id}
              className={
                p.open
                  ? "rounded-md border border-forest/40 bg-info-bg px-4 py-3"
                  : "rounded-md border border-rule bg-card px-4 py-3"
              }
            >
              <p className="font-semibold">
                {p.open ? "Threshold met — " : ""}
                {p.title}
              </p>
              <p className="mt-1 text-ink-soft type-body">{p.caveat}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Points thresholds this tool watches</h2>
        <ul className="mt-3 space-y-2">
          {THRESHOLDS.map((t) => {
            const gatedOff = t.id === "gold-sp" && !flags.servicePension;
            const met = !gatedOff && combined >= t.points;
            return (
              <li
                key={t.id}
                className={
                  met
                    ? "rounded-md border border-forest/40 bg-info-bg px-4 py-3"
                    : "rounded-md border border-rule bg-card px-4 py-3"
                }
              >
                <p className="font-semibold">
                  {t.label}
                  {gatedOff ? " — not counted (no Service Pension ticked)" : ""}
                  {t.id === "s80" && flags.eligibleYoungPerson && combined >= 80
                    ? " — eligible young person ticked"
                    : ""}
                </p>
                <p className="mt-1 text-ink-soft type-body">{t.note}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-ink-soft type-body">
          Read the{" "}
          <Link
            to="/guides/$slug"
            params={{ slug: "permanent-impairment" }}
            className="font-semibold text-forest underline"
          >
            permanent impairment guide
          </Link>
          ,{" "}
          <Link to="/transition" hash="baseline" className="font-semibold text-forest underline">
            What changed on 1 July 2026
          </Link>
          , and DVA’s{" "}
          <a
            className="font-semibold text-forest underline"
            href="https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions"
          >
            Veteran Card — all conditions
          </a>{" "}
          page.
        </p>
        <p className="mt-3 font-medium text-ink type-body">
          An estimate, not an entitlement — check your own letter.
        </p>
      </section>
      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer lastChecked={CALCULATOR_LAST_CHECKED} />
      </div>
    </main>
  );
}
