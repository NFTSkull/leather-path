import { PrismaClient } from "@prisma/client";
import { normalizePesos } from "../src/lib/price";

// Usar SQLite local para la corrección
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

// Mapeo de slugs a precios en pesos (enteros)
const PRECIOS_BOTA_ALTA: Record<string, number> = {
  "liberty-alta": 4000,
  "bandida": 4000,
  "gerbera": 3800,
  "madamme": 3900,
  "vittoria": 3800,
  "maya": 3800,
  "cheyenne": 3950,
  "barbie": 3900,
  "forjida": 4250,
  "gloria": 3650,
  "catania": 3700,
  "marbella": 4800,
  "alaska": 5400,
  "nevada": 4100,
  "moana": 4550,
  "holly": 5200,
  "samantha": 4100,
};

async function main() {
  console.log("🔧 Corrigiendo precios de Bota Alta...\n");

  let totalUpdated = 0;
  const results: Array<{slug: string, variantsUpdated: number, priceMXN: number}> = [];

  for (const [slug, precioPesos] of Object.entries(PRECIOS_BOTA_ALTA)) {
    try {
      // Validar precio antes de aplicar
      const validatedPrice = normalizePesos(precioPesos);
      
      console.log(`📦 ${slug}:`);
      
      // Buscar el producto
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { variants: true }
      });

      if (!product) {
        console.log(`   ⚠️  Producto ${slug} no encontrado`);
        continue;
      }

      // Actualizar todas las variantes del producto
      const updateResult = await prisma.variant.updateMany({
        where: { productId: product.id },
        data: { priceMXN: validatedPrice }
      });

      const variantsUpdated = updateResult.count;
      totalUpdated += variantsUpdated;
      
      results.push({
        slug,
        variantsUpdated,
        priceMXN: validatedPrice
      });

      console.log(`   ✅ ${variantsUpdated} variantes → $${validatedPrice} MXN`);
      
    } catch (error) {
      console.log(`   ❌ Error en ${slug}:`, error);
    }
  }

  console.log("\n📊 RESUMEN DE CORRECCIONES:");
  console.log("┌─────────────────┬─────────────────┬─────────────┐");
  console.log("│ Producto        │ Variantes       │ Precio      │");
  console.log("├─────────────────┼─────────────────┼─────────────┤");
  
  results.forEach(r => {
    const slug = r.slug.padEnd(15);
    const variants = r.variantsUpdated.toString().padEnd(15);
    const price = `$${r.priceMXN}`.padEnd(11);
    console.log(`│ ${slug} │ ${variants} │ ${price} │`);
  });
  
  console.log("└─────────────────┴─────────────────┴─────────────┘");
  console.log(`\n✅ Total variantes actualizadas: ${totalUpdated}`);
  console.log(`📦 Productos procesados: ${results.length}`);
  
  if (totalUpdated > 0) {
    console.log("\n🎉 ¡Precios corregidos exitosamente!");
    console.log("💡 Los precios ahora están en formato correcto (pesos enteros)");
  }
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
