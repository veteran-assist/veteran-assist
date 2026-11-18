import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/brand";

/** Single source for the V tile. Same hex on every surface — header, footer, menu, favicon, cards. */
export const MARK = {
  ink: "#0b1f3a",
  army: "#5c6b32",
  gold: "#c5a046",
  gold2: "#e0c36a",
  raaf: "#41b6e6",
  paper: "#f4f7fa",
} as const;

/** Independent tri-service mark — not a Defence or DVA crest. */
export function Mark({
  className,
  title = APP_NAME,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="32" height="32" rx="5" fill={MARK.ink} />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="4.4"
        fill="none"
        stroke={MARK.gold2}
        strokeWidth="1.1"
      />
      <rect x="4" y="4" width="7.5" height="3.5" rx="0.5" fill={MARK.army} />
      <rect x="12.25" y="4" width="7.5" height="3.5" rx="0.5" fill={MARK.gold} />
      <rect x="20.5" y="4" width="7.5" height="3.5" rx="0.5" fill={MARK.raaf} />
      <path d="M10 12.2 16 26.2 22 12.2h-3.15L16 19.1 13.15 12.2Z" fill={MARK.paper} />
    </svg>
  );
}
