/**
 * Manifiesto de imágenes para línea vaquera mujer
 * 
 * Import estático: el bundler copia y devuelve URL hashed.
 * Si falta algún archivo, el build falla.
 */
import placeholder from "/public/img/products/mujer/vaquera/placeholder.png";

// IMPORTA AQUÍ CADA PNG (uno por línea):
import armoniaTabaco from "/public/img/products/mujer/vaquera/armonia-tabaco.png";
import armoniaShedron from "/public/img/products/mujer/vaquera/armonia-shedron.png";
import adoradaNegro from "/public/img/products/mujer/vaquera/adorada-negro.png";
import adoradaTan from "/public/img/products/mujer/vaquera/adorada-tan.png";
import libertyTabaco from "/public/img/products/mujer/vaquera/liberty-tabaco.png";
import libertyNegro from "/public/img/products/mujer/vaquera/liberty-negro.png";
import orgullosaTan from "/public/img/products/mujer/vaquera/orgullosa-tan.png";
import orgullosaShedron from "/public/img/products/mujer/vaquera/orgullosa-shedron.png";
import dollyGris from "/public/img/products/mujer/vaquera/dolly-gris.png";
import dollyMiel from "/public/img/products/mujer/vaquera/dolly-miel.png";
import risuenaCafe from "/public/img/products/mujer/vaquera/risuena-cafe.png";
import risuenaNogal from "/public/img/products/mujer/vaquera/risuena-nogal.png";
import palmiraGlam from "/public/img/products/mujer/vaquera/palmira-glam.png";
import palmiraChocolate from "/public/img/products/mujer/vaquera/palmira-chocolate.png";
import santoriniMiel from "/public/img/products/mujer/vaquera/santorini-miel.png";
import santoriniNegro from "/public/img/products/mujer/vaquera/santorini-negro.png";
import mileniaMiel from "/public/img/products/mujer/vaquera/milenia-miel.png";

// Mapa `${slug}-${variantSlug}` -> url
export const VQ_MUJER_IMAGES: Record<string, string> = {
  "armonia-tabaco": armoniaTabaco.src,
  "armonia-shedron": armoniaShedron.src,
  "adorada-negro": adoradaNegro.src,
  "adorada-tan": adoradaTan.src,
  "liberty-tabaco": libertyTabaco.src,
  "liberty-negro": libertyNegro.src,
  "orgullosa-tan": orgullosaTan.src,
  "orgullosa-shedron": orgullosaShedron.src,
  "dolly-gris": dollyGris.src,
  "dolly-miel": dollyMiel.src,
  "risuena-cafe": risuenaCafe.src,
  "risuena-nogal": risuenaNogal.src,
  "palmira-glam": palmiraGlam.src,
  "palmira-chocolate": palmiraChocolate.src,
  "santorini-miel": santoriniMiel.src,
  "santorini-negro": santoriniNegro.src,
  "milenia-miel": mileniaMiel.src
};

/**
 * Obtiene la URL de imagen para una bota vaquera específica
 * @param slug - Slug del producto (ej: "armonia")
 * @param variant - Slug de la variante (ej: "tabaco")
 * @returns URL de la imagen o placeholder si no existe
 */
export function getVaqMujerImage(slug: string, variant: string): string {
  const key = `${slug}-${variant}`.toLowerCase();
  return VQ_MUJER_IMAGES[key] ?? placeholder.src;
}

/**
 * Verifica si existe una imagen para una bota vaquera específica
 * @param slug - Slug del producto
 * @param variant - Slug de la variante
 * @returns true si existe la imagen, false si usa placeholder
 */
export function hasVaqMujerImage(slug: string, variant: string): boolean {
  const key = `${slug}-${variant}`.toLowerCase();
  return key in VQ_MUJER_IMAGES;
}

