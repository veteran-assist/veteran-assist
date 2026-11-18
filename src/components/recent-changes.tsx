import { Link } from "@tanstack/react-router";
import { HOME_RECENT_LIMIT, recentChanges, type RecentChange } from "@/content/recent-changes";

export function ChangeList({ items }: { items: RecentChange[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.text} className="flex gap-3 text-sm leading-6">
          <span className="w-24 shrink-0 text-muted tabular-nums">{item.date.replace(" 2026", "")}</span>
          <span>
            {item.href ? (
              <a href={item.href} className="font-semibold text-forest underline underline-offset-2">
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function RecentChanges() {
  const shown = recentChanges.slice(0, HOME_RECENT_LIMIT);
  const more = recentChanges.length > shown.length;
  return (
    <section className="border-b border-rule bg-paper-2" aria-labelledby="recent-changes">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h2
          id="recent-changes"
          className="font-display text-center text-2xl font-semibold tracking-tight"
        >
          Recent changes
        </h2>
        <ChangeList items={shown} />
        {more ? (
          <p className="mt-4 text-center">
            <Link
              to="/changes"
              className="inline-flex min-h-11 items-center font-semibold text-forest underline underline-offset-2"
            >
              Older changes
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
