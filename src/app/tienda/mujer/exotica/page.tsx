import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatMXN } from '@/lib/price';
import { prisma } from '@/lib/prisma';
import { resolveProductImagePrimary } from '@/lib/productImage';
import { shapeProductForPdp } from '@/lib/shapeProduct';

export const metadata: Metadata = {
  title: 'Línea Exótica · Damas | Leather Path',
  description: 'Descubre nuestra colección de sandalias exóticas para mujer confeccionadas con materiales únicos de primera calidad.',
};

export default async function ExoticaMujerPage() {
  const productos = await prisma.product.findMany({
    where: {
      gender: "mujer",
      status: "published",
      categories: { some: { category: { slug: "exotica" } } },
      collections: { some: { collection: { slug: "ladies" } } },
    },
    include: {
      variants: true,
      images: true,
      categories: { include: { category: true } },
      collections: { include: { collection: true } },
    },
    orderBy: { title: "asc" },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-saddle to-espresso text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display mb-4">
            Línea Exótica · Damas
          </h1>
          <p className="text-xl text-camel max-w-3xl mx-auto">
            Descubre nuestra colección de sandalias exóticas para mujer confeccionadas con materiales únicos de primera calidad.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-ivory py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-espresso">
            <Link href="/tienda" className="hover:text-saddle transition-colors">Tienda</Link>
            <span>/</span>
            <Link href="/tienda/mujer" className="hover:text-saddle transition-colors">Mujer</Link>
            <span>/</span>
            <span className="text-leather-black">Exótica</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-heading text-leather-black">
                Sandalias Exóticas
              </h2>
              <Badge variant="secondary" className="bg-gold text-leather-black">
                {productos.length} producto{productos.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => {
            const shapedProduct = shapeProductForPdp(producto);
            const defaultVariant = shapedProduct.variants?.[0] ?? null;
            const imgSrc = resolveProductImagePrimary(shapedProduct, defaultVariant?.option2 ?? undefined);

            return (
              <div key={producto.id} className="group">
                <Link href={`/tienda/producto/${producto.slug}`}>
                  <div className="bg-white rounded-2xl shadow-leather border border-camel/20 overflow-hidden hover:shadow-leather-lg transition-all duration-300 group-hover:-translate-y-1">
                    {/* Imagen */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={imgSrc}
                        alt={`${shapedProduct.title} - ${defaultVariant?.option2 ?? ""}`}
                        fill
                        className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                      />
                      <Badge className="absolute top-4 left-4 bg-gold text-leather-black font-medium">
                        Ladies
                      </Badge>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-xl font-heading text-leather-black mb-2 group-hover:text-saddle transition-colors">
                        {shapedProduct.title}
                      </h3>
                      <p className="text-espresso text-sm mb-4 line-clamp-2">
                        {shapedProduct.description || 'Sandalias exóticas para dama con materiales únicos y diseño elegante'}
                      </p>

                      {/* Variantes disponibles */}
                      <div className="mb-4">
                        <p className="text-xs text-camel mb-2">
                          {shapedProduct.variants.length} variante{shapedProduct.variants.length !== 1 ? 's' : ''} disponible{shapedProduct.variants.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {shapedProduct.variants.slice(0, 2).map((variant, index) => (
                            <span
                              key={index}
                              className="text-xs bg-camel/20 text-espresso px-2 py-1 rounded"
                            >
                              {variant.option2}
                            </span>
                          ))}
                          {shapedProduct.variants.length > 2 && (
                            <span className="text-xs text-camel">
                              +{shapedProduct.variants.length - 2} más
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Precio */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-leather-black">
                          {formatMXN(defaultVariant?.priceMXN ?? 0)}
                        </span>
                        <span className="text-sm text-espresso">
                          Desde
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mensaje si no hay productos */}
        {productos.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-heading text-leather-black mb-4">
              No hay productos disponibles
            </h3>
            <p className="text-espresso">
              Pronto tendremos más sandalias exóticas disponibles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
