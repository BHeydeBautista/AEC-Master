export default function MapMock() {
  return (
    <div className="relative w-[420px] h-[420px] rounded-full border border-primary/30 overflow-hidden bg-panel">

      {/* Imagen del mapa */}
      <img
        src="/mapa-curupi.png"
        alt="Mapa Isla Curupí"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-bg/40" />

      {/* SVG para recorridos */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full"
      >

        {/* 4KM */}
        <path
          d="M200 600 C400 300 600 300 800 500"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 5KM */}
        <path
          d="M200 700 C450 350 650 350 850 550"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="6"
          strokeLinecap="round"
        />

      </svg>
    </div>
  );
}
