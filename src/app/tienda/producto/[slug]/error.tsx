"use client";
export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold">Algo salió mal al cargar el producto.</h2>
      <p className="text-sm text-muted-foreground mt-2">Código: {error?.digest ?? "N/D"}</p>
      <a className="underline mt-4 inline-block" href="/tienda/mujer/sandalias">Volver</a>
    </div>
  );
}