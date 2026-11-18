import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

// guides.ts uses extensionless imports, so bundle it first (same approach as search.test.mjs).
const dir = mkdtempSync(join(tmpdir(), "va-fresh-"));
const entry = join(dir, "entry.ts");
const out = join(dir, "bundle.mjs");
const root = resolve(import.meta.dirname, "..");
writeFileSync(
  entry,
  `export { guides } from ${JSON.stringify(join(root, "src/content/guides.ts"))};
export { sourceWatch } from ${JSON.stringify(join(root, "src/content/source-watch.ts"))};
export { daysSince, isStale, parseSiteDate, STALE_AFTER_DAYS } from ${JSON.stringify(join(root, "src/lib/freshness.ts"))};
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
const { guides, sourceWatch, daysSince, isStale, parseSiteDate, STALE_AFTER_DAYS } = await import(
  pathToFileURL(out).href
);

/** Guides about this site or tools, with no outside facts to watch. Keep this list short. */
const NO_OUTSIDE_FACTS = new Set(["asking-an-ai"]);

const norm = (u) => u.split("#")[0].replace(/\/$/, "").toLowerCase();
const watched = new Set(sourceWatch.map((w) => norm(w.href)));

test("site dates parse and the stale rule works", () => {
  assert.ok(parseSiteDate("24 October 2026"));
  assert.equal(parseSiteDate("Oct 2026"), null);
  assert.ok(parseSiteDate("August 2026"), "month and year alone is allowed");
  const now = new Date(Date.UTC(2026, 9, 25));
  assert.equal(daysSince("24 October 2026", now), 1);
  assert.equal(isStale("24 October 2026", now), false);
  assert.equal(isStale("1 January 2026", now), true);
  assert.equal(isStale("garbage", now), false, "an unreadable date must not raise a false alarm");
  assert.ok(STALE_AFTER_DAYS > 0);
});

test("every guide has readable dates, and was checked no earlier than it was updated", () => {
  for (const g of guides) {
    const u = parseSiteDate(g.updated);
    assert.ok(u, `${g.slug}: unreadable "updated"`);
    if (g.lastChecked) {
      const c = parseSiteDate(g.lastChecked);
      assert.ok(c, `${g.slug}: unreadable "lastChecked"`);
      assert.ok(c >= u, `${g.slug}: lastChecked (${g.lastChecked}) is before updated (${g.updated})`);
    }
  }
});

test("every guide that states outside facts links the official source, and the weekly check watches one", () => {
  for (const g of guides) {
    if (NO_OUTSIDE_FACTS.has(g.slug)) continue;
    const external = g.officialLinks.filter((l) => l.href.startsWith("https://"));
    assert.ok(external.length > 0, `${g.slug}: no official https link`);
    assert.ok(
      external.some((l) => watched.has(norm(l.href))),
      `${g.slug}: none of its official links is in source-watch.ts, so no weekly check covers it`,
    );
  }
});

test("source-watch entries are well formed", () => {
  const ids = new Set();
  for (const w of sourceWatch) {
    assert.ok(!ids.has(w.id), `duplicate id ${w.id}`);
    ids.add(w.id);
    assert.ok(w.href.startsWith("https://"), `${w.id}: href must be https`);
    for (const f of w.files) assert.ok(existsSync(join(root, f)), `${w.id}: file not found: ${f}`);
  }
});
