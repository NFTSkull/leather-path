'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Star } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { NAV } from '@/config/navigation';

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
            {/* Mujer */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('mujer')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <Link
                href={NAV.mujer.href}
                className="text-leather-black hover:text-saddle transition-colors font-medium py-2 border-b-2 border-transparent hover:border-saddle"
              >
                {NAV.mujer.label}
              </Link>

              {/* Mega menú Mujer */}
              {activeDepartment === 'mujer' && (
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
                            Sandalias Ladies
                          </p>
                          <Link
                            href={NAV.mujer.href}
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
                      {NAV.mujer.columns.map((column) => (
                        <div key={column.title} className="col-span-1">
                          <h3 className="font-heading text-lg text-leather-black mb-4 border-b border-camel/20 pb-2">
                            {column.title}
                          </h3>
                          <ul className="space-y-3">
                            {column.links.map((link) => (
                              <li key={link.label}>
                                {link.disabled ? (
                                  <span className="text-camel cursor-not-allowed flex items-center opacity-60">
                                    {link.label}
                                    <span className="ml-2 text-xs">(Próximamente)</span>
                                  </span>
                                ) : (
                                  <Link
                                    href={link.href}
                                    className="text-espresso hover:text-saddle transition-colors flex items-center"
                                  >
                                    {link.label}
                                    {link.label === 'Sandalias' && (
                                      <Star className="w-3 h-3 ml-1 text-gold" />
                                    )}
                                  </Link>
                                )}
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

            {/* Hombre */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDepartment('hombre')}
              onMouseLeave={() => setActiveDepartment(null)}
            >
              <Link
                href={NAV.hombre.href}
                className="text-leather-black hover:text-saddle transition-colors font-medium py-2 border-b-2 border-transparent hover:border-saddle"
              >
                {NAV.hombre.label}
              </Link>

              {/* Mega menú Hombre */}
              {activeDepartment === 'hombre' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen bg-white shadow-leather-lg border-t border-camel/20 z-50">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-3 gap-12">
                      {/* Categories */}
                      {NAV.hombre.columns.map((column) => (
                        <div key={column.title} className="col-span-1">
                          <h3 className="font-heading text-lg text-leather-black mb-4 border-b border-camel/20 pb-2">
                            {column.title}
                          </h3>
                          <ul className="space-y-3">
                            {column.links.map((link) => (
                              <li key={link.label}>
                                <span className="text-camel cursor-not-allowed flex items-center opacity-60">
                                  {link.label}
                                  <span className="ml-2 text-xs">(Próximamente)</span>
                                </span>
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
                      <li>
                        <Link
                          href="/tienda/mujer/sandalias"
                          className="block py-2 text-saddle hover:text-espresso transition-colors font-medium"
                        >
                          <div className="flex items-center justify-between">
                            <span>Ladies</span>
                            <Star className="w-3 h-3 text-gold" />
                          </div>
                          <p className="text-xs text-camel mt-1">
                            Sandalias exóticas para mujer
                          </p>
                        </Link>
                      </li>
                      <li>
                        <span className="block py-2 text-camel cursor-not-allowed opacity-60">
                          <div className="flex items-center justify-between">
                            <span>Piel Exótica</span>
                            <span className="text-xs">(Próximamente)</span>
                          </div>
                          <p className="text-xs text-camel mt-1">
                            Lujo y exclusividad
                          </p>
                        </span>
                      </li>
                      <li>
                        <span className="block py-2 text-camel cursor-not-allowed opacity-60">
                          <div className="flex items-center justify-between">
                            <span>Casual</span>
                            <span className="text-xs">(Próximamente)</span>
                          </div>
                          <p className="text-xs text-camel mt-1">
                            Estilo moderno
                          </p>
                        </span>
                      </li>
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
            {/* Mujer móvil */}
            <div>
              <Link
                href={NAV.mujer.href}
                className="block text-lg font-medium text-leather-black py-3 border-b border-camel/10"
              >
                {NAV.mujer.label}
              </Link>
              <div className="ml-4 mt-3 space-y-3">
                {NAV.mujer.columns.map((column) => (
                  <div key={column.title}>
                    <span className="block text-espresso font-medium py-2">
                      {column.title}
                    </span>
                    <div className="ml-4 space-y-2">
                      {column.links.map((link) => (
                        <div key={link.label}>
                          {link.disabled ? (
                            <span className="block text-sm text-camel py-1 opacity-60">
                              {link.label} (Próximamente)
                            </span>
                          ) : (
                            <Link
                              href={link.href}
                              className={`block text-sm text-espresso py-1 ${
                                link.label === 'Sandalias' ? 'text-saddle font-medium' : ''
                              }`}
                            >
                              {link.label}
                              {link.label === 'Sandalias' && (
                                <Star className="inline w-3 h-3 ml-1 text-gold" />
                              )}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hombre móvil */}
            <div>
              <Link
                href={NAV.hombre.href}
                className="block text-lg font-medium text-leather-black py-3 border-b border-camel/10"
              >
                {NAV.hombre.label}
              </Link>
              <div className="ml-4 mt-3 space-y-3">
                {NAV.hombre.columns.map((column) => (
                  <div key={column.title}>
                    <span className="block text-espresso font-medium py-2">
                      {column.title}
                    </span>
                    <div className="ml-4 space-y-2">
                      {column.links.map((link) => (
                        <span
                          key={link.label}
                          className="block text-sm text-camel py-1 opacity-60"
                        >
                          {link.label} (Próximamente)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colecciones móviles */}
            <div>
              <span className="block text-lg font-medium text-leather-black py-3 border-b border-camel/10">
                Colecciones
              </span>
              <div className="ml-4 mt-3 space-y-2">
                <Link
                  href="/tienda/mujer/sandalias"
                  className="block text-saddle font-medium py-2"
                >
                  <div className="flex items-center justify-between">
                    <span>Ladies</span>
                    <Star className="w-3 h-3 text-gold" />
                  </div>
                  <p className="text-xs text-camel mt-1">
                    Sandalias exóticas para mujer
                  </p>
                </Link>
                <span className="block text-camel py-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span>Piel Exótica</span>
                    <span className="text-xs">(Próximamente)</span>
                  </div>
                  <p className="text-xs text-camel mt-1">
                    Lujo y exclusividad
                  </p>
                </span>
                <span className="block text-camel py-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span>Casual</span>
                    <span className="text-xs">(Próximamente)</span>
                  </div>
                  <p className="text-xs text-camel mt-1">
                    Estilo moderno
                  </p>
                </span>
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
