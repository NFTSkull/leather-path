# 🖼️ Configuración de Imágenes - HostGator/cPanel

## ✅ Implementación Completada

### 🔧 Helper de Assets
- **Archivo**: `src/lib/assets.ts`
- **Función**: `asset(path)` - Genera URLs con base configurable
- **Uso**: `asset('/img/products/sandalias/hawaii-piton-rojo.png')`

### 📁 Estructura de Archivos
```
src/lib/
├── assets.ts          # Helper para URLs de assets
├── images.ts          # Helpers específicos para imágenes (actualizado)
└── slugify.ts         # Conversión de nombres a slugs

scripts/
└── copy-images-to-hostgator.sh  # Script para copiar imágenes
```

## 🚀 Instrucciones para HostGator/cPanel

### Opción 1: Assets en docroot (Recomendado)

**1) Crear directorio:**
```bash
mkdir -p ~/public_html/img/products/sandalias
```

**2) Copiar imágenes:**
```bash
# Si tu app está en ~/apps/leatherpath
cp ~/apps/leatherpath/public/img/products/sandalias/*.png ~/public_html/img/products/sandalias/

# O usar el script incluido
./scripts/copy-images-to-hostgator.sh
```

**3) Verificar:**
```bash
ls -la ~/public_html/img/products/sandalias/
```

**4) Configurar variables de entorno:**
```bash
NEXT_PUBLIC_ASSETS_BASE=""
NEXT_PUBLIC_SITE_URL="https://leatherpath.mx"
```

**5) Probar en navegador:**
```
https://leatherpath.mx/img/products/sandalias/hawaii-piton-rojo.png
```

### Opción 2: App en subcarpeta

**Configuración:**
```bash
NEXT_PUBLIC_ASSETS_BASE="/tienda"
NEXT_PUBLIC_BASE_PATH="/tienda"
```

**URLs resultantes:**
```
https://leatherpath.mx/tienda/img/products/sandalias/hawaii-piton-rojo.png
```

### Opción 3: CDN externo

**Configuración:**
```bash
NEXT_PUBLIC_ASSETS_BASE="https://cdn.leatherpath.mx"
```

**URLs resultantes:**
```
https://cdn.leatherpath.mx/img/products/sandalias/hawaii-piton-rojo.png
```

## 📋 Lista de Archivos Requeridos

**En `~/public_html/img/products/sandalias/`:**
- `hawaii-piton-rojo.png`
- `hawaii-piton-natural.png`
- `bali-avestruz-cafe.png`
- `bali-avestruz-negro.png`
- `bali-negro-piton-natural.png`
- `milo-cocodrilo-cafe.png`
- `bora-bora-black-cherry.png`
- `bora-bora-piton-azul-mora.png`
- `mallorca-piton-natural.png`
- `mallorca-piton-conac.png`

## 🔍 Verificación

### ✅ Checklist de Funcionamiento:
- [ ] URL directa abre la imagen sin 404
- [ ] Recarga la página de sandalias (Ctrl/Cmd + Shift + R)
- [ ] Imágenes se muestran correctamente en tarjetas
- [ ] Imágenes se muestran correctamente en PDP
- [ ] Sin errores 404 en consola del navegador
- [ ] Fallback funciona si falta alguna imagen

### 🛠️ Troubleshooting:

**Si las imágenes no cargan:**
1. Verificar que los archivos existen en `~/public_html/img/products/sandalias/`
2. Verificar permisos: `chmod 644 ~/public_html/img/products/sandalias/*.png`
3. Verificar configuración de `NEXT_PUBLIC_ASSETS_BASE`
4. Verificar que no hay conflicto con `.htaccess`

**Si hay errores 404:**
1. Verificar que las rutas en el código coinciden con los archivos
2. Verificar que no hay caracteres especiales en nombres de archivo
3. Verificar configuración de Apache/Nginx

## 🎯 Beneficios de esta Implementación

✅ **Flexible**: Funciona con cualquier configuración de hosting  
✅ **Robusto**: No se rompe al cambiar estructura de carpetas  
✅ **Mantenible**: Un solo lugar para cambiar configuración de assets  
✅ **Escalable**: Fácil migración a CDN en el futuro  
✅ **Compatible**: Funciona con HostGator, cPanel, Apache, Nginx  

## 🔄 Migración Futura

**Para cambiar a CDN:**
1. Subir imágenes al CDN
2. Cambiar `NEXT_PUBLIC_ASSETS_BASE="https://cdn.example.com"`
3. ¡Listo! Sin cambios de código

**Para cambiar a subcarpeta:**
1. Mover app a `/tienda`
2. Cambiar `NEXT_PUBLIC_BASE_PATH="/tienda"`
3. ¡Listo! URLs se ajustan automáticamente
