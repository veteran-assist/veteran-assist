import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/brand";
import { SouthernCross } from "@/components/southern-cross";

const ALT = `${APP_NAME} lockup: tri-service bars, independent mark, Southern Cross, and a compass. Independent of DVA and Defence. Not an official Defence or DVA mark.`;

export function BrandPlate({
  caption,
  priority = false,
  className,
}: {
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-lg border border-forest-2 bg-ink shadow-panel", className)}>
      <img
        src="/og.jpg?v=3"
        alt={ALT}
        width={1200}
        height={630}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        className="aspect-[16/9] w-full object-cover object-center"
      />
      {caption ? (
        <figcaption className="flex items-start gap-2.5 bg-ink px-4 py-3 font-display text-sm leading-5 text-gold-2 sm:px-5">
          <SouthernCross className="mt-0.5 size-5 shrink-0 text-gold" />
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
