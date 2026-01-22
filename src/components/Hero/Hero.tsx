"use client";

import MapMock from "./MapMock";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* LAYOUT GENERAL */}
      <div className="relative z-10 max-w-7xl mx-auto px-10 pt-32">
        <div className="flex items-start">
          {/* COLUMNA TEXTO */}
          <div className="w-[45%]">
            <div className="max-w-[480px] flex flex-col gap-4">
              <h1 className="text-[52px] leading-[1.05] font-semibold tracking-tight">
                <span className="block">Vuelta a la</span>
                <span className="block">Isla Curupí</span>
                <span className="block text-[var(--brand)]">2026</span>
              </h1>

              <p className="max-w-[430px] text-[0.95rem] leading-[1.6] text-[#8f8a87]">
                Desafío acuático en Paraná: elegí tu distancia y viví la
                experiencia. Dos recorridos oficiales pensados para todos los
                niveles: 2 km para iniciarse y 4 km para quienes buscan ir un
                paso más allá. Naturaleza, seguridad y marco único.
              </p>
            </div>
          </div>

          {/* COLUMNA VACÍA (reserva visual para la esfera) */}
          <div className="w-[55%]" />
        </div>
      </div>

      {/* ESFERA */}
      <MapMock />
    </section>
  );
}
