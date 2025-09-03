# Leather Path - Tienda Premium de Cuero

> Tienda en línea premium con estética "buchón elegante" (lujo western), enfocada en botas, pieles exóticas, chamarras, bolsas, cintos, tenis y líneas especiales.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript strict
- **Styling**: TailwindCSS + shadcn/ui (Radix UI)
- **Estado**: Zustand para UI (carrito, filtros, modales)
- **Base de Datos**: Prisma + Supabase (PostgreSQL)
- **Pagos**: Stripe y Mercado Pago (interface agnóstica)
- **Formularios**: React Hook Form + Zod
- **Iconos**: Lucide React

## 🎨 Diseño

### Paleta de Colores
- `leather-black` **#0B0B0C** - Negro cuero
- `charcoal` **#1E1A17** - Carbón
- `espresso` **#3E2C21** - Café expreso
- `saddle` **#7A5C3E** - Silla de montar
- `camel` **#D0B08C** - Camello
- `ivory` **#F4EDE2** - Marfil
- `gold` **#D4AF37** - Oro (accent sutil)

### Tipografías
- **Títulos**: Cinzel (Google Fonts)
- **Subtítulos**: Playfair Display (Google Fonts)
- **Cuerpo**: Inter (Google Fonts)

## 📁 Estructura del Proyecto

```
leather-path/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Rutas públicas
│   │   ├── tienda/            # Catálogo de productos
│   │   ├── carrito/           # Carrito de compras
│   │   ├── checkout/          # Proceso de pago
│   │   ├── cuenta/            # Área de usuario
│   │   ├── admin/             # Panel administrativo
│   │   └── api/               # API Routes
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes shadcn/ui
│   │   ├── layout/           # Header, Footer, etc.
│   │   ├── product/          # Componentes de productos
│   │   └── forms/            # Formularios
│   ├── lib/                  # Utilidades y helpers
│   │   ├── currency.ts       # Formato de moneda MXN
│   │   ├── seo.ts           # Metadatos y JSON-LD
│   │   ├── store.ts         # Zustand stores
│   │   ├── validations/     # Esquemas Zod
│   │   └── payments/        # Proveedores de pago
│   └── data/                # DAOs y acceso a datos
├── prisma/                  # Esquema de base de datos
├── scripts/                 # Scripts de utilidad
│   └── seed.ts             # Datos semilla
└── docs/                   # Documentación
```

## 🛠️ Configuración Inicial

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Base de datos PostgreSQL (Supabase recomendado)

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd leather-path
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```
Editar `.env` con tus credenciales:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/db"
NEXT_PUBLIC_SITE_URL="https://leatherpath.mx"
PAYMENTS_PROVIDER="mock" # stripe | mercadopago | mock
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
MERCADOPAGO_ACCESS_TOKEN=""
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
SHIPPING_FREE_THRESHOLD=150000 # 1500 MXN en centavos
```

4. **Configurar base de datos**
```bash
# Generar cliente Prisma
npm run db:generate

# Aplicar migraciones
npm run db:push

# Sembrar datos de prueba
npm run db:seed
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 📊 Modelos de Datos

### Categorías
- **Departamentos**: Hombre, Mujer, Unisex
- **Categorías**: Calzado, Ropa, Accesorios
- **Subcategorías**: Botas, Botines, Bota Alta, Tenis, Sandalias, Chamarras, Cintos, Bolsas

### Colecciones
- Piel Exótica
- Línea Normal
- Bota Alta
- Botines
- Casual
- Rodeo Fashion

### Productos
- Variantes con talla, color, precio y stock
- Imágenes múltiples con posición
- Atributos: material, altura, género

## 🛍️ Funcionalidades

### Catálogo
- ✅ Listado de productos con filtros
- ✅ Búsqueda por texto
- ✅ Filtros por colección, material, género, precio
- ✅ Ordenamiento múltiple
- ✅ Paginación

### Carrito
- ✅ Agregar/remover productos
- ✅ Modificar cantidades
- ✅ Persistencia local (Zustand)
- ✅ Cálculo de subtotal, envío, impuestos

### Checkout
- ✅ Formulario de envío
- ✅ Métodos de pago (Tarjeta, Transferencia)
- ✅ Validación con Zod
- ✅ Resumen del pedido

### UI/UX
- ✅ Diseño responsive
- ✅ Mega-menú de navegación
- ✅ Paleta de colores personalizada
- ✅ Tipografías premium
- ✅ Micro-animaciones

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run start            # Servidor de producción

# Base de datos
npm run db:generate      # Generar cliente Prisma
npm run db:push          # Aplicar cambios al esquema
npm run db:seed          # Sembrar datos de prueba
npm run db:studio        # Abrir Prisma Studio

# Calidad de código
npm run lint             # ESLint
npm run typecheck        # TypeScript check
```

## 🎯 Próximos Pasos

### Fase 1 - Integración de Pagos
- [ ] Integrar Stripe
- [ ] Integrar Mercado Pago
- [ ] Webhooks de confirmación
- [ ] Manejo de errores de pago

### Fase 2 - Panel Administrativo
- [ ] Autenticación con Supabase Auth
- [ ] CRUD de productos
- [ ] Gestión de inventario
- [ ] Dashboard de ventas

### Fase 3 - Funcionalidades Avanzadas
- [ ] Wishlist
- [ ] Reseñas de productos
- [ ] Newsletter
- [ ] SEO avanzado
- [ ] Analytics

## 📝 Convenciones de Código

### Commits
Usar [Conventional Commits](https://www.conventionalcommits.org/):
```bash
feat: agregar funcionalidad de carrito
fix: corregir cálculo de impuestos
docs: actualizar README
chore: actualizar dependencias
```

### Estructura de Componentes
```typescript
// Componente funcional con TypeScript
interface ComponentProps {
  title: string;
  description?: string;
}

export function Component({ title, description }: ComponentProps) {
  return (
    <div className="bg-white rounded-2xl shadow-leather">
      <h2 className="font-heading text-leather-black">{title}</h2>
      {description && <p className="text-espresso">{description}</p>}
    </div>
  );
}
```

## 🚨 Consideraciones Importantes

### Seguridad
- Validación con Zod en todos los endpoints
- Sanitización de inputs
- RLS (Row Level Security) en Supabase
- Manejo seguro de pagos

### Rendimiento
- Imágenes optimizadas con `next/image`
- Code-splitting automático
- Caché ISR para catálogo
- Lazy loading de componentes

### Accesibilidad
- Etiquetas alt en imágenes
- Roles ARIA apropiados
- Navegación por teclado
- Contraste AA mínimo

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- Email: dev@leatherpath.mx
- Documentación: `/docs`
- Issues: GitHub Issues

---

**Leather Path** - El Camino del Cuero 🐂
