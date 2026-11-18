import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getHostingStatus, pledgeHosting, type HostingStatus } from "@/lib/hosting-api";
import { formatAud } from "@/content/hosting";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/disclaimer";
import { LegalNotice } from "@/components/legal-notice";
import { FeedbackPanel } from "@/components/feedback-panel";
import { pageTitle } from "@/lib/brand";
import { toast } from "sonner";
import { copyText } from "@/lib/clipboard";

export const Route = createFileRoute("/hosting")({
  component: HostingPage,
  loader: () => getHostingStatus(),
  head: () => ({
    meta: [
      { title: pageTitle("Hosting this month") },
      {
        name: "description",
        content:
          "Veteran Assist is free to use. Where an optional hosting contribution is open, it is not a donation, not a charity, and not tax deductible.",
      },
    ],
  }),
});

function HostingPage() {
  const initial = Route.useLoaderData();
  const [status, setStatus] = useState<HostingStatus | null>(initial);
  const [pending, setPending] = useState(false);
  const [receipt, setReceipt] = useState<{
    amountCents: number;
    reference: string;
    payId: string;
    payIdName: string;
  } | null>(null);

  async function refresh() {
    const next = await getHostingStatus();
    setStatus(next);
    return next;
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function pledge(amountCents: number) {
    if (pending) return;
    setPending(true);
    try {
      const res = await pledgeHosting({ data: { amountCents, honeypot: "" } });
      if (!res.ok) {
        toast.error(res.error);
        if (res.alreadyFull) await refresh();
        return;
      }
      if (!("reference" in res) || !res.reference || !res.payId) return;
      setReceipt({
        amountCents: res.amountCents,
        reference: res.reference,
        payId: res.payId,
        payIdName: res.payIdName,
      });
      await refresh();
      toast.success("Reference ready. Send the PayID transfer, then you are done.");
    } catch {
      toast.error("Could not start that transfer. Please try again.");
    } finally {
      setPending(false);
    }
  }

  const pct = status
    ? Math.min(100, Math.round((status.raisedCents / status.targetCents) * 100))
    : 0;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">This site</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        Hosting this month
      </h1>
      <p className="mt-3 text-lg font-semibold leading-7 text-ink">
        Veteran Assist is free to use. Running it costs the site keeper a small amount each month.
        {status?.enabled
          ? " Anyone who wants to can chip in toward that. When the month is covered, collection stops."
          : " Nobody is being asked for money right now."}
      </p>
      <LegalNotice title="Not a donation. Not a charity. Not tax deductible." className="mt-6">
        <p>
          A hosting contribution is not a donation to veterans, not a registered charity, not a
          deductible gift, and not a tip jar. It does not buy advice, a claim, a faster answer, or a
          professional relationship.
        </p>
        <p>
          If a PayID is shown, the transfer is received by the person who runs this site and used to
          run it. That person is not named here. It is not received by DVA, Defence, an ex-service
          organisation, or a charity.
        </p>
        <p>Do not send official DVA or Defence payments here.</p>
      </LegalNotice>

      {status && !status.enabled ? (
        <section className="mt-8 rounded-md border border-rule bg-card p-5">
          <p className="text-ink-soft type-body">
            This site is not collecting hosting contributions at the moment, so there is no meter
            and no payment details are published. Do not send money to an address, PayID or
            PayPal.me link you found somewhere else.
          </p>
        </section>
      ) : null}

      {status?.enabled ? (
        <section className="mt-8 rounded-md border border-rule bg-card p-5">
          <p className="text-sm font-semibold tracking-wide text-forest uppercase">{status.monthLabel}</p>
          <p className="font-display mt-2 text-4xl font-semibold tabular-nums text-forest">
            {formatAud(status.raisedCents)}
            <span className="text-2xl font-medium text-muted"> of {formatAud(status.targetCents)}</span>
          </p>
          <div
            className="mt-4 h-4 overflow-hidden rounded-sm bg-paper-3"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={status.targetCents}
            aria-valuenow={status.raisedCents}
            aria-label={`${status.monthLabel} hosting`}
          >
            <div
              className={`h-full rounded-sm motion-safe:transition-[width] motion-safe:duration-300 ${status.open ? "bg-forest" : "bg-gold"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-ink-soft type-body">
            {status.open
              ? `${formatAud(status.remainingCents)} still needed. One person can cover the whole month.`
              : `Covered. Collection is closed until ${status.nextMonthLabel}.`}
          </p>
        </section>
      ) : null}
      {!status ? <p className="mt-8 text-sm text-muted">Loading this month’s figures…</p> : null}

      {status?.enabled ? (
      <>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">What the {formatAud(status.targetCents)} is</h2>
        <p className="mt-2 text-ink-soft type-body">
          The site keeper’s monthly cost of keeping this site online. The target is set by the
          keeper and is not padded. Only transfers the keeper has confirmed as received count
          toward the bar.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Chip in this month</h2>
        {!status.open ? (
          <p className="mt-3 rounded-md border border-forest/30 bg-info-bg px-4 py-3 type-body">
            This month is already covered. Thank you. The bar resets on {status.nextMonthLabel}. Do
            not send a transfer until then — it would sit as a credit we did not ask for.
          </p>
        ) : (
          <>
            <p className="mt-3 text-ink-soft type-body">
              PayID only. No card form. Pick an amount, copy the PayID and the reference, send the
              transfer. The bar only moves after the site keeper has confirmed the money arrived. If
              you generate a reference and do not send it, nothing is counted and you do not need to
              do anything. You can also tell us through{" "}
              <Link to="/feedback" className="font-semibold text-forest underline">
                Feedback
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(status?.chips ?? []).map((cents) => (
                <Button
                  key={cents}
                  type="button"
                  variant={cents === status?.remainingCents ? "default" : "secondary"}
                  disabled={pending}
                  onClick={() => void pledge(cents)}
                >
                  {cents === status?.remainingCents ? `Cover the rest (${formatAud(cents)})` : formatAud(cents)}
                </Button>
              ))}
            </div>
          </>
        )}

        {receipt ? (
          <aside className="mt-6 rounded-md border border-forest/40 bg-info-bg p-5">
            <p className="text-sm font-semibold tracking-wide text-forest uppercase">Send this PayID transfer</p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-muted">PayID</dt>
                <dd className="mt-1 font-semibold text-ink">{receipt.payId}</dd>
                <dd className="text-muted">{receipt.payIdName}</dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">Amount</dt>
                <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">{formatAud(receipt.amountCents)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-semibold text-muted">Reference</dt>
                <dd className="mt-1 font-mono text-base font-semibold">{receipt.reference}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  void copyText(receipt.payId).then((ok) =>
                    ok ? toast.success("PayID copied.") : toast.error("Could not copy PayID."),
                  );
                }}
              >
                Copy PayID
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  void copyText(receipt.reference).then((ok) =>
                    ok ? toast.success("Reference copied.") : toast.error("Could not copy reference."),
                  );
                }}
              >
                Copy reference
              </Button>
            </div>
            <p className="mt-3 text-ink-soft type-body">
              Put the reference on the transfer so it can be matched. This does not buy advice, a
              claim, or a faster answer. The site stays free either way.
            </p>
          </aside>
        ) : null}
      </section>

      <section className="mt-10 space-y-3 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">Why PayID</h2>
        <p>
          PayID is a bank-to-bank transfer most Australians already use, with no platform cut. It
          is also how this page can stop collecting once the month is covered. A PayPal.me link
          cannot enforce that cap, so if one is ever shown here it is a fallback only.
        </p>
        {status.paypalMe ? (
          <p>
            PayPal.me/{status.paypalMe} is published as a fallback. It is not the meter. Prefer
            PayID when it is open.
          </p>
        ) : null}
      </section>

      <section className="mt-10 space-y-3 type-body text-ink-soft">
        <h2 className="font-display text-2xl font-semibold text-ink">What this is not</h2>
        <ul className="space-y-2 font-medium text-ink">
          <li className="border-l-4 border-ink pl-4">
            Not a donation, not a charity, not DGR, not a tip. Australian Consumer Law still
            applies to the site as information — a transfer does not buy a result and does not
            waive that.
          </li>
          <li className="border-l-4 border-ink pl-4">
            Not deductible advice. Do not treat this as a tax deduction unless your own adviser
            says so. We will not invent that.
          </li>
          <li className="border-l-4 border-ink pl-4">
            Not DVA, not Defence, not Open Arms. Do not send official payments here.
          </li>
        </ul>
      </section>

      </>
      ) : null}

      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </main>
  );
}
