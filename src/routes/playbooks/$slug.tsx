import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPlaybook } from "@/content/playbooks";
import { getGuide } from "@/content/guides";
import { getLetter } from "@/content/letters";
import { Disclaimer } from "@/components/disclaimer";
import { Linkify } from "@/components/linkify";
import { FormDownloads } from "@/components/form-downloads";
import { FeedbackPanel } from "@/components/feedback-panel";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/playbooks/$slug")({
  loader: ({ params }) => {
    const playbook = getPlaybook(params.slug);
    if (!playbook) throw notFound();
    return { playbook };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: pageTitle(loaderData?.playbook.title ?? "Playbook") }],
  }),
  component: PlaybookPage,
});

function PlaybookPage() {
  const { playbook } = Route.useLoaderData();
  const [done, setDone] = useState<Record<number, boolean>>({});

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Playbook</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{playbook.title}</h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        <Linkify text={playbook.summary} />
      </p>
      <p className="mt-2 text-sm text-muted">
        When: {playbook.when} · {playbook.minutes}
      </p>
      <p className="mt-2 text-sm text-muted">
        This sets out DVA’s published process. It is general information, not advice on what to do.
      </p>
      {playbook.slug === "need-household-help" ? (
        <div className="mt-6">
          <FormDownloads ids={["D9319", "D1351"]} />
        </div>
      ) : null}
      {playbook.slug === "need-my-file" ? (
        <div className="mt-6">
          <FormDownloads ids={["D8601", "foi-webform", "pir-webform"]} />
        </div>
      ) : null}
      <ol className="mt-8 space-y-3">
        {playbook.steps.map((step, i) => (
          <li key={step.title} id={`step-${i + 1}`} className="scroll-mt-28 rounded-md border border-rule bg-card p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-5 accent-forest"
                checked={Boolean(done[i])}
                onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              />
              <span>
                <span className="text-sm font-semibold text-forest">Step {i + 1}</span>
                <span className="font-display block text-xl font-semibold">
                  <Linkify text={step.title} />
                </span>
                <span className="mt-1 block type-body text-ink-soft">
                  <Linkify text={step.detail} />
                </span>
              </span>
            </label>
          </li>
        ))}
      </ol>
      <section className="mt-8 rounded-md border border-warn/30 bg-warn-bg p-5">
        <h2 className="font-display text-2xl font-semibold">Watch-outs</h2>
        <ul className="mt-2 space-y-2">
          {playbook.watchOuts.map((w) => (
            <li key={w} className="type-body">
              <Linkify text={w} />
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-muted">Guides</p>
          <ul className="mt-2 space-y-1">
            {playbook.relatedGuides.map((s) => (
              <li key={s}>
                <Link
                  to="/guides/$slug"
                  params={{ slug: s }}
                  className="text-forest underline underline-offset-2"
                >
                  {getGuide(s)?.title ?? s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted">Letters</p>
          <ul className="mt-2 space-y-1">
            {playbook.relatedLetters.map((s) => (
              <li key={s}>
                <Link
                  to="/letters/$slug"
                  params={{ slug: s }}
                  className="text-forest underline underline-offset-2"
                >
                  {getLetter(s)?.title ?? s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </main>
  );
}
