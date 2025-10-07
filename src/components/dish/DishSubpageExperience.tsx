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

function RotationStage({ url, progress, dishName, dishNameZh, annotations }: { url: string; progress: number; dishName: string; dishNameZh: string; annotations: DishSubpageExperienceProps["annotations"] }) {
  const targetAngle = progress * Math.PI * 2; // full turn

  function SceneContent({ url, targetAngle }: { url: string; targetAngle: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const angleRef = useRef(0);
    useFrame(() => {
      if (!groupRef.current) return;
      const current = angleRef.current;
      const next = THREE.MathUtils.lerp(current, targetAngle, 0.1);
      angleRef.current = next;
      groupRef.current.rotation.y = next;
    });
    return (
      <group ref={groupRef} position={[0, -0.2, 0]}>
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

      {/* Header strip overlay */}
      <div className="pointer-events-none absolute top-3 left-0 right-0 flex items-center justify-between px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">AI Model</p>
        <div className="flex items-center gap-2 text-slate-300 text-xs">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
          <span>{dishNameZh}</span>
          <span className="text-slate-500">{dishName}</span>
        </div>
      </div>

      {/* Annotation bubbles */}
      <AnimatePresence mode="wait">
        {seg === 0 && (
          <motion.div key="ann-top" initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} className={`absolute left-1/2 top-8 -translate-x-1/2 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Annotation</p>
            <h3 className="mt-1 text-white font-bold">{annotations[0].title}</h3>
            {annotations[0].subtitle && <p className="text-orange-400/80 text-sm">{annotations[0].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[0].body}</p>
          </motion.div>
        )}
        {seg === 1 && (
          <motion.div key="ann-right" initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 24, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} className={`absolute right-6 top-1/2 -translate-y-1/2 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Annotation</p>
            <h3 className="mt-1 text-white font-bold">{annotations[1].title}</h3>
            {annotations[1].subtitle && <p className="text-orange-400/80 text-sm">{annotations[1].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[1].body}</p>
          </motion.div>
        )}
        {seg === 2 && (
          <motion.div key="ann-bottom" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} className={`absolute left-1/2 bottom-10 -translate-x-1/2 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Annotation</p>
            <h3 className="mt-1 text-white font-bold">{annotations[2].title}</h3>
            {annotations[2].subtitle && <p className="text-orange-400/80 text-sm">{annotations[2].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[2].body}</p>
          </motion.div>
        )}
        {seg === 3 && (
          <motion.div key="ann-left" initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -24, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} className={`absolute left-6 top-1/2 -translate-y-1/2 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Annotation</p>
            <h3 className="mt-1 text-white font-bold">{annotations[3].title}</h3>
            {annotations[3].subtitle && <p className="text-orange-400/80 text-sm">{annotations[3].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[3].body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DishSubpageExperience({ aiModelUrl, scanModelUrl, dishName, dishNameZh, annotations, rotationSectionVh = 300 }: DishSubpageExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(sectionRef); // 0..1
  const [variant, setVariant] = useState<'ai' | 'scan'>('ai');
  const [freeMode, setFreeMode] = useState(false);

  // Stage visibility detection
  const freeStageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = freeStageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = e.isIntersecting && e.intersectionRatio > 0.2;
        setFreeMode(Boolean(v));
        if (!v) {
          // leaving free mode upwards -> reset to AI
          setVariant('ai');
        }
      },
      { threshold: [0, 0.2, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Calibrate section height: N viewport heights
  const sectionStyle = { height: `${rotationSectionVh}vh` } as const;

  return (
    <div className="relative w-full">
      {/* Rotation section */}
      <section ref={sectionRef} style={sectionStyle} className="relative">
        <div className="sticky top-0 h-screen">
          <div className="relative h-full overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.15),_transparent_60%)]" />
            <RotationStage url={aiModelUrl} progress={Math.min(progress, 1)} dishName={dishName} dishNameZh={dishNameZh} annotations={annotations} />
          </div>
        </div>
      </section>

      {/* Free interaction section */}
      <section ref={freeStageRef} className="relative mt-10">
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 p-4 md:p-6 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.1),_transparent_70%)]" />
          <div className="relative">
            <div className="flex items-center justify-between px-1 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Interactive Mode</p>
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            </div>

            <div className="relative h-[60vh] min-h-[420px] w-full">
              <Canvas camera={{ position: [0, 2.2, 5.2], fov: 52 }} className="cursor-grab active:cursor-grabbing">
                <ambientLight intensity={1.15} />
                <directionalLight position={[7, 10, 7]} intensity={1.7} />
                <spotLight position={[0, 12, 2]} angle={0.4} penumbra={1} intensity={1.6} />
                <hemisphereLight intensity={0.5} groundColor={new THREE.Color('#111827')} />
                <Center disableZ>
                  <AnyModel url={variant === 'ai' ? aiModelUrl : (scanModelUrl || aiModelUrl)} />
                </Center>
                <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 1.7} minDistance={2.8} maxDistance={7.5} />
              </Canvas>
            </div>

            {/* Capsule switch */}
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-1 py-1 backdrop-blur-xl">
                <button onClick={() => setVariant('ai')} className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${variant === 'ai' ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30' : 'text-slate-300 hover:text-white'}`}>AI Model</button>
                <button onClick={() => setVariant('scan')} disabled={!scanModelUrl} className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${variant === 'scan' ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30' : scanModelUrl ? 'text-slate-300 hover:text-white' : 'text-slate-500'}`}>Scan Model</button>
              </div>
            </div>
            {!scanModelUrl && (
              <p className="mt-2 text-center text-[11px] text-slate-400">Scan model unavailable due to specular reflection during capture.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
