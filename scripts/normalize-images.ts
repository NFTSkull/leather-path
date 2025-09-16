#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { slugify } from '../src/lib/slugify';

/**
 * Script para normalizar nombres de imágenes de sandalias
 * Convierte nombres con espacios a slugs y los mueve a /public/products/sandalias/
 */

interface ImageMapping {
  original: string;
  normalized: string;
  sourcePath: string;
  targetPath: string;
}

const SANDBOX_DIRS = ['public', 'assets', 'images'];
const TARGET_DIR = 'public/products/sandalias';

// Mapeo esperado de productos y variantes
const EXPECTED_MAPPINGS = [
  { product: 'hawaii', variants: ['piton rojo', 'piton natural'] },
  { product: 'bali', variants: ['avestruz cafe', 'avestruz negro', 'negro y piton natural'] },
  { product: 'milo', variants: ['cocodrilo cafe'] },
  { product: 'bora bora', variants: ['black cherry', 'piton azul mora'] },
  { product: 'mallorca', variants: ['piton natural', 'piton conac'] },
];

function findImageFiles(): string[] {
  const files: string[] = [];
  
  for (const dir of SANDBOX_DIRS) {
    if (fs.existsSync(dir)) {
      const dirFiles = fs.readdirSync(dir, { recursive: true })
        .filter((file: any) => {
          if (typeof file === 'string') {
            const ext = path.extname(file).toLowerCase();
            return ['.png', '.jpg', '.jpeg'].includes(ext);
          }
          return false;
        })
        .map((file: any) => path.join(dir, file));
      
      files.push(...dirFiles);
    }
  }
  
  return files;
}

function generateMappings(files: string[]): ImageMapping[] {
  const mappings: ImageMapping[] = [];
  
  for (const file of files) {
    const fileName = path.basename(file, path.extname(file));
    const ext = path.extname(file);
    
    // Buscar coincidencia con productos esperados
    for (const { product, variants } of EXPECTED_MAPPINGS) {
      // Buscar imagen del producto base
      if (fileName.toLowerCase().includes(product.toLowerCase())) {
        let variantName = '';
        
        // Buscar variante específica
        for (const variant of variants) {
          if (fileName.toLowerCase().includes(variant.toLowerCase())) {
            variantName = variant;
            break;
          }
        }
        
        const normalizedName = getProductImageSlug(product, variantName);
        const targetPath = path.join(TARGET_DIR, `${normalizedName}${ext}`);
        
        mappings.push({
          original: fileName,
          normalized: normalizedName,
          sourcePath: file,
          targetPath,
        });
        
        break; // Solo una coincidencia por archivo
      }
    }
  }
  
  return mappings;
}

function getProductImageSlug(productTitle: string, variantName?: string): string {
  const base = slugify(productTitle);
  const variant = variantName ? slugify(variantName) : '';
  return variant ? `${base}-${variant}` : base;
}

function printMappings(mappings: ImageMapping[]): void {
  console.log('📋 Mapeo de archivos de imágenes:');
  console.log('=====================================');
  
  if (mappings.length === 0) {
    console.log('❌ No se encontraron archivos de imágenes para normalizar');
    return;
  }
  
  for (const mapping of mappings) {
    console.log(`📁 ${mapping.original}${path.extname(mapping.sourcePath)}`);
    console.log(`   → ${mapping.normalized}${path.extname(mapping.sourcePath)}`);
    console.log(`   📍 ${mapping.sourcePath}`);
    console.log(`   🎯 ${mapping.targetPath}`);
    console.log('');
  }
  
  console.log(`✅ Total: ${mappings.length} archivos para normalizar`);
  console.log('');
  console.log('⚠️  NOTA: Este script solo muestra el mapeo.');
  console.log('   Para ejecutar los cambios, descomenta la función executeMappings()');
}

function executeMappings(mappings: ImageMapping[]): void {
  // Crear directorio destino si no existe
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(`📁 Creado directorio: ${TARGET_DIR}`);
  }
  
  for (const mapping of mappings) {
    try {
      // Copiar archivo al destino
      fs.copyFileSync(mapping.sourcePath, mapping.targetPath);
      console.log(`✅ Copiado: ${mapping.sourcePath} → ${mapping.targetPath}`);
    } catch (error) {
      console.error(`❌ Error copiando ${mapping.sourcePath}:`, error);
    }
  }
}

function main(): void {
  console.log('🔍 Buscando archivos de imágenes...');
  
  const files = findImageFiles();
  console.log(`📁 Encontrados ${files.length} archivos de imagen`);
  
  const mappings = generateMappings(files);
  printMappings(mappings);
  
  // Descomenta la siguiente línea para ejecutar los cambios
  // executeMappings(mappings);
}

if (require.main === module) {
  main();
}
