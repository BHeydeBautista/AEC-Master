"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Fondo blur (NO bloquea clicks) */}
      <div className="pointer-events-none absolute inset-0 bg-[#0b0b0b]/70 backdrop-blur-md" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 sm:py-6">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="pointer-events-auto flex items-center gap-3"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -1 }}
        >
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.26em] text-[#9a9593] leading-none">
              La vuelta a
            </div>
            <div className="mt-1 text-[18px] font-semibold tracking-tight leading-none text-[#f6f4f2]">
              Isla <span className="text-[var(--brand)] italic">Curupí</span>
            </div>
          </div>
        </motion.a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 text-xs tracking-wide text-[#9a9593] sm:flex">
          <li>
            <a
              className="pointer-events-auto hover:text-[var(--brand)] transition-colors"
              href="#reglamento"
            >
              Reglamento
            </a>
          </li>
          <li>
            <a
              className="pointer-events-auto hover:text-[var(--brand)] transition-colors"
              href="#distancias"
            >
              Recorridos
            </a>
          </li>
          <li>
            <a
              className="pointer-events-auto hover:text-[var(--brand)] transition-colors"
              href="#inscripcion"
            >
              Inscripción
            </a>
          </li>
          <li>
            <span
              aria-disabled="true"
              className="pointer-events-none inline-flex px-4 py-2 rounded-md bg-[var(--brand)]/35 text-white/90 font-medium cursor-not-allowed"
            >
              Inscripciones finalizadas
            </span>
          </li>
        </ul>

        {/* Mobile nav */}
        <div className="sm:hidden pointer-events-auto">
          <details className="relative">
            <summary className="list-none select-none rounded-md bg-white/5 px-3 py-2 text-xs font-medium tracking-wide text-[#f6f4f2] ring-1 ring-white/10 cursor-pointer">
              Menú
            </summary>

            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl bg-[#0b0b0b]/95 ring-1 ring-white/10 backdrop-blur-md">
              <a
                className="block px-4 py-3 text-sm text-[#dddcda] hover:bg-white/5"
                href="#reglamento"
              >
                Reglamento
              </a>
              <a
                className="block px-4 py-3 text-sm text-[#dddcda] hover:bg-white/5"
                href="#distancias"
              >
                Recorridos
              </a>
              <a
                className="block px-4 py-3 text-sm text-[#dddcda] hover:bg-white/5"
                href="#inscripcion"
              >
                Inscripción
              </a>
              <span
                aria-disabled="true"
                className="block px-4 py-3 text-sm font-medium text-white/90 bg-[var(--brand)]/35 cursor-not-allowed"
              >
                Inscripciones finalizadas
              </span>
            </div>
          </details>
        </div>
      </nav>

      {/* Glow underline */}
      <div className="pointer-events-none h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-40" />
    </header>
  );
}
