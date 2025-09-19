import { variantSlug } from "./slugifyVariant";

// Función para detectar categorías - compatible con ProductView.categories (array de strings)
function isCat(prod: any, slug: string) {
  const categories = prod?.categories ?? [];
  return categories.includes(slug);
}

export function resolveProductImagePrimary(product: any, variantName?: string) {
  const slug = product?.slug;
  const vslug = variantSlug(variantName);

  // Sandalias siguen como están
  if (isCat(product, "sandalias")) {
    return `/img/products/sandalias/${slug}-${vslug}.png`;
  }

  // Bota Alta: intentamos por variante
  if (isCat(product, "bota-alta")) {
    return `/img/products/bota-alta/${slug}-${vslug}.png`;
  }

  // Vaquera (botas) - mantener compatibilidad
  if (isCat(product, "botas")) {
    return vslug ? `/img/products/vaquera/${slug}-${vslug}.png` 
                 : `/img/products/vaquera/${slug}.png`;
  }

  // Otros: usa primera imagen DB o placeholder genérico
  return product?.imageSrc ?? product?.images?.[0]?.url ?? "/img/placeholder.png";
}

export function fallbackByModel(product: any) {
  if (isCat(product, "bota-alta")) {
    return `/img/products/bota-alta/${product?.slug}.png`;
  }
  if (isCat(product, "botas")) {
    return `/img/products/vaquera/${product?.slug}.png`;
  }
  return `/img/placeholder-bota.png`;
}

export const placeholderBota = "/img/placeholder-bota.png";
