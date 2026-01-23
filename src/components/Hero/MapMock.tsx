"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function MapMock() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Rotación: empieza de perfil (65°) y se vuelve plano (0°)
  const rotateX = useTransform(scrollYProgress, [0, 0.7], [-65, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.7], [-25, 0]);
  
  // Mantener Hero como antes; al acercarse a Distancias se corre a la derecha.
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.65, 1.15]);
  const x = useTransform(scrollYProgress, [0, 0.45, 0.7], [0, 0, 420]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -200]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 flex items-center justify-center z-20"
      style={{ perspective: "1200px" }}
    >
      <motion.div 
        className="relative h-[760px] w-[560px]"
        style={{ x, y, scale }}
      >
        {/* Glow exterior */}
        <div className="pointer-events-none absolute left-1/2 top-[360px] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06),_transparent_60%)]" />

        {/* Mapa con rotación animada */}
        <motion.div
          className="absolute left-1/2 top-[340px] -translate-x-1/2"
          style={{ 
            rotateX,
            rotateZ,
            transformStyle: "preserve-3d" 
          }}
        >
          <div className="relative h-[520px] w-[520px] rounded-full bg-[#111] shadow-[0_0_180px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-6 rounded-full overflow-hidden relative">
              <Image
                src="/img/mapa-curupi.png"
                alt="Mapa Isla Curupí"
                fill
                sizes="520px"
                className="object-cover scale-[1.12]"
                priority
              />
            </div>

            <div className="absolute inset-6 rounded-full border border-white/10" />
            <div className="absolute inset-12 rounded-full border border-white/5" />

            <svg viewBox="0 0 520 520" className="absolute inset-0">
              <defs>
                <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="260"
                cy="260"
                r="256"
                fill="none"
                stroke="#ef4444"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="50 50"
                transform="rotate(-90 260 260)"
                filter="url(#heroGlow)"
                opacity="1"
              />

              <circle
                cx="260"
                cy="260"
                r="256"
                fill="none"
                stroke="#22c55e"
                strokeWidth="9"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="50 50"
                transform="rotate(90 260 260)"
                filter="url(#heroGlow)"
                opacity="1"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
