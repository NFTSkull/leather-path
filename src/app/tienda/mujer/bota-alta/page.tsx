import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatCurrencyMXN } from '@/lib/currency';
import { prisma } from '@/lib/prisma';
import { resolveProductImageSrc } from '@/lib/productImage';

export const metadata: Metadata = {
  title: 'Bota Alta · Damas | Leather Path',
  description: 'Descubre nuestra colección de botas altas para mujer con diseño elegante y materiales premium.',
};

export default async function BotaAltaMujerPage() {
  // Query con Prisma (idéntico estilo a sandalias/vaquera)
  const productos = await prisma.product.findMany({
    where: {
      gender: "mujer",
      status: "published",
      categories: { some: { category: { slug: "bota-alta" } } },
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
      {/* Breadcrumbs */}
      <div className="bg-gradient-to-r from-saddle/5 to-espresso/5 border-b border-camel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/tienda" className="text-espresso hover:text-saddle transition-colors">
              Tienda
            </Link>
            <span className="text-camel">/</span>
            <Link href="/tienda/mujer" className="text-espresso hover:text-saddle transition-colors">
              Mujer
            </Link>
            <span className="text-camel">/</span>
            <span className="text-leather-black font-medium">Bota Alta</span>
          </nav>
        </div>
      </div>

      {/* Header de la página */}
      <div className="bg-gradient-to-r from-saddle/5 to-espresso/5 border-b border-camel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-display text-leather-black mb-4">
              Bota Alta · Damas
            </h1>
            <p className="text-xl text-espresso max-w-2xl mx-auto">
              Botas altas para mujer con diseño elegante, materiales premium y estilo duradero
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Color:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="negro">Negro</option>
              <option value="tabaco">Tabaco</option>
              <option value="beige">Beige</option>
              <option value="miel">Miel</option>
              <option value="cafe">Café</option>
              <option value="tan">Tan</option>
              <option value="glam">Glam</option>
              <option value="shedron">Shedron</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Precio:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="0-400000">Hasta $4,000</option>
              <option value="400000-500000">$4,000 - $5,000</option>
              <option value="500000+">Más de $5,000</option>
            </select>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => {
            const defaultVariant = producto.variants?.[0] ?? null;
            const imgSrc = resolveProductImageSrc(producto, defaultVariant?.option2 ?? undefined);
            
            return (
            <div key={producto.id} className="group">
              <Link href={`/tienda/producto/${producto.slug}`}>
                <div className="bg-white rounded-2xl shadow-leather border border-camel/20 overflow-hidden hover:shadow-leather-lg transition-all duration-300 group-hover:-translate-y-1">
                  {/* Imagen */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={`${producto.title} - ${defaultVariant?.option2 ?? ""}`}
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
                      {producto.title}
                    </h3>
                    <p className="text-espresso text-sm mb-4 line-clamp-2">
                      {producto.description || 'Bota alta para dama con diseño elegante y materiales premium'}
                    </p>
                    
                    {/* Variantes disponibles */}
                    <div className="mb-4">
                      <p className="text-xs text-camel mb-2">
                        {producto.variants.length} variante{producto.variants.length !== 1 ? 's' : ''} disponible{producto.variants.length !== 1 ? 's' : ''}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {producto.variants.slice(0, 2).map((variant, index) => (
                          <span
                            key={index}
                            className="text-xs bg-camel/20 text-espresso px-2 py-1 rounded"
                          >
                            {variant.option2}
                          </span>
                        ))}
                        {producto.variants.length > 2 && (
                          <span className="text-xs text-camel">
                            +{producto.variants.length - 2} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-leather-black">
                        {formatCurrencyMXN((producto.variants[0]?.priceMXN || 0) * 100)}
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
          <div className="text-center py-12">
            <p className="text-espresso text-lg">
              No se encontraron botas altas en este momento.
            </p>
            <Link
              href="/tienda"
              className="inline-block mt-4 text-saddle hover:text-espresso transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
