"use client";

import type { MotionValue } from "framer-motion";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

type MapMockProps = {
  tiltX?: MotionValue<number> | number;
  tiltZ?: MotionValue<number> | number;
  showIsland?: boolean;
  islandOpacity?: MotionValue<number> | number;
  mapTop?: MotionValue<number> | number;
  glowTop?: MotionValue<number> | number;
  imageScale?: MotionValue<number> | number;
  mapImageSrc?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  mapSize?: number;
  stageWidth?: number;
  stageHeight?: number;
  perspective?: number;
};

export default function MapMock(props: MapMockProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const distanciasSectionRef = useRef<HTMLElement | null>(null);
  const distance2Ref = useRef<HTMLElement | null>(null);
  const distance5Ref = useRef<HTMLElement | null>(null);

  const isInlineStage =
    props.stageWidth !== undefined ||
    props.stageHeight !== undefined ||
    props.perspective !== undefined ||
    props.mapSize !== undefined ||
    props.mapTop !== undefined ||
    props.glowTop !== undefined ||
    props.imageScale !== undefined ||
    props.tiltX !== undefined ||
    props.tiltZ !== undefined;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    distanciasSectionRef.current = document.getElementById("distancias");
    distance2Ref.current = document.getElementById("distance2");
    distance5Ref.current = document.getElementById("distance5");
  }, []);

  const { scrollYProgress: distanciasProgress } = useScroll({
    target: distanciasSectionRef,
    // Dimming suave al acercarse a la sección
    offset: ["start 0.95", "start 0.55"],
  });

  const { scrollYProgress: distance2Progress } = useScroll({
    target: distance2Ref,
    // Arranca cuando el card está bastante abajo (evita “se activa antes”)
    offset: ["start 0.85", "end 0.35"],
  });

  const { scrollYProgress: distance5Progress } = useScroll({
    target: distance5Ref,
    offset: ["start 0.85", "end 0.35"],
  });

  // Rotación: empieza de perfil (65°) y se vuelve plano (0°)
  const rotateX = useTransform(scrollYProgress, [0, 0.7], [-65, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.7], [-25, 0]);
  
  // Mantener Hero como antes; al acercarse a Distancias se corre a la derecha.
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.65, 1.15]);
  const x = useTransform(scrollYProgress, [0, 0.45, 0.7], [0, 0, 420]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -200]);

  const stageWidth = props.stageWidth ?? 560;
  const stageHeight = props.stageHeight ?? 760;
  const perspective = props.perspective ?? 1200;
  const mapSize = props.mapSize ?? 520;
  const mapCenter = mapSize / 2;
  const mapRadius = mapCenter - 4;
  const arcLeft = `M ${mapCenter} ${mapCenter - mapRadius} A ${mapRadius} ${mapRadius} 0 0 0 ${mapCenter} ${mapCenter + mapRadius}`;
  const arcRight = `M ${mapCenter} ${mapCenter - mapRadius} A ${mapRadius} ${mapRadius} 0 0 1 ${mapCenter} ${mapCenter + mapRadius}`;

  const appliedTiltX = isInlineStage ? (props.tiltX ?? -65) : rotateX;
  const appliedTiltZ = isInlineStage ? (props.tiltZ ?? -25) : rotateZ;
  const appliedMapTop = props.mapTop ?? 340;
  const appliedGlowTop = props.glowTop ?? 360;
  // Para ver el recorrido completo (salida/llegada), evitamos el zoom por defecto.
  // Si querés volver a “acercar” el mapa, podés pasar `imageScale` desde el caller.
  const appliedImageScale = props.imageScale ?? 1;
  const mapImageSrc = props.mapImageSrc ?? "/img/mapa-curupi5.png";
  // Default: rellenar el círculo con el mapa (sin duplicar imágenes).
  // Nota: `cover` puede recortar un poco si el aspect ratio no coincide.
  const imageFit = props.imageFit ?? "cover";
  // Ajuste de encuadre: baja un poco el foco para mostrar mejor la zona de playas.
  const imagePosition = props.imagePosition ?? "53% 62%";

  // Cargas por card:
  // - distance2: llena verde y revela mapa
  // - distance5: llena rojo y recarga/revela mapa
  // Nota: en algunos layouts el progreso no llega a 1 exacto; amplificamos para asegurar el 100%.
  const LOAD_GAIN = 1.35;
  const greenLoad = useTransform(distance2Progress, (v) => clamp01(v * LOAD_GAIN));
  const redLoad = useTransform(distance5Progress, (v) => clamp01(v * LOAD_GAIN));

  // Cada barra llena SOLO su semicircunferencia (pathLength=1)
  const greenGap = useTransform(greenLoad, (p) => 1 - p);
  const redGap = useTransform(redLoad, (p) => 1 - p);
  const greenDashArray = useMotionTemplate`${greenLoad} ${greenGap}`;
  const redDashArray = useMotionTemplate`${redLoad} ${redGap}`;

  const ringOpacity = useTransform([greenLoad, redLoad], (values) => {
    const g = values[0] as number;
    const r = values[1] as number;
    return (g > 0.001 || r > 0.001 ? 0.9 : 0) as number;
  });

  // Medias (50/50) siempre visibles.
  // En Hero: normales. En Distancias: se apagan. Cada color se prende al tocar su card.
  const dimT = useTransform(distanciasProgress, (v) => clamp01(v));
  const baseHalfOpacity = useTransform(dimT, (t) => ((1 - t) * 1 + t * 0.18) as number);

  const greenHalfOpacity = useTransform([baseHalfOpacity, greenLoad], (values) => {
    const base = values[0] as number;
    const g = values[1] as number;
    return (g > 0.02 ? 1 : base) as number;
  });

  const redHalfOpacity = useTransform([baseHalfOpacity, redLoad], (values) => {
    const base = values[0] as number;
    const r = values[1] as number;
    return (r > 0.02 ? 1 : base) as number;
  });

  const greenActive = useTransform(greenLoad, (g) => (g > 0.001 ? 1 : 0) as number);
  const redActive = useTransform(redLoad, (r) => (r > 0.001 ? 1 : 0) as number);

  // Cuando el rojo está cargando, bajamos el verde para que se note el cambio.
  const redLoading = useTransform(redLoad, (r) => (r > 0.02 && r < 0.98 ? 1 : 0) as number);
  const greenFade = useTransform(redLoading, (a) => (a >= 1 ? 0.12 : 1) as number);

  const greenRingOpacity = useTransform([ringOpacity, greenActive, greenFade], (v) =>
    (v[0] as number) * (v[1] as number) * (v[2] as number)
  );

  const redRingOpacity = useTransform([ringOpacity, redActive], (v) =>
    (v[0] as number) * (v[1] as number)
  );

  // Capa que tapa el mapa y se “abre” con la carga
  const mapCoverOpacity = useTransform([greenLoad, redLoad], (values) => {
    const g = values[0] as number;
    const r = values[1] as number;
    const gActive = g > 0.001;
    const rActive = r > 0.001;
    // Mantener el mapa visible mientras “carga”: sólo un dim sutil.
    // (Antes se tapaba + blur, y se percibía borroso.)
    // Si querés volver a “tapar” el mapa durante carga, subí este valor.
    const DIM_MAX = 0;
    if (rActive) return DIM_MAX * (1 - clamp01(r));
    if (gActive) return DIM_MAX * (1 - clamp01(g));
    return 0;
  });

  // `next/image` usa `sizes` para decidir qué resolución servir.
  // Como este componente se transforma en 3D + escala en el Hero, pedimos
  // una resolución bastante mayor para que no se vea pixelado en pantallas HiDPI.
  const imageSizes = `${Math.round(mapSize * 3)}px`;

  return (
    <div
      ref={containerRef}
      className={
        isInlineStage
          ? "pointer-events-none relative"
          : "pointer-events-none fixed inset-0 z-20 flex items-center justify-center"
      }
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        className="relative"
        style={{
          width: stageWidth,
          height: stageHeight,
          x: isInlineStage ? 0 : x,
          y: isInlineStage ? 0 : y,
          scale: isInlineStage ? 1 : scale,
        }}
      >
        {/* Glow exterior */}
        <motion.div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06),_transparent_60%)]"
          style={{
            top: appliedGlowTop,
            width: mapSize + 160,
            height: mapSize + 160,
          }}
        />

        {/* Mapa con rotación animada */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ 
            top: appliedMapTop,
            rotateX: appliedTiltX,
            rotateZ: appliedTiltZ,
            transformStyle: "preserve-3d" 
          }}
        >
          <div
            className="relative rounded-full bg-[#111] shadow-[0_0_180px_rgba(0,0,0,0.9)]"
            style={{ width: mapSize, height: mapSize }}
          >
            {/* Mapa (recorte circular real) */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="relative h-full w-full">
                <motion.div
                  className="absolute inset-0"
                  style={{ scale: appliedImageScale }}
                >
                  <Image
                    src={mapImageSrc}
                    alt="Mapa Isla Curupí"
                    fill
                    sizes={imageSizes}
                    quality={100}
                    className={imageFit === "contain" ? "object-contain" : "object-cover"}
                    style={{ objectPosition: imagePosition, backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                    priority
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-[#0b0b0b]"
                  style={{ opacity: mapCoverOpacity }}
                />
              </div>
            </div>

            {/* Aros internos (encima del mapa) */}
            <div className="pointer-events-none absolute inset-6 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute inset-12 rounded-full border border-white/5" />

            <svg viewBox={`0 0 ${mapSize} ${mapSize}`} className="absolute inset-0">
              <defs>
                <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Barras estáticas (Hero) */}
              <motion.circle
                cx={mapCenter}
                cy={mapCenter}
                r={mapRadius}
                fill="none"
                stroke="#ef4444"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="50 50"
                transform={`rotate(-90 ${mapCenter} ${mapCenter})`}
                filter="url(#heroGlow)"
                style={{ opacity: redHalfOpacity }}
              />

              <motion.circle
                cx={mapCenter}
                cy={mapCenter}
                r={mapRadius}
                fill="none"
                stroke="#22c55e"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="50 50"
                strokeDashoffset="50"
                transform={`rotate(-90 ${mapCenter} ${mapCenter})`}
                filter="url(#heroGlow)"
                style={{ opacity: greenHalfOpacity }}
              />

              {/* Barras animadas: cada una llena su mitad */}
              <motion.path
                d={arcLeft}
                fill="none"
                stroke="#22c55e"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength={1}
                filter="url(#heroGlow)"
                style={{
                  strokeDasharray: greenDashArray,
                  opacity: greenRingOpacity,
                }}
              />

              <motion.path
                d={arcRight}
                fill="none"
                stroke="#ef4444"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength={1}
                filter="url(#heroGlow)"
                style={{
                  strokeDasharray: redDashArray,
                  opacity: redRingOpacity,
                }}
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
