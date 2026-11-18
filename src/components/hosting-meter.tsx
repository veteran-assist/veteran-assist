import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getHostingStatus, type HostingStatus } from "@/lib/hosting-api";
import { formatAud } from "@/content/hosting";
import { cn } from "@/lib/utils";

export function HostingMeter({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<HostingStatus | null>(null);

  useEffect(() => {
    let alive = true;
    void getHostingStatus().then((next) => {
      if (alive) setStatus(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Hidden until we know a meter is configured. Nothing is shown or collected otherwise.
  if (!status || !status.enabled) return null;

  const pct = Math.min(100, Math.round((status.raisedCents / status.targetCents) * 100));

  return (
    <div className={compact ? "mt-3 border-t border-rule pt-4" : "rounded-md border border-rule bg-card p-5"}>
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">
        {status.open ? "This month’s hosting" : "This month is covered"}
      </p>
      <p className="font-display mt-1 text-xl font-semibold tabular-nums text-ink">
        {formatAud(status.raisedCents)} of {formatAud(status.targetCents)}
      </p>
      <div
        className="mt-3 h-3 overflow-hidden rounded-sm bg-paper-3"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={status.targetCents}
        aria-valuenow={status.raisedCents}
        aria-label={`${status.monthLabel} hosting`}
      >
        <div
          className={cn("h-full rounded-sm motion-safe:transition-[width] motion-safe:duration-300", status.open ? "bg-forest" : "bg-gold")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        {status.open
          ? `${formatAud(status.remainingCents)} left for ${status.monthLabel}. Optional chip-in toward hosting. Not a donation, not a charity, not tax deductible.`
          : `Covered until ${status.nextMonthLabel}. Nothing more is being asked this month.`}
      </p>
      <p className="mt-2 text-sm">
        <Link to="/hosting" className="font-semibold text-forest underline underline-offset-2">
          {status.collecting ? "How hosting is paid for" : "How hosting is paid for"}
        </Link>
      </p>
    </div>
  );
}
