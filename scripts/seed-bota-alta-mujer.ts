// scripts/seed-bota-alta-mujer.ts
import "dotenv/config";
import { prisma } from "./db-client";
import { upsertProduct } from "./utils/upsertProduct";

const DESC = "Bota alta para dama. Diseño elegante, materiales premium y estilo duradero.";

const PRODUCTS = [
  {
    slug: "liberty-alta",
    title: "Liberty Alta",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "negro",  sku: "LP-BA-LIB-NEG-STD", priceMXN: 4000, stock: 30 },
      { option2: "tabaco", sku: "LP-BA-LIB-TAB-STD", priceMXN: 4000, stock: 30 },
      { option2: "blanca", sku: "LP-BA-LIB-BLA-STD", priceMXN: 4000, stock: 30 },
    ],
  },
  {
    slug: "bandida",
    title: "Bandida",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "negro", sku: "LP-BA-BAN-NEG-STD", priceMXN: 4000, stock: 30 },
    ],
  },
  {
    slug: "gerbera",
    title: "Gerbera",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "miel", sku: "LP-BA-GER-MIE-STD", priceMXN: 3800, stock: 30 },
    ],
  },
  {
    slug: "maddame",
    title: "Maddame",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "beige", sku: "LP-BA-MAD-BEI-STD", priceMXN: 3900, stock: 30 },
      { option2: "negro", sku: "LP-BA-MAD-NEG-STD", priceMXN: 3900, stock: 30 },
    ],
  },
  {
    slug: "vittoria",
    title: "Vittoria",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "capuchino", sku: "LP-BA-VIT-CAP-STD", priceMXN: 3800, stock: 30 },
      { option2: "tabaco",    sku: "LP-BA-VIT-TAB-STD", priceMXN: 3800, stock: 30 },
    ],
  },
  {
    slug: "maya",
    title: "Maya",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "negro", sku: "LP-BA-MAY-NEG-STD", priceMXN: 3800, stock: 30 },
      { option2: "café",  sku: "LP-BA-MAY-CAF-STD", priceMXN: 3800, stock: 30 },
    ],
  },
  {
    slug: "cheyenne",
    title: "Cheyenne",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "beige", sku: "LP-BA-CHE-BEI-STD", priceMXN: 3950, stock: 30 },
      { option2: "café",  sku: "LP-BA-CHE-CAF-STD", priceMXN: 3950, stock: 30 },
    ],
  },
  {
    slug: "barbie",
    title: "Barbie",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "glam",   sku: "LP-BA-BAR-GLA-STD", priceMXN: 3900, stock: 30 },
      { option2: "shedron", sku: "LP-BA-BAR-SHE-STD", priceMXN: 3900, stock: 30 },
    ],
  },
  {
    slug: "forjida",
    title: "Forjida",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "miel",  sku: "LP-BA-FOR-MIE-STD", priceMXN: 4250, stock: 30 },
      { option2: "negro", sku: "LP-BA-FOR-NEG-STD", priceMXN: 4250, stock: 30 },
    ],
  },
  {
    slug: "gloria",
    title: "Gloria",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "negro",  sku: "LP-BA-GLO-NEG-STD", priceMXN: 3650, stock: 30 },
      { option2: "tabaco", sku: "LP-BA-GLO-TAB-STD", priceMXN: 3650, stock: 30 },
    ],
  },
  {
    slug: "catania",
    title: "Catania",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "tan",   sku: "LP-BA-CAT-TAN-STD", priceMXN: 3700, stock: 30 },
      { option2: "negro", sku: "LP-BA-CAT-NEG-STD", priceMXN: 3700, stock: 30 },
    ],
  },
  {
    slug: "marbella",
    title: "Marbella",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "vino",   sku: "LP-BA-MAR-VIN-STD", priceMXN: 4800, stock: 30 },
      { option2: "dorada", sku: "LP-BA-MAR-DOR-STD", priceMXN: 4800, stock: 30 },
    ],
  },
  {
    slug: "alaska",
    title: "Alaska",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "negro", sku: "LP-BA-ALA-NEG-STD", priceMXN: 5400, stock: 30 },
      { option2: "rojo",  sku: "LP-BA-ALA-ROJ-STD", priceMXN: 5400, stock: 30 },
    ],
  },
  {
    slug: "nevada",
    title: "Nevada",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "negro",  sku: "LP-BA-NEV-NEG-STD", priceMXN: 4100, stock: 30 },
      { option2: "miel",   sku: "LP-BA-NEV-MIE-STD", priceMXN: 4100, stock: 30 },
      { option2: "blanca", sku: "LP-BA-NEV-BLA-STD", priceMXN: 4100, stock: 30 },
    ],
  },
  {
    slug: "moana",
    title: "Moana",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "tabaco", sku: "LP-BA-MOA-TAB-STD", priceMXN: 4550, stock: 30 },
      { option2: "negro",  sku: "LP-BA-MOA-NEG-STD", priceMXN: 4550, stock: 30 },
    ],
  },
  {
    slug: "holly",
    title: "Holly",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "miel", sku: "LP-BA-HOL-MIE-STD", priceMXN: 5200, stock: 30 },
    ],
  },
  {
    slug: "samantha",
    title: "Samantha",
    description: DESC,
    gender: "mujer" as const,
    categorySlug: "bota-alta",
    collectionSlug: "ladies",
    status: "published" as const,
    variants: [
      { option2: "teak", sku: "LP-BA-SAM-TEA-STD", priceMXN: 4100, stock: 30 },
    ],
  },
];

async function run() {
  console.log("🌱 Iniciando seed de bota-alta mujer...");
  
  for (const product of PRODUCTS) {
    console.log(`📦 Procesando: ${product.title}`);
    await upsertProduct(product);
  }
  
  console.log("✅ Seed bota-alta mujer completado.");
  console.log(`📊 Total productos: ${PRODUCTS.length}`);
  console.log(`📊 Total variantes: ${PRODUCTS.reduce((acc, p) => acc + p.variants.length, 0)}`);
}

run()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Seed falló", e);
    process.exit(1);
  });
