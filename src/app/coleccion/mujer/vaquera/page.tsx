import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatMXN } from '@/lib/price';
import { getVaqMujerImage } from '@/lib/image-manifest-vaquera';
import { toVariantSlug } from '@/lib/slugify';

export const metadata: Metadata = {
  title: 'Línea Vaquera para Mujer | Leather Path',
  description: 'Descubre nuestra colección de botas vaqueras para mujer con construcción WELT y materiales premium.',
};

// Datos mock de productos vaquera (en producción vendrían de la API)
const botasVaquera = [
  {
    id: 'armonia',
    title: 'Armonia',
    slug: 'armonia',
    subtitle: 'Bota vaquera Armonia con construcción WELT',
    price: 355000, // $3,550.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Suela de cuero',
    variants: [
      { name: 'Tabaco', sku: 'LP-M-VQ-ARM-TBC' },
      { name: 'Shedron', sku: 'LP-M-VQ-ARM-SHD' },
    ],
  },
  {
    id: 'adorada',
    title: 'Adorada',
    slug: 'adorada',
    subtitle: 'Bota vaquera Adorada con estoperoles y bordado',
    price: 355000, // $3,550.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Tacón de cuero con tapa antiderrapante · Estoperoles y bordado',
    variants: [
      { name: 'Negro', sku: 'LP-M-VQ-ADR-NGR' },
      { name: 'Tan', sku: 'LP-M-VQ-ADR-TAN' },
    ],
  },
  {
    id: 'liberty',
    title: 'Liberty',
    slug: 'liberty',
    subtitle: 'Bota vaquera Liberty con refuerzo en tubos',
    price: 365000, // $3,650.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Refuerzo en tubos · Suela de cuero troquelada',
    variants: [
      { name: 'Tabaco', sku: 'LP-M-VQ-LIB-TBC' },
      { name: 'Negro', sku: 'LP-M-VQ-LIB-NGR' },
    ],
  },
  {
    id: 'orgullosa',
    title: 'Orgullosa',
    slug: 'orgullosa',
    subtitle: 'Bota vaquera Orgullosa con acabados a mano',
    price: 370000, // $3,700.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Acabados a mano',
    variants: [
      { name: 'Tan', sku: 'LP-M-VQ-ORG-TAN' },
      { name: 'Shedron', sku: 'LP-M-VQ-ORG-SHD' },
    ],
  },
  {
    id: 'dolly',
    title: 'Dolly',
    slug: 'dolly',
    subtitle: 'Bota vaquera Dolly con diseño de estoperoles',
    price: 390000, // $3,900.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Diseño con estoperoles',
    variants: [
      { name: 'Gris', sku: 'LP-M-VQ-DOL-GRS' },
      { name: 'Miel', sku: 'LP-M-VQ-DOL-MIE' },
    ],
  },
  {
    id: 'risuena',
    title: 'Risueña',
    slug: 'risuena',
    subtitle: 'Bota vaquera Risueña con diseño floral bordado',
    price: 390000, // $3,900.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Diseño floral bordado · Punta rodeo',
    variants: [
      { name: 'Café', sku: 'LP-M-VQ-RIS-CAF' },
      { name: 'Nogal', sku: 'LP-M-VQ-RIS-NOG' },
    ],
  },
  {
    id: 'palmira',
    title: 'Palmira',
    slug: 'palmira',
    subtitle: 'Bota vaquera Palmira con diseño bordado',
    price: 360000, // $3,600.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Diseño bordado',
    variants: [
      { name: 'Glam', sku: 'LP-M-VQ-PAL-GLA' },
      { name: 'Chocolate', sku: 'LP-M-VQ-PAL-CHC' },
    ],
  },
  {
    id: 'santorini',
    title: 'Santorini',
    slug: 'santorini',
    subtitle: 'Bota vaquera Santorini con tubo bordado',
    price: 355000, // $3,550.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT · Tubo bordado en tonos a juego',
    variants: [
      { name: 'Miel', sku: 'LP-M-VQ-SAN-MIE' },
      { name: 'Negro', sku: 'LP-M-VQ-SAN-NGR' },
    ],
  },
  {
    id: 'milenia',
    title: 'Milenia',
    slug: 'milenia',
    subtitle: 'Bota vaquera Milenia con construcción WELT',
    price: 360000, // $3,600.00
    badge: 'Vaquera',
    details: 'Vaquera · Piel res · Construcción WELT',
    variants: [
      { name: 'Miel', sku: 'LP-M-VQ-MIL-MIE' },
    ],
  },
];

export default function VaqueraMujerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de la página */}
      <div className="bg-gradient-to-r from-saddle/5 to-espresso/5 border-b border-camel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-display text-leather-black mb-4">
              Línea Vaquera · Damas
            </h1>
            <p className="text-xl text-espresso max-w-2xl mx-auto">
              Botas vaqueras para mujer con construcción WELT y materiales premium
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
              <option value="tabaco">Tabaco</option>
              <option value="negro">Negro</option>
              <option value="tan">Tan</option>
              <option value="shedron">Shedron</option>
              <option value="gris">Gris</option>
              <option value="miel">Miel</option>
              <option value="cafe">Café</option>
              <option value="nogal">Nogal</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Material:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="piel-res">Piel Res</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-leather-black">Precio:</label>
            <select className="border border-camel/30 rounded-lg px-3 py-2 bg-white">
              <option value="">Todos</option>
              <option value="0-400000">Hasta $4,000</option>
              <option value="400000+">Más de $4,000</option>
            </select>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {botasVaquera.map((producto) => (
            <div key={producto.id} className="group">
              <Link href={`/tienda/producto/${producto.slug}`}>
                <div className="bg-white rounded-2xl shadow-leather border border-camel/20 overflow-hidden hover:shadow-leather-lg transition-all duration-300 group-hover:-translate-y-1">
                  {/* Imagen */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={getVaqMujerImage(producto.slug, toVariantSlug(producto.variants[0]?.name || ''))}
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
        {botasVaquera.length === 0 && (
          <div className="text-center py-12">
            <p className="text-espresso text-lg">
              No se encontraron botas vaqueras en este momento.
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
