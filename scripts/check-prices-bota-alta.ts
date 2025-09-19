import { PrismaClient } from "@prisma/client";

// Usar SQLite local para la auditoría
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

async function main() {
  console.log("🔍 Auditoría de precios Bota Alta...\n");

  const productos = await prisma.product.findMany({
    where: { 
      categories: { some: { category: { slug: "bota-alta" } } } 
    },
    include: { 
      variants: true,
      categories: { include: { category: true } }
    },
    orderBy: { slug: "asc" },
  });

  console.log(`📦 Encontrados ${productos.length} productos de Bota Alta\n`);

  let totalVariants = 0;
  let okCount = 0;
  let failCount = 0;
  const fails: Array<{slug: string, option2: string, priceMXN: any, reason: string}> = [];

  for (const producto of productos) {
    console.log(`📦 ${producto.slug}:`);
    
    for (const variant of producto.variants) {
      totalVariants++;
      const price = variant.priceMXN;
      const option2 = variant.option2 || "sin-color";
      
      // Validar precio
      let isValid = false;
      let reason = "";
      
      if (typeof price !== "number") {
        reason = `Tipo incorrecto: ${typeof price}`;
      } else if (!Number.isInteger(price)) {
        reason = `No es entero: ${price}`;
      } else if (price < 3000) {
        reason = `Muy bajo: ${price}`;
      } else if (price > 500000) {
        reason = `Muy alto: ${price}`;
      } else {
        isValid = true;
      }

      if (isValid) {
        console.log(`   ✅ ${option2} → $${price} MXN`);
        okCount++;
      } else {
        console.log(`   ❌ ${option2} → ${price} (${reason})`);
        failCount++;
        fails.push({
          slug: producto.slug,
          option2: option2,
          priceMXN: price,
          reason: reason
        });
      }
    }
    console.log("");
  }

  console.log("📊 RESUMEN:");
  console.log(`✅ Precios válidos: ${okCount}`);
  console.log(`❌ Precios inválidos: ${failCount}`);
  console.log(`📦 Total variantes: ${totalVariants}`);

  if (failCount > 0) {
    console.log("\n🔧 ERRORES DETECTADOS:");
    fails.forEach(f => {
      console.log(`   • ${f.slug} (${f.option2}): ${f.priceMXN} - ${f.reason}`);
    });
    console.log("\n💡 Ejecuta: npm run fix:prices:bota-alta");
  } else {
    console.log("\n🎉 ¡Todos los precios están correctos!");
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
