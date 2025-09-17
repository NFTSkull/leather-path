export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { VariantSelector } from "@/components/product/VariantSelector";
import { formatCurrencyMXN } from "@/lib/currency";
import { headers } from "next/headers";
import { shapeProductForPdp } from "@/lib/shapeProduct";
import { ProductPageClient } from "@/components/product/ProductPageClient";

function variantSlug(name: string) {
  return (name ?? "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isSandalia(product: any) {
  return product?.categories?.some((c: any) => c?.category?.slug === "sandalias") ?? false;
}

function getProductImageSrc(product: any, option2?: string | null) {
  if (isSandalia(product) && option2) {
    return `/img/products/sandalias/${product.slug}-${variantSlug(option2)}.png`;
  }
  return product?.images?.[0]?.url ?? "/img/placeholder.png";
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const product = await prisma.product.findFirst({
      where: { slug: { equals: slug, mode: "insensitive" }, status: "published" },
      include: {
        variants: true,
        images: true,
        categories: { include: { category: true } },     // 👈 many-to-many
        collections: { include: { collection: true } },  // 👈 por consistencia
      },
    });
    if (!product) {
      console.error("PDP_NOT_FOUND", { slug });
      return notFound();
    }

    const productSafe = shapeProductForPdp(product);

    // --- MODO VISTA SERVIDOR: NO MONTAR CLIENT COMPONENT ---
    const h = await headers();
    const url = h.get("x-invoke-path") || ""; // fallback
    const qs = h.get("x-next-url") || "";     // en Next, no siempre está; por eso también:
    const sv =
      (typeof qs === "string" && qs.includes("__sv=1")) ||
      (typeof url === "string" && url.includes("__sv=1"));

    if (sv) {
      // Render mínimo 100% Server Component (sin ProductPageClient)
      return (
        <main className="p-6">
          <h1 className="text-2xl font-bold">{productSafe.title}</h1>
          <p className="mt-2 text-sm opacity-80">Slug: {productSafe.slug}</p>
          <pre className="mt-4 text-xs whitespace-pre-wrap">
            {JSON.stringify(
              {
                variants: productSafe.variants?.map((v:any)=>({sku:v.sku, option2:v.option2, priceMXN:v.priceMXN})),
                cats: productSafe.categories?.map((c:any)=>c?.slug ?? c),
                cols: productSafe.collections?.map((c:any)=>c?.slug ?? c),
                images0: productSafe.images?.[0] ?? null,
              },
              null,
              2
            )}
          </pre>
        </main>
      );
    }

    // --- MODO NORMAL: montamos el client component ---
    console.error("PDP_PASSING_TO_CLIENT", {
      slug: productSafe.slug,
      keys: Object.keys(productSafe || {}),
      variantsShape: productSafe.variants?.map((v:any)=>({sku:v.sku, option2:v.option2, priceMXN: typeof v.priceMXN })),
    });

    return <ProductPageClient key={productSafe.id ?? productSafe.slug} product={productSafe} />;
  } catch (e: any) {
    console.error("PDP_SSR_ERROR", { slug, err: String(e), stack: (e as any)?.stack });
    throw e; // deja que el error boundary capture y muestre digest/stack
  }
}