import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFileSync } from "node:fs";
import { contentSecurityPolicy, HSTS_VALUE } from "../server/csp.mjs";
import { currentCspNonce, runWithCspNonce } from "../server/csp-nonce.mjs";
import privacyHeaders from "../server/middleware/privacy-headers.ts";
import { readCspNonce } from "../src/lib/csp-nonce.ts";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("content security policy", { concurrency: false }, () => {
  test("HSTS is the two-year preload value", () => {
    assert.equal(HSTS_VALUE, "max-age=63072000; includeSubDomains; preload");
  });

  test("script-src is a nonce, style-src stays unsafe-inline, connect-src is only self", () => {
    const nonce = "abc+/xyzXYZ012345==";
    const policy = contentSecurityPolicy(nonce);
    const directives = Object.fromEntries(
      policy.split("; ").map((part) => {
        const [name, ...rest] = part.split(" ");
        return [name, rest.join(" ")];
      }),
    );
    assert.equal(directives["script-src"], `'self' 'nonce-${nonce}'`);
    assert.equal(directives["style-src"], "'self' 'unsafe-inline'");
    assert.equal(directives["connect-src"], "'self'");
    assert.equal(directives["default-src"], "'self'");
    assert.equal(policy.includes("strict-dynamic"), false);
    assert.equal(/script-src[^;]*unsafe-inline/.test(policy), false);
    assert.equal(policy.includes("va.vercel-scripts.com"), false);
    assert.equal(policy.includes("grok.com"), false);
  });

  test("a nonce that is not base64 is rejected", () => {
    assert.throws(() => contentSecurityPolicy("not a nonce"), /base64/);
    assert.throws(() => contentSecurityPolicy(""), /base64/);
  });

  test("two overlapping requests keep their own nonces", async () => {
    const [a, b] = await Promise.all([
      runWithCspNonce(async () => {
        await new Promise((resolve) => setTimeout(resolve, 20));
        return readCspNonce();
      }),
      runWithCspNonce(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5));
        return currentCspNonce();
      }),
    ]);
    assert.equal(typeof a, "string");
    assert.equal(typeof b, "string");
    assert.notEqual(a, b);
  });

  test("the privacy middleware puts the same nonce in the header and the page", async () => {
    let seen;
    const res = await privacyHeaders({}, async () => {
      seen = readCspNonce();
      return new Response(`<script nonce="${seen}"></script>`, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    });
    assert.equal(typeof seen, "string");
    assert.match(seen, /^[A-Za-z0-9+/]+={0,2}$/);
    const csp = res.headers.get("content-security-policy");
    assert.equal(csp, contentSecurityPolicy(seen));
    assert.equal(csp.includes("'nonce-" + seen + "'"), true);
    assert.equal(/script-src[^;]*unsafe-inline/.test(csp), false);
    assert.equal(
      res.headers.get("strict-transport-security"),
      "max-age=63072000; includeSubDomains; preload",
    );
    assert.equal(res.headers.get("content-security-policy-report-only"), null);
    assert.equal(await res.text(), `<script nonce="${seen}"></script>`);
  });

  test("CSP_REPORT_ONLY moves the policy and does not enforce it", async () => {
    const previous = process.env.CSP_REPORT_ONLY;
    process.env.CSP_REPORT_ONLY = "1";
    try {
      const res = await privacyHeaders({}, async () => new Response("ok"));
      const header = res.headers.get("content-security-policy-report-only");
      const nonce = header?.match(/'nonce-([^']+)'/)?.[1];
      assert.equal(header, contentSecurityPolicy(nonce));
      assert.equal(res.headers.get("content-security-policy"), null);
    } finally {
      if (previous === undefined) delete process.env.CSP_REPORT_ONLY;
      else process.env.CSP_REPORT_ONLY = previous;
    }
  });

  test("an existing CSP or HSTS header is left alone", async () => {
    const res = await privacyHeaders({}, async () => {
      return new Response("ok", {
        headers: {
          "content-security-policy": "default-src 'none'",
          "strict-transport-security": "max-age=10",
        },
      });
    });
    assert.equal(res.headers.get("content-security-policy"), "default-src 'none'");
    assert.equal(res.headers.get("strict-transport-security"), "max-age=10");
  });

  test("the router reads the nonce and does not allow inline scripts", () => {
    const router = read("src/router.tsx");
    assert.equal(router.includes("readCspNonce"), true);
    assert.equal(router.includes("ssr: { nonce }"), true);
    const headers = read("server/middleware/privacy-headers.ts");
    assert.equal(headers.includes("script-src 'self' 'unsafe-inline'"), false);
    assert.equal(headers.includes("runWithCspNonce"), true);
  });
});
