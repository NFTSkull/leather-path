import { promises as fs } from "fs";
import path from "path";
import { variantSlug } from "../src/lib/slugifyVariant";

// Lista de productos de Bota Alta conocidos (basado en las imágenes que veo)
const productosBotaAlta = [
  "alaska",
  "barbie", 
  "catania",
  "cheyenne",
  "forjida",
  "gloria",
  "holly",
  "madamme",
  "maya",
  "marbella",
  "moana",
  "nevada",
  "samantha",
  "vittoria"
];

// Colores conocidos
const colores = [
  "negro",
  "rojo", 
  "tan",
  "beige",
  "miel",
  "tabaco",
  "glam",
  "shedron",
  "cafe",
  "chocolate",
  "vino",
  "teak",
  "capuchino",
  "blanco",
  "blanca"
];

async function main() {
  const base = path.join(process.cwd(), "public", "img", "products", "bota-alta");
  
  try { 
    await fs.access(base); 
  } catch { 
    console.error("❌ Carpeta no existe:", base); 
    process.exit(1); 
  }

  console.log(`🔍 Auditing imágenes de Bota Alta...\n`);

  const missing: string[] = [];
  const ok: string[] = [];
  const modelImages: string[] = [];

  for (const producto of productosBotaAlta) {
    console.log(`📦 ${producto}:`);
    
    // Verificar si existe imagen por modelo
    const modelPath = path.join(base, `${producto}.png`);
    try { 
      await fs.access(modelPath); 
      modelImages.push(`${producto}.png`);
      console.log(`   ✅ Modelo: ${producto}.png`);
    } catch {
      console.log(`   ⚠️  Modelo: ${producto}.png (falta)`);
    }

    // Verificar variantes por color
    for (const color of colores) {
      const vs = variantSlug(color);
      const filename = `${producto}-${vs}.png`;
      const fullPath = path.join(base, filename);
      
      try { 
        await fs.access(fullPath); 
        ok.push(filename);
        console.log(`   ✅ ${filename}`);
      } catch { 
        // Solo mostrar si es un color que probablemente existe
        if (["negro", "rojo", "tan", "beige", "miel", "tabaco", "glam", "shedron", "cafe", "chocolate", "vino", "teak", "capuchino", "blanco", "blanca"].includes(color)) {
          missing.push(filename);
          console.log(`   ❌ ${filename} (falta)`);
        }
      }
    }
    console.log("");
  }

  console.log("📊 RESUMEN:");
  console.log(`✅ Imágenes por variante encontradas: ${ok.length}`);
  console.log(`⚠️  Imágenes por variante faltantes: ${missing.length}`);
  console.log(`📁 Imágenes por modelo encontradas: ${modelImages.length}`);

  if (missing.length > 0) {
    console.log("\n🔧 ARCHIVOS FALTANTES:");
    missing.forEach(f => console.log(`   • ${f}`));
    console.log(`\n💡 Coloca estos archivos en: ${base}`);
    console.log("💡 Si tienes imagen por modelo, puedes usarla como fallback");
  }

  if (modelImages.length > 0) {
    console.log("\n📁 IMÁGENES POR MODELO DISPONIBLES:");
    modelImages.forEach(f => console.log(`   • ${f}`));
  }

  if (missing.length === 0) {
    console.log("\n🎉 ¡Todas las imágenes por variante existen!");
  }
}

main().catch(err => { 
  console.error("❌ Error:", err); 
  process.exit(1); 
});
