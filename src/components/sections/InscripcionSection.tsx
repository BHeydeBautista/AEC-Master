const GOOGLE_FORM_URL = "https://forms.gle/mTKnEmg75d297PyD6";

export default function InscripcionSection() {
  return (
    <section
      id="inscripcion"
      className="scroll-mt-28 sm:scroll-mt-32 relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10"
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
              Completá el formulario y asegurá tu lugar.
            </p>

            <div className="mt-6 grid gap-3 text-[13px] leading-[1.7] text-[#8f8a87]">
              <p>
                <span className="text-[#f6f4f2] font-medium">Valores de Inscripción:</span> $ 40000
              </p>
              <p>Consultar Beneficios para Grupos mayores a 10 nadadores.</p>
              <p>
                <span className="text-[#f6f4f2] font-medium">IMPORTANTE:</span> para ingresar al Cupo de la Prueba se considera a quienes hayan realizado pago total o parcial.
              </p>

              <div className="mt-2 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <p className="text-[#f6f4f2] font-medium">Medios de Pago:</p>
                <p className="mt-2">
                  Anticipado a través de medios electrónicos informados, para lo cual deberá seguir las indicaciones en la sección Inscripciones. Una vez realizado el pago cargar comprobante en la sección INFORMAR PAGO del sitio web.
                </p>
                <div className="mt-3">
                  <p className="text-[#f6f4f2] font-medium">ALIAS: <span className="font-normal">FBRONDO2.COCOS</span></p>
                  <p className="text-[#f6f4f2] font-medium">BVU: <span className="font-normal">0000053600000036058538</span></p>
                </div>
              </div>

              <p>
                <span className="text-[#f6f4f2] font-medium">ACREDITACION PRESENCIAL:</span> Entrega de Kit: sábado, horario a confirmar
              </p>

              <p>
                <span className="text-[#f6f4f2] font-medium">CUPO 150</span> nadadores en total ambas pruebas, se considera para el cupo quienes abonen la totalidad y/o realicen el anticipo del Derecho de Participación. La simple pre-inscripción no reserva lugar para el Cupo.
              </p>

              <div className="mt-2 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <p className="text-[#f6f4f2] font-medium">Otros</p>
                <ul className="mt-3 space-y-2">
                  <li>• Traslados al lugar de Largada, Servicio de Bolsero.</li>
                  <li>• Hidratación, mesa de frutas y bebida isotónica en llegada.</li>
                  <li>• Servicio Médico y Seguro sobre Accidentes Personales.</li>
                  <li>• Embarcaciones de guía y acompañamiento grupal</li>
                  <li>• Lanchas para Fiscalización y rápida evacuación</li>
                  <li>• Clasificación mediante sistema numerico</li>
                  <li>• Refrigerio de cortesía individual.</li>
                  <li>• Obsequios de auspiciantes.</li>
                </ul>
              </div>

              <p className="mt-2 rounded-xl bg-[var(--brand)]/10 px-4 py-3 text-[#cfefff] ring-1 ring-[var(--brand)]/25">
                OBLIGATORIO EL USO DE TORPEDO o similar elemento de Seguridad individual Durante todo el desarrollo de la competencia.
              </p>
            </div>
          </div>

          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-md bg-[var(--brand)]/90 hover:bg-[var(--brand)] text-white px-6 py-3 text-sm font-medium md:w-auto transition-colors duration-200"
            type="button"
          >
            Inscribirse
          </a>
        </div>
      </div>
    </section>
  );
}
