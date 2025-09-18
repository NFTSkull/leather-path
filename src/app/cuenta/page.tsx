import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft, User, Package, Heart, Settings } from 'lucide-react';

export default function CuentaPage() {
  return (
    <div className="min-h-screen bg-ivory">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-camel hover:text-saddle transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
        </div>
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-leather-black mb-6">
            Mi Cuenta
          </h1>
          <p className="text-xl text-espresso max-w-2xl mx-auto">
            Gestiona tu información personal, pedidos y preferencias.
          </p>
        </div>
        
        {/* Account Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/cuenta/perfil"
            className="bg-white rounded-2xl shadow-leather p-6 hover:shadow-leather-lg transition-shadow text-center group"
          >
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <User className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading text-leather-black text-lg mb-2">
              Perfil
            </h3>
            <p className="text-espresso text-sm">
              Actualiza tu información personal
            </p>
          </Link>
          
          <Link 
            href="/cuenta/pedidos"
            className="bg-white rounded-2xl shadow-leather p-6 hover:shadow-leather-lg transition-shadow text-center group"
          >
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <Package className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading text-leather-black text-lg mb-2">
              Mis Pedidos
            </h3>
            <p className="text-espresso text-sm">
              Revisa el estado de tus compras
            </p>
          </Link>
          
          <Link 
            href="/cuenta/favoritos"
            className="bg-white rounded-2xl shadow-leather p-6 hover:shadow-leather-lg transition-shadow text-center group"
          >
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <Heart className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading text-leather-black text-lg mb-2">
              Favoritos
            </h3>
            <p className="text-espresso text-sm">
              Tus productos guardados
            </p>
          </Link>
          
          <Link 
            href="/cuenta/configuracion"
            className="bg-white rounded-2xl shadow-leather p-6 hover:shadow-leather-lg transition-shadow text-center group"
          >
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
              <Settings className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-heading text-leather-black text-lg mb-2">
              Configuración
            </h3>
            <p className="text-espresso text-sm">
              Preferencias de cuenta
            </p>
          </Link>
        </div>
        
        {/* Login/Register */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-leather p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-heading text-leather-black mb-4">
              ¿No tienes cuenta?
            </h2>
            <p className="text-espresso mb-6">
              Regístrate para acceder a todas las funciones y recibir ofertas exclusivas.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-saddle text-ivory py-3 rounded-lg font-medium hover:bg-espresso transition-colors">
                Iniciar Sesión
              </button>
              <button className="w-full border border-saddle text-saddle py-3 rounded-lg font-medium hover:bg-saddle hover:text-ivory transition-colors">
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}




