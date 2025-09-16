'use client';

import React from 'react';
import Image from 'next/image';
import { getSandaliaImage } from '@/lib/image-manifest-sandalias';
import { toVariantSlug } from '@/lib/slugify';
import { formatCurrencyMXN } from '@/lib/currency';

interface Variant {
  id: string;
  name: string;
  sku: string;
  priceMXN: number;
  stock: number;
}

interface VariantSelectorProps {
  productSlug: string;
  variants: Variant[];
  selectedVariant: Variant;
  onVariantChange: (variant: Variant) => void;
}

export function VariantSelector({ 
  productSlug, 
  variants, 
  selectedVariant, 
  onVariantChange 
}: VariantSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-heading text-leather-black">
        Variantes Disponibles
      </h3>
      
      <div className="space-y-3">
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          const variantSlug = toVariantSlug(variant.name);
          const imageSrc = getSandaliaImage(productSlug, variantSlug);
          
          return (
            <div
              key={variant.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'border-saddle bg-saddle/5'
                  : 'border-camel/30 hover:border-saddle/50'
              }`}
              onClick={() => onVariantChange(variant)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-camel/20">
                    <Image
                      src={imageSrc}
                      alt={`${productSlug} - ${variant.name}`}
                      fill
                      className="object-cover"
                      sizes="48px"
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
          );
        })}
      </div>
    </div>
  );
}
