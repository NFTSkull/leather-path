import { upsertProduct } from "./utils/upsertProduct";

// Datos de productos exóticos para mujer
const productosExotica = [
  {
    slug: "joya-piton",
    title: "Joya Pitón",
    subtitle: "Sandalias Joya Pitón con materiales exóticos",
    description: "Sandalias elegantes confeccionadas con piel de pitón auténtica, perfectas para ocasiones especiales.",
    gender: "mujer" as const,
    status: "published" as const,
    categorySlug: "exotica",
    collectionSlug: "ladies",
    variants: [
      {
        option1: "std", // placeholder para talla
        option2: "piton",
        sku: "LP-EX-JOY-PIT-STD",
        priceMXN: 4250,
        stock: 30,
      },
    ],
  },
  {
    slug: "dalila-piton",
    title: "Dalila Pitón",
    subtitle: "Sandalias Dalila Pitón con diseño sofisticado",
    description: "Sandalias de diseño sofisticado con piel de pitón, ideal para la mujer moderna y elegante.",
    gender: "mujer" as const,
    status: "published" as const,
    categorySlug: "exotica",
    collectionSlug: "ladies",
    variants: [
      {
        option1: "std",
        option2: "piton",
        sku: "LP-EX-DAL-PIT-STD",
        priceMXN: 4250,
        stock: 30,
      },
    ],
  },
  {
    slug: "toscana",
    title: "Toscana",
    subtitle: "Sandalias Toscana con materiales exóticos variados",
    description: "Sandalias Toscana disponibles en pitón nobuck y pescado, combinando elegancia y exclusividad.",
    gender: "mujer" as const,
    status: "published" as const,
    categorySlug: "exotica",
    collectionSlug: "ladies",
    variants: [
      {
        option1: "std",
        option2: "piton nobuck",
        sku: "LP-EX-TOS-PNB-STD",
        priceMXN: 4600,
        stock: 30,
      },
      {
        option1: "std",
        option2: "pescado",
        sku: "LP-EX-TOS-PES-STD",
        priceMXN: 6500,
        stock: 30,
      },
    ],
  },
  {
    slug: "alma-pelo-de-vaca",
    title: "Alma Pelo de Vaca",
    subtitle: "Sandalias Alma con pelo de vaca auténtico",
    description: "Sandalias únicas confeccionadas con pelo de vaca auténtico, ofreciendo textura y elegancia natural.",
    gender: "mujer" as const,
    status: "published" as const,
    categorySlug: "exotica",
    collectionSlug: "ladies",
    variants: [
      {
        option1: "std",
        option2: "pelo de vaca",
        sku: "LP-EX-ALM-PDV-STD",
        priceMXN: 4400,
        stock: 30,
      },
    ],
  },
  {
    slug: "bandida-mantarraya",
    title: "Bandida Mantarraya",
    subtitle: "Sandalias Bandida con piel de mantarraya",
    description: "Sandalias exclusivas con piel de mantarraya, perfectas para destacar en cualquier ocasión.",
    gender: "mujer" as const,
    status: "published" as const,
    categorySlug: "exotica",
    collectionSlug: "ladies",
    variants: [
      {
        option1: "std",
        option2: "mantarraya",
        sku: "LP-EX-BAN-MAN-STD",
        priceMXN: 5950,
        stock: 30,
      },
    ],
  },
  {
    slug: "barbie-caiman",
    title: "Barbie Caimán",
    subtitle: "Sandalias Barbie con piel de caimán",
    description: "Sandalias de lujo con piel de caimán auténtica, diseñadas para la mujer que busca exclusividad.",
    gender: "mujer" as const,
    status: "published" as const,
    categorySlug: "exotica",
    collectionSlug: "ladies",
    variants: [
      {
        option1: "std",
        option2: "caiman",
        sku: "LP-EX-BAR-CAI-STD",
        priceMXN: 5250,
        stock: 30,
      },
    ],
  },
];

async function main() {
  console.log("🌿 Iniciando seed de productos Exótica para Mujer...");
  
  let totalCreated = 0;
  let totalVariants = 0;
  
  for (const producto of productosExotica) {
    try {
      console.log(`📦 Procesando: ${producto.title}`);
      
      const result = await upsertProduct(producto);
      console.log(`   ✅ Producto creado/actualizado: ${result.slug}`);
      
      totalCreated++;
      totalVariants += producto.variants.length;
      
    } catch (error) {
      console.error(`   ❌ Error en ${producto.title}:`, error);
    }
  }
  
  console.log("\n🎉 Seed completado:");
  console.log(`   • Productos: ${totalCreated}`);
  console.log(`   • Variantes: ${totalVariants}`);
  console.log(`   • Categoría: exotica`);
  console.log(`   • Colección: ladies`);
  console.log(`   • Género: mujer`);
}

main().catch((error) => {
  console.error("❌ Error en seed:", error);
  process.exit(1);
});
