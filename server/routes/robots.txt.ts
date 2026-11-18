import { publicHostFor } from "../utils/site-urls";

export default function robotsTxt(event: { req: { headers: Headers }; url: URL }) {
  const host = publicHostFor(
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host,
  );
  const lines = ["User-agent: *", "Allow: /", "Disallow: /feedback/inbox"];
  if (host) lines.push("", `Sitemap: https://${host}/sitemap.xml`);
  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
