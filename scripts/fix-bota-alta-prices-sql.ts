// Script para generar consultas SQL de corrección de precios Bota Alta
// Ejecuta estas consultas directamente en tu base de datos de producción

const preciosCorrectos = {
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

console.log("-- ==========================================");
console.log("-- CORRECCIÓN DE PRECIOS BOTA ALTA");
console.log("-- ==========================================");
console.log("-- Ejecuta estas consultas en tu base de datos de producción");
console.log("-- Los precios están en pesos enteros (formato correcto)");
console.log("");

let totalQueries = 0;

for (const [slug, precioPesos] of Object.entries(preciosCorrectos)) {
  console.log(`-- 📦 ${slug.toUpperCase()} → $${precioPesos}`);
  
  const query = `UPDATE "Variant" SET "priceMXN" = ${precioPesos} WHERE "productId" = (SELECT id FROM "Product" WHERE slug = '${slug}');`;
  console.log(query);
  console.log("");
  
  totalQueries++;
}

console.log("-- ==========================================");
console.log(`-- Total de consultas: ${totalQueries}`);
console.log("-- ==========================================");
console.log("");
console.log("-- Para verificar los cambios:");
console.log("SELECT p.slug, p.title, v.option2, v.priceMXN");
console.log("FROM \"Product\" p");
console.log("JOIN \"Variant\" v ON p.id = v.\"productId\"");
console.log("WHERE p.slug IN ('liberty-alta', 'bandida', 'gerbera', 'madamme', 'vittoria', 'maya', 'cheyenne', 'barbie', 'forjida', 'gloria', 'catania', 'marbella', 'alaska', 'nevada', 'moana', 'holly', 'samantha')");
console.log("ORDER BY p.slug, v.option2;");
console.log("");
console.log("-- Después de ejecutar, verifica en:");
console.log("-- 1. /tienda/mujer/bota-alta (lista de productos)");
console.log("-- 2. /tienda/producto/alaska (PDP específico)");
console.log("-- 3. Stripe (botón 'Comprar ahora')");
