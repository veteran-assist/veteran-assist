import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LegalNotice({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-md border-2 border-ink bg-warn-bg px-3 py-3 text-ink shadow-panel sm:px-4 sm:py-4",
        className,
      )}
      role="note"
    >
      <p className="font-display text-lg font-semibold tracking-tight">{title}</p>
      <div className="mt-2 space-y-2 type-body font-medium">{children}</div>
    </aside>
  );
}

/** On Terms, Privacy and Letters — no solicitor has been retained for the visitor. */
export function SolicitorNote({ className }: { className?: string }) {
  return (
    <p className={cn("border-l-4 border-ink pl-4 text-sm font-semibold leading-6 text-ink", className)}>
      These pages are the publisher’s wording. No solicitor has been retained for you. If you need a
      lawyer, take this page and your facts to a solicitor in your state, or an{" "}
      <a className="underline underline-offset-2" href="https://www.advocateregister.org.au/">
        ATDP-accredited advocate
      </a>
      .{" "}
      <Link to="/terms" className="underline underline-offset-2">
        Terms
      </Link>
      {" · "}
      <Link to="/privacy" className="underline underline-offset-2">
        Privacy
      </Link>
      .
    </p>
  );
}
