import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { listFeedback, FEEDBACK_KINDS, type FeedbackRow } from "@/lib/feedback-api";
import { confirmHosting, listHostingMonth, recordHosting, voidHosting, type HostingRow } from "@/lib/hosting-api";
import { formatAud } from "@/content/hosting";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/feedback/inbox")({
  component: InboxPage,
  head: () => ({
    meta: [{ title: pageTitle("Site keeper inbox") }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function kindLabel(id: string) {
  return FEEDBACK_KINDS.find((k) => k.id === id)?.label ?? id;
}

function InboxPage() {
  const [code, setCode] = useState("");
  const [rows, setRows] = useState<FeedbackRow[] | null>(null);
  const [hosting, setHosting] = useState<{ month: string; raised: number; target: number; rows: HostingRow[] } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  async function load(e?: FormEvent) {
    e?.preventDefault();
    setPending(true);
    setError(null);
    try {
      const [fb, host] = await Promise.all([
        listFeedback({ data: { code } }),
        listHostingMonth({ data: { code } }),
      ]);
      if (!fb.ok) {
        setRows(null);
        setHosting(null);
        setError(fb.error);
        return;
      }
      setRows(fb.rows);
      if (host.ok) setHosting({ month: host.month, raised: host.raised, target: host.target, rows: host.rows });
    } catch {
      setError("Could not load the inbox. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function addReceived(e: FormEvent) {
    e.preventDefault();
    const cents = Math.round(Number.parseFloat(amount) * 100);
    const res = await recordHosting({ data: { code, amountCents: cents, note } });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setAmount("");
    setNote("");
    await load();
  }

  async function confirmRow(id: string) {
    const res = await confirmHosting({ data: { code, id } });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    await load();
  }

  async function voidRow(id: string) {
    const res = await voidHosting({ data: { code, id } });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    await load();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Site keeper</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Veteran feedback</h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Not linked from the main menu. Notes veterans chose to send — still not claim files. Treat
        optional emails as confidential. Hosting references people generated sit here until you
        confirm the money arrived, or void them.
      </p>
      <form onSubmit={load} className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <Label htmlFor="review-code">Review code</Label>
          <Input
            id="review-code"
            type="password"
            className="mt-1 w-56"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Needed on a published site"
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Loading…" : "Open inbox"}
        </Button>
      </form>
      {error ? (
        <p className="mt-3 text-sm text-crisis" role="alert">
          {error}
        </p>
      ) : null}
      {hosting ? (
        <section className="mt-10 rounded-md border border-rule bg-card p-5">
          <h2 className="font-display text-2xl font-semibold">Hosting {hosting.month}</h2>
          <p className="mt-1 text-sm text-muted">
            {formatAud(hosting.raised)}{hosting.target ? ` of ${formatAud(hosting.target)}` : ""} confirmed. Only confirmed amounts count toward the public meter.
          </p>
          <form onSubmit={addReceived} className="mt-4 grid gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor="host-amount">Amount received (AUD)</Label>
              <Input
                id="host-amount"
                className="mt-1"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="12.00"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="host-note">Note (optional)</Label>
              <Input
                id="host-note"
                className="mt-1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="PayID screenshot, bank receipt"
              />
            </div>
            <Button type="submit">Record received</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm">
            {hosting.rows.length === 0 ? <li className="text-muted">None this month.</li> : null}
            {hosting.rows.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-rule py-2">
                <span>
                  <span className="font-semibold tabular-nums">{formatAud(row.amount_cents)}</span>
                  {" · "}
                  <span className="font-mono">{row.reference}</span>
                  {" · "}
                  {row.status}
                  {row.source === "keeper" ? " · recorded" : " · visitor"}
                </span>
                {row.status === "pledged" ? (
                  <button
                    type="button"
                    className="font-semibold text-forest underline"
                    onClick={() => void confirmRow(row.id)}
                  >
                    Confirm received
                  </button>
                ) : null}
                {row.status !== "voided" ? (
                  <button
                    type="button"
                    className="font-semibold text-forest underline"
                    onClick={() => void voidRow(row.id)}
                  >
                    Void
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {rows ? (
        <div className="mt-8 space-y-3">
          <p className="text-sm text-muted">{rows.length} notes</p>
          {rows.length === 0 ? (
            <p className="rounded-md border border-rule bg-card p-5 text-ink-soft">None yet.</p>
          ) : null}
          {rows.map((row) => (
            <article key={row.id} className="rounded-md border border-rule bg-card p-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <Badge>{kindLabel(row.kind)}</Badge>
                <span className="tabular-nums">{String(row.created_at).replace("T", " ").slice(0, 16)}</span>
                {row.page_path ? <span>{row.page_path}</span> : null}
              </div>
              <p className="mt-2 leading-6 text-ink-soft whitespace-pre-wrap">{row.message}</p>
              {row.contact ? (
                <p className="mt-2 text-sm">
                  Reply:{" "}
                  <a className="text-forest underline" href={`mailto:${row.contact}`}>
                    {row.contact}
                  </a>
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted">Sent anonymously</p>
              )}
            </article>
          ))}
        </div>
      ) : null}
      <p className="mt-10 text-sm text-muted">
        <Link to="/feedback" className="underline">
          Public feedback form
        </Link>
        {" · "}
        <Link to="/hosting" className="underline">
          Hosting page
        </Link>
      </p>
    </main>
  );
}
