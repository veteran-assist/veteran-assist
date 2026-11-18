import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { safeEqual } from "../src/lib/safe-equal.ts";

const script = join(dirname(fileURLToPath(import.meta.url)), "migrate.mjs");

function run(env) {
  const clean = { PATH: process.env.PATH };
  return spawnSync(process.execPath, [script], { env: { ...clean, ...env }, encoding: "utf8" });
}

test("production build without DATABASE_URL still publishes", () => {
  const r = run({ VERCEL_ENV: "production" });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /DATABASE_URL is not set/);
});

test("NODE_ENV=production without DATABASE_URL still publishes", () => {
  assert.equal(run({ NODE_ENV: "production" }).status, 0);
});

test("MIGRATE_STRICT without DATABASE_URL fails", () => {
  const r = run({ MIGRATE_STRICT: "1" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /DATABASE_URL is not set/);
});

test("preview build without DATABASE_URL skips cleanly", () => {
  const r = run({ VERCEL_ENV: "preview" });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /DATABASE_URL is not set/);
});

test("local dev build without DATABASE_URL skips cleanly", () => {
  assert.equal(run({}).status, 0);
});

test("production build with an unreachable database fails", () => {
  const r = run({ VERCEL_ENV: "production", DATABASE_URL: "postgres://u:p@127.0.0.1:1/db" });
  assert.equal(r.status, 1);
});

test("local dev build with an unreachable database still skips", () => {
  const r = run({ DATABASE_URL: "postgres://u:p@127.0.0.1:1/db" });
  assert.equal(r.status, 0);
});

test("safeEqual compares strings of any length without throwing", () => {
  assert.equal(safeEqual("abc", "abc"), true);
  assert.equal(safeEqual("abc", "abd"), false);
  assert.equal(safeEqual("abc", "abcd"), false);
  assert.equal(safeEqual("", "x"), false);
});
