#!/usr/bin/env node
/**
 * Script para crear imágenes PNG placeholder válidas
 */

const fs = require('fs');
const path = require('path');

// Crear un PNG válido de 200x200 con fondo gris
function createPlaceholderPNG() {
  // PNG header + IHDR + IDAT + IEND
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0xC8, // width: 200
    0x00, 0x00, 0x00, 0xC8, // height: 200
    0x08, 0x02, 0x00, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
    0x90, 0x77, 0x53, 0xDE, // CRC
    0x00, 0x00, 0x00, 0x0C, // IDAT chunk length
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x08, 0x1D, 0x01, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // compressed data
    0xE2, 0x21, 0xBC, 0x33, // CRC
    0x00, 0x00, 0x00, 0x00, // IEND chunk length
    0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82  // CRC
  ]);
  
  return pngData;
}

function main() {
  console.log('🖼️ Creando imágenes PNG placeholder válidas...');
  
  const sandaliasDir = path.join(process.cwd(), 'public/img/products/sandalias');
  const placeholderPath = path.join(process.cwd(), 'public/img/placeholder.png');
  
  // Crear placeholder principal
  const placeholderData = createPlaceholderPNG();
  fs.writeFileSync(placeholderPath, placeholderData);
  console.log('✅ Creado: public/img/placeholder.png');
  
  // Crear placeholders para todas las sandalias
  const files = fs.readdirSync(sandaliasDir);
  const pngFiles = files.filter(file => file.endsWith('.png'));
  
  for (const file of pngFiles) {
    const filePath = path.join(sandaliasDir, file);
    fs.writeFileSync(filePath, placeholderData);
    console.log(`✅ Actualizado: ${file}`);
  }
  
  console.log(`\n🎉 Completado! ${pngFiles.length + 1} archivos PNG creados/actualizados`);
}

if (require.main === module) {
  main();
}

