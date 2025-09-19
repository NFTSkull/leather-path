// src/lib/price.ts
/**
 * Normaliza un valor que puede venir en pesos (ej. 2650)
 * o en centavos por error (ej. 265000). Devuelve SIEMPRE pesos enteros.
 */
export function normalizePesos(input: number): number {
  if (input == null || Number.isNaN(input)) return 0;

  // Heurística: si es muy grande asumimos que ya venía en centavos.
  // (p.ej. 265000 -> 2650)
  if (input >= 100000) {
    return Math.round(input / 100);
  }
  return Math.round(input);
}

/** Convierte un valor (pesos o centavos "accidentales") a centavos Stripe */
export function pesosToCents(input: number): number {
  const pesos = normalizePesos(input);
  return pesos * 100;
}

/** Formatea a MXN para UI (pesos enteros) */
export function formatMXN(input: number): string {
  const pesos = normalizePesos(input);
  return pesos.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}