import { AsyncLocalStorage } from "node:async_hooks";
import { randomBytes } from "node:crypto";

// Same symbol as src/lib/csp-nonce.ts. The browser file only reads it.
const READER = Symbol.for("veteran-assist:csp-nonce-read");
const STORE = Symbol.for("veteran-assist:csp-nonce-als");

function als() {
  const g = globalThis;
  let store = g[STORE];
  if (!store) {
    store = new AsyncLocalStorage();
    g[STORE] = store;
  }
  return store;
}

const storage = als();
globalThis[READER] = () => storage.getStore()?.nonce;

export function currentCspNonce() {
  return storage.getStore()?.nonce;
}

export function runWithCspNonce(fn) {
  const nonce = randomBytes(16).toString("base64");
  return storage.run({ nonce }, fn);
}
