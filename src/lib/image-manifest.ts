/**
 * Manifiesto de imágenes para sandalias mujer
 * 
 * Import estático: el bundler copia y devuelve URL hashed.
 * Si falta algún archivo, el build falla.
 */
import hawaiiPitonRojo from "/public/img/products/sandalias/hawaii-piton-rojo.png";
import hawaiiPitonNatural from "/public/img/products/sandalias/hawaii-piton-natural.png";
import baliAvestruzCafe from "/public/img/products/sandalias/bali-avestruz-cafe.png";
import baliAvestruzNegro from "/public/img/products/sandalias/bali-avestruz-negro.png";
import baliNegroPitonNatural from "/public/img/products/sandalias/bali-negro-piton-natural.png";
import miloCocodriloCafe from "/public/img/products/sandalias/milo-cocodrilo-cafe.png";
import boraBoraBlackCherry from "/public/img/products/sandalias/bora-bora-black-cherry.png";
import boraBoraPitonAzulMora from "/public/img/products/sandalias/bora-bora-piton-azul-mora.png";
import mallorcaPitonNatural from "/public/img/products/sandalias/mallorca-piton-natural.png";
import mallorcaPitonConac from "/public/img/products/sandalias/mallorca-piton-conac.png";
import placeholderImg from "/public/img/placeholder.png";

// Claves: `${slug}-${variantSlug}` en minúsculas y guiones
export const SANDALIAS_IMAGES: Record<string, string> = {
  "hawaii-piton-rojo": hawaiiPitonRojo.src,
  "hawaii-piton-natural": hawaiiPitonNatural.src,
  "bali-avestruz-cafe": baliAvestruzCafe.src,
  "bali-avestruz-negro": baliAvestruzNegro.src,
  "bali-negro-piton-natural": baliNegroPitonNatural.src,
  "milo-cocodrilo-cafe": miloCocodriloCafe.src,
  "bora-bora-black-cherry": boraBoraBlackCherry.src,
  "bora-bora-piton-azul-mora": boraBoraPitonAzulMora.src,
  "mallorca-piton-natural": mallorcaPitonNatural.src,
  "mallorca-piton-conac": mallorcaPitonConac.src,
};

/**
 * Obtiene la URL de imagen para una sandalia específica
 * @param slug - Slug del producto (ej: "hawaii")
 * @param variantSlug - Slug de la variante (ej: "piton-rojo")
 * @returns URL de la imagen o placeholder si no existe
 */
export function getSandaliaImage(slug: string, variantSlug: string): string {
  const key = `${slug}-${variantSlug}`.toLowerCase();
  return SANDALIAS_IMAGES[key] ?? placeholderImg.src;
}

/**
 * Verifica si existe una imagen para una sandalia específica
 * @param slug - Slug del producto
 * @param variantSlug - Slug de la variante
 * @returns true si existe la imagen, false si usa placeholder
 */
export function hasSandaliaImage(slug: string, variantSlug: string): boolean {
  const key = `${slug}-${variantSlug}`.toLowerCase();
  return key in SANDALIAS_IMAGES;
}
