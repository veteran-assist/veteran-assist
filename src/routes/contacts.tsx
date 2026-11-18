import { createFileRoute, Link } from "@tanstack/react-router";
import { crisisLines, resources } from "@/content/resources";
import { Linkify } from "@/components/linkify";
import { Disclaimer } from "@/components/disclaimer";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/contacts")({
  component: ContactsPage,
  head: () => ({
    meta: [{ title: pageTitle("Contacts") }],
  }),
});

// Crisis numbers are in the red box above, so there is no separate "Crisis" group here.
const groups = [
  { kind: "official" as const, title: "DVA and government" },
  { kind: "review" as const, title: "Review and complaints" },
  { kind: "advocate" as const, title: "Advocates" },
  { kind: "info" as const, title: "Reference" },
];

function ContactsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Contacts</h1>
      <p className="mt-2 text-lg leading-7 text-ink-soft">
        Official numbers and pages. For a sitting MP, senators, and the DVA office on a postcode, use{" "}
        <Link to="/postcode" className="font-semibold text-forest underline">
          Find local support
        </Link>
        .
      </p>
      <section className="mt-8 rounded-md bg-crisis p-5 text-crisis-fg">
        <h2 className="font-display text-2xl font-semibold text-crisis-fg">If you are not safe</h2>
        <ul className="mt-3 space-y-2">
          {crisisLines.map((c) => (
            <li key={c.phone}>
              <a className="text-lg font-semibold underline underline-offset-2" href={`tel:${c.phone.replace(/\s/g, "")}`}>
                {c.name} — {c.phone}
              </a>
              <span className="ml-2 text-sm opacity-90">{c.note}</span>
            </li>
          ))}
        </ul>
      </section>
      {groups.map((g) => {
        const items = resources.filter((r) => r.kind === g.kind);
        if (!items.length) return null;
        return (
          <section key={g.kind} className="mt-10">
            <h2 className="font-display text-2xl font-semibold">{g.title}</h2>
            <ul className="mt-3 divide-y divide-rule rounded-md border border-rule bg-card">
              {items.map((r) => (
                <li key={r.name} className="p-4">
                  <a
                    href={r.href}
                    className="font-semibold text-forest underline underline-offset-2"
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {r.name}
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    <Linkify text={r.note} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <div className="mt-10">
        <Disclaimer />
      </div>
    </main>
  );
}
