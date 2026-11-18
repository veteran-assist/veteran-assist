/**
 * Check every external https link quoted in src/.
 *
 *   node scripts/check-links.mjs
 *
 * A link counts as broken only when the site answers 404 or 410. Government
 * sites often refuse automated requests (403, 429) or time out from cloud
 * runners; those are listed as "check by hand", not failures.
 */
import { readdirSync, readFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SKIP = [/^https:\/\/api\.x\.ai\//];
const TIMEOUT_MS = 20_000;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.(ts|tsx|json)$/.test(e.name) ? [p] : [];
  });
}

export function extractUrls(text) {
  const found = text.match(/https:\/\/[A-Za-z0-9.\-_~:/?#[\]@!$&'*+,;=%]+/g) ?? [];
  return found.map((u) => u.replace(/[.,;:)'\]]+$/, ""));
}

async function fetchStatus(url) {
  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; VeteranAssistLinkCheck/1.0; +https://veteranassist.au)",
      accept: "text/html,application/pdf,*/*",
    },
  });
  // Do not wait for the body: some servers trickle it out and never finish.
  res.body?.cancel().catch(() => undefined);
  return { url, status: res.status, final: res.url };
}

function deadline(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("TimeoutError")), ms).unref());
}

async function check(url) {
  try {
    // A hard stop on top of the fetch timeout, so one slow site cannot hang the run.
    return await Promise.race([fetchStatus(url), deadline(TIMEOUT_MS + 5_000)]);
  } catch (err) {
    return { url, status: 0, error: err instanceof Error ? err.message || err.name : "error" };
  }
}

async function main() {
  const files = walk(join(ROOT, "src"));
  const urls = [
    ...new Set(files.flatMap((f) => extractUrls(readFileSync(f, "utf8")))),
  ]
    .filter((u) => !SKIP.some((re) => re.test(u)))
    .sort();

  const results = [];
  const queue = [...urls];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (queue.length) results.push(await check(queue.shift()));
    }),
  );
  results.sort((a, b) => a.url.localeCompare(b.url));

  const broken = results.filter((r) => r.status === 404 || r.status === 410);
  const unsure = results.filter((r) => r.status === 0 || r.status === 403 || r.status === 429 || r.status >= 500);
  const ok = results.length - broken.length - unsure.length;

  const lines = [
    `### Link check: ${results.length} links, ${ok} ok, ${broken.length} broken, ${unsure.length} to check by hand`,
    "",
    ...broken.map((r) => `- BROKEN ${r.status} ${r.url}`),
    ...unsure.map((r) => `- check by hand (${r.status || r.error}) ${r.url}`),
  ];
  console.log(lines.join("\n"));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`);
  if (process.env.GITHUB_ACTIONS) {
    // One annotation each, so the result shows on the pull request without opening the log.
    const enc = (s) => s.replace(/%/g, "%25").replace(/\r/g, "").replace(/\n/g, "%0A");
    if (broken.length) console.log(`::error title=Broken links (${broken.length})::${enc(broken.map((r) => `${r.status} ${r.url}`).join("\n"))}`);
    if (unsure.length) console.log(`::warning title=Check by hand (${unsure.length})::${enc(unsure.map((r) => `${r.status || r.error} ${r.url}`).join("\n"))}`);
    console.log(`::notice title=Link check::${enc(lines[0])}`);
  }
  if (broken.length) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
  // Open keep-alive sockets must not hold the job open after the report is written.
  process.exit(process.exitCode ?? 0);
}
