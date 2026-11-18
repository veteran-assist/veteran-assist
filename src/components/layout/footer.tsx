import { Link } from "@tanstack/react-router";
import { Disclaimer } from "@/components/disclaimer";
import { HostingMeter } from "@/components/hosting-meter";
import { APP_NAME } from "@/lib/brand";
import { Mark } from "@/components/mark";
import { SouthernCross } from "@/components/southern-cross";

const tools = [
  { to: "/pathfinder", label: "Pathfinder" },
  { to: "/deadlines", label: "Deadlines" },
  { to: "/transition", label: "What changed" },
  { to: "/calculator", label: "Impairment calculator" },
  { to: "/postcode", label: "Find local support" },
  { to: "/file", label: "My file" },
  // /ask forwards to the "Asking an AI" guide (see src/routes/ask.tsx).
  { to: "/ask", label: "Using your own AI" },
] as const;

const guide = [
  { to: "/guides", label: "Guides" },
  { to: "/playbooks", label: "Playbooks" },
  { to: "/letters", label: "Letters" },
  { to: "/forms", label: "Forms" },
  { to: "/call-sheet", label: "Call sheet" },
  { to: "/contacts", label: "Contacts" },
  { to: "/people", label: "Ministers & Commission" },
  { to: "/glossary", label: "Glossary" },
] as const;

const legal = [
  { to: "/feedback", label: "Feedback" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms of use" },
  { to: "/hosting", label: "Hosting this month" },
] as const;

export function Footer() {
  return (
    <footer className="mt-10 border-t border-rule bg-paper-2 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <p className="flex items-center gap-2.5 font-display text-lg font-semibold">
            <Mark className="size-8" />
            {APP_NAME}
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-ink">
            Independent of DVA and Defence.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Built by an Australian veteran who has spent years fighting DVA — for other veterans in
            the same fight.
          </p>
          <p className="mt-3 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
            <SouthernCross className="size-10 text-gold" />
            Australia
          </p>
        </div>
        <FooterCol title="Tools" items={tools} />
        <FooterCol title="Field guide" items={guide} />
        <div className="col-span-2 lg:col-span-1">
          <p className="text-sm font-semibold text-ink">This site</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-6 text-sm text-ink-soft lg:block lg:space-y-1">
            {legal.map((item) => (
              <li key={item.to}>
                <Link className="inline-block py-1.5 hover:underline lg:py-0" to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <HostingMeter compact />
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Disclaimer />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-2 space-y-1 text-sm text-ink-soft">
        {items.map((item) => (
          <li key={item.to}>
            <Link className="inline-block py-1.5 hover:underline lg:py-0" to={item.to}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
