/** Client and server: detect identifying details before they leave the device. */

export type PiiHit = {
  kind: string;
};

/*
 * These patterns must catch real identifiers without blocking ordinary questions.
 * Every identifier pattern needs digits (or an @) to match: plain words such as
 * "actually", "Victoria", "salary" or "Tasmania" are never a claim number.
 * scripts/privacy.test.mjs holds both lists — add a case there when changing a pattern.
 * Used by Feedback (browser and server).
 */
const MONTH = "(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*";
const DATE = `(?:\\d{1,2}[\\s/.-]+\\d{1,2}[\\s/.-]+\\d{2,4}|\\d{1,2}(?:st|nd|rd|th)?\\s+${MONTH},?\\s+\\d{2,4}|${MONTH}\\s+\\d{1,2}(?:st|nd|rd|th)?,?\\s+\\d{2,4})`;
// Street suffixes, case-insensitive by hand: the street name itself must start
// with a capital letter, so "3 months to court" is not an address.
const STREET_SUFFIX =
  "(?:[Ss]t|[Ss]treet|[Rr]d|[Rr]oad|[Aa]ve|[Aa]venue|[Dd]r|[Dd]rive|[Cc]t|[Cc]ourt|[Pp]l|[Pp]lace|[Pp]de|[Pp]arade|[Hh]wy|[Hh]ighway|[Cc]res|[Cc]rescent|[Cc]l|[Cc]lose|[Tt]ce|[Tt]errace|[Ll]ane|[Ww]ay)";
const NOT_A_COURT = "(?!(?:Federal|High|Family|Supreme|Magistrates|District|County|Circuit|Local)\\b)";

const PATTERNS: { kind: string; re: RegExp }[] = [
  { kind: "email address", re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { kind: "mobile number", re: /\b(?:\+61\s?4|04)\d{2}[\s-]?\d{3}[\s-]?\d{3}\b/ },
  // DVA file and service numbers: a state or file prefix joined to 4+ digits (NSM33446, VX123456, QLD12345).
  {
    kind: "claim or file number",
    re: /\b(?:NSM|NWM|QSM|VSM|WSM|SSM|TSM|QLD|VIC|NSW|WA|SA|TAS|NT|ACT|N|Q|V|W|S|T)[A-Z]{0,2}\d{4,}\b/i,
  },
  // Claim references with a known prefix. Five or more digits, so a year ("ASP 2026") is not a match.
  { kind: "claim or file number", re: /\b(?:ILC|SPI|INC|ASP|UIN|LEX|TRN)[\s-]?\d{5,}\b/i },
  { kind: "claim or file number", re: /\b\d{4}[A-Z]\d{4,}\b/ },
  { kind: "long number (card, TFN, or similar)", re: /\b\d{3}[\s-]?\d{3}[\s-]?\d{3}\b/ },
  // A date of birth, not a question about the field: needs DOB wording next to an actual date.
  {
    kind: "date of birth",
    re: new RegExp(`\\b(?:d\\.?o\\.?b\\.?|date of birth|birth ?date|born(?:\\s+on)?)\\b[\\s:,-]*(?:is\\s+|was\\s+)?${DATE}`, "i"),
  },
  {
    kind: "street address",
    re: new RegExp(`\\b\\d{1,5}[A-Za-z]?\\s+${NOT_A_COURT}[A-Z][a-z]+(?:\\s+[A-Z][a-z]+)?\\s+${STREET_SUFFIX}\\b`),
  },
];

export function findPii(text: string): PiiHit[] {
  const found = new Map<string, PiiHit>();
  for (const { kind, re } of PATTERNS) {
    if (re.test(text)) found.set(kind, { kind });
  }
  return [...found.values()];
}

export function piiBlockMessage(hits: PiiHit[]): string {
  const kinds = hits.map((h) => h.kind).join(", ");
  return `That looks like personal information (${kinds}). Veteran Assist will not send it. Remove names, claim numbers, dates of birth, addresses, and phone numbers, then describe the problem in general terms.`;
}

export const PRIVACY_SUMMARY =
  "Letters, Pathfinder, My file, and the postcode lookup stay in this browser. We do not keep a copy. Do not put real claim numbers or medical details into feedback. We never lodge for you — you send it.";
