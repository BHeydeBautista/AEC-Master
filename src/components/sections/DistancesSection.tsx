export default function DistancesSection() {
  return (
    <section
      id="distancias"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
    >
      <div className="max-w-[620px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Distancias
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Elegí tu desafío
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          Dos recorridos oficiales pensados para todos los niveles: una opción
          ideal para iniciarse y otra para quienes buscan ir un paso más allá.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {/* 2KM */}
        <article className="relative overflow-hidden rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(17,179,255,0.18),transparent_55%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Distancia 01
              </span>
              <span className="rounded-full bg-[var(--brand)]/12 px-3 py-1 text-[11px] font-medium text-[var(--brand)] ring-1 ring-[var(--brand)]/25">
                Recomendada
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[44px] font-semibold leading-none tracking-tight text-[#f6f4f2]">
                2
              </span>
              <span className="text-[16px] font-medium text-[#f6f4f2]">km</span>
            </div>

            <p className="mt-4 text-[14px] leading-[1.65] text-[#8f8a87]">
              Ideal para debutar: ritmo controlado, enfoque en técnica y
              confianza. Perfecta para quienes quieren vivir la experiencia
              completa.
            </p>

            <div className="mt-6 flex items-center gap-3 text-[12px] text-[#9a9593]">
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Iniciación
              </span>
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Ritmo moderado
              </span>
            </div>
          </div>
        </article>

        {/* 4KM */}
        <article className="relative overflow-hidden rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.10),transparent_55%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Distancia 02
              </span>
              <span className="rounded-full bg-white/6 px-3 py-1 text-[11px] font-medium text-[#f6f4f2] ring-1 ring-white/12">
                Avanzada
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[44px] font-semibold leading-none tracking-tight text-[#f6f4f2]">
                4
              </span>
              <span className="text-[16px] font-medium text-[#f6f4f2]">km</span>
            </div>

            <p className="mt-4 text-[14px] leading-[1.65] text-[#8f8a87]">
              Para quienes buscan exigirse más: mayor resistencia, estrategia y
              lectura del agua. Una distancia pensada para experimentar el
              desafío completo.
            </p>

            <div className="mt-6 flex items-center gap-3 text-[12px] text-[#9a9593]">
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Resistencia
              </span>
              <span className="rounded-md bg-white/5 px-3 py-2 ring-1 ring-white/10">
                Ritmo sostenido
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
