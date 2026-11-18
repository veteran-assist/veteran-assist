/**
 * Device-local claim file. Nothing here is sent to Veteran Assist, DVA, or a database.
 * sessionStorage by default (gone when the browser session ends).
 * Optional localStorage if the veteran ticks “keep on this device”.
 */

import { uid } from "@/lib/id";

export type ClaimRow = {
  id: string;
  title: string;
  claim_type: string;
  claim_number: string | null;
  lodged_on: string | null;
  first_raised_on: string | null;
  last_substantive_on: string | null;
  status: string;
  last_contact_on: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type EventRow = {
  id: string;
  claim_id: string;
  happened_on: string;
  kind: string;
  note: string;
  created_at: string;
};

type Bundle = { claims: ClaimRow[]; events: EventRow[] };

const FILE_KEY = "standeasy.veteran-file.v1";
const PERSIST_KEY = "standeasy.veteran-file.persist";

function empty(): Bundle {
  return { claims: [], events: [] };
}

function canUse(): boolean {
  return typeof window !== "undefined";
}

export function isFilePersisted(): boolean {
  return canUse() && window.localStorage.getItem(PERSIST_KEY) === "1";
}

function normalizeClaim(raw: ClaimRow): ClaimRow {
  return {
    ...raw,
    first_raised_on: raw.first_raised_on ?? raw.lodged_on ?? null,
    last_substantive_on: raw.last_substantive_on ?? null,
  };
}

function readFrom(store: Storage): Bundle | null {
  try {
    const parsed = JSON.parse(store.getItem(FILE_KEY) ?? "") as Bundle;
    if (!Array.isArray(parsed.claims) || !Array.isArray(parsed.events)) return null;
    return { claims: parsed.claims.map(normalizeClaim), events: parsed.events };
  } catch {
    return null;
  }
}

function load(): Bundle {
  if (!canUse()) return empty();
  if (isFilePersisted()) {
    return readFrom(window.localStorage) ?? readFrom(window.sessionStorage) ?? empty();
  }
  return readFrom(window.sessionStorage) ?? empty();
}

function save(bundle: Bundle) {
  if (!canUse()) return;
  const json = JSON.stringify(bundle);
  if (isFilePersisted()) {
    window.localStorage.setItem(FILE_KEY, json);
    window.sessionStorage.removeItem(FILE_KEY);
  } else {
    window.sessionStorage.setItem(FILE_KEY, json);
    window.localStorage.removeItem(FILE_KEY);
  }
}

export function setFilePersisted(on: boolean) {
  if (!canUse()) return;
  const bundle = load();
  if (on) window.localStorage.setItem(PERSIST_KEY, "1");
  else window.localStorage.removeItem(PERSIST_KEY);
  save(bundle);
}

export function wipeFile() {
  if (!canUse()) return;
  window.sessionStorage.removeItem(FILE_KEY);
  window.localStorage.removeItem(FILE_KEY);
  window.localStorage.removeItem(PERSIST_KEY);
}

export function listClaims(): ClaimRow[] {
  return load().claims.slice().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}

export function addClaim(input: {
  title: string;
  claimType: string;
  claimNumber?: string;
  lodgedOn?: string;
  firstRaisedOn?: string;
  lastSubstantiveOn?: string;
  notes?: string;
}): { id: string } {
  const title = input.title.trim();
  if (!title) throw new Error("Give the claim a name");
  const now = new Date().toISOString();
  const lodged = input.lodgedOn || null;
  const row: ClaimRow = {
    id: uid(),
    title,
    claim_type: input.claimType.trim() || "other",
    claim_number: input.claimNumber?.trim() || null,
    lodged_on: lodged,
    first_raised_on: input.firstRaisedOn || lodged,
    last_substantive_on: input.lastSubstantiveOn || null,
    status: "open",
    last_contact_on: null,
    notes: input.notes?.trim() || "",
    created_at: now,
    updated_at: now,
  };
  const bundle = load();
  bundle.claims.unshift(row);
  save(bundle);
  return { id: row.id };
}

export function updateClaim(input: {
  id: string;
  status?: string;
  lastContactOn?: string;
  notes?: string;
  claimNumber?: string;
  firstRaisedOn?: string;
  lastSubstantiveOn?: string;
}) {
  const bundle = load();
  const row = bundle.claims.find((c) => c.id === input.id);
  if (!row) return;
  if (input.status !== undefined) row.status = input.status;
  if (input.lastContactOn !== undefined) row.last_contact_on = input.lastContactOn;
  if (input.notes !== undefined) row.notes = input.notes;
  if (input.claimNumber !== undefined) row.claim_number = input.claimNumber;
  if (input.firstRaisedOn !== undefined) row.first_raised_on = input.firstRaisedOn || null;
  if (input.lastSubstantiveOn !== undefined) row.last_substantive_on = input.lastSubstantiveOn || null;
  row.updated_at = new Date().toISOString();
  save(bundle);
}

export function deleteClaim(id: string) {
  const bundle = load();
  bundle.claims = bundle.claims.filter((c) => c.id !== id);
  bundle.events = bundle.events.filter((e) => e.claim_id !== id);
  save(bundle);
}

export function listEvents(claimId: string): EventRow[] {
  return load()
    .events.filter((e) => e.claim_id === claimId)
    .sort((a, b) => (a.happened_on < b.happened_on ? 1 : -1));
}

const SUBSTANTIVE_KINDS = new Set(["lodged", "info request", "decision"]);

export function addEvent(input: { claimId: string; happenedOn: string; kind: string; note: string }) {
  const bundle = load();
  if (!bundle.claims.some((c) => c.id === input.claimId)) return;
  const row: EventRow = {
    id: uid(),
    claim_id: input.claimId,
    happened_on: input.happenedOn,
    kind: input.kind,
    note: input.note.trim(),
    created_at: new Date().toISOString(),
  };
  bundle.events.push(row);
  const claim = bundle.claims.find((c) => c.id === input.claimId);
  if (claim) {
    claim.last_contact_on = input.happenedOn;
    claim.updated_at = row.created_at;
    if (SUBSTANTIVE_KINDS.has(input.kind)) {
      if (!claim.last_substantive_on || input.happenedOn > claim.last_substantive_on) {
        claim.last_substantive_on = input.happenedOn;
      }
    }
  }
  save(bundle);
  return { id: row.id };
}
