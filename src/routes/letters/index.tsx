import { createFileRoute, Link } from "@tanstack/react-router";
import { letters } from "@/content/letters";
import { LegalNotice, SolicitorNote } from "@/components/legal-notice";
import { Linkify } from "@/components/linkify";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/letters/")({
  component: LettersIndex,
  head: () => ({
    meta: [{ title: pageTitle("Letters") }],
  }),
});

function LettersIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Letters</h1>
      <p className="mt-2 max-w-2xl text-lg leading-7 font-semibold text-ink">
        Fill the fields. Copy the letter. You send it. We never lodge.
      </p>
      <LegalNotice title="You copy. You send. We never lodge." className="mt-6 max-w-2xl">
        <p>
          These are starting points, not legal instruments, and not a lawyer’s draft. Veteran Assist
          does not send them for you. Check names, dates, claim numbers, and time limits on the{" "}
          <Link to="/deadlines" className="underline underline-offset-2">
            Deadlines
          </Link>{" "}
          tool and on your decision letter before you send.
        </p>
      </LegalNotice>
      <SolicitorNote className="mt-4 max-w-2xl" />
      <div className="mt-8 grid gap-3">
        {letters.map((l) => (
          <article
            key={l.slug}
            className="rounded-md border border-rule bg-card p-5 hover:border-forest/40"
          >
            <Link
              to="/letters/$slug"
              params={{ slug: l.slug }}
              className="font-display text-xl font-semibold hover:underline"
            >
              {l.title}
            </Link>
            <p className="mt-1 text-sm text-muted">
              To: <Linkify text={l.to} />
            </p>
            <p className="mt-2 type-body text-ink-soft">{l.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
