import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto • Leather Path',
  description: 'Información de contacto y ubicación.',
};

export default function ContactoPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <p className="text-gray-600">Contenido próximamente.</p>
    </main>
  );
}
