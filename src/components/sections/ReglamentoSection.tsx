export default function ReglamentoSection() {
  return (
    <section
      id="reglamento"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
    >
      <div className="max-w-[720px]">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Reglamento
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Reglas claras, experiencia segura
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          Acá vamos a publicar el reglamento completo. Por ahora, te dejamos un
          resumen de los puntos principales.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Seguridad</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#8f8a87]">
            Boyado obligatorio según categoría, puestos de control y protocolo
            de asistencia en el agua.
          </p>
        </article>

        <article className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Acreditación</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#8f8a87]">
            DNI, apto médico (si corresponde) y aceptación del deslinde de
            responsabilidad.
          </p>
        </article>

        <article className="rounded-2xl bg-black/20 p-6 ring-1 ring-white/8 backdrop-blur-md">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Conducta</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-[#8f8a87]">
            Respeto por el río, el entorno y los demás participantes. Cualquier
            conducta riesgosa puede ser sancionada.
          </p>
        </article>
      </div>

      <div className="mt-10 text-[13px] leading-[1.7] text-[#8f8a87]">
        <p>
          Nota: el reglamento final puede actualizarse. Te recomendamos revisar
          esta sección antes del evento.
        </p>
      </div>
    </section>
  );
}
