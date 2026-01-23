export default function ResponsabilidadSection() {
  return (
    <section
      id="responsabilidad"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
    >
      <div className="max-w-[720px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Organización Profesional
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Atlético Echagüe Club
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          Fundado en 1932, el AEC es un pilar del deporte en la región. Nuestra
          Subcomisión de Nadadores Máster cuenta con nadadores experimentados en
          circuitos de aguas abiertas nacionales e internacionales, garantizando
          una visión técnica profesional de la competencia.
        </p>
      </div>

      <div className="mt-10 max-w-[820px] rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
        <h3 className="text-sm font-semibold text-[#f6f4f2] mb-4">Visión de Futuro: Circuito Nacional</h3>
        <p className="text-[13px] leading-[1.7] text-[#8f8a87] mb-4">
          Este evento es el pilar para consolidar a Paraná en el mapa de las aguas
          abiertas. Nuestra meta es la homologación federal para que la "Vuelta al
          Islote Curupí" integre el calendario de la Confederación Argentina de
          Deportes Acuáticos (CADDA), atrayendo a la élite de la natación argentina
          a nuestra provincia.
        </p>
        <h3 className="text-sm font-semibold text-[#f6f4f2] mb-3 mt-6">Deslinde de Responsabilidad</h3>
        <ul className="space-y-3 text-[13px] leading-[1.7] text-[#8f8a87]">
          <li>• Participación bajo responsabilidad personal.</li>
          <li>• Condiciones climáticas/hídricas pueden modificar el evento.</li>
          <li>• Se requiere cumplir indicaciones de organización y seguridad.</li>
        </ul>

        <details className="mt-6 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
          <summary className="cursor-pointer select-none text-sm font-medium text-[#f6f4f2]">
            Ver texto completo (resumen legal)
          </summary>
          <div className="mt-4 space-y-3 text-[13px] leading-[1.75] text-[#8f8a87]">
            <p>
              El participante declara encontrarse en condiciones físicas y de
              salud aptas para realizar la actividad. Acepta los riesgos
              inherentes a un evento acuático y se compromete a respetar el
              reglamento, las zonas marcadas y las indicaciones del personal.
            </p>
            <p>
              La organización podrá reprogramar, modificar recorrido/horarios o
              suspender el evento por motivos de fuerza mayor (clima, corriente,
              seguridad, logística, autoridad competente).
            </p>
            <p>
              Este texto es orientativo y podrá ser reemplazado por el documento
              oficial de inscripción.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
