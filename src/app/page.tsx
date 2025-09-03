import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';

const collections = [
  {
    name: 'Piel Exótica',
    description: 'Lujo y exclusividad en cada pieza',
    image: 'https://via.placeholder.com/400x300/0B0B0C/FFFFFF?text=Piel+Exotica',
    href: '/tienda?collection=piel-exotica',
    badge: 'Exclusivo',
  },
  {
    name: 'Bota Alta',
    description: 'Elegancia y sofisticación',
    image: 'https://via.placeholder.com/400x300/7A5C3E/FFFFFF?text=Bota+Alta',
    href: '/tienda?collection=bota-alta',
    badge: 'Premium',
  },
  {
    name: 'Botines',
    description: 'Comodidad y estilo',
    image: 'https://via.placeholder.com/400x300/D0B08C/000000?text=Botines',
    href: '/tienda?collection=botines',
    badge: 'Casual',
  },
  {
    name: 'Casual',
    description: 'Estilo relajado y moderno',
    image: 'https://via.placeholder.com/400x300/3E2C21/FFFFFF?text=Casual',
    href: '/tienda?collection=casual',
    badge: 'Moderno',
  },
  {
    name: 'Rodeo Fashion',
    description: 'Tradición western contemporánea',
    image: 'https://via.placeholder.com/400x300/D4AF37/000000?text=Rodeo+Fashion',
    href: '/tienda?collection=rodeo-fashion',
    badge: 'Western',
  },
];

const featuredProducts = [
  {
    id: '1',
    title: 'Bota Western Becerro',
    price: 250000,
    image: 'https://via.placeholder.com/300x300/7A5C3E/FFFFFF?text=Bota+Western',
    collection: 'Línea Normal',
    href: '/producto/bota-western-becerro',
  },
  {
    id: '2',
    title: 'Bota Alta Avestruz',
    price: 450000,
    image: 'https://via.placeholder.com/300x300/0B0B0C/FFFFFF?text=Bota+Alta+Avestruz',
    collection: 'Piel Exótica',
    href: '/producto/bota-alta-avestruz',
  },
  {
    id: '3',
    title: 'Botín Casual',
    price: 180000,
    image: 'https://via.placeholder.com/300x300/D0B08C/000000?text=Botin+Casual',
    collection: 'Casual',
    href: '/producto/botin-casual',
  },
  {
    id: '4',
    title: 'Cinto Becerro',
    price: 45000,
    image: 'https://via.placeholder.com/300x300/D0B08C/000000?text=Cinto+Becerro',
    collection: 'Línea Normal',
    href: '/producto/cinto-becerro',
  },
];

const benefits = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En compras mayores a $1,500 MXN',
  },
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: '2 años de garantía en todos nuestros productos',
  },
  {
    icon: Clock,
    title: 'Entrega Rápida',
    description: 'Recibe tu pedido en 2-3 días hábiles',
  },
  {
    icon: Star,
    title: 'Calidad Premium',
    description: 'Cuero de la más alta calidad seleccionado',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-leather-black to-espresso text-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-display text-gold mb-6">
                El Camino del Cuero
              </h1>
              <p className="text-xl text-camel mb-8 max-w-lg">
                Descubre la elegancia western en cada paso. Calzado y accesorios de cuero premium 
                confeccionados con la más alta calidad artesanal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tienda"
                  className="bg-gold text-leather-black px-8 py-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors inline-flex items-center justify-center"
                >
                  Explorar Colección
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/nosotros"
                  className="border border-gold text-gold px-8 py-4 rounded-lg font-medium hover:bg-gold hover:text-leather-black transition-colors inline-flex items-center justify-center"
                >
                  Conoce Nuestra Historia
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-saddle rounded-2xl overflow-hidden">
                <img
                  src="https://via.placeholder.com/600x600/7A5C3E/FFFFFF?text=Leather+Path+Hero"
                  alt="Leather Path - Calzado Premium"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colecciones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-leather-black mb-4">
              Nuestras Colecciones
            </h2>
            <p className="text-espresso text-lg max-w-2xl mx-auto">
              Cada colección cuenta una historia única de tradición, elegancia y artesanía.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.name}
                href={collection.href}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-leather hover:shadow-leather-lg transition-shadow">
                  <div className="aspect-[4/3] bg-saddle">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-leather-black px-3 py-1 rounded-full text-sm font-medium">
                      {collection.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-leather-black/80 to-transparent p-6">
                    <h3 className="text-xl font-heading text-ivory mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-camel text-sm">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-leather-black mb-4">
              Productos Destacados
            </h2>
            <p className="text-espresso text-lg max-w-2xl mx-auto">
              Descubre nuestras piezas más populares, confeccionadas con los mejores materiales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group block bg-white rounded-2xl shadow-leather hover:shadow-leather-lg transition-shadow overflow-hidden"
              >
                <div className="aspect-square bg-saddle overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gold font-medium">
                      {product.collection}
                    </span>
                  </div>
                  <h3 className="font-heading text-leather-black mb-2 group-hover:text-saddle transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-lg font-medium text-leather-black">
                    ${(product.price / 100).toLocaleString('es-MX')} MXN
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/tienda"
              className="bg-saddle text-ivory px-8 py-4 rounded-lg font-medium hover:bg-espresso transition-colors inline-flex items-center"
            >
              Ver Todos los Productos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-leather-black mb-4">
              ¿Por qué elegir Leather Path?
            </h2>
            <p className="text-espresso text-lg max-w-2xl mx-auto">
              Compromiso con la calidad y la satisfacción del cliente en cada detalle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-heading text-leather-black text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-espresso text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-saddle to-espresso text-ivory">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display text-gold mb-6">
            Únete al Camino del Cuero
          </h2>
          <p className="text-xl text-camel mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y sé el primero en conocer nuestras nuevas colecciones 
            y ofertas exclusivas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg text-leather-black focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="bg-gold text-leather-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
