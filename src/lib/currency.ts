/**
 * Formatea un número como moneda mexicana (MXN)
 * @param amount - Cantidad en centavos
 * @returns String formateado como moneda mexicana
 */
export function formatCurrencyMXN(amount: number): string {
  const pesos = amount / 100;
  
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos);
}

/**
 * Convierte pesos a centavos
 * @param pesos - Cantidad en pesos
 * @returns Cantidad en centavos
 */
export function pesosToCents(pesos: number): number {
  return Math.round(pesos * 100);
}

/**
 * Convierte centavos a pesos
 * @param cents - Cantidad en centavos
 * @returns Cantidad en pesos
 */
export function centsToPesos(cents: number): number {
  return cents / 100;
}

