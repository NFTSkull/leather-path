'use client';

import React from "react";
import { type ProductView, type VariantView } from "@/lib/shapeProduct";
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
import { useCartStore } from '@/lib/store';
import { resolveProductImagePrimary, fallbackByModel, placeholderBota } from "@/lib/productImage";
import { variantSlug } from "@/lib/slugifyVariant";

function normalizeVariantSlug(name?: string | null) {
  return (name ?? "")
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ñ/g, "n");
}

function buildImageForVariant(p: ProductView, v?: VariantView) {
  // Usar la nueva función unificada
  return resolveProductImagePrimary(p, v?.option2 ?? undefined);
}

export function ProductPageClient({ product }: { product: ProductView }) {
  const [selectedVariant, setSelectedVariant] = React.useState<VariantView | null>(product?.variants?.[0] ?? null);
  const [heroSrc, setHeroSrc] = React.useState<string>(resolveProductImagePrimary(product, selectedVariant?.option2 ?? undefined));
  const { addItem } = useCartStore();

  React.useEffect(() => {
    setHeroSrc(resolveProductImagePrimary(product, selectedVariant?.option2 ?? undefined));
  }, [product?.slug, product?.categories?.join(","), selectedVariant?.option2]);

  if (!product || !Array.isArray(product.variants)) {
    console.error("PDP_CLIENT_BAD_PROPS", { productType: typeof product });
    return <div>Producto inválido.</div>;
  }
  
  // Obtener variante actual y precio
  const currentVariant = selectedVariant;
  const price = typeof currentVariant?.priceMXN === "number" ? currentVariant.priceMXN : 0;

  const productoData = product;
  
  // Handler para agregar al carrito
  const onAddToCart = () => {
    if (!currentVariant) return;
    
    addItem({
      productId: String(product.id || product.slug),
      slug: product.slug,
      title: product.title,
      sku: currentVariant.sku,
      priceMXN: price,
      quantity: 1,
      imageUrl: buildImageForVariant(product, currentVariant),
    });
  };
  
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
          {product.categories.includes("sandalias") && (
            <>
              <Link href="/tienda/mujer/sandalias" className="hover:text-saddle transition-colors">
                Sandalias
              </Link>
              <span>/</span>
            </>
          )}
          {product.categories.includes("bota-alta") && (
            <>
              <Link href="/tienda/mujer/bota-alta" className="hover:text-saddle transition-colors">
                Bota Alta
              </Link>
              <span>/</span>
            </>
          )}
          {product.categories.includes("botas") && (
            <>
              <Link href="/tienda/mujer/vaquera" className="hover:text-saddle transition-colors">
                Vaquera
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-leather-black">{productoData.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-camel/20">
              <img
                key={`${product.slug}-${variantSlug(currentVariant?.option2 ?? undefined)}`}
                src={heroSrc}
                alt={`${productoData.title} - ${currentVariant?.option2 ?? ""}`.trim()}
                className="w-full h-full object-contain bg-white"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  const byModel = fallbackByModel(product);

                  // 1) si falló variante → intenta modelo
                  if (img.src.includes(heroSrc)) { img.src = byModel; return; }

                  // 2) si falló modelo → placeholder
                  if (img.src.includes(byModel)) { img.src = placeholderBota; return; }
                }}
              />
              <Badge className="absolute top-4 left-4 bg-gold text-leather-black font-medium">
                {product.categories.includes("sandalias") ? "Sandalias" : 
                 product.categories.includes("bota-alta") ? "Bota Alta" :
                 product.categories.includes("botas") ? "Vaquera" : "LeatherPath"}
              </Badge>
            </div>

            {/* Miniaturas - Mostrar para sandalias y bota alta */}
            {(product.categories.includes("sandalias") || product.categories.includes("bota-alta")) && (
              <div className="grid grid-cols-2 gap-4">
                {productoData.variants.map((variant: VariantView, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-lg border border-camel/20 cursor-pointer hover:border-saddle transition-colors"
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <img
                      src={buildImageForVariant(product, variant)}
                      alt={`${productoData.title} - ${variant.option2 ?? ""}`.trim()}
                      className="w-full h-full object-contain bg-white"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        if (!el.dataset.fallback) {
                          el.dataset.fallback = "1";
                          el.src = fallbackByModel(product);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display text-leather-black mb-2">
                {productoData.title}
              </h1>
              <p className="text-xl text-espresso mb-4">
                {productoData.description || 'Producto LeatherPath'}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-espresso">(4.8)</span>
                </div>
                <span className="text-sm text-camel">SKU: {currentVariant?.sku || 'N/A'}</span>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-heading text-leather-black mb-3">
                Descripción
              </h3>
              <p className="text-espresso leading-relaxed">
                {productoData.description || 'Producto LeatherPath'}
              </p>
            </div>

            {/* Selector de variantes */}
                <VariantSelector
                  productId={String(productoData.id || productoData.slug)}
                  variants={productoData.variants}
                  selectedVariant={currentVariant}
                  onVariantChange={(variant) => setSelectedVariant(variant)}
                />

            {/* Botones de acción */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-saddle hover:bg-espresso text-white"
                  onClick={() => {
                    // TODO: Implementar "Comprar ahora" - crear sesión Stripe
                    console.log('Comprar ahora:', currentVariant);
                  }}
                >
                  Comprar Ahora - {formatCurrencyMXN(price)}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-saddle text-saddle hover:bg-saddle hover:text-white"
                  onClick={onAddToCart}
                  disabled={!currentVariant || (typeof currentVariant.stock === "number" && currentVariant.stock <= 0)}
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
                  {productoData.categories?.map((cat: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-espresso">
                      <span className="text-saddle mt-1">•</span>
                      <span>Categoría: {cat}</span>
                    </li>
                  ))}
                  {productoData.collections?.map((col: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-espresso">
                      <span className="text-saddle mt-1">•</span>
                      <span>Colección: {col}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-heading text-leather-black mb-3">
                  Cuidado
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-espresso">
                    <span className="text-saddle mt-1">•</span>
                    <span>Materiales de primera calidad</span>
                  </li>
                  <li className="flex items-start space-x-2 text-espresso">
                    <span className="text-saddle mt-1">•</span>
                    <span>Construcción artesanal</span>
                  </li>
                  <li className="flex items-start space-x-2 text-espresso">
                    <span className="text-saddle mt-1">•</span>
                    <span>Garantía de calidad</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
