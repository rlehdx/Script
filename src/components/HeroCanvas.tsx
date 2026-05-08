"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, sizes] = useMemo(() => {
    const count = 420;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sz[i] = Math.random() * 1.8 + 0.4;
    }
    return [pos, sz];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.04 + mouse.x * 0.12;
    meshRef.current.rotation.x = t * 0.02 + mouse.y * 0.08;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#C9A84C" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

function GoldRing() {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15 + mouse.y * 0.3;
    ref.current.rotation.z = t * 0.08 + mouse.x * 0.2;
    ref.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={ref} position={[2.8, -0.4, -1.5]}>
      <torusGeometry args={[1.1, 0.018, 16, 80]} />
      <meshStandardMaterial
        color="#C9A84C"
        emissive="#8A6E2A"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function OrbitSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * 0.6;
    ref.current.position.x = Math.cos(t) * 3.2 + 1;
    ref.current.position.y = Math.sin(t) * 1.4 - 0.5;
    ref.current.position.z = Math.sin(t * 0.5) * 1.2;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#EDD078" emissive="#C9A84C" emissiveIntensity={2} metalness={1} roughness={0} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#C9A84C" />
      <pointLight position={[-4, -2, 2]} intensity={0.4} color="#7A1225" />
      <ParticleField />
      <GoldRing />
      <OrbitSphere />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  );
}
