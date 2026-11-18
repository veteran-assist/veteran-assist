import { createFileRoute, Link } from "@tanstack/react-router";
import { guides, guidesByCategory } from "@/content/guides";
import { pageTitle } from "@/lib/brand";
import { readMinutes } from "@/lib/read-time";

export const Route = createFileRoute("/guides/")({
  component: GuidesIndex,
  head: () => ({
    meta: [{ title: pageTitle("Guides") }],
  }),
});

function GuidesIndex() {
  const grouped = guidesByCategory();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Guides</h1>
      <p className="mt-2 max-w-2xl text-lg leading-7 text-ink-soft">
        {guides.length} field notes on how DVA claims actually work after 1 July 2026. Read the one
        that matches today. Official links sit at the bottom of each guide.
      </p>
      <Link
        to="/transition"
        className="mt-6 flex flex-col rounded-md border border-forest/40 bg-forest px-5 py-4 text-paper hover:bg-forest-2"
      >
        <p className="text-sm font-semibold tracking-[0.14em] text-gold uppercase">Start here if you were already in the system</p>
        <p className="font-display mt-1 text-2xl font-semibold">What changed on 1 July 2026</p>
        <p className="mt-2 max-w-2xl type-body text-paper/85">
          The VETS Act closed DRCA and VEA to new claims. The traps — the five-point gate, the
          redemption ceiling, SRDP eligibility versus election — are on that page.
        </p>
      </Link>
      <div className="mt-10 space-y-10">
        {[...grouped.entries()].map(([category, list]) => (
          <section key={category}>
            <h2 className="font-display text-2xl font-semibold">{category}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {list.map((g) => (
                <Link
                  key={g.slug}
                  to="/guides/$slug"
                  params={{ slug: g.slug }}
                  className="flex h-full flex-col rounded-md border border-rule bg-card p-4 hover:border-forest/40"
                >
                  <p className="font-display text-xl font-semibold leading-snug">{g.title}</p>
                  <p className="mt-2 type-body text-muted">{g.summary}</p>
                  <p className="mt-3 text-xs text-subtle">
                    {readMinutes(g)} min · Last checked {g.lastChecked ?? g.updated}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
