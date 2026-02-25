"use client";

import { AnimatePresence, motion, useAnimationControls, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SponsorVariant = "club" | "water" | "tech" | "default" | "featured";

export type Sponsor = {
  key: string;
  name: string;
  src: string;
  variant: SponsorVariant;
};

export const SPONSORS: Sponsor[] = [
  {
    key: "aec",
    name: "Atlético Echagüe Club",
    src: "/img/aec.jpeg",
    variant: "club",
  },
  {
    key: "master",
    name: "Máster",
    src: "/img/logomaster.png",
    variant: "water",
  },
  {
    key: "aguamarina",
    name: "Aguamarina",
    src: "/img/Aguamarina.png",
    variant: "water",
  },
  {
    key: "alba",
    name: "Alba",
    src: "/img/alba.jpeg",
    variant: "tech",
  },
  { key: "systemium", name: "Systemium", src: "/img/systemium.jpeg", variant: "tech" },
  {
    key: "rtLogo",
    name: "RT",
    src: "/img/RT-Logo.png",
    variant: "default",
  },
  {
    key: "sem",
    name: "SEM",
    src: "/img/LOGO%20SEM%20COMPLETO%20PNG.png",
    variant: "default",
  },
  {
    key: "barbaro",
    name: "Bárbaro Calzado & Indumentaria Deportiva",
    src: "/img/barbaro.jpeg",
    variant: "default",
  },
  {
    key: "parana",
    name: "Paraná",
    src: "/img/parana.jpeg",
    variant: "default",
  },
  {
    key: "aguanuestra",
    name: "aguanuestra",
    src: "/img/cillegas.png",
    variant: "default",
  },
  {
    key: "villegas",
    name: "Farmacia Villegas",
    src: "/img/villegas.png",
    variant: "default",
  },
  { key: "deporte", name: "Deporte", src: "/img/deporte.png", variant: "featured" },
  { key: "erdeportes", name: "ER Deportes", src: "/img/ERDeportes.png", variant: "featured" },
];

type SponsorsBarProps = {
  className?: string;
};

function buildInfinityKeyframes(ampX: number, ampY: number, steps = 44) {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    // Lissajous-ish ∞
    xs.push(ampX * Math.sin(t));
    ys.push(ampY * Math.sin(2 * t) * 0.55);
  }
  return { xs, ys };
}

function SponsorButton({
  sponsor,
  isActive,
  size,
  runToken,
  onClick,
  onSequenceComplete,
}: {
  sponsor: Sponsor;
  isActive: boolean;
  size: number;
  runToken: number;
  onClick: () => void;
  onSequenceComplete: (token: number) => void;
}) {
  const logoControls = useAnimationControls();
  const techOverlay = useAnimationControls();
  const featuredOverlay = useAnimationControls();
  const featuredSheen = useAnimationControls();
  const trailDot1 = useAnimationControls();
  const trailDot2 = useAnimationControls();
  const trailDot3 = useAnimationControls();
  const shimmerControls = useAnimationControls();
  const waterOverlay = useAnimationControls();
  const clubOverlay = useAnimationControls();
  

  const { xs, ys } = useMemo(() => {
    // Se escala con el tamaño del slot (más notorio el ∞).
    return buildInfinityKeyframes(Math.round(size * 0.62), Math.round(size * 0.44));
  }, [size]);

  useEffect(() => {
    let cancelled = false;

    async function runSequence() {
      if (!isActive) {
        logoControls.stop();
        techOverlay.stop();
        featuredOverlay.stop();
        featuredSheen.stop();
        trailDot1.stop();
        trailDot2.stop();
        trailDot3.stop();
        shimmerControls.stop();
        waterOverlay.stop();
        clubOverlay.stop();
        logoControls.set({ y: 0, scale: 1, rotateZ: 0, x: 0 });
        logoControls.set({ rotateY: 0 });
        techOverlay.set({ opacity: 0 });
        featuredOverlay.set({ opacity: 0 });
        featuredSheen.set({ opacity: 0, x: "-60%" });
        trailDot1.set({ opacity: 0 });
        trailDot2.set({ opacity: 0 });
        trailDot3.set({ opacity: 0 });
        shimmerControls.set({ opacity: 0 });
        waterOverlay.set({ opacity: 0 });
        clubOverlay.set({ opacity: 0 });
        return;
      }

      // 1) Pop / lift
      await logoControls.start({
        y: sponsor.variant === "featured" ? -26 : sponsor.variant === "club" ? -18 : -16,
        scale:
          sponsor.variant === "featured"
            ? 1.42
            : sponsor.variant === "water"
              ? 1.34
              : sponsor.variant === "club"
                ? 1.34
                : sponsor.variant === "tech"
                  ? 1.30
                  : 1.18,
        rotateZ: sponsor.variant === "club" ? -4 : 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      });

      if (cancelled) return;

      // 2) Variant showpiece (one-shot)
      if (sponsor.variant === "water") {
        await waterOverlay.start({ opacity: 0.95, transition: { duration: 0.12 } });
        await waterOverlay.start({
          clipPath: [
            "inset(70% 0% 0% 0% round 999px)",
            "inset(35% 0% 0% 0% round 999px)",
            "inset(0% 0% 0% 0% round 999px)",
          ],
          transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
        });
        await logoControls.start({ y: -14, scale: 1.34, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } });
        await logoControls.start({ y: [-14, -18, -14], transition: { duration: 0.9, ease: "easeInOut" } });
        await waterOverlay.start({ opacity: 0, transition: { duration: 0.26 } });
      }

      if (sponsor.variant === "club") {
        await clubOverlay.start({ opacity: 0.85, transition: { duration: 0.12 } });
        await clubOverlay.start({ opacity: [0.1, 0.85, 0.2], transition: { duration: 1.05, ease: "easeInOut" } });
        await logoControls.start({ y: [-18, -26, -16], rotateZ: [-6, 3, -2], transition: { duration: 1.0, ease: "easeInOut" } });
        await clubOverlay.start({ opacity: 0, transition: { duration: 0.2 } });
      }

      if (sponsor.variant === "tech") {
        await techOverlay.start({ opacity: 0.36, transition: { duration: 0.16 } });
        await shimmerControls.start({ opacity: 1, x: ["-30%", "135%"], transition: { duration: 0.95, ease: "linear" } });
        await shimmerControls.start({ opacity: [0, 0.65, 0.15, 0.8, 0], x: "0%", transition: { duration: 0.55, ease: "easeInOut" } });
        await logoControls.start({ x: [0, -2, 2, -1, 0], transition: { duration: 0.28, ease: "easeOut" } });
        await techOverlay.start({ opacity: 0.12, transition: { duration: 0.22 } });
      }

      if (sponsor.variant === "featured") {
        const isDeporte = sponsor.key === "deporte";

        // Featured: mismo toque dorado, pero con showpiece distinto para Deporte.
        await featuredOverlay.start({ opacity: 1, transition: { duration: 0.12 } });

        if (isDeporte) {
          // Deporte: "sweep" dorado + wobble (más simple que el ∞ de ER).
          trailDot1.set({ opacity: 0 });
          trailDot2.set({ opacity: 0 });
          trailDot3.set({ opacity: 0 });

          featuredSheen.set({ opacity: 0, x: "-60%" });
          void featuredSheen.start({
            opacity: [0, 0.9, 0],
            x: ["-60%", "140%"],
            transition: { duration: 0.95, ease: "linear" },
          });

          await logoControls.start({
            y: -34,
            scale: 1.46,
            rotateY: 540,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          });
          await logoControls.start({
            rotateZ: [0, 8, -6, 0],
            y: [-34, -40, -34],
            transition: { duration: 0.95, ease: "easeInOut" },
          });
          await featuredOverlay.start({ opacity: 0, transition: { duration: 0.22 } });
        } else {
          // ER (y cualquier otro featured): el logo dibuja el ∞ y la estela lo sigue.
          await logoControls.start({ y: -36, scale: 1.46, rotateZ: 10, rotateY: 420, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } });

          const yPath = ys.map((v) => v - 36);
          const lag = (arr: number[], n: number) => {
            const head = Array.from({ length: n }, () => arr[0]);
            return head.concat(arr.slice(0, Math.max(0, arr.length - n)));
          };
          const x1 = lag(xs, 4);
          const y1 = lag(yPath, 4);
          const x2 = lag(xs, 9);
          const y2 = lag(yPath, 9);
          const x3 = lag(xs, 14);
          const y3 = lag(yPath, 14);

          trailDot1.set({ opacity: 1, x: x1[0], y: y1[0] });
          trailDot2.set({ opacity: 1, x: x2[0], y: y2[0] });
          trailDot3.set({ opacity: 1, x: x3[0], y: y3[0] });

          const travel = logoControls.start({ x: xs, y: yPath, rotateZ: [10, 820], rotateY: [420, 1320], transition: { duration: 2.25, ease: "linear" } });
          const t1 = trailDot1.start({ x: x1, y: y1, transition: { duration: 2.25, ease: "linear" } });
          const t2 = trailDot2.start({ x: x2, y: y2, transition: { duration: 2.25, ease: "linear" } });
          const t3 = trailDot3.start({ x: x3, y: y3, transition: { duration: 2.25, ease: "linear" } });

          await Promise.all([travel, t1, t2, t3]);

          await logoControls.start({ x: 0, y: 0, scale: 1, rotateZ: 0, rotateY: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } });

          await featuredOverlay.start({ opacity: 0, transition: { duration: 0.2 } });
          trailDot1.set({ opacity: 0 });
          trailDot2.set({ opacity: 0 });
          trailDot3.set({ opacity: 0 });
        }
      }

      if (cancelled) return;

      // 3) Rest / return
      await logoControls.start({ y: 0, scale: 1, rotateZ: 0, rotateY: 0, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } });

      if (!cancelled) onSequenceComplete(runToken);
    }

    runSequence();
    return () => {
      cancelled = true;
    };
  }, [
    isActive,
    runToken,
    sponsor.key,
    sponsor.variant,
    logoControls,
    techOverlay,
    featuredOverlay,
    featuredSheen,
    trailDot1,
    trailDot2,
    trailDot3,
    shimmerControls,
    waterOverlay,
    clubOverlay,
    xs,
    ys,
    onSequenceComplete,
  ]);

  const glowBg =
    sponsor.variant === "club"
      ? "radial-gradient(circle, rgba(17,179,255,0.30), transparent 62%)"
      : sponsor.variant === "water"
        ? "radial-gradient(circle, rgba(65,194,255,0.26), transparent 64%)"
        : sponsor.variant === "tech"
          ? "radial-gradient(circle, rgba(120,255,220,0.22), transparent 64%)"
          : sponsor.variant === "featured"
            ? "radial-gradient(circle, rgba(255,210,90,0.22), transparent 64%)"
            : "radial-gradient(circle, rgba(17,179,255,0.18), transparent 64%)";

  const haloMult = size <= 56 ? 1.55 : 1.85;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ rotateX: -10, rotateY: 14, y: -3 }}
      whileTap={{ scale: 0.99 }}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      className="group relative grid place-items-center overflow-visible bg-transparent"
      aria-label={sponsor.name}
      title={sponsor.name}
    >
      {/* Outer halo (NOT clipped, so it doesn't show a square cut) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          width: size * haloMult,
          height: size * haloMult,
          background: glowBg,
        }}
        animate={{ opacity: isActive ? 0.85 : 0.25, scale: isActive ? 1.08 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Inner zone (sin aro/borde visible) */}
      <div className="relative grid h-full w-full place-items-center">

        {/* Club overlay (shield/spotlight) */}
        {sponsor.variant === "club" ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[-16px]"
            animate={clubOverlay}
            initial={{ opacity: 0 }}
            style={{
              background:
                "conic-gradient(from 220deg, transparent 0deg, rgba(255,255,255,0.22) 65deg, transparent 150deg)",
              filter: "blur(14px)",
              mixBlendMode: "screen",
            }}
          />
        ) : null}

        {/* tech overlay (scanlines + beam) */}
        {sponsor.variant === "tech" ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[-16px] rounded-full overflow-hidden"
            animate={techOverlay}
            initial={{ opacity: 0 }}
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(120,255,220,0.22), transparent 55%), radial-gradient(circle at 70% 70%, rgba(17,179,255,0.18), transparent 58%)",
              mixBlendMode: "screen",
              filter: "blur(2px)",
              WebkitMaskImage: "radial-gradient(circle, black 58%, transparent 74%)",
              maskImage: "radial-gradient(circle, black 58%, transparent 74%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 6px)",
                opacity: 0.55,
              }}
            />
            <motion.div
              className="absolute -left-[60%] top-0 h-full w-[120%]"
              animate={shimmerControls}
              initial={{ opacity: 0, x: "-30%" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(120,255,220,0.22) 20%, transparent 42%)",
                filter: "blur(10px)",
                transform: "skewX(-18deg)",
              }}
            />
          </motion.div>
        ) : null}

        {/* featured golden FX */}
        {sponsor.variant === "featured" ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={featuredOverlay}
            initial={{ opacity: 0 }}
          >
            <div className="absolute inset-[-18px] rounded-full bg-[radial-gradient(circle,rgba(255,214,110,0.22),transparent_60%)] blur-2xl" />

            {sponsor.key === "deporte" ? (
              <motion.div
                className="absolute -left-[60%] top-0 h-full w-[120%]"
                animate={featuredSheen}
                initial={{ opacity: 0, x: "-60%" }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,214,110,0.22) 20%, transparent 42%)",
                  filter: "blur(12px)",
                  transform: "skewX(-18deg)",
                  mixBlendMode: "screen",
                }}
              />
            ) : (
              <>
                {/* trailing dots to visually attach the trail to the moving logo */}
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  animate={trailDot1}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  style={{
                    background: "rgba(255,214,110,0.35)",
                    filter: "blur(0.6px)",
                  }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  animate={trailDot2}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  style={{
                    background: "rgba(255,214,110,0.24)",
                    filter: "blur(1.2px)",
                  }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  animate={trailDot3}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  style={{
                    background: "rgba(255,214,110,0.16)",
                    filter: "blur(2.2px)",
                  }}
                />
              </>
            )}
          </motion.div>
        ) : null}

        <motion.div
          style={{ translateZ: 28, transformStyle: "preserve-3d" }}
          animate={logoControls}
          initial={{ y: 0, scale: 1, rotateZ: 0, rotateY: 0, x: 0 }}
          className="relative"
        >
          <div
            className="relative"
            style={{
              width:
                sponsor.key === "systemium"
                  ? Math.round(size * 0.98)
                  : sponsor.variant === "featured"
                    ? Math.round(size * 1.04)
                    : Math.round(size * 0.90),
              height:
                sponsor.key === "systemium"
                  ? Math.round(size * 0.98)
                  : sponsor.variant === "featured"
                    ? Math.round(size * 1.04)
                    : Math.round(size * 0.90),
            }}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.name}
              width={220}
              height={220}
              className="h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.40)]"
              style={undefined}
            />
          </div>
        </motion.div>

        {/* Water overlay (flood) - debe ir DESPUÉS del logo para quedar al frente */}
        {sponsor.variant === "water" ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-[-16px] rounded-full"
            animate={waterOverlay}
            initial={{ opacity: 0, clipPath: "inset(70% 0% 0% 0% round 999px)" }}
            style={{
              background:
                "radial-gradient(circle at 35% 70%, rgba(255,255,255,0.22), transparent 52%), radial-gradient(circle at 70% 40%, rgba(17,179,255,0.34), transparent 58%), linear-gradient(180deg, rgba(17,179,255,0.14), rgba(17,179,255,0.0))",
              filter: "blur(10px)",
              mixBlendMode: "screen",
              WebkitMaskImage: "radial-gradient(circle, black 58%, transparent 74%)",
              maskImage: "radial-gradient(circle, black 58%, transparent 74%)",
            }}
          />
        ) : null}
      </div>
    </motion.button>
  );
}

export default function SponsorsBar({ className = "" }: SponsorsBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [runToken, setRunToken] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [compactFading, setCompactFading] = useState(false);
  const stackAreaRef = useRef<HTMLDivElement | null>(null);
  const [stackAreaWidth, setStackAreaWidth] = useState<number | null>(null);
  const tokenRef = useRef(0);
  const pausedRef = useRef(false);
  const compactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const marqueeX = useMotionValue(0);

  const active = SPONSORS[activeIndex];

  useEffect(() => {
    tokenRef.current += 1;
    setRunToken(tokenRef.current);
  }, [activeIndex]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    return () => {
      if (compactTimeoutRef.current) clearTimeout(compactTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsCompact(mq.matches);
    apply();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }

    // Legacy Safari fallback
    const legacy = mq as MediaQueryList & {
      addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown) => void;
      removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown) => void;
    };

    legacy.addListener?.(apply);
    return () => legacy.removeListener?.(apply);
  }, []);

  const handleSequenceComplete = useCallback((token: number) => {
    if (pausedRef.current) return;
    if (token !== tokenRef.current) return;

    // Mobile: mostrar 1 sponsor por vez (fade-out -> siguiente -> fade-in)
    if (window.matchMedia && window.matchMedia("(max-width: 640px)").matches) {
      setCompactFading(true);
      if (compactTimeoutRef.current) clearTimeout(compactTimeoutRef.current);
      compactTimeoutRef.current = setTimeout(() => {
        setActiveIndex((i) => (i + 1) % SPONSORS.length);
        setCompactFading(false);
      }, 240);
      return;
    }

    setActiveIndex((i) => (i + 1) % SPONSORS.length);
  }, []);

  const metrics = useMemo(() => {
    // Mantenerlo estable para que el dot sea consistente.
    // El row usa exactamente estos tamaños.
    if (isCompact) return { slot: 44, gap: 6, dot: 6 };

    // Con 5+ sponsors, el stack horizontal se salía del contenedor (el último quedaba fuera).
    // Bajamos el slot/gap para que entre dentro del panel.
    if (SPONSORS.length > 4) return { slot: 64, gap: 10, dot: 8 };

    return { slot: 88, gap: 14, dot: 10 };
  }, [isCompact]);

  const isVertical = isCompact;

  useEffect(() => {
    if (isVertical) return;
    const el = stackAreaRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      setStackAreaWidth(width);
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, [isVertical]);

  const dotOffset = useMemo(() => {
    const { slot, gap, dot } = metrics;
    const centerOffset = slot / 2 - dot / 2;
    return activeIndex * (slot + gap) + centerOffset;
  }, [activeIndex, metrics]);

  const stackLength = useMemo(() => {
    return SPONSORS.length * metrics.slot + (SPONSORS.length - 1) * metrics.gap;
  }, [metrics]);

  const shouldMarquee = useMemo(() => {
    if (isVertical) return false;
    if (!stackAreaWidth) return false;
    return stackLength > stackAreaWidth;
  }, [isVertical, stackAreaWidth, stackLength]);

  const effectsEnabled = useMemo(() => {
    // En marquee (cuando se está desplazando), desactivamos los showpieces para
    // evitar que el logo se “salga” del viewport por los offsets internos.
    // Si el usuario pausa/hover, los habilitamos para el sponsor activo.
    if (!shouldMarquee) return true;
    return paused;
  }, [paused, shouldMarquee]);

  const marqueeStep = useMemo(() => stackLength + metrics.gap, [stackLength, metrics.gap]);

  const dotOffsetHorizontal = useMemo(() => {
    if (isVertical) return 0;
    if (!stackAreaWidth) return dotOffset;
    const segment = stackAreaWidth / Math.max(1, SPONSORS.length);
    return activeIndex * segment + segment / 2 - metrics.dot / 2;
  }, [activeIndex, dotOffset, isVertical, metrics.dot, stackAreaWidth]);

  useEffect(() => {
    if (!shouldMarquee) {
      marqueeX.set(0);
      return;
    }
    // Reset al activar marquee para evitar saltos raros al resize.
    marqueeX.set(0);
  }, [marqueeX, shouldMarquee]);

  useAnimationFrame((_, delta) => {
    if (!shouldMarquee) return;
    if (pausedRef.current) return;
    if (!marqueeStep) return;

    const dt = Math.min(delta, 50);
    const speed = 0.04; // px/ms (~40px/s)
    let next = marqueeX.get() - dt * speed;
    while (next <= -marqueeStep) next += marqueeStep;
    marqueeX.set(next);
  });

  if (isCompact) {
    const compactSize = 64;

    return (
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={`w-[104px] rounded-2xl bg-[#0b0b0b]/40 ring-1 ring-white/10 backdrop-blur-md px-2 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.45)] ${className}`}
      >
        <div className="text-[10px] uppercase tracking-[0.28em] text-[#9a9593]">
          Sponsors
        </div>

        <motion.div
          className="mt-2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: compactFading ? 0 : 1, scale: compactFading ? 0.96 : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <SponsorButton
            sponsor={active}
            isActive
            size={compactSize}
            runToken={runToken}
            onClick={() => setPaused((p) => !p)}
            onSequenceComplete={handleSequenceComplete}
          />
        </motion.div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`${
        isCompact
          ? "w-[104px] rounded-2xl bg-[#0b0b0b]/40 ring-1 ring-white/10 backdrop-blur-md px-2 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.45)]"
          : "max-w-[60vw] w-[228px] sm:max-w-none sm:w-[400px] md:w-[440px] rounded-2xl bg-[#0b0b0b]/50 ring-1 ring-white/10 backdrop-blur-md px-2.5 py-2.5 sm:px-4 sm:py-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#9a9593]">
            Sponsors
          </div>
          <div className="mt-1 hidden sm:block text-[13px] sm:text-[14px] font-medium tracking-tight text-[#f6f4f2]">
            Apoyan este evento
          </div>
        </div>

        {!isCompact ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="shrink-0 text-right"
            >
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-[#8f8a87]">
                Destacado
              </div>
              <div className="mt-1 text-[11px] sm:text-[12px] font-medium text-[#dddcda]">
                {active.name}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>

      {/* Logos stack */}
      <div
        ref={stackAreaRef}
        className="relative mt-3 sm:mt-4 w-full overflow-hidden"
        style={{ perspective: "950px" }}
      >
        <div
          className="mx-auto relative"
          style={{
            width: isVertical ? metrics.slot + 18 : stackLength,
            height: isVertical ? stackLength : metrics.slot,
          }}
        >
          {shouldMarquee && !isVertical ? (
            <motion.div
              className="absolute left-0 top-0 flex flex-row items-center justify-start"
              style={{
                x: marqueeX,
                gap: metrics.gap,
                width: stackLength * 2 + metrics.gap,
                height: metrics.slot,
                willChange: "transform",
              }}
            >
              {SPONSORS.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <SponsorButton
                    key={`${s.key}-a`}
                    sponsor={s}
                    isActive={effectsEnabled && isActive}
                    size={metrics.slot}
                    runToken={runToken}
                    onClick={() => setActiveIndex(i)}
                    onSequenceComplete={handleSequenceComplete}
                  />
                );
              })}
              {SPONSORS.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <SponsorButton
                    key={`${s.key}-b`}
                    sponsor={s}
                    isActive={effectsEnabled && isActive}
                    size={metrics.slot}
                    runToken={runToken}
                    onClick={() => setActiveIndex(i)}
                    onSequenceComplete={handleSequenceComplete}
                  />
                );
              })}
            </motion.div>
          ) : (
            <div
              className={`absolute left-0 top-0 flex ${isVertical ? "flex-col" : "flex-row"} items-center ${
                isVertical ? "justify-between" : "justify-between"
              }`}
              style={{
                gap: metrics.gap,
                width: isVertical ? metrics.slot : stackLength,
                height: isVertical ? stackLength : metrics.slot,
              }}
            >
              {SPONSORS.map((s, i) => {
                const isActive = i === activeIndex;

                return (
                  <SponsorButton
                    key={s.key}
                    sponsor={s}
                    isActive={isActive}
                    size={metrics.slot}
                    runToken={runToken}
                    onClick={() => setActiveIndex(i)}
                    onSequenceComplete={handleSequenceComplete}
                  />
                );
              })}
            </div>
          )}

          {isVertical ? (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[18px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                animate={{ y: dotOffset }}
                transition={{ type: "spring", stiffness: 340, damping: 28 }}
                style={{ width: metrics.dot, height: metrics.dot }}
              >
                <motion.div
                  className="relative h-full w-full rounded-full bg-[var(--brand)] shadow-[0_0_16px_rgba(17,179,255,0.35)]"
                  animate={
                    active.variant === "club"
                      ? { x: [0, 2, 0], scale: [1, 1.12, 1] }
                      : active.variant === "water"
                        ? { scale: [1, 1.18, 1], filter: ["blur(0px)", "blur(0.6px)", "blur(0px)"] }
                      : active.variant === "tech"
                        ? { scale: [1, 1.22, 1], opacity: [0.85, 1, 0.85] }
                        : active.variant === "featured"
                          ? { scale: [1, 1.24, 1], boxShadow: ["0 0 16px rgba(180,255,120,0.32)", "0 0 22px rgba(180,255,120,0.50)", "0 0 16px rgba(180,255,120,0.32)"] }
                          : { scale: [1, 1.12, 1] }
                  }
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          ) : null}
        </div>

        {/* Indicator (horizontal only) */}
        {!isVertical ? (
          <div className="relative mt-2 sm:mt-3 w-full overflow-hidden" style={{ height: 18 }}>
            <div className="mx-auto w-full">
              <div className="relative" style={{ height: 18 }}>
                <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2"
                  animate={{ x: dotOffsetHorizontal }}
                  transition={{ type: "spring", stiffness: 340, damping: 28 }}
                  style={{ width: metrics.dot, height: metrics.dot }}
                >
                  <motion.div
                    className="relative h-full w-full rounded-full bg-[var(--brand)] shadow-[0_0_18px_rgba(17,179,255,0.40)]"
                    animate={
                      active.variant === "club"
                        ? { y: [0, -3, 0], scale: [1, 1.12, 1] }
                        : active.variant === "water"
                          ? { scale: [1, 1.18, 1], filter: ["blur(0px)", "blur(0.6px)", "blur(0px)"] }
                        : active.variant === "tech"
                          ? { scale: [1, 1.22, 1], opacity: [0.85, 1, 0.85] }
                          : active.variant === "featured"
                            ? { scale: [1, 1.24, 1], boxShadow: ["0 0 18px rgba(180,255,120,0.35)", "0 0 24px rgba(180,255,120,0.55)", "0 0 18px rgba(180,255,120,0.35)"] }
                            : { scale: [1, 1.12, 1] }
                    }
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {active.variant === "water" ? (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[rgba(17,179,255,0.45)]"
                      animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
                      transition={{ duration: 1.25, repeat: Infinity, ease: "easeOut" }}
                    />
                  ) : null}
                </motion.div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.aside>
  );
}
