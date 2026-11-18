import { useEffect, useState } from "react";
import { isStale } from "@/lib/freshness";

/**
 * Shown only when a guide's "last checked" date is old. It is decided in the browser,
 * after the page loads, so a guide that goes stale shows the warning without a redeploy.
 */
export function StaleNotice({
  lastChecked,
  officialHref,
}: {
  lastChecked: string;
  officialHref?: string;
}) {
  const [stale, setStale] = useState(false);
  useEffect(() => {
    setStale(isStale(lastChecked, new Date()));
  }, [lastChecked]);
  if (!stale) return null;
  return (
    <p
      role="note"
      className="mt-3 rounded-md border border-gold bg-card p-3 text-sm leading-6 text-ink print:hidden"
    >
      <span className="font-semibold">Not checked recently.</span> This guide was last checked on{" "}
      {lastChecked}. DVA may have changed since. Use the official links on this page to confirm
      before you rely on a figure or a date.
      {officialHref ? (
        <>
          {" "}
          <a
            href={officialHref}
            className="font-semibold text-forest underline underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            Open the official page
          </a>
          .
        </>
      ) : null}
    </p>
  );
}
