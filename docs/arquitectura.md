# Arquitectura de Leather Path

## 🏗️ Diagrama de Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │    │   (API Routes)  │    │   Services      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • App Router    │◄──►│ • Route Handlers │◄──►│ • Supabase      │
│ • TypeScript    │    │ • Prisma Client  │    │ • PostgreSQL    │
│ • TailwindCSS   │    │ • Zod Validation│    │ • Auth          │
│ • shadcn/ui     │    │ • Payment Logic │    │ • Storage       │
│ • Zustand       │    │ • Business Logic│    │                 │
│ • React Hook    │    │                 │    │ • Stripe        │
│   Form          │    │                 │    │ • Mercado Pago  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔄 Flujo de Datos

### 1. Catálogo de Productos
```
Usuario → Frontend → API Route → Prisma → Supabase → PostgreSQL
                ↓
            Cache (ISR) ←─── Respuesta ←─── Datos ←───
```

### 2. Carrito de Compras
```
Usuario → Zustand Store → Local Storage
                ↓
            Persistencia Local
```

### 3. Checkout y Pagos
```
Usuario → Frontend → API Route → Payment Provider → External API
                ↓                    ↓
            Validación Zod      Webhook Handler
                ↓                    ↓
            Prisma → Supabase    Order Update
```

## 📦 Módulos Principales

### Frontend (Next.js App Router)

#### Páginas Principales
- **Home** (`/`) - Landing page con hero, colecciones y productos destacados
- **Tienda** (`/tienda`) - Catálogo con filtros y paginación
- **Producto** (`/producto/[slug]`) - Detalle de producto con variantes
- **Carrito** (`/carrito`) - Gestión del carrito de compras
- **Checkout** (`/checkout`) - Proceso de pago en 3 pasos

#### Componentes Clave
- **Header** - Navegación con mega-menú responsive
- **Footer** - Enlaces y información de contacto
- **ProductCard** - Tarjeta de producto con badge de colección
- **CartItem** - Item del carrito con controles de cantidad
- **CheckoutForm** - Formulario de checkout con validación

### Backend (API Routes)

#### Endpoints Principales
```typescript
// Productos
GET /api/productos          // Lista de productos con filtros
GET /api/productos/[slug]    // Detalle de producto
GET /api/categorias          // Categorías y subcategorías
GET /api/colecciones         // Colecciones disponibles

// Carrito y Checkout
POST /api/carrito/agregar    // Agregar producto al carrito
POST /api/checkout/session   // Crear sesión de pago
POST /api/checkout/webhook   // Webhook de confirmación

// Usuario
GET /api/usuario/perfil      // Perfil del usuario
PUT /api/usuario/perfil      // Actualizar perfil
GET /api/usuario/pedidos     // Historial de pedidos
```

### Base de Datos (Prisma + Supabase)

#### Modelos Principales
```prisma
// Catálogo
Product     // Productos con variantes
Category    // Categorías jerárquicas
Collection  // Colecciones de productos
Variant     // Variantes (talla, color, precio)
Image       // Imágenes de productos

// Usuarios y Pedidos
Customer    // Clientes registrados
Address     // Direcciones de envío
Order       // Pedidos completados
OrderItem   // Items de cada pedido
```

### Estado Global (Zustand)

#### Stores Principales
```typescript
// Carrito de Compras
interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  getTotalItems: () => number
  getSubtotal: () => number
}

// Filtros de Productos
interface FilterStore {
  filters: ProductFilters
  setFilter: (key: string, value: any) => void
  clearFilters: () => void
  applyFilters: () => void
}
```

## 🔐 Seguridad

### Validación de Datos
- **Zod** para validación de esquemas en frontend y backend
- Sanitización de inputs en todos los endpoints
- Validación de tipos TypeScript strict

### Autenticación y Autorización
- **Supabase Auth** para autenticación de usuarios
- **RLS (Row Level Security)** en PostgreSQL
- Tokens JWT para sesiones seguras

### Pagos Seguros
- **Stripe** y **Mercado Pago** con webhooks verificados
- Manejo seguro de información de tarjetas
- Validación de transacciones en backend

## ⚡ Rendimiento

### Optimizaciones Frontend
- **Next.js Image** para optimización automática
- **Code-splitting** automático por rutas
- **Lazy loading** de componentes pesados
- **Caché ISR** para páginas de catálogo

### Optimizaciones Backend
- **Prisma** con queries optimizadas
- **Caché Redis** para datos frecuentes
- **Connection pooling** en base de datos
- **Compresión gzip** en respuestas

### SEO y Metadatos
- **Metadata API** de Next.js 14
- **JSON-LD** para structured data
- **Sitemap** automático
- **Open Graph** tags

## 🧪 Testing

### Estrategia de Testing
```typescript
// Unit Tests (Vitest)
- Utilidades (currency, seo, validations)
- Stores de Zustand
- Componentes individuales

// Integration Tests (Playwright)
- Flujo de carrito completo
- Proceso de checkout
- Navegación de catálogo

// E2E Tests
- Compra completa end-to-end
- Gestión de cuenta de usuario
- Panel administrativo
```

## 📊 Monitoreo y Analytics

### Métricas Clave
- **Conversión** de visitantes a compradores
- **Abandono** del carrito
- **Rendimiento** de páginas
- **Errores** de pago

### Herramientas
- **Vercel Analytics** para métricas de rendimiento
- **Google Analytics 4** para comportamiento de usuarios
- **Sentry** para monitoreo de errores
- **Stripe Dashboard** para métricas de pagos

## 🚀 Deployment

### Entornos
- **Development** - Local con hot reload
- **Staging** - Vercel Preview Deployments
- **Production** - Vercel con dominio personalizado

### CI/CD
- **GitHub Actions** para testing automático
- **Vercel** para deployment automático
- **Prisma Migrate** para cambios de base de datos

## 🔄 Migración de Datos

### Estrategia de Migración
```bash
# Desarrollo
npm run db:push          # Aplicar cambios sin migraciones
npm run db:seed          # Sembrar datos de prueba

# Producción
npm run db:migrate       # Ejecutar migraciones
npm run db:deploy        # Deploy del esquema
```

## 📈 Escalabilidad

### Consideraciones Futuras
- **Microservicios** para funcionalidades complejas
- **CDN** para assets estáticos
- **Load balancing** para alta concurrencia
- **Database sharding** para grandes volúmenes
- **Caché distribuido** con Redis Cluster

---

**Leather Path** - Arquitectura Escalable y Mantenible 🏗️

