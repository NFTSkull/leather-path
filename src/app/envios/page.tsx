import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envíos • Leather Path',
  description: 'Información sobre envíos y entregas.',
};

export default function EnviosPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Envíos</h1>
      <p className="text-gray-600">Contenido próximamente.</p>
    </main>
  );
}

