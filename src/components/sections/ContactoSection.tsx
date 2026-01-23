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
          href="mailto:coordinacion@example.com"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Email Coordinación
          </p>
          <p className="mt-3 text-sm font-medium text-[#f6f4f2]">
            coordinacion@example.com
          </p>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#8f8a87]">
            Consultas generales e inscripciones. (Actualizar con email real)
          </p>
        </a>

        <a
          className="pointer-events-auto rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md hover:bg-white/5 transition"
          href="https://www.instagram.com/echaguemasternatacion/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Instagram Máster
          </p>
          <p className="mt-3 text-sm font-medium text-[#f6f4f2]">@EchagueMasterNatacion</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#8f8a87]">
            Subcomisión de Nadadores Máster
          </p>
        </a>

        <a
          className="pointer-events-auto rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md hover:bg-white/5 transition"
          href="https://www.instagram.com/atleticoechaguecluboficial/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Instagram Oficial
          </p>
          <p className="mt-3 text-sm font-medium text-[#f6f4f2]">@AtleticoEchagueClubOficial</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#8f8a87]">
            Atlético Echagüe Club
          </p>
        </a>
      </div>
    </section>
  );
}
