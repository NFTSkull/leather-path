import { toVariantSlug } from "./slugify";

export function getCategorySlugs(product: any): string[] {
  return (product?.categories ?? [])
    .map((pc: any) => pc?.category?.slug)
    .filter(Boolean);
}

export function isCategory(product: any, slug: string) {
  return getCategorySlugs(product).includes(slug);
}

/**
 * Devuelve la ruta de imagen esperada por categoría/variante.
 * - sandalias -> /img/products/sandalias/<slug>-<variant>.png
 * - bota-alta -> /img/products/bota-alta/<slug>-<variant>.png
 * - fallback  -> product.images[0]?.url ?? "/img/placeholder.png"
 */
export function resolveProductImageSrc(product: any, variantOption2?: string) {
  const vslug = toVariantSlug(variantOption2 || "");
  const slug  = product?.slug;

  if (isCategory(product, "sandalias")) {
    return `/img/products/sandalias/${slug}-${vslug}.png`;
  }
  if (isCategory(product, "bota-alta")) {
    return `/img/products/bota-alta/${slug}-${vslug}.png`;
  }

  return product?.images?.[0]?.url ?? "/img/placeholder.png";
}
