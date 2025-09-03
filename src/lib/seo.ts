import { Metadata } from 'next';

/**
 * Genera metadatos para páginas de productos
 */
export function generateProductMetadata(product: {
  title: string;
  description?: string;
  images: { url: string; alt: string }[];
  price: number;
}): Metadata {
  return {
    title: `${product.title} | Leather Path`,
    description: product.description || `Descubre ${product.title} en Leather Path. Calidad premium en calzado y accesorios de cuero.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map(img => ({
        url: img.url,
        alt: img.alt,
        width: 1200,
        height: 630,
      })),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: product.images[0]?.url,
    },
  };
}

/**
 * Genera metadatos para páginas de categorías
 */
export function generateCategoryMetadata(category: {
  name: string;
  description?: string;
}): Metadata {
  return {
    title: `${category.name} | Leather Path`,
    description: category.description || `Explora nuestra colección de ${category.name} en Leather Path.`,
    openGraph: {
      title: `${category.name} | Leather Path`,
      description: category.description,
      type: 'website',
    },
  };
}

/**
 * Genera JSON-LD para productos
 */
export function generateProductJsonLd(product: {
  id: string;
  title: string;
  description?: string;
  images: { url: string; alt: string }[];
  price: number;
  sku: string;
  brand: string;
  availability: 'InStock' | 'OutOfStock';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    image: product.images.map(img => img.url),
    offers: {
      '@type': 'Offer',
      price: product.price / 100,
      priceCurrency: 'MXN',
      availability: `https://schema.org/${product.availability}`,
      seller: {
        '@type': 'Organization',
        name: 'Leather Path',
      },
    },
  };
}

/**
 * Genera JSON-LD para breadcrumbs
 */
export function generateBreadcrumbJsonLd(items: Array<{
  name: string;
  url: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera JSON-LD para la organización
 */
export function generateOrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://leather-path.vercel.app';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Leather Path',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Tienda premium de calzado y accesorios de cuero con estética western elegante.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
  };
}
