"use client";

import { motion } from "framer-motion";

export default function MapMock() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:translate-x-24 xl:translate-x-32 2xl:translate-x-40">

      {/* Glow exterior */}
      <div className="absolute w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.06),_transparent_60%)]" />

      {/* Esfera principal */}
      <motion.div
        className="relative w-[600px] h-[600px] rounded-full bg-[#111] shadow-[0_0_180px_rgba(0,0,0,0.9)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* MAPA (rellena hasta el primer aro) */}
        <div className="absolute inset-8 rounded-full overflow-hidden">
          <img
            src="/img/mapa-curupi.png"
            alt="Mapa Isla Curupí"
            className="w-full h-full object-cover scale-[1.15]"
          />
        </div>

        {/* Aros */}
        <motion.div
          className="absolute inset-8 rounded-full border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />

        <motion.div
          className="absolute inset-16 rounded-full border border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        />

        {/* Persistent colored arcs (red top, green bottom) */}
        <svg viewBox="0 0 600 600" className="absolute inset-0">
          <defs>
            <filter id="heroGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Red arc: right/top half */}
          <circle
            cx="300"
            cy="300"
            r="296"
            fill="none"
            stroke="#ef4444"
            strokeWidth="9"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="50 50"
            transform="rotate(-90 300 300)"
            filter="url(#heroGlow)"
            opacity="1"
          />
          {/* Green arc: left/bottom half */}
          <circle
            cx="300"
            cy="300"
            r="296"
            fill="none"
            stroke="#22c55e"
            strokeWidth="9"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="50 50"
            transform="rotate(90 300 300)"
            filter="url(#heroGlow)"
            opacity="1"
          />
        </svg>
      </motion.div>
    </div>
  );
}
