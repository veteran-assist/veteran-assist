import { houseByElectorate, type HouseMember } from "@/content/postcode/house";
import { senatorsFor, type Senator } from "@/content/postcode/senate";
import {
  stateSupport,
  type StateCode,
  type StateSupport,
} from "@/content/postcode/support";
import pcMap from "@/content/postcode/pc-map.json";
import lgas from "@/content/postcode/lgas.json";

type PcMap = {
  electorates: string[];
  postcodes: Record<string, number[]>;
};

const map = pcMap as PcMap;
const lgaByPc = lgas as Record<string, string[]>;

const STATE_CODES: StateCode[] = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

export function normalisePostcode(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 4) return null;
  return digits;
}

/** Range fallback when the bundled map has no row. Not a substitute for AEC. */
export function statesFromRange(pc: string): StateCode[] {
  const n = Number(pc);
  if (!Number.isInteger(n) || n < 200 || n > 7999) return [];
  if (n >= 200 && n <= 299) return ["ACT"];
  if (n >= 800 && n <= 999) return ["NT"];
  if (n >= 1000 && n <= 2599) return ["NSW"];
  if (n >= 2600 && n <= 2618) return ["ACT"];
  if (n >= 2619 && n <= 2899) return ["NSW"];
  if (n >= 2900 && n <= 2920) return ["ACT"];
  if (n >= 2921 && n <= 2999) return ["NSW"];
  if (n >= 3000 && n <= 3999) return ["VIC"];
  if (n >= 4000 && n <= 4999) return ["QLD"];
  if (n >= 5000 && n <= 5999) return ["SA"];
  if (n >= 6000 && n <= 6999) return ["WA"];
  if (n >= 7000 && n <= 7999) return ["TAS"];
  return [];
}

export type ElectorateHit = {
  electorate: string;
  member: HouseMember | null;
};

export type PostcodeResult = {
  postcode: string;
  electorates: ElectorateHit[];
  spansElectorates: boolean;
  states: StateCode[];
  spansStates: boolean;
  senators: Senator[];
  support: StateSupport[];
  councils: string[];
  knownToMap: boolean;
};

function uniqueStates(codes: StateCode[]): StateCode[] {
  const seen = new Set<StateCode>();
  const out: StateCode[] = [];
  for (const c of STATE_CODES) {
    if (codes.includes(c) && !seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  return out;
}

export function lookupPostcode(raw: string): PostcodeResult | null {
  const postcode = normalisePostcode(raw);
  if (!postcode) return null;

  const ids = map.postcodes[postcode] ?? [];
  const electorates: ElectorateHit[] = ids.map((id) => {
    const electorate = map.electorates[id];
    return { electorate, member: houseByElectorate[electorate] ?? null };
  });

  const fromMembers = electorates
    .map((e) => e.member?.state)
    .filter((s): s is StateCode => STATE_CODES.includes(s as StateCode));
  const states = uniqueStates(fromMembers.length ? fromMembers : statesFromRange(postcode));
  const senators = states.flatMap((s) => senatorsFor(s));
  const support = states.map((s) => stateSupport[s]);
  const councils = lgaByPc[postcode] ?? [];

  return {
    postcode,
    electorates,
    spansElectorates: electorates.length > 1,
    states,
    spansStates: states.length > 1,
    senators,
    support,
    councils,
    knownToMap: ids.length > 0,
  };
}

export function isPlausibleAuPostcode(pc: string): boolean {
  return statesFromRange(pc).length > 0 || Boolean(map.postcodes[pc]);
}
