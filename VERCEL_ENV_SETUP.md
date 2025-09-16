# CONFIGURACIÓN DE STRIPE PARA VERCEL
# =====================================

# Variables de entorno para Vercel Dashboard:

# Stripe (LIVE - Producción)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Webhook Secret (obtener de Stripe Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_Pswc00SZIT99YsZ7JNUOlSNcwuJoSwEx

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
# 3. Agrega cada variable con su valor:
#    - STRIPE_SECRET_KEY
#    - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
#    - STRIPE_WEBHOOK_SECRET
#    - NEXT_PUBLIC_SITE_URL
# 4. Marca "Production" para todas
# 5. Redeploy el proyecto

# =====================================
# IMPORTANTE:
# =====================================

# - Estas son claves LIVE de Stripe (producción)
# - Webhook configurado: we_1S7mTBFFsnH6MBnJHUJGdhd6
# - URL del webhook: https://leather-path.vercel.app/api/stripe/webhook
# - Eventos: checkout.session.completed
# - Necesitas configurar una base de datos PostgreSQL
# - Los pagos serán REALES una vez configurado
