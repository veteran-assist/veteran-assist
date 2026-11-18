import { useState } from "react";
import type { CalloutTone, ContentBlock } from "@/content/types";
import { cn } from "@/lib/utils";
import { Linkify } from "@/components/linkify";
import { headingSlug } from "@/lib/slug";
import { copyText } from "@/lib/clipboard";

const toneClass: Record<CalloutTone, string> = {
  info: "bg-info-bg border-forest-3/30 text-ink",
  warn: "bg-warn-bg border-warn/30 text-ink",
  crisis: "bg-crisis text-crisis-fg border-crisis",
  action: "bg-forest text-paper border-forest",
};

export function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="type-body text-ink-soft">
          <Linkify text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h2
          id={block.id ?? headingSlug(block.text)}
          className="font-display scroll-mt-28 pt-4 text-2xl font-semibold tracking-tight text-ink"
        >
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-0">
          {block.items.map((item) => (
            <li
              key={item.slice(0, 64)}
              className="relative border-l-2 border-forest/40 pl-4 type-body text-ink-soft"
            >
              <Linkify text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3">
          {block.items.map((item, idx) => (
            <li key={item.slice(0, 64)} className="flex gap-3 type-body text-ink-soft">
              <span className="mt-0.5 font-display text-lg font-semibold text-forest tabular-nums">
                {idx + 1}
              </span>
              <span>
                <Linkify text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const onDark = block.tone === "action" || block.tone === "crisis";
      return (
        <aside className={cn("rounded-md border px-4 py-3", toneClass[block.tone])}>
          <p className="text-sm font-semibold tracking-wide uppercase">{block.title}</p>
          <p className="mt-1 type-body">
            <Linkify text={block.text} onDark={onDark} />
          </p>
        </aside>
      );
    }
    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((step, idx) => (
            <li key={step.title} className="rounded-md border border-rule bg-card p-4">
              <p className="text-sm font-semibold text-forest">Step {idx + 1}</p>
              <p className="font-display text-xl font-semibold">
                <Linkify text={step.title} />
              </p>
              <p className="mt-1 leading-6 text-ink-soft">
                <Linkify text={step.text} />
              </p>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-forest pl-4 font-display text-xl leading-snug text-ink-soft italic">
          <Linkify text={block.text} />
          {block.cite ? (
            <footer className="mt-2 text-sm not-italic text-muted">— {block.cite}</footer>
          ) : null}
        </blockquote>
      );
    case "prompt":
      return <PromptBlock title={block.title} text={block.text} />;
    default:
      return null;
  }
}

function PromptBlock({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-md border border-rule bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold tracking-wide text-forest uppercase">{title}</p>
        <button
          type="button"
          onClick={() => {
            void copyText(text).then((ok) => {
              if (!ok) return;
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            });
          }}
          className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-forest print:hidden"
        >
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <pre className="mt-3 font-sans type-body whitespace-pre-wrap text-ink">{text}</pre>
    </div>
  );
}
