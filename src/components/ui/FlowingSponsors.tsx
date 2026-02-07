"use client";

import {
  motion,
  useAnimationControls,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export type SponsorVariant = "club" | "water" | "tech" | "default" | "featured";

export type FlowingSponsor = {
  name: string;
  src: string;
  variant?: SponsorVariant;
  featured?: boolean;
};

const DUPLICATE_COUNT = 3;

type FlowProfile = "mobile" | "desktop";

function SponsorFloat({
  sponsor,
  index,
  x,
  y,
  spacing,
  isFeatured,
  profile,
}: {
  sponsor: FlowingSponsor;
  index: number;
  x: MotionValue<number>;
  y: number;
  spacing: number;
  isFeatured: boolean;
  profile: FlowProfile;
}) {
  const itemX = useTransform(x, (v) => v + index * spacing);

  const variant = sponsor.variant ?? (sponsor.featured ? "featured" : "default");

  // Dispara animación corta cuando el logo cruza el centro.
  const sheenControls = useAnimationControls();
  const pulseControls = useAnimationControls();
  const tiltControls = useAnimationControls();
  const inCenterRef = useRef(false);

  useEffect(() => {
    const triggerPx = profile === "desktop" ? 54 : 46;
    const unsubscribe = itemX.on("change", (v) => {
      const inCenter = Math.abs(v) <= triggerPx;
      if (inCenter && !inCenterRef.current) {
        inCenterRef.current = true;

        // Sheen (tech/featured más fuerte)
        void sheenControls.start({
          opacity: [0, variant === "featured" ? 0.95 : variant === "tech" ? 0.8 : 0.55, 0],
          x: ["-60%", "140%"],
          transition: { duration: 0.9, ease: "linear" },
        });

        // Pulse
        void pulseControls.start({
          opacity: [0, variant === "featured" ? 0.7 : 0.45, 0],
          scale: [0.92, 1.08, 1.18],
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        });

        // Tilt (club/featured)
        void tiltControls.start({
          rotateZ:
            variant === "club" ? [0, -3.5, 2.5, 0] : variant === "featured" ? [0, 2.5, -1.5, 0] : [0, 0.8, -0.6, 0],
          rotateY: variant === "featured" ? [0, 18, -10, 0] : [0, 6, -4, 0],
          transition: { duration: 0.7, ease: "easeInOut" },
        });
      }

      if (!inCenter && inCenterRef.current) inCenterRef.current = false;
    });

    return () => {
      unsubscribe();
    };
  }, [itemX, profile, sheenControls, pulseControls, tiltControls, variant]);

  // 0 = centro. Queremos que crezca mucho en el centro.
  const baseScale = useTransform(
    itemX,
    profile === "desktop" ? [-900, 0, 900] : [-780, 0, 780],
    profile === "desktop" ? [0.75, 1.35, 0.75] : [0.62, 1.85, 0.62],
  );
  const featuredScale = useTransform(
    itemX,
    profile === "desktop" ? [-900, 0, 900] : [-780, 0, 780],
    profile === "desktop" ? [0.78, 1.5, 0.78] : [0.66, 2.05, 0.66],
  );
  const scale = isFeatured ? featuredScale : baseScale;

  const opacity = useTransform(
    itemX,
    [-980, -620, 0, 620, 980],
    profile === "desktop" ? [0.12, 0.7, 1, 0.7, 0.12] : [0.05, 0.55, 1, 0.55, 0.05],
  );
  const glowOpacity = useTransform(
    itemX,
    profile === "desktop" ? [-560, 0, 560] : [-520, 0, 520],
    profile === "desktop" ? [0, 0.38, 0] : [0, 0.55, 0],
  );

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
      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={tiltControls}
        initial={false}
      >
        <motion.div
          aria-hidden
          className={
            "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl " +
            (profile === "desktop" ? "h-[180px] w-[180px]" : "h-[220px] w-[220px]")
          }
          style={{ opacity: glowOpacity, background: glow }}
        />

        {/* Pulse ring */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-[999px]"
          style={{
            background:
              variant === "featured"
                ? "radial-gradient(circle, rgba(255,214,110,0.18), transparent 66%)"
                : variant === "tech"
                  ? "radial-gradient(circle, rgba(120,255,220,0.14), transparent 66%)"
                  : "radial-gradient(circle, rgba(17,179,255,0.14), transparent 66%)",
          }}
          animate={pulseControls}
          initial={{ opacity: 0, scale: 0.95 }}
        />

        {/* Logo sin card: solo un frame invisible para layout */}
        <div className="relative h-[84px] w-[248px] overflow-hidden rounded-xl sm:h-[80px] sm:w-[260px] md:h-[90px] md:w-[300px] lg:h-[96px] lg:w-[320px]">
          {/* Sheen */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%]"
            style={{
              background:
                variant === "featured"
                  ? "linear-gradient(120deg, transparent, rgba(255,214,110,0.42), transparent)"
                  : variant === "tech"
                    ? "linear-gradient(120deg, transparent, rgba(120,255,220,0.34), transparent)"
                    : "linear-gradient(120deg, transparent, rgba(255,255,255,0.20), transparent)",
              mixBlendMode: "screen",
            }}
            animate={sheenControls}
            initial={{ opacity: 0, x: "-60%" }}
          />

          <Image
            src={sponsor.src}
            alt={sponsor.name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 248px"
            quality={100}
            className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
            priority={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function FlowRow({
  items,
  speed,
  direction,
  y,
  spacing,
  profile,
}: {
  items: FlowingSponsor[];
  speed: number;
  direction: 1 | -1;
  y: number;
  spacing: number;
  profile: FlowProfile;
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
              profile={profile}
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

  const mobileSpacing = 420;
  const desktopSpacing = 560;

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
        <FlowRow
          items={ordered}
          speed={0.16}
          direction={-1}
          y={0}
          spacing={mobileSpacing}
          profile="mobile"
        />
      </div>

      {/* Desktop: 2 filas con velocidades distintas */}
      <div className="relative hidden h-[230px] sm:block">
        <FlowRow
          items={ordered}
          speed={0.11}
          direction={-1}
          y={0}
          spacing={desktopSpacing}
          profile="desktop"
        />
      </div>
    </div>
  );
}
