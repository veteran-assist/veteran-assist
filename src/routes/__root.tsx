import { createRootRoute, HeadContent, Outlet, Scripts, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import appCss from "../styles.css?url";

import { APP_NAME } from "@/lib/brand";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Independent field guide for Australian veterans navigating DVA — claims, delays, impairment, hardship, Acute Support Package, and appeals.",
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "theme-color", content: "#0b3d6e" },
      { name: "format-detection", content: "telephone=yes" },
      { name: "referrer", content: "no-referrer" },
      { name: "robots", content: "noarchive" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: APP_NAME },
      {
        property: "og:description",
        content: "Independent DVA field guide for Australian veterans.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: RootDocument,
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">That path is not in the field guide.</p>
      <Link to="/" className="mt-4 inline-block font-semibold text-forest underline underline-offset-2">
        Back to Veteran Assist
      </Link>
    </main>
  ),
});

function RootDocument() {
  return (
    <html lang="en-AU" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <AppShell>
          <Outlet />
        </AppShell>
        <Toaster richColors position="top-center" />
        <Scripts />
        {/* Vercel Web Analytics: anonymous page-view counts, no cookies. The loader
            inserts a same-origin script (/_vercel/insights/script.js). script-src
            'self' allows it. It is not an inline script, so it needs no nonce.
            Production only; the privacy page describes it. Enable it in the Vercel
            project's Analytics tab. The beforeSend hook drops query strings before
            sending: /deadlines can carry a decision-letter date and /postcode a
            postcode, and only the page itself should be counted. */}
        <Analytics
          beforeSend={(event) => {
            try {
              const url = new URL(event.url);
              url.search = "";
              url.hash = "";
              return { ...event, url: url.toString() };
            } catch {
              return null;
            }
          }}
        />
      </body>
    </html>
  );
}
