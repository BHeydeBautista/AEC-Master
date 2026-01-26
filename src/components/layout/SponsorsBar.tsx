"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const sponsors = [
  { name: "Atlético Echagüe Club", src: "/img/aec.jpeg" },
  { name: "Máster", src: "/img/logomaster.png" },
  { name: "Systemium", src: "/img/systemium.jpeg" },
];

type SponsorsBarProps = {
  className?: string;
};

export default function SponsorsBar({ className = "" }: SponsorsBarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flex w-[220px] flex-col items-end gap-3 ${className}`}
    >
      <span className="w-full text-right text-[11px] font-light tracking-[0.28em] text-[#8f8a87] uppercase">
        Sponsored by
      </span>

      <div className="flex w-full items-center justify-center gap-5">
        {sponsors.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.06,
              y: -2,
            }}
            className="group relative h-14 w-14 overflow-hidden rounded-full sm:h-16 sm:w-16"
            title={s.name}
          >
            {/* Ring */}
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10 transition group-hover:ring-white/25" />

            {/* Glow */}
            <div className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(17,179,255,0.18),transparent_60%)] opacity-0 transition group-hover:opacity-100" />

            <Image
              src={s.src}
              alt={s.name}
              width={72}
              height={72}
              className="h-full w-full object-contain"
            />
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
}
