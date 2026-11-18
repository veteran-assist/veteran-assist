import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "va-sheet fixed inset-y-0 right-0 z-50 flex w-full max-w-[22rem] flex-col overflow-y-auto border-l border-rule bg-paper px-5 shadow-panel",
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
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent, SheetClose };
