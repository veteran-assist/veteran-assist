import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

// Same bundling approach as freshness.test.mjs.
const dir = mkdtempSync(join(tmpdir(), "va-forms-"));
const entry = join(dir, "entry.ts");
const out = join(dir, "bundle.mjs");
const root = resolve(import.meta.dirname, "..");
writeFileSync(
  entry,
  `export { officialForms, formAliasPattern, formHrefFor } from ${JSON.stringify(join(root, "src/content/forms.ts"))};
export { sourceWatch } from ${JSON.stringify(join(root, "src/content/source-watch.ts"))};
`,
);
if (process.env.VA_BUNDLER === "bun") {
  execFileSync("bun", ["build", entry, "--target=node", `--outfile=${out}`], { stdio: "ignore" });
} else {
  execFileSync("npx", ["esbuild", entry, "--bundle", "--platform=node", "--format=esm", `--outfile=${out}`], {
    stdio: "ignore",
    cwd: root,
  });
}
const { officialForms, formAliasPattern, formHrefFor, sourceWatch } = await import(pathToFileURL(out).href);

const norm = (u) => u.split("#")[0].replace(/\/$/, "").toLowerCase();
const watched = new Set(sourceWatch.map((w) => norm(w.href)));

test("form ids and aliases are unique", () => {
  const ids = officialForms.map((f) => f.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate form id");
  const owner = new Map();
  for (const f of officialForms) {
    for (const a of f.aliases) {
      const key = a.toLowerCase(); // "Form D2051" and "form D2051" are the same form on purpose
      assert.ok(!owner.has(key) || owner.get(key) === f.id, `alias "${a}" points at ${owner.get(key)} and ${f.id}`);
      owner.set(key, f.id);
    }
  }
});

test("the alias pattern is a valid regex and finds form numbers in text", () => {
  const re = new RegExp(formAliasPattern, "gi");
  const text = "Use form D2051 for a claim, or D0503 for Service Pension.";
  const found = [...text.matchAll(re)].map((m) => m[0]);
  assert.deepEqual(found, ["form D2051", "D0503"]);
  assert.equal(formHrefFor("d2051"), officialForms.find((f) => f.id === "D2051").href);
});

test("every form with a number has a DVA https link, and every DVA PDF is in the weekly watch", () => {
  for (const f of officialForms) {
    assert.ok(f.href.startsWith("https://"), `${f.id}: link must be https`);
    assert.ok(f.title && f.task, `${f.id}: needs a title and a task`);
    if (f.kind === "pdf") {
      assert.ok(
        watched.has(norm(f.href)),
        `${f.id}: PDF is not in source-watch.ts, so nothing would notice if DVA withdrew it`,
      );
    }
  }
});

test("a form DVA has withdrawn is not listed", () => {
  // D2582: the VEA closed to new compensation claims on 1 July 2026 and DVA removed the PDF.
  assert.equal(officialForms.find((f) => f.id === "D2582"), undefined);
});
