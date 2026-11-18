import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-ink/40", className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "va-dialog fixed right-3 left-3 z-50 w-auto overflow-y-auto rounded-lg border border-rule bg-paper p-4 shadow-panel sm:top-[12%] sm:right-auto sm:left-1/2 sm:w-[min(40rem,calc(100%-1.5rem))] sm:-translate-x-1/2 sm:p-5",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-3 right-3 grid size-11 place-items-center rounded-sm text-muted hover:bg-paper-2 hover:text-ink">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle };
