import { createFileRoute, Link } from "@tanstack/react-router";
import { playbooks } from "@/content/playbooks";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/playbooks/")({
  component: PlaybooksIndex,
  head: () => ({
    meta: [{ title: pageTitle("Playbooks") }],
  }),
});

function PlaybooksIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Playbooks</h1>
      <p className="mt-2 max-w-2xl text-lg leading-7 text-ink-soft">
        Ordered sequences for the situations veterans actually hit. Do the steps in order.
      </p>
      <div className="mt-8 grid gap-3">
        {playbooks.map((p) => (
          <Link
            key={p.slug}
            to="/playbooks/$slug"
            params={{ slug: p.slug }}
            className="rounded-md border border-rule bg-card p-5 hover:border-forest/40"
          >
            <p className="font-display text-xl font-semibold">{p.title}</p>
            <p className="mt-1 text-sm text-muted">{p.when}</p>
            <p className="mt-2 type-body text-ink-soft">{p.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
