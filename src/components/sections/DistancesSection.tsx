"use client";

import { motion } from "framer-motion";

export default function DistancesSection() {
  return (
    <section
      id="distancias"
      className="relative z-10 mx-auto min-h-[200vh] max-w-7xl px-6 pb-[90vh] pt-32 sm:min-h-[160vh] sm:px-8 sm:pb-40 sm:pt-36 lg:px-10"
    >
      <div className="w-full max-w-[540px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Circuitos Oficiales
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Elegí tu desafío
        </h2>
        <p className="mt-6 text-[15px] leading-[1.65] text-[#8f8a87]">
          Dos circuitos diseñados para diferentes perfiles: una travesía punto a punto
          para nadadores aficionados y la circunnavegación completa al Islote Curupí
          para federados y experimentados.
        </p>
      </div>

      <div className="mt-16 flex w-full max-w-[540px] flex-col gap-[38rem] sm:gap-[13.5rem] lg:gap-[23rem]">
        {/* 2.5KM */}
        <article
          id="distance2"
          className="sticky top-24 z-20 w-full overflow-hidden rounded-2xl bg-black/20 p-5 ring-1 ring-white/8 backdrop-blur-md sm:static sm:p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(17,179,255,0.18),transparent_55%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Promocional
              </span>
              <span className="rounded-full bg-[var(--brand)]/12 px-3 py-1 text-[11px] font-medium text-[var(--brand)] ring-1 ring-[var(--brand)]/25">
                Recomendada
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[38px] font-semibold leading-none tracking-tight text-[#f6f4f2] sm:text-[44px]">
                2.5
              </span>
              <span className="text-[14px] font-medium text-[#f6f4f2] sm:text-[16px]">km</span>
            </div>

            <p className="mt-4 text-[14px] leading-[1.65] text-[#8f8a87]">
              Travesía punto a punto aprovechando la corriente a favor. Ideal para nadadores
              aficionados y nivel intermedio. Perfecta para la masificación del deporte y
              vivir la experiencia completa.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-[12px] text-[#9a9593]">
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Aficionados
              </span>
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Corriente a favor
              </span>
            </div>
          </div>
        </article>

        {/* 5KM */}
        <motion.article
          id="distance5"
          className="sticky top-24 z-20 w-full overflow-hidden rounded-2xl bg-black/20 p-5 ring-1 ring-white/8 backdrop-blur-md sm:static sm:p-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.10),transparent_55%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Competitiva
              </span>
              <span className="rounded-full bg-white/6 px-3 py-1 text-[11px] font-medium text-[#f6f4f2] ring-1 ring-white/12">
                Federados
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[38px] font-semibold leading-none tracking-tight text-[#f6f4f2] sm:text-[44px]">
                5
              </span>
              <span className="text-[14px] font-medium text-[#f6f4f2] sm:text-[16px]">km</span>
            </div>

            <p className="mt-4 text-[14px] leading-[1.65] text-[#8f8a87]">
              Circunnavegación completa al Islote Curupí, reserva natural protegida. Incluye
              tramo crítico aguas arriba (Boya 1 a Boya 2) frente al Mirador de Puerto
              Sánchez, exigiendo técnica y potencia.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-[12px] text-[#9a9593]">
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Reserva natural
              </span>
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Aguas arriba
              </span>
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Técnica y potencia
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
