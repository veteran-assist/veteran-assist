import { createFileRoute } from "@tanstack/react-router";
import { FeedbackPanel } from "@/components/feedback-panel";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/feedback/")({
  component: FeedbackPage,
  head: () => ({
    meta: [{ title: pageTitle("Feedback") }],
  }),
});

function FeedbackPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Feedback</h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        This field guide is only useful if it is right. If a page is out of date, missing a path,
        or actually helped you get something done, say so. Built by a veteran — corrected by
        veterans.
      </p>
      <div className="mt-8">
        <FeedbackPanel />
      </div>
    </main>
  );
}
