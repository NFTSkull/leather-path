/**
 * Helpers para manejo de imágenes de productos
 */
import { asset } from './assets';

/**
 * Convierte nombre de variante a slug
 * - pasa a minúsculas
 * - reemplaza espacios por guiones
 * - normaliza acentos (coñac -> conac)
 */
export function toVariantSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    // Normalizar acentos
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Reemplazar espacios por guiones
    .replace(/\s+/g, '-')
    // Quitar caracteres especiales excepto guiones
    .replace(/[^a-z0-9\-]/g, '')
    // Quitar guiones múltiples
    .replace(/-+/g, '-')
    // Quitar guiones al inicio y final
    .replace(/^-+|-+$/g, '');
}

/**
 * Genera la ruta de imagen para un producto y variante
 */
export function productImagePath(slug: string, variantSlug: string): string {
  return asset(`/img/products/sandalias/${slug}-${variantSlug}.png`);
}

/**
 * Mapeo específico de variantes a slugs (para casos especiales)
 */
const VARIANT_MAPPING: Record<string, string> = {
  'Pitón rojo': 'piton-rojo',
  'Pitón natural': 'piton-natural',
  'Avestruz café': 'avestruz-cafe',
  'Avestruz negro': 'avestruz-negro',
  'Negro y pitón natural': 'negro-piton-natural',
  'Cocodrilo café': 'cocodrilo-cafe',
  'Black Cherry': 'black-cherry',
  'Pitón azul mora': 'piton-azul-mora',
  'Pitón coñac': 'piton-conac',
};

/**
 * Obtiene el slug de variante usando mapeo específico o función genérica
 */
export function getVariantSlug(variantName: string): string {
  // Usar mapeo específico si existe
  if (VARIANT_MAPPING[variantName]) {
    return VARIANT_MAPPING[variantName];
  }
  
  // Usar función genérica
  return toVariantSlug(variantName);
}

/**
 * Genera la ruta completa de imagen para un producto
 */
export function getProductImageSrc(productSlug: string, variantName: string): string {
  const variantSlug = getVariantSlug(variantName);
  return productImagePath(productSlug, variantSlug);
}
