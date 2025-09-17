export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { VariantSelector } from "@/components/product/VariantSelector";
import { formatCurrencyMXN } from "@/lib/currency";

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
  
  const product = await prisma.product.findFirst({
    where: { slug: { equals: slug, mode: "insensitive" }, status: "published" },
    include: {
      variants: true,
      images: true,
      categories: { include: { category: true } },     // 👈 many-to-many
      collections: { include: { collection: true } },  // 👈 por consistencia
    },
  });
  if (!product) notFound();

  const variants = product.variants ?? [];
  const initialVariant = variants[0] ?? null;
  const selectedName = initialVariant?.option2 ?? "";
  const imgSrc = getProductImageSrc(product, selectedName);

  // Diagnóstico: loggear datos si DEBUG_PDP=1
  if (process.env.DEBUG_PDP === "1") {
    console.error("PDP_TRACE", {
      slug: product.slug,
      title: product.title,
      status: product.status,
      cats: product.categories?.map((c: any) => c?.category?.slug ?? c),
      colls: product.collections?.map((c: any) => c?.collection?.slug ?? c),
      variants: product.variants?.map((v: any) => ({ 
        sku: v.sku, 
        option2: v.option2, 
        priceMXN: v.priceMXN,
        stock: v.stock 
      })),
      images0: product.images?.[0],
      imgSrc: imgSrc,
      selectedName: selectedName,
    });
  }

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8 py-10">
      <div>
        <Image 
          src={imgSrc} 
          alt={`${product.title} ${selectedName}`.trim()} 
          width={1200} 
          height={1200} 
          className="rounded-lg"
        />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-leather-black">{product.title}</h1>
          {initialVariant?.sku && (
            <p className="text-sm text-espresso mt-2">SKU: {initialVariant.sku}</p>
          )}
          <p className="text-2xl font-bold text-leather-black mt-4">
            {formatCurrencyMXN(initialVariant?.priceMXN || 0)}
          </p>
        </div>
        
        <div>
          <p className="text-lg text-espresso">{product.description ?? "Producto LeatherPath"}</p>
        </div>
        
        <VariantSelector 
          key={product.id}
          productId={product.id}
          variants={variants}
          selectedVariant={initialVariant}
          onVariantChange={(variant) => {
            // Actualizar imagen y precio dinámicamente
            const newImgSrc = getProductImageSrc(product, variant.option2);
            // TODO: Implementar actualización de estado
          }}
        />
        
        <div className="flex gap-4">
          <button 
            className="bg-leather-black text-white px-8 py-3 rounded-lg font-medium hover:bg-espresso transition-colors"
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}