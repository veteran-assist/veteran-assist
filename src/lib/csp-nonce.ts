/**
 * Reads the nonce for this request, if the server set one.
 *
 * The server stores a reader on globalThis. This file does not import Node,
 * so the browser bundle can call it. In the browser and in local dev the
 * reader is absent and this returns undefined.
 */
export const CSP_NONCE_READER = Symbol.for("veteran-assist:csp-nonce-read");

export function readCspNonce(): string | undefined {
  const reader = (globalThis as Record<symbol, unknown>)[CSP_NONCE_READER];
  if (typeof reader !== "function") return undefined;
  const value = (reader as () => unknown)();
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
