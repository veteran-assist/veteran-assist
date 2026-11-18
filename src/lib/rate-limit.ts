import { createHmac } from "node:crypto";
import { getSql } from "@/lib/db";
import { rateLimitSubject } from "@/lib/ip";

/**
 * Durable rate limiting backed by Postgres (table `rate_limits`, migration 0006).
 *
 * The visitor's IP address is never stored. We keep only an HMAC of
 * `scope + ip` (keyed by a server-side secret) and a time bucket. Counters older
 * than two days are deleted.
 */

export type RateRule = {
  /** Name of the thing being limited, e.g. "feedback", "pledge", "review-code". */
  scope: string;
  /** Maximum hits allowed in one window. */
  max: number;
  /** Window length in seconds. */
  windowSeconds: number;
};

export const RULES = {
  feedback: { scope: "feedback", max: 5, windowSeconds: 3600 },
  pledge: { scope: "pledge", max: 5, windowSeconds: 3600 },
  reviewCode: { scope: "review-code", max: 30, windowSeconds: 15 * 60 },
} satisfies Record<string, RateRule>;

function hmacKey(): string {
  return (
    process.env.RATE_LIMIT_SECRET?.trim() ||
    // Fall back to something private to this deployment so hashes cannot be
    // reversed by guessing IPv4 addresses without server access.
    process.env.DATABASE_URL ||
    "veteran-assist-dev"
  );
}

export function hashKey(scope: string, ip: string): string {
  // IPv6 visitors are counted per /64 network (see src/lib/ip.ts).
  return createHmac("sha256", hmacKey()).update(`${scope}|${rateLimitSubject(ip)}`).digest("hex");
}

/** Best-effort client IP from the platform's forwarded headers. */
export async function clientIp(): Promise<string> {
  try {
    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const raw =
      getRequestHeader("x-vercel-forwarded-for") ??
      getRequestHeader("x-real-ip") ??
      getRequestHeader("x-forwarded-for") ??
      "";
    return raw.split(",")[0]?.trim() || "unknown";
  } catch {
    return "unknown";
  }
}

export type RateResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

/**
 * Count one hit for this visitor and say whether it is within the limit.
 * Throws if the database is unavailable; callers should treat that as "try later".
 */
export async function hit(rule: RateRule, ip?: string, now = Date.now()): Promise<RateResult> {
  const who = ip ?? (await clientIp());
  const windowMs = rule.windowSeconds * 1000;
  const bucket = Math.floor(now / windowMs);
  const sql = await getSql();
  const rows = await sql<{ hits: number }>`
    insert into rate_limits (scope, key_hash, bucket, hits)
    values (${rule.scope}, ${hashKey(rule.scope, who)}, ${bucket}, 1)
    on conflict (scope, key_hash, bucket)
    do update set hits = rate_limits.hits + 1, updated_at = now()
    returning hits
  `;
  // Clean-up on every call. Traffic here is low (Feedback, hosting references, the keeper's
  // sign-in), so a random 1-in-50 run could leave old counters for weeks, and the privacy
  // page says they are deleted once they are two days old.
  void sql`delete from rate_limits where updated_at < now() - interval '2 days'`.catch(() => undefined);
  const used = Number(rows[0]?.hits ?? 1);
  if (used > rule.max) {
    const retryAfterSeconds = Math.max(1, Math.ceil(((bucket + 1) * windowMs - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }
  return { allowed: true };
}

export function waitText(seconds: number): string {
  if (seconds < 90) return "a minute";
  const mins = Math.ceil(seconds / 60);
  if (mins < 90) return `${mins} minutes`;
  return `${Math.ceil(mins / 60)} hours`;
}
