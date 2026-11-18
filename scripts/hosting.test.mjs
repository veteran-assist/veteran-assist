import assert from "node:assert/strict";
import test from "node:test";
import {
  amountChips,
  clampPledge,
  formatAud,
  monthKey,
  monthLabel,
  nextMonthLabel,
  paypalFeeCents,
  remainingCents,
} from "../src/content/hosting.ts";

const TARGET = 633;

test("remaining never goes below zero", () => {
  assert.equal(remainingCents(0, TARGET), 633);
  assert.equal(remainingCents(300, TARGET), 333);
  assert.equal(remainingCents(633, TARGET), 0);
  assert.equal(remainingCents(900, TARGET), 0);
});

test("formatAud formats cents as dollars", () => {
  assert.equal(formatAud(633), "$6.33");
  assert.equal(formatAud(550), "$5.50");
});

test("pledges cannot exceed what is still needed", () => {
  assert.equal(clampPledge(300, 333), 300);
  assert.equal(clampPledge(333, 333), 333);
  assert.equal(clampPledge(400, 333), null);
  assert.equal(clampPledge(50, 333), null);
  assert.equal(clampPledge(300, 0), null);
});

test("chips always include the remainder and never overshoot", () => {
  assert.deepEqual(amountChips(633, TARGET), [300, 600, 633]);
  assert.deepEqual(amountChips(500, TARGET), [300, 500]);
  assert.deepEqual(amountChips(200, TARGET), [200]);
  assert.deepEqual(amountChips(0, TARGET), []);
});

test("PayPal’s usual cut is a large share of a small bill", () => {
  assert.equal(paypalFeeCents(550), 46);
  assert.equal(paypalFeeCents(633), 48);
});

test("the content file states no host name or cost", async () => {
  const { readFileSync } = await import("node:fs");
  const text = readFileSync(new URL("../src/content/hosting.ts", import.meta.url), "utf8");
  assert.doesNotMatch(text, /ventra/i);
  assert.doesNotMatch(text, /\$\s?\d/);
});

test("calendar months use Australia/Melbourne, not UTC", () => {
  assert.equal(monthKey(new Date("2026-09-17T02:00:00Z")), "2026-09");
  // 30 Sep 2026 14:30 UTC is 1 Oct 00:30 AEST.
  assert.equal(monthKey(new Date("2026-09-30T14:30:00Z")), "2026-10");
  assert.equal(monthLabel("2026-09"), "September 2026");
  assert.equal(nextMonthLabel("2026-09"), "October 2026");
  assert.equal(nextMonthLabel("2026-12"), "January 2027");
});
