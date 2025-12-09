"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";

// Reuse AnyModel loader logic through a local definition to avoid circular deps
function GLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={clonedScene} />;
}

// GLB only — rotation stage always uses AI GLB
function AnyModel({ url }: { url: string }) {
  return <GLBModel url={url} />;
}

export type Annotation = { id: string; title: string; subtitle?: string; body: string };

interface DishSubpageExperienceProps {
  aiModelUrl: string;
  dishName: string;
  dishNameZh: string;
  annotations: [Annotation, Annotation, Annotation, Annotation];
  rotationSectionVh?: number; // viewport heights per full turn, default 300
  modelScale?: number; // scale multiplier for both stages
}

// Invalidate render only when needed
function RenderController() {
  const { invalidate } = useThree();
  useEffect(() => {
    // Initial render
    invalidate();
  }, [invalidate]);
  return null;
}

function ModelRotator({ url, progress, modelScale }: { url: string; progress: number; modelScale: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  // Smooth rotation logic
  useFrame(() => {
    if (!groupRef.current) return;
    const targetRotation = progress * Math.PI * 2;
    const currentRotation = groupRef.current.rotation.y;
    const newRotation = THREE.MathUtils.lerp(currentRotation, targetRotation, 0.1);
    
    // Only update if there's meaningful change
    if (Math.abs(newRotation - currentRotation) > 0.001) {
      groupRef.current.rotation.y = newRotation;
      invalidate(); // Request render only when rotating
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={modelScale}>
      <Center disableZ>
        <AnyModel url={url} />
      </Center>
    </group>
  );
}

function RotationStage({ url, progress, annotations, modelScale = 1 }: { url: string; progress: number; annotations: DishSubpageExperienceProps["annotations"]; modelScale?: number }) {
  // Calculate current segment (0..3) for annotations
  const segment = Math.min(Math.floor(progress * 4), 3);

  const bubbleBase = "rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl shadow-2xl shadow-orange-500/10 max-w-xs";

  return (
    <div className="relative h-screen w-full">
      <Canvas 
        camera={{ position: [0, 2.2, 5.2], fov: 52 }}
        frameloop="demand" // Only render when invalidated (saves GPU)
      >
        <RenderController />
        <ambientLight intensity={1.15} />
        <directionalLight position={[7, 10, 7]} intensity={1.7} />
        <spotLight position={[0, 12, 2]} angle={0.4} penumbra={1} intensity={1.6} />
        <hemisphereLight intensity={0.5} groundColor={new THREE.Color('#111827')} />

        <ModelRotator url={url} progress={progress} modelScale={modelScale} />
      </Canvas>

      {/* Minimal overlay */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">Guided Recipe Essense Exhibition</p>
      </div>

      {/* Annotation bubbles */}
      <AnimatePresence mode="wait">
        {segment === 0 && (
          <motion.div key="ann-tl" initial={{ x: -24, y: -16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: -24, y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute left-6 top-24 md:top-32 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Technique</p>
            <h3 className="mt-1 text-white font-bold">{annotations[0].title}</h3>
            {annotations[0].subtitle && <p className="text-orange-400/80 text-sm">{annotations[0].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[0].body}</p>
          </motion.div>
        )}
        {segment === 1 && (
          <motion.div key="ann-tr" initial={{ x: 24, y: -16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: 24, y: -16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute right-6 top-24 md:top-32 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Craft</p>
            <h3 className="mt-1 text-white font-bold">{annotations[1].title}</h3>
            {annotations[1].subtitle && <p className="text-orange-400/80 text-sm">{annotations[1].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[1].body}</p>
          </motion.div>
        )}
        {segment === 2 && (
          <motion.div key="ann-br" initial={{ x: 24, y: 16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: 24, y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute right-6 bottom-24 md:bottom-32 ${bubbleBase}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Flavor</p>
            <h3 className="mt-1 text-white font-bold">{annotations[2].title}</h3>
            {annotations[2].subtitle && <p className="text-orange-400/80 text-sm">{annotations[2].subtitle}</p>}
            <p className="mt-2 text-sm text-slate-300">{annotations[2].body}</p>
          </motion.div>
        )}
        {segment === 3 && (
          <motion.div key="ann-bl" initial={{ x: -24, y: 16, scale: 0.95, opacity: 0 }} animate={{ x: 0, y: 0, scale: 1, opacity: 1 }} exit={{ x: -24, y: 16, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className={`absolute left-6 bottom-24 md:bottom-32 ${bubbleBase}`}>
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

export function DishSubpageExperience({ aiModelUrl, dishName, dishNameZh, annotations, rotationSectionVh = 400, modelScale = 3 }: DishSubpageExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep dishName/dishNameZh for future use (SEO, metadata, etc.)
  void dishName;
  void dishNameZh;

  // Preload model on mount
  useEffect(() => {
    useGLTF.preload(aiModelUrl);
  }, [aiModelUrl]);

  // Use framer-motion's useScroll to track progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the progress value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  // Sync motion value to state for React rendering (annotations)
  // Note: For the 3D rotation we could pass the motion value directly if we wanted to avoid re-renders,
  // but we need re-renders for the annotations anyway.
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      setProgress(v);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <div ref={containerRef} style={{ height: `${rotationSectionVh}vh` }} className="relative w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <RotationStage
          url={aiModelUrl}
          progress={progress}
          annotations={annotations}
          modelScale={modelScale}
        />
      </div>
    </div>
  );
}
