import placeholder from "/public/img/placeholder.png";

// IMPORTS estáticos (deben existir en el repo):
import hawaiiPitonRojo from "/public/img/products/sandalias/hawaii-piton-rojo.png";
import hawaiiPitonNatural from "/public/img/products/sandalias/hawaii-piton-natural.png";
import baliAvestruzCafe from "/public/img/products/sandalias/bali-avestruz-cafe.png";
import baliAvestruzNegro from "/public/img/products/sandalias/bali-avestruz-negro.png";
import baliNegroPitonNatural from "/public/img/products/sandalias/bali-negro-piton-natural.png";
import miloCocodriloCafe from "/public/img/products/sandalias/milo-cocodrilo-cafe.png";
import boraBoraBlackCherry from "/public/img/products/sandalias/bora-bora-black-cherry.png";
import boraBoraPitonAzulMora from "/public/img/products/sandalias/bora-bora-piton-azul-mora.png";
import mallorcaPitonNatural from "/public/img/products/sandalias/mallorca-piton-natural.png";
import mallorcaPitonConac from "/public/img/products/sandalias/mallorca-piton-natural.png"; // Usando la misma imagen hasta tener la específica

export const SANDALIAS_IMG: Record<string, string> = {
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

export function getSandaliaImage(slug: string, variantSlug: string) {
  const key = `${slug}-${variantSlug}`.toLowerCase();
  return SANDALIAS_IMG[key] ?? placeholder.src;
}
