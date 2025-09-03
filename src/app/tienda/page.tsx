import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Filter, Grid, List } from 'lucide-react';

// Datos mock para la tienda
const products = [
  {
    id: '1',
    title: 'Bota Western Becerro',
    subtitle: 'Clásica bota western en becerro premium',
    price: 250000,
    comparePrice: 280000,
    image: 'https://via.placeholder.com/300x300/7A5C3E/FFFFFF?text=Bota+Western',
    collection: 'Línea Normal',
    material: 'becerro',
    gender: 'hombre',
    inStock: true,
    href: '/producto/bota-western-becerro',
  },
  {
    id: '2',
    title: 'Bota Alta Avestruz',
    subtitle: 'Bota alta en piel de avestruz exótica',
    price: 450000,
    image: 'https://via.placeholder.com/300x300/0B0B0C/FFFFFF?text=Bota+Alta+Avestruz',
    collection: 'Piel Exótica',
    material: 'avestruz',
    gender: 'mujer',
    inStock: true,
    href: '/producto/bota-alta-avestruz',
  },
  {
    id: '3',
    title: 'Botín Casual',
    subtitle: 'Botín casual para uso diario',
    price: 180000,
    image: 'https://via.placeholder.com/300x300/D0B08C/000000?text=Botin+Casual',
    collection: 'Casual',
    material: 'normal',
    gender: 'unisex',
    inStock: true,
    href: '/producto/botin-casual',
  },
  {
    id: '4',
    title: 'Tenis Western',
    subtitle: 'Tenis con estilo western',
    price: 120000,
    image: 'https://via.placeholder.com/300x300/7A5C3E/FFFFFF?text=Tenis+Western',
    collection: 'Casual',
    material: 'normal',
    gender: 'hombre',
    inStock: true,
    href: '/producto/tenis-western',
  },
  {
    id: '5',
    title: 'Cinto Becerro',
    subtitle: 'Cinto de becerro premium',
    price: 45000,
    image: 'https://via.placeholder.com/300x300/D0B08C/000000?text=Cinto+Becerro',
    collection: 'Línea Normal',
    material: 'becerro',
    gender: 'hombre',
    inStock: true,
    href: '/producto/cinto-becerro',
  },
  {
    id: '6',
    title: 'Bolsa Tote Cuero',
    subtitle: 'Bolsa tote en cuero premium',
    price: 280000,
    image: 'https://via.placeholder.com/300x300/3E2C21/FFFFFF?text=Bolsa+Tote+Cuero',
    collection: 'Casual',
    material: 'normal',
    gender: 'mujer',
    inStock: true,
    href: '/producto/bolsa-tote-cuero',
  },
  {
    id: '7',
    title: 'Chamarra Western',
    subtitle: 'Chamarra western en cuero',
    price: 350000,
    image: 'https://via.placeholder.com/300x300/7A5C3E/FFFFFF?text=Chamarra+Western',
    collection: 'Línea Normal',
    material: 'normal',
    gender: 'hombre',
    inStock: true,
    href: '/producto/chamarra-western',
  },
  {
    id: '8',
    title: 'Bota Rodeo Fashion',
    subtitle: 'Bota de rodeo con estilo fashion',
    price: 320000,
    image: 'https://via.placeholder.com/300x300/D4AF37/000000?text=Bota+Rodeo+Fashion',
    collection: 'Rodeo Fashion',
    material: 'normal',
    gender: 'mujer',
    inStock: true,
    href: '/producto/bota-rodeo-fashion',
  },
];

const filters = {
  collections: [
    { id: 'piel-exotica', name: 'Piel Exótica', count: 2 },
    { id: 'linea-normal', name: 'Línea Normal', count: 3 },
    { id: 'bota-alta', name: 'Bota Alta', count: 1 },
    { id: 'botines', name: 'Botines', count: 1 },
    { id: 'casual', name: 'Casual', count: 3 },
    { id: 'rodeo-fashion', name: 'Rodeo Fashion', count: 1 },
  ],
  materials: [
    { id: 'normal', name: 'Normal', count: 4 },
    { id: 'becerro', name: 'Becerro', count: 2 },
    { id: 'avestruz', name: 'Avestruz', count: 1 },
    { id: 'cocodrilo', name: 'Cocodrilo', count: 1 },
  ],
  genders: [
    { id: 'hombre', name: 'Hombre', count: 4 },
    { id: 'mujer', name: 'Mujer', count: 3 },
    { id: 'unisex', name: 'Unisex', count: 1 },
  ],
  priceRanges: [
    { id: '0-50000', name: 'Hasta $500', count: 1 },
    { id: '50000-200000', name: '$500 - $2,000', count: 2 },
    { id: '200000-400000', name: '$2,000 - $4,000', count: 3 },
    { id: '400000+', name: 'Más de $4,000', count: 2 },
  ],
};

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display text-leather-black mb-4">
            Tienda
          </h1>
          <p className="text-espresso text-lg">
            Descubre nuestra colección completa de calzado y accesorios de cuero premium.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-leather p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading text-leather-black">Filtros</h2>
                <Filter className="w-5 h-5 text-espresso" />
              </div>

              {/* Colecciones */}
              <div className="mb-6">
                <h3 className="font-medium text-leather-black mb-3">Colecciones</h3>
                <div className="space-y-2">
                  {filters.collections.map((collection) => (
                    <label key={collection.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-saddle border-camel rounded focus:ring-saddle"
                      />
                      <span className="ml-2 text-sm text-espresso">
                        {collection.name}
                      </span>
                      <span className="ml-auto text-xs text-camel">
                        ({collection.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materiales */}
              <div className="mb-6">
                <h3 className="font-medium text-leather-black mb-3">Materiales</h3>
                <div className="space-y-2">
                  {filters.materials.map((material) => (
                    <label key={material.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-saddle border-camel rounded focus:ring-saddle"
                      />
                      <span className="ml-2 text-sm text-espresso">
                        {material.name}
                      </span>
                      <span className="ml-auto text-xs text-camel">
                        ({material.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Género */}
              <div className="mb-6">
                <h3 className="font-medium text-leather-black mb-3">Género</h3>
                <div className="space-y-2">
                  {filters.genders.map((gender) => (
                    <label key={gender.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-saddle border-camel rounded focus:ring-saddle"
                      />
                      <span className="ml-2 text-sm text-espresso">
                        {gender.name}
                      </span>
                      <span className="ml-auto text-xs text-camel">
                        ({gender.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rango de precios */}
              <div className="mb-6">
                <h3 className="font-medium text-leather-black mb-3">Precio</h3>
                <div className="space-y-2">
                  {filters.priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-saddle border-camel rounded focus:ring-saddle"
                      />
                      <span className="ml-2 text-sm text-espresso">
                        {range.name}
                      </span>
                      <span className="ml-auto text-xs text-camel">
                        ({range.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botón limpiar filtros */}
              <button className="w-full bg-saddle text-ivory py-2 rounded-lg hover:bg-espresso transition-colors text-sm">
                Limpiar Filtros
              </button>
            </div>
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-leather p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <span className="text-sm text-espresso">
                    {products.length} productos
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-saddle hover:text-espresso transition-colors">
                      <Grid className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-espresso hover:text-saddle transition-colors">
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="text-sm text-espresso">Ordenar por:</label>
                  <select className="text-sm border border-camel rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-saddle">
                    <option>Más recientes</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                    <option>Nombre: A-Z</option>
                    <option>Nombre: Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-leather hover:shadow-leather-lg transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-square bg-saddle overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Badge de colección */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold text-leather-black px-2 py-1 rounded-full text-xs font-medium">
                        {product.collection}
                      </span>
                    </div>

                    {/* Badge de descuento */}
                    {product.comparePrice && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading text-leather-black text-lg mb-1">
                      {product.title}
                    </h3>
                    <p className="text-espresso text-sm mb-3">
                      {product.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-leather-black">
                          ${(product.price / 100).toLocaleString('es-MX')} MXN
                        </span>
                        {product.comparePrice && (
                          <span className="text-sm text-camel line-through">
                            ${(product.comparePrice / 100).toLocaleString('es-MX')} MXN
                          </span>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-saddle text-ivory py-2 rounded-lg hover:bg-espresso transition-colors font-medium">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-espresso hover:text-saddle transition-colors">
                  Anterior
                </button>
                <button className="px-3 py-2 bg-saddle text-ivory rounded-lg">1</button>
                <button className="px-3 py-2 text-espresso hover:text-saddle transition-colors">2</button>
                <button className="px-3 py-2 text-espresso hover:text-saddle transition-colors">3</button>
                <button className="px-3 py-2 text-espresso hover:text-saddle transition-colors">
                  Siguiente
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
