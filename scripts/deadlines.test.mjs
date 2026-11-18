import assert from "node:assert/strict";
import test from "node:test";
import {
  addWindow,
  computeClock,
  defaultReceivedIso,
  formatIso,
  getClock,
  parseLocalDate,
} from "../src/content/deadlines.ts";

test("three calendar months is not 90 days", () => {
  const clock = getClock("vrb-art");
  assert.ok(clock);
  const r = computeClock({
    clock,
    letterIso: "2026-06-01",
    receivedIso: "2026-06-01",
    today: parseLocalDate("2026-06-01"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2026-09-01");
  // 90 days from 1 June 2026 is 30 August, not 1 September.
  const ninety = addWindow(parseLocalDate("2026-06-01"), 90, "days");
  assert.equal(formatIso(ninety), "2026-08-30");
  assert.notEqual(formatIso(r.expiry), formatIso(ninety));
});

test("VRB 12 months from receipt", () => {
  const clock = getClock("dva-vrb");
  const r = computeClock({
    clock,
    letterIso: "2025-09-08",
    receivedIso: "2025-09-11",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2026-09-11");
  assert.equal(r.daysRemaining, 3);
});

test("FOI s 24AB is 14 days from the notice date", () => {
  const clock = getClock("foi-24ab");
  const r = computeClock({
    clock,
    letterIso: "2026-09-01",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2026-09-15");
  assert.equal(r.daysRemaining, 7);
  assert.equal(clock.highlight, "danger");
});

test("default receipt is letter plus three days", () => {
  assert.equal(defaultReceivedIso("2026-07-01"), "2026-07-04");
});

test("month-end overflow clamps to last day of target month", () => {
  const start = parseLocalDate("2026-01-31");
  assert.ok(start);
  assert.equal(formatIso(addWindow(start, 1, "months")), "2026-02-28");
});

test("due today and overdue", () => {
  const clock = getClock("foi-internal");
  const due = computeClock({
    clock,
    letterIso: "2026-08-09",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(due);
  assert.equal(due.daysRemaining, 0);
  const late = computeClock({
    clock,
    letterIso: "2026-08-01",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(late);
  assert.equal(late.daysRemaining, -8);
});

test("SRDP election is 12 months and irreversible", () => {
  const clock = getClock("srdp-election");
  assert.equal(clock?.irreversible, true);
  const r = computeClock({
    clock,
    letterIso: "2026-01-08",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2027-01-08");
});

test("ART counts from receipt and uses the earlier of letter vs receipt expiry", () => {
  const clock = getClock("vrb-art");
  assert.equal(clock?.runsFrom, "receipt");
  assert.equal(clock?.dualWording, true);
  const r = computeClock({
    clock,
    letterIso: "2026-06-01",
    receivedIso: "2026-06-04",
    today: parseLocalDate("2026-06-04"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2026-09-04");
  assert.equal(formatIso(r.letterExpiry), "2026-09-01");
  assert.equal(formatIso(r.saferExpiry), "2026-09-01");
  assert.equal(r.daysRemaining, 89);
});

test("HCCC 28 days is the complainant review window from receipt", () => {
  const clock = getClock("hccc-review");
  assert.ok(clock);
  assert.equal(clock.runsFrom, "receipt");
  assert.equal(clock.windowAmount, 28);
  assert.equal(clock.confidence, "Confirmed");
  const r = computeClock({
    clock,
    letterIso: "2026-09-01",
    receivedIso: "2026-09-04",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2026-10-02");
  assert.equal(r.daysRemaining, 24);
});

test("AHRC s 46PO is 60 days from the notice date", () => {
  const clock = getClock("ahrc-court");
  assert.ok(clock);
  assert.equal(clock.windowAmount, 60);
  assert.equal(clock.runsFrom, "letter");
  const r = computeClock({
    clock,
    letterIso: "2026-09-01",
    today: parseLocalDate("2026-09-08"),
  });
  assert.ok(r);
  assert.equal(formatIso(r.expiry), "2026-10-31");
});
