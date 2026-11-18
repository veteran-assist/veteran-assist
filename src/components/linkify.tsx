import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { formAliasPattern, formHrefFor } from "@/content/forms";
import { isPartOfNumber } from "@/lib/emergency-number";

// [label](https://...) or [label](/page) shows the label as the link text.
const LABELLED = /^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]*)\)$/;

const PATTERN = new RegExp(
  [
    "\\[[^\\]]+\\]\\((?:https?:\\/\\/|\\/)[^)\\s]*\\)",
    "https?:\\/\\/[^\\s<>)\"']+",
    "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}",
    formAliasPattern,
    "1800\\s+VETERAN(?:\\s*\\(\\s*1800\\s*838\\s*372\\s*\\))?",
    "1800RESPECT(?:\\s*\\(\\s*1800\\s*737\\s*732\\s*\\))?",
    "(?:1800|1300)\\s+\\d{3}\\s+\\d{3}",
    "\\b13\\s+\\d{2}\\s+\\d{2}\\b",
    "\\b000\\b",
  ].join("|"),
  "gi",
);

function hrefFor(raw: string): string {
  const value = raw.trim();
  const formHref = formHrefFor(value);
  if (formHref) return formHref;
  if (/^https?:\/\//i.test(value)) return value.replace(/[.,;:]+$/, "");
  if (value.includes("@")) return `mailto:${value.replace(/[.,;:]+$/, "")}`;
  if (/1800\s+VETERAN/i.test(value) || /1800\s*838\s*372/.test(value)) return "tel:1800838372";
  if (/1800RESPECT/i.test(value) || /1800\s*737\s*732/.test(value)) return "tel:1800737732";
  if (/13\s+11\s+14/.test(value)) return "tel:131114";
  if (value === "000") return "tel:000";
  return `tel:${value.replace(/\D/g, "")}`;
}

export function Linkify({
  text,
  className,
  onDark = false,
}: {
  text: string;
  className?: string;
  onDark?: boolean;
}) {
  const parts: { text: string; href?: string }[] = [];
  let last = 0;
  const re = new RegExp(PATTERN.source, PATTERN.flags);
  for (const match of text.matchAll(re)) {
    const start = match.index ?? 0;
    const matched = match[0];
    // "000" inside $5,000 or 40,000 km is not the emergency number: leave it as plain text.
    if (matched === "000" && isPartOfNumber(text, start)) continue;
    if (start > last) parts.push({ text: text.slice(last, start) });
    const labelled = LABELLED.exec(matched);
    parts.push(labelled ? { text: labelled[1], href: labelled[2] } : { text: matched, href: hrefFor(matched) });
    last = start + matched.length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  if (!parts.length) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        part.href ? (
          <a
            key={`${part.href}-${i}`}
            href={part.href}
            className={cn(
              "font-semibold underline underline-offset-2",
              onDark ? "text-inherit hover:text-paper" : "text-forest",
              className,
            )}
            target={part.href.startsWith("http") ? "_blank" : undefined}
            rel={part.href.startsWith("http") ? "noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
          >
            {part.text}
          </a>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}
