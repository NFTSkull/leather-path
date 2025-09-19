// Script para generar consultas SQL de actualización de precios
// Ejecuta estas consultas directamente en tu base de datos de producción

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

console.log("-- ==========================================");
console.log("-- SCRIPT SQL PARA ACTUALIZAR PRECIOS BOTA ALTA");
console.log("-- ==========================================");
console.log("-- Ejecuta estas consultas en tu base de datos de producción");
console.log("-- Los precios están en centavos (formato Stripe)");
console.log("");

let queryCount = 0;

for (const [productSlug, variants] of Object.entries(preciosBotaAlta)) {
  console.log(`-- 📦 ${productSlug.toUpperCase()}`);
  
  for (const [variantName, priceInCents] of Object.entries(variants)) {
    const normalizedVariant = normalizeVariantName(variantName);
    const priceFormatted = (priceInCents / 100).toFixed(2);
    
    console.log(`UPDATE "Variant" SET "priceMXN" = ${priceInCents} WHERE "productId" = (SELECT id FROM "Product" WHERE slug = '${productSlug}') AND "option2" ILIKE '%${variantName}%'; -- ${variantName} → $${priceFormatted}`);
    queryCount++;
  }
  
  console.log("");
}

console.log("-- ==========================================");
console.log(`-- Total de consultas: ${queryCount}`);
console.log("-- ==========================================");
console.log("");
console.log("-- Para verificar los cambios:");
console.log("SELECT p.slug, v.option2, v.priceMXN, (v.priceMXN / 100.0) as price_dollars");
console.log("FROM \"Product\" p");
console.log("JOIN \"Variant\" v ON p.id = v.\"productId\"");
console.log("WHERE p.slug IN ('liberty-alta', 'bandida', 'gerbera', 'madamme', 'vittoria', 'maya', 'cheyenne', 'barbie', 'forjida', 'gloria', 'catania', 'marbella', 'alaska', 'nevada', 'moana', 'holly', 'samantha')");
console.log("ORDER BY p.slug, v.option2;");
