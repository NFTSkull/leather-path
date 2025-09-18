#!/usr/bin/env node
/**
 * Script para crear imágenes PNG válidas para línea vaquera
 */

const fs = require('fs');
const path = require('path');

// PNG válido de 1x1 pixel transparente (base64)
const validPNGBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

function createValidPNG() {
  return Buffer.from(validPNGBase64, 'base64');
}

function main() {
  console.log('🖼️ Creando imágenes PNG válidas para línea vaquera...');
  
  const vaqueraDir = path.join(process.cwd(), 'public/img/products/mujer/vaquera');
  const placeholderPath = path.join(vaqueraDir, 'placeholder.png');
  
  // Crear placeholder específico para vaquera
  const pngData = createValidPNG();
  fs.writeFileSync(placeholderPath, pngData);
  console.log('✅ Creado: public/img/products/mujer/vaquera/placeholder.png');
  
  // Crear imágenes para todas las botas vaquera
  const files = [
    'armonia-tabaco.png',
    'armonia-shedron.png',
    'adorada-negro.png',
    'adorada-tan.png',
    'liberty-tabaco.png',
    'liberty-negro.png',
    'orgullosa-tan.png',
    'orgullosa-shedron.png',
    'dolly-gris.png',
    'dolly-miel.png',
    'risuena-cafe.png',
    'risuena-nogal.png',
    'palmira-glam.png',
    'palmira-chocolate.png',
    'santorini-miel.png',
    'santorini-negro.png',
    'milenia-miel.png'
  ];
  
  for (const file of files) {
    const filePath = path.join(vaqueraDir, file);
    fs.writeFileSync(filePath, pngData);
    console.log(`✅ Creado: ${file}`);
  }
  
  console.log(`\n🎉 Completado! ${files.length + 1} archivos PNG creados para línea vaquera`);
}

if (require.main === module) {
  main();
}

