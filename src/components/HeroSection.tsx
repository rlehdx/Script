"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── 3D floating particle field ── */
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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#C9A84C"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Floating gold ring ── */
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

/* ── Small orbiting sphere ── */
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
      <meshStandardMaterial
        color="#EDD078"
        emissive="#C9A84C"
        emissiveIntensity={2}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
}

/* ── Scene ── */
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

/* ── Stagger variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "84px",
        background: "var(--obsidian)",
        overflow: "hidden",
      }}
    >
      {/* Radial glow backdrop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 65%), " +
            "radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196,30,58,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Three.js canvas — right half */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          marginInline: "auto",
          width: "100%",
          paddingInline: "2rem",
          paddingBlock: "4rem 5rem",
          justifyContent: "center",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: "640px" }}
        >
          {/* Kicker */}
          <motion.div variants={itemVariants} style={{ marginBottom: "1.5rem" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--champagne)",
                border: "1px solid rgba(201,168,76,0.25)",
                padding: "0.35rem 0.85rem",
                borderRadius: "2px",
                background: "rgba(201,168,76,0.06)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--champagne)", display: "inline-block", boxShadow: "0 0 8px var(--champagne)" }} />
              GPT-4o · Script Generation · Instant
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--silver-bright)",
              marginBottom: "1.75rem",
            }}
          >
            Your Scripts.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8A6E2A 0%, #C9A84C 40%, #EDD078 55%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Written
            </span>
            <br />
            In Seconds.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "var(--silver)",
              maxWidth: "420px",
              marginBottom: "2.5rem",
            }}
          >
            Drop your topic. Pick a format. GPT-4o writes a fully structured,
            section-labeled script — YouTube, TikTok, VSL, cold email, podcast —
            ready for production in under 10 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}
          >
            <Link href="/sign-up" className="btn-champagne">
              Start for free
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#try-free" className="btn-glass">
              Try without signing up
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: "3rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {[
              { n: "12,000+", label: "Scripts Generated" },
              { n: "3,400+",  label: "Active Creators" },
              { n: "4.9/5",   label: "Avg Rating" },
              { n: "<10s",    label: "Per Script" },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--silver-bright)",
                    lineHeight: 1,
                  }}
                >
                  {stat.n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--silver-dim)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--obsidian))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
