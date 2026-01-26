"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { MotionValue } from "framer-motion";

interface Sponsor {
  name: string;
  src: string;
}

const ITEM_WIDTH = 160;
const SPEED = 0.045;
const DUPLICATE_COUNT = 3;

function SponsorItem({
  sponsor,
  index,
  x,
}: {
  sponsor: Sponsor;
  index: number;
  x: MotionValue<number>;
}) {
  const itemX = useTransform(x, (v) => v + index * ITEM_WIDTH);

  const scale = useTransform(
    itemX,
    [-500, 0, 500],
    [0.7, 1.5, 0.7]
  );

  const opacity = useTransform(
    itemX,
    [-500, -250, 0, 250, 500],
    [0.6, 0.9, 1, 0.9, 0.6]
  );

  const z = useTransform(
    itemX,
    [-500, 0, 500],
    [-120, 160, -120]
  );

  return (
    <motion.div
      style={{
        x: itemX,
        scale,
        opacity,
        translateZ: z,
        rotateX: "10deg",
      }}
      className="absolute left-1/2 top-1/2 flex
                 h-24 w-24 -translate-x-1/2 -translate-y-1/2
                 items-center justify-center
                 sm:h-28 sm:w-28"
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

export default function FlowingSponsors3D({
  data,
}: {
  data: Sponsor[];
}) {
  const blockWidth = data.length * ITEM_WIDTH;

  // 🔑 arrancamos desplazados UN bloque
  const x = useMotionValue(-blockWidth);

  useAnimationFrame((_, delta) => {
    let next = x.get() - delta * SPEED;

    // 🔁 cuando un bloque completo salió → lo reciclamos
    if (next <= -blockWidth * 2) {
      next += blockWidth;
    }

    x.set(next);
  });

  return (
    <div
      className="relative mt-14 h-[200px] overflow-hidden"
      style={{ perspective: "1100px" }}
    >
      <div className="relative h-full w-full">
        {Array.from({ length: DUPLICATE_COUNT }).flatMap((_, dup) =>
          data.map((sponsor, i) => (
            <SponsorItem
              key={`${sponsor.name}-${dup}-${i}`}
              sponsor={sponsor}
              index={i + dup * data.length}
              x={x}
            />
          ))
        )}
      </div>

      {/* fade lateral correcto */}
      <div
        className="pointer-events-none absolute inset-0
                   bg-gradient-to-r
                   from-black/95 via-transparent to-black/95"
      />
    </div>
  );
}
