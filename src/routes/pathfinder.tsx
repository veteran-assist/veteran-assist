import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nodeForStart, pathNodes, pathResults } from "@/content/pathfinder";
import { getGuide } from "@/content/guides";
import { getPlaybook } from "@/content/playbooks";
import { getLetter } from "@/content/letters";
import { Linkify } from "@/components/linkify";
import { FeedbackPanel } from "@/components/feedback-panel";
import { copyText } from "@/lib/clipboard";
import { pageTitle } from "@/lib/brand";

type Search = { start?: string };

export const Route = createFileRoute("/pathfinder")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    start: typeof search.start === "string" ? search.start : undefined,
  }),
  head: () => ({
    meta: [{ title: pageTitle("Pathfinder") }],
  }),
  component: PathfinderPage,
});

function PathfinderPage() {
  const { start } = Route.useSearch();
  const initial = nodeForStart(start);
  const [id, setId] = useState(initial);
  const [trail, setTrail] = useState<string[]>(start ? ["start"] : []);
  const [copied, setCopied] = useState(false);

  const node = pathNodes[id];
  const result = pathResults[id];

  function pick(next: string) {
    setTrail((t) => [...t, id]);
    setId(next);
    setCopied(false);
  }

  function back() {
    const prev = trail[trail.length - 1];
    if (!prev) {
      setId("start");
      return;
    }
    setTrail((t) => t.slice(0, -1));
    setId(prev);
  }

  const stepLabel = useMemo(() => (result ? "Your next moves" : "A few questions"), [result]);

  async function copySteps() {
    if (!result) return;
    const plain = (t: string) => t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) =>
      href.startsWith("/") ? `${label} (veteranassist.au${href})` : `${label} (${href})`,
    );
    const lines = [
      result.title,
      plain(result.summary),
      "This summarises DVA’s published process for the answers you gave. It is general information, not advice on what to do.",
      "",
      "Next steps",
      ...result.doNow.map((item, i) => `${i + 1}. ${plain(item)}`),
    ];
    if (result.then.length) {
      lines.push("", "Then", ...result.then.map((item) => `- ${plain(item)}`));
    }
    lines.push("", result.caution);
    const ok = await copyText(lines.join("\n"));
    setCopied(ok);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">{stepLabel}</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">Pathfinder</h1>
      <p className="mt-2 text-lg leading-7 text-ink-soft">
        Tell us what is happening. We will not ask for your file number. You get a sequence, not a speech.
      </p>

      {id !== "start" ? (
        <button
          type="button"
          onClick={back}
          className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-forest"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
      ) : null}

      {node ? (
        <section className="mt-8">
          <h2 className="font-display text-2xl font-semibold">{node.question}</h2>
          {node.help ? <p className="mt-2 text-sm text-muted">{node.help}</p> : null}
          <div className="mt-5 space-y-5">
            <OptionGroups options={node.options} onPick={pick} />
          </div>
        </section>
      ) : null}

      {result ? (
        <section className="mt-8 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">{result.title}</h2>
            <p className="mt-2 text-lg leading-7 text-ink-soft">
              <Linkify text={result.summary} />
            </p>
            <p className="mt-2 text-sm text-muted">
              This summarises DVA’s published process for the answers you gave. It is general information, not advice on what to do.
            </p>
          </div>
          <div className="rounded-md border border-forest/30 bg-info-bg p-5">
            <p className="text-sm font-semibold tracking-wide text-forest uppercase">Next steps</p>
            <ol className="mt-2 space-y-2">
              {result.doNow.map((item, i) => (
                <li key={item} className="flex gap-3 type-body">
                  <span className="font-display font-semibold text-forest tabular-nums">{i + 1}</span>
                  <span>
                    <Linkify text={item} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {result.then.length ? (
            <div>
              <p className="text-sm font-semibold tracking-wide text-muted uppercase">Then</p>
              <ul className="mt-2 space-y-2 text-ink-soft">
                {result.then.map((item) => (
                  <li key={item} className="border-l-2 border-rule pl-3 type-body">
                    <Linkify text={item} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="rounded-md border border-warn/30 bg-warn-bg px-4 py-3 type-body">
            <Linkify text={result.caution} />
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <LinkCol
              title="Guides"
              items={result.guides.map((s) => ({
                href: `/guides/${s}`,
                label: getGuide(s)?.title ?? s,
              }))}
            />
            <LinkCol
              title="Playbooks"
              items={result.playbooks.map((s) => ({
                href: `/playbooks/${s}`,
                label: getPlaybook(s)?.title ?? s,
              }))}
            />
            <LinkCol
              title="Letters"
              items={result.letters.map((s) => ({
                href: `/letters/${s}`,
                label: getLetter(s)?.title ?? s,
              }))}
            />
            <div>
              <p className="text-sm font-semibold text-muted">People / numbers</p>
              <ul className="mt-2 space-y-1 type-body text-ink-soft">
                {result.contacts.map((c) => (
                  <li key={c}>
                    <Linkify text={c} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {result.id === "result-deadline" ? (
              <Button asChild>
                <Link to="/deadlines">
                  Open Deadlines <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
            {result.id === "result-lodge" || result.id === "result-offset" ? (
              <Button asChild variant="secondary">
                <Link to="/transition">What changed on 1 July 2026</Link>
              </Button>
            ) : null}
            <Button asChild>
              <Link to="/guides/$slug" params={{ slug: "asking-an-ai" }}>
                Ask your own AI a follow-up <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button type="button" variant="secondary" onClick={() => void copySteps()}>
              {copied ? "Copied" : "Copy these steps"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setId("start");
                setTrail([]);
                setCopied(false);
              }}
            >
              Start again
            </Button>
          </div>
        </section>
      ) : null}
      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
    </main>
  );
}

function OptionGroups({
  options,
  onPick,
}: {
  options: { id: string; label: string; next: string; group?: string }[];
  onPick: (next: string) => void;
}) {
  const groups: { title: string | null; options: typeof options }[] = [];
  for (const opt of options) {
    const title = opt.group ?? null;
    const last = groups[groups.length - 1];
    if (!last || last.title !== title) groups.push({ title, options: [opt] });
    else last.options.push(opt);
  }
  return (
    <>
      {groups.map((group) => (
        <div key={group.title ?? "first"}>
          {group.title ? (
            <p className="mb-2 text-sm font-semibold tracking-wide text-muted uppercase">{group.title}</p>
          ) : null}
          <div className="grid gap-2">
            {group.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onPick(opt.next)}
                className={
                  opt.id === "unsafe"
                    ? "flex min-h-14 items-center justify-between gap-3 rounded-md border border-crisis bg-crisis/10 px-4 py-4 text-left"
                    : "flex min-h-14 items-center justify-between gap-3 rounded-md border border-rule bg-card px-4 py-4 text-left hover:border-forest/40"
                }
              >
                <span className="type-body font-medium">{opt.label}</span>
                <ArrowRight className="size-4 shrink-0 text-forest" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function LinkCol({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-sm font-semibold text-muted">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="type-body font-medium text-forest underline underline-offset-2">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
