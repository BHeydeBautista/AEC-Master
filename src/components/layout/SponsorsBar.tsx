"use client";
import { motion } from "framer-motion";

const sponsors = [
  { name: "Sponsor 1", src: "/img/aec.png" },
  { name: "Sponsor 2", src: "/img/aec.png" },
  { name: "Sponsor 3", src: "/img/aec.png" },
];

export default function SponsorsBar() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-3 bg-black/40 backdrop-blur-md rounded-xl px-5 py-4 border border-white/5"
    >
      <span className="text-xs font-light tracking-widest text-[#8f8a87] uppercase">Sponsored by</span>
      <div className="flex items-center gap-4">
        {sponsors.map((s, i) => (
          <div
            key={s.name + i}
            className="w-12 h-12 rounded-lg bg-white/8 hover:bg-white/12 ring-1 ring-white/15 overflow-hidden flex items-center justify-center transition-all hover:ring-white/25"
            title={s.name}
          >
            <img
              src={s.src}
              alt={s.name}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </motion.aside>
  );
}
