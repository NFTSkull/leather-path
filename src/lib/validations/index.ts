import { z } from 'zod';

/**
 * Esquemas de validación para productos
 */
export const productSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  gender: z.enum(['hombre', 'mujer', 'unisex']),
  material: z.string().optional(),
  height: z.string().optional(),
  sku: z.string().min(1, 'El SKU es requerido'),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  categoryIds: z.array(z.string()).min(1, 'Al menos una categoría es requerida'),
  collectionIds: z.array(z.string()).optional(),
});

/**
 * Esquema para variantes de productos
 */
export const variantSchema = z.object({
  option1: z.string().optional(), // talla
  option2: z.string().optional(), // color
  priceMXN: z.number().min(0, 'El precio debe ser mayor a 0'),
  compareAtMXN: z.number().optional(),
  stock: z.number().min(0, 'El stock debe ser mayor o igual a 0'),
  sku: z.string().min(1, 'El SKU es requerido'),
});

/**
 * Esquema para imágenes de productos
 */
export const imageSchema = z.object({
  url: z.string().url('URL inválida'),
  alt: z.string().min(1, 'El texto alternativo es requerido'),
  position: z.number().default(0),
});

/**
 * Esquema para el carrito
 */
export const cartItemSchema = z.object({
  variantId: z.string().min(1, 'ID de variante requerido'),
  quantity: z.number().min(1, 'Cantidad mínima es 1').max(10, 'Cantidad máxima es 10'),
  // Campos adicionales para mostrar en el carrito
  productId: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  sku: z.string().optional(),
  priceMXN: z.number().optional(),
  imageUrl: z.string().optional(),
});

/**
 * Esquema para checkout
 */
export const checkoutSchema = z.object({
  customer: z.object({
    email: z.string().email('Email inválido'),
    name: z.string().min(1, 'Nombre requerido'),
    phone: z.string().optional(),
  }),
  shipping: z.object({
    line1: z.string().min(1, 'Dirección requerida'),
    line2: z.string().optional(),
    city: z.string().min(1, 'Ciudad requerida'),
    state: z.string().min(1, 'Estado requerido'),
    postalCode: z.string().min(5, 'Código postal inválido'),
    country: z.string().default('MX'),
  }),
  items: z.array(cartItemSchema).min(1, 'Al menos un producto es requerido'),
});

/**
 * Esquema para filtros de productos
 */
export const productFiltersSchema = z.object({
  category: z.string().optional(),
  collection: z.string().optional(),
  gender: z.enum(['hombre', 'mujer', 'unisex']).optional(),
  material: z.string().optional(),
  height: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc', 'newest']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type VariantFormData = z.infer<typeof variantSchema>;
export type ImageFormData = z.infer<typeof imageSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;
export type ProductFilters = z.infer<typeof productFiltersSchema>;

