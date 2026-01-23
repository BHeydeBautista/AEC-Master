"use client";

import MapMock from "./MapMock";
import FloatingIsland from "./FloatingIsland";

export default function Hero() {
  return (
    <>
      <section id="hero" className="relative min-h-[200vh] overflow-hidden">
        <div className="sticky top-0 h-screen">
          <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl items-start px-6 pt-28 sm:px-8 lg:px-10">
            <div className="w-full max-w-[540px]">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Atlético Echagüe Club · 1 de Marzo 2026
              </p>

              <h1 className="mt-5 text-[58px] leading-[0.98] font-semibold tracking-tight text-[#f6f4f2] md:text-[72px]">
                <span className="block">Vuelta al</span>
                <span className="block">Islote Curupí</span>
                <span className="block text-[var(--brand)]">2026</span>
              </h1>

              <p className="mt-6 max-w-[460px] text-[15px] leading-[1.65] text-[#8f8a87]">
                Desafiando al Gigante de Agua. Un evento organizado por la Subcomisión
                de Nadadores Máster del Atlético Echagüe Club. Largada en Balneario
                Thompson, llegada en Balneario Municipal. Dos distancias: 2.5 km
                promocional y 5 km competitiva alrededor del Islote Curupí.
              </p>
            </div>
          </div>

          {/* Planeta flotante - solo visible en Hero */}
          <FloatingIsland
            position="absolute"
            className="z-20"
            offsetX={0}
            offsetY={-240}
            width={720}
            height={360}
          />

          <MapMock />
        </div>
      </section>
    </>
  );
}
