import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hombre • Leather Path',
  description: 'Descubre nuestra colección de calzado y accesorios para hombre.',
};

export default function HombrePage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Hombre</h1>
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600 mb-4">Colección Hombre</h2>
        <p className="text-gray-500">Contenido próximamente.</p>
      </div>
    </main>
  );
}
