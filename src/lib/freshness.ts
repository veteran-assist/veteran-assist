/**
 * How old is a guide's "last checked" date? Used to warn readers when a guide has gone
 * a long time without being re-checked against the official pages.
 *
 * STALE_AFTER_DAYS is a policy choice, not a measured figure: it is long enough not to
 * nag between the weekly fact checks, and short enough that a guide missed for a couple
 * of cycles says so on the page.
 */
export const STALE_AFTER_DAYS = 60;

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/** Parses "24 October 2026", or "August 2026" (taken as the 1st). Returns null for anything else. */
export function parseSiteDate(text: string | undefined): Date | null {
  if (!text) return null;
  const m = /^(?:(\d{1,2}) )?([A-Za-z]+) (\d{4})$/.exec(text.trim());
  if (!m) return null;
  const month = MONTHS.indexOf(m[2].toLowerCase());
  if (month < 0) return null;
  const d = new Date(Date.UTC(Number(m[3]), month, Number(m[1] ?? 1)));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function daysSince(text: string | undefined, now: Date): number | null {
  const d = parseSiteDate(text);
  if (!d) return null;
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((today - d.getTime()) / 86_400_000);
}

export function isStale(text: string | undefined, now: Date): boolean {
  const n = daysSince(text, now);
  return n != null && n > STALE_AFTER_DAYS;
}
