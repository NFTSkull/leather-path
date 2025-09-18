import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes • Leather Path',
  description: 'Preguntas frecuentes sobre nuestros productos y servicios.',
};

export default function FaqPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
      <p className="text-gray-600">Contenido próximamente.</p>
    </main>
  );
}

