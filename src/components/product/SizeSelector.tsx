"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { DEFAULT_SIZE_SET } from "@/lib/sizes";

type Props = {
  value: string | null;
  onChange: (size: string) => void;
  disabled?: boolean;
};

export default function SizeSelector({ value, onChange, disabled }: Props) {
  useEffect(() => {
    // Si no hay talla seleccionada, no autoseleccionamos para obligar al usuario a elegir.
  }, []);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-leather-black">Selecciona tu talla</h3>
      <div className="flex flex-wrap gap-2">
        {DEFAULT_SIZE_SET.map((s) => {
          const active = value === s;
          return (
            <button
              key={s}
              type="button"
              disabled={disabled}
              aria-pressed={active}
              data-selected={active ? "1" : "0"}
              onClick={() => onChange(s)}
              className={clsx(
                "px-3 py-2 rounded-md border text-sm transition-colors",
                active
                  ? "border-leather-black bg-leather-black text-white"
                  : "border-camel bg-white text-leather-black hover:border-espresso",
                disabled && "opacity-60 cursor-not-allowed"
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
      <div className="text-xs text-leather-black/70">
        Rango de referencia: 22–28.5 MEX · 5–11.5 USA · 34–44 EUR
      </div>
    </div>
  );
}
