import { Link } from "@tanstack/react-router";
import { processingTimes, type ProcessingStream } from "@/content/processing-times";

const n = (v: number) => v.toLocaleString("en-AU");
const days = (v: number | null) => (v == null ? "Not published" : `${v} days`);

/**
 * Compact summary of DVA's published processing times. Every figure comes from
 * src/content/processing-times.ts, which the weekly fact check keeps right.
 * It sits below the first screen so the "what do you need" prompt comes first,
 * and it does not move: nothing scrolls or animates.
 */
function Tile({ row }: { row: ProcessingStream }) {
  const rows: [string, string][] = [
    ["To allocate (average)", days(row.allocateDays)],
    ["To process (average, last 12 months)", days(row.processDays)],
    ["Age of files still waiting (average)", days(row.outstandingAgeDays)],
  ];
  const flow: string[] = [];
  if (row.intake12m != null) flow.push(`${n(row.intake12m)} received`);
  if (row.determined12m != null) flow.push(`${n(row.determined12m)} decided`);
  return (
    <li className="rounded-md border border-rule bg-card p-4">
      <h3 className="font-display text-base font-semibold">{row.type}</h3>
      <p className="mt-1 text-sm">
        <span className="font-display text-2xl font-semibold text-forest tabular-nums">
          {n(row.onHand)}
        </span>{" "}
        <span className="text-ink-soft">claims yet to be finalised</span>
      </p>
      <dl className="mt-2 space-y-1 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 border-t border-rule pt-1">
            <dt className="text-ink-soft">{label}</dt>
            <dd className="shrink-0 font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      {flow.length ? (
        <p className="mt-2 text-xs text-muted">Last 12 months: {flow.join(", ")}.</p>
      ) : null}
    </li>
  );
}

export function WaitBanner() {
  const t = processingTimes;
  const total = t.streams.reduce((sum, row) => sum + row.onHand, 0);
  return (
    <section id="wait-times" className="border-b border-rule bg-paper-2" aria-labelledby="wait-heading">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h2 id="wait-heading" className="font-display text-2xl font-semibold tracking-tight">
          DVA’s own published wait times
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          As at {t.asAt}. DVA page updated {t.pageUpdated}, last checked here {t.lastChecked}.
        </p>
        <div className="mt-4 rounded-md border-2 border-gold bg-forest p-5 text-center text-paper sm:p-8">
          <p className="text-sm font-semibold tracking-[0.14em] text-gold-2 uppercase">
            Claims yet to be finalised
          </p>
          <p className="font-display mt-1 text-6xl font-semibold tracking-tight text-gold-2 tabular-nums sm:text-7xl md:text-8xl">
            {n(total)}
          </p>
          <p className="mt-2 text-base font-semibold">
            across the four streams DVA reports, as at {t.asAt}
          </p>
          <p className="mx-auto mt-3 max-w-2xl type-body text-paper/85">
            DVA does not publish this as one total. It is the four counts below added together, from
            DVA’s own processing-times page. It leaves out rehabilitation, incapacity and treatment
            work.
          </p>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.streams.map((row) => (
            <Tile key={row.type} row={row} />
          ))}
        </ul>
        <p className="mt-4 max-w-3xl type-body text-ink-soft">
          These are averages, not promises. Process time includes allocation and leaves out time DVA
          is waiting on you or someone else. “Age of files still waiting” is a different measure from
          “to process”, so do not compare the two. {t.presumptiveNote}{" "}
          <Link
            to="/guides/$slug"
            params={{ slug: "presumptive-liability" }}
            className="font-semibold text-forest underline"
          >
            Presumptive liability
          </Link>
          .
        </p>
        <p className="mt-2 text-sm">
          <a
            href={t.sourceHref}
            className="font-semibold text-forest underline"
            target="_blank"
            rel="noreferrer"
          >
            DVA source page
          </a>
          {" · "}
          <Link
            to="/guides/$slug"
            params={{ slug: "delays" }}
            className="font-semibold text-forest underline"
          >
            If yours is sitting
          </Link>
        </p>
      </div>
    </section>
  );
}
