#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { getProductImageSrc } from '../src/lib/images';

/**
 * Script para verificar que todas las imágenes de productos existen
 * Se ejecuta antes del build para evitar desplegar con imágenes faltantes
 */

// Datos de productos sandalias mujer (desde seed o DB)
const SANDALIAS_MUJER = [
  {
    slug: 'hawaii',
    title: 'Hawaii',
    variants: [
      { name: 'Pitón rojo' },
      { name: 'Pitón natural' },
    ],
  },
  {
    slug: 'bali',
    title: 'Bali',
    variants: [
      { name: 'Avestruz café' },
      { name: 'Avestruz negro' },
      { name: 'Negro y pitón natural' },
    ],
  },
  {
    slug: 'milo',
    title: 'Milo',
    variants: [
      { name: 'Cocodrilo café' },
    ],
  },
  {
    slug: 'bora-bora',
    title: 'Bora Bora',
    variants: [
      { name: 'Black Cherry' },
      { name: 'Pitón azul mora' },
    ],
  },
  {
    slug: 'mallorca',
    title: 'Mallorca',
    variants: [
      { name: 'Pitón natural' },
      { name: 'Pitón coñac' },
    ],
  },
];

// Lista esperada de archivos (para referencia)
const EXPECTED_FILES = [
  'hawaii-piton-rojo.png',
  'hawaii-piton-natural.png',
  'bali-avestruz-cafe.png',
  'bali-avestruz-negro.png',
  'bali-negro-piton-natural.png',
  'milo-cocodrilo-cafe.png',
  'bora-bora-black-cherry.png',
  'bora-bora-piton-azul-mora.png',
  'mallorca-piton-natural.png',
  'mallorca-piton-conac.png',
];

function verifyImages(): void {
  console.log('🔍 Verificando imágenes de productos sandalias mujer...');
  
  const missingImages: string[] = [];
  const foundImages: string[] = [];
  
  // Verificar cada producto y variante
  for (const product of SANDALIAS_MUJER) {
    for (const variant of product.variants) {
      const imagePath = getProductImageSrc(product.slug, variant.name);
      const fullPath = path.join(process.cwd(), 'public', imagePath);
      
      if (fs.existsSync(fullPath)) {
        foundImages.push(imagePath);
        console.log(`✅ ${imagePath}`);
      } else {
        missingImages.push(imagePath);
        console.log(`❌ ${imagePath}`);
      }
    }
  }
  
  console.log('\n📊 Resumen:');
  console.log(`✅ Encontradas: ${foundImages.length}`);
  console.log(`❌ Faltantes: ${missingImages.length}`);
  
  if (missingImages.length > 0) {
    console.log('\n🚨 Imágenes faltantes:');
    missingImages.forEach(img => console.log(`   - ${img}`));
    
    console.log('\n📋 Archivos esperados en public/img/products/sandalias/:');
    EXPECTED_FILES.forEach(file => console.log(`   - ${file}`));
    
    throw new Error(`Missing ${missingImages.length} product images. Build aborted.`);
  }
  
  console.log('\n🎉 Todas las imágenes están presentes. Build puede continuar.');
}

function main(): void {
  try {
    verifyImages();
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
