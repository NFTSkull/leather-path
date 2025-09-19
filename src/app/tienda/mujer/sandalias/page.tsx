import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatMXN } from '@/lib/price';
import { getSandaliaImage } from '@/lib/image-manifest-sandalias';
import { toVariantSlug } from '@/lib/slugify';

export const metadata: Metadata = {
  title: 'Sandalias para Mujer | Leather Path',
  description: 'Descubre nuestra colección de sandalias para mujer confeccionadas con materiales exóticos de primera calidad.',
};

// Datos mock de productos (en producción vendrían de la API)
const sandaliasMujer = [
  {
    id: 'hawaii',
    title: 'Hawaii',
    slug: 'hawaii',
    subtitle: 'Sandalias Hawaii con detalles exóticos',
    price: 265000, // en centavos
    badge: 'Ladies',
    variants: [
      { name: 'Pitón rojo', sku: 'LP-S-HWI-PITON-ROJO' },
      { name: 'Pitón natural', sku: 'LP-S-HWI-PITON-NAT' },
    ],
  },
  {
    id: 'bali',
    title: 'Bali',
    slug: 'bali',
    subtitle: 'Sandalias Bali con materiales exóticos',
    price: 265000,
    badge: 'Ladies',
    variants: [
      { name: 'Avestruz café', sku: 'LP-S-BAL-AVES-CAF' },
      { name: 'Avestruz negro', sku: 'LP-S-BAL-AVES-NGR' },
      { name: 'Negro y pitón natural', sku: 'LP-S-BAL-PITON-MIX' },
    ],
  },
  {
    id: 'milo',
    title: 'Milo',
    slug: 'milo',
    subtitle: 'Sandalias Milo en cocodrilo',
    price: 265000,
    badge: 'Ladies',
    variants: [
      { name: 'Cocodrilo café', sku: 'LP-S-MIL-COCO-CAF' },
    ],
  },
  {
    id: 'bora-bora',
    title: 'Bora Bora',
    slug: 'bora-bora',
    subtitle: 'Sandalias Bora Bora con estilo tropical',
    price: 265000,
    badge: 'Ladies',
    variants: [
      { name: 'Black Cherry', sku: 'LP-S-BRB-BLACK-CH' },
      { name: 'Pitón azul mora', sku: 'LP-S-BRB-PITON-AZM' },
    ],
  },
  {
    id: 'mallorca',
    title: 'Mallorca',
    slug: 'mallorca',
    subtitle: 'Sandalias Mallorca con elegancia mediterránea',
    price: 265000,
    badge: 'Ladies',
    variants: [
      { name: 'Pitón natural', sku: 'LP-S-MLL-PITON-NAT' },
      { name: 'Pitón coñac', sku: 'LP-S-MLL-PITON-CON' },
    ],
  },
];

export default function SandaliasMujerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-saddle/5 to-espresso/5 border-b border-camel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-display text-leather-black mb-4">
              Sandalias para Mujer
            </h1>
            <p className="text-xl text-espresso max-w-2xl mx-auto">
              Descubre nuestra colección Ladies con materiales exóticos de primera calidad
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Material:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="piton">Pitón</option>
              <option value="avestruz">Avestruz</option>
              <option value="cocodrilo">Cocodrilo</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Color:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="rojo">Rojo</option>
              <option value="natural">Natural</option>
              <option value="cafe">Café</option>
              <option value="negro">Negro</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Precio:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="0-300000">Hasta $3,000</option>
              <option value="300000-500000">$3,000 - $5,000</option>
              <option value="500000+">Más de $5,000</option>
            </select>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sandaliasMujer.map((producto) => (
            <div key={producto.id} className="group">
              <Link href={`/tienda/producto/${producto.slug}`}>
                <div className="bg-white rounded-2xl shadow-leather border border-camel/20 overflow-hidden hover:shadow-leather-lg transition-all duration-300 group-hover:-translate-y-1">
                  {/* Imagen */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={getSandaliaImage(producto.slug, toVariantSlug(producto.variants[0]?.name || ''))}
                      alt={`${producto.title} - ${producto.variants[0]?.name || ''}`}
                      fill
                      className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                    <Badge className="absolute top-4 left-4 bg-gold text-leather-black font-medium">
                      {producto.badge}
                    </Badge>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="text-xl font-heading text-leather-black mb-2 group-hover:text-saddle transition-colors">
                      {producto.title}
                    </h3>
                    <p className="text-espresso text-sm mb-4 line-clamp-2">
                      {producto.subtitle}
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
                            {variant.name}
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
                        {formatMXN(producto.price)}
                      </span>
                      <span className="text-sm text-espresso">
                        Desde
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {sandaliasMujer.length === 0 && (
          <div className="text-center py-12">
            <p className="text-espresso text-lg">
              No se encontraron sandalias en este momento.
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
