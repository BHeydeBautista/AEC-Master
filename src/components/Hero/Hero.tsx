"use client";

import MapMock from "./MapMock";
import FloatingIsland from "./FloatingIsland";
import SponsorsBar from "../layout/SponsorsBar";

export default function Hero() {
  return (
    <>
      <section id="hero" className="relative min-h-[200vh] overflow-hidden">
        <div className="sticky top-0 h-screen">
          <div className="relative z-50 mx-auto flex min-h-[100dvh] max-w-7xl items-start px-6 pt-24 sm:px-8 sm:pt-28 lg:px-10">
            <div className="w-full max-w-[540px]">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Atlético Echagüe Club · 1 de Marzo 2026
              </p>

              <h1 className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-tight text-[#f6f4f2] sm:text-[58px] md:text-[72px]">
                <span className="block">Vuelta al</span>
                <span className="block">Islote Curupí</span>
                <span className="block text-[var(--brand)]">2026</span>
              </h1>

              <p className="mt-5 max-w-[460px] text-[13px] leading-[1.55] text-[#8f8a87] sm:mt-6 sm:text-[15px] sm:leading-[1.65]">
                Desafiando al Gigante de Agua. Un evento organizado por la Subcomisión
                de Nadadores Máster del Atlético Echagüe Club. Largada en Balneario
                Thompson, llegada en Balneario Municipal. Dos distancias: 2.5 km
                promocional y 5 km competitiva alrededor del Islote Curupí.
              </p>
            </div>
          </div>

          {/* Mobile-only: moneda (más chica) */}
          <FloatingIsland
            position="absolute"
            className="md:hidden z-40"
            offsetX={0}
            offsetY={60}
            width={360}
            height={200}
          />

          {/* Mobile-only: círculo/recorridos con el mismo efecto (fixed), pero más chico */}
          <MapMock
            className="md:hidden z-30"
            forceFixed
            stageWidth={420}
            stageHeight={620}
            perspective={1000}
            mapSize={360}
            mapTop={316}
            glowTop={334}
            heroRotateXStart={-56}
            heroRotateZStart={-18}
            heroScaleStart={0.58}
            heroScaleEnd={1.0}
            heroXEnd={0}
            heroYStart={70}
            heroYEnd={-28}
          />

          {/* Desktop-only (pesado): 3D + mapa fixed */}
          <div className="hidden md:block">
            <FloatingIsland
              position="absolute"
              className="z-20"
              offsetX={0}
              offsetY={-180}
              width={740}
              height={380}
            />

            <MapMock />
          </div>

          <div className="pointer-events-auto absolute bottom-6 right-4 z-30 select-none sm:bottom-10 sm:right-10">
            <SponsorsBar />
          </div>
        </div>
      </section>
    </>
  );
}
