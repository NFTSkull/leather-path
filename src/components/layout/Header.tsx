'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Star } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';

const navigation = {
  departamentos: [
    {
      name: 'Hombre',
      href: '/tienda?gender=hombre',
      featured: 'Botas Western',
      categories: [
        {
          name: 'Calzado',
          href: '/tienda?gender=hombre&category=calzado',
          items: [
            { name: 'Botas Western', href: '/tienda?gender=hombre&category=botas', featured: true },
            { name: 'Bota Alta', href: '/tienda?gender=hombre&category=bota-alta' },
            { name: 'Botines', href: '/tienda?gender=hombre&category=botines' },
            { name: 'Tenis', href: '/tienda?gender=hombre&category=tenis' },
          ],
        },
        {
          name: 'Accesorios',
          href: '/tienda?gender=hombre&category=accesorios',
          items: [
            { name: 'Cintos', href: '/tienda?gender=hombre&category=cintos' },
            { name: 'Bolsas', href: '/tienda?gender=hombre&category=bolsas' },
          ],
        },
        {
          name: 'Ropa',
          href: '/tienda?gender=hombre&category=ropa',
          items: [
            { name: 'Chamarras', href: '/tienda?gender=hombre&category=chamarras' },
          ],
        },
      ],
    },
    {
      name: 'Mujer',
      href: '/tienda?gender=mujer',
      featured: 'Bota Alta Exótica',
      categories: [
        {
          name: 'Calzado',
          href: '/tienda?gender=mujer&category=calzado',
          items: [
            { name: 'Bota Alta', href: '/tienda?gender=mujer&category=bota-alta', featured: true },
            { name: 'Botas', href: '/tienda?gender=mujer&category=botas' },
            { name: 'Botines', href: '/tienda?gender=mujer&category=botines' },
            { name: 'Sandalias', href: '/tienda?gender=mujer&category=sandalias' },
          ],
        },
        {
          name: 'Accesorios',
          href: '/tienda?gender=mujer&category=accesorios',
          items: [
            { name: 'Cintos', href: '/tienda?gender=mujer&category=cintos' },
            { name: 'Bolsas', href: '/tienda?gender=mujer&category=bolsas' },
          ],
        },
        {
          name: 'Ropa',
          href: '/tienda?gender=mujer&category=ropa',
          items: [
            { name: 'Chamarras', href: '/tienda?gender=mujer&category=chamarras' },
          ],
        },
      ],
    },
    {
      name: 'Unisex',
      href: '/tienda?gender=unisex',
      featured: 'Accesorios Premium',
      categories: [
        {
          name: 'Accesorios',
          href: '/tienda?gender=unisex&category=accesorios',
          items: [
            { name: 'Bolsas', href: '/tienda?gender=unisex&category=bolsas' },
            { name: 'Cintos', href: '/tienda?gender=unisex&category=cintos' },
          ],
        },
      ],
    },
  ],
  colecciones: [
    { 
      name: 'Piel Exótica', 
      href: '/tienda?collection=piel-exotica',
      description: 'Lujo y exclusividad',
      featured: true
    },
    { 
      name: 'Bota Alta', 
      href: '/tienda?collection=bota-alta',
      description: 'Elegancia western'
    },
    { 
      name: 'Botines', 
      href: '/tienda?collection=botines',
      description: 'Comodidad premium'
    },
    { 
      name: 'Casual', 
      href: '/tienda?collection=casual',
      description: 'Estilo moderno'
    },
    { 
      name: 'Rodeo Fashion', 
      href: '/tienda?collection=rodeo-fashion',
      description: 'Tradición contemporánea'
    },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);
  const [activeCollections, setActiveCollections] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-white shadow-leather-lg border-b border-camel/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-saddle to-espresso rounded-lg flex items-center justify-center shadow-leather">
                <Star className="w-5 h-5 text-gold" />
              </div>
              <span className="text-2xl font-display text-leather-black group-hover:text-saddle transition-colors">
                Leather Path
              </span>
            </Link>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.departamentos.map((dept) => (
              <div
                key={dept.name}
                className="relative group"
                onMouseEnter={() => setActiveDepartment(dept.name)}
                onMouseLeave={() => setActiveDepartment(null)}
              >
                <Link
                  href={dept.href}
                  className="text-leather-black hover:text-saddle transition-colors font-medium py-2 border-b-2 border-transparent hover:border-saddle"
                >
                  {dept.name}
                </Link>

                {/* Mega menú */}
                {activeDepartment === dept.name && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen bg-white shadow-leather-lg border-t border-camel/20 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <div className="grid grid-cols-4 gap-12">
                        {/* Featured Section */}
                        <div className="col-span-1">
                          <div className="bg-gradient-to-br from-saddle/10 to-espresso/10 rounded-2xl p-6 border border-camel/20">
                            <h3 className="font-heading text-xl text-leather-black mb-2">
                              Destacado
                            </h3>
                            <p className="text-espresso text-sm mb-4">
                              {dept.featured}
                            </p>
                            <Link
                              href={dept.href}
                              className="inline-flex items-center text-saddle hover:text-espresso transition-colors font-medium"
                            >
                              Ver Todo
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>

                        {/* Categories */}
                        {dept.categories.map((category) => (
                          <div key={category.name} className="col-span-1">
                            <h3 className="font-heading text-lg text-leather-black mb-4 border-b border-camel/20 pb-2">
                              {category.name}
                            </h3>
                            <ul className="space-y-3">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className={`text-espresso hover:text-saddle transition-colors flex items-center ${
                                      item.featured ? 'font-medium text-saddle' : ''
                                    }`}
                                  >
                                    {item.name}
                                    {item.featured && (
                                      <Star className="w-3 h-3 ml-1 text-gold" />
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Colecciones */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveCollections(true)}
              onMouseLeave={() => setActiveCollections(false)}
            >
              <span className="text-leather-black hover:text-saddle transition-colors font-medium cursor-pointer py-2 border-b-2 border-transparent hover:border-saddle">
                Colecciones
              </span>
              {activeCollections && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-leather-lg border-t border-camel/20 z-50 min-w-[300px] py-6">
                  <div className="px-6">
                    <h3 className="font-heading text-lg text-leather-black mb-4 border-b border-camel/20 pb-2">
                      Colecciones Premium
                    </h3>
                    <ul className="space-y-3">
                      {navigation.colecciones.map((collection) => (
                        <li key={collection.name}>
                          <Link
                            href={collection.href}
                            className={`block py-2 text-espresso hover:text-saddle transition-colors ${
                              collection.featured ? 'font-medium text-saddle' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{collection.name}</span>
                              {collection.featured && (
                                <Star className="w-3 h-3 text-gold" />
                              )}
                            </div>
                            <p className="text-xs text-camel mt-1">
                              {collection.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Acciones */}
          <div className="flex items-center space-x-6">
            {/* Buscador */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="pl-10 pr-4 py-2 border border-camel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle/50 focus:border-saddle bg-camel/5"
                />
              </div>
            </div>

            {/* Carrito */}
            <Link href="/carrito" className="relative group">
              <div className="p-2 rounded-lg group-hover:bg-camel/10 transition-colors">
                <ShoppingCart className="w-6 h-6 text-leather-black group-hover:text-saddle transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-leather-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-leather">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Cuenta */}
            <Link href="/cuenta" className="group">
              <div className="p-2 rounded-lg group-hover:bg-camel/10 transition-colors">
                <User className="w-6 h-6 text-leather-black group-hover:text-saddle transition-colors" />
              </div>
            </Link>

            {/* Menú móvil */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-camel/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-leather-black" />
              ) : (
                <Menu className="w-6 h-6 text-leather-black" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-camel/20 shadow-leather">
          <div className="px-4 py-6 space-y-6">
            {/* Departamentos móviles */}
            {navigation.departamentos.map((dept) => (
              <div key={dept.name}>
                <Link
                  href={dept.href}
                  className="block text-lg font-medium text-leather-black py-3 border-b border-camel/10"
                >
                  {dept.name}
                </Link>
                <div className="ml-4 mt-3 space-y-3">
                  {dept.categories.map((category) => (
                    <div key={category.name}>
                      <Link
                        href={category.href}
                        className="block text-espresso font-medium py-2"
                      >
                        {category.name}
                      </Link>
                      <div className="ml-4 space-y-2">
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`block text-sm text-espresso py-1 ${
                              item.featured ? 'text-saddle font-medium' : ''
                            }`}
                          >
                            {item.name}
                            {item.featured && (
                              <Star className="inline w-3 h-3 ml-1 text-gold" />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Colecciones móviles */}
            <div>
              <span className="block text-lg font-medium text-leather-black py-3 border-b border-camel/10">
                Colecciones
              </span>
              <div className="ml-4 mt-3 space-y-2">
                {navigation.colecciones.map((collection) => (
                  <Link
                    key={collection.name}
                    href={collection.href}
                    className={`block text-espresso py-2 ${
                      collection.featured ? 'text-saddle font-medium' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{collection.name}</span>
                      {collection.featured && (
                        <Star className="w-3 h-3 text-gold" />
                      )}
                    </div>
                    <p className="text-xs text-camel mt-1">
                      {collection.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Buscador móvil */}
            <div className="pt-6 border-t border-camel/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-3 border border-camel/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle/50 focus:border-saddle bg-camel/5"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
