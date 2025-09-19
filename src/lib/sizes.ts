export type SizeSystem = "MEX" | "USA" | "EUR";

export const SIZES_WOMEN_MEX: string[] = [
  "22", "22.5", "23", "23.5", "24", "24.5", "25", "25.5", "26", "26.5", "27", "27.5", "28", "28.5",
];

export const SIZES_WOMEN_USA: string[] = [
  "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5",
];

export const SIZES_WOMEN_EUR: string[] = [
  "34","35","36","37","38","39","40","41","42","43","44",
];

// Por ahora usamos MEX como sistema principal (según arte de la PDP):
export const DEFAULT_SIZE_SET = SIZES_WOMEN_MEX;

export function normalizeSizeLabel(size: string, system: SizeSystem = "MEX") {
  return `Talla ${size} ${system}`;
}
