import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { readCspNonce } from "@/lib/csp-nonce";
import { routeTree } from "./routeTree.gen";

function parseSearch(searchStr: string): Record<string, unknown> {
  const params = new URLSearchParams(searchStr.startsWith("?") ? searchStr.slice(1) : searchStr);
  const out: Record<string, unknown> = {};
  for (const [key, value] of params.entries()) {
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      value === "true" ||
      value === "false" ||
      /^-?\d+$/.test(value)
    ) {
      try {
        out[key] = JSON.parse(value);
        continue;
      } catch {
        /* keep raw */
      }
    }
    out[key] = value;
  }
  return out;
}

function stringifySearch(search: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (value == null || value === "") continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function getRouter() {
  // Present only while the server is rendering this request. TanStack puts it
  // on the inline hydration scripts. Local dev and the browser have none.
  const nonce = readCspNonce();
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPreload: "intent",
    scrollRestoration: true,
    parseSearch,
    stringifySearch,
    ...(nonce ? { ssr: { nonce } } : {}),
  });
}
