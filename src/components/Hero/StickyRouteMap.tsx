"use client";

import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import MapMock from "./MapMock";

type StickyRouteMapProps = {
  heroTargetId?: string;
  distancesTargetId?: string;
  reglamentoTargetId?: string;
  heroAnchorId?: string;
  distancesAnchorId?: string;
};

function clamp01(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function StickyRouteMap({
  heroTargetId = "hero",
  distancesTargetId = "distancias",
  reglamentoTargetId = "reglamento",
  heroAnchorId = "map-anchor-hero",
  distancesAnchorId = "map-anchor-distancias",
}: StickyRouteMapProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const tiltX = useMotionValue(-65);
  const tiltZ = useMotionValue(-25);
  const labelOpacity = useMotionValue(0);
  const islandOpacity = useMotionValue(1);
  const mapTop = useMotionValue(340);
  const glowTop = useMotionValue(360);
  const imageScale = useMotionValue(1);

  useEffect(() => {
    const heroSection = document.getElementById(heroTargetId);
    const distSection = document.getElementById(distancesTargetId);
    const reglamentoSection = document.getElementById(reglamentoTargetId);
    const heroAnchor = document.getElementById(heroAnchorId) ?? heroSection;
    const distAnchor = document.getElementById(distancesAnchorId) ?? distSection;

    if (!heroSection || !distSection || !heroAnchor || !distAnchor) return;

    let raf = 0;

    const compute = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Progreso continuo Hero -> Distancias (controlado por scroll)
      // Empieza antes de salir del Hero y termina ya dentro de Distancias.
      const start = heroSection.offsetTop + heroSection.offsetHeight - vh * 0.85;
      const end = distSection.offsetTop + vh * 0.25;
      const t = clamp01((scrollY - start) / Math.max(1, end - start));

      // Importante: en Hero NO movemos el stage (queda como antes).
      // Solo vamos "viajando" hacia el ancla de Distancias.
      const distRect = distAnchor.getBoundingClientRect();
      const distCx = distRect.left + distRect.width / 2;
      const distCy = distRect.top + distRect.height / 2;
      x.set(lerp(0, distCx - vw / 2, t));
      y.set(lerp(0, distCy - vh / 2, t));

      // Tilt y escala (460 -> 560 aprox = 1.217)
      tiltX.set(lerp(-65, 0, t));
      tiltZ.set(lerp(-25, 0, t));
      scale.set(lerp(1, 1.22, t));

      // Layout interno: en Hero el mapa/glow estaban más abajo (top 340/360).
      // En Distancias queremos el círculo centrado dentro del stage.
      mapTop.set(lerp(340, 150, t));
      glowTop.set(lerp(360, 380, t));
      imageScale.set(1);

      // Isla solo en Hero (se apaga temprano para que el foco sea el mapa)
      islandOpacity.set(clamp01(1 - t * 1.6));

      // Etiqueta solo cuando estamos claramente en distancias
      labelOpacity.set(clamp01((t - 0.62) / 0.22));

      // Fade-out al llegar a Reglamento
      if (reglamentoSection) {
        const hideStart = reglamentoSection.offsetTop - vh * 0.35;
        const hideEnd = reglamentoSection.offsetTop - vh * 0.05;
        const hideT = clamp01((scrollY - hideStart) / Math.max(1, hideEnd - hideStart));
        opacity.set(1 - hideT);
      } else {
        opacity.set(1);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [
    heroTargetId,
    distancesTargetId,
    reglamentoTargetId,
    heroAnchorId,
    distancesAnchorId,
    opacity,
    scale,
    tiltX,
    tiltZ,
    x,
    y,
    labelOpacity,
    islandOpacity,
    mapTop,
    glowTop,
    imageScale,
  ]);

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-20 hidden md:block" style={{ opacity }}>
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ x, y, scale, willChange: "transform" }}
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-black/35 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-[#dddcda] ring-1 ring-white/10 backdrop-blur-md"
          style={{ opacity: labelOpacity }}
        >
          Mapa de recorridos
        </motion.div>

        <MapMock
          tiltX={tiltX}
          tiltZ={tiltZ}
          showIsland
          islandOpacity={islandOpacity}
          mapTop={mapTop}
          glowTop={glowTop}
          imageScale={imageScale}
          mapSize={460}
          stageWidth={560}
          stageHeight={760}
          perspective={1200}
        />
      </motion.div>
    </motion.div>
  );
}
