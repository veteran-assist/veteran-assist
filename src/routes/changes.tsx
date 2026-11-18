import { createFileRoute } from "@tanstack/react-router";
import { ChangeList } from "@/components/recent-changes";
import { HOME_RECENT_LIMIT, recentChanges } from "@/content/recent-changes";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/changes")({
  component: ChangesPage,
  head: () => ({
    meta: [
      { title: pageTitle("Recent changes") },
      {
        name: "description",
        content:
          "What changed on Veteran Assist, newest first. The front page shows the latest five.",
      },
    ],
  }),
});

function ChangesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Recent changes</h1>
      <p className="mt-2 text-lg leading-7 text-ink-soft">
        What this site changed, newest first. The front page shows the latest {HOME_RECENT_LIMIT}.
        A date here is when the line was added, not when DVA last updated a figure.
      </p>
      <ChangeList items={recentChanges} />
    </main>
  );
}
