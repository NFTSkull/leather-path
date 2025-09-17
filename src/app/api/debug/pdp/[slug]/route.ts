import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const url = new URL(req.url);
  const rawWanted = url.searchParams.get("raw");
  const allowRaw = process.env.DEBUG_PDP === "1";
  const { slug } = await params;

  try {
    const raw = await prisma.product.findFirst({
      where: { slug: { equals: slug, mode: "insensitive" }, status: "published" },
      include: {
        variants: true,
        images: true,
        categories: { include: { category: true } },
        collections: { include: { collection: true } },
      },
    });
    if (!raw) return NextResponse.json({ ok: false, reason: "not-found" }, { status: 404 });

    // Shape básico para diagnóstico
    const shaped = {
      slug: raw.slug,
      title: raw.title,
      status: raw.status,
      categories: raw.categories?.map(c => c.category?.slug),
      collections: raw.collections?.map(c => c.collection?.slug),
      variants: raw.variants?.map(v => ({ 
        id: v.id, 
        sku: v.sku, 
        option2: v.option2, 
        priceMXN: v.priceMXN,
        stock: v.stock 
      })),
      images: raw.images?.map(i => ({ id: i.id, url: i.url })),
    };

    return NextResponse.json({ 
      ok: true, 
      shaped, 
      raw: allowRaw && rawWanted ? raw : undefined 
    });
  } catch (e: any) {
    console.error("PDP_DEBUG_API_ERROR", { message: e?.message, stack: e?.stack });
    return new NextResponse("DB error", { status: 500 });
  }
}
