"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

// Reuse AnyModel loader logic through a local definition to avoid circular deps
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function USDZModel({ url }: { url: string }) {
  const ref = useRef<THREE.Group | null>(null);
  const [loaded, setLoaded] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    let active = true;
    (async () => {
      const mod: any = await import("three/examples/jsm/loaders/USDZLoader.js");
      const loader = new mod.USDZLoader();
      loader.load(url, (obj: THREE.Object3D) => {
        if (!active) return;
        setLoaded(obj);
      });
    })();
    return () => {
      active = false;
    };
  }, [url]);
  return loaded ? <primitive ref={ref as any} object={loaded} /> : null;
}

function AnyModel({ url }: { url: string }) {
  const isUSDZ = url.toLowerCase().endsWith(".usdz");
  return isUSDZ ? <USDZModel url={url} /> : <GLBModel url={url} />;
}

export type Annotation = { id: string; title: string; subtitle?: string; body: string };

interface DishSubpageExperienceProps {
  aiModelUrl: string;
  scanModelUrl?: string;
  dishName: string;
  dishNameZh: string;
  annotations: [Annotation, Annotation, Annotation, Annotation];
  rotationSectionVh?: number; // viewport heights per full turn, default 300
  modelScale?: number; // scale multiplier for both stages
}

function useSectionProgress(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const traveled = Math.min(Math.max(-rect.top, 0), total);
      setP(total > 0 ? traveled / total : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ref]);
  return p; // 0..1 within the section
}

function RotationStage({ url, progress, dishName, dishNameZh, annotations, modelScale = 1, holdComplete = false }: { url: string; progress: number; dishName: string; dishNameZh: string; annotations: DishSubpageExperienceProps["annotations"]; modelScale?: number; holdComplete?: boolean }) {
  let targetAngle = progress * Math.PI * 2; // full turn
  if (holdComplete) targetAngle = Math.max(targetAngle, Math.PI * 2 - 0.02);

  function SceneContent({ url, targetAngle }: { url: string; targetAngle: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const angleRef = useRef(0);
    useFrame(() => {
      if (!groupRef.current) return;
      const current = angleRef.current;
      const next = THREE.MathUtils.lerp(current, targetAngle, 0.06);
      angleRef.current = next;
      groupRef.current.rotation.y = next;
    });
    return (
      <group ref={groupRef} position={[0, -0.2, 0]} scale={modelScale}>
        <Center disableZ>
          <AnyModel url={url} />
        </Center>
      </group>
    );
  }

  const seg = useMemo(() => {
    const norm = (targetAngle % (Math.PI * 2)) / (Math.PI * 2);
    if (norm < 0.25) return 0;
    if (norm < 0.5) return 1;
    if (norm < 0.75) return 2;
    return 3;
  }, [targetAngle]);

  // bubble positions
  const bubbleBase = "rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl shadow-2xl shadow-orange-500/10 max-w-xs";

  return (
    <div className="relative h-screen">
      <Canvas camera={{ position: [0, 2.2, 5.2], fov: 52 }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[7, 10, 7]} intensity={1.7} />
        <spotLight position={[0, 12, 2]} angle={0.4} penumbra={1} intensity={1.6} />
        <hemisphereLight intensity={0.5} groundColor={new THREE.Color('#111827')} />
        <SceneContent url={url} targetAngle={targetAngle} />
        {/* no OrbitControls in rotation stage */}
      </Canvas>

      {/* Minimal overlay: keep labels subtle, no framing */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">AI Model — Guided Rotation</p>
      </div>

      {/* Annotation bubbles (diagonal corners with refined animations) */}
      <AnimatePresence mode="wait">
        {seg === 0 && (
          <motion.div key="ann-tl" initial={{ x: -24, y: -16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: -24, y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className={`absolute left-6 top-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Technique</p>
            <h3 className="mt-1 text-white font-bold">{annotations[0].title}</h3>
            {annotations[0].subtitle && <p className="text-orange-400/80 text-sm">{annotations[0].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[0].body}</p>
          </motion.div>
        )}
        {seg === 1 && (
          <motion.div key="ann-tr" initial={{ x: 24, y: -16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: 24, y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className={`absolute right-6 top-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Craft</p>
            <h3 className="mt-1 text-white font-bold">{annotations[1].title}</h3>
            {annotations[1].subtitle && <p className="text-orange-400/80 text-sm">{annotations[1].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[1].body}</p>
          </motion.div>
        )}
        {seg === 2 && (
          <motion.div key="ann-br" initial={{ x: 24, y: 16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: 24, y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className={`absolute right-6 bottom-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Flavor</p>
            <h3 className="mt-1 text-white font-bold">{annotations[2].title}</h3>
            {annotations[2].subtitle && <p className="text-orange-400/80 text-sm">{annotations[2].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[2].body}</p>
          </motion.div>
        )}
        {seg === 3 && (
          <motion.div key="ann-bl" initial={{ x: -24, y: 16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: -24, y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className={`absolute left-6 bottom-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Form</p>
            <h3 className="mt-1 text-white font-bold">{annotations[3].title}</h3>
            {annotations[3].subtitle && <p className="text-orange-400/80 text-sm">{annotations[3].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[3].body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DishSubpageExperience({ aiModelUrl, dishName, dishNameZh, annotations, rotationSectionVh = 500, modelScale = 2.5 }: DishSubpageExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(sectionRef); // 0..1
  const [holdComplete, setHoldComplete] = useState(false);

  // Listen for interactive window leave events to hold rotation at end
  useEffect(() => {
    const handler = () => {
      setHoldComplete(true);
      const t = setTimeout(() => setHoldComplete(false), 700);
      return () => clearTimeout(t);
    };
    const cb = () => handler();
    window.addEventListener('dish-free-leave', cb as any);
    return () => window.removeEventListener('dish-free-leave', cb as any);
  }, []);

  // Calibrate section height: N viewport heights
  const sectionStyle = { height: `${rotationSectionVh}vh` } as const;

  return (
    <div className="relative w-full">
      {/* Rotation section */}
      <section ref={sectionRef} style={sectionStyle} className="relative">
        <div className="sticky top-0 h-screen">
          {/* Clean full-bleed Canvas without framing */}
          <RotationStage url={aiModelUrl} progress={Math.min(progress, 1)} dishName={dishName} dishNameZh={dishNameZh} annotations={annotations} modelScale={modelScale} holdComplete={holdComplete} />
        </div>
      </section>

      {/* Interactive window is rendered separately on the page after gallery and bento */}
    </div>
  );
}
