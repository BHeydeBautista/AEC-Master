"use client";

import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

type StickyMapCircleProps = {
  heroTargetId?: string;
  distancesTargetId?: string;
  reglamentoTargetId?: string;
};

function clamp01(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function StickyMapCircle({
  heroTargetId = "hero",
  distancesTargetId = "distancias",
  reglamentoTargetId = "reglamento",
}: StickyMapCircleProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0);
  const tiltX = useMotionValue(-65);
  const tiltZ = useMotionValue(-25);
  const labelOpacity = useMotionValue(0);
  const mapSize = useMotionValue(460);
  const imageScale = useMotionValue(1.15);

  useEffect(() => {
    const heroSection = document.getElementById(heroTargetId);
    const distSection = document.getElementById(distancesTargetId);
    const reglamentoSection = document.getElementById(reglamentoTargetId);

    if (!heroSection || !distSection) return;

    let raf = 0;

    const compute = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Fase 1: Aparecer en Hero (último 30% del Hero)
      const heroStart = heroSection.offsetTop + heroSection.offsetHeight * 0.3;
      const heroEnd = heroSection.offsetTop + heroSection.offsetHeight;
      const heroProgress = clamp01((scrollY - heroStart) / Math.max(1, heroEnd - heroStart));

      // Fase 2: Transición Hero -> Distancias
      const transitionStart = heroEnd - vh * 0.3;
      const transitionEnd = distSection.offsetTop + vh * 0.4;
      const transitionProgress = clamp01((scrollY - transitionStart) / Math.max(1, transitionEnd - transitionStart));

      // Fase 3: Mantenerse en Distancias
      const distStart = distSection.offsetTop;
      const distEnd = distSection.offsetTop + distSection.offsetHeight;
      const isInDistances = scrollY >= distStart && scrollY <= distEnd;

      // Fase 4: Fade out en Reglamento
      let fadeOutProgress = 0;
      if (reglamentoSection) {
        const fadeStart = reglamentoSection.offsetTop - vh * 0.4;
        const fadeEnd = reglamentoSection.offsetTop - vh * 0.1;
        fadeOutProgress = clamp01((scrollY - fadeStart) / Math.max(1, fadeEnd - fadeStart));
      }

      // Opacidad: aparece en Hero, se mantiene, desaparece en Reglamento
      const baseOpacity = heroProgress > 0.2 ? 1 : 0;
      opacity.set(baseOpacity * (1 - fadeOutProgress));

      // Rotación: empieza inclinado y se vuelve plano
      tiltX.set(lerp(-65, 0, transitionProgress));
      tiltZ.set(lerp(-25, 0, transitionProgress));

      // Escala: crece durante la transición
      scale.set(lerp(1, 1.4, transitionProgress));

      // Tamaño del mapa: crece un poco
      mapSize.set(lerp(460, 520, transitionProgress));
      
      // Escala de la imagen: se ajusta
      imageScale.set(lerp(1.15, 1.1, transitionProgress));

      // Posición: en Distancias se centra más alto
      if (isInDistances) {
        y.set(lerp(0, -vh * 0.15, transitionProgress));
      } else {
        y.set(0);
      }
      x.set(0);

      // Label: aparece cuando estamos en transición avanzada
      labelOpacity.set(clamp01((transitionProgress - 0.5) / 0.3));
    };

    compute();
    window.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    }, { passive: true });
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [
    heroTargetId,
    distancesTargetId,
    reglamentoTargetId,
    opacity,
    scale,
    tiltX,
    tiltZ,
    x,
    y,
    labelOpacity,
    mapSize,
    imageScale,
  ]);

  return (
    <motion.div 
      className="pointer-events-none fixed inset-0 z-20 hidden md:block" 
      style={{ opacity }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ x, y, scale, willChange: "transform" }}
      >
        {/* Label */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-black/35 px-4 py-2 text-[11px] uppercase tracking-[0.26em] text-[#dddcda] ring-1 ring-white/10 backdrop-blur-md"
          style={{ opacity: labelOpacity }}
        >
          Mapa de recorridos
        </motion.div>

        {/* Mapa circular */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{ 
              rotateX: tiltX, 
              rotateZ: tiltZ,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div 
              className="relative rounded-full bg-[#111] shadow-[0_0_180px_rgba(0,0,0,0.9)]"
              style={{ 
                width: mapSize,
                height: mapSize,
              }}
            >
              {/* Imagen del mapa */}
              <div className="absolute inset-6 rounded-full overflow-hidden relative">
                <motion.div
                  style={{ 
                    scale: imageScale,
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <Image
                    src="/img/mapa-curupi.png"
                    alt="Mapa Isla Curupí"
                    fill
                    sizes="520px"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Bordes decorativos */}
              <div className="absolute inset-6 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/5" />

              {/* Rutas SVG */}
              <svg viewBox="0 0 460 460" className="absolute inset-0">
                <defs>
                  <filter id="circleGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Ruta roja - 2.5km */}
                <circle
                  cx="230"
                  cy="230"
                  r="226"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="9"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="50 50"
                  transform="rotate(-90 230 230)"
                  filter="url(#circleGlow)"
                  opacity="1"
                />

                {/* Ruta verde - 5km */}
                <circle
                  cx="230"
                  cy="230"
                  r="226"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="9"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="50 50"
                  transform="rotate(90 230 230)"
                  filter="url(#circleGlow)"
                  opacity="1"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Glow exterior */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06),_transparent_60%)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
