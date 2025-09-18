import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog • Leather Path',
  description: 'Blog con consejos sobre cuidado del cuero y moda western.',
};

export default function BlogPage() {
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <p className="text-gray-600">Contenido próximamente.</p>
    </main>
  );
}

