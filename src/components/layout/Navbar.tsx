"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const GOOGLE_FORM_URL = "https://forms.gle/REEMPLAZAR_POR_TU_FORM";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="relative w-8 h-8 rounded-full bg-[var(--brand)]/10 ring-2 ring-[var(--brand)] overflow-hidden flex items-center justify-center"
          >
            <Image
              src="/img/logomaster.png"
              alt="Logo Echagüe"
              fill
              sizes="32px"
              className="object-cover"
            />
          </motion.div>
          <motion.span
            className="text-sm font-medium text-[#f6f4f2]"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Vuelta Isla Curupí
          </motion.span>
        </div>

        <ul className="flex items-center gap-8 text-xs tracking-wide text-[#9a9593]">
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
            <motion.a
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="pointer-events-auto inline-flex px-4 py-2 rounded-md bg-[var(--brand)] text-[#0b0b0b] font-medium shadow-[0_0_18px_rgba(17,179,255,0.35)] hover:bg-[var(--brand-600)] transition"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Inscribirme
            </motion.a>
          </li>
        </ul>
      </nav>
      {/* Glow underline */}
      <div className="pointer-events-none h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-40" />
    </header>
  );
}
