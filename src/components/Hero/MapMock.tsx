"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import FloatingIsland from "./FloatingIsland";

export default function MapMock() {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      <div className="relative h-[760px] w-[560px]">
        {/* Floating Island (holograma) */}
        <FloatingIsland
          position="absolute"
          className="z-20"
          offsetX={0}
          offsetY={-240}
          width={720}
          height={360}
        />

        {/* Glow exterior */}
        <div className="pointer-events-none absolute left-1/2 top-[360px] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06),_transparent_60%)]" />

        {/* Mapa inclinado */}
        <motion.div
          className="absolute left-1/2 top-[340px] -translate-x-1/2"
          initial={{ rotateX: 0, rotateZ: 0, opacity: 0 }}
          animate={{ rotateX: -65, rotateZ: -25, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative h-[460px] w-[460px] rounded-full bg-[#111] shadow-[0_0_180px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-6 rounded-full overflow-hidden relative">
              <Image
                src="/img/mapa-curupi.png"
                alt="Mapa Isla Curupí"
                fill
                sizes="460px"
                className="object-cover scale-[1.15]"
                priority
              />
            </div>

            <motion.div
              className="absolute inset-6 rounded-full border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            />

            <motion.div
              className="absolute inset-12 rounded-full border border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />

            <svg viewBox="0 0 460 460" className="absolute inset-0">
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
                filter="url(#heroGlow)"
                opacity="1"
              />

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
                filter="url(#heroGlow)"
                opacity="1"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
