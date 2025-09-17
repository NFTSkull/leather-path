"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: any; reset: () => void }) {
  useEffect(() => {
    // Log al server (Vercel logs) con toda la info
    // @ts-ignore
    console.error("PDP_SEGMENT_ERROR", {
      message: error?.message,
      stack: error?.stack,
      digest: (error as any)?.digest,
      cause: (error as any)?.cause,
    });
  }, [error]);

  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const debug = params?.has("__debug");

  if (process.env.NEXT_PUBLIC_DEBUG_PDP === "1" || debug) {
    return (
      <pre style={{ whiteSpace: "pre-wrap", padding: 16, fontSize: 12 }}>
        <strong>Digest:</strong> {(error as any)?.digest ?? "n/a"}{"\n"}
        <strong>Message:</strong> {String(error?.message ?? "n/a")}{"\n"}
        <strong>Stack:</strong> {"\n"}{String(error?.stack ?? "n/a")}
      </pre>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Algo salió mal al cargar el producto.</h2>
      <p className="mt-2 text-sm opacity-80">Intenta de nuevo o vuelve a la tienda.</p>
      <button className="mt-4 underline" onClick={() => reset()}>Reintentar</button>
    </div>
  );
}