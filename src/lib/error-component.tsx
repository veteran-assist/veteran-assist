import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { APP_NAME } from "@/lib/brand";

/**
 * Visitors only ever see a friendly message. The real error is logged on the
 * server (and never rendered), so internal details such as database host names
 * cannot leak into the page.
 */
export function AppErrorComponent({ error }: ErrorComponentProps) {
  if (typeof window === "undefined") {
    const detail = error instanceof Error ? (error.stack ?? error.message) : String(error);
    console.error("[route error]", detail);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-paper px-6 text-center text-ink">
      <TriangleAlert className="size-10 text-crisis" strokeWidth={1.75} aria-hidden="true" />
      <h1 className="font-display text-2xl font-semibold">Something went wrong on our end</h1>
      <p className="max-w-md text-sm text-muted">
        That page did not load properly. Try reloading, or go back to the start. If you need help
        right now, Open Arms is on 1800 011 046, 24 hours a day.
      </p>
      <Link to="/" className="mt-2 text-sm font-semibold text-forest underline underline-offset-4">
        Back to {APP_NAME}
      </Link>
    </main>
  );
}
