import { Metadata } from 'next';
import { ProductPageClient } from '@/components/product/ProductPageClient';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Hawaii | Leather Path`,
    description: 'Sandalias Hawaii con materiales exóticos. Diseño elegante y cómodo para la mujer moderna.',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  return <ProductPageClient slug={slug} />;
}