import { PrismaClient } from "@prisma/client";

// Usar DATABASE_URL de Neon directamente
const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Verificando precios Bota Alta después de corrección...\n");

  const productos = await prisma.product.findMany({
    where: {
      categories: { some: { category: { slug: "bota-alta" } } }
    },
    include: {
      variants: true,
      categories: { include: { category: true } }
    },
    orderBy: { slug: "asc" }
  });

  console.log("📊 PRECIOS ACTUALES EN BASE DE DATOS:");
  console.log("┌─────────────────┬─────────────────┬─────────────┬─────────────┐");
  console.log("│ Producto        │ Variante        │ Precio DB   │ Precio UI   │");
  console.log("├─────────────────┼─────────────────┼─────────────┼─────────────┤");

  let totalVariants = 0;
  let validPrices = 0;

  for (const producto of productos) {
    const slug = producto.slug.padEnd(15);
    
    if (!producto.variants || producto.variants.length === 0) {
      console.log(`│ ${slug} │ Sin variantes    │ N/A         │ N/A         │`);
      continue;
    }

    for (const variant of producto.variants) {
      const variantName = (variant.option2 || "Sin nombre").padEnd(15);
      const priceDB = variant.priceMXN?.toString() || "N/A";
      const priceUI = variant.priceMXN ? `$${variant.priceMXN}` : "N/A";
      
      console.log(`│ ${slug} │ ${variantName} │ ${priceDB.padEnd(11)} │ ${priceUI.padEnd(11)} │`);
      
      totalVariants++;
      if (variant.priceMXN && variant.priceMXN >= 3000) {
        validPrices++;
      }
    }
  }

  console.log("└─────────────────┴─────────────────┴─────────────┴─────────────┘");
  console.log(`\n📈 ESTADÍSTICAS:`);
  console.log(`   • Total productos: ${productos.length}`);
  console.log(`   • Total variantes: ${totalVariants}`);
  console.log(`   • Precios válidos (≥$3000): ${validPrices}`);
  console.log(`   • Precios inválidos: ${totalVariants - validPrices}`);

  if (validPrices === totalVariants && totalVariants > 0) {
    console.log(`\n✅ ¡TODOS LOS PRECIOS SON VÁLIDOS!`);
    console.log(`🎯 Los precios están listos para Stripe y la UI`);
  } else if (totalVariants - validPrices > 0) {
    console.log(`\n⚠️  ${totalVariants - validPrices} precios necesitan corrección`);
  }

  console.log(`\n🔗 Verifica en el sitio:`);
  console.log(`   • /tienda/mujer/bota-alta`);
  console.log(`   • /tienda/producto/alaska`);
  console.log(`   • Stripe (botón "Comprar ahora")`);
}

main()
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
