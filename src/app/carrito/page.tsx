'use client';

import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store';
import { formatCurrencyMXN } from '@/lib/currency';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Datos mock para los items del carrito
const cartItems = [
  {
    id: '1',
    variantId: 'variant-1',
    title: 'Bota Western Becerro',
    subtitle: 'Clásica bota western en becerro premium',
    price: 250000,
    image: 'https://via.placeholder.com/150x150/7A5C3E/FFFFFF?text=Bota+Western',
    option1: 'Talla 8',
    option2: 'Café',
    quantity: 1,
  },
  {
    id: '2',
    variantId: 'variant-2',
    title: 'Cinto Becerro',
    subtitle: 'Cinto de becerro premium',
    price: 45000,
    image: 'https://via.placeholder.com/150x150/D0B08C/000000?text=Cinto+Becerro',
    option1: 'Talla 34',
    option2: 'Café',
    quantity: 2,
  },
];

export default function CarritoPage() {
  const { removeItem, updateQuantity } = useCartStore();
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 150000 ? 0 : 15000; // Envío gratis sobre $1,500
  const tax = subtotal * 0.16; // 16% IVA
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header de la página */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display text-leather-black mb-4">
            Carrito de Compras
          </h1>
          <p className="text-espresso text-lg">
            Revisa tus productos antes de proceder al checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Carrito vacío
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-leather p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-heading text-leather-black mb-4">
                Tu carrito está vacío
              </h2>
              <p className="text-espresso mb-8">
                Agrega algunos productos para comenzar tu compra.
              </p>
              <Link
                href="/tienda"
                className="bg-saddle text-ivory px-8 py-4 rounded-lg font-medium hover:bg-espresso transition-colors inline-flex items-center"
              >
                Explorar Productos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-leather p-6">
                <h2 className="text-xl font-heading text-leather-black mb-6">
                  Productos ({cartItems.length})
                </h2>
                
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-camel rounded-lg">
                      {/* Imagen */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading text-leather-black text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-espresso text-sm mb-2">
                          {item.subtitle}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-camel">
                          {item.option1 && (
                            <span>{item.option1}</span>
                          )}
                          {item.option2 && (
                            <span>{item.option2}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Cantidad */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-camel flex items-center justify-center hover:bg-camel transition-colors"
                        >
                          <Minus className="w-4 h-4 text-espresso" />
                        </button>
                        <span className="w-12 text-center font-medium text-leather-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-camel flex items-center justify-center hover:bg-camel transition-colors"
                        >
                          <Plus className="w-4 h-4 text-espresso" />
                        </button>
                      </div>
                      
                      {/* Precio */}
                      <div className="text-right">
                        <p className="font-medium text-leather-black">
                          {formatCurrencyMXN(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-camel">
                          {formatCurrencyMXN(item.price)} c/u
                        </p>
                      </div>
                      
                      {/* Eliminar */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-camel hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-leather p-6 sticky top-8">
                <h2 className="text-xl font-heading text-leather-black mb-6">
                  Resumen del Pedido
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-espresso">
                    <span>Subtotal</span>
                    <span>{formatCurrencyMXN(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-espresso">
                    <span>Envío</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Gratis</span>
                      ) : (
                        formatCurrencyMXN(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-espresso">
                    <span>IVA (16%)</span>
                    <span>{formatCurrencyMXN(tax)}</span>
                  </div>
                  <div className="border-t border-camel pt-4">
                    <div className="flex justify-between text-lg font-medium text-leather-black">
                      <span>Total</span>
                      <span>{formatCurrencyMXN(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Promoción de envío gratis */}
                {shipping > 0 && (
                  <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6">
                    <p className="text-sm text-espresso">
                      <span className="font-medium text-gold">
                        ¡Agrega ${formatCurrencyMXN(150000 - subtotal)} más
                      </span>{' '}
                      para obtener envío gratis
                    </p>
                  </div>
                )}

                {/* Botón de checkout */}
                <Link
                  href="/checkout"
                  className="w-full bg-saddle text-ivory py-4 rounded-lg font-medium hover:bg-espresso transition-colors inline-flex items-center justify-center"
                >
                  Proceder al Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                {/* Enlaces adicionales */}
                <div className="mt-6 text-center">
                  <Link
                    href="/tienda"
                    className="text-sm text-espresso hover:text-saddle transition-colors"
                  >
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
