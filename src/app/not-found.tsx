import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-display text-leather-black mb-4">404</h1>
          <h2 className="text-2xl font-heading text-espresso mb-4">Página no encontrada</h2>
          <p className="text-lg text-camel mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-saddle text-ivory rounded-lg hover:bg-espresso transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Ir al Inicio
          </Link>
          
          <Link 
            href="/tienda"
            className="inline-flex items-center justify-center px-6 py-3 border border-saddle text-saddle rounded-lg hover:bg-saddle hover:text-ivory transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Ver Tienda
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}



