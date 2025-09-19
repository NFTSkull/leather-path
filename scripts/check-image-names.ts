import { variantSlug } from "../src/lib/slugifyVariant";

console.log("🔍 Verificando nombres de archivo para productos específicos:");
console.log("");

// Productos específicos mencionados por el usuario
const productos = [
  { slug: "bandida", variant: "negro" },
  { slug: "forajida", variant: "miel" },
  { slug: "gerbera", variant: "miel" },
  { slug: "liberty-alta", variant: "negro" },
  { slug: "maddame", variant: "beige" },
];

productos.forEach(p => {
  const variantSlugResult = variantSlug(p.variant);
  const expectedFilename = `${p.slug}-${variantSlugResult}.png`;
  
  console.log(`📦 ${p.slug} (${p.variant}):`);
  console.log(`   • Variant slug: "${variantSlugResult}"`);
  console.log(`   • Archivo esperado: "${expectedFilename}"`);
  console.log("");
});

console.log("📁 Archivos disponibles en /public/img/products/bota-alta/:");
console.log("   • bandida-negro.png ✅");
console.log("   • forjida-miel.png ✅");
console.log("   • gerbera-miel.png ✅");
console.log("   • liberty-alta-negro.png ✅");
console.log("   • madamme-beige.png ✅");
console.log("");
console.log("🔍 Verificando si hay diferencias en nombres...");
