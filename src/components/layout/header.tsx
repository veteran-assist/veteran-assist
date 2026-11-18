import { SouthernCross } from "@/components/southern-cross";
import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
// The search index pulls in all guide and letter text, so load it only when search is first opened.
const SearchDialog = lazy(() =>
  import("./search-dialog").then((m) => ({ default: m.SearchDialog })),
);
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/brand";
import { Mark } from "@/components/mark";

const nav = [
  { to: "/pathfinder", label: "Pathfinder" },
  { to: "/deadlines", label: "Deadlines" },
  { to: "/transition", label: "What changed" },
  { to: "/guides", label: "Guides" },
  { to: "/forms", label: "Forms" },
  { to: "/calculator", label: "Impairment" },
  // /ask forwards to the "Asking an AI" guide (see src/routes/ask.tsx).
  { to: "/ask", label: "Using AI" },
] as const;

const more = [
  { to: "/postcode", label: "Find local support" },
  { to: "/letters", label: "Letters" },
  { to: "/call-sheet", label: "Call sheet" },
  { to: "/playbooks", label: "Playbooks" },
  { to: "/contacts", label: "Contacts" },
  { to: "/people", label: "Ministers & Commission" },
  { to: "/glossary", label: "Glossary" },
  { to: "/file", label: "My file" },
  { to: "/feedback", label: "Feedback" },
  { to: "/hosting", label: "Hosting this month" },
  { to: "/about", label: "About" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms of use" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchEverOpened, setSearchEverOpened] = useState(false);
  useEffect(() => {
    if (searchOpen) setSearchEverOpened(true);
  }, [searchOpen]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-forest text-paper">
      <div className="mx-auto flex h-14 max-w-6xl flex-nowrap items-center gap-2 px-4 sm:h-16 sm:gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 font-display text-base font-semibold tracking-wide sm:flex-none sm:gap-2.5 sm:text-lg"
        >
          <Mark className="size-8 shrink-0" />
          <span className="truncate">{APP_NAME}</span>
          <SouthernCross className="size-9 shrink-0 text-gold sm:size-10" />
        </Link>
        <nav aria-label="Main" className="ml-3 hidden min-w-0 flex-nowrap items-center gap-0 lg:flex">
          <Link
            to="/guides/$slug"
            params={{ slug: "gold-card" }}
            className={cn(
              "whitespace-nowrap rounded-sm px-2 py-2 text-sm font-bold text-gold hover:bg-paper/10 hover:text-gold-2",
              pathname === "/guides/gold-card" ? "bg-paper/15" : "",
            )}
          >
            Gold Card
          </Link>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "whitespace-nowrap rounded-sm px-2 py-2 text-sm font-medium text-paper/85 hover:bg-paper/10 hover:text-paper",
                pathname === item.to || pathname.startsWith(`${item.to}/`)
                  ? "bg-paper/15 text-white"
                  : "",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-paper hover:bg-paper/10 hover:text-paper sm:border sm:border-gold/40"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-paper hover:bg-paper/10 hover:text-paper lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
      {/* Phones and small tablets: the main bar is hidden below lg, so show the main pages as a scrolling row. Gold Card first so it is never off-screen. */}
      <nav aria-label="Main pages" className="border-t border-paper/15 lg:hidden">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <li className="shrink-0">
            <Link
              to="/guides/$slug"
              params={{ slug: "gold-card" }}
              className={cn(
                "inline-flex min-h-11 items-center whitespace-nowrap rounded-sm px-3 text-sm font-bold text-gold hover:bg-paper/10",
                pathname === "/guides/gold-card" ? "bg-paper/15" : "",
              )}
            >
              Gold Card
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.to} className="shrink-0">
              <Link
                to={item.to}
                className={cn(
                  "inline-flex min-h-11 items-center whitespace-nowrap rounded-sm px-3 text-sm font-medium text-paper/90 hover:bg-paper/10",
                  pathname === item.to || pathname.startsWith(`${item.to}/`) ? "bg-paper/15 text-white" : "",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="border-t border-paper/15 bg-forest-2">
        <span className="mx-auto block max-w-6xl px-4 py-1.5 text-xs font-semibold leading-5 text-paper sm:text-sm">
          Your claim stays yours. Not legal advice. You send it. Official page wins.{" "}
          <Link to="/terms" className="text-gold underline underline-offset-2 hover:text-gold-2">
            Terms
          </Link>
        </span>
      </p>
      {searchEverOpened ? (
        <Suspense fallback={null}>
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </Suspense>
      ) : null}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent className="overflow-y-auto">
          <p className="flex items-center gap-2.5 pr-12 font-display text-lg font-semibold">
            <Mark className="size-8" />
            {APP_NAME}
          </p>
          <p className="mt-2 text-sm font-semibold text-ink">Independent of DVA and Defence.</p>
          <nav aria-label="Menu" className="mt-6 flex flex-col gap-6">
            <Link
              to="/guides/$slug"
              params={{ slug: "gold-card" }}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block rounded-sm px-3 py-3 text-base font-bold text-gold underline underline-offset-2 hover:bg-paper-2",
                pathname === "/guides/gold-card" ? "bg-paper-2" : "",
              )}
            >
              Gold Card
            </Link>
            <MenuGroup title="On this visit" items={nav} onPick={() => setMenuOpen(false)} pathname={pathname} />
            <MenuGroup title="Also on this site" items={more} onPick={() => setMenuOpen(false)} pathname={pathname} />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuGroup({
  title,
  items,
  onPick,
  pathname,
}: {
  title: string;
  items: readonly { to: string; label: string }[];
  onPick: () => void;
  pathname: string;
}) {
  return (
    <div>
      <p className="px-3 text-xs font-semibold tracking-[0.14em] text-muted uppercase">{title}</p>
      <ul className="mt-1">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={onPick}
              className={cn(
                "block rounded-sm px-3 py-3 text-base hover:bg-paper-2",
                pathname === item.to || pathname.startsWith(`${item.to}/`)
                  ? "bg-paper-2 font-semibold text-forest"
                  : "font-medium",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
