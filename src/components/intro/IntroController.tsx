"use client";
import { useEffect, useRef, useState } from "react";
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
  const originalOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (originalOverflowRef.current === null) {
      originalOverflowRef.current = document.body.style.overflow;
    }

    if (phase < 2) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflowRef.current ?? "";
    }

    return () => {
      document.body.style.overflow = originalOverflowRef.current ?? "";
    };
  }, [phase]);

  return (
    <div className="relative min-h-screen text-white">
      {/* Intro overlay sits above page until phase 2 */}
      <div
        className={`fixed inset-0 z-[150] transition-opacity duration-600 ${
          phase < 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#0b0b0b]" />
        <Sphere>
          {/* 3D sphere behind animations */}
          <Sphere3D />
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
