# CONFIGURACIÓN DE STRIPE PARA VERCEL
# =====================================

# Variables de entorno para Vercel Dashboard:

# Stripe (LIVE - Producción)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Webhook Secret (obtener de Stripe Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_...

# Base de datos
DATABASE_URL=postgresql://...

# URL del sitio
NEXT_PUBLIC_SITE_URL=https://leatherpath.mx

# Notificaciones (opcional)
EMAIL_API_KEY=""
WHATSAPP_API_KEY=""

# =====================================
# INSTRUCCIONES PARA VERCEL:
# =====================================

# 1. Ve a tu proyecto en Vercel Dashboard
# 2. Settings > Environment Variables
# 3. Agrega cada variable con su valor
# 4. Marca "Production" para todas
# 5. Redeploy el proyecto

# =====================================
# IMPORTANTE:
# =====================================

# - Estas son claves LIVE de Stripe (producción)
# - Asegúrate de tener el webhook configurado en Stripe
# - El webhook debe apuntar a: https://tu-dominio.vercel.app/api/stripe/webhook
# - Necesitas configurar una base de datos PostgreSQL
