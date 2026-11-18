import { useState, type FormEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FEEDBACK_KINDS, submitFeedback, type FeedbackKind } from "@/lib/feedback-api";
import { findPii, piiBlockMessage } from "@/lib/privacy";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FeedbackPanel({ compact = false }: { compact?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [kind, setKind] = useState<FeedbackKind | null>(null);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!kind || pending) return;
    const pii = findPii(message).filter((h) => h.kind !== "email address");
    if (pii.length) {
      setError(piiBlockMessage(pii));
      return;
    }
    setPending(true);
    setError(null);
    try {
      const res = await submitFeedback({
        data: {
          kind,
          message,
          pagePath: pathname,
          contact,
          honeypot,
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSent(true);
      setMessage("");
      setContact("");
    } catch {
      setError("Could not send just then. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <section className="rounded-md border border-forest/30 bg-info-bg px-4 py-4" role="status">
        <p className="font-display text-lg font-semibold">Received. Thank you.</p>
        <p className="mt-1 text-sm leading-6 text-ink-soft">
          Notes like this are how the field guide stays honest. Nothing else was stored — only what
          you chose to send.
        </p>
        <button
          type="button"
          className="mt-3 text-sm font-semibold text-forest underline underline-offset-2"
          onClick={() => {
            setSent(false);
            setKind(null);
          }}
        >
          Send another
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-md border border-rule bg-card p-4 sm:p-5">
      <p className="font-display text-lg font-semibold tracking-tight">
        {compact ? "Is this page right?" : "Help keep this field guide honest"}
      </p>
      <p className="mt-1 text-sm leading-6 text-ink-soft">
        Built by a veteran, for veterans. If something is wrong, missing, or useful, say so. Do not
        include claim numbers, names, or medical detail.{" "}
        <Link to="/privacy" className="font-semibold text-forest underline underline-offset-2">
          Privacy
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {FEEDBACK_KINDS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setKind(item.id)}
            className={
              kind === item.id
                ? "min-h-11 rounded-sm border border-forest bg-forest px-3 py-2 text-left text-sm font-semibold text-paper"
                : "min-h-11 rounded-sm border border-rule bg-paper-2 px-3 py-2 text-left text-sm text-ink-soft hover:border-forest/40"
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      {kind ? (
        <form onSubmit={onSubmit} autoComplete="off" className="mt-4 space-y-3">
          <div className="hidden" aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="feedback-note">
              {kind === "helped" ? "What helped (optional)" : "What should we know"}
            </Label>
            <Textarea
              id="feedback-note"
              className="mt-1 min-h-28"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                kind === "accuracy"
                  ? "e.g. The household services cap on this page looks out of date as of…"
                  : kind === "missing"
                    ? "e.g. Veterans also need a path for…"
                    : kind === "helped"
                      ? "Optional — which bit was useful"
                      : "Write it the way you would tell a mate"
              }
              required={kind !== "helped"}
            />
          </div>
          <div>
            <Label htmlFor="feedback-contact">Email if you want a reply (optional)</Label>
            <Input
              id="feedback-contact"
              type="email"
              className="mt-1"
              autoComplete="off"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Leave blank to stay anonymous"
            />
          </div>
          {error ? (
            <p className="text-sm text-crisis" role="alert">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Sending…" : "Send feedback"}
            </Button>
            <p className="text-xs text-muted">
              Sending this note is the only time we keep what you typed.
            </p>
          </div>
        </form>
      ) : null}
    </section>
  );
}
