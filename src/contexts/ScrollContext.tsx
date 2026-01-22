"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type ScrollContextValue = {
  scrollProgress: number;
};

const ScrollContext = createContext<ScrollContextValue>({ scrollProgress: 0 });

function clamp01(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      setScrollProgress(clamp01(next));
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const value = useMemo(() => ({ scrollProgress }), [scrollProgress]);

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useScroll() {
  return useContext(ScrollContext);
}
