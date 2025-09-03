import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para generar slug a partir del título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  console.log('🌱 Iniciando seed de datos...');

  // Crear categorías principales
  const calzado = await prisma.category.create({
    data: {
      slug: 'calzado',
      name: 'Calzado',
    },
  });

  const accesorios = await prisma.category.create({
    data: {
      slug: 'accesorios',
      name: 'Accesorios',
    },
  });

  const ropa = await prisma.category.create({
    data: {
      slug: 'ropa',
      name: 'Ropa',
    },
  });

  // Crear subcategorías de calzado
  const botas = await prisma.category.create({
    data: {
      slug: 'botas',
      name: 'Botas',
      parentId: calzado.id,
    },
  });

  const botines = await prisma.category.create({
    data: {
      slug: 'botines',
      name: 'Botines',
      parentId: calzado.id,
    },
  });

  const botaAlta = await prisma.category.create({
    data: {
      slug: 'bota-alta',
      name: 'Bota Alta',
      parentId: calzado.id,
    },
  });

  const tenis = await prisma.category.create({
    data: {
      slug: 'tenis',
      name: 'Tenis',
      parentId: calzado.id,
    },
  });

  // Crear subcategorías de accesorios
  const cintos = await prisma.category.create({
    data: {
      slug: 'cintos',
      name: 'Cintos',
      parentId: accesorios.id,
    },
  });

  const bolsas = await prisma.category.create({
    data: {
      slug: 'bolsas',
      name: 'Bolsas',
      parentId: accesorios.id,
    },
  });

  // Crear subcategorías de ropa
  const chamarras = await prisma.category.create({
    data: {
      slug: 'chamarras',
      name: 'Chamarras',
      parentId: ropa.id,
    },
  });

  // Crear colecciones
  const pielExotica = await prisma.collection.create({
    data: {
      slug: 'piel-exotica',
      name: 'Piel Exótica',
    },
  });

  const lineaNormal = await prisma.collection.create({
    data: {
      slug: 'linea-normal',
      name: 'Línea Normal',
    },
  });

  const botaAltaCollection = await prisma.collection.create({
    data: {
      slug: 'bota-alta',
      name: 'Bota Alta',
    },
  });

  const botinesCollection = await prisma.collection.create({
    data: {
      slug: 'botines',
      name: 'Botines',
    },
  });

  const casual = await prisma.collection.create({
    data: {
      slug: 'casual',
      name: 'Casual',
    },
  });

  const rodeoFashion = await prisma.collection.create({
    data: {
      slug: 'rodeo-fashion',
      name: 'Rodeo Fashion',
    },
  });

  // Crear productos demo
  const productos = [
    {
      title: 'Bota Western Becerro',
      subtitle: 'Clásica bota western en becerro premium',
      description: 'Bota western tradicional confeccionada en becerro premium de primera calidad. Suela de cuero con diseño western auténtico.',
      gender: 'hombre',
      material: 'becerro',
      height: 'bota',
      sku: 'BWB-001',
      categoryIds: [botas.id],
      collectionIds: [lineaNormal.id],
      variants: [
        { option1: '7', option2: 'Café', priceMXN: 250000, stock: 5, sku: 'BWB-001-7-CAFE' },
        { option1: '8', option2: 'Café', priceMXN: 250000, stock: 3, sku: 'BWB-001-8-CAFE' },
        { option1: '9', option2: 'Café', priceMXN: 250000, stock: 2, sku: 'BWB-001-9-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/7A5C3E/FFFFFF?text=Bota+Western+Becerro', alt: 'Bota Western Becerro - Vista frontal', position: 0 },
        { url: 'https://via.placeholder.com/600x400/D0B08C/000000?text=Bota+Western+Becerro+Detalle', alt: 'Bota Western Becerro - Detalle de suela', position: 1 },
      ],
    },
    {
      title: 'Bota Alta Avestruz',
      subtitle: 'Bota alta en piel de avestruz exótica',
      description: 'Bota alta de lujo confeccionada en piel de avestruz exótica. Diseño elegante y sofisticado para ocasiones especiales.',
      gender: 'mujer',
      material: 'avestruz',
      height: 'bota-alta',
      sku: 'BAA-001',
      categoryIds: [botaAlta.id],
      collectionIds: [pielExotica.id, botaAltaCollection.id],
      variants: [
        { option1: '6', option2: 'Negro', priceMXN: 450000, stock: 2, sku: 'BAA-001-6-NEGRO' },
        { option1: '7', option2: 'Negro', priceMXN: 450000, stock: 1, sku: 'BAA-001-7-NEGRO' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/0B0B0C/FFFFFF?text=Bota+Alta+Avestruz', alt: 'Bota Alta Avestruz - Vista completa', position: 0 },
        { url: 'https://via.placeholder.com/600x400/1E1A17/FFFFFF?text=Bota+Alta+Avestruz+Detalle', alt: 'Bota Alta Avestruz - Detalle de piel', position: 1 },
      ],
    },
    {
      title: 'Botín Casual',
      subtitle: 'Botín casual para uso diario',
      description: 'Botín casual confortable perfecto para el uso diario. Diseño moderno con acabados de calidad.',
      gender: 'unisex',
      material: 'normal',
      height: 'botín',
      sku: 'BC-001',
      categoryIds: [botines.id],
      collectionIds: [botinesCollection.id, casual.id],
      variants: [
        { option1: '7', option2: 'Café', priceMXN: 180000, stock: 8, sku: 'BC-001-7-CAFE' },
        { option1: '8', option2: 'Café', priceMXN: 180000, stock: 6, sku: 'BC-001-8-CAFE' },
        { option1: '9', option2: 'Café', priceMXN: 180000, stock: 4, sku: 'BC-001-9-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/D0B08C/000000?text=Botin+Casual', alt: 'Botín Casual - Vista lateral', position: 0 },
      ],
    },
    {
      title: 'Tenis Western',
      subtitle: 'Tenis con estilo western',
      description: 'Tenis deportivo con detalles western. Perfecto para combinar estilo y comodidad.',
      gender: 'hombre',
      material: 'normal',
      height: 'tenis',
      sku: 'TW-001',
      categoryIds: [tenis.id],
      collectionIds: [casual.id],
      variants: [
        { option1: '8', option2: 'Café', priceMXN: 120000, stock: 10, sku: 'TW-001-8-CAFE' },
        { option1: '9', option2: 'Café', priceMXN: 120000, stock: 8, sku: 'TW-001-9-CAFE' },
        { option1: '10', option2: 'Café', priceMXN: 120000, stock: 6, sku: 'TW-001-10-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/7A5C3E/FFFFFF?text=Tenis+Western', alt: 'Tenis Western - Vista frontal', position: 0 },
      ],
    },
    {
      title: 'Cinto Becerro',
      subtitle: 'Cinto de becerro premium',
      description: 'Cinto de becerro premium con hebilla western. Diseño clásico y duradero.',
      gender: 'hombre',
      material: 'becerro',
      sku: 'CB-001',
      categoryIds: [cintos.id],
      collectionIds: [lineaNormal.id],
      variants: [
        { option1: '32', option2: 'Café', priceMXN: 45000, stock: 15, sku: 'CB-001-32-CAFE' },
        { option1: '34', option2: 'Café', priceMXN: 45000, stock: 12, sku: 'CB-001-34-CAFE' },
        { option1: '36', option2: 'Café', priceMXN: 45000, stock: 10, sku: 'CB-001-36-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/D0B08C/000000?text=Cinto+Becerro', alt: 'Cinto Becerro - Vista completa', position: 0 },
      ],
    },
    {
      title: 'Bolsa Tote Cuero',
      subtitle: 'Bolsa tote en cuero premium',
      description: 'Bolsa tote elegante confeccionada en cuero premium. Perfecta para uso diario o de oficina.',
      gender: 'mujer',
      material: 'normal',
      sku: 'BTC-001',
      categoryIds: [bolsas.id],
      collectionIds: [casual.id],
      variants: [
        { option1: 'Única', option2: 'Café', priceMXN: 280000, stock: 5, sku: 'BTC-001-UNICA-CAFE' },
        { option1: 'Única', option2: 'Negro', priceMXN: 280000, stock: 3, sku: 'BTC-001-UNICA-NEGRO' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/3E2C21/FFFFFF?text=Bolsa+Tote+Cuero', alt: 'Bolsa Tote Cuero - Vista frontal', position: 0 },
      ],
    },
    {
      title: 'Chamarra Western',
      subtitle: 'Chamarra western en cuero',
      description: 'Chamarra western auténtica confeccionada en cuero premium. Diseño clásico con detalles western.',
      gender: 'hombre',
      material: 'normal',
      sku: 'CW-001',
      categoryIds: [chamarras.id],
      collectionIds: [lineaNormal.id],
      variants: [
        { option1: 'M', option2: 'Café', priceMXN: 350000, stock: 4, sku: 'CW-001-M-CAFE' },
        { option1: 'L', option2: 'Café', priceMXN: 350000, stock: 3, sku: 'CW-001-L-CAFE' },
        { option1: 'XL', option2: 'Café', priceMXN: 350000, stock: 2, sku: 'CW-001-XL-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/7A5C3E/FFFFFF?text=Chamarra+Western', alt: 'Chamarra Western - Vista frontal', position: 0 },
      ],
    },
    {
      title: 'Bota Rodeo Fashion',
      subtitle: 'Bota de rodeo con estilo fashion',
      description: 'Bota de rodeo con diseño fashion para la mujer moderna. Combina tradición western con elegancia contemporánea.',
      gender: 'mujer',
      material: 'normal',
      height: 'bota',
      sku: 'BRF-001',
      categoryIds: [botas.id],
      collectionIds: [rodeoFashion.id],
      variants: [
        { option1: '6', option2: 'Café', priceMXN: 320000, stock: 3, sku: 'BRF-001-6-CAFE' },
        { option1: '7', option2: 'Café', priceMXN: 320000, stock: 2, sku: 'BRF-001-7-CAFE' },
        { option1: '8', option2: 'Café', priceMXN: 320000, stock: 1, sku: 'BRF-001-8-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/D4AF37/000000?text=Bota+Rodeo+Fashion', alt: 'Bota Rodeo Fashion - Vista lateral', position: 0 },
      ],
    },
    {
      title: 'Bota Alta Cocodrilo',
      subtitle: 'Bota alta en piel de cocodrilo',
      description: 'Bota alta de lujo en piel de cocodrilo exótica. Máxima elegancia y exclusividad.',
      gender: 'mujer',
      material: 'cocodrilo',
      height: 'bota-alta',
      sku: 'BAC-001',
      categoryIds: [botaAlta.id],
      collectionIds: [pielExotica.id, botaAltaCollection.id],
      variants: [
        { option1: '7', option2: 'Negro', priceMXN: 850000, stock: 1, sku: 'BAC-001-7-NEGRO' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/0B0B0C/FFFFFF?text=Bota+Alta+Cocodrilo', alt: 'Bota Alta Cocodrilo - Vista completa', position: 0 },
      ],
    },
    {
      title: 'Cinto Mujer',
      subtitle: 'Cinto elegante para mujer',
      description: 'Cinto elegante diseñado especialmente para la mujer. Hebilla decorativa y cuero suave.',
      gender: 'mujer',
      material: 'normal',
      sku: 'CM-001',
      categoryIds: [cintos.id],
      collectionIds: [casual.id],
      variants: [
        { option1: '28', option2: 'Café', priceMXN: 35000, stock: 8, sku: 'CM-001-28-CAFE' },
        { option1: '30', option2: 'Café', priceMXN: 35000, stock: 6, sku: 'CM-001-30-CAFE' },
        { option1: '32', option2: 'Café', priceMXN: 35000, stock: 4, sku: 'CM-001-32-CAFE' },
      ],
      images: [
        { url: 'https://via.placeholder.com/600x400/D0B08C/000000?text=Cinto+Mujer', alt: 'Cinto Mujer - Vista completa', position: 0 },
      ],
    },
  ];

  // Crear productos y sus variantes
  for (const productoData of productos) {
    const { variants, images, categoryIds, collectionIds, ...producto } = productoData;
    
    const product = await prisma.product.create({
      data: {
        ...producto,
        slug: generateSlug(producto.title),
      },
    });

    // Crear variantes
    for (const variantData of variants) {
      await prisma.variant.create({
        data: {
          ...variantData,
          productId: product.id,
        },
      });
    }

    // Crear imágenes
    for (const imageData of images) {
      await prisma.image.create({
        data: {
          ...imageData,
          productId: product.id,
        },
      });
    }

    // Conectar con categorías
    for (const categoryId of categoryIds) {
      await prisma.productCategory.create({
        data: {
          productId: product.id,
          categoryId,
        },
      });
    }

    // Conectar con colecciones
    if (collectionIds) {
      for (const collectionId of collectionIds) {
        await prisma.productCollection.create({
          data: {
            productId: product.id,
            collectionId,
          },
        });
      }
    }
  }

  console.log('✅ Seed completado exitosamente');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
