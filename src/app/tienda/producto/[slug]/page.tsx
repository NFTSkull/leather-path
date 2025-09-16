export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

function variantSlug(name?: string) {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function sandaliaImgPath(slug: string, variantName?: string) {
  const v = variantSlug(variantName);
  if (!v) return "/img/placeholder.png";
  return `/img/products/sandalias/${slug}-${v}.png`;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product = null as any;
  try {
    // exact
    product = await prisma.product.findUnique({
      where: { slug: slug },
      include: { variants: true, images: true },
    });
    // tolerant
    if (!product) {
      product = await prisma.product.findFirst({
        where: { slug: { equals: slug, mode: "insensitive" }, status: "published" },
        include: { variants: true, images: true },
      });
    }
  } catch (e) {
    console.error("PDP fetch error", e);
  }
  if (!product) return notFound();

  const variant = product?.variants?.[0] ?? null;
  const imgSrc =
    product.category === "sandalias"
      ? sandaliaImgPath(product.slug, variant?.name)
      : product.images?.[0]?.url || "/img/placeholder.png";

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8 py-10">
      <div>
        <Image src={imgSrc} alt={`${product.title}${variant ? " – " + variant.name : ""}`} width={1200} height={1200} />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        {variant?.sku ? <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p> : null}
        <p className="mt-4 text-lg">{product.description ?? product.details ?? "Producto LeatherPath"}</p>
        {/* TODO: VariantSelector (client) en otro PR; aquí no rompemos nada */}
      </div>
    </div>
  );
}