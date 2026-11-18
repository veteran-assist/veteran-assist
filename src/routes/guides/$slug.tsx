import { StaleNotice } from "@/components/stale-notice";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Blocks } from "@/components/blocks";
import { Disclaimer } from "@/components/disclaimer";
import { FormDownloads } from "@/components/form-downloads";
import { FeedbackPanel } from "@/components/feedback-panel";
import { getGuide, guides } from "@/content/guides";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageTitle } from "@/lib/brand";
import { readMinutes } from "@/lib/read-time";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: pageTitle(loaderData?.guide.title ?? "Guide") },
      { name: "description", content: loaderData?.guide.summary ?? "" },
    ],
  }),
  component: GuidePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Guide not found</h1>
      <Link to="/guides" className="mt-4 inline-block text-forest underline">
        All guides
      </Link>
    </main>
  ),
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  const related = guide.related.map((s) => getGuide(s)).filter(Boolean);
  const checked = guide.lastChecked ?? guide.updated;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">{guide.category}</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{guide.title}</h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">{guide.summary}</p>
      <p className="mt-2 text-sm text-subtle">
        {readMinutes(guide)} min read · Last checked {checked}
      </p>
      <StaleNotice
        lastChecked={checked}
        officialHref={guide.officialLinks.find((l) => l.href.startsWith("https://"))?.href}
      />
      <Button type="button" variant="outline" className="mt-4 print:hidden" onClick={() => window.print()}>
        Print this guide
      </Button>
      <div className="mt-3 flex flex-wrap gap-2 print:hidden">
        {guide.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      {guide.slug === "household-services" ? (
        <div className="mt-6">
          <FormDownloads ids={["D9319", "D1351"]} />
        </div>
      ) : null}
      {guide.slug === "foi" ? (
        <div className="mt-6">
          <FormDownloads ids={["D8601", "foi-webform", "pir-webform"]} />
        </div>
      ) : null}
      {guide.slug === "allied-health" ? (
        <div className="mt-6">
          <FormDownloads ids={["mepi-webform"]} />
        </div>
      ) : null}
      {guide.slug === "incapacity-offsets" ? (
        <div className="mt-6">
          <FormDownloads ids={["D1360", "ability-to-work"]} />
        </div>
      ) : null}
      {guide.slug === "helping-a-veteran" ? (
        <div className="mt-6">
          <FormDownloads ids={["D9325"]} />
        </div>
      ) : null}
      <article className="mt-8">
        <Blocks blocks={guide.blocks} />
      </article>
      {guide.officialLinks.length ? (
        <section className="mt-10 rounded-md border border-rule bg-card p-5">
          <h2 className="font-display text-2xl font-semibold">Official sources</h2>
          <ul className="mt-3 space-y-2">
            {guide.officialLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-forest underline underline-offset-2"
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {related.length ? (
        <section className="mt-8 print:hidden">
          <h2 className="font-display text-2xl font-semibold">Related</h2>
          <ul className="mt-2 space-y-2">
            {related.map((g) =>
              g ? (
                <li key={g.slug}>
                  <Link
                    to="/guides/$slug"
                    params={{ slug: g.slug }}
                    className="font-medium text-forest underline underline-offset-2"
                  >
                    {g.title}
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      ) : null}
      <div className="mt-10 print:hidden">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer lastChecked={checked} />
      </div>
      <p className="mt-6 text-sm text-muted print:hidden">
        {guides.length} guides in the field manual.{" "}
        <Link to="/guides" className="underline">
          See all
        </Link>
      </p>
    </main>
  );
}
