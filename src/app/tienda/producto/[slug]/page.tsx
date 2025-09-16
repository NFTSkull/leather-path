import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPrisma } from '@/lib/prisma';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

// helper sencillo para imagen de sandalia desde /public
function sandaliaPath(slug: string, variantName?: string) {
  if (!variantName) return `/img/placeholder.png`;
  const v = variantName
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  return `/img/products/sandalias/${slug}-${v}.png`;
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prisma = getPrisma();
  
  try {
    let product = await prisma.product.findUnique({
      where: { slug: slug },
      select: { title: true, description: true }
    });
    
    if (!product) {
      product = await prisma.product.findFirst({
        where: {
          slug: { equals: slug, mode: "insensitive" },
          status: "published"
        },
        select: { title: true, description: true }
      });
    }
    
    if (!product) {
      return {
        title: 'Producto no encontrado | Leather Path',
        description: 'El producto que buscas no existe.',
      };
    }

    return {
      title: `${product.title} | Leather Path`,
      description: product.description || `${product.title} - Producto Leather Path`,
    };
  } catch (e) {
    console.error("Metadata fetch error", e);
    return {
      title: 'Producto | Leather Path',
      description: 'Producto Leather Path',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const prisma = getPrisma();
  
  let product = null;
  try {
    // 1) exacto
    product = await prisma.product.findUnique({
      where: { slug: slug },
      include: { variants: true },
    });
    // 2) tolerante
    if (!product) {
      product = await prisma.product.findFirst({
        where: { slug: { equals: slug, mode: "insensitive" }, status: "published" },
        include: { variants: true },
      });
    }
  } catch (e) {
    // si Prisma revienta por env/conexión, no tiremos el server
    console.error("PDP fetch error", e);
  }
  if (!product) return notFound();

  const variant = product.variants?.[0] ?? null;

  const imgSrc = sandaliaPath(product.slug, variant?.option2 || variant?.option1 || undefined);

  return (
    <div className="container mx-auto grid md:grid-cols-2 gap-8 py-10">
      <div>
        <Image 
          src={imgSrc} 
          alt={`${product.title}${variant ? " – " + (variant.option2 || variant.option1) : ""}`} 
          width={1200} 
          height={1200} 
        />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        {variant?.sku ? <p className="text-sm text-muted-foreground">SKU: {variant.sku}</p> : null}
        <p className="mt-4 text-lg">
          {product.description ?? "Producto LeatherPath"}
        </p>
        {/* aquí puedes renderizar variantes si existen */}
      </div>
    </div>
  );
}