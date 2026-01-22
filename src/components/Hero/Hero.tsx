"use client";

import MapMock from "./MapMock";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-start px-6 pt-28 sm:px-8 lg:px-10">
        <div className="w-full max-w-[540px]">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Desafío acuático · Paraná
          </p>

          <h1 className="mt-5 text-[58px] leading-[0.98] font-semibold tracking-tight text-[#f6f4f2] md:text-[72px]">
            <span className="block">Vuelta a la</span>
            <span className="block">Isla Curupí</span>
            <span className="block text-[var(--brand)]">2026</span>
          </h1>

          <p className="mt-6 max-w-[460px] text-[15px] leading-[1.65] text-[#8f8a87]">
            Elegí tu distancia y viví la experiencia. Dos recorridos oficiales
            pensados para todos los niveles: 2 km para iniciarse y 4 km para
            quienes buscan ir un paso más allá. Naturaleza, seguridad y un marco
            único.
          </p>
        </div>
      </div>

      <MapMock />
    </section>
  );
}
