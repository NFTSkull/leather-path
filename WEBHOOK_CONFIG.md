# CONFIGURACIÓN DE WEBHOOK STRIPE
# ================================

## Webhook Endpoint Configurado:
- **ID**: `we_1S7mTBFFsnH6MBnJHUJGdhd6`
- **URL**: `https://leather-path.vercel.app/api/stripe/webhook`
- **Secret**: `whsec_Pswc00SZIT99YsZ7JNUOlSNcwuJoSwEx`

## Eventos Configurados:
- ✅ `checkout.session.completed`

## Variables de Entorno para Vercel:
```bash
STRIPE_WEBHOOK_SECRET=whsec_Pswc00SZIT99YsZ7JNUOlSNcwuJoSwEx
```

## Estado del Sistema:
- ✅ **Sitio desplegado**: https://leather-path.vercel.app/
- ✅ **Stripe LIVE**: Configurado
- ✅ **Webhook**: Configurado en Stripe Dashboard
- ⏳ **Pendiente**: Agregar STRIPE_WEBHOOK_SECRET en Vercel
- ⏳ **Pendiente**: Configurar base de datos PostgreSQL

## Próximos Pasos:
1. Agregar STRIPE_WEBHOOK_SECRET en Vercel Dashboard
2. Redeploy el proyecto
3. Configurar base de datos PostgreSQL
4. Probar el flujo completo de checkout

## URLs de Prueba:
- **Sandalias Mujer**: https://leather-path.vercel.app/tienda/mujer/sandalias
- **Producto Individual**: https://leather-path.vercel.app/tienda/producto/hawaii
- **Webhook**: https://leather-path.vercel.app/api/stripe/webhook

