"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Sphere from "./Sphere";
import SphereLoader from "./SphereLoader";
import Sphere3D from "./Sphere3D";
import SphereLights from "./SphereLights";
import HeroSection from "@/components/sections/HeroSection";
import DistancesSection from "@/components/sections/DistancesSection";
import ReglamentoSection from "@/components/sections/ReglamentoSection";
import ResponsabilidadSection from "../sections/ResponsabilidadSection";
import SponsorsSection from "../sections/SponsorsSection";
import InscripcionSection from "../sections/InscripcionSection";
import ContactoSection from "../sections/ContactoSection";

export default function IntroController() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [isReglamento, setIsReglamento] = useState(false);
  const reglamentoRef = useRef<HTMLElement | null>(null);
  const originalOverflowRef = useRef<string | null>(null);

  // Oculta el canvas cuando la sección de reglamento está visible en el viewport
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reglamento = document.getElementById("reglamento");
    if (!reglamento) return;
    reglamentoRef.current = reglamento;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsReglamento(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2, // Ajusta el porcentaje visible para activar
      }
    );
    observer.observe(reglamento);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (originalOverflowRef.current === null) {
      originalOverflowRef.current = document.body.style.overflow;
    }

    document.body.style.overflow =
      phase < 2 ? "hidden" : originalOverflowRef.current ?? "";

    return () => {
      document.body.style.overflow = originalOverflowRef.current ?? "";
    };
  }, [phase]);

  return (
    <div className="relative min-h-screen text-white">
      <div
        className={`fixed inset-0 z-[150] transition-opacity duration-600 ${
          phase < 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#0b0b0b]" />
        <Sphere>
          {!isReglamento && <Sphere3D />}
          <SphereLoader active={phase === 0} onFinish={() => setPhase(1)} />
          <SphereLights active={phase === 1} onFinish={() => setPhase(2)} />
        </Sphere>
      </div>

      <div
        className={`transition-opacity duration-700 ${
          phase === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <HeroSection />
        <DistancesSection />
        <ReglamentoSection />
        <ResponsabilidadSection />
        <SponsorsSection />
        <InscripcionSection />
        <ContactoSection />
      </div>
    </div>
  );
}
