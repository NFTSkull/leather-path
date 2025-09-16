'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrencyMXN } from '@/lib/currency';
import { getSandaliaImage } from '@/lib/image-manifest-sandalias';
import { toVariantSlug } from '@/lib/slugify';
import { getProductBySlug } from '@/lib/products-mock';
import { VariantSelector } from '@/components/product/VariantSelector';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';

export function ProductPageClient({ slug }: { slug: string }) {
  const productoData = getProductBySlug(slug);
  
  if (!productoData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-leather-black mb-4">Producto no encontrado</h1>
          <p className="text-espresso mb-6">El producto que buscas no existe.</p>
          <Link href="/tienda/mujer/sandalias" className="text-saddle hover:text-espresso">
            Volver a Sandalias
          </Link>
        </div>
      </div>
    );
  }

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
                src={getSandaliaImage(productoData.slug, toVariantSlug(selectedVariant.name))}
                alt={`${productoData.title} - ${selectedVariant.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <Badge className="absolute top-4 left-4 bg-gold text-leather-black font-medium">
                {productoData.badge}
              </Badge>
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-2 gap-4">
              {productoData.variants.map((variant, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg border border-camel/20 cursor-pointer hover:border-saddle transition-colors"
                  onClick={() => setSelectedVariant(variant)}
                >
                  <Image
                    src={getSandaliaImage(productoData.slug, toVariantSlug(variant.name))}
                    alt={`${productoData.title} - ${variant.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
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
            <VariantSelector
              productSlug={productoData.slug}
              variants={productoData.variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />

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
