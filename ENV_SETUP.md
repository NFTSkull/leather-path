# Variables de Entorno - Leather Path

## Configuración Requerida

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Base de datos
DATABASE_URL="postgresql://username:password@localhost:5432/leatherpath"

# Stripe (MXN)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Site
NEXT_PUBLIC_SITE_URL="https://leatherpath.mx"

# Notificaciones (opcionales)
EMAIL_API_KEY=""
WHATSAPP_API_KEY=""

# Supabase (si se usa)
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""
```

## Configuración para Desarrollo Local

Para desarrollo local, puedes usar:

```bash
# Base de datos local
DATABASE_URL="postgresql://postgres:password@localhost:5432/leatherpath"

# Stripe modo test
STRIPE_SECRET_KEY="sk_test_51234567890abcdef"
STRIPE_WEBHOOK_SECRET="whsec_test_1234567890abcdef"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51234567890abcdef"

# Site local
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Notificaciones (placeholders)
EMAIL_API_KEY=""
WHATSAPP_API_KEY=""
```

## Configuración para Producción (HostGator VPS)

```bash
# Base de datos producción
DATABASE_URL="postgresql://usuario:password@localhost:5432/leatherpath_prod"

# Stripe producción
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Site producción
NEXT_PUBLIC_SITE_URL="https://leatherpath.mx"

# Notificaciones producción
EMAIL_API_KEY="tu_api_key_email"
WHATSAPP_API_KEY="tu_api_key_whatsapp"
```

## Notas Importantes

1. **Nunca commites archivos `.env`** - están en `.gitignore`
2. **Usa variables de entorno diferentes** para desarrollo y producción
3. **Stripe MXN** - configura la cuenta para México
4. **Webhook URL** - debe apuntar a `https://leatherpath.mx/api/stripe/webhook`
5. **Base de datos** - asegúrate de que PostgreSQL esté corriendo
6. **Notificaciones** - son opcionales, el sistema funciona sin ellas

## Comandos de Setup

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npm run db:generate

# Aplicar esquema a la base de datos
npm run db:push

# Sembrar datos iniciales
npm run db:seed

# Iniciar desarrollo
npm run dev
```
