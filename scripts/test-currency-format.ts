import { formatCurrencyMXN } from "../src/lib/currency";

console.log("🧪 Probando formateo de precios:");
console.log("");

const precios = [5400, 4000, 4800, 5200, 4550, 4100, 4250, 3950, 3900, 3800, 3700, 3650];

precios.forEach(precio => {
  const formatted = formatCurrencyMXN(precio);
  console.log(`$${precio} → ${formatted}`);
});

console.log("");
console.log("✅ Si ves $5,400 MXN en lugar de $54 MXN, la corrección funcionó!");
