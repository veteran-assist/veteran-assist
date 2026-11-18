import { FileDown } from "lucide-react";
import { formsById } from "@/content/forms";

export function FormDownloads({ ids }: { ids: string[] }) {
  const forms = formsById(ids);
  if (!forms.length) return null;
  return (
    <div className="rounded-md border border-rule bg-card p-4">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">
        {forms.every((f) => f.kind === "web")
          ? "Open the official form"
          : forms.some((f) => f.kind === "web")
            ? "Official forms"
            : "Download the official form"}
      </p>
      <ul className="mt-2 space-y-2">
        {forms.map((form) => (
          <li key={form.id}>
            <a
              href={form.href}
              className="inline-flex items-center gap-2 font-semibold text-forest underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              <FileDown className="size-4 shrink-0" />
              {form.kind === "pdf"
                ? `${form.number ? `${form.number} — ` : ""}${form.title} (PDF)`
                : `${form.title} (webform)`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
