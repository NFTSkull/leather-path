#!/bin/bash
# Script para copiar imágenes de productos a HostGator/cPanel
# Uso: ./scripts/copy-images-to-hostgator.sh

echo "🚀 Copiando imágenes de productos a HostGator/cPanel..."
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d "public/img/products/sandalias" ]; then
    echo "❌ Error: No se encontró el directorio public/img/products/sandalias"
    echo "   Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

# Crear directorio en public_html si no existe
echo "📁 Creando directorio en public_html..."
mkdir -p ~/public_html/img/products/sandalias

# Copiar imágenes
echo "📋 Copiando imágenes..."
cp public/img/products/sandalias/*.png ~/public_html/img/products/sandalias/

# Verificar que se copiaron
echo ""
echo "✅ Verificando archivos copiados:"
ls -la ~/public_html/img/products/sandalias/

echo ""
echo "🎉 ¡Imágenes copiadas exitosamente!"
echo ""
echo "📋 Archivos esperados:"
echo "   - hawaii-piton-rojo.png"
echo "   - hawaii-piton-natural.png"
echo "   - bali-avestruz-cafe.png"
echo "   - bali-avestruz-negro.png"
echo "   - bali-negro-piton-natural.png"
echo "   - milo-cocodrilo-cafe.png"
echo "   - bora-bora-black-cherry.png"
echo "   - bora-bora-piton-azul-mora.png"
echo "   - mallorca-piton-natural.png"
echo "   - mallorca-piton-conac.png"
echo ""
echo "🌐 Prueba en el navegador:"
echo "   https://TU-DOMINIO/img/products/sandalias/hawaii-piton-rojo.png"
echo ""
echo "⚙️  Configuración recomendada en .env:"
echo "   NEXT_PUBLIC_ASSETS_BASE=\"\""
echo "   NEXT_PUBLIC_SITE_URL=\"https://TU-DOMINIO\""

