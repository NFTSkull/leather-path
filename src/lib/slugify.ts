/**
 * Convierte texto a slug: minúsculas, espacios por guiones, sin acentos
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Quitar acentos
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Reemplazar espacios y caracteres especiales por guiones
    .replace(/[\s\-_]+/g, '-')
    // Quitar caracteres no alfanuméricos excepto guiones
    .replace(/[^a-z0-9\-]/g, '')
    // Quitar guiones múltiples
    .replace(/-+/g, '-')
    // Quitar guiones al inicio y final
    .replace(/^-+|-+$/g, '');
}

/**
 * Convierte nombre de variante a slug específico para imágenes
 */
export function toVariantSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
