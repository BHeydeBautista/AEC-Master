"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function RotatingSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2.6, 64, 64]} />
      <meshPhysicalMaterial
        color="#111111"
        roughness={0.6}
        metalness={0.1}
        clearcoat={0.8}
        clearcoatRoughness={0.4}
        transmission={0}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

export default function Sphere3D() {
  return (
    <div className="absolute inset-[40px] rounded-full overflow-hidden z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-5, -3, -5]} intensity={0.2} />

        <RotatingSphere />

        <Environment preset="city" />
        <ContactShadows position={[0, -3.1, 0]} opacity={0.3} scale={6} blur={2} far={3.5} />
      </Canvas>
    </div>
  );
}
