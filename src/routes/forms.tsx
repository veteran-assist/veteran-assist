import { createFileRoute, Link } from "@tanstack/react-router";
import { FileDown } from "lucide-react";
import { officialForms } from "@/content/forms";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/forms")({
  component: FormsPage,
  head: () => ({
    meta: [
      { title: pageTitle("Forms") },
      {
        name: "description",
        content:
          "Official DVA forms mentioned on this site. PDFs and webforms open on DVA. Most claims are lodged in MyService.",
      },
    ],
  }),
});

function FormsPage() {
  const pdfs = officialForms.filter((f) => f.kind === "pdf");
  const web = officialForms.filter((f) => f.kind === "web");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Forms</h1>
      <p className="mt-2 text-lg leading-7 text-ink-soft">
        Official DVA forms this site mentions. Each link opens on DVA. This site does not host the
        forms and does not see what you type into them. For a phone call, print the{" "}
        <a href="/call-sheet" className="font-semibold text-forest underline underline-offset-2">
          DVA call sheet
        </a>
        : one claim, the questions in order, and a log you fill in by hand.
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        Most claims are lodged in{" "}
        <a
          href="https://www.dva.gov.au/myservice"
          className="font-semibold text-forest underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          MyService
        </a>
        , not on paper. Use a form when the guide says one is needed. The Acute Support Package has
        no form — it is a phone request to 1800 VETERAN (1800 838 372).
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Paper forms (PDF)</h2>
        <ul className="mt-3 divide-y divide-rule rounded-md border border-rule bg-card">
          {pdfs.map((form) => (
            <li key={form.id} className="p-4">
              <a
                href={form.href}
                className="inline-flex items-center gap-2 font-semibold text-forest underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                <FileDown className="size-4 shrink-0" />
                {form.task}
              </a>
              <p className="mt-1 text-sm text-muted">
                {form.number ? `${form.number} — ` : ""}
                {form.title}. PDF on dva.gov.au
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Webforms</h2>
        <ul className="mt-3 divide-y divide-rule rounded-md border border-rule bg-card">
          {web.map((form) => (
            <li key={form.id} className="p-4">
              <a
                href={form.href}
                className="inline-flex items-center gap-2 font-semibold text-forest underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                <FileDown className="size-4 shrink-0" />
                {form.task}
              </a>
              <p className="mt-1 text-sm text-muted">{form.title}. Opens on dva.gov.au</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-md border border-rule bg-card p-5">
        <h2 className="font-display text-2xl font-semibold">Where each form is used</h2>
        <ul className="mt-3 space-y-2 type-body text-ink-soft">
          <li>
            <Link to="/guides/$slug" params={{ slug: "household-services" }} className="font-semibold text-forest underline">
              Household services
            </Link>{" "}
            — D9319 and D1351.
          </li>
          <li>
            <Link to="/guides/$slug" params={{ slug: "foi" }} className="font-semibold text-forest underline">
              Getting your file
            </Link>{" "}
            — D8601, the FOI webform, and the personal information request.
          </li>
          <li>
            <Link to="/guides/$slug" params={{ slug: "gold-card" }} className="font-semibold text-forest underline">
              Gold Card
            </Link>{" "}
            — D3057 is the age-70 form, not the points path.
          </li>
          <li>
            <Link to="/guides/$slug" params={{ slug: "allied-health" }} className="font-semibold text-forest underline">
              Allied health
            </Link>{" "}
            — MEPI webform if you already paid for treatment your card should have covered.
          </li>
          <li>
            <Link to="/guides/$slug" params={{ slug: "incapacity-offsets" }} className="font-semibold text-forest underline">
              Incapacity payments
            </Link>{" "}
            — D1360, or MyService. The Medical Certification – Ability to Work is what the GP or specialist completes. Payments stop if certificates are not supplied when DVA asks.
          </li>
          <li>
            D0800 is travel costs for treatment, a compensation claim, or an invalidity income support claim. DVA says most people claim in MyService. The paper form is the fallback.
          </li>
          <li>
            D9325 appoints a family member, friend or advocate to enquire, act, act on health matters only, or receive payments. Both of you sign it, whether you hand it in through MyService or by post. D9378 is a separate consent form for couples. The steps are on{" "}
            <Link to="/guides/$slug" params={{ slug: "helping-a-veteran" }} className="font-semibold text-forest underline">
              Helping a veteran
            </Link>
            .
          </li>
        </ul>
      </section>
    </main>
  );
}
