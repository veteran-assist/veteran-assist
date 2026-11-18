import { resolvePublicHost } from "../../scripts/grok-pwa-shared.mjs";
import routeTreeSource from "../../src/routeTree.gen.ts?raw";
import { guides } from "../../src/content/guides";
import { letters } from "../../src/content/letters";
import { playbooks } from "../../src/content/playbooks";

/** Pages that should not be listed in the sitemap. */
const EXCLUDED = new Set(["/feedback/inbox"]);

/**
 * Public site paths, read from the generated route tree plus the real guide,
 * letter and playbook slugs. Nothing is hand-listed, so the sitemap cannot drift.
 */
export function sitePaths(): string[] {
  const block = routeTreeSource.match(/export interface FileRoutesByFullPath \{([\s\S]*?)\n\}/)?.[1] ?? "";
  const raw = [...block.matchAll(/^\s*'([^']+)':/gm)].map((m) => m[1]);
  const out = new Set<string>();
  for (const route of raw) {
    if (route.includes("/api/")) continue;
    const clean = route.length > 1 ? route.replace(/\/$/, "") : route;
    if (EXCLUDED.has(clean)) continue;
    if (clean === "/guides/$slug") {
      for (const g of guides) out.add(`/guides/${g.slug}`);
    } else if (clean === "/letters/$slug") {
      for (const l of letters) out.add(`/letters/${l.slug}`);
    } else if (clean === "/playbooks/$slug") {
      for (const p of playbooks) out.add(`/playbooks/${p.slug}`);
    } else if (!clean.includes("$")) {
      out.add(clean);
    }
  }
  return [...out].sort();
}

/** Public hostname: VITE_PUBLIC_HOSTNAME first, else the request host (never *.vercel.app). */
export function publicHostFor(requestHost: string | null | undefined): string {
  return resolvePublicHost(requestHost ?? "");
}
