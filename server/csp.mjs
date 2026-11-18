/**
 * Response policy. script-src is this origin plus a per-request nonce.
 * Do not add 'strict-dynamic': it would ignore 'self', and the analytics
 * loader inserts a same-origin script after the page loads.
 * style-src keeps 'unsafe-inline' for React style attributes.
 */
export const HSTS_VALUE = "max-age=63072000; includeSubDomains; preload";

const BASE64_NONCE = /^[A-Za-z0-9+/]+={0,2}$/;

export function contentSecurityPolicy(nonce) {
  if (!BASE64_NONCE.test(nonce)) throw new Error("CSP nonce is not base64");
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ].join("; ");
}
