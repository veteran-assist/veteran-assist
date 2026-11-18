import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

// Same bundling approach as forms.test.mjs.
const dir = mkdtempSync(join(tmpdir(), "va-linkify-"));
const entry = join(dir, "entry.ts");
const out = join(dir, "bundle.mjs");
const root = resolve(import.meta.dirname, "..");
writeFileSync(entry, `export { isPartOfNumber } from ${JSON.stringify(join(root, "src/lib/emergency-number.ts"))};\n`);
if (process.env.VA_BUNDLER === "bun") {
  execFileSync("bun", ["build", entry, "--target=node", `--outfile=${out}`], { stdio: "ignore" });
} else {
  execFileSync("npx", ["esbuild", entry, "--bundle", "--platform=node", "--format=esm", `--outfile=${out}`], {
    stdio: "ignore",
    cwd: root,
  });
}
const { isPartOfNumber } = await import(pathToFileURL(out).href);

// Mirror what Linkify does: find each "000" and ask whether it would become a 000 link.
const linkedZeros = (text) =>
  [...text.matchAll(/\b000\b/g)].filter((m) => !isPartOfNumber(text, m.index ?? 0)).length;

test("000 inside a dollar amount or a distance is not an emergency link", () => {
  assert.equal(linkedZeros("The $5,000 yearly cap was taken off the table."), 0);
  assert.equal(linkedZeros("Use the car for 2 years or 40,000 km."), 0);
  assert.equal(linkedZeros("A $1,000,000 figure."), 0);
  assert.equal(linkedZeros("Caps of $7,500 then $5,000."), 0);
});

test("a real 000 reference is still linked", () => {
  assert.equal(linkedZeros("In danger? Call 000."), 1);
  assert.equal(linkedZeros("Open Arms 1800 011 046, Lifeline 13 11 14, or 000."), 1);
  assert.equal(linkedZeros("Call 000, then tell someone."), 1);
  assert.equal(linkedZeros("Emergency (000) first."), 1);
});

test("Linkify uses the guard", () => {
  const src = readFileSync(join(root, "src/components/linkify.tsx"), "utf8");
  assert.ok(src.includes("isPartOfNumber(text, start)"), "linkify.tsx must skip 000 inside numbers");
});
