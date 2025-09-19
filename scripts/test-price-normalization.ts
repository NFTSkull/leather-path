import { normalizePesos, pesosToCents, formatMXN } from "../src/lib/price";

console.log("🧪 Verificación de normalización de precios:");
console.log("");

// Casos de prueba
const testCases = [
  { input: 2650, expected: "pesos normales" },
  { input: 265000, expected: "centavos accidentales" },
  { input: 5400, expected: "pesos normales" },
  { input: 540000, expected: "centavos accidentales" },
  { input: 4000, expected: "pesos normales" },
  { input: 400000, expected: "centavos accidentales" },
];

testCases.forEach(({ input, expected }) => {
  const normalized = normalizePesos(input);
  const cents = pesosToCents(input);
  const formatted = formatMXN(input);
  
  console.log(`📦 Input: ${input} (${expected})`);
  console.log(`   • Normalizado: ${normalized} pesos`);
  console.log(`   • Centavos Stripe: ${cents}`);
  console.log(`   • Formato UI: ${formatted}`);
  console.log("");
});

console.log("✅ Si ves $2,650 en lugar de $265,000, la corrección funcionó!");
console.log("✅ Stripe recibirá los centavos correctos (265000 para $2,650)");
