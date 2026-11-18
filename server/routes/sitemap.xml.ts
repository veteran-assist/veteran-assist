import { publicHostFor, sitePaths } from "../utils/site-urls";

export default function sitemapXml(event: { req: { headers: Headers }; url: URL }) {
  const host = publicHostFor(
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host,
  );
  if (!host) {
    // No safe public hostname (for example a *.vercel.app preview): do not publish
    // a sitemap with made-up URLs.
    return new Response("Sitemap unavailable: set VITE_PUBLIC_HOSTNAME.\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  const urls = sitePaths()
    .map((p) => `  <url><loc>https://${host}${p === "/" ? "/" : p}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
