import { PrismaClient } from "@prisma/client";

// Usar SQLite local para la actualización
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

// Precios de productos Bota Alta (en centavos para Stripe)
const preciosBotaAlta = {
  "liberty-alta": {
    "negro": 400000,    // $4,000.00
    "tabaco": 400000,   // $4,000.00
    "blanca": 400000    // $4,000.00
  },
  "bandida": {
    "negro": 400000     // $4,000.00
  },
  "gerbera": {
    "miel": 380000      // $3,800.00
  },
  "madamme": {
    "beige": 390000,    // $3,900.00
    "negro": 390000     // $3,900.00
  },
  "vittoria": {
    "capuchino": 380000, // $3,800.00
    "tabaco": 380000     // $3,800.00
  },
  "maya": {
    "negro": 380000,     // $3,800.00
    "cafe": 380000       // $3,800.00
  },
  "cheyenne": {
    "beige": 395000,     // $3,950.00
    "cafe": 395000       // $3,950.00
  },
  "barbie": {
    "glam": 390000,      // $3,900.00
    "shedron": 390000    // $3,900.00
  },
  "forjida": {
    "miel": 425000,      // $4,250.00
    "negro": 425000      // $4,250.00
  },
  "gloria": {
    "negro": 365000,     // $3,650.00
    "tabaco": 365000     // $3,650.00
  },
  "catania": {
    "tan": 370000,       // $3,700.00
    "negro": 370000      // $3,700.00
  },
  "marbella": {
    "vino": 480000,      // $4,800.00
    "dorada": 480000     // $4,800.00
  },
  "alaska": {
    "negro": 540000,     // $5,400.00
    "rojo": 540000       // $5,400.00
  },
  "nevada": {
    "negro": 410000,     // $4,100.00
    "miel": 410000,      // $4,100.00
    "blanca": 410000     // $4,100.00
  },
  "moana": {
    "tabaco": 455000,    // $4,550.00
    "negro": 455000      // $4,550.00
  },
  "holly": {
    "miel": 520000       // $5,200.00
  },
  "samantha": {
    "teak": 410000       // $4,100.00
  }
};

// Función para normalizar nombres de variantes
function normalizeVariantName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("🔧 Actualizando precios de productos Bota Alta...\n");

  let updatedCount = 0;
  let errorCount = 0;

  for (const [productSlug, variants] of Object.entries(preciosBotaAlta)) {
    console.log(`📦 Procesando ${productSlug}:`);
    
    try {
      // Buscar el producto
      const product = await prisma.product.findUnique({
        where: { slug: productSlug },
        include: { variants: true }
      });

      if (!product) {
        console.log(`   ❌ Producto ${productSlug} no encontrado`);
        errorCount++;
        continue;
      }

      // Actualizar cada variante
      for (const [variantName, priceInCents] of Object.entries(variants)) {
        const normalizedVariant = normalizeVariantName(variantName);
        
        // Buscar la variante por option2
        const variant = product.variants.find(v => 
          v.option2 && normalizeVariantName(v.option2) === normalizedVariant
        );

        if (variant) {
          await prisma.variant.update({
            where: { id: variant.id },
            data: { priceMXN: priceInCents }
          });
          
          console.log(`   ✅ ${variantName} → $${(priceInCents / 100).toFixed(2)}`);
          updatedCount++;
        } else {
          console.log(`   ⚠️  Variante ${variantName} no encontrada`);
        }
      }
      
    } catch (error) {
      console.log(`   ❌ Error procesando ${productSlug}:`, error);
      errorCount++;
    }
    
    console.log("");
  }

  console.log("📊 RESUMEN:");
  console.log(`✅ Variantes actualizadas: ${updatedCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  
  if (updatedCount > 0) {
    console.log("\n🎉 ¡Precios actualizados correctamente!");
    console.log("💡 Los precios ahora aparecerán correctamente en Stripe");
  }
}

main()
  .catch((error) => {
    console.error("❌ Error general:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
