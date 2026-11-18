import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLetter } from "@/content/letters";
import { getGuide } from "@/content/guides";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Disclaimer } from "@/components/disclaimer";
import { LegalNotice, SolicitorNote } from "@/components/legal-notice";
import { Linkify } from "@/components/linkify";
import { FormDownloads } from "@/components/form-downloads";
import { FeedbackPanel } from "@/components/feedback-panel";
import { toast } from "sonner";
import { pageTitle } from "@/lib/brand";
import { copyText } from "@/lib/clipboard";

export const Route = createFileRoute("/letters/$slug")({
  loader: ({ params }) => {
    if (!getLetter(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const letter = getLetter(loaderData?.slug ?? "");
    return {
      meta: [
        { title: pageTitle(letter?.title ?? "Letter") },
        { name: "description", content: letter?.summary ?? "Copy-ready letter template." },
      ],
    };
  },
  component: LetterPage,
});

function LetterPage() {
  const { slug } = Route.useLoaderData();
  const letter = getLetter(slug);
  const [values, setValues] = useState<Record<string, string>>({});
  const text = useMemo(() => (letter ? letter.build(values) : ""), [letter, values]);

  if (!letter) return null;

  async function copy() {
    const ok = await copyText(text);
    if (!ok) {
      toast.error("Could not copy. Select the preview and copy it yourself.");
      return;
    }
    setValues({});
    toast.success("Copied. Fields wiped on this page. Paste into email or MyService.");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Letter</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">{letter.title}</h1>
      <p className="mt-2 text-lg leading-7 font-semibold text-ink">{letter.summary}</p>
      <p className="mt-1 text-sm font-medium text-ink">
        Send to: <Linkify text={letter.to} />
      </p>
      <LegalNotice title="You copy. You send. We never lodge." className="mt-6">
        <p>
          Filled in on this device only. Copy the letter and send it yourself. Veteran Assist never
          receives the text and does not lodge it for you. Check names, dates, and time limits
          before you send — this is a starting point, not a lawyer’s draft.
        </p>
      </LegalNotice>
      <SolicitorNote className="mt-4" />
      {letter.slug === "household-services" ? (
        <div className="mt-6">
          <FormDownloads ids={["D9319", "D1351"]} />
        </div>
      ) : null}
      {letter.slug === "foi-request" || letter.slug === "foi-internal-review" || letter.slug === "foi-24ab" ? (
        <div className="mt-6">
          <FormDownloads ids={["D8601", "foi-webform", "pir-webform"]} />
        </div>
      ) : null}
      {letter.fields.some((f) => f.key === "dob") ? (
        <p className="mt-6 rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
          Date of birth is only here so DVA can identify you on the letter you send. Wipe happens
          after you copy. Do not paste a draft with your details into an AI tool.
        </p>
      ) : null}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form
          className="space-y-4"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            void copy();
          }}
        >
          {letter.fields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>
                {field.label}
                {field.required ? <span className="text-crisis"> *</span> : null}
              </Label>
              {field.multiline ? (
                <Textarea
                  id={field.key}
                  className="mt-1"
                  autoComplete="off"
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                />
              ) : (
                <Input
                  id={field.key}
                  className="mt-1"
                  autoComplete="off"
                  placeholder={field.placeholder}
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                />
              )}
            </div>
          ))}
          <Button type="submit">Copy letter — you send it</Button>
        </form>
        <div>
          <p className="text-sm font-semibold text-muted">Preview</p>
          <pre tabIndex={0} aria-label="Letter text, scrollable" className="mt-2 max-h-[40rem] overflow-auto whitespace-pre-wrap rounded-md border border-rule bg-card p-4 font-sans text-sm leading-6 text-ink-soft">
            <Linkify text={text} />
          </pre>
        </div>
      </div>

      {letter.relatedGuides.length ? (
        <p className="mt-8 text-sm">
          Read first:{" "}
          {letter.relatedGuides.map((s, i) => (
            <span key={s}>
              {i ? " · " : null}
              <Link
                to="/guides/$slug"
                params={{ slug: s }}
                className="text-forest underline underline-offset-2"
              >
                {getGuide(s)?.title ?? s}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
      <div className="mt-8">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </main>
  );
}
