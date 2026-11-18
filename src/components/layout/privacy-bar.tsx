import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const KEY = "va.privacy-bar.dismissed";

export function PrivacyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) !== "1") setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <section aria-label="Privacy notice" className="border-b border-rule bg-paper-2">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2 text-sm leading-5 text-ink-soft">
        <p className="flex-1">
          Independent of DVA and Defence, and not legal advice. No accounts, no tracking cookies.{" "}
          <Link to="/privacy" className="font-semibold text-forest underline underline-offset-2">
            Privacy
          </Link>
          {" · "}
          <Link to="/terms" className="font-semibold text-forest underline underline-offset-2">
            Terms
          </Link>
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold text-forest underline underline-offset-2"
          onClick={() => {
            try {
              sessionStorage.setItem(KEY, "1");
            } catch {
              /* private mode */
            }
            setShow(false);
          }}
        >
          Hide
        </button>
      </div>
    </section>
  );
}
