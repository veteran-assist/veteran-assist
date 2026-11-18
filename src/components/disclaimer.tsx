import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/brand";
import { LastChecked } from "@/components/last-checked";

export function Disclaimer({
  className,
  lastChecked,
}: {
  className?: string;
  lastChecked?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {lastChecked ? <LastChecked date={lastChecked} /> : null}
      <p className="text-sm font-medium leading-relaxed text-ink">
        {APP_NAME} is independent of DVA and Defence. The publisher is not an Australian legal
        practitioner. This site is not a law firm and not an ATDP practice. Nothing here is legal,
        financial, or clinical advice, and nothing creates a professional relationship. Check your
        decision letter and the official page before you act on anything here. Australian
        Consumer Law rights are not excluded.{" "}
        <Link to="/terms" className="underline underline-offset-2">
          Terms of use
        </Link>
        {" · "}
        <Link to="/privacy" className="underline underline-offset-2">
          Privacy
        </Link>
        {" · "}
        <Link to="/about" className="underline underline-offset-2">
          About
        </Link>
        . Crisis:{" "}
        <a className="underline underline-offset-2" href="tel:1800011046">
          Open Arms 1800 011 046
        </a>
        , Lifeline 13 11 14, or 000.
      </p>
    </div>
  );
}
