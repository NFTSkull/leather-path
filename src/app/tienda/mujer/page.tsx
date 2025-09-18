import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mujer • Leather Path',
  description: 'Descubre nuestra colección de calzado y accesorios para mujer.',
};

export default function MujerPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Mujer</h1>
      <div className="text-center py-12">
        <h2 className="text-xl text-gray-600 mb-4">Colección Mujer</h2>
        <p className="text-gray-500">Contenido próximamente.</p>
      </div>
    </main>
  );
}

