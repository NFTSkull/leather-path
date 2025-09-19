// src/lib/slugifyVariant.ts
const MAP: Record<string,string> = {
  "á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","ñ":"n",
};

export function variantSlug(name?: string) {
  const s = (name ?? "").toLowerCase().trim();
  const normalized = s
    .split("")
    .map(ch => MAP[ch] ?? ch)
    .join("")
    .replace(/\s+/g,"-")
    .replace(/[^a-z0-9\-]/g,""); // kebab seguro
  return normalized;
}
