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
                <span className="block">All-in-one</span>
                <span className="block">running</span>
                <span className="block">
                  experience<span className="text-[#ff4b4b]">.</span>
                </span>
              </h1>

              <p className="max-w-[330px] text-[0.85rem] leading-[1.55] text-[#8f8a87]">
                Una experiencia deportiva única en la Isla Curupí. Dos
                recorridos, naturaleza y desafío real.
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
