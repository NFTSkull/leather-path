'use client';

import React, { useState } from 'react';
import { formatCurrencyMXN } from '@/lib/currency';

interface Variant {
  id: string;
  option2: string | null;
  sku: string;
  priceMXN: number;
  stock: number;
}

interface VariantSelectorProps {
  productId?: string;
  productSlug?: string;
  variants: Variant[];
  selectedVariant: Variant | null;
  onVariantChange: (variant: Variant) => void;
}

export function VariantSelector({ 
  productId, 
  productSlug,
  variants, 
  selectedVariant, 
  onVariantChange 
}: VariantSelectorProps) {
  const [currentVariant, setCurrentVariant] = useState<Variant | null>(selectedVariant);

  const handleVariantChange = (variant: Variant) => {
    setCurrentVariant(variant);
    onVariantChange(variant);
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-leather-black">Variantes disponibles</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant) => {
          const isActive = currentVariant?.id === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              aria-pressed={isActive}
              data-selected={isActive ? "1" : "0"}
              onClick={() => handleVariantChange(variant)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                isActive
                  ? 'border-leather-black bg-leather-black text-ivory'
                  : 'border-camel bg-white text-leather-black hover:border-espresso'
              }`}
            >
              {/* IMPORTANTE: que el texto herede el color del botón */}
              <div className="text-sm font-medium text-current">{variant.option2}</div>
              <div className="text-xs opacity-75 text-current">{variant.sku}</div>
              <div className="text-sm font-semibold mt-1 text-current">
                {formatCurrencyMXN(variant.priceMXN)}
              </div>
              <div className="text-xs opacity-75 text-current">
                {variant.stock > 0 ? `${variant.stock} disponibles` : 'Agotado'}
              </div>
            </button>
          );
        })}
      </div>
      
      {currentVariant && (
        <div className="p-4 bg-ivory rounded-lg border border-camel/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-leather-black">
                {currentVariant.option2}
              </p>
              <p className="text-sm text-espresso">SKU: {currentVariant.sku}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-leather-black">
                {formatCurrencyMXN(currentVariant.priceMXN)}
              </p>
              <p className="text-sm text-espresso">
                {currentVariant.stock > 0 ? `${currentVariant.stock} disponibles` : 'Agotado'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}