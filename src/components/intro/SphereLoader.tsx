/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import { animate, stagger, createScope } from "animejs";

type Props = { active: boolean; onFinish: () => void };

export default function SphereLoader({ active, onFinish }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!active || !root.current) return;

    const scope = createScope({ root });
    scopeRef.current = scope;

    scope.add(() => {
      // 1) Draw ticks clockwise
      animate(".loader-tick", {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(25),
        ease: "out(3)",
      });

      // 2) When finished, fade out the whole loader and move to next phase
      const totalTime = 500 + 25 * 60 + 400;
      const timeout = setTimeout(() => {
        animate(root.current!, {
          opacity: [1, 0],
          duration: 600,
          ease: "out(2)",
          complete: onFinish,
        });
      }, totalTime);

      // Cleanup timeout on unmount
      return () => clearTimeout(timeout);
    });

    return () => scopeRef.current?.revert();
  }, [active, onFinish]);

  if (!active) return null;

  return (
    <div
      ref={root}
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
    >
      <div className="relative w-[520px] h-[520px]">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="loader-tick absolute left-1/2 top-1/2 w-[2px] h-[22px] bg-white/80 origin-bottom"
            style={{ transform: `rotate(${i * 6}deg) translateY(-250px)` }}
          />
        ))}
      </div>
    </div>
  );
}
