import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { DB_DOWN_MESSAGE, getSql } from "@/lib/db";
import { hit, RULES, waitText } from "@/lib/rate-limit";
import { checkReviewCode } from "@/lib/review-code";
import {
  amountChips,
  clampPledge,
  formatAud,
  hosting,
  monthKey,
  monthLabel,
  nextMonthLabel,
  remainingCents,
} from "@/content/hosting";

export type HostingStatus = {
  /** False when no target or no PayID is configured: hide the meter, collect nothing. */
  enabled: boolean;
  monthKey: string;
  monthLabel: string;
  nextMonthLabel: string;
  targetCents: number;
  raisedCents: number;
  remainingCents: number;
  open: boolean;
  collecting: boolean;
  payId: string | null;
  payIdName: string;
  paypalMe: string | null;
  chips: number[];
};

export type HostingRow = {
  id: string;
  created_at: string;
  month_key: string;
  amount_cents: number;
  status: string;
  reference: string;
  source: string;
  note: string | null;
};

function publishedPayId(): string {
  return process.env.HOSTING_PAYID?.trim() ?? "";
}

function publishedPaypalMe(): string {
  const fromEnv = process.env.HOSTING_PAYPAL_ME?.trim();
  if (!fromEnv) return "";
  return fromEnv.replace(/^https?:\/\/(www\.)?paypal\.me\//i, "").replace(/^\//, "");
}

/** Monthly target in cents, from HOSTING_MONTHLY_TARGET_CENTS. 0 = not configured. */
function monthlyTargetCents(): number {
  const n = Number(process.env.HOSTING_MONTHLY_TARGET_CENTS);
  return Number.isInteger(n) && n >= 100 && n <= 100_000 ? n : 0;
}

/** Only amounts the site keeper has confirmed as received count toward the meter. */
async function raisedForMonth(month: string): Promise<number> {
  const sql = await getSql();
  const rows = await sql<{ total: number | string | null }>`
    select coalesce(sum(amount_cents), 0) as total
    from hosting_contributions
    where month_key = ${month}
      and status = 'recorded'
  `;
  return Number(rows[0]?.total ?? 0);
}

function makeReference(month: string): string {
  const stamp = month.replace("-", "").slice(0, 6);
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `VA-${stamp}-${rand}`;
}

function disabledStatus(month: string): HostingStatus {
  return {
    enabled: false,
    monthKey: month,
    monthLabel: monthLabel(month),
    nextMonthLabel: nextMonthLabel(month),
    targetCents: 0,
    raisedCents: 0,
    remainingCents: 0,
    open: false,
    collecting: false,
    payId: null,
    payIdName: hosting.payIdName,
    paypalMe: null,
    chips: [],
  };
}

export const getHostingStatus = createServerFn({ method: "GET" }).handler(async () => {
  const month = monthKey();
  const target = monthlyTargetCents();
  const payId = publishedPayId();
  // Nothing configured: the meter is off and collects nothing.
  if (!target || !payId) return disabledStatus(month);
  let raised = 0;
  try {
    raised = await raisedForMonth(month);
  } catch (err) {
    console.error("[hosting] status failed:", err instanceof Error ? err.message : "unknown");
    return disabledStatus(month);
  }
  const remaining = remainingCents(raised, target);
  const status: HostingStatus = {
    enabled: true,
    monthKey: month,
    monthLabel: monthLabel(month),
    nextMonthLabel: nextMonthLabel(month),
    targetCents: target,
    raisedCents: raised,
    remainingCents: remaining,
    open: remaining > 0,
    collecting: remaining > 0,
    payId: remaining > 0 ? payId : null,
    payIdName: hosting.payIdName,
    paypalMe: publishedPaypalMe() || null,
    chips: amountChips(remaining, target),
  };
  return status;
});

export const pledgeHosting = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const parsed = z
      .object({ amountCents: z.number().int().min(0).max(1_000_000), honeypot: z.string().max(200).optional() })
      .safeParse(input);
    if (!parsed.success) return { invalid: true as const };
    return {
      invalid: false as const,
      amountCents: parsed.data.amountCents,
      honeypot: (parsed.data.honeypot ?? "").trim(),
    };
  })
  .handler(async ({ data }) => {
    if (data.invalid) return { ok: false as const, error: "That amount could not be read." };
    if (data.honeypot) return { ok: true as const, skipped: true as const };
    const payId = publishedPayId();
    const target = monthlyTargetCents();
    if (!payId || !target) {
      return {
        ok: false as const,
        error: "This site is not collecting hosting contributions. Do not send money to an address you found elsewhere.",
      };
    }
    try {
      const rate = await hit(RULES.pledge);
      if (!rate.allowed) {
        return {
          ok: false as const,
          error: `A few references have already been made from your connection. Try again in ${waitText(rate.retryAfterSeconds)}.`,
        };
      }
      const month = monthKey();
      const remaining = remainingCents(await raisedForMonth(month), target);
      if (remaining < 100) {
        return {
          ok: false as const,
          alreadyFull: true as const,
          error: `This month is already covered. The bar resets in ${nextMonthLabel(month)}.`,
        };
      }
      const amount = clampPledge(data.amountCents, remaining);
      if (amount == null) {
        return { ok: false as const, error: `Pick an amount up to ${formatAud(remaining)}.` };
      }
      const sql = await getSql();
      const id = crypto.randomUUID();
      const reference = makeReference(month);
      // 'pledged' rows do NOT count toward the meter. Only the keeper confirming
      // the money arrived (status 'recorded') moves the bar.
      await sql`
        insert into hosting_contributions (id, month_key, amount_cents, status, reference, source)
        values (${id}, ${month}, ${amount}, 'pledged', ${reference}, 'visitor')
      `;
      return {
        ok: true as const,
        alreadyFull: false as const,
        amountCents: amount,
        reference,
        payId,
        payIdName: hosting.payIdName,
      };
    } catch (err) {
      console.error("[hosting] pledge failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
  });

const codeOnly = (input: unknown) => {
  const parsed = z.object({ code: z.string().max(500).optional() }).safeParse(input);
  return { code: parsed.success ? (parsed.data.code ?? "").trim() : "" };
};

export const listHostingMonth = createServerFn({ method: "POST" })
  .validator(codeOnly)
  .handler(async ({ data }) => {
    const gate = await checkReviewCode(data.code);
    if (gate) return { ok: false as const, error: gate };
    try {
      const month = monthKey();
      const sql = await getSql();
      const rows = await sql<HostingRow>`
        select id, created_at::text as created_at, month_key, amount_cents, status, reference, source, note
        from hosting_contributions
        where month_key = ${month}
        order by created_at desc
        limit 100
      `;
      const raised = rows
        .filter((r) => r.status === "recorded")
        .reduce((sum, r) => sum + r.amount_cents, 0);
      return { ok: true as const, month, raised, target: monthlyTargetCents(), rows };
    } catch (err) {
      console.error("[hosting] list failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
  });

export const recordHosting = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const parsed = z
      .object({
        code: z.string().max(500).optional(),
        amountCents: z.number().int().min(0).max(1_000_000),
        note: z.string().max(1000).optional(),
      })
      .safeParse(input);
    if (!parsed.success) return { invalid: true as const, code: "", amountCents: 0, note: "" };
    return {
      invalid: false as const,
      code: (parsed.data.code ?? "").trim(),
      amountCents: parsed.data.amountCents,
      note: (parsed.data.note ?? "").trim().slice(0, 200),
    };
  })
  .handler(async ({ data }) => {
    const gate = await checkReviewCode(data.code);
    if (gate) return { ok: false as const, error: gate };
    if (data.invalid) return { ok: false as const, error: "That amount could not be read." };
    const target = monthlyTargetCents();
    if (!target) return { ok: false as const, error: "Set HOSTING_MONTHLY_TARGET_CENTS before recording amounts." };
    try {
      const month = monthKey();
      const remaining = remainingCents(await raisedForMonth(month), target);
      const amount = clampPledge(data.amountCents, remaining);
      if (amount == null) {
        return { ok: false as const, error: `Nothing left to record, or the amount is over ${formatAud(remaining)}.` };
      }
      const sql = await getSql();
      const id = crypto.randomUUID();
      const reference = makeReference(month);
      await sql`
        insert into hosting_contributions (id, month_key, amount_cents, status, reference, source, note)
        values (${id}, ${month}, ${amount}, 'recorded', ${reference}, 'keeper', ${data.note || null})
      `;
      return { ok: true as const, reference };
    } catch (err) {
      console.error("[hosting] record failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
  });

const idAction = (input: unknown) => {
  const parsed = z
    .object({ code: z.string().max(500).optional(), id: z.string().min(1).max(100) })
    .safeParse(input);
  if (!parsed.success) return { invalid: true as const, code: "", id: "" };
  return { invalid: false as const, code: (parsed.data.code ?? "").trim(), id: parsed.data.id.trim() };
};

/** Keeper confirms a visitor's pledge was actually received: it now counts. */
export const confirmHosting = createServerFn({ method: "POST" })
  .validator(idAction)
  .handler(async ({ data }) => {
    const gate = await checkReviewCode(data.code);
    if (gate) return { ok: false as const, error: gate };
    if (data.invalid) return { ok: false as const, error: "That entry could not be read." };
    const target = monthlyTargetCents();
    try {
      const sql = await getSql();
      const rows = await sql<{ amount_cents: number; month_key: string }>`
        select amount_cents, month_key from hosting_contributions
        where id = ${data.id} and status = 'pledged'
      `;
      const row = rows[0];
      if (!row) return { ok: false as const, error: "That entry is not waiting for confirmation." };
      if (target && row.amount_cents > remainingCents(await raisedForMonth(row.month_key), target)) {
        return { ok: false as const, error: "Confirming this would go over the month's target. Void it instead." };
      }
      await sql`update hosting_contributions set status = 'recorded' where id = ${data.id} and status = 'pledged'`;
      return { ok: true as const };
    } catch (err) {
      console.error("[hosting] confirm failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
  });

export const voidHosting = createServerFn({ method: "POST" })
  .validator(idAction)
  .handler(async ({ data }) => {
    const gate = await checkReviewCode(data.code);
    if (gate) return { ok: false as const, error: gate };
    if (data.invalid) return { ok: false as const, error: "That entry could not be read." };
    try {
      const sql = await getSql();
      await sql`
        update hosting_contributions
        set status = 'voided'
        where id = ${data.id}
          and status <> 'voided'
      `;
      return { ok: true as const };
    } catch (err) {
      console.error("[hosting] void failed:", err instanceof Error ? err.message : "unknown");
      return { ok: false as const, error: DB_DOWN_MESSAGE };
    }
  });
