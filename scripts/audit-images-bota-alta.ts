import { promises as fs } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { variantSlug } from "../src/lib/slugifyVariant";

// Usar SQLite local para la auditoría
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

async function main() {
  const base = path.join(process.cwd(), "public", "img", "products", "bota-alta");
  
  try { 
    await fs.access(base); 
  } catch { 
    console.error("❌ Carpeta no existe:", base); 
    process.exit(1); 
  }

  const productos = await prisma.product.findMany({
    where: { categories: { some: { category: { slug: "bota-alta" } } } },
    include: { variants: true, categories: { include: { category: true } } },
    orderBy: { slug: "asc" },
  });

  console.log(`🔍 Auditing ${productos.length} productos de Bota Alta...\n`);

  const missing: string[] = [];
  const ok: string[] = [];
  const modelImages: string[] = [];

  for (const p of productos) {
    console.log(`📦 ${p.slug}:`);
    
    // Verificar si existe imagen por modelo
    const modelPath = path.join(base, `${p.slug}.png`);
    try { 
      await fs.access(modelPath); 
      modelImages.push(`${p.slug}.png`);
      console.log(`   ✅ Modelo: ${p.slug}.png`);
    } catch {
      console.log(`   ⚠️  Modelo: ${p.slug}.png (falta)`);
    }

    // Verificar variantes
    for (const v of (p.variants ?? [])) {
      const vs = variantSlug(v.option2);
      const filename = `${p.slug}-${vs}.png`;
      const fullPath = path.join(base, filename);
      
      try { 
        await fs.access(fullPath); 
        ok.push(filename);
        console.log(`   ✅ ${filename}`);
      } catch { 
        missing.push(filename);
        console.log(`   ❌ ${filename} (falta)`);
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