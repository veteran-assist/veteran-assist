import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DB_DOWN_MESSAGE, getSql } from "@/lib/db";
import { hit, RULES, waitText } from "@/lib/rate-limit";
import { FEEDBACK_RETENTION_MONTHS, HOSTING_RETENTION_MONTHS } from "@/lib/retention";
import { checkReviewCode } from "@/lib/review-code";
import { findPii, piiBlockMessage } from "@/lib/privacy";

export const FEEDBACK_KINDS = [
  { id: "accuracy", label: "Something is wrong or out of date" },
  { id: "missing", label: "Something important is missing" },
  { id: "confusing", label: "Hard to find or hard to follow" },
  { id: "helped", label: "This helped" },
  { id: "other", label: "Something else" },
] as const;

export type FeedbackKind = (typeof FEEDBACK_KINDS)[number]["id"];

const KIND_IDS: FeedbackKind[] = FEEDBACK_KINDS.map((k) => k.id);

export type FeedbackRow = {
  id: string;
  created_at: string;
  kind: string;
  page_path: string;
  message: string;
  contact: string | null;
  status: string;
};

const submitSchema = z.object({
  kind: z.string().max(40),
  message: z.string().max(20000).optional().default(""),
  pagePath: z.string().max(2000).optional().default(""),
  contact: z.string().max(500).optional().default(""),
  honeypot: z.string().max(500).optional().default(""),
});

export const submitFeedback = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const parsed = submitSchema.safeParse(input);
    if (!parsed.success) return { invalid: true as const };
    const d = parsed.data;
    return {
      invalid: false as const,
      kind: d.kind,
      message: d.message.trim().slice(0, 4000),
      pagePath: d.pagePath.trim().slice(0, 200),
      contact: d.contact.trim().slice(0, 120),
      honeypot: d.honeypot.trim(),
    };
  })
  .handler(async ({ data }) => {
    if (data.invalid) {
      return { ok: false as const, error: "That note could not be read. Please check it and try again." };
    }
    if (data.honeypot) return { ok: true as const };
    if (!KIND_IDS.includes(data.kind as FeedbackKind)) {
      return { ok: false as const, error: "Pick what the note is about." };
    }
    const message =
      data.message ||
      (data.kind === "helped" ? "This page helped." : "");
    if (message.length < 8) {
      return { ok: false as const, error: "A couple of sentences is enough. What should change?" };
    }
    const pii = findPii(message).filter((h) => h.kind !== "email address");
    if (pii.length) {
      return { ok: false as const, error: piiBlockMessage(pii) };
    }
    if (data.contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact)) {
      return { ok: false as const, error: "If you leave a contact, use an email address. It is optional." };
    }

    try {
      const rate = await hit(RULES.feedback);
      if (!rate.allowed) {
        return {
          ok: false as const,
          error: `A few notes have already come in from your connection. Try again in ${waitText(rate.retryAfterSeconds)}.`,
        };
      }
      const sql = await getSql();
      const dupe = await sql<{ id: string }>`
        select id from site_feedback
        where kind = ${data.kind} and page_path = ${data.pagePath} and message = ${message}
          and created_at > now() - interval '15 minutes'
        limit 1
      `;
      if (dupe.length) return { ok: false as const, error: "That note is already in. Thank you." };
      // Enforce the published retention period whenever notes come in.
      void purgeExpired().catch(() => undefined);
      const id = crypto.randomUUID();
      await sql`
        insert into site_feedback (id, kind, page_path, message, contact)
        values (${id}, ${data.kind}, ${data.pagePath}, ${message}, ${data.contact || null})
      `;
    } catch (err) {
      console.error("[feedback] submit failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
    return { ok: true as const };
  });

export const listFeedback = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const parsed = z.object({ code: z.string().max(500).optional() }).safeParse(input);
    return { code: parsed.success ? (parsed.data.code ?? "").trim() : "" };
  })
  .handler(async ({ data }) => {
    const gate = await checkReviewCode(data.code);
    if (gate) return { ok: false as const, error: gate };
    try {
      await purgeExpired();
      const sql = await getSql();
      const rows = await sql<FeedbackRow>`
        select id, created_at::text as created_at, kind, page_path, message, contact, status
        from site_feedback
        order by created_at desc
        limit 200
      `;
      return { ok: true as const, rows };
    } catch (err) {
      console.error("[feedback] list failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
  });

/** Delete feedback and hosting rows older than the published retention periods. */
export async function purgeExpired(): Promise<void> {
  const sql = await getSql();
  await sql.query("delete from site_feedback where created_at < now() - ($1 || ' months')::interval", [
    String(FEEDBACK_RETENTION_MONTHS),
  ]);
  await sql.query(
    "delete from hosting_contributions where created_at < now() - ($1 || ' months')::interval",
    [String(HOSTING_RETENTION_MONTHS)],
  );
}
