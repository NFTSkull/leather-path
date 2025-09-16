import { config } from 'dotenv';
import { upsertProduct } from "./utils/upsertProduct";

// Cargar variables de entorno
config();

async function main() {
  const price = 380000; // $3,800.00 MXN

  await upsertProduct({
    title: "Armonia",
    slug: "armonia",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Suela de cuero",
    variants: [
      { option2: "Tabaco",  sku: "LP-M-VQ-ARM-TBC", priceMXN: price },
      { option2: "Shedron", sku: "LP-M-VQ-ARM-SHD", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Adorada",
    slug: "adorada",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Tacón cuero/tapa antiderrapante · Estoperoles y bordado",
    variants: [
      { option2: "Negro", sku: "LP-M-VQ-ADR-NGR", priceMXN: price },
      { option2: "Tan",   sku: "LP-M-VQ-ADR-TAN", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Liberty",
    slug: "liberty",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Refuerzo en tubos · Suela de cuero troquelada",
    variants: [
      { option2: "Tabaco", sku: "LP-M-VQ-LIB-TBC", priceMXN: price },
      { option2: "Negro",  sku: "LP-M-VQ-LIB-NGR", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Orgullosa",
    slug: "orgullosa",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Acabados a mano",
    variants: [
      { option2: "Tan",     sku: "LP-M-VQ-ORG-TAN", priceMXN: price },
      { option2: "Shedron", sku: "LP-M-VQ-ORG-SHD", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Dolly",
    slug: "dolly",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Estoperoles",
    variants: [
      { option2: "Gris", sku: "LP-M-VQ-DOL-GRS", priceMXN: price },
      { option2: "Miel", sku: "LP-M-VQ-DOL-MIE", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Risueña",
    slug: "risuena", // sin acento en slug
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Floral bordado · Punta rodeo",
    variants: [
      { option2: "Café",  sku: "LP-M-VQ-RIS-CAF", priceMXN: price },
      { option2: "Nogal", sku: "LP-M-VQ-RIS-NOG", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Palmira",
    slug: "palmira",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Bordado",
    variants: [
      { option2: "Glam",      sku: "LP-M-VQ-PAL-GLA", priceMXN: price },
      { option2: "Chocolate", sku: "LP-M-VQ-PAL-CHC", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Santorini",
    slug: "santorini",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT · Tubo bordado a juego",
    variants: [
      { option2: "Miel",  sku: "LP-M-VQ-SAN-MIE", priceMXN: price },
      { option2: "Negro", sku: "LP-M-VQ-SAN-NGR", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Milenia",
    slug: "milenia",
    gender: "mujer",
    categorySlug: "botas",
    collectionSlug: "vaquera",
    description: "Vaquera · Piel res · WELT",
    variants: [
      { option2: "Miel", sku: "LP-M-VQ-MIL-MIE", priceMXN: price },
    ],
  });
}

main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});