/**
 * Review and response clocks veterans actually miss.
 * Windows are calendar months or calendar days — 3 months is not 90 days.
 * The decision letter is the source. This table is a guide.
 * Last checked: 19 October 2026 against the pages linked below.
 */

export const DEADLINES_LAST_CHECKED = "19 October 2026";

export type ClockConfidence = "Confirmed" | "Check";
export type WindowUnit = "days" | "months";
export type RunsFrom = "letter" | "receipt";

export type Clock = {
  id: string;
  label: string;
  windowAmount: number;
  windowUnit: WindowUnit;
  runsFrom: RunsFrom;
  confidence: ClockConfidence;
  sourceLabel: string;
  sourceHref: string;
  note: string;
  cautionExtra?: string;
  irreversible?: boolean;
  highlight?: "danger";
  /** Count from receipt, but also compute the letter-date expiry and count the days remaining to the earlier. */
  dualWording?: boolean;
};

export const clocks: Clock[] = [
  {
    id: "dva-vrb",
    label: "DVA letter about compensation — usually 12 months",
    windowAmount: 12,
    windowUnit: "months",
    runsFrom: "receipt",
    confidence: "Confirmed",
    sourceLabel: "DVA single review pathway",
    sourceHref: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/single-review-pathway",
    note: "Veterans’ Review Board, for most compensation decisions from 21 April 2025. Still 12 months after 1 July 2026. DVA About the VRB (updated 1 July 2026): 12 months from the date you receive notice. DVA single review pathway (updated 3 July 2026): usually 12 months of the original decision. This tool counts from receipt. Your letter is the clock. VEA entitlement and death decisions: still 12 months, but DVA says the maximum arrears (backdating) only apply if you apply within 3 months.",
  },
  {
    id: "vea-rate-vrb",
    label: "VEA pension rate or attendant allowance → VRB",
    windowAmount: 3,
    windowUnit: "months",
    runsFrom: "receipt",
    confidence: "Confirmed",
    sourceLabel: "DVA single review pathway",
    sourceHref: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/single-review-pathway",
    note: "DVA timeframe summary (updated 3 July 2026): VEA pension rate and attendant allowance — 3 months. VEA entitlement/death is the 12-month clock, not this one.",
  },
  {
    id: "vrb-art",
    label: "VRB decision → ART",
    windowAmount: 3,
    windowUnit: "months",
    runsFrom: "receipt",
    dualWording: true,
    confidence: "Confirmed",
    sourceLabel: "DVA single review pathway",
    sourceHref: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/single-review-pathway",
    note: "Two official wordings. ART.gov.au veterans’ entitlements counts three calendar months from when you receive the VRB decision. DVA’s single review pathway (updated 3 July 2026) says “For ART appeals, you have 3 months from a VRB decision.” Three calendar months, not 90 days. If the notice date and the date you received it differ, this tool shows both expiry dates and counts the days remaining to the earlier one.",
  },
  {
    id: "drca-reconsider",
    label: "Older DRCA determination → DVA reconsideration",
    windowAmount: 30,
    windowUnit: "days",
    runsFrom: "receipt",
    confidence: "Check",
    sourceLabel: "DVA single review pathway",
    sourceHref: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/single-review-pathway",
    note: "This 30-day reconsideration path is the older DRCA track. Original DRCA decisions on or after 21 April 2025 generally go to the VRB on the 12-month clock instead. Read the rights paragraph on your letter before you use this row.",
  },
  {
    id: "drca-art",
    label: "Older DRCA reconsideration → ART",
    windowAmount: 60,
    windowUnit: "days",
    runsFrom: "receipt",
    dualWording: true,
    confidence: "Check",
    sourceLabel: "DVA Administrative Review Tribunal page",
    sourceHref: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/administrative-review-tribunal",
    note: "DVA: original DRCA decisions made before 21 April 2025 and reconsidered by DVA must be brought to the ART within 60 days of the reconsideration. This site counts from receipt. If the reconsideration date on the letter is earlier, this tool counts the days remaining to that earlier date. From 21 April 2025, DRCA after VRB uses the 3-month ART clock.",
  },
  {
    id: "foi-internal",
    label: "FOI decision → internal review",
    windowAmount: 30,
    windowUnit: "days",
    runsFrom: "letter",
    confidence: "Check",
    sourceLabel: "OAIC — apply for an internal review",
    sourceHref:
      "https://www.oaic.gov.au/freedom-of-information/your-freedom-of-information-rights/freedom-of-information-reviews/internal-review",
    note: "OAIC: ask the agency in writing within 30 days of receiving its decision. The agency must then decide within 30 days of receiving your application. Internal review is not available for a minister’s decision or a deemed decision. Confirm on the FOI decision letter.",
  },
  {
    id: "foi-24ab",
    label: "FOI practical refusal notice (s 24AB)",
    windowAmount: 14,
    windowUnit: "days",
    runsFrom: "letter",
    confidence: "Confirmed",
    sourceLabel: "Freedom of Information Act 1982 s 24AB",
    sourceHref: "https://www.legislation.gov.au/C2004A02562/latest/text",
    note: "FOI Act s 24AB(2)(e): consultation period is 14 days after the day you are given the notice. If you do not consult in that period, s 24AB(7) treats the request as withdrawn. DVA’s FOI guidelines apply this process. The Act still uses 14 days.",
    cautionExtra:
      "This one is different. If you do not respond within the consultation period, your FOI request is taken to have been withdrawn. Doing nothing loses the whole request. Even a short reply narrowing what you asked for keeps it alive.",
    highlight: "danger",
  },
  {
    id: "foi-oaic-refusal",
    label: "FOI access refusal → OAIC Information Commissioner review",
    windowAmount: 60,
    windowUnit: "days",
    runsFrom: "letter",
    confidence: "Check",
    sourceLabel: "OAIC — Information Commissioner review",
    sourceHref:
      "https://www.oaic.gov.au/freedom-of-information/your-freedom-of-information-rights/freedom-of-information-reviews/information-commissioner-review",
    note: "OAIC published window: 60 days from written notice of an access-refusal (or a charge decision). The letter is the clock. No fee.",
  },
  {
    id: "foi-oaic-ir",
    label: "FOI internal review decision → OAIC",
    windowAmount: 60,
    windowUnit: "days",
    runsFrom: "letter",
    confidence: "Check",
    sourceLabel: "OAIC — Information Commissioner review",
    sourceHref:
      "https://www.oaic.gov.au/freedom-of-information/your-freedom-of-information-rights/freedom-of-information-reviews/information-commissioner-review",
    note: "OAIC (updated 20 August 2026) publishes 60 days from written notice of a decision to refuse access or to charge, and 30 days if you are objecting to access being given to someone else. It does not publish a shorter limit for an internal review decision, so 60 days is the published limit. Lodge as soon as you can: the letter is the clock. A deemed refusal (no decision in time) can also go to the OAIC.",
  },
  {
    id: "srdp-election",
    label: "SRDP written offer → election",
    windowAmount: 12,
    windowUnit: "months",
    runsFrom: "letter",
    confidence: "Confirmed",
    sourceLabel: "DVA Special Rate Disability Pension",
    sourceHref:
      "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/eligibility-for-disability-compensation-payments/special-rate-disability-pension",
    note: "DVA SRDP page (updated 1 July 2026): 12 months from the date of the written offer. Once you choose to receive SRDP, it cannot be changed. Financial advice is required before SRDP can commence. Eligibility (Gold Card TPI, MRCAETS) is a different question from taking the payment — see What changed on 1 July 2026.",
    irreversible: true,
  },
  {
    id: "ahrc-court",
    label: "AHRC termination → court (s 46PO)",
    windowAmount: 60,
    windowUnit: "days",
    runsFrom: "letter",
    confidence: "Confirmed",
    sourceLabel: "Australian Human Rights Commission Act 1986 s 46PO",
    sourceHref: "https://www.legislation.gov.au/C2004A03366/latest/text",
    note: "Australian Human Rights Commission Act 1986 s 46PO(2): apply to the Federal Court or Federal Circuit and Family Court within 60 days after the date of issue of the termination notice. Section 46PO(3A) deals with when the court’s leave is also needed. This is not a DVA review; the termination notice states the time.",
  },
  {
    id: "hccc-review",
    label: "HCCC assessment decision → you request a review (NSW complainant)",
    windowAmount: 28,
    windowUnit: "days",
    runsFrom: "receipt",
    confidence: "Confirmed",
    sourceLabel: "NSW HCCC complaints process (Health Care Complaints Act 1993 s 28(9))",
    sourceHref: "https://www.hccc.nsw.gov.au/Understanding-Complaints/complaints-process",
    note: "This is the complainant’s clock, not the provider’s. s 28(9): the Commission must review if you ask within 28 days after you are notified of the assessment decision. HCCC’s complaints-process page (updated 8 October 2025) says the same. The provider is given a separately specified time to respond during the 60-day assessment — that is not this window. Other states use different bodies.",
  },
];

export function getClock(id: string): Clock | undefined {
  return clocks.find((c) => c.id === id);
}

export function parseLocalDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return dt;
}

export function formatIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDisplay(date: Date): string {
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function addWindow(start: Date, amount: number, unit: WindowUnit): Date {
  if (unit === "months") {
    const day = start.getDate();
    const next = new Date(start.getFullYear(), start.getMonth() + amount, day);
    if (next.getDate() !== day) {
      // Overflowed the target month (e.g. 31 Jan + 1 month). Land on its last day.
      return new Date(start.getFullYear(), start.getMonth() + amount + 1, 0);
    }
    return next;
  }
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + amount);
}

export function defaultReceivedIso(letterIso: string): string {
  const letter = parseLocalDate(letterIso);
  if (!letter) return "";
  return formatIso(addWindow(letter, 3, "days"));
}

export type ClockResult = {
  clock: Clock;
  start: Date;
  expiry: Date;
  daysRemaining: number;
  usedDefaultReceipt: boolean;
  letterExpiry?: Date;
  saferExpiry?: Date;
};

export function computeClock(input: {
  clock: Clock;
  letterIso: string;
  receivedIso?: string;
  today?: Date;
}): ClockResult | null {
  const letter = parseLocalDate(input.letterIso);
  if (!letter) return null;
  const receivedRaw = input.receivedIso?.trim()
    ? parseLocalDate(input.receivedIso)
    : addWindow(letter, 3, "days");
  if (!receivedRaw) return null;
  const usedDefaultReceipt = !input.receivedIso?.trim();
  const start = input.clock.runsFrom === "receipt" ? receivedRaw : letter;
  const expiry = addWindow(start, input.clock.windowAmount, input.clock.windowUnit);
  const letterExpiry = input.clock.dualWording
    ? addWindow(letter, input.clock.windowAmount, input.clock.windowUnit)
    : undefined;
  const saferExpiry =
    letterExpiry && letterExpiry.getTime() < expiry.getTime() ? letterExpiry : expiry;
  const today = input.today ?? new Date();
  const todayLocal = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const ms = saferExpiry.getTime() - todayLocal.getTime();
  const daysRemaining = Math.round(ms / 86400000);
  return {
    clock: input.clock,
    start,
    expiry,
    daysRemaining,
    usedDefaultReceipt,
    letterExpiry,
    saferExpiry: input.clock.dualWording ? saferExpiry : undefined,
  };
}

export function windowLabel(clock: Clock): string {
  const n = clock.windowAmount;
  const unit = clock.windowUnit === "months" ? (n === 1 ? "month" : "months") : n === 1 ? "day" : "days";
  return `${n} ${unit}`;
}

export function runsFromLabel(clock: Clock): string {
  if (clock.dualWording) {
    return "Receipt of the decision. This tool also counts from the notice date and uses the earlier expiry";
  }
  return clock.runsFrom === "receipt"
    ? "Receipt of the letter (we default to letter date + 3 days if you leave it blank)"
    : "Date on the letter / notice";
}

export function clockIdForClaimType(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("foi")) return "foi-internal";
  if (t.includes("appeal")) return "vrb-art";
  return "dva-vrb";
}
