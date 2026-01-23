"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, memo } from "react";
import type { CSSProperties } from "react";
import { useScroll } from "../../contexts/ScrollContext";

/* ================= ISLA ================= */

const Island = memo(function Island() {
  const groupRef = useRef<THREE.Group>(null);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(1.5, 96, 96), []);
  const haloGeo = useMemo(() => new THREE.SphereGeometry(1.65, 64, 64), []);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(2.1, 0.035, 32, 180), []);

  /* ===== Animación sutil (maqueta flotante) ===== */
  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = -0.2 + state.clock.elapsedTime * 0.25;
    groupRef.current.rotation.x = -0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
    groupRef.current.position.y = 0.12 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={sphereGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0e4c8a"
          roughness={0.45}
          metalness={0.2}
          emissive="#2ee4ff"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh geometry={haloGeo} scale={1.02}>
        <meshBasicMaterial
          color="#6cf3ff"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh geometry={ringGeo} rotation={[Math.PI / 2.4, 0.15, 0]}>
        <meshBasicMaterial
          color="#00e7ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
});

/* ================= ESCENA ================= */

type FloatingIslandProps = {
  position?: "fixed" | "absolute";
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

export default function FloatingIsland({
  position = "fixed",
  offsetX = 180,
  offsetY = -220,
  width = 800,
  height = 400,
  className = "",
  style,
}: FloatingIslandProps) {
  const { scrollProgress } = useScroll();

  // Interpola la escala de 1 a 0 según el scroll (desaparece más rápido)
  const scaleValue = useMemo(() => {
    const scale = Math.max(1 - scrollProgress * 3, 0);
    // Redondear para evitar actualizaciones micro
    return Math.round(scale * 100) / 100;
  }, [scrollProgress]);
  
  // Interpola la opacidad de 1 a 0 según el scroll (desaparece más rápido)
  const opacityValue = useMemo(() => {
    const opacity = Math.max(1 - scrollProgress * 2.5, 0);
    // Redondear para evitar actualizaciones micro
    return Math.round(opacity * 100) / 100;
  }, [scrollProgress]);

  // Si la isla es invisible, no renderizar el Canvas
  if (opacityValue <= 0.01) {
    return null;
  }

  return (
    <div
      className={`${position} pointer-events-none z-10 ${className}`}
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
        width: `${width}px`,
        height: `${height}px`,
        opacity: opacityValue,
        transition: "transform 0.1s ease-out",
        ...style,
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 5.8], fov: 45 }}
        style={{ transform: `scale(${scaleValue})`, transformOrigin: "center" }}
      >
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={1.4}
          castShadow
        />

        <directionalLight
          position={[-4, 2, 3]}
          intensity={0.6}
          color="#1a6e3d"
        />

        <Island />
      </Canvas>
    </div>
  );
}
