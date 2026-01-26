"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { MotionValue } from "framer-motion";


interface Sponsor {
  name: string;
  src: string;
}

function SponsorItem({
  sponsor,
  index,
  x,
}: {
  sponsor: Sponsor;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  x: any;
}) {
  // posición relativa al centro
  const itemX = useTransform(x, (v: number) => v + index * 160);

  // 🔥 EFECTO CLAVE
  const scale = useTransform(itemX, [-300, 0, 300], [0.6, 1.45, 0.6]);
  const opacity = useTransform(itemX, [-300, 0, 300], [0.3, 1, 0.3]);
  const z = useTransform(itemX, [-300, 0, 300], [-120, 120, -120]);

  return (
    <motion.div
      style={{
        x: itemX,
        scale,
        opacity,
        translateZ: z,
        rotateX: "14deg",
      }}
      className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-28 sm:w-28"
    >
      <Image
        src={sponsor.src}
        alt={sponsor.name}
        width={160}
        height={160}
        className="object-contain"
      />
    </motion.div>
  );
}

export default function FlowingSponsors3D({ data }: { data: Sponsor[] }) {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    x.set(x.get() - delta * 0.05); // velocidad
  });

  return (
    <div
      ref={trackRef}
      className="relative mt-14 h-[180px] overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="relative h-full w-full">
        {[...data, ...data, ...data].map((sponsor, i) => (
          <SponsorItem
            key={`${sponsor.name}-${i}`}
            sponsor={sponsor}
            index={i}
            x={x}
          />
        ))}
      </div>

      {/* fade lateral */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
    </div>
  );
}
