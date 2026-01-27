"use client";

import Accordion from "../ui/Accordion";

export default function ReglamentoSection() {
  return (
    <section
      id="reglamento"
      className="scroll-mt-28 sm:scroll-mt-32 relative z-[100] pointer-events-auto mx-auto max-w-7xl px-6 pb-24 pt-32 sm:px-8 lg:px-10"
    >
      <div className="max-w-[720px] relative">
        <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Reglamento
        </p>
        <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
          Reglamento oficial (texto completo)
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
          A continuación se publica el texto oficial del evento. Podés leer un
          resumen y desplegar el reglamento completo.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3 relative">
        <article className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/8 backdrop-blur-md sm:p-6">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">Seguridad</h3>
          <p className="mt-3 text-[13px] leading-[1.7] text-[#8f8a87]">
            ES OBLIGATORIO el uso de Torpedo, Boya de Flotación o elemento
            similar de seguridad personal.
          </p>
        </article>

        <article className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/8 backdrop-blur-md sm:p-6">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">
            Tiempo límite
          </h3>
          <p className="mt-3 text-[13px] leading-[1.7] text-[#8f8a87]">
            Se establece un tiempo máximo de 2 horas (2:00 hs) de permanencia en
            el agua. A las 13:00 hs se dará por finalizada la competencia.
          </p>
        </article>

        <article className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/8 backdrop-blur-md sm:p-6">
          <h3 className="text-sm font-semibold text-[#f6f4f2]">
            Protocolo ambiental
          </h3>
          <p className="mt-3 text-[13px] leading-[1.7] text-[#8f8a87]">
            Prohibido el descarte de residuos al río. El incumplimiento será
            motivo de descalificación inmediata.
          </p>
        </article>
      </div>

      <div className="relative z-30 pointer-events-auto">
        <Accordion className="mt-12" title="Ver reglamento completo">
          <header className="space-y-1">
            <h3 className="text-base font-semibold text-[#f6f4f2]">
              PRUEBA DE NATACION EN AGUAS ABIERTAS
            </h3>
            <p className="text-[#c9c5c2]">
              Vuelta a la Isla Curupi (Parana, E. Ríos)
            </p>
            <p className="text-[#c9c5c2]">01 de Marzo de 2026</p>
          </header>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              ORGANIZACIÓN Y MARCO INSTITUCIONAL
            </h4>
            <p>
              La competencia es organizada por el Atlético Echagüe Club, a
              través de su Subcomisión de Natación Master, honrando el legado de
              la natación del club y promoviendo el deporte en el Río Paraná.
              Este evento se rige bajo las normativas de seguridad de la
              Prefectura Naval Argentina
            </p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              INFORMACION GENERAL 5 km y 2,5 km:
            </h4>
            <p>Prueba de Natación en Aguas Abiertas.</p>
            <p>5 km prueba principal, modalidad circuito.</p>
            <p>2,5 km prueba promocional, modalidad punto a punto.</p>
            <p>Rio Parana, Entre Ríos, Argentina.</p>
            <div className="rounded-xl bg-red-500/10 px-4 py-3 text-red-200 ring-1 ring-red-400/20">
              OBLIGATORIO EL USO DE TORPEDO o similar elemento de Seguridad
              individual Durante todo el desarrollo de la competencia.
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              INSCRIPCION:
            </h4>
            <p>Valores de Inscripción: $ 40000</p>
            <p>Consultar Beneficios para Grupos mayores a 10 nadadores.</p>
            <p>
              IMPORTANTE: para ingresar al Cupo de la Prueba se considera a
              quienes hayan realizado pago total o parcial.
            </p>
            <div className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <p className="text-[#f6f4f2] font-medium">Medios de Pago:</p>
              <p className="mt-2">
                Anticipado a través de medios electrónicos informados, para lo
                cual deberá seguir las indicaciones en la sección Inscripciones.
                Una vez realizado el pago cargar comprobante en la sección
                INFORMAR PAGO del sitio web.
              </p>
            </div>
            <p>
              ACREDITACION PRESENCIAL: Entrega de Kit: Sabado, Horario a
              confirmar...
            </p>
            <p>
              CUPO 150 nadadores en total ambas pruebas, se considera para el
              cupo quienes abonen la totalidad y/o realicen el anticipo del
              Derecho de Participación. La simple pre-inscripción no reserva
              lugar para el Cupo.
            </p>
            <div className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <p className="text-[#f6f4f2] font-medium">Otros</p>
              <ul className="mt-3 space-y-2">
                <li>• Traslados al lugar de Largada, Servicio de Bolsero.</li>
                <li>
                  • Hidratación, mesa de frutas y bebida isotónica en llegada.
                </li>
                <li>• Servicio Médico y Seguro sobre Accidentes Personales.</li>
                <li>• Embarcaciones de guía y acompañamiento grupal</li>
                <li>• Lanchas para Fiscalización y rápida evacuación</li>
                <li>• Clasificación mediante sistema numerico</li>
                <li>• Refrigerio de cortesía individual.</li>
                <li>• Obsequios de auspiciantes.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              REGLAMENTO A.A. VUELTA A LA ISLA CURUPI
            </h4>
            <p className="text-sm font-semibold text-[#f6f4f2]">
              NADADORES LIBRES
            </p>

            <p>
              1- La prueba principal sobre una distancia de 5 km, se disputara
              en un recorrido de punto a punto con vuelta a la isla curupi con
              boyado de orientación en aguas del Rio Parana, con largada en
              Playa Thompson y llegada en Balneario Municipal, Parana, Entre
              Ríos, Argentina.
            </p>
            <p>
              La prueba promocional sobre 2,5 km se largara en Playa Thompson e
              igual punto de llegada (balneario municipal)
            </p>

            <div className="space-y-2">
              <p>2- CATEGORIAS: para ambos sexos Libres:</p>
              <ul className="space-y-1">
                <li>Juvenil 16 a 20 años;</li>
                <li>Master “A” de 21 a 25 años;</li>
                <li>Master “B” de 26 a 30 años;</li>
                <li>Master “C”, de 31 a 35 años;</li>
                <li>Master “D” 36 a 40 años;</li>
                <li>Master “E” 41 a 45 años;</li>
                <li>Master “F” 46 A 50 años;</li>
                <li>Master “G” 51 a 55 años;</li>
                <li>Master “H” 56 a 60 años;</li>
                <li>
                  Master “I” 61 a 65 años; Master “J” 66 a 70 años; Master “K”
                  71 años y más.
                </li>
              </ul>
              <p>Se considera la edad al 31-12-2026</p>

              <p>NADADORES FEDERADOS: Categoría Única en ambos sexos.</p>
              <p>Prueba promocional de 2km: Categorías:</p>
              <ul className="space-y-1">
                <li>menos (-) 19 años;</li>
                <li>20 a 29 años;</li>
                <li>30 a 39 años;</li>
                <li>40 a 49 Años;</li>
                <li>50 a 59 años;</li>
                <li>60 años o más.</li>
              </ul>
              <p>Para varones y mujeres se considera la edad al 31-12-2026</p>
            </div>

            <p>
              3- Los participantes deberán abonar el Derecho de Participación
              según cuadro de tarifas más arriba detallado, que incluye traslado
              a la largada, bolsero, seguro, hidratación, frutas, refrigerio de
              cortesía, premiación, medallas finisher obsequios de auspiciantes
              y servicios (asistencia médica, guardavidas, embarcaciones de
              guía, ambulancias)
            </p>

            <p>
              4- Las Inscripciones serán únicamente ANTICIPADAS y se recibirán
              exclusivamente hasta las 20 horas del día miércoles 25 de febrero
              de 2026 o hasta completar el cupo de la prueba
            </p>

            <p>MODALIDAD DE PAGO: A Confirmar</p>
            <p>
              Los participantes nativos de Parana podrán realizar la Inscripción
              y Pago en Efectivo con los organizadores.
            </p>

            <p>
              5- Los Participantes deberán presentarse el domingo 01 de Marzo de
              2026 entre las 7:00 y 9:00 hs. en Balneario Municipal, Costanera
              Baja, para ratificar su participación, presentación del deslinde
              de responsabilidad, asignación de Numeracion, pintado de números,
              charla técnica y traslado a largada.
            </p>

            <p>
              IMPORTANTE: Los participantes tienen el deber de presentar
              deslinde de responsabilidad y certificado medico no mas de 2 (Dos)
              meses de antigüedad.
            </p>
            <p>
              En caso de menores de edad (-18 años) la Ficha Personal/Deslinde
              de Responsabilidad deberá ser firmada por los padres del
              participante.
            </p>

            <p>
              6- Todos los participantes deberán presentar al momento de la
              Inscripción CERTIFICADO MEDICO de aptitud para competencias de
              Aguas Abiertas expedido hasta 60 días antes de iniciación de la
              prueba.
            </p>
            <p className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              MUY IMPORTANTE, SEGURO/COBERTURA MEDICA: los nadadores mayores de
              65 años deberán exhibir al momento de la Acreditación una
              cobertura de Seguro, Obra Social o prepaga sobre Accidentes
              personales contratada en forma privada. Debido a que la Empresa
              Aseguradora del evento no brinda cobertura a personas mayores de
              esa edad.
            </p>

            <div className="space-y-2">
              <p>7- PREMIACION</p>
              <ul className="space-y-2">
                <li>
                  • 5 km: se premiará a los primeros puestos de la General en
                  Damas y Caballeros. A los 3 primeros puestos de categoría. Se
                  entregarán Medallas Finisher a todos los participantes.
                </li>
                <li>
                  • 2,5 km se premiará a las 3 primeras posiciones en varones y
                  en mujeres en cada categoría de edad.
                </li>
                <li>• Medallas Finisher a todos los participantes.</li>
              </ul>
              <p>
                La premiación se realizará en el lugar de Llegada a las 13:00
                hs. Es obligatorio el retiro presencial de los premios, bajo
                ningún motivo se reservan o se envía los mismos.
              </p>
            </div>

            <p>
              8- Los Organizadores no dispondrán de embarcaciones para
              acompañamiento personalizado, si para guía y acompañamiento
              grupal.
            </p>

            <p>
              9- No estará permitido el uso de traje de neopreno, ni materiales
              no autorizados. ES OBLIGATORIO el uso de Torpedo, Boya de
              Flotación o elemento similar de seguridad personal.
            </p>

            <p>
              10- RESPONSABILIDADES: Los organizadores están exentos de toda
              responsabilidad por extravíos robo o hurtos de objetos personales
              y accidentes que pudieran ocurrir antes, durante y después de la
              prueba a cualquier integrante de las delegaciones (nadadores,
              boteros, guías y/o acompañantes). No obstante, como previsión, el
              organizador tomará todas las medidas de precaución necesarias para
              el desarrollo normal de la prueba en concordancia con las
              autoridades de Prefectura.
            </p>

            <div className="space-y-2 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
              <p className="text-[#f6f4f2] font-medium">Orden de largadas:</p>
              <p>10:30hs Prueba Principal 5 km;</p>
              <p>11:00hs Prueba promocional 2,5 km</p>
            </div>

            <p>m</p>

            <ul className="space-y-2">
              <li>• La largada será con agua a la altura de cintura.</li>
              <li>
                • La llegada será mediante toque al muro de llegada o manta en
                el agua a la altura de la cintura.
              </li>
              <li>
                • La clasificación se realizara por orden de arribo con captura
                de tiempo.
              </li>
              <li>
                • La Organización se reserva reprogramar el evento por causas de
                fuerza mayor ajenas a la misma, al no tener la autorización de
                Prefectura Naval Argentina – Parana para efectuar la
                competencia.
              </li>
              <li>
                • En caso que la competencia no sea autorizada por Prefectura
                Naval Argentina - Parana, se procederá a la cancelación de la
                competencia. Sin devolución de la inscripción.
              </li>
            </ul>

            <p>
              Se recomienda y se agradecerá dar estricto cumplimiento a los
              horarios para una mejor organización.
            </p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              CIRCUITO Y FISCALIZACIÓN (GIROS)
            </h4>
            <p>
              El circuito mantiene el sentido antihorario con las siguientes
              maniobras de boya:
            </p>
            <p>
              Boya Nro. 1 (Solo 5000m): Ubicada en el extremo sur del islote.
              Giro dejando la boya a HOMBRO DERECHO.
            </p>
            <p>
              Boya Nro. 2 (Ambas distancias): Ubicada frente al Mirador de
              Puerto Sánchez. Los nadadores de ambas distancias deben rodearla
              dejando la boya a HOMBRO DERECHO para encarar el canal de llegada.
            </p>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              ASISTENCIA Y TIEMPO LÍMITE
            </h4>
            <ul className="space-y-2">
              <li>
                • Dispositivo de Seguridad: La asistencia en el agua estará
                integrada por Lanchas de apoyo, Kayaks y Tablas SUP, coordinados
                por el equipo de guardavidas del AEC y Prefectura Naval
                Argentina.
              </li>
              <li>
                • Duración de la Prueba: Se establece un tiempo máximo de 2
                horas (2:00 hs) de permanencia en el agua. A las 13:00 hs se
                dará por finalizada la competencia por razones de seguridad
                náutica.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f6f4f2]">
              PROTOCOLO AMBIENTAL
            </h4>
            <p>
              Al desarrollarse en la zona de la Reserva Natural Islote Curupí,
              queda terminantemente prohibido el descarte de residuos al río. El
              incumplimiento será motivo de descalificación inmediata.
            </p>
          </section>
        </Accordion>
      </div>
    </section>
  );
}
