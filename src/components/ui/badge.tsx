import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        default: "border-transparent bg-forest text-paper",
        outline: "border-rule text-ink-soft",
        paper: "border-rule bg-paper-2 text-ink-soft",
        crisis: "border-transparent bg-crisis text-crisis-fg",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
