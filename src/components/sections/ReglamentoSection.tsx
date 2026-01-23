export default function ReglamentoSection() {
  return (
    <section
      id="reglamento"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
    >
      <div className="max-w-[720px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Plan de Seguridad Integral
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Protocolo AEC: Tu seguridad es nuestra prioridad
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          Sistema de seguridad profesional coordinado con Prefectura Naval
          Argentina, equipo médico de alta complejidad y seguros para todos los
          participantes.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Rescate Acuático</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#8f8a87]">
            Un guardavidas cada 15 nadadores, flota de kayaks y lanchas
            motorizadas de respuesta rápida. Coordinación con Prefectura Naval
            para custodia del canal.
          </p>
        </article>

        <article className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Asistencia Médica</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#8f8a87]">
            Ambulancia de alta complejidad en punto de llegada y gazebos de
            atención médica inmediata a lo largo del recorrido.
          </p>
        </article>

        <article className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Seguros y Cronometraje</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#8f8a87]">
            Póliza de accidentes personales para cada participante y
            responsabilidad civil para el evento. Sistema de chips electrónicos
            de alta precisión.
          </p>
        </article>
      </div>

      <div className="mt-10 rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
        <h3 className="text-sm font-semibold text-[#f6f4f2] mb-4">El Pasillo de Aliento</h3>
        <p className="text-[13px] leading-[1.7] text-[#8f8a87]">
          El 80% de la carrera se desarrolla frente a la Costanera de Paraná,
          convirtiendo el Parque Urquiza en una tribuna natural de 2 km. Esta
          interacción única con el público crea una experiencia inolvidable tanto
          para nadadores como para espectadores.
        </p>
      </div>
    </section>
  );
}
