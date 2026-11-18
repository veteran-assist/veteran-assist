import { cn } from "@/lib/utils";

export function LastChecked({
  date,
  sourceLabel,
  sourceHref,
  className,
}: {
  date: string;
  sourceLabel?: string;
  sourceHref?: string;
  className?: string;
}) {
  return (
    <p className={cn("text-sm leading-6 text-muted", className)}>
      Last checked: {date}. If this page and an official DVA page disagree, the official page wins.
      {sourceHref ? (
        <>
          {" "}
          <a
            href={sourceHref}
            className="font-semibold text-forest underline underline-offset-2"
            target={sourceHref.startsWith("http") ? "_blank" : undefined}
            rel={sourceHref.startsWith("http") ? "noreferrer" : undefined}
          >
            {sourceLabel ?? "Official source"}
          </a>
          .
        </>
      ) : null}
    </p>
  );
}
