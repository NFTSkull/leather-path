import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NosotrosPage() {
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
            Nuestra Historia
          </h1>
          <p className="text-xl text-espresso max-w-2xl mx-auto">
            Más de tres generaciones dedicadas al arte del cuero y la tradición western.
          </p>
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-leather p-8 mb-8">
            <h2 className="text-2xl font-heading text-leather-black mb-4">
              El Legado de Leather Path
            </h2>
            <p className="text-espresso mb-6">
              Leather Path nació de la pasión por el cuero y la tradición western. Desde nuestros 
              inicios en un pequeño taller familiar, hemos mantenido vivo el arte de la marroquinería 
              artesanal, combinándolo con técnicas modernas y diseños contemporáneos.
            </p>
            <p className="text-espresso mb-6">
              Cada pieza que creamos cuenta una historia: la historia de la tradición mexicana, 
              la elegancia western y el compromiso con la calidad que nos caracteriza. Nuestros 
              maestros artesanos dedican horas de trabajo meticuloso para crear productos que 
              no solo son funcionales, sino verdaderas obras de arte.
            </p>
            <p className="text-espresso">
              Hoy, Leather Path es sinónimo de calidad premium, diseño elegante y tradición 
              western contemporánea. Seguimos comprometidos con nuestros valores fundacionales 
              mientras innovamos para satisfacer las necesidades del cliente moderno.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-leather p-8 mb-8">
            <h2 className="text-2xl font-heading text-leather-black mb-4">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-heading text-saddle mb-2">Artesanía</h3>
                <p className="text-espresso text-sm">
                  Cada pieza es creada a mano con atención al detalle y técnicas tradicionales.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading text-saddle mb-2">Calidad</h3>
                <p className="text-espresso text-sm">
                  Utilizamos solo los mejores materiales y procesos de control de calidad.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading text-saddle mb-2">Tradición</h3>
                <p className="text-espresso text-sm">
                  Honramos las técnicas ancestrales mientras innovamos en diseño.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading text-saddle mb-2">Sostenibilidad</h3>
                <p className="text-espresso text-sm">
                  Comprometidos con prácticas responsables y materiales sostenibles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}



