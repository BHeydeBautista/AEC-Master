import MapMock from "./MapMock";

export default function Hero() {
  return (
    <section className="min-h-screen bg-bg text-textMain grid grid-cols-1 lg:grid-cols-2 items-center px-8 lg:px-24">

      {/* TEXTO */}
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Vuelta a la
          <span className="block text-primary"> Isla Curupí</span>
        </h1>

        <p className="text-textMuted max-w-md">
          Carrera pedestre organizada por Echagüe Natación Máster.
          Recorridos oficiales de 4KM y 5KM.
        </p>

        <div className="flex gap-4 pt-4">
          <a
            href="#inscripcion"
            className="px-6 py-3 bg-primary text-bg font-semibold rounded-lg hover:bg-primarySoft transition"
          >
            Inscribirse
          </a>

          <a
            href="#recorridos"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition"
          >
            Ver recorridos
          </a>
        </div>
      </div>

      {/* VISUAL */}
      <div className="flex justify-center items-center mt-16 lg:mt-0">
        <MapMock />
      </div>

    </section>
  );
}
