import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { glossary } from "@/content/glossary";
import { Input } from "@/components/ui/input";
import { Linkify } from "@/components/linkify";
import { Disclaimer } from "@/components/disclaimer";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/glossary")({
  component: GlossaryPage,
  head: () => ({
    meta: [{ title: pageTitle("Glossary") }],
  }),
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return glossary;
    return glossary.filter(
      (g) =>
        g.term.toLowerCase().includes(n) ||
        g.definition.toLowerCase().includes(n) ||
        g.aka?.some((a) => a.toLowerCase().includes(n)),
    );
  }, [q]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Glossary</h1>
      <p className="mt-2 text-lg leading-7 text-ink-soft">
        The acronyms DVA letters assume you already know.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-soft">
        Travel at 68 cents a kilometre, and the Gold Card point paths, were checked 19 October 2026.
        The rest of this word list was last read on 18 September 2026. A dollar amount or a wait
        time is dated on the page that quotes it.
      </p>
      <Input
        aria-label="Search the glossary"
        className="mt-6"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search terms — ASP, GARP M, CDDA…"
      />
      <div className="mt-8 space-y-6">
        {rows.map((g) => (
          <article key={g.term} id={g.term} className="scroll-mt-28 border-b border-rule pb-5">
            <h2 className="font-display text-xl font-semibold">{g.term}</h2>
            {g.aka?.length ? <p className="text-sm text-muted">{g.aka.join(" · ")}</p> : null}
            <p className="mt-2 type-body text-ink-soft">
              <Linkify text={g.definition} />
            </p>
            {g.see?.length ? (
              <p className="mt-2 type-body">
                {g.see.map((s, i) => (
                  <span key={s}>
                    {i ? " · " : "See: "}
                    <Link
                      to="/guides/$slug"
                      params={{ slug: s }}
                      className="text-forest underline underline-offset-2"
                    >
                      {s.replace(/-/g, " ")}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
          </article>
        ))}
      </div>
      <div className="mt-10">
        <Disclaimer lastChecked="18 September 2026" />
      </div>
    </main>
  );
}
