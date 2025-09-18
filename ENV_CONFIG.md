# Variables de Entorno - Leather Path

## Configuración del Sitio
```bash
NEXT_PUBLIC_SITE_URL="https://leatherpath.mx"
NEXT_PUBLIC_ASSETS_BASE=""  # Base para assets estáticos
NEXT_PUBLIC_BASE_PATH=""    # Subcarpeta si la app está en /tienda
```

## Base de Datos
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/leatherpath"
```

## Stripe
```bash
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

## APIs de Notificación (Opcional)
```bash
EMAIL_API_KEY=""
WHATSAPP_API_KEY=""
```

## Configuración para HostGator/cPanel

### Opción 1: Assets en docroot (Recomendado)
```bash
NEXT_PUBLIC_ASSETS_BASE=""
```
- Copiar imágenes a: `~/public_html/img/products/sandalias/`
- Las imágenes se sirven desde: `https://leatherpath.mx/img/products/sandalias/`

### Opción 2: App en subcarpeta
```bash
NEXT_PUBLIC_ASSETS_BASE="/tienda"
NEXT_PUBLIC_BASE_PATH="/tienda"
```
- Las imágenes se sirven desde: `https://leatherpath.mx/tienda/img/products/sandalias/`

### Opción 3: CDN externo
```bash
NEXT_PUBLIC_ASSETS_BASE="https://cdn.leatherpath.mx"
```
- Las imágenes se sirven desde: `https://cdn.leatherpath.mx/img/products/sandalias/`

