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

function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
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
  // Discrete-step rotation with thresholds and constant-speed 90° turns
  const stepRef = useRef(0); // 0..4 (4 = completed full turn)
  const targetStepRef = useRef<number | null>(null);
  const animRef = useRef<{ active: boolean; start: number; from: number; to: number; duration: number }>({ active: false, start: 0, from: 0, to: 0, duration: 700 });

  const [segState, setSegState] = useState(0);

  // Trigger logic driven by local progress, with hysteresis
  useEffect(() => {
    if (holdComplete) {
      stepRef.current = 4;
      animRef.current.active = false;
      setSegState(3);
      return;
    }
    if (animRef.current.active) return;
    const floatPos = progress * 4; // segment space
    const step = stepRef.current;
    const forwardTrigger = 0.65;
    const backwardTrigger = 0.35;
    if (floatPos > step + forwardTrigger && step < 4) {
      // animate to next step
      const nextStep = step + 1;
      targetStepRef.current = nextStep;
      const from = (step * Math.PI) / 2;
      const to = (nextStep * Math.PI) / 2;
      animRef.current = { active: true, start: performance.now(), from, to, duration: 700 };
    } else if (floatPos < step - backwardTrigger && step > 0) {
      // animate to previous step
      const nextStep = step - 1;
      targetStepRef.current = nextStep;
      const from = (step * Math.PI) / 2;
      const to = (nextStep * Math.PI) / 2;
      animRef.current = { active: true, start: performance.now(), from, to, duration: 700 };
    }
  }, [progress, holdComplete]);

  function SceneContent({ url }: { url: string }) {
    const groupRef = useRef<THREE.Group>(null);
    const angleRef = useRef(0);
    useFrame(() => {
      if (!groupRef.current) return;
      const anim = animRef.current;
      if (anim.active) {
        const t = Math.min(1, (performance.now() - anim.start) / anim.duration);
        const angle = THREE.MathUtils.lerp(anim.from, anim.to, t);
        angleRef.current = angle;
        if (t >= 1) {
          anim.active = false;
          stepRef.current = targetStepRef.current ?? stepRef.current;
          targetStepRef.current = null;
          setSegState(Math.min(Math.max(stepRef.current - 1, 0), 3));
        }
      } else {
        // snap to current step angle
        angleRef.current = (stepRef.current * Math.PI) / 2;
      }
      groupRef.current.rotation.y = angleRef.current;
    });
    return (
      <group ref={groupRef} position={[0, -0.2, 0]} scale={modelScale}>
        <Center disableZ>
          <AnyModel url={url} />
        </Center>
      </group>
    );
  }

  const bubbleBase = "rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl shadow-2xl shadow-orange-500/10 max-w-xs";

  return (
    <div className="relative h-screen">
      <Canvas camera={{ position: [0, 2.2, 5.2], fov: 52 }}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[7, 10, 7]} intensity={1.7} />
        <spotLight position={[0, 12, 2]} angle={0.4} penumbra={1} intensity={1.6} />
        <hemisphereLight intensity={0.5} groundColor={new THREE.Color('#111827')} />
        <SceneContent url={url} />
        {/* no OrbitControls in rotation stage */}
      </Canvas>

      {/* Minimal overlay: keep labels subtle, no framing */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">AI Model — Guided Rotation</p>
      </div>

      {/* Annotation bubbles */}
      <AnimatePresence mode="wait">
        {segState === 0 && (
          <motion.div key="ann-tl" initial={{ x: -24, y: -16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: -24, y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute left-6 top-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Technique</p>
            <h3 className="mt-1 text-white font-bold">{annotations[0].title}</h3>
            {annotations[0].subtitle && <p className="text-orange-400/80 text-sm">{annotations[0].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[0].body}</p>
          </motion.div>
        )}
        {segState === 1 && (
          <motion.div key="ann-tr" initial={{ x: 24, y: -16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: 24, y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute right-6 top-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Craft</p>
            <h3 className="mt-1 text-white font-bold">{annotations[1].title}</h3>
            {annotations[1].subtitle && <p className="text-orange-400/80 text-sm">{annotations[1].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[1].body}</p>
          </motion.div>
        )}
        {segState === 2 && (
          <motion.div key="ann-br" initial={{ x: 24, y: 16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: 24, y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute right-6 bottom-6 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Flavor</p>
            <h3 className="mt-1 text-white font-bold">{annotations[2].title}</h3>
            {annotations[2].subtitle && <p className="text-orange-400/80 text-sm">{annotations[2].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[2].body}</p>
          </motion.div>
        )}
        {segState === 3 && (
          <motion.div key="ann-bl" initial={{ x: -24, y: 16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: -24, y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute left-6 bottom-6 ${bubbleBase}`}>
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

export function DishSubpageExperience({ aiModelUrl, dishName, dishNameZh, annotations, rotationSectionVh = 500, modelScale = 3 }: DishSubpageExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
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

