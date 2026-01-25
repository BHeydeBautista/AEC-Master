const GOOGLE_FORM_URL = "https://forms.gle/REEMPLAZAR_POR_TU_FORM";

export default function InscripcionSection() {
  return (
    <section
      id="inscripcion"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
    >
      <div className="relative overflow-hidden rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(17,179,255,0.18),transparent_55%)]" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[640px]">
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
              Inscripción
            </p>
            <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
              Sumate a la Vuelta 2026
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
              Completá el formulario y asegurá tu lugar. Dos distancias: 2,5 km
              (Promocional) y 5 km (Principal). Domingo 01 de marzo de 2026.
            </p>

            <div className="mt-6 grid gap-3 text-[13px] leading-[1.65] text-[#8f8a87]">
              <p>
                <span className="text-[#f6f4f2] font-medium">Valor de inscripción:</span> $ 40.000
              </p>
              <p>
                <span className="text-[#f6f4f2] font-medium">Cupo:</span> 150 nadadores (ambas pruebas). Se considera dentro del cupo a quienes hayan abonado total o parcial.
              </p>
              <p>
                <span className="text-[#f6f4f2] font-medium">Acreditación / Entrega de kit:</span> viernes 27/02 de 19:00 a 20:30 hs y domingo 01/03 de 07:00 a 09:00 hs.
              </p>
              <p>
                <span className="text-[#f6f4f2] font-medium">Seguridad:</span> uso obligatorio de torpedo / boya de flotación (o elemento similar) durante toda la competencia.
              </p>
            </div>
          </div>

          <a
            className="pointer-events-auto inline-flex w-full items-center justify-center rounded-md bg-[var(--brand)] px-6 py-3 text-sm font-medium text-[#0b0b0b] shadow-[0_0_18px_rgba(17,179,255,0.28)] hover:bg-[var(--brand-600)] transition md:w-auto"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
          >
            Ir al formulario
          </a>
        </div>
      </div>
    </section>
  );
}
