"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  mouseX: number;
  mouseY: number;
  ctaHovered: boolean;
}

interface MeshProps {
  mouseX: number;
  mouseY: number;
  ctaHovered: boolean;
}

/* ── Golden Toroidal Ring ────────────────────────────────────────────────── */
function GoldenRing({ mouseX, mouseY, ctaHovered }: MeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !innerRingRef.current) return;

    meshRef.current.rotation.x += (mouseY * 0.3 - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.y += (mouseX * 0.2 - meshRef.current.rotation.y) * 0.02;

    innerRingRef.current.rotation.x -= delta * 0.18;
    innerRingRef.current.rotation.z += delta * 0.1;

    const targetScale = ctaHovered ? 1.1 : 1.0;
    const current = meshRef.current.scale.x;
    meshRef.current.scale.setScalar(current + (targetScale - current) * 0.06);
    innerRingRef.current.scale.setScalar(current + (targetScale - current) * 0.06);
  });

  return (
    <group position={[1.8, 0.2, 0]}>
      {/* Outer torus — gold wireframe */}
      <mesh ref={meshRef}>
        <torusGeometry args={[2.0, 0.015, 3, 120]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Second torus ring — slightly tilted */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.008, 3, 80]} />
        <meshStandardMaterial
          color="#F5D060"
          emissive="#F5D060"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Thin equatorial ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.005, 3, 160]} />
        <meshStandardMaterial
          color="#8B7322"
          emissive="#D4AF37"
          emissiveIntensity={0.3}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

/* ── Flowing Text Particles (scripture/script letters as dots) ─────────── */
function ScriptParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const count = 420;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Arrange in flowing ribbon formation
      const t = (i / count) * Math.PI * 6;
      const spread = 0.8;
      pos[i * 3]     = Math.cos(t) * (3 + Math.sin(t * 0.5) * 1.5) + (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = Math.sin(t * 0.7) * 1.8 + (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = Math.cos(t * 1.3) * 1.2 + (Math.random() - 0.5) * spread * 0.5;

      vel[i * 3]     = (Math.random() - 0.5) * 0.001;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(timeRef.current * 0.1) * 0.08;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        color="#D4AF37"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </Points>
  );
}

/* ── Ambient Gold Dust ───────────────────────────────────────────────────── */
function GoldDust() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        color="#F5D060"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </Points>
  );
}

/* ── Crimson accent orb ──────────────────────────────────────────────────── */
function CrimsonOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    meshRef.current.position.y = -2.5 + Math.sin(timeRef.current * 0.4) * 0.3;
    meshRef.current.position.x = -3.5 + Math.cos(timeRef.current * 0.25) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[-3.5, -2.5, -1]}>
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshStandardMaterial
        color="#C41E3A"
        emissive="#C41E3A"
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* ── Scene content ───────────────────────────────────────────────────────── */
function SceneContent({ mouseX, mouseY, ctaHovered }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.15} />
      {/* Gold key light */}
      <pointLight position={[4, 3, 4]} color="#D4AF37" intensity={2.5} />
      {/* Crimson fill */}
      <pointLight position={[-6, -3, -3]} color="#C41E3A" intensity={0.8} />
      {/* Cool rim */}
      <pointLight position={[0, 6, -5]} color="#E8E8F0" intensity={0.4} />

      <GoldenRing mouseX={mouseX} mouseY={mouseY} ctaHovered={ctaHovered} />
      <ScriptParticles />
      <GoldDust />
      <CrimsonOrb />
    </>
  );
}

/* ── Canvas export ───────────────────────────────────────────────────────── */
export default function Scene({ mouseX, mouseY, ctaHovered }: SceneProps) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 48 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SceneContent mouseX={mouseX} mouseY={mouseY} ctaHovered={ctaHovered} />
    </Canvas>
  );
}
