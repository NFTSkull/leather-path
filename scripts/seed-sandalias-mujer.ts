import { config } from 'dotenv';
import { upsertProduct } from "./utils/upsertProduct";

// Cargar variables de entorno
config();

async function main() {
  const price = 265000; // $2,650.00 MXN (centavos)

  await upsertProduct({
    title: "Hawaii",
    slug: "hawaii",
    gender: "mujer",
    categorySlug: "sandalias",
    collectionSlug: "ladies",
    description: "Sandalia piel res–pitón (pegado)",
    variants: [
      { option2: "Pitón rojo",    sku: "LP-S-HWI-PITON-ROJO",  priceMXN: price },
      { option2: "Pitón natural", sku: "LP-S-HWI-PITON-NAT",   priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Bali",
    slug: "bali",
    gender: "mujer",
    categorySlug: "sandalias",
    collectionSlug: "ladies",
    description: "Sandalia piel res–pitón (pegado)",
    variants: [
      { option2: "Avestruz café",        sku: "LP-S-BAL-AVES-CAF",   priceMXN: price },
      { option2: "Avestruz negro",       sku: "LP-S-BAL-AVES-NGR",   priceMXN: price },
      { option2: "Negro y pitón natural",sku: "LP-S-BAL-PITON-MIX",  priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Milo",
    slug: "milo",
    gender: "mujer",
    categorySlug: "sandalias",
    collectionSlug: "ladies",
    description: "Sandalia piel res–pitón (pegado)",
    variants: [
      { option2: "Cocodrilo café", sku: "LP-S-MIL-COCO-CAF", priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Bora Bora",
    slug: "bora-bora",
    gender: "mujer",
    categorySlug: "sandalias",
    collectionSlug: "ladies",
    description: "Sandalia piel res–pitón (pegado)",
    variants: [
      { option2: "Black Cherry",     sku: "LP-S-BRB-BLACK-CH",      priceMXN: price },
      { option2: "Pitón azul mora",  sku: "LP-S-BRB-PITON-AZM",     priceMXN: price },
    ],
  });

  await upsertProduct({
    title: "Mallorca",
    slug: "mallorca",
    gender: "mujer",
    categorySlug: "sandalias",
    collectionSlug: "ladies",
    description: "Sandalia piel res–pitón (pegado)",
    variants: [
      { option2: "Pitón natural", sku: "LP-S-MLL-PITON-NAT",  priceMXN: price },
      { option2: "Pitón coñac",   sku: "LP-S-MLL-PITON-CON",  priceMXN: price }, // ojo: ñ en nombre, slug da piton-conac
    ],
  });
}

main().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});