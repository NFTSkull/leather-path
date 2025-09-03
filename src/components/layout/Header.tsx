'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';

const navigation = {
  departamentos: [
    {
      name: 'Hombre',
      href: '/tienda?gender=hombre',
      categories: [
        {
          name: 'Calzado',
          href: '/tienda?gender=hombre&category=calzado',
          items: [
            { name: 'Botas', href: '/tienda?gender=hombre&category=botas' },
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
      categories: [
        {
          name: 'Calzado',
          href: '/tienda?gender=mujer&category=calzado',
          items: [
            { name: 'Botas', href: '/tienda?gender=mujer&category=botas' },
            { name: 'Bota Alta', href: '/tienda?gender=mujer&category=bota-alta' },
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
      categories: [
        {
          name: 'Accesorios',
          href: '/tienda?gender=unisex&category=accesorios',
          items: [
            { name: 'Bolsas', href: '/tienda?gender=unisex&category=bolsas' },
          ],
        },
      ],
    },
  ],
  colecciones: [
    { name: 'Piel Exótica', href: '/tienda?collection=piel-exotica' },
    { name: 'Bota Alta', href: '/tienda?collection=bota-alta' },
    { name: 'Botines', href: '/tienda?collection=botines' },
    { name: 'Casual', href: '/tienda?collection=casual' },
    { name: 'Rodeo Fashion', href: '/tienda?collection=rodeo-fashion' },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-white shadow-leather">
      {/* Barra de anuncios */}
      <div className="bg-leather-black text-ivory text-center py-2 text-sm">
        <p>🚚 Envío gratis en compras mayores a $1,500 MXN</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-display text-leather-black">
              Leather Path
            </Link>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.departamentos.map((dept) => (
              <div
                key={dept.name}
                className="relative group"
                onMouseEnter={() => setActiveDepartment(dept.name)}
                onMouseLeave={() => setActiveDepartment(null)}
              >
                <Link
                  href={dept.href}
                  className="text-leather-black hover:text-saddle transition-colors font-medium"
                >
                  {dept.name}
                </Link>

                {/* Mega menú */}
                {activeDepartment === dept.name && (
                  <div className="absolute top-full left-0 w-screen bg-white shadow-leather-lg border-t border-camel z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <div className="grid grid-cols-3 gap-8">
                        {dept.categories.map((category) => (
                          <div key={category.name}>
                            <h3 className="font-heading text-lg text-leather-black mb-4">
                              {category.name}
                            </h3>
                            <ul className="space-y-2">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-espresso hover:text-saddle transition-colors"
                                  >
                                    {item.name}
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

            <div className="relative group">
              <span className="text-leather-black hover:text-saddle transition-colors font-medium cursor-pointer">
                Colecciones
              </span>
              <div className="absolute top-full left-0 bg-white shadow-leather-lg border-t border-camel z-50 min-w-[200px] py-4">
                <ul className="space-y-2">
                  {navigation.colecciones.map((collection) => (
                    <li key={collection.name}>
                      <Link
                        href={collection.href}
                        className="block px-4 py-2 text-espresso hover:text-saddle hover:bg-camel transition-colors"
                      >
                        {collection.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            {/* Buscador */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="pl-10 pr-4 py-2 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle focus:border-transparent"
                />
              </div>
            </div>

            {/* Carrito */}
            <Link href="/carrito" className="relative">
              <ShoppingCart className="w-6 h-6 text-leather-black hover:text-saddle transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-leather-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Cuenta */}
            <Link href="/cuenta">
              <User className="w-6 h-6 text-leather-black hover:text-saddle transition-colors" />
            </Link>

            {/* Menú móvil */}
            <button
              className="lg:hidden"
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
        <div className="lg:hidden bg-white border-t border-camel">
          <div className="px-4 py-6 space-y-4">
            {/* Departamentos móviles */}
            {navigation.departamentos.map((dept) => (
              <div key={dept.name}>
                <Link
                  href={dept.href}
                  className="block text-lg font-medium text-leather-black py-2"
                >
                  {dept.name}
                </Link>
                <div className="ml-4 space-y-2">
                  {dept.categories.map((category) => (
                    <div key={category.name}>
                      <Link
                        href={category.href}
                        className="block text-espresso py-1"
                      >
                        {category.name}
                      </Link>
                      <div className="ml-4 space-y-1">
                        {category.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-sm text-espresso py-1"
                          >
                            {item.name}
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
              <span className="block text-lg font-medium text-leather-black py-2">
                Colecciones
              </span>
              <div className="ml-4 space-y-2">
                {navigation.colecciones.map((collection) => (
                  <Link
                    key={collection.name}
                    href={collection.href}
                    className="block text-espresso py-1"
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Buscador móvil */}
            <div className="pt-4 border-t border-camel">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-espresso w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
