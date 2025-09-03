import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-leather-black text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-display text-gold mb-4">Leather Path</h3>
            <p className="text-camel mb-6 max-w-md">
              Tienda premium de calzado y accesorios de cuero con estética western elegante. 
              Calidad artesanal y diseño contemporáneo en cada pieza.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-camel hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-camel hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-camel hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-heading text-lg text-gold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tienda" className="text-camel hover:text-ivory transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-camel hover:text-ivory transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-camel hover:text-ivory transition-colors">
                  El Camino del Cuero
                </Link>
              </li>
              <li>
                <Link href="/guia-tallas" className="text-camel hover:text-ivory transition-colors">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="/cuidado-cuero" className="text-camel hover:text-ivory transition-colors">
                  Cuidado del Cuero
                </Link>
              </li>
            </ul>
          </div>

          {/* Atención al cliente */}
          <div>
            <h4 className="font-heading text-lg text-gold mb-4">Atención al Cliente</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/garantia-devoluciones" className="text-camel hover:text-ivory transition-colors">
                  Garantía y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-camel hover:text-ivory transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-camel hover:text-ivory transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-camel hover:text-ivory transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="border-t border-espresso mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gold" />
              <span className="text-camel">info@leatherpath.mx</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gold" />
              <span className="text-camel">+52 (55) 1234-5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="text-camel">Ciudad de México, México</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-espresso mt-8 pt-8 text-center">
          <p className="text-camel text-sm">
            © {new Date().getFullYear()} Leather Path. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
