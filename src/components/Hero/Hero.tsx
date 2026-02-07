"use client";

import MapMock from "./MapMock";
import FloatingIsland from "./FloatingIsland";
import SponsorsBar from "../layout/SponsorsBar";

export default function Hero() {
  return (
    <>
      <section id="hero" className="scroll-mt-24 relative min-h-[200vh] overflow-hidden">
        <div className="sticky top-0 h-screen">
          <div className="relative z-50 mx-auto flex min-h-[100dvh] max-w-7xl items-start px-6 pt-24 sm:px-8 sm:pt-28 lg:px-10">
            <div className="w-full max-w-[540px]">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Atlético Echagüe Club · 1 de Marzo 2026
              </p>

              <h1 className="mt-5 text-[32px] sm:text-[42px] md:text-[72px] font-semibold leading-[1.08] tracking-tight text-[#f6f4f2]">
                <span className="block">Vuelta al</span>
                <span className="block">Islote Curupí</span>
                <span className="block text-[var(--brand)]">2026</span>
              </h1>

              <p className="mt-5 max-w-[460px] text-[12px] leading-[1.5] text-[#8f8a87] sm:mt-6 sm:text-[15px] sm:leading-[1.65]">
                Desafiando al Gigante de Agua. Un evento organizado por la Subcomisión de Nadadores Máster del Atlético Echagüe Club.
              </p>
              <p className="mt-2 max-w-[460px] text-[12px] leading-[1.5] text-[#8f8a87] sm:text-[15px] sm:leading-[1.65]">
                Largada en Balneario Thompson, llegada en Balneario Municipal. Dos distancias: 2.5 km promocional y 5 km competitiva alrededor del Islote Curupí.
              </p>
            </div>
          </div>

          {/* Mobile-only: moneda (más chica) */}
          <div className="md:hidden flex flex-col items-center w-full mt-36">
            <FloatingIsland
              position="absolute"
              className="z-40"
              offsetX={0}
              offsetY={110}
              width={340}
              height={170}
              style={{ top: "55%" }}
            />
            <div className="h-4" />
            <MapMock
              className="z-30"
              forceFixed
              stageWidth={340}
              stageHeight={460}
              perspective={900}
              mapSize={260}
              mapTop={210}
              glowTop={230}
              heroRotateXStart={-56}
              heroRotateZStart={-18}
              heroScaleStart={0.58}
              heroScaleEnd={1.0}
              heroXEnd={0}
              heroYStart={190}
              heroYEnd={40}
            />
          </div>

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

          <div className="pointer-events-auto absolute right-3 top-36 bottom-auto z-30 select-none sm:right-6 sm:top-auto sm:bottom-8">
            <SponsorsBar />
          </div>
        </div>
      </section>
    </>
  );
}
