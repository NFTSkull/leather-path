import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Verificando slugs en la base de datos:");
  console.log("");

  const productos = await prisma.product.findMany({
    where: {
      slug: { in: ["bandida", "forajida", "forjida", "gerbera", "liberty-alta", "maddame", "madamme"] }
    },
    include: {
      variants: true
    },
    orderBy: { slug: "asc" }
  });

  productos.forEach(p => {
    console.log(`📦 ${p.slug}:`);
    p.variants.forEach(v => {
      console.log(`   • ${v.option2} (SKU: ${v.sku})`);
    });
    console.log("");
  });

  console.log("📁 Archivos disponibles:");
  console.log("   • bandida-negro.png");
  console.log("   • forjida-miel.png (no forajida-miel.png)");
  console.log("   • gerbera-miel.png");
  console.log("   • liberty-alta-negro.png");
  console.log("   • madamme-beige.png (no maddame-beige.png)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
