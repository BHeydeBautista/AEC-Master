"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import Image from "next/image";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface Sponsor {
  name: string;
  src: string;
  featured?: boolean;
  variant?: "club" | "water" | "tech" | "default" | "featured";
}

const ITEM_WIDTH = 160;
const SPEED = 0.045;
const DUPLICATE_COUNT = 3;

function useReducedFxForMobile() {
  const [reducedFx, setReducedFx] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia?.("(pointer: coarse)");
    const small = window.matchMedia?.("(max-width: 640px)");

    const update = () => {
      setReducedFx(Boolean(coarse?.matches || small?.matches));
    };

    update();

    coarse?.addEventListener?.("change", update);
    small?.addEventListener?.("change", update);

    return () => {
      coarse?.removeEventListener?.("change", update);
      small?.removeEventListener?.("change", update);
    };
  }, []);

  return reducedFx;
}

function SponsorItem({
  sponsor,
  index,
  x,
  reducedFx,
}: {
  sponsor: Sponsor;
  index: number;
  x: MotionValue<number>;
  reducedFx: boolean;
}) {
  const itemX = useTransform(x, (v) => v + index * ITEM_WIDTH);

  const focus = useTransform(itemX, [-320, 0, 320], [0, 1, 0]);

  const contentControls = useAnimationControls();
  const waterFx = useAnimationControls();
  const techFx = useAnimationControls();
  const featuredFx = useAnimationControls();
  const hasTriggeredRef = useRef(false);

  const baseScale = useTransform(itemX, [-520, 0, 520], [0.68, 1.45, 0.68]);
  const featuredScale = useTransform(itemX, [-520, 0, 520], [0.72, 1.7, 0.72]);
  const scale = sponsor.featured ? featuredScale : baseScale;

  const opacity = useTransform(
    itemX,
    [-500, -250, 0, 250, 500],
    [0.6, 0.9, 1, 0.9, 0.6]
  );

  const baseZ = useTransform(itemX, [-520, 0, 520], [-140, 170, -140]);
  const featuredZ = useTransform(itemX, [-520, 0, 520], [-140, 240, -140]);
  const z = sponsor.featured ? featuredZ : baseZ;

  const y = useTransform(itemX, [-520, 0, 520], [16, -10, 16]);
  const rotateY = useTransform(itemX, [-520, 0, 520], [52, 0, -52]);
  const rotateZ = useTransform(itemX, [-520, 0, 520], [-10, 0, 10]);

  const glowOpacity = useTransform(itemX, [-260, 0, 260], [0.05, 0.22, 0.05]);
  const featuredGlow = useTransform(itemX, [-260, 0, 260], [0.08, 0.55, 0.08]);

  const variant = sponsor.variant ?? (sponsor.featured ? "featured" : "default");
  const clubOpacity = useTransform(itemX, [-280, 0, 280], [0, 0.65, 0]);
  const waterOpacity = useTransform(itemX, [-320, 0, 320], [0, 0.6, 0]);
  const techOpacity = useTransform(itemX, [-320, 0, 320], [0, 0.55, 0]);

  useEffect(() => {
    const unsubscribe = focus.on("change", (v) => {
      if (v < 0.28) hasTriggeredRef.current = false;
      if (v > 0.92 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;

        // Like SponsorBar: pop -> showpiece -> rest
        void (async () => {
          await contentControls.start({
            y: variant === "featured" ? -18 : variant === "club" ? -14 : -12,
            scale: reducedFx ? 1.08 : variant === "featured" ? 1.18 : 1.12,
            rotateZ: variant === "club" ? -6 : 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          });

          // En mobile, recortamos FX costosos (clipPath/blur/mix-blend) para ganar FPS.
          if (reducedFx) {
            if (variant === "featured") {
              await contentControls.start({
                rotateY: 360,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              });
            }

            await contentControls.start({
              y: 0,
              x: 0,
              scale: 1,
              rotateZ: 0,
              rotateY: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            });
            return;
          }

          if (variant === "water") {
            waterFx.set({ opacity: 0.95, clipPath: "inset(70% 0% 0% 0% round 999px)" });
            await waterFx.start({
              clipPath: [
                "inset(70% 0% 0% 0% round 999px)",
                "inset(30% 0% 0% 0% round 999px)",
                "inset(0% 0% 0% 0% round 999px)",
              ],
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            });
            await waterFx.start({ opacity: 0, transition: { duration: 0.22 } });
          }

          if (variant === "tech") {
            techFx.set({ opacity: 0.55, x: "-30%" });
            await techFx.start({ x: ["-30%", "135%"], transition: { duration: 0.85, ease: "linear" } });
            await contentControls.start({ x: [0, -2, 2, -1, 0], transition: { duration: 0.24, ease: "easeOut" } });
            await techFx.start({ opacity: 0, transition: { duration: 0.2 } });
          }

          if (variant === "club") {
            await contentControls.start({
              rotateZ: [-8, 6, -4, 0],
              y: [-14, -20, -14],
              transition: { duration: 0.8, ease: "easeInOut" },
            });
          }

          if (variant === "featured") {
            featuredFx.set({ opacity: 1 });
            await contentControls.start({ rotateY: 360, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } });
            await contentControls.start({ y: [-18, -24, -18], transition: { duration: 0.9, ease: "easeInOut" } });
            await featuredFx.start({ opacity: 0, transition: { duration: 0.22 } });
          }

          await contentControls.start({
            y: 0,
            x: 0,
            scale: 1,
            rotateZ: 0,
            rotateY: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          });
        })();
      }
    });

    return () => unsubscribe();
  }, [focus, contentControls, waterFx, techFx, featuredFx, variant, reducedFx]);

  return (
    <motion.div
      style={{
        x: itemX,
        y,
        scale,
        opacity,
        translateZ: z,
        rotateX: "12deg",
        rotateY,
        rotateZ,
        willChange: "transform, opacity",
      }}
      className="absolute left-1/2 top-1/2 flex
                 h-24 w-24 -translate-x-1/2 -translate-y-1/2
                 items-center justify-center
                 sm:h-28 sm:w-28"
    >
      <motion.div
        animate={contentControls}
        initial={{ y: 0, x: 0, scale: 1, rotateZ: 0, rotateY: 0 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative grid h-full w-full place-items-center"
      >
        {/* Base glow for all */}
        <motion.div
          aria-hidden
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -inset-6 rounded-full blur-md
                     bg-[radial-gradient(circle,rgba(17,179,255,0.28),transparent_62%)]"
        />

        {/* AEC (club) */}
        {variant === "club" ? (
          <motion.div
            aria-hidden
            style={{ opacity: clubOpacity }}
            className="pointer-events-none absolute -inset-6 rounded-full"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 220deg, transparent 0deg, rgba(255,255,255,0.22) 65deg, transparent 150deg)",
                filter: "blur(12px)",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute inset-[-10px] rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(17,179,255,0.18), transparent 62%)",
              }}
            />
          </motion.div>
        ) : null}

        {/* Máster (water) */}
        {variant === "water" ? (
          <motion.div
            aria-hidden
            style={{ opacity: waterOpacity }}
            animate={reducedFx ? undefined : waterFx}
            initial={
              reducedFx
                ? { opacity: 0 }
                : { opacity: 0, clipPath: "inset(70% 0% 0% 0% round 999px)" }
            }
            className="pointer-events-none absolute -inset-7 rounded-full overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 35% 70%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(circle at 70% 40%, rgba(17,179,255,0.26), transparent 60%), linear-gradient(180deg, rgba(17,179,255,0.10), rgba(17,179,255,0.0))",
                filter: reducedFx ? "blur(6px)" : "blur(10px)",
                mixBlendMode: "screen",
                WebkitMaskImage: "radial-gradient(circle, black 58%, transparent 74%)",
                maskImage: "radial-gradient(circle, black 58%, transparent 74%)",
              }}
            />
            {reducedFx ? null : (
              <div
                className="absolute -left-[60%] top-0 h-full w-[120%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.14) 18%, transparent 40%)",
                  filter: "blur(12px)",
                  transform: "skewX(-18deg)",
                  animation: "sponsorSheen 2.8s linear infinite",
                  opacity: 0.55,
                }}
              />
            )}
          </motion.div>
        ) : null}

        {/* Systemium (tech) */}
        {variant === "tech" ? (
          <motion.div
            aria-hidden
            style={{ opacity: techOpacity }}
            className="pointer-events-none absolute -inset-7 rounded-full overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(120,255,220,0.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(17,179,255,0.14), transparent 58%)",
                mixBlendMode: "screen",
                filter: reducedFx ? "blur(0px)" : "blur(2px)",
                WebkitMaskImage: "radial-gradient(circle, black 58%, transparent 74%)",
                maskImage: "radial-gradient(circle, black 58%, transparent 74%)",
              }}
            />
            {reducedFx ? null : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)",
                  opacity: 0.55,
                }}
              />
            )}

            {reducedFx ? null : (
              <motion.div
                className="absolute -left-[60%] top-0 h-full w-[120%]"
                animate={techFx}
                initial={{ opacity: 0, x: "-30%" }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(120,255,220,0.22) 20%, transparent 42%)",
                  filter: "blur(10px)",
                  transform: "skewX(-18deg)",
                }}
              />
            )}
          </motion.div>
        ) : null}

        {/* ER Deportes (featured) */}
        {variant === "featured" ? (
          <motion.div
            aria-hidden
            style={{ opacity: featuredGlow }}
            animate={reducedFx ? undefined : featuredFx}
            initial={{ opacity: 0 }}
            className="pointer-events-none absolute -inset-10"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,214,110,0.40), transparent 62%)",
              }}
            />
            {reducedFx ? null : (
              <>
                <div
                  className="absolute inset-[-10px] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 90deg, rgba(255,214,110,0.0), rgba(255,214,110,0.30), rgba(255,214,110,0.0), rgba(255,214,110,0.22), rgba(255,214,110,0.0))",
                    filter: "blur(10px)",
                    animation: "sponsorSpin 5.2s linear infinite",
                    mixBlendMode: "screen",
                  }}
                />
                <div
                  className="absolute inset-[-6px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 35%, rgba(255,255,255,0.16), transparent 40%), radial-gradient(circle at 70% 60%, rgba(255,214,110,0.28), transparent 45%)",
                    animation: "sponsorSparkle 2.2s ease-in-out infinite",
                    mixBlendMode: "screen",
                  }}
                />
              </>
            )}

            <motion.div
              className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                opacity: focus,
                background: "rgba(255,214,110,0.95)",
                boxShadow: "0 0 18px rgba(255,214,110,0.60)",
                transform: "translate(-18px,-10px)",
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                opacity: focus,
                background: "rgba(255,214,110,0.75)",
                boxShadow: "0 0 14px rgba(255,214,110,0.50)",
                transform: "translate(20px,12px)",
              }}
            />
          </motion.div>
        ) : null}

        <Image
          src={sponsor.src}
          alt={sponsor.name}
          width={160}
          height={160}
          className={
            variant === "featured"
              ? "object-contain drop-shadow-[0_0_18px_rgba(255,214,110,0.24)]"
              : "object-contain"
          }
          style={undefined}
        />
      </motion.div>
    </motion.div>
  );
}

export default function FlowingSponsors3D({
  data,
}: {
  data: Sponsor[];
}) {
  const reducedFx = useReducedFxForMobile();
  const blockWidth = useMemo(() => data.length * ITEM_WIDTH, [data.length]);

  // iOS suele throttle-ar RAF en scroll / low-power: evitamos que x se vaya muy lejos.
  const x = useMotionValue(blockWidth ? -blockWidth : 0);

  useAnimationFrame((_, delta) => {
    if (!blockWidth) return;

    // clamp: suaviza cuando el browser "duerme" y vuelve con delta enorme
    const dt = Math.min(delta, 50);
    let next = x.get() - dt * SPEED;

    const lowerBound = -blockWidth * 2;
    const upperBound = -blockWidth;

    // wrap robusto: si nos pasamos varios bloques, lo corregimos igual
    while (next <= lowerBound) next += blockWidth;
    while (next > upperBound) next -= blockWidth;

    x.set(next);
  });

  if (!data?.length) return null;

  return (
    <div className="relative mt-14 h-[260px] overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Stage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(17,179,255,0.12), transparent 55%), radial-gradient(circle at 50% 72%, rgba(255,214,110,0.07), transparent 58%)",
        }}
      />

      <div className="relative h-full w-full">
        {Array.from({ length: DUPLICATE_COUNT }).flatMap((_, dup) =>
          data.map((sponsor, i) => (
            <SponsorItem
              key={`${sponsor.name}-${dup}-${i}`}
              sponsor={sponsor}
              index={i + dup * data.length}
              x={x}
              reducedFx={reducedFx}
            />
          ))
        )}
      </div>

      {/* Floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[620px] -translate-x-1/2 -translate-y-[10%] rounded-[999px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06), transparent 60%)",
          filter: "blur(20px)",
          transform: "translate3d(-50%, -10%, -220px) rotateX(70deg)",
        }}
      />

      {/* fade lateral correcto */}
      <div
        className="pointer-events-none absolute inset-0
                   bg-gradient-to-r
                   from-black/95 via-transparent to-black/95"
      />
    </div>
  );
}
