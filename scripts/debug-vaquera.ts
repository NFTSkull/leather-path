// scripts/debug-vaquera.ts
import { getPrisma } from "@/lib/prisma";

async function main() {
  const prisma = getPrisma();
  
  console.log("🔍 Verificando productos Vaquera · Damas en DB...");
  
  const rows = await prisma.product.findMany({
    where: { gender: "mujer" },
    select: { 
      id: true, 
      title: true, 
      slug: true, 
      status: true, 
      variants: true
    }
  });
  
  console.log(`\n📊 Encontrados ${rows.length} productos:`);
  console.table(rows.map(r => ({ 
    id: r.id, 
    title: r.title, 
    slug: r.slug, 
    status: r.status, 
    variants: r.variants.length 
  })));
  
  if (rows.length > 0) {
    console.log("\n🔍 Detalles de variantes:");
    rows.forEach(product => {
      console.log(`\n${product.title} (${product.slug}):`);
      product.variants.forEach(variant => {
        console.log(`  - ${variant.option2 || variant.option1 || 'Sin nombre'}: ${variant.sku} | $${(variant.priceMXN / 100).toLocaleString('es-MX')} | Stock: ${variant.stock}`);
      });
    });
  } else {
    console.log("\n❌ No se encontraron productos Vaquera · Damas");
    console.log("💡 Ejecuta: npm run seed:vaquera");
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error("❌ Error:", e);
  process.exit(1);
});
