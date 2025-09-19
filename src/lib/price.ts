/**
 * Utilidades para validación y conversión de precios
 * Mantiene consistencia entre Sandalias, Vaquera y Bota Alta
 */

/**
 * Valida que un precio esté en formato correcto (pesos enteros)
 * @param n Valor a validar
 * @returns Precio validado como número entero
 * @throws Error si el precio no es válido
 */
export function assertPesos(n: unknown): number {
  if (typeof n !== "number") {
    throw new Error(`priceMXN debe ser número, recibido: ${typeof n} (${n})`);
  }
  
  if (!Number.isInteger(n)) {
    throw new Error(`priceMXN debe ser entero, recibido: ${n}`);
  }
  
  if (n < 1) {
    throw new Error(`priceMXN debe ser >= 1, recibido: ${n}`);
  }
  
  if (n > 500000) {
    throw new Error(`priceMXN debe ser <= 500000, recibido: ${n}`);
  }
  
  return n;
}

/**
 * Convierte pesos a centavos para Stripe
 * @param pesos Precio en pesos (entero)
 * @returns Precio en centavos para Stripe
 */
export function toStripeCents(pesos: number): number {
  const validatedPesos = assertPesos(pesos);
  return validatedPesos * 100;
}

/**
 * Convierte centavos de Stripe a pesos
 * @param cents Precio en centavos
 * @returns Precio en pesos
 */
export function fromStripeCents(cents: number): number {
  if (typeof cents !== "number" || !Number.isInteger(cents) || cents < 0) {
    throw new Error(`Cents inválido: ${cents}`);
  }
  return cents / 100;
}

/**
 * Formatea precio para mostrar en UI
 * @param pesos Precio en pesos
 * @returns String formateado (ej. "$4,000")
 */
export function formatPesos(pesos: number): string {
  const validatedPesos = assertPesos(pesos);
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(validatedPesos);
}
