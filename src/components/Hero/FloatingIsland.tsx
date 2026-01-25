"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useMemo, memo } from "react";
import type { CSSProperties } from "react";
import { useScroll } from "../../contexts/ScrollContext";

/* ================= LOGO 3D ================= */

let cachedRingBeamTexture: THREE.Texture | null = null;
function getRingBeamTexture() {
  if (cachedRingBeamTexture) return cachedRingBeamTexture;
  if (typeof document === "undefined") {
    cachedRingBeamTexture = new THREE.Texture();
    return cachedRingBeamTexture;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    cachedRingBeamTexture = new THREE.Texture();
    return cachedRingBeamTexture;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Neon streak with a bright head and a long tail
  const g = ctx.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2);
  g.addColorStop(0.0, "rgba(0,229,255,0.0)");
  g.addColorStop(0.55, "rgba(0,229,255,0.06)");
  g.addColorStop(0.82, "rgba(0,229,255,0.22)");
  g.addColorStop(0.92, "rgba(255,255,255,0.65)");
  g.addColorStop(1.0, "rgba(255,255,255,0.0)");

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft vertical falloff
  const vg = ctx.createRadialGradient(
    canvas.width * 0.9,
    canvas.height / 2,
    0,
    canvas.width * 0.9,
    canvas.height / 2,
    canvas.height / 1.2,
  );
  vg.addColorStop(0.0, "rgba(255,255,255,0.55)");
  vg.addColorStop(0.5, "rgba(0,229,255,0.18)");
  vg.addColorStop(1.0, "rgba(0,0,0,0.0)");
  ctx.globalCompositeOperation = "source-atop";
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;

  cachedRingBeamTexture = tex;
  return cachedRingBeamTexture;
}

let cachedGlowDotTexture: THREE.Texture | null = null;
function getGlowDotTexture() {
  if (cachedGlowDotTexture) return cachedGlowDotTexture;
  if (typeof document === "undefined") {
    cachedGlowDotTexture = new THREE.Texture();
    return cachedGlowDotTexture;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    cachedGlowDotTexture = new THREE.Texture();
    return cachedGlowDotTexture;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = canvas.width * 0.48;

  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0.0, "rgba(255,255,255,0.95)");
  g.addColorStop(0.22, "rgba(0,229,255,0.75)");
  g.addColorStop(0.55, "rgba(0,229,255,0.22)");
  g.addColorStop(1.0, "rgba(0,229,255,0.0)");

  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;

  cachedGlowDotTexture = tex;
  return cachedGlowDotTexture;
}

const Island = memo(function Island() {
  const groupRef = useRef<THREE.Group>(null);
  const rimMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const baseMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const beamMatFrontRef = useRef<THREE.MeshBasicMaterial>(null);
  const beamMatBackRef = useRef<THREE.MeshBasicMaterial>(null);
  const beamTextureRef = useRef<THREE.Texture | null>(null);
  const ringMatsRef = useRef<Array<THREE.LineDashedMaterial | null>>([]);
  const ringObjsRef = useRef<Array<THREE.LineLoop | null>>([]);
  const ringMarkerRef = useRef<THREE.Mesh | null>(null);
  const ringBeamRef = useRef<THREE.Sprite | null>(null);
  const ringMarkerGlowRef = useRef<THREE.Sprite | null>(null);
  const edgeGlowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const edgeGlowOuterMatRef = useRef<THREE.MeshBasicMaterial>(null);

  // Coin-like logo badge (circular)
  const radius = 1.78;
  const depth = 0.22;
  const segments = 96;

  const coinGeo = useMemo(
    () => new THREE.CylinderGeometry(radius, radius, depth, segments, 1, false),
    [],
  );
  const rimGeo = useMemo(
    () => new THREE.TorusGeometry(radius * 1.01, 0.04, 18, segments),
    [],
  );

  const edgeGlowGeo = useMemo(
    () => new THREE.TorusGeometry(radius * 1.095, 0.07, 18, segments),
    [],
  );

  const edgeGlowOuterGeo = useMemo(
    () => new THREE.TorusGeometry(radius * 1.12, 0.12, 18, segments),
    [],
  );
  const frontCircleGeo = useMemo(
    () => new THREE.CircleGeometry(radius * 0.93, segments),
    [],
  );
  const glowCircleGeo = useMemo(
    () => new THREE.CircleGeometry(radius * 1.05, segments),
    [],
  );

  const ringLineGeo = useMemo(() => {
    const ringR = radius * 1.075;
    const curve = new THREE.EllipseCurve(0, 0, ringR, ringR, 0, Math.PI * 2);
    const pts = curve.getPoints(420).map((p) => new THREE.Vector3(p.x, p.y, 0));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return geo;
  }, []);

  const ringLines = useMemo(() => {
    const colors = ["#11b3ff", "#eafff1", "#11b3ff"] as const;
    return colors.map((color, i) => {
      const mat = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity: 0.18,
        dashSize: 0.1,
        gapSize: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.LineLoop(ringLineGeo, mat);
      line.position.z = 0.001 + i * 0.002;
      line.computeLineDistances();
      return { line, mat };
    });
  }, [ringLineGeo]);

  useEffect(() => {
    ringMatsRef.current = ringLines.map((x) => x.mat);
    ringObjsRef.current = ringLines.map((x) => x.line);
  }, [ringLines]);

  const logoTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load("/img/logo-vuelta.curupi.jpeg");
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  const beamTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      const fallback = new THREE.Texture();
      return fallback;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Base fully transparent
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Diagonal beam: soft gradient stripe
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0.0, "rgba(17,179,255,0)");
    grad.addColorStop(0.42, "rgba(17,179,255,0)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.55)");
    grad.addColorStop(0.58, "rgba(17,179,255,0)");
    grad.addColorStop(1.0, "rgba(17,179,255,0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.center.set(0.5, 0.5);
    tex.rotation = Math.PI / 6;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  const ringBeamTexture = getRingBeamTexture();
  const glowDotTexture = getGlowDotTexture();

  useEffect(() => {
    beamTextureRef.current = beamTexture;
  }, [beamTexture]);

  const easeInOutQuad = (x: number) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

  /* ===== Animación sutil (maqueta flotante) ===== */
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = -0.55 + t * 0.35;
    groupRef.current.rotation.x = -0.12 + Math.sin(t * 0.55) * 0.07;
    groupRef.current.rotation.z = 0.06 + Math.sin(t * 0.42) * 0.05;
    groupRef.current.position.y = 0.16 + Math.sin(t * 0.9) * 0.06;

    // Shimmer sweep across the faces
    const bt = beamTextureRef.current;
    if (bt) {
      bt.offset.x = (t * 0.12) % 1;
      bt.offset.y = (t * 0.06) % 1;
    }

    const pulse = 0.5 + 0.5 * Math.sin(t * 1.35);
    if (rimMatRef.current) rimMatRef.current.emissiveIntensity = 0.08 + pulse * 0.08;
    if (baseMatRef.current) baseMatRef.current.emissiveIntensity = 0.1 + pulse * 0.06;
    if (beamMatFrontRef.current) beamMatFrontRef.current.opacity = 0.08 + pulse * 0.07;
    if (beamMatBackRef.current) beamMatBackRef.current.opacity = 0.07 + pulse * 0.06;

    // Anime-like animated rings around the edge (draw + stagger)
    const circumference = 2 * Math.PI * radius * 1.075;
    const cycle = 2.35; // seconds
    const speed = 0.55; // rotations per second for the moving head
    for (let i = 0; i < ringMatsRef.current.length; i++) {
      const mat = ringMatsRef.current[i];
      const line = ringObjsRef.current[i];
      if (!mat || !line) continue;

      const phase = i * 0.18;
      const local = ((t / cycle + phase) % 1 + 1) % 1;
      // 0..0.6 draw in, 0.6..0.85 hold, 0.85..1.0 draw out
      let drawP = 0;
      if (local < 0.6) drawP = easeInOutQuad(local / 0.6);
      else if (local < 0.85) drawP = 1;
      else drawP = 1 - easeInOutQuad((local - 0.85) / 0.15);

      const dashLen = Math.max(0.0001, circumference * (0.1 + 0.24 * drawP));
      mat.dashSize = dashLen;
      mat.gapSize = circumference;
      mat.opacity = 0.14 + pulse * 0.16;
      mat.needsUpdate = true;

      line.rotation.z = (t * speed + phase) * Math.PI * 2;
    }

    // Motion-path-like marker running around the ring
    if (ringMarkerRef.current) {
      const a = (t * speed * Math.PI * 2) % (Math.PI * 2);
      const ringR = radius * 1.075;
      ringMarkerRef.current.position.set(
        Math.cos(a) * ringR,
        Math.sin(a) * ringR,
        depth / 2 + 0.06,
      );
    }

    // Neon beam streak following the marker
    if (ringBeamRef.current) {
      const a = (t * speed * Math.PI * 2) % (Math.PI * 2);
      const ringR = radius * 1.075;
      const px = Math.cos(a) * ringR;
      const py = Math.sin(a) * ringR;
      // Tangent direction (clockwise)
      const tx = -Math.sin(a);
      const ty = Math.cos(a);

      ringBeamRef.current.position.set(px - tx * 0.14, py - ty * 0.14, depth / 2 + 0.055);

      const mat = ringBeamRef.current.material as THREE.SpriteMaterial;
      mat.rotation = a + Math.PI / 2;
      mat.opacity = 0.22 + pulse * 0.22;
    }

    // Glow dot around the marker (neon bulb)
    if (ringMarkerGlowRef.current) {
      const a = (t * speed * Math.PI * 2) % (Math.PI * 2);
      const ringR = radius * 1.075;
      const px = Math.cos(a) * ringR;
      const py = Math.sin(a) * ringR;
      ringMarkerGlowRef.current.position.set(px, py, depth / 2 + 0.065);
      const mat = ringMarkerGlowRef.current.material as THREE.SpriteMaterial;
      mat.opacity = 0.32 + pulse * 0.26;
    }

    // Stronger edge glow (pulsing)
    if (edgeGlowMatRef.current) {
      edgeGlowMatRef.current.opacity = 0.1 + pulse * 0.12;
    }

    if (edgeGlowOuterMatRef.current) {
      edgeGlowOuterMatRef.current.opacity = 0.05 + pulse * 0.07;
    }
  });

  return (
    <group ref={groupRef} scale={1.0}>
      {/* Cuerpo tipo "moneda" */}
      <mesh
        geometry={coinGeo}
        castShadow
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          ref={baseMatRef}
          color="#0b1220"
          roughness={0.28}
          metalness={0.45}
          emissive="#11b3ff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Aro/rim para lectura 3D */}
      <mesh geometry={rimGeo}>
        <meshStandardMaterial
          ref={rimMatRef}
          color="#0f1a2b"
          roughness={0.25}
          metalness={0.6}
          emissive="#11b3ff"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Glow de borde (luces alrededor) */}
      <mesh geometry={edgeGlowGeo} position={[0, 0, 0.002]} renderOrder={5}>
        <meshBasicMaterial
          ref={edgeGlowMatRef}
          color="#00e5ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          depthTest={false}
        />
      </mesh>

      {/* Halo externo extra para look neón */}
      <mesh geometry={edgeGlowOuterGeo} position={[0, 0, 0.001]} renderOrder={4}>
        <meshBasicMaterial
          ref={edgeGlowOuterMatRef}
          color="#00e5ff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          depthTest={false}
        />
      </mesh>

      {/* Aros animados alrededor (estilo anime draw + stagger) */}
      {ringLines.map((r, i) => (
        <primitive key={`ring-${i}`} object={r.line} />
      ))}

      {/* Marker que corre por el aro (como el "car" del ejemplo) */}
      <mesh ref={ringMarkerRef}>
        <sphereGeometry args={[0.045, 24, 24]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>

      {/* Haz neón que acompaña al marker */}
      <sprite ref={ringBeamRef} scale={[0.62, 0.16, 1]}>
        <spriteMaterial
          map={ringBeamTexture}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          depthTest={false}
        />
      </sprite>

      {/* Glow del marker (bulbo) */}
      <sprite ref={ringMarkerGlowRef} scale={[0.22, 0.22, 1]}>
        <spriteMaterial
          map={glowDotTexture}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          depthTest={false}
        />
      </sprite>

      {/* Cara frontal circular con el logo */}
      <mesh position={[0, 0, depth / 2 + 0.03]} geometry={frontCircleGeo}>
        <meshStandardMaterial map={logoTexture} roughness={0.6} metalness={0} />
      </mesh>

      {/* Haz/shimmer frontal (aditivo) */}
      <mesh
        position={[0, 0, depth / 2 + 0.031]}
        geometry={frontCircleGeo}
        renderOrder={10}
      >
        <meshBasicMaterial
          ref={beamMatFrontRef}
          map={beamTexture}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Cara trasera con el mismo logo */}
      <mesh
        position={[0, 0, -depth / 2 - 0.03]}
        rotation={[0, Math.PI, 0]}
        geometry={frontCircleGeo}
      >
        <meshStandardMaterial map={logoTexture} roughness={0.6} metalness={0} />
      </mesh>

      {/* Haz/shimmer trasero */}
      <mesh
        position={[0, 0, -depth / 2 - 0.031]}
        rotation={[0, Math.PI, 0]}
        geometry={frontCircleGeo}
        renderOrder={10}
      >
        <meshBasicMaterial
          ref={beamMatBackRef}
          map={beamTexture}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Glow suave frontal */}
      <mesh position={[0, 0, depth / 2 + 0.02]} geometry={glowCircleGeo}>
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Glow suave trasero */}
      <mesh
        position={[0, 0, -depth / 2 - 0.02]}
        rotation={[0, Math.PI, 0]}
        geometry={glowCircleGeo}
      >
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
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
  className = "z-10",
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
      className={`${position} pointer-events-none ${className}`}
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

        {/* Luz neón de relleno */}
        <pointLight position={[0, 0.6, 2.2]} intensity={1.0} color="#00e5ff" />

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
