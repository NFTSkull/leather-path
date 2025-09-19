import { prisma } from "../db-client";
import { assertPesos } from "../../src/lib/price";

type VariantInput = { 
  option2: string; // color/nombre variante
  sku: string; 
  priceMXN: number; 
  stock?: number; 
};

type ProductInput = {
  title: string;
  slug: string;
  gender: "mujer" | "hombre";
  categorySlug: string;
  collectionSlug?: string;
  description?: string | null;
  status?: "published" | "draft";
  variants: VariantInput[];
};

export async function upsertProduct(p: ProductInput) {
  // Buscar o crear categoría
  const category = await prisma.category.upsert({
    where: { slug: p.categorySlug },
    update: {},
    create: { slug: p.categorySlug, name: p.categorySlug }
  });

  // Buscar o crear colección si se especifica
  let collection = null;
  if (p.collectionSlug) {
    collection = await prisma.collection.upsert({
      where: { slug: p.collectionSlug },
      update: {},
      create: { slug: p.collectionSlug, name: p.collectionSlug }
    });
  }

  const base = await prisma.product.upsert({
    where: { slug: p.slug },
    update: {
      title: p.title,
      gender: p.gender,
      description: p.description ?? null,
      status: p.status ?? "published",
    },
    create: {
      title: p.title,
      slug: p.slug,
      gender: p.gender,
      description: p.description ?? null,
      status: p.status ?? "published",
      sku: `LP-${p.slug.toUpperCase()}`,
    },
  });

  // Conectar categoría
  await prisma.productCategory.upsert({
    where: { productId_categoryId: { productId: base.id, categoryId: category.id } },
    update: {},
    create: { productId: base.id, categoryId: category.id }
  });

  // Conectar colección si existe
  if (collection) {
    await prisma.productCollection.upsert({
      where: { productId_collectionId: { productId: base.id, collectionId: collection.id } },
      update: {},
      create: { productId: base.id, collectionId: collection.id }
    });
  }

  for (const v of p.variants) {
    // Validar precio antes de escribir
    const validatedPrice = assertPesos(v.priceMXN);
    
    await prisma.variant.upsert({
      where: { sku: v.sku },
      update: {
        option2: v.option2, // color/nombre variante
        priceMXN: validatedPrice,
        stock: v.stock ?? 30,
        productId: base.id,
      },
      create: {
        option2: v.option2, // color/nombre variante
        sku: v.sku,
        priceMXN: validatedPrice,
        stock: v.stock ?? 30,
        productId: base.id,
      },
    });
  }
  return base;
}