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
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos/ñ -> n
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProductImageSrc(product: any, selectedOption2?: string | null) {
  const isSandalia = product.categories?.some((c: any) => c.category?.slug === "sandalias");
  if (isSandalia && selectedOption2) {
    return `/img/products/sandalias/${product.slug}-${variantSlug(selectedOption2)}.png`;
  }
  // Para no-sandalias usar imagen de DB si existe, si no placeholder
  return product.images?.[0]?.url ?? "/img/placeholder.png";
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product = null as any;
  try {
    // exact
    product = await prisma.product.findUnique({
      where: { slug: slug },
      include: { 
        variants: true, 
        images: true, 
        categories: { include: { category: true } }, 
        collections: { include: { collection: true } }
      },
    });
    // tolerant
    if (!product) {
      product = await prisma.product.findFirst({
        where: { slug: { equals: slug, mode: "insensitive" }, status: "published" },
        include: { 
          variants: true, 
          images: true, 
          categories: { include: { category: true } }, 
          collections: { include: { collection: true } }
        },
      });
    }
  } catch (e) {
    console.error("PDP fetch error", e);
  }
  if (!product) return notFound();

  const firstVariant = product?.variants?.[0] ?? null;
  const imgSrc = getProductImageSrc(product, firstVariant?.option2);

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8 py-10">
      <div>
        <Image 
          src={imgSrc} 
          alt={`${product.title} ${firstVariant?.option2 ?? ""}`.trim()} 
          width={1200} 
          height={1200} 
          className="rounded-lg"
        />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-leather-black">{product.title}</h1>
          {firstVariant?.sku && (
            <p className="text-sm text-espresso mt-2">SKU: {firstVariant.sku}</p>
          )}
          <p className="text-2xl font-bold text-leather-black mt-4">
            {formatCurrencyMXN(firstVariant?.priceMXN || 0)}
          </p>
        </div>
        
        <div>
          <p className="text-lg text-espresso">{product.description ?? "Producto LeatherPath"}</p>
        </div>
        
        <VariantSelector 
          key={product.id}
          productId={product.id}
          variants={product.variants}
          selectedVariant={firstVariant}
          onVariantChange={(variant) => {
            // Actualizar imagen y precio dinámicamente
            const newImgSrc = getProductImageSrc(product, variant.option2);
            // TODO: Implementar actualización de estado
          }}
        />
        
        <div className="flex gap-4">
          <button 
            className="bg-leather-black text-white px-8 py-3 rounded-lg font-medium hover:bg-espresso transition-colors"
            onClick={() => {
              // TODO: Implementar compra directa
              fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  productId: product.id,
                  variantSku: firstVariant?.sku,
                  quantity: 1
                })
              }).then(res => res.json()).then(data => {
                if (data.url) window.location.href = data.url;
              });
            }}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}