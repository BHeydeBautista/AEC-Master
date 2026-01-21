"use client";

import { motion } from "framer-motion";

export default function MapMock() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

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
      </motion.div>
    </div>
  );
}
