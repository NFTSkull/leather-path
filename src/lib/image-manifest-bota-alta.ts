import placeholder from "/public/img/placeholder.png";

// IMPORTS estáticos para bota-alta (usando placeholder por ahora)
import libertyAltaNegro from "/public/img/products/bota-alta/liberty-alta-negro.png";
import libertyAltaTabaco from "/public/img/products/bota-alta/liberty-alta-tabaco.png";
import libertyAltaBlanca from "/public/img/products/bota-alta/liberty-alta-blanca.png";
import bandidaNegro from "/public/img/products/bota-alta/bandida-negro.png";
import gerberaMiel from "/public/img/products/bota-alta/gerbera-miel.png";

export const BOTA_ALTA_IMG: Record<string, string> = {
  "liberty-alta-negro": libertyAltaNegro.src,
  "liberty-alta-tabaco": libertyAltaTabaco.src,
  "liberty-alta-blanca": libertyAltaBlanca.src,
  "bandida-negro": bandidaNegro.src,
  "gerbera-miel": gerberaMiel.src,
};

export function getBotaAltaImage(slug: string, variantSlug: string) {
  const key = `${slug}-${variantSlug}`.toLowerCase();
  return BOTA_ALTA_IMG[key] ?? BOTA_ALTA_IMG[`${slug}`] ?? placeholder.src;
}
