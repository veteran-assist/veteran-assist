/** Stable heading id. Matches the id written onto guide headings. */
export function headingSlug(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug || "section";
}
