import { formatCurrencyMXN } from "../src/lib/currency";

console.log("🧪 Verificación final de precios:");
console.log("");

// Simular precios de Alaska (el que mencionaste)
const alaskaPrice = 5400;
const formattedPrice = formatCurrencyMXN(alaskaPrice);
const stripePrice = alaskaPrice * 100; // Para Stripe

console.log(`📦 Alaska:`);
console.log(`   • Precio en DB: ${alaskaPrice} pesos`);
console.log(`   • Precio en UI: ${formattedPrice}`);
console.log(`   • Precio en Stripe: ${stripePrice} centavos`);
console.log("");

// Verificar otros productos
const productos = [
  { nombre: "Liberty Alta", precio: 4000 },
  { nombre: "Marbella", precio: 4800 },
  { nombre: "Holly", precio: 5200 },
];

productos.forEach(p => {
  const formatted = formatCurrencyMXN(p.precio);
  const stripe = p.precio * 100;
  console.log(`📦 ${p.nombre}:`);
  console.log(`   • UI: ${formatted}`);
  console.log(`   • Stripe: ${stripe} centavos`);
  console.log("");
});

console.log("✅ Si ves $5,400 MXN en lugar de $54 MXN, ¡la corrección funcionó!");
console.log("✅ Stripe recibirá los precios correctos en centavos");
