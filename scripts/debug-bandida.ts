import { PrismaClient } from "@prisma/client";
import { variantSlug } from "../src/lib/slugifyVariant";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Verificando Bandida específicamente:");
  console.log("");

  const bandida = await prisma.product.findUnique({
    where: { slug: "bandida" },
    include: { variants: true }
  });

  if (!bandida) {
    console.log("❌ Bandida no encontrada en la base de datos");
    return;
  }

  console.log(`📦 Producto: ${bandida.slug}`);
  console.log(`📝 Título: ${bandida.title}`);
  console.log("");

  bandida.variants.forEach(v => {
    const variantSlugResult = variantSlug(v.option2);
    const expectedImagePath = `/img/products/bota-alta/${bandida.slug}-${variantSlugResult}.png`;
    
    console.log(`🎨 Variante: ${v.option2}`);
    console.log(`   • SKU: ${v.sku}`);
    console.log(`   • Variant slug: "${variantSlugResult}"`);
    console.log(`   • URL esperada: "${expectedImagePath}"`);
    console.log("");
  });

  console.log("📁 Archivo disponible:");
  console.log("   • bandida-negro.png ✅");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
