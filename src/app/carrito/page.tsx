'use client';

import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store';
import { formatMXN } from '@/lib/price';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CarritoPage() {
  const { items, removeItem, setQuantity, getSubtotal } = useCartStore();
  
  const subtotal = getSubtotal();
  const shipping = 0; // Envío gratis temporalmente
  const total = subtotal + shipping;

  const onCheckout = async () => {
    if (items.length === 0) return;
    
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({
            sku: i.sku,
            title: i.title,
            priceMXN: i.priceMXN, // number
            quantity: i.quantity,
            size: i.size, // Incluir talla
          })),
          returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/tienda/carrito?status=ok`
        })
      });
      
      if (!res.ok) {
        console.error('Checkout error:', await res.text());
        return;
      }
      
      const data = await res.json(); // { url }
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

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

        {items.length === 0 ? (
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
                  Productos ({items.length})
                </h2>
                
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.sku} className="flex items-center space-x-4 p-4 border border-camel rounded-lg">
                      {/* Imagen */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageUrl ?? "/img/placeholder.png"}
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
                          SKU: {item.sku}
                        </p>
                        {item.size && (
                          <p className="text-sm text-leather-black/80">
                            Talla: {item.size}
                          </p>
                        )}
                      </div>
                      
                      {/* Cantidad */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setQuantity(item.sku, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-camel flex items-center justify-center hover:bg-camel transition-colors"
                        >
                          <Minus className="w-4 h-4 text-espresso" />
                        </button>
                        <span className="w-12 text-center font-medium text-leather-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(item.sku, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-camel flex items-center justify-center hover:bg-camel transition-colors"
                        >
                          <Plus className="w-4 h-4 text-espresso" />
                        </button>
                      </div>
                      
                      {/* Precio */}
                      <div className="text-right">
                        <p className="font-medium text-leather-black">
                          {formatMXN(item.priceMXN * item.quantity)}
                        </p>
                        <p className="text-sm text-camel">
                          {formatMXN(item.priceMXN)} c/u
                        </p>
                      </div>
                      
                      {/* Eliminar */}
                      <button
                        onClick={() => removeItem(item.sku)}
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
                    <span>{formatMXN(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-espresso">
                    <span>Envío</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Gratis</span>
                      ) : (
                        formatMXN(shipping)
                      )}
                    </span>
                  </div>
                  <div className="border-t border-camel pt-4">
                    <div className="flex justify-between text-lg font-medium text-leather-black">
                      <span>Total</span>
                      <span>{formatMXN(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Envío gratis */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">🚚 Envío gratis</span> en todos los pedidos
                  </p>
                </div>

                {/* Botón de checkout */}
                <button
                  onClick={onCheckout}
                  className="w-full bg-saddle text-ivory py-4 rounded-lg font-medium hover:bg-espresso transition-colors inline-flex items-center justify-center"
                >
                  Proceder al Checkout
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>

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
