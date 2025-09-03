'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { formatCurrencyMXN } from '@/lib/currency';
import { ArrowLeft, CreditCard, Truck, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Datos mock para el checkout
const checkoutItems = [
  {
    id: '1',
    title: 'Bota Western Becerro',
    subtitle: 'Clásica bota western en becerro premium',
    price: 250000,
    image: 'https://via.placeholder.com/80x80/7A5C3E/FFFFFF?text=Bota+Western',
    option1: 'Talla 8',
    option2: 'Café',
    quantity: 1,
  },
  {
    id: '2',
    title: 'Cinto Becerro',
    subtitle: 'Cinto de becerro premium',
    price: 45000,
    image: 'https://via.placeholder.com/80x80/D0B08C/000000?text=Cinto+Becerro',
    option1: 'Talla 34',
    option2: 'Café',
    quantity: 2,
  },
];

const subtotal = checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
const shipping = subtotal >= 150000 ? 0 : 15000;
const tax = subtotal * 0.16;
const total = subtotal + shipping + tax;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/carrito"
            className="inline-flex items-center text-espresso hover:text-saddle transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al carrito
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display text-leather-black mb-4">
            Checkout
          </h1>
          <p className="text-espresso text-lg">
            Completa tu información para finalizar la compra.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-leather p-6 mb-6">
              {/* Pasos */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-saddle text-ivory' : 'bg-camel text-espresso'
                  }`}>
                    1
                  </div>
                  <span className={`ml-2 text-sm ${step >= 1 ? 'text-leather-black' : 'text-espresso'}`}>
                    Información de Envío
                  </span>
                </div>
                <div className="flex-1 h-px bg-camel mx-4"></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-saddle text-ivory' : 'bg-camel text-espresso'
                  }`}>
                    2
                  </div>
                  <span className={`ml-2 text-sm ${step >= 2 ? 'text-leather-black' : 'text-espresso'}`}>
                    Pago
                  </span>
                </div>
                <div className="flex-1 h-px bg-camel mx-4"></div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? 'bg-saddle text-ivory' : 'bg-camel text-espresso'
                  }`}>
                    3
                  </div>
                  <span className={`ml-2 text-sm ${step >= 3 ? 'text-leather-black' : 'text-espresso'}`}>
                    Confirmación
                  </span>
                </div>
              </div>

              {/* Paso 1: Información de envío */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-heading text-leather-black mb-6">
                    Información de Envío
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                        placeholder="(55) 1234-5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Código postal
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                        placeholder="12345"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                        placeholder="Calle y número"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                        placeholder="Ciudad de México"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-leather-black mb-2">
                        Estado
                      </label>
                      <select className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle">
                        <option>Selecciona un estado</option>
                        <option>Ciudad de México</option>
                        <option>Estado de México</option>
                        <option>Jalisco</option>
                        <option>Nuevo León</option>
                        <option>Querétaro</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="bg-saddle text-ivory px-8 py-3 rounded-lg font-medium hover:bg-espresso transition-colors"
                    >
                      Continuar al Pago
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 2: Pago */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-heading text-leather-black mb-6">
                    Método de Pago
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border border-camel rounded-lg cursor-pointer hover:bg-camel/5">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-saddle border-camel focus:ring-saddle"
                      />
                      <CreditCard className="w-5 h-5 text-espresso ml-3" />
                      <span className="ml-3 text-leather-black">Tarjeta de crédito/débito</span>
                    </label>
                    
                    <label className="flex items-center p-4 border border-camel rounded-lg cursor-pointer hover:bg-camel/5">
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-saddle border-camel focus:ring-saddle"
                      />
                      <Truck className="w-5 h-5 text-espresso ml-3" />
                      <span className="ml-3 text-leather-black">Transferencia bancaria</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-leather-black mb-2">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-leather-black mb-2">
                            Fecha de vencimiento
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-leather-black mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-leather-black mb-2">
                          Nombre del titular
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-camel rounded-lg focus:outline-none focus:ring-2 focus:ring-saddle"
                          placeholder="Nombre como aparece en la tarjeta"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-espresso hover:text-saddle transition-colors"
                    >
                      ← Volver
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-saddle text-ivory px-8 py-3 rounded-lg font-medium hover:bg-espresso transition-colors"
                    >
                      Confirmar Pago
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 3: Confirmación */}
              {step === 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-heading text-leather-black mb-4">
                    ¡Pago Exitoso!
                  </h2>
                  <p className="text-espresso mb-8">
                    Tu pedido ha sido procesado correctamente. Recibirás un correo de confirmación pronto.
                  </p>
                  <div className="space-y-4">
                    <Link
                      href="/cuenta/pedidos"
                      className="bg-saddle text-ivory px-8 py-3 rounded-lg font-medium hover:bg-espresso transition-colors inline-block"
                    >
                      Ver Mis Pedidos
                    </Link>
                    <div>
                      <Link
                        href="/tienda"
                        className="text-espresso hover:text-saddle transition-colors"
                      >
                        Continuar Comprando
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-leather p-6 sticky top-8">
              <h2 className="text-xl font-heading text-leather-black mb-6">
                Resumen del Pedido
              </h2>
              
              {/* Productos */}
              <div className="space-y-4 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-leather-black text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-camel">
                        {item.option1} • {item.option2} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-leather-black">
                      {formatCurrencyMXN(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="border-t border-camel pt-4 space-y-2">
                <div className="flex justify-between text-sm text-espresso">
                  <span>Subtotal</span>
                  <span>{formatCurrencyMXN(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-espresso">
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Gratis</span>
                    ) : (
                      formatCurrencyMXN(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-espresso">
                  <span>IVA (16%)</span>
                  <span>{formatCurrencyMXN(tax)}</span>
                </div>
                <div className="border-t border-camel pt-2">
                  <div className="flex justify-between font-medium text-leather-black">
                    <span>Total</span>
                    <span>{formatCurrencyMXN(total)}</span>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="mt-6 p-4 bg-camel/10 rounded-lg">
                <h3 className="font-medium text-leather-black text-sm mb-2">
                  Información importante
                </h3>
                <ul className="text-xs text-espresso space-y-1">
                  <li>• Envío en 2-3 días hábiles</li>
                  <li>• Garantía de 2 años</li>
                  <li>• Devoluciones en 30 días</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
