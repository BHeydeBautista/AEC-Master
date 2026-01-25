"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sponsors = [
  { name: "Atlético Echagüe Club", src: "/img/aec.jpeg" },
  { name: "Máster", src: "/img/logomaster.png" },
];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
    >
      <div className="max-w-[720px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Sponsors
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Gracias por hacerlo posible
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          Acompañan y apoyan la Vuelta al Islote Curupí 2026.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl bg-black/10 ring-1 ring-white/8 backdrop-blur-md">

        <div className="grid gap-0 md:grid-cols-2">
          {sponsors.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.015 }}
              className="group relative flex items-center justify-center px-6 py-10 sm:px-8 sm:py-16"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,179,255,0.10),transparent_60%)] opacity-70 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_60%)]" />
              </div>

              <div className="relative h-[120px] w-[300px] max-w-full transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:h-[150px] sm:w-[360px]">
                <Image
                  src={s.src}
                  alt={s.name}
                  fill
                  sizes="(min-width: 768px) 340px, 260px"
                  className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]"
                  priority={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
