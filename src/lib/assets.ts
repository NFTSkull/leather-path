/**
 * Helper para generar URLs de assets con base configurable
 * 
 * Uso:
 * - asset('/img/products/sandalias/hawaii-piton-rojo.png')
 * - Con NEXT_PUBLIC_ASSETS_BASE="/tienda" → "/tienda/img/products/sandalias/hawaii-piton-rojo.png"
 * - Con NEXT_PUBLIC_ASSETS_BASE="https://cdn.example.com" → "https://cdn.example.com/img/products/sandalias/hawaii-piton-rojo.png"
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_ASSETS_BASE || "";
  
  // Garantiza que path empiece con /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // Combina base + path y limpia dobles slashes
  const combined = `${base}${normalizedPath}`;
  
  // Reemplaza múltiples slashes por uno solo, pero preserva :// para URLs
  return combined.replace(/\/{2,}/g, "/").replace(":/", "://");
}

/**
 * Helper específico para imágenes de productos
 */
export function productImageAsset(slug: string, variantSlug: string): string {
  return asset(`/img/products/sandalias/${slug}-${variantSlug}.png`);
}

