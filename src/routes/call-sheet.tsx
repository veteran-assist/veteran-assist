import { useId } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LastChecked } from "@/components/last-checked";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/call-sheet")({
  component: CallSheetPage,
  head: () => ({
    meta: [
      { title: pageTitle("DVA call sheet") },
      {
        name: "description",
        content:
          "A printable sheet for a DVA phone call. DVA's number and hours, one claim, the questions to ask in order, and a log you fill in by hand or on screen.",
      },
    ],
  }),
});

/*
 * Phone details are from DVA's Contact us page (updated 5 February 2026).
 * Keep them in step with src/content/source-watch.ts ("dva-contact").
 * lastChecked is the day this site re-read that page, not DVA's own date.
 */
const DVA_LINE = "1800 VETERAN (1800 838 372)";
const CALL_SHEET_LAST_CHECKED = "1 November 2026";

/** Questions written the way you would say them. Order matters: status before "what's missing", reference last. */
const questions = [
  "Can you confirm you are looking at my ______ claim, number ______?",
  "Where is that claim up to right now?",
  "What is it waiting on, and who has to provide it?",
  "Is there anything you need from me? Where and how do I send it?",
  "Who has the file now (which team or delegate)?",
  "What is the next step, and who does it — you or me?",
  "When will I hear, and how (letter, MyService, phone)?",
  "What is your name, your position number, and the reference for this call?",
];

/**
 * Ruled lines that can also be typed on. Typing is optional: nothing is saved
 * or sent, and it prints as typed. Blank lines print as lines to write on.
 * Each line is its own input (not a textarea) so the rules print without
 * relying on background graphics.
 */
function Field({
  label,
  lines = 1,
  wide = false,
}: {
  label: string;
  lines?: number;
  wide?: boolean;
}) {
  const id = useId();
  const inputClass =
    "h-7 print:h-[23px] w-full border-0 border-b border-ink bg-transparent px-0 text-sm text-ink outline-none focus:border-forest focus:bg-paper-2 focus-visible:ring-2 focus-visible:ring-forest print:focus:bg-transparent";
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={`${id}-0`} className="block text-sm font-semibold">
        {label}
      </label>
      {Array.from({ length: lines }, (_, i) => (
        <input
          key={i}
          id={`${id}-${i}`}
          type="text"
          autoComplete="off"
          spellCheck={false}
          aria-label={i === 0 ? undefined : `${label}, line ${i + 1}`}
          className={inputClass}
        />
      ))}
    </div>
  );
}

function CallBlock({ n }: { n: number }) {
  return (
    <section className="mt-6 break-inside-avoid rounded-md border border-ink p-4 print:mt-0 print:mb-3 print:p-3">
      <h2 className="font-display text-lg font-semibold print:text-base">Call {n}</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 print:mt-2 print:gap-2">
        <Field label="Date and time" />
        <Field label="Team" />
        <Field label="Their name and position number (PN)" />
        <Field label="Reference number for this call" />
      </div>
      <div className="mt-4 space-y-4 print:mt-2 print:space-y-2">
        <Field label="What I asked" lines={3} wide />
        <Field label="What they said" lines={4} wide />
        <div className="grid gap-3 sm:grid-cols-2 print:gap-4">
          <Field label="What happens next, and by when" lines={3} />
          <Field label="What I will do" lines={3} />
        </div>
      </div>
    </section>
  );
}

/**
 * Safari splits this page badly when it prints (extra pages and gaps) and we cannot
 * test WebKit here, so Safari opens the fixed PDF instead. Other browsers print the page.
 */
function isSafari() {
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|Android|Edg|OPR/.test(ua);
}

function printSheet() {
  if (isSafari()) {
    window.open("/call-sheet.pdf", "_blank");
    return;
  }
  window.print();
}

function CallSheetPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 print:max-w-none print:px-0 print:py-0">
      <div className="print:hidden">
        <h1 className="font-display text-4xl font-semibold tracking-tight">DVA call sheet</h1>
        <p className="mt-2 text-lg leading-7 text-ink-soft">
          Print this page and fill it in by hand while you are on the phone, or type on the lines
          below and then print. It is a log, not a script, and it does not change the outcome of the
          claim.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-ink-soft">
          <li>One claim per call. Write the claim number and the condition before you dial.</li>
          <li>
            Ask in the order on the sheet. Status before “what’s missing”. The reference number
            last.
          </li>
          <li>Write their name, position number and the call reference before you hang up.</li>
          <li>A phone promise is not a decision. If it matters, ask for it in writing.</li>
          <li>
            Calling for someone else? DVA will not discuss their claim until they appoint you on
            form D9325. See{" "}
            <Link
              to="/guides/$slug"
              params={{ slug: "helping-a-veteran" }}
              className="font-semibold text-forest underline"
            >
              Helping a veteran
            </Link>
            .
          </li>
          <li>
            If your contact with DVA is restricted to email, use the same questions in the email and
            keep this sheet as the log. See{" "}
            <Link
              to="/guides/$slug"
              params={{ slug: "contact-restrictions" }}
              className="font-semibold text-forest underline"
            >
              contact restrictions
            </Link>
            .
          </li>
        </ol>
        <div className="mt-4 rounded-md border border-rule bg-card p-3 text-sm leading-6">
          <p className="font-semibold text-ink">Phone, email, or MyService?</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-soft">
            <li>
              Phone: {DVA_LINE}. DVA’s contact page (updated 5 February 2026) says 8am to 5pm local
              time, Monday to Friday.
            </li>
            <li>
              A message in MyService leaves a record. A phone call does not, unless you write it
              down here.
            </li>
            <li>
              DVA does not publish an email response time. If you write, use the{" "}
              <Link
                to="/letters/$slug"
                params={{ slug: "follow-up" }}
                className="font-semibold text-forest underline"
              >
                follow-up letter
              </Link>{" "}
              and diary a date.
            </li>
          </ul>
        </div>
        <p className="mt-4 rounded-md border border-rule bg-card p-3 text-sm leading-6 text-ink-soft">
          Typing is optional. Nothing you type is saved or sent anywhere. It stays on this screen
          until you close or reload the page. The filled-in sheet has your name, date of birth and
          file number on it: keep it with your DVA papers, and do not post a photo of it online.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={printSheet}>
            <Printer className="size-4" />
            Print the call sheet
          </Button>
          <Button asChild variant="secondary">
            <a href="/call-sheet.pdf" download="DVA-call-sheet.pdf">
              <Download className="size-4" />
              Download as PDF (A4, 2 pages)
            </a>
          </Button>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          In Safari the print button opens the PDF, because Safari splits this page across extra
          pages. If any browser does that, print the PDF instead. It prints the same on any device. It is for writing by hand; the typing lines on this page are
          not in it.
        </p>
        <LastChecked
          className="mt-6"
          date={CALL_SHEET_LAST_CHECKED}
          sourceLabel="DVA Contact us"
          sourceHref="https://www.dva.gov.au/about-us/contact-us"
        />
      </div>

      <article className="mt-10 border-t border-rule pt-8 print:mt-0 print:border-0 print:pt-0">
        <header>
          <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
            Veteran Assist
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight print:text-2xl">DVA call sheet</h2>
          <p className="mt-1 text-sm text-ink-soft">
            One claim. Ask in this order. Write the reference before you hang up.
          </p>
          <div className="mt-3 rounded-md border border-ink p-3 text-sm leading-6">
            <p>
              <span className="font-semibold">DVA: {DVA_LINE}</span> — 8am to 5pm local time, Monday
              to Friday.
            </p>
            <p className="text-ink-soft">
              From overseas: +61 2 6289 1133. Interpreter: TIS on 131 450. Deaf, hard of hearing or
              speech difficulty: National Relay Service, then give them 1800 838 372.
            </p>
            <p className="text-ink-soft">
              Calling for someone else? DVA needs form D9325 signed first.
            </p>
          </div>
        </header>

        <section className="mt-6 break-inside-avoid print:mt-3">
          <h3 className="font-display text-lg font-semibold">Before you dial</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 print:mt-2 print:gap-2">
            <Field label="Name" />
            <Field label="Date of birth" />
            <Field label="DVA file number" />
            <Field label="Claim number" />
            <Field label="Condition (plain words)" />
            <Field label="Letter or report in front of me (date)" />
            <Field label="The one thing I want from this call" wide />
          </div>
        </section>

        <section className="mt-6 break-inside-avoid print:mt-3">
          <h3 className="font-display text-lg font-semibold">Ask in this order</h3>
          <p className="mt-1 text-xs text-ink-soft">Tick each one as you ask it.</p>
          <ol className="mt-3 space-y-2 print:mt-2 print:space-y-1">
            {questions.map((q, i) => (
              <li key={q} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center border border-ink text-[10px] font-semibold">
                  {i + 1}
                </span>
                <span
                  className="mt-0.5 inline-block size-4 shrink-0 border border-ink"
                  aria-hidden
                />
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 break-inside-avoid rounded-md border border-rule p-4 print:mt-3 print:p-3">
          <h3 className="font-display text-lg font-semibold">After the call</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 print:leading-5">
            <li>
              If they promised something, put it in writing: use the follow-up letter at
              veteranassist.au/letters/follow-up.
            </li>
            <li>Add the call to My file on veteranassist.au. It stays on your own device.</li>
            <li>
              If nothing happens by the date they gave, see the delays guide at
              veteranassist.au/guides/delays, or run the Pathfinder: “A claim has gone quiet or is
              overdue”.
            </li>
          </ul>
          <ul className="mt-3 space-y-1 text-sm print:hidden">
            <li>
              <Link
                to="/letters/$slug"
                params={{ slug: "follow-up" }}
                className="font-semibold text-forest underline"
              >
                Follow-up letter
              </Link>
            </li>
            <li>
              <Link to="/file" className="font-semibold text-forest underline">
                My file
              </Link>
            </li>
            <li>
              <Link
                to="/guides/$slug"
                params={{ slug: "delays" }}
                className="font-semibold text-forest underline"
              >
                Delays guide
              </Link>
            </li>
          </ul>
        </section>

        <p className="mt-6 text-sm font-semibold print:mt-3">
          A phone promise is not a decision. If it matters, ask for it in writing.
        </p>
        <p className="mt-1 text-xs text-muted">
          Keep this sheet with your DVA papers. Do not post a photo of it online. Veteran Assist is
          independent of DVA and Defence. This sheet is a log. It is not advice. DVA phone details
          from DVA’s Contact us page, updated 5 February 2026. Last checked on this site:{" "}
          {CALL_SHEET_LAST_CHECKED}.
        </p>

        {/* Page 2 when printed: both call logs together on one A4 sheet. */}
        <div className="print:break-before-page">
          <CallBlock n={1} />
          <CallBlock n={2} />
        </div>
      </article>
    </main>
  );
}
