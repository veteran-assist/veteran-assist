/**
 * Security and privacy headers on every response.
 *
 * Content-Security-Policy is enforced. script-src allows this site's own
 * scripts plus one per-request nonce for TanStack's inline hydration scripts.
 * A nonce makes browsers ignore 'unsafe-inline' for scripts, so that token
 * is not set. style-src keeps 'unsafe-inline' because React sets style
 * attributes. connect-src stays 'self'. No third-party hosts.
 *
 * The nonce lives only for this request. getRouter() reads it while the page
 * is rendered and TanStack copies it onto the inline scripts. Vercel Web
 * Analytics inserts a same-origin script (/_vercel/insights/script.js), which
 * 'self' already allows. It is not an inline script.
 *
 * HSTS carries the preload token. Serving it does not add the domain to the
 * browser preload list. That is a separate submission, and removal takes months.
 *
 * To roll back to report-only without a code change, set CSP_REPORT_ONLY=1
 * in the Vercel project settings.
 */
import { HSTS_VALUE, contentSecurityPolicy } from "../csp.mjs";
import { currentCspNonce, runWithCspNonce } from "../csp-nonce.mjs";

const HEADERS: Record<string, string> = {
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "permissions-policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "x-dns-prefetch-control": "off",
  "strict-transport-security": HSTS_VALUE,
};

export default async function privacyHeadersMiddleware(
  _event: unknown,
  next: () => Promise<unknown>,
) {
  return runWithCspNonce(async () => {
    const result = await next();
    if (!(result instanceof Response)) return result;
    const headers = new Headers(result.headers);
    for (const [key, value] of Object.entries(HEADERS)) {
      if (!headers.has(key)) headers.set(key, value);
    }
    const reportOnly = process.env.CSP_REPORT_ONLY === "1";
    const cspHeader = reportOnly
      ? "content-security-policy-report-only"
      : "content-security-policy";
    if (!headers.has(cspHeader)) {
      const nonce = currentCspNonce();
      if (!nonce) throw new Error("CSP nonce was not set for this request");
      headers.set(cspHeader, contentSecurityPolicy(nonce));
    }
    return new Response(result.body, {
      status: result.status,
      statusText: result.statusText,
      headers,
    });
  });
}
