#!/usr/bin/env node
/**
 * Script para crear imágenes PNG válidas usando base64
 */

const fs = require('fs');
const path = require('path');

// PNG válido de 1x1 pixel transparente (base64)
const validPNGBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

function createValidPNG() {
  return Buffer.from(validPNGBase64, 'base64');
}

function main() {
  console.log('🖼️ Creando imágenes PNG válidas...');
  
  const sandaliasDir = path.join(process.cwd(), 'public/img/products/sandalias');
  const placeholderPath = path.join(process.cwd(), 'public/img/placeholder.png');
  
  // Crear placeholder principal
  const pngData = createValidPNG();
  fs.writeFileSync(placeholderPath, pngData);
  console.log('✅ Creado: public/img/placeholder.png');
  
  // Crear imágenes para todas las sandalias
  const files = [
    'hawaii-piton-rojo.png',
    'hawaii-piton-natural.png',
    'bali-avestruz-cafe.png',
    'bali-avestruz-negro.png',
    'bali-negro-piton-natural.png',
    'milo-cocodrilo-cafe.png',
    'bora-bora-black-cherry.png',
    'bora-bora-piton-azul-mora.png',
    'mallorca-piton-natural.png',
    'mallorca-piton-conac.png'
  ];
  
  for (const file of files) {
    const filePath = path.join(sandaliasDir, file);
    fs.writeFileSync(filePath, pngData);
    console.log(`✅ Creado: ${file}`);
  }
  
  console.log(`\n🎉 Completado! ${files.length + 1} archivos PNG creados`);
}

if (require.main === module) {
  main();
}

