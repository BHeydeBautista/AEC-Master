"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({
  title,
  children,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx("relative", className)}>
      {/* BOTÓN — TODA LA BARRA CLICKEABLE */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "relative z-20",
          "w-full",
          "flex items-center justify-between",
          "rounded-xl",
          "bg-black/40 backdrop-blur-md",
          "px-5 py-4",
          "text-left text-sm font-medium text-white",
          "ring-1 ring-white/10",
          "transition",
          "active:scale-[0.99]"
        )}
      >
        <span>{title}</span>

        <ChevronDown
          className={clsx(
            "h-5 w-5 shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      {/* CONTENIDO */}
      <div
        className={clsx(
          "overflow-hidden transition-[grid-template-rows,opacity] duration-300",
          open ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <div className="mt-4 rounded-2xl bg-black/30 p-5 ring-1 ring-white/10 backdrop-blur-md space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
