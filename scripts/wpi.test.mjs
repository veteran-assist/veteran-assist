import assert from "node:assert/strict";
import test from "node:test";
import {
  additionalIndependentToReach,
  combineAll,
  combineTwo,
  distancesAhead,
  duplicateSystems,
  goldHeadline,
  goldPaths,
  nextThreshold,
  worsenLargestToReach,
} from "../src/lib/wpi.ts";

test("pair formula matches Combined Values Chart examples", () => {
  assert.equal(combineTwo(10, 10), 19);
  assert.equal(combineTwo(15, 10), 24); // CLIK SRCA handbook example
  assert.equal(combineTwo(44, 40), 66);
  assert.equal(combineTwo(50, 20), 60);
  assert.equal(combineTwo(50, 50), 75);
});

test("highest-first sequential combination", () => {
  assert.equal(combineAll([50, 20, 10]), 64);
  assert.equal(combineAll([8, 8, 8, 8]), 28);
  assert.equal(combineAll([44, 40]), 66);
  assert.equal(combineAll([]), 0);
  assert.equal(combineAll([0, 0]), 0);
  assert.equal(combineAll([150]), 100);
});

test("new independent rating is not the combined shortfall", () => {
  assert.equal(additionalIndependentToReach(56, 60), 8);
  assert.equal(additionalIndependentToReach(52, 60), 16);
  assert.equal(additionalIndependentToReach(60, 60), 0);
  assert.equal(additionalIndependentToReach(0, 60), 60);
  assert.equal(additionalIndependentToReach(40, 20), 0);
});

test("worsening replaces the highest rating then recombines", () => {
  const two = worsenLargestToReach([40, 20], 60);
  assert.ok(two);
  assert.equal(two.from, 40);
  assert.equal(two.to, 50);
  assert.equal(two.increase, 10);

  const one = worsenLargestToReach([56], 60);
  assert.ok(one);
  assert.equal(one.increase, 4);
  assert.equal(one.to, 60);
});

test("next threshold skips 30-point Gold path without Service Pension", () => {
  assert.equal(nextThreshold(25)?.id, "srdp");
  assert.equal(nextThreshold(25, { ...base(), servicePension: false })?.id, "srdp");
  assert.equal(nextThreshold(25, { ...base(), servicePension: true })?.id, "gold-sp");
});

test("Gold Card 60 is not open on DRCA/VEA-only points", () => {
  const drca = goldPaths(66, { ...base(), source: "drca-vea" });
  assert.equal(drca.find((p) => p.id === "s281")?.open, false);
  const mrca = goldPaths(66, { ...base(), source: "mrca" });
  assert.equal(mrca.find((p) => p.id === "s281")?.open, true);
});

test("headline warns that letter points exceed combined shortfall", () => {
  const text = goldHeadline(56, base(), nextThreshold(56, base()));
  assert.match(text, /4 combined/);
  assert.match(text, /8 letter points/);
});

test("distances include both new-condition and worsen figures", () => {
  const rows = distancesAhead([40, 20], base());
  const gold = rows.find((d) => d.threshold.id === "gold");
  assert.ok(gold);
  assert.equal(gold.combinedShortfall, 8); // 60 - 52
  assert.equal(gold.newIndependent, 16);
  assert.equal(gold.worsenLargest?.increase, 10);
});

test("duplicate body systems are flagged", () => {
  assert.deepEqual(duplicateSystems(["lower", "lower", "psych"]), ["lower"]);
  assert.deepEqual(duplicateSystems(["", "", "psych"]), []);
});

function base() {
  return {
    servicePension: false,
    qualifyingServiceAge70: false,
    eligibleYoungPerson: false,
    srdpCandidate: false,
    source: "unsure",
  };
}
