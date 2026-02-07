"use client";

import Image from "next/image";
import { SPONSORS } from "./SponsorsBar";

export default function SponsorsStrip() {
  return (
    <div className="rounded-2xl bg-[#0b0b0b]/35 ring-1 ring-white/10 backdrop-blur-md px-3 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.35)]">
      <div className="text-[10px] uppercase tracking-[0.28em] text-[#9a9593]">
        Sponsors
      </div>

      <div className="mt-2 flex items-center gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SPONSORS.map((s) => (
          <div
            key={s.key}
            className="shrink-0 h-11 w-11 rounded-full bg-[#0f0f0f] ring-1 ring-white/10 overflow-hidden grid place-items-center"
            title={s.name}
          >
            <Image
              src={s.src}
              alt={s.name}
              width={80}
              height={80}
              className="h-[78%] w-[78%] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]"
              priority={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
