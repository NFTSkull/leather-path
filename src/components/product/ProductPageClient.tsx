'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrencyMXN } from '@/lib/currency';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';

// Datos mock del producto (en producción vendrían de la API)
const productoData = {
  id: 'hawaii',
  title: 'Hawaii',
  slug: 'hawaii',
  subtitle: 'Sandalias Hawaii con detalles exóticos',
  description: 'Sandalias Hawaii con materiales exóticos. Diseño elegante y cómodo para la mujer moderna. Confeccionadas con los más finos materiales de pitón, estas sandalias combinan estilo y comodidad.',
  gender: 'mujer',
  material: 'pitón',
  height: 'sandalia',
  sku: 'LP-S-HWI',
  badge: 'Ladies',
  images: [
    { url: '/hawaii piton rojo.png', alt: 'Hawaii Pitón Rojo', position: 0 },
    { url: '/hawaii piton natural.png', alt: 'Hawaii Pitón Natural', position: 1 },
  ],
  variants: [
    { 
      id: 'variant-1',
      name: 'Pitón rojo', 
      sku: 'LP-S-HWI-PITON-ROJO',
      priceMXN: 265000,
      stock: 50,
      image: '/hawaii piton rojo.png'
    },
    { 
      id: 'variant-2',
      name: 'Pitón natural', 
      sku: 'LP-S-HWI-PITON-NAT',
      priceMXN: 265000,
      stock: 50,
      image: '/hawaii piton natural.png'
    },
  ],
  features: [
    'Material: Pitón exótico de primera calidad',
    'Forro: Cuero suave para máximo confort',
    'Suela: Cuero con diseño antideslizante',
    'Hecho a mano por artesanos expertos',
    'Garantía de calidad Leather Path',
  ],
  care: [
    'Limpiar con paño suave y seco',
    'Aplicar crema para cuero cada 3 meses',
    'Evitar contacto con agua',
    'Guardar en lugar fresco y seco',
  ],
};

export function ProductPageClient({ slug }: { slug: string }) {
  const [selectedVariant, setSelectedVariant] = React.useState(productoData.variants[0]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-espresso mb-8">
          <Link href="/tienda" className="hover:text-saddle transition-colors">
            Tienda
          </Link>
          <span>/</span>
          <Link href="/tienda/mujer" className="hover:text-saddle transition-colors">
            Mujer
          </Link>
          <span>/</span>
          <Link href="/tienda/mujer/sandalias" className="hover:text-saddle transition-colors">
            Sandalias
          </Link>
          <span>/</span>
          <span className="text-leather-black">{productoData.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-camel/20">
              <Image
                src={selectedVariant.image}
                alt={selectedVariant.name}
                fill
                className="object-cover"
                priority
              />
              <Badge className="absolute top-4 left-4 bg-gold text-leather-black font-medium">
                {productoData.badge}
              </Badge>
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-2 gap-4">
              {productoData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border border-camel/20 cursor-pointer hover:border-saddle transition-colors"
                  onClick={() => {
                    const variant = productoData.variants.find(v => v.image === image.url);
                    if (variant) setSelectedVariant(variant);
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display text-leather-black mb-2">
                {productoData.title}
              </h1>
              <p className="text-xl text-espresso mb-4">
                {productoData.subtitle}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-espresso">(4.8)</span>
                </div>
                <span className="text-sm text-camel">SKU: {productoData.sku}</span>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-heading text-leather-black mb-3">
                Descripción
              </h3>
              <p className="text-espresso leading-relaxed">
                {productoData.description}
              </p>
            </div>

            {/* Selector de variantes */}
            <div>
              <h3 className="text-lg font-heading text-leather-black mb-3">
                Variantes Disponibles
              </h3>
              <div className="space-y-3">
                {productoData.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-saddle bg-saddle/5'
                        : 'border-camel/30 hover:border-saddle/50'
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-camel/20">
                          <Image
                            src={variant.image}
                            alt={variant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-leather-black">
                            {variant.name}
                          </p>
                          <p className="text-sm text-espresso">
                            SKU: {variant.sku}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-leather-black">
                          {formatCurrencyMXN(variant.priceMXN)}
                        </p>
                        <p className="text-sm text-camel">
                          Stock: {variant.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-saddle hover:bg-espresso text-white"
                  onClick={() => {
                    // TODO: Implementar "Comprar ahora" - crear sesión Stripe
                    console.log('Comprar ahora:', selectedVariant);
                  }}
                >
                  Comprar Ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-saddle text-saddle hover:bg-saddle hover:text-white"
                  onClick={() => {
                    // TODO: Implementar agregar al carrito
                    console.log('Agregar al carrito:', selectedVariant);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Agregar al Carrito
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-espresso hover:text-saddle">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </Button>
                <Button variant="ghost" size="sm" className="text-espresso hover:text-saddle">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Características */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-heading text-leather-black mb-3">
                  Características
                </h3>
                <ul className="space-y-2">
                  {productoData.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-espresso">
                      <span className="text-saddle mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-heading text-leather-black mb-3">
                  Cuidado
                </h3>
                <ul className="space-y-2">
                  {productoData.care.map((care, index) => (
                    <li key={index} className="flex items-start space-x-2 text-espresso">
                      <span className="text-saddle mt-1">•</span>
                      <span>{care}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
