"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { MotionValue } from "framer-motion";

export type SponsorVariant = "club" | "water" | "tech" | "default" | "featured";

export type FlowingSponsor = {
  name: string;
  src: string;
  variant?: SponsorVariant;
  featured?: boolean;
};

const DUPLICATE_COUNT = 3;

function SponsorFloat({
  sponsor,
  index,
  x,
  y,
  spacing,
  isFeatured,
}: {
  sponsor: FlowingSponsor;
  index: number;
  x: MotionValue<number>;
  y: number;
  spacing: number;
  isFeatured: boolean;
}) {
  const itemX = useTransform(x, (v) => v + index * spacing);

  // 0 = centro. Queremos que crezca mucho en el centro.
  const baseScale = useTransform(itemX, [-780, 0, 780], [0.62, 1.85, 0.62]);
  const featuredScale = useTransform(itemX, [-780, 0, 780], [0.66, 2.05, 0.66]);
  const scale = isFeatured ? featuredScale : baseScale;

  const opacity = useTransform(itemX, [-900, -520, 0, 520, 900], [0.05, 0.55, 1, 0.55, 0.05]);
  const glowOpacity = useTransform(itemX, [-520, 0, 520], [0, 0.55, 0]);

  const variant = sponsor.variant ?? (sponsor.featured ? "featured" : "default");
  const glow =
    variant === "featured"
      ? "radial-gradient(circle, rgba(255,214,110,0.45), transparent 64%)"
      : variant === "tech"
        ? "radial-gradient(circle, rgba(120,255,220,0.30), transparent 64%)"
        : "radial-gradient(circle, rgba(17,179,255,0.32), transparent 64%)";

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ x: itemX, y, scale, opacity, willChange: "transform, opacity" }}
    >
      <div className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 blur-2xl"
          style={{ opacity: glowOpacity, background: glow }}
        />

        {/* Logo sin card: solo un frame invisible para layout */}
        <div className="relative h-[84px] w-[248px] sm:h-[96px] sm:w-[300px] md:h-[108px] md:w-[360px]">
          <Image
            src={sponsor.src}
            alt={sponsor.name}
            fill
            sizes="360px"
            quality={100}
            className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
            priority={false}
          />
        </div>
      </div>
    </motion.div>
  );
}

function FlowRow({
  items,
  speed,
  direction,
  y,
  spacing,
}: {
  items: FlowingSponsor[];
  speed: number;
  direction: 1 | -1;
  y: number;
  spacing: number;
}) {
  const blockWidth = items.length * spacing;
  const x = useMotionValue(blockWidth ? -blockWidth : 0);

  useAnimationFrame((_, delta) => {
    if (!blockWidth) return;
    const dt = Math.min(delta, 50);
    let next = x.get() + direction * dt * speed;

    const lowerBound = -blockWidth * 2;
    const upperBound = -blockWidth;

    while (next <= lowerBound) next += blockWidth;
    while (next > upperBound) next -= blockWidth;
    x.set(next);
  });

  return (
    <div className="absolute inset-0">
      {Array.from({ length: DUPLICATE_COUNT }).flatMap((_, dup) =>
        items.map((sponsor, i) => {
          const isFeatured = (sponsor.variant ?? (sponsor.featured ? "featured" : "default")) === "featured";
          return (
            <SponsorFloat
              key={`${sponsor.name}-${dup}-${i}`}
              sponsor={sponsor}
              index={i + dup * items.length}
              x={x}
              y={y}
              spacing={spacing}
              isFeatured={isFeatured}
            />
          );
        }),
      )}
    </div>
  );
}

export default function FlowingSponsors({ data }: { data: FlowingSponsor[] }) {
  if (!data?.length) return null;

  const featured = data.filter(
    (s) => (s.variant ?? (s.featured ? "featured" : "default")) === "featured",
  );
  const rest = data.filter(
    (s) => (s.variant ?? (s.featured ? "featured" : "default")) !== "featured",
  );
  const ordered = featured.concat(rest);

  const spacing = 420;

  return (
    <div className="relative mt-10 overflow-hidden rounded-[28px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(17,179,255,0.12), transparent 56%), radial-gradient(circle at 70% 72%, rgba(255,214,110,0.10), transparent 60%)",
        }}
      />

      {/* Edge fade para que entren/salgan suave */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/85" />

      {/* Mobile: 1 fila, bien grande */}
      <div className="relative h-[190px] sm:hidden">
        <FlowRow items={ordered} speed={0.16} direction={-1} y={0} spacing={spacing} />
      </div>

      {/* Desktop: 2 filas con velocidades distintas */}
      <div className="relative hidden h-[280px] sm:block">
        <FlowRow items={ordered} speed={0.14} direction={-1} y={-52} spacing={spacing} />
        <FlowRow items={ordered} speed={0.12} direction={1} y={56} spacing={spacing} />
      </div>
    </div>
  );
}
