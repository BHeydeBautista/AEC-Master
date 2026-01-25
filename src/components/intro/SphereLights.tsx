"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

type Props = { active: boolean; onFinish: () => void };

export default function SphereLights({ active, onFinish }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    // 1) Draw outside arcs
    const redAnim = animate(".arc.red", {
      strokeDashoffset: [50, 0],
      opacity: [0, 1],
      duration: 800,
      ease: "out(3)",
    });

    const greenAnim = animate(".arc.green", {
      strokeDashoffset: [50, 0],
      opacity: [0, 1],
      duration: 800,
      ease: "out(3)",
      delay: 150,
    });

    // 2) Inner ticks
    const ticksAnim = animate(".inner-tick", {
      opacity: [0, 1],
      scaleY: [0.4, 1],
      duration: 500,
      delay: stagger(12),
      ease: "out(3)",
    });

    // 3) Diagonal dots travel effect (sequential reveal)
    const dotsAnim = animate(".dot", {
      opacity: [0, 1],
      scale: [0, 1],
      duration: 300,
      delay: stagger(60),
      ease: "out(3)",
    });

    // 4) Finish after the sequence
    const total = 800 + 150 + 500 + 60 * 15 + 200; // rough total timing
    const t = setTimeout(onFinish, total);

    return () => {
      redAnim.pause();
      greenAnim.pause();
      ticksAnim.pause();
      dotsAnim.pause();
      clearTimeout(t);
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
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Red half-arc (top-start after rotation) */}
      <circle
        className="arc red"
        cx="300"
        cy="300"
        r="296"
        fill="none"
        stroke="#ef4444"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0"
        pathLength="100"
        strokeDasharray="50 50"
        strokeDashoffset="50"
        transform="rotate(-90 300 300)"
        filter="url(#glow)"
      />

      {/* Green half-arc (opposite side) */}
      <circle
        className="arc green"
        cx="300"
        cy="300"
        r="296"
        fill="none"
        stroke="#22c55e"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0"
        pathLength="100"
        strokeDasharray="50 50"
        strokeDashoffset="50"
        transform="rotate(90 300 300)"
        filter="url(#glow)"
      />

      {/* Inner ticks ring */}
      {Array.from({ length: 80 }).map((_, i) => (
        <g key={`it-${i}`} transform={`translate(300,300) rotate(${i * 4.5})`}>
          <rect
            className="inner-tick"
            x={-1.5}
            y={-250}
            width={3}
            height={26}
            fill="#e95d5d"
            opacity={0}
            rx={2}
            transform="scale(1,0.4)"
          />
        </g>
      ))}
    </svg>
  );
}
