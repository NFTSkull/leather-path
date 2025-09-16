import { Metadata } from 'next';
import { ProductPageClient } from '@/components/product/ProductPageClient';
import { getProductBySlug } from '@/lib/products-mock';
import { getPrisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prisma = getPrisma();
  
  // 1) intento exacto por slug
  let product = await prisma.product.findUnique({
    where: { slug: slug },
    select: { title: true, description: true }
  });
  
  // 2) fallback por slug normalizado (por si hay mayúsculas/acentos)
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
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const prisma = getPrisma();
  
  // 1) intento exacto por slug
  let product = await prisma.product.findUnique({
    where: { slug: slug },
    include: { variants: true },
  });
  
  // 2) fallback por slug normalizado (por si hay mayúsculas/acentos)
  if (!product) {
    product = await prisma.product.findFirst({
      where: {
        slug: { equals: slug, mode: "insensitive" },
        status: "published"
      },
      include: { variants: true },
    });
  }
  
  if (!product) return notFound();
  
  return <ProductPageClient slug={slug} productData={product} />;
}