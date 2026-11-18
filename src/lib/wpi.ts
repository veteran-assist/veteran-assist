/**
 * GARP M / AMA combined-values combination (0–100).
 * Official method is the Combined Values Chart, highest first, one pair at a time.
 * Chart lookup is A + B − AB/100, then round to nearest integer — same as CLIK’s
 * worked example (15 + 10 → 24). Estimate only; chapter rules for the same body
 * system are not modelled.
 */

export function clampPoints(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function normalize(points: number[]): number[] {
  return points.map(clampPoints).filter((n) => n > 0).sort((a, b) => b - a);
}

/** Combine two whole-person ratings. Order does not matter for a single pair. */
export function combineTwo(a: number, b: number): number {
  const hi = clampPoints(a);
  const lo = clampPoints(b);
  if (hi === 0) return lo;
  if (lo === 0) return hi;
  // Integer numerator avoids 0.1-binary drift before rounding.
  return Math.round((100 * (hi + lo) - hi * lo) / 100);
}

export function combineAll(points: number[]): number {
  const sorted = normalize(points);
  return sorted.reduce((acc, n) => (acc === 0 ? n : combineTwo(acc, n)), 0);
}

export type CombineStep = {
  from: number;
  add: number;
  deducted: number;
  raw: number;
  to: number;
};

/** Highest-first running combination, matching how the chart is walked. */
export function combineSteps(points: number[]): CombineStep[] {
  const sorted = normalize(points);
  const out: CombineStep[] = [];
  let acc = 0;
  for (const n of sorted) {
    if (acc === 0) {
      out.push({ from: 0, add: n, deducted: 0, raw: n, to: n });
      acc = n;
      continue;
    }
    const deducted = (acc * n) / 100;
    const raw = acc + n - deducted;
    const to = combineTwo(acc, n);
    out.push({ from: acc, add: n, deducted, raw, to });
    acc = to;
  }
  return out;
}

/**
 * Smallest new independent rating B such that combine(current, B) >= target.
 * This is what a *new* accepted condition has to be worth — not (target − current).
 */
export function additionalIndependentToReach(current: number, target: number): number | null {
  const a = clampPoints(current);
  const t = clampPoints(target);
  if (a >= t) return 0;
  if (t === 0) return 0;
  for (let b = 1; b <= 100; b++) {
    if (combineTwo(a, b) >= t) return b;
  }
  return null;
}

export type WorsenResult = {
  from: number;
  to: number;
  increase: number;
  index: number;
};

/**
 * Smallest increase to the current highest rating (replacing it, then recombining)
 * that reaches target. Different from adding a new condition: a worsening of an
 * already-rated condition is not combined with its old figure.
 */
export function worsenLargestToReach(points: number[], target: number): WorsenResult | null {
  const t = clampPoints(target);
  const raw = points.map(clampPoints);
  if (combineAll(raw) >= t) {
    const index = indexOfLargest(raw);
    const from = raw[index] ?? 0;
    return { from, to: from, increase: 0, index };
  }
  const live = raw.filter((n) => n > 0);
  if (!live.length) {
    const need = additionalIndependentToReach(0, t);
    if (need == null) return null;
    return { from: 0, to: need, increase: need, index: -1 };
  }
  const index = indexOfLargest(raw);
  const from = raw[index] ?? 0;
  for (let to = from + 1; to <= 100; to++) {
    const next = raw.map((n, i) => (i === index ? to : n));
    if (combineAll(next) >= t) return { from, to, increase: to - from, index };
  }
  return null;
}

function indexOfLargest(points: number[]): number {
  let idx = 0;
  for (let i = 1; i < points.length; i++) {
    if ((points[i] ?? 0) > (points[idx] ?? 0)) idx = i;
  }
  return idx;
}

export type Threshold = {
  points: number;
  id: string;
  label: string;
  note: string;
};

export const THRESHOLDS: Threshold[] = [
  {
    points: 5,
    id: "special-min",
    label: "5 points — some PI items",
    note: "Hearing, fingers/toes, taste or smell can pay from 5 points.",
  },
  {
    points: 10,
    id: "pi-min",
    label: "10 points — PI usually payable",
    note: "Most permanent impairment compensation needs 10 combined points.",
  },
  {
    points: 30,
    id: "gold-sp",
    label: "30 points + Service Pension — Gold Card path",
    note: "VEA s 85(7A): Service Pension plus ≥30 MRCA impairment points. The 30 must be MRCA-assessed, not a raw DRCA percentage.",
  },
  {
    points: 50,
    id: "srdp",
    label: "50 points — SRDP / s 282 Gold Card (other tests too)",
    note: "SRDP also needs incapacity/work tests. If you are eligible for SRDP (even if you do not elect it), MRCA s 282 is a Gold Card path.",
  },
  {
    points: 60,
    id: "gold",
    label: "60 points — Gold Card (MRCA s 281)",
    note: "Usual all-conditions Veteran Card path. DRCA/VEA-only veterans generally need a new MRCA condition or a 5-point worsening after 1 July 2026.",
  },
  {
    points: 80,
    id: "s80",
    label: "80 points — max PI rate / s 80 extra",
    note: "Maximum PI compensation rate if you have no VEA/DRCA accepted conditions. Extra s 80 compensation can apply if there is an eligible young person.",
  },
];

export type WpiSource = "mrca" | "drca-vea" | "unsure";

export type WpiFlags = {
  servicePension: boolean;
  qualifyingServiceAge70: boolean;
  eligibleYoungPerson: boolean;
  srdpCandidate: boolean;
  source: WpiSource;
};

export const DEFAULT_FLAGS: WpiFlags = {
  servicePension: false,
  qualifyingServiceAge70: false,
  eligibleYoungPerson: false,
  srdpCandidate: false,
  source: "unsure",
};

export function thresholdApplies(t: Threshold, flags: WpiFlags): boolean {
  if (t.id === "gold-sp" && !flags.servicePension) return false;
  return true;
}

export function nextThreshold(
  combined: number,
  flags: WpiFlags = DEFAULT_FLAGS,
): Threshold | null {
  return THRESHOLDS.find((t) => combined < t.points && thresholdApplies(t, flags)) ?? null;
}

export type Distance = {
  threshold: Threshold;
  combinedShortfall: number;
  newIndependent: number | null;
  worsenLargest: WorsenResult | null;
};

export function distanceTo(points: number[], target: number): Distance | null {
  const threshold = THRESHOLDS.find((t) => t.points === target);
  if (!threshold) return null;
  const combined = combineAll(points);
  return {
    threshold,
    combinedShortfall: Math.max(0, threshold.points - combined),
    newIndependent: additionalIndependentToReach(combined, threshold.points),
    worsenLargest: worsenLargestToReach(points, threshold.points),
  };
}

export function distancesAhead(points: number[], flags: WpiFlags): Distance[] {
  const combined = combineAll(points);
  return THRESHOLDS.filter((t) => combined < t.points && thresholdApplies(t, flags)).map((t) => ({
    threshold: t,
    combinedShortfall: t.points - combined,
    newIndependent: additionalIndependentToReach(combined, t.points),
    worsenLargest: worsenLargestToReach(points, t.points),
  }));
}

export type GoldPath = {
  id: string;
  title: string;
  open: boolean;
  caveat: string;
};

export function goldPaths(combined: number, flags: WpiFlags): GoldPath[] {
  const mrcaish = flags.source !== "drca-vea";
  const transition =
    "DRCA/VEA-only points generally need a new MRCA condition or a 5-point worsening under GARP M after 1 July 2026 before this threshold bites.";

  return [
    {
      id: "age70",
      title: "Qualifying service at 70",
      open: flags.qualifyingServiceAge70,
      caveat:
        "A different statutory path from impairment points. Confirm qualifying service on the DVA Gold Card page.",
    },
    {
      id: "sp30",
      title: "30 MRCA points + Service Pension (VEA s 85(7A))",
      open: flags.servicePension && combined >= 30 && mrcaish,
      caveat: mrcaish
        ? "The 30 points have to be a MRCA permanent-impairment figure, not an old DRCA whole-person percentage."
        : transition,
    },
    {
      id: "srdp50",
      title: "SRDP-eligible (MRCA s 282) — 50 points plus other tests",
      open: flags.srdpCandidate && combined >= 50,
      caveat:
        "50 points are necessary, not sufficient. Incapacity and work tests still apply. Eligibility (even without electing SRDP) is the Gold Card trigger.",
    },
    {
      id: "s281",
      title: "60 combined MRCA points (s 281)",
      open: combined >= 60 && mrcaish,
      caveat: mrcaish
        ? "Usual all-conditions card path. Confirm on your PI decision. Same-system overlap can pull a napkin total down."
        : transition,
    },
  ];
}

export function goldHeadline(combined: number, flags: WpiFlags, next: Threshold | null): string {
  const paths = goldPaths(combined, flags);
  const open = paths.filter((p) => p.open);
  if (open.length) {
    return `A Gold Card path looks open on these figures: ${open.map((p) => p.title).join("; ")}. That is a statutory threshold, not a DVA decision — confirm on your letter.`;
  }
  if (combined >= 60 && flags.source === "drca-vea") {
    return "You are at or over 60 combined, but these are marked as DRCA/VEA points. That is not automatically a Gold Card after 1 July 2026 — you generally need a new MRCA condition or a 5-point worsening assessed under GARP M.";
  }
  if (!next) return "At or over the listed points thresholds. Gold Card still depends on which Act the points sit under.";
  const d = additionalIndependentToReach(combined, next.points);
  const short = next.points - combined;
  if (d == null) {
    return `${short} combined point${short === 1 ? "" : "s"} short of ${next.label}. A single extra condition may not be enough — check the distance table.`;
  }
  if (d === short) {
    return `${short} combined point${short === 1 ? "" : "s"} short of ${next.label}.`;
  }
  return `${short} combined point${short === 1 ? "" : "s"} short of ${next.label} — but a new independent condition would need about ${d} letter points, not ${short}, because combination is diminishing.`;
}

export const BODY_SYSTEMS = [
  { id: "", label: "System (optional)" },
  { id: "psych", label: "Psychiatric" },
  { id: "spine", label: "Spine" },
  { id: "upper", label: "Upper limb" },
  { id: "lower", label: "Lower limb" },
  { id: "skin", label: "Skin" },
  { id: "hearing", label: "Hearing / ENT" },
  { id: "vision", label: "Vision" },
  { id: "neuro", label: "Neurological" },
  { id: "cardio", label: "Cardiovascular" },
  { id: "resp", label: "Respiratory" },
  { id: "other", label: "Other" },
] as const;

export function duplicateSystems(systemIds: string[]): string[] {
  const counts = new Map<string, number>();
  for (const id of systemIds) {
    if (!id) continue;
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, n]) => n > 1).map(([id]) => id);
}
