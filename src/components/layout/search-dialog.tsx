import { useEffect, useId, useMemo, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Phone, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { isDistressQuery, searchContent } from "@/content/search";

/** Shown before anything is typed. Plain words veterans use, not the site's jargon. */
const SUGGESTIONS = [
  "claim knocked back",
  "how long does DVA take",
  "time limit to appeal",
  "money is tight",
  "PTSD",
  "gold card",
  "lawyer or advocate",
  "get my file",
];

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const listId = useId();
  const hits = useMemo(() => searchContent(q, 8), [q]);
  const distress = useMemo(() => isDistressQuery(q), [q]);
  const typed = q.trim().length > 0;

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  function go(href: string) {
    if (href.startsWith("tel:")) {
      window.location.href = href;
      return;
    }
    onOpenChange(false);
    const hashAt = href.indexOf("#");
    const hash = hashAt >= 0 ? decodeURIComponent(href.slice(hashAt + 1)) : "";
    router.history.push(href);
    if (!hash) return;
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }, 60);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:p-0">
        <DialogTitle className="sr-only">Search Veteran Assist</DialogTitle>
        <div className="flex items-center gap-2 border-b border-rule px-3">
          <Search className="size-4 text-muted" aria-hidden="true" />
          <input
            aria-label="Search Veteran Assist"
            role="combobox"
            aria-expanded={hits.length > 0}
            aria-controls={listId}
            aria-activedescendant={hits[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            autoFocus
            autoComplete="off"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" && hits.length) {
                e.preventDefault();
                setActive((i) => (i + 1) % hits.length);
              } else if (e.key === "ArrowUp" && hits.length) {
                e.preventDefault();
                setActive((i) => (i - 1 + hits.length) % hits.length);
              } else if (e.key === "Enter" && hits[active]) {
                e.preventDefault();
                go(hits[active].href);
              }
            }}
            placeholder="Search in your own words…"
            className="h-12 w-full bg-transparent text-base outline-none placeholder:text-subtle"
          />
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {typed ? (hits.length ? `${hits.length} results` : "No results") : ""}
        </p>

        {!typed ? (
          <div className="p-4">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Try</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQ(s)}
                  className="min-h-9 rounded-sm border border-rule bg-card px-3 py-1.5 text-sm text-ink-soft hover:border-forest/40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {distress ? (
          <p className="mx-2 mt-2 rounded-sm bg-crisis px-3 py-2 text-sm leading-6 text-crisis-fg">
            If you might not be safe, call <a className="font-semibold underline" href="tel:000">000</a> or Open Arms on{" "}
            <a className="font-semibold underline" href="tel:1800011046">
              1800 011 046
            </a>{" "}
            (24/7, free).
          </p>
        ) : null}

        <ul id={listId} role="listbox" aria-label="Search results" className="max-h-[70vh] overflow-y-auto p-2">
          {typed && hits.length === 0 ? (
            <li className="px-3 py-6 text-sm leading-6 text-ink-soft">
              This site does not cover that yet. For anything DVA, call{" "}
              <a className="font-semibold text-forest underline" href="tel:1800838372">
                1800 VETERAN (1800 838 372)
              </a>
              , or{" "}
              <Link to="/pathfinder" className="font-semibold text-forest underline" onClick={() => onOpenChange(false)}>
                the Pathfinder
              </Link>{" "}
              asks a few questions instead.
            </li>
          ) : null}
          {hits.map((hit, i) => (
            <li
              key={hit.href}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onClick={() => go(hit.href)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full cursor-pointer flex-col items-start rounded-sm px-3 py-2 text-left ${
                i === active ? "bg-paper-2" : ""
              }`}
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-forest uppercase">
                {hit.href.startsWith("tel:") ? <Phone className="size-3" aria-hidden="true" /> : null}
                {hit.href.startsWith("tel:") ? "Call" : hit.kind}
              </span>
              <span className="font-medium text-ink">{hit.title}</span>
              {hit.where ? <span className="text-xs text-muted">{hit.where}</span> : null}
              <span className="mt-0.5 line-clamp-2 text-sm leading-5 text-ink-soft">{hit.snippet}</span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
