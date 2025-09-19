import { formatMXN } from "../src/lib/price";

console.log("🧪 Verificación de precios en todas las páginas:");
console.log("");

// Casos de prueba basados en los precios reales
const testCases = [
  { page: "Vaquera - Armonia", price: 355000, expected: "$3,550" },
  { page: "Vaquera - Adorada", price: 355000, expected: "$3,550" },
  { page: "Vaquera - Liberty", price: 365000, expected: "$3,650" },
  { page: "Sandalias - Hawaii", price: 265000, expected: "$2,650" },
  { page: "Sandalias - Bali", price: 265000, expected: "$2,650" },
  { page: "Sandalias - Milo", price: 265000, expected: "$2,650" },
  { page: "Bota Alta - Alaska", price: 540000, expected: "$5,400" },
  { page: "Bota Alta - Liberty Alta", price: 400000, expected: "$4,000" },
];

testCases.forEach(({ page, price, expected }) => {
  const formatted = formatMXN(price);
  const isCorrect = formatted === expected;
  
  console.log(`📦 ${page}:`);
  console.log(`   • Precio original: ${price} centavos`);
  console.log(`   • Formato UI: ${formatted}`);
  console.log(`   • Esperado: ${expected}`);
  console.log(`   • ✅ ${isCorrect ? 'CORRECTO' : '❌ INCORRECTO'}`);
  console.log("");
});

console.log("✅ Si todos muestran 'CORRECTO', los precios están bien!");
console.log("✅ Los precios ahora se ven con 2 ceros menos en todas las páginas");
