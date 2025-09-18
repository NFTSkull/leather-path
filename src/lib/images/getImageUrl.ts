import { slugify } from '@/lib/slugify';

/**
 * Genera el slug de imagen para un producto y variante
 */
export function getProductImageSlug(productTitle: string, variantName?: string): string {
  const base = slugify(productTitle);
  const variant = variantName ? slugify(variantName) : '';
  return variant ? `${base}-${variant}` : base;
}

/**
 * Genera la ruta local de imagen para un producto y variante
 */
export function getLocalImagePath(
  productTitle: string, 
  variantName?: string, 
  ext: string = 'png'
): string {
  const slug = getProductImageSlug(productTitle, variantName);
  return `/products/sandalias/${slug}.${ext}`;
}

/**
 * Genera el alt text para una imagen de producto
 */
export function getProductImageAlt(productTitle: string, variantName?: string): string {
  const variant = variantName ? ` – ${variantName}` : '';
  return `${productTitle}${variant}`.trim();
}

