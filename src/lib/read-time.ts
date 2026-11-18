import type { ContentBlock, Guide } from "@/content/types";

/** A steady adult reading pace. The label is an estimate, so keep it simple. */
const WORDS_PER_MINUTE = 200;

function blockText(block: ContentBlock): string[] {
  switch (block.type) {
    case "p":
    case "h3":
    case "quote":
      return [block.text];
    case "ul":
    case "ol":
      return block.items;
    case "callout":
    case "prompt":
      return [block.title, block.text];
    case "steps":
      return block.items.flatMap((item) => [item.title, item.text]);
  }
}

/**
 * Reading time worked out from the guide's own words, so the label cannot drift when a guide is
 * shortened or extended. (It used to be a hand-typed number on each guide, and many were wrong.)
 */
export function readMinutes(guide: Pick<Guide, "summary" | "blocks">): number {
  const words = [guide.summary, ...guide.blocks.flatMap(blockText)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
