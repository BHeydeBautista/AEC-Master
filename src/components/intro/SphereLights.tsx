"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

type Props = { active: boolean; onFinish: () => void };

export default function SphereLights({ active, onFinish }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const animation = animate(".ring", {
      strokeDashoffset: [800, 0],
      opacity: [0, 1],
      duration: 1000,
      ease: "out(3)",
      complete: onFinish,
    });

    return () => {
      animation.pause();
    };
  }, [active, onFinish]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ROJO */}
      <circle
        className="ring"
        cx="300"
        cy="300"
        r="280"
        fill="none"
        stroke="#ef4444"
        strokeWidth="6"
        strokeDasharray="800"
        strokeDashoffset="800"
      />
      {/* VERDE */}
      <circle
        className="ring"
        cx="300"
        cy="300"
        r="255"
        fill="none"
        stroke="#22c55e"
        strokeWidth="6"
        strokeDasharray="800"
        strokeDashoffset="800"
      />
    </svg>
  );
}
