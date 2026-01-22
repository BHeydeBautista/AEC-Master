"use client";
import { useState } from "react";
import Sphere from "./Sphere";
import SphereLoader from "./SphereLoader";
import SphereLights from "./SphereLights";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

export default function IntroController() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  return (
    <div className="relative min-h-screen bg-[#0b0b0b] text-white">
      <Sphere>
        <SphereLoader active={phase === 0} onFinish={() => setPhase(1)} />
        <SphereLights active={phase === 1} onFinish={() => setPhase(2)} />
      </Sphere>

      <div
        className={`transition-opacity duration-700 ${
          phase === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
