import { createFileRoute, Link } from "@tanstack/react-router";
import { officeHolders, peopleCaveat, peopleUpdated } from "@/content/people";
import { Disclaimer } from "@/components/disclaimer";
import { FeedbackPanel } from "@/components/feedback-panel";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/people")({
  component: PeoplePage,
  head: () => ({
    meta: [{ title: pageTitle("Ministers and Commission") }],
  }),
});

function PeoplePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Who is who</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        Ministers, shadow, and the Commission
      </h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        The people who sit above DVA when you need a name for a letter. Last checked {peopleUpdated}.
        Roles move — tap the official link before you write.
      </p>
      <p className="mt-3 text-sm text-muted">{peopleCaveat}</p>
      <ul className="mt-8 space-y-3">
        {officeHolders.map((p) => (
          <li key={p.role} className="rounded-md border border-rule bg-card p-4">
            <p className="text-sm font-semibold tracking-wide text-forest uppercase">{p.role}</p>
            <p className="font-display mt-1 text-xl font-semibold">{p.name}</p>
            <p className="mt-2 type-body text-ink-soft">{p.note}</p>
            <a
              href={p.href}
              className="mt-2 inline-block text-sm font-semibold text-forest underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Official page
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-soft">
        Writing to a minister does not skip a VRB time limit. For a live claim, an{" "}
        <a className="text-forest underline" href="https://www.advocateregister.org.au/">
          ATDP advocate
        </a>{" "}
        is usually the better first call. To find the sitting federal member, senators, and DVA
        office for a postcode, use{" "}
        <Link to="/postcode" className="text-forest underline">
          Find local support
        </Link>
        .{" "}
        <Link to="/guides/$slug" params={{ slug: "advocates" }} className="text-forest underline">
          Advocates guide
        </Link>
        .
      </p>
      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer lastChecked={peopleUpdated} />
      </div>
    </main>
  );
}
