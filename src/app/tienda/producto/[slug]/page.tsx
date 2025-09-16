import { Metadata } from 'next';
import { ProductPageClient } from '@/components/product/ProductPageClient';
import { getProductBySlug } from '@/lib/products-mock';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Producto no encontrado | Leather Path',
      description: 'El producto que buscas no existe.',
    };
  }

  return {
    title: `${product.title} | Leather Path`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  return <ProductPageClient slug={slug} />;
}