"use client";

import type { MotionValue } from "framer-motion";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { animate as animeAnimate, svg as animeSvg } from "animejs";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function parseObjectPosition(position: string | undefined): {
  x: number;
  y: number;
} {
  // Soporta formatos tipo "52% 62%". Fallback a center.
  if (!position) return { x: 0.5, y: 0.5 };
  const parts = position.trim().split(/\s+/);
  const px = parts[0] ?? "50%";
  const py = parts[1] ?? "50%";
  const toFrac = (v: string) => {
    const lower = v.toLowerCase();
    if (lower === "left" || lower === "top") return 0;
    if (lower === "center") return 0.5;
    if (lower === "right" || lower === "bottom") return 1;
    const m = lower.match(/^(-?\d+(?:\.\d+)?)%$/);
    if (m) return clamp01(parseFloat(m[1]) / 100);
    return 0.5;
  };
  return { x: toFrac(px), y: toFrac(py) };
}

function getKnownMapNaturalSize(src: string): { w: number; h: number } | null {
  if (src.includes("mapa-curupi5")) return { w: 2508, h: 1139 };
  if (src.includes("mapa-curupi4")) return { w: 2508, h: 1139 };
  if (src.includes("mapa-curupi3")) return { w: 2508, h: 1139 };
  if (src.includes("mapa-curupi2")) return { w: 2508, h: 1139 };
  return null;
}

const MAP_IMAGE_WIDTH = 2508;
const MAP_IMAGE_HEIGHT = 1139;

function mapPxTo01(px: number, py: number) {
  return { x: px / MAP_IMAGE_WIDTH, y: py / MAP_IMAGE_HEIGHT };
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
  const routeGlowId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const distanciasSectionRef = useRef<HTMLElement | null>(null);
  const distance2Ref = useRef<HTMLElement | null>(null);
  const distance5Ref = useRef<HTMLElement | null>(null);

  const greenRoutePathRef = useRef<SVGPathElement | null>(null);
  const greenRouteTrailRef = useRef<SVGPathElement | null>(null);
  const greenRouteHighlightRef = useRef<SVGPathElement | null>(null);
  const greenRouteMarkerRef = useRef<SVGGElement | null>(null);
  const greenRouteAnimRef = useRef<ReturnType<typeof animeAnimate> | null>(
    null,
  );
  const [mapNatural, setMapNatural] = useState<{ w: number; h: number } | null>(
    null,
  );

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
    offset: ["start start", "end start"],
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
  // Zoom extra sobre el mapa (además del object-fit). Útil para que la imagen
  // “llene” mejor el círculo sin tener que cambiar el encuadre.
  // Referencia: este valor multiplica el escalado que hace `object-cover`.
  // 1.0 = sin zoom extra (más “alejado”, muestra mejor salida/llegada)
  const DEFAULT_IMAGE_SCALE = 1.0;
  const appliedImageScale = props.imageScale ?? DEFAULT_IMAGE_SCALE;
  const mapImageSrc = props.mapImageSrc ?? "/img/mapa-curupi5.png";
  // Default: rellenar el círculo con el mapa (sin duplicar imágenes).
  // Nota: `cover` puede recortar un poco si el aspect ratio no coincide.
  const imageFit = props.imageFit ?? "cover";
  // Ajuste de encuadre: baja un poco el foco para mostrar mejor la zona de playas.
  const imagePosition = props.imagePosition ?? "53% 62%";

  // Recorrido 2.5km (verde) en coordenadas normalizadas del PNG (0..1).
  // - POIs: puntos marcados (salida/llegada/boyas)
  // - Curve: puntos de control para que la pista siga el trazado rojo
  const greenRoutePois01 = useMemo(
    () => [
      // Coordenadas medidas en Photoshop (px sobre 2508x1139) y convertidas a 0..1.
      { key: "Salida", ...mapPxTo01(1813.84, 532.09) },
      { key: "Boya 1", ...mapPxTo01(920, 741) },
      { key: "Boya 2", ...mapPxTo01(1410, 790) },
      { key: "Llegada", ...mapPxTo01(860, 762) },
    ],
    [],
  );

  const greenRouteCurvePoints01 = useMemo(
    () => [
      // 🟢 Salida (playa derecha)
      mapPxTo01(1813.84, 532.09),

      // Tramo costanera (puntos medidos en Photoshop)
      // Primer tramo y segundo tramo: bajar para que no quede tan arriba
      mapPxTo01(1665, 600),
      mapPxTo01(1590, 700),
      mapPxTo01(1505, 774),
      mapPxTo01(1339, 830),
      mapPxTo01(1230, 830),
      mapPxTo01(1111, 816),
      mapPxTo01(1037, 798),
      mapPxTo01(969, 777),
      mapPxTo01(917, 763),

      // Aproximación al final
      mapPxTo01(917, 763),

      // 🔴 Llegada
      mapPxTo01(860, 762),
    ],
    [],
  );

  const greenRoutePathD = useMemo(() => {
    const natural = mapNatural ??
      getKnownMapNaturalSize(mapImageSrc) ?? { w: 2508, h: 1139 };
    const pos = parseObjectPosition(imagePosition);
    const containerW = mapSize;
    const containerH = mapSize;
    const imgW = natural.w;
    const imgH = natural.h;
    const scaleFit =
      imageFit === "contain"
        ? Math.min(containerW / imgW, containerH / imgH)
        : Math.max(containerW / imgW, containerH / imgH);
    const displayedW = imgW * scaleFit;
    const displayedH = imgH * scaleFit;
    const offsetX = (containerW - displayedW) * pos.x;
    const offsetY = (containerH - displayedH) * pos.y;

    const toStage = (p: { x: number; y: number }) => ({
      x: offsetX + p.x * displayedW,
      y: offsetY + p.y * displayedH,
    });

    const pts = greenRouteCurvePoints01.map(toStage);
    if (pts.length < 2) return "";

    // Catmull-Rom -> Bézier para suavizar la curva.
    let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1 = {
        x: p1.x + (p2.x - p0.x) / 6,
        y: p1.y + (p2.y - p0.y) / 6,
      };
      const c2 = {
        x: p2.x - (p3.x - p1.x) / 6,
        y: p2.y - (p3.y - p1.y) / 6,
      };
      d += ` C ${c1.x.toFixed(2)} ${c1.y.toFixed(2)}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return d;
  }, [
    imageFit,
    imagePosition,
    mapImageSrc,
    mapNatural,
    mapSize,
    greenRouteCurvePoints01,
  ]);

  // Cargas por card:
  // - distance2: llena verde y revela mapa
  // - distance5: llena rojo y recarga/revela mapa
  // Nota: en algunos layouts el progreso no llega a 1 exacto; amplificamos para asegurar el 100%.
  const LOAD_GAIN = 1.35;
  const greenLoad = useTransform(distance2Progress, (v) =>
    clamp01(v * LOAD_GAIN),
  );
  const redLoad = useTransform(distance5Progress, (v) =>
    clamp01(v * LOAD_GAIN),
  );

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
  const baseHalfOpacity = useTransform(
    dimT,
    (t) => ((1 - t) * 1 + t * 0.18) as number,
  );

  const greenHalfOpacity = useTransform(
    [baseHalfOpacity, greenLoad],
    (values) => {
      const base = values[0] as number;
      const g = values[1] as number;
      return (g > 0.02 ? 1 : base) as number;
    },
  );

  const redHalfOpacity = useTransform([baseHalfOpacity, redLoad], (values) => {
    const base = values[0] as number;
    const r = values[1] as number;
    return (r > 0.02 ? 1 : base) as number;
  });

  const greenActive = useTransform(
    greenLoad,
    (g) => (g > 0.001 ? 1 : 0) as number,
  );
  const redActive = useTransform(redLoad, (r) => (r > 0.001 ? 1 : 0) as number);

  // Cuando el rojo está cargando, bajamos el verde para que se note el cambio.
  const redLoading = useTransform(
    redLoad,
    (r) => (r > 0.02 && r < 0.98 ? 1 : 0) as number,
  );
  const greenFade = useTransform(
    redLoading,
    (a) => (a >= 1 ? 0.12 : 1) as number,
  );

  const greenRingOpacity = useTransform(
    [ringOpacity, greenActive, greenFade],
    (v) => (v[0] as number) * (v[1] as number) * (v[2] as number),
  );

  // Recorrido verde: la pista queda visible y el marcador corre en loop (no atado al scroll).
  const greenTrackShadowOpacity = useTransform(
    greenRingOpacity,
    (o) => (o > 0.01 ? 0.22 : 0) as number,
  );
  const greenTrackBaseOpacity = useTransform(
    greenRingOpacity,
    (o) => (o > 0.01 ? 0.55 : 0) as number,
  );
  const greenTrackBeamOpacity = useTransform(
    greenRingOpacity,
    (o) => (o > 0.01 ? 1 : 0) as number,
  );
  const greenMarkerOpacity = useTransform(
    greenActive,
    (g) => (g > 0.01 ? 1 : 0) as number,
  );

  useEffect(() => {
    if (
      !greenRoutePathRef.current ||
      !greenRouteTrailRef.current ||
      !greenRouteMarkerRef.current ||
      !greenRouteHighlightRef.current
    )
      return;
    if (!greenRoutePathD) return;

    greenRouteAnimRef.current?.pause();

    const setTrail = (t: number) => {
      const clamped = Math.min(1, Math.max(0, t));
      greenRouteTrailRef.current?.setAttribute(
        "stroke-dasharray",
        `${clamped.toFixed(4)} ${(1 - clamped).toFixed(4)}`,
      );
      greenRouteTrailRef.current?.setAttribute("stroke-dashoffset", "0");
    };

    const setBeam = (t: number) => {
      // Haz "detrás" del marcador: el marcador va primero y el haz lo sigue.
      const end = Math.min(1, Math.max(0, t));
      // Un poco más largo para que se perciba el “prendido” detrás del punto.
      const maxLen = 0.22;
      const start = Math.max(0, end - maxLen);
      const len = Math.max(0, end - start);

      greenRouteHighlightRef.current?.setAttribute(
        "stroke-dasharray",
        `${len.toFixed(4)} ${(1 - len).toFixed(4)}`,
      );
      greenRouteHighlightRef.current?.setAttribute(
        "stroke-dashoffset",
        `${(-start).toFixed(4)}`,
      );
    };

    // Estado inicial (apagado)
    setTrail(0);
    setBeam(0);

    const motionPath = animeSvg.createMotionPath(greenRoutePathRef.current);
    const anim = animeAnimate(greenRouteMarkerRef.current, {
      ...motionPath,
      duration: 5200,
      ease: "linear",
      loop: true,
      autoplay: false,
      update: (a: { progress?: number }) => {
        const t = (a.progress ?? 0) / 100;
        // Deja encendido lo recorrido y resetea al reiniciar el loop.
        setTrail(t);
        setBeam(t);
      },
    });

    greenRouteAnimRef.current = anim;

    const setRunning = (active: number) => {
      if (active > 0.5) {
        anim.play();
      } else {
        anim.pause();
        anim.seek(0);
        setTrail(0);
        setBeam(0);
      }
    };

    setRunning(greenActive.get());
    const unsub = greenActive.on("change", setRunning);

    return () => {
      unsub();
      anim.pause();
    };
  }, [greenActive, greenRoutePathD]);

  const redRingOpacity = useTransform(
    [ringOpacity, redActive],
    (v) => (v[0] as number) * (v[1] as number),
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
            transformStyle: "preserve-3d",
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
                    className={
                      imageFit === "contain" ? "object-contain" : "object-cover"
                    }
                    style={{
                      objectPosition: imagePosition,
                      backfaceVisibility: "hidden",
                      transform: "translateZ(0)",
                    }}
                    priority
                    onLoadingComplete={(img) => {
                      const w = img.naturalWidth;
                      const h = img.naturalHeight;
                      if (w && h) setMapNatural({ w, h });
                    }}
                  />

                  {/* Recorrido 2.5km (verde): se revela + marcador avanza */}
                  <svg
                    viewBox={`0 0 ${mapSize} ${mapSize}`}
                    className="absolute inset-0 pointer-events-none"
                    aria-hidden
                  >
                    <defs>
                      <filter
                        id={routeGlowId}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="2.4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      {/* Glow más ancho para el “haz de luz” */}
                      <filter
                        id={`${routeGlowId}-wide`}
                        x="-60%"
                        y="-60%"
                        width="220%"
                        height="220%"
                      >
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      <linearGradient
                        id={`${routeGlowId}-grad`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                        <stop
                          offset="35%"
                          stopColor="#22c55e"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="75%"
                          stopColor="#22c55e"
                          stopOpacity="0.95"
                        />
                        <stop
                          offset="100%"
                          stopColor="#eafff1"
                          stopOpacity="1"
                        />
                      </linearGradient>
                    </defs>

                    {/* Base oscura para contraste ("fondo") */}
                    <motion.path
                      d={greenRoutePathD}
                      fill="none"
                      stroke="#000"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#${routeGlowId}-wide)`}
                      style={{ opacity: greenTrackShadowOpacity }}
                    />

                    {/* Pista verde suave */}
                    <motion.path
                      ref={greenRoutePathRef}
                      d={greenRoutePathD}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={`url(#${routeGlowId})`}
                      style={{ opacity: greenTrackBaseOpacity }}
                    />

                    {/* Recorrido encendido (queda prendido a medida que avanza y se apaga al reiniciar) */}
                    <motion.path
                      ref={greenRouteTrailRef}
                      d={greenRoutePathD}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="11"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      strokeDasharray="0 1"
                      strokeDashoffset={0}
                      filter={`url(#${routeGlowId}-wide)`}
                      style={{
                        opacity: greenTrackBeamOpacity,
                        mixBlendMode: "screen",
                      }}
                    />

                    {/* Haz de luz (tramo brillante que recorre) */}
                    <motion.path
                      ref={greenRouteHighlightRef}
                      d={greenRoutePathD}
                      fill="none"
                      stroke={`url(#${routeGlowId}-grad)`}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={1}
                      strokeDasharray="0 1"
                      strokeDashoffset={0}
                      filter={`url(#${routeGlowId}-wide)`}
                      style={{
                        opacity: greenTrackBeamOpacity,
                        mixBlendMode: "screen",
                      }}
                    />

                    {/* Puntos fijos: salida / boyas / llegada */}
                    {(() => {
                      const natural = mapNatural ??
                        getKnownMapNaturalSize(mapImageSrc) ?? {
                          w: 2508,
                          h: 1139,
                        };
                      const pos = parseObjectPosition(imagePosition);
                      const containerW = mapSize;
                      const containerH = mapSize;
                      const scaleFit =
                        imageFit === "contain"
                          ? Math.min(
                              containerW / natural.w,
                              containerH / natural.h,
                            )
                          : Math.max(
                              containerW / natural.w,
                              containerH / natural.h,
                            );
                      const displayedW = natural.w * scaleFit;
                      const displayedH = natural.h * scaleFit;
                      const offsetX = (containerW - displayedW) * pos.x;
                      const offsetY = (containerH - displayedH) * pos.y;
                      const toStage = (p: { x: number; y: number }) => ({
                        x: offsetX + p.x * displayedW,
                        y: offsetY + p.y * displayedH,
                      });
                      const pts = greenRoutePois01.map((p) => {
                        const base = toStage(p);
                        const isBuoy = /boya/i.test(p.key);
                        // Las boyas se renderizan separadas del trazo (offset visual en px).
                        // Salida/Llegada quedan sobre la ruta.
                        const buoyOffset = isBuoy
                          ? { x: 18, y: -18 }
                          : { x: 0, y: 0 };

                        const x = base.x + buoyOffset.x;
                        const y = base.y + buoyOffset.y;

                        // Etiquetas: auto flip para que no se corten cerca del borde.
                        const isRightSide = x > mapSize * 0.72;
                        const textAnchor: "start" | "end" = isRightSide
                          ? "end"
                          : "start";
                        const dx = isRightSide ? -12 : 12;
                        const dy = y < 26 ? 16 : -14;
                        return {
                          key: p.key,
                          x,
                          y,
                          isBuoy,
                          labelX: x + dx,
                          labelY: y + dy,
                          textAnchor,
                        };
                      });
                      return pts.map((p) => (
                        <g key={p.key} opacity={0.9}>
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={p.isBuoy ? 13 : 14}
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth={2}
                            opacity={0.22}
                            filter={`url(#${routeGlowId})`}
                          />
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={p.isBuoy ? 6 : 7}
                            fill="#111"
                            stroke="#22c55e"
                            strokeWidth={3}
                            filter={`url(#${routeGlowId})`}
                          />

                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={2.6}
                            fill="#eafff1"
                            opacity={0.95}
                          />

                          <text
                            x={p.labelX}
                            y={p.labelY}
                            textAnchor={p.textAnchor}
                            dominantBaseline="middle"
                            style={{
                              pointerEvents: "none",
                              paintOrder: "stroke",
                            }}
                            fontSize={11}
                            fontWeight={650}
                            letterSpacing={"0.02em"}
                            fill="#eafff1"
                            stroke="rgba(0,0,0,0.65)"
                            strokeWidth={3}
                          >
                            {p.key}
                          </text>
                        </g>
                      ));
                    })()}

                    {/* Marcador móvil */}
                    <motion.g
                      ref={greenRouteMarkerRef}
                      style={{ opacity: greenMarkerOpacity }}
                    >
                      <circle
                        r="11"
                        cx="0"
                        cy="0"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="3"
                        filter={`url(#${routeGlowId}-wide)`}
                        opacity="0.7"
                      />
                      <circle
                        r="7"
                        cx="0"
                        cy="0"
                        fill="#22c55e"
                        filter={`url(#${routeGlowId})`}
                      />
                      <circle
                        r="3.2"
                        cx="0"
                        cy="0"
                        fill="#eafff1"
                        opacity="0.95"
                      />
                    </motion.g>
                  </svg>
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

            <svg
              viewBox={`0 0 ${mapSize} ${mapSize}`}
              className="absolute inset-0"
            >
              <defs>
                <filter
                  id="heroGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
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
