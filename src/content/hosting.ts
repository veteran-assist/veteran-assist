/**
 * Optional voluntary "chip in toward hosting" meter.
 *
 * Nothing here states a specific host or a specific cost. The monthly target,
 * PayID and PayPal.me all come from environment variables on the server
 * (HOSTING_MONTHLY_TARGET_CENTS, HOSTING_PAYID, HOSTING_PAYPAL_ME). When either
 * the target or the PayID is missing, the meter is hidden and nothing is collected.
 */
export const hosting = {
  currency: "AUD",
  /** Calendar months in Australia/Melbourne. */
  timeZone: "Australia/Melbourne",
  payIdName: "Veteran Assist hosting",
};

export function monthKey(at: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: hosting.timeZone,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(at);
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  return `${year}-${month}`;
}

export function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

export function nextMonthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month, 1).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

export function formatAud(cents: number): string {
  return (cents / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
}

export function remainingCents(raisedCents: number, targetCents: number): number {
  return Math.max(0, targetCents - Math.max(0, raisedCents));
}

export function clampPledge(amountCents: number, remaining: number): number | null {
  if (!Number.isInteger(amountCents) || amountCents < 100) return null;
  if (remaining < 100) return null;
  if (amountCents > remaining) return null;
  return amountCents;
}

export function amountChips(remaining: number, targetCents: number): number[] {
  if (remaining < 100) return [];
  const out: number[] = [];
  for (const chip of [300, 600, targetCents]) {
    if (chip < remaining) out.push(chip);
  }
  out.push(remaining);
  return out;
}

/** Usual PayPal commercial cut in Australia — not this site’s merchant schedule. */
export function paypalFeeCents(amountCents: number): number {
  return Math.round(amountCents * 0.029) + 30;
}
