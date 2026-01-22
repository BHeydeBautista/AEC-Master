export default function ContactoSection() {
  return (
    <section
      id="contacto"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-10 sm:px-8 lg:px-10"
    >
      <div className="max-w-[720px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Contacto
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          ¿Tenés una consulta?
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          Escribinos y te respondemos a la brevedad.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <a
          className="pointer-events-auto rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md hover:bg-white/5 transition"
          href="mailto:info@vueltaisla.com"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Email
          </p>
          <p className="mt-3 text-sm font-medium text-[#f6f4f2]">
            info@vueltaisla.com
          </p>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#8f8a87]">
            Consultas generales e inscripciones.
          </p>
        </a>

        <a
          className="pointer-events-auto rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md hover:bg-white/5 transition"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            WhatsApp
          </p>
          <p className="mt-3 text-sm font-medium text-[#f6f4f2]">+54 9 …</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#8f8a87]">
            (Placeholder) Cambiamos por el número real.
          </p>
        </a>

        <a
          className="pointer-events-auto rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md hover:bg-white/5 transition"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Instagram
          </p>
          <p className="mt-3 text-sm font-medium text-[#f6f4f2]">@vueltaisla</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#8f8a87]">
            (Placeholder) Link al perfil oficial.
          </p>
        </a>
      </div>
    </section>
  );
}
