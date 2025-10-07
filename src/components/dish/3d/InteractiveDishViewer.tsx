"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";

type ModelVariant = "ai" | "scan";

export interface InteractiveDishViewerProps {
  aiModelUrl: string; // e.g. /models/squirrel-fish.glb
  scanModelUrl?: string; // e.g. /models/squirrel-fish_scan.usdz
  dishName: string;
  dishNameZh: string;
  unlockAtProgress?: number; // 0..1
  rotations?: number; // how many full turns during scroll before unlock
  onSegmentChange?: (idx: number) => void; // to drive info cards
}

function useGlobalScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const handler = () => {
      const sh = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const progress = sh > 0 ? Math.min(1, Math.max(0, y / sh)) : 0;
      setP(progress);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  return p;
}

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
      // Lazy import USDZLoader from three examples to avoid extra deps
      const mod: any = await import("three/examples/jsm/loaders/USDZLoader.js");
      const loader = new mod.USDZLoader();
      loader.load(
        url,
        (obj: THREE.Object3D) => {
          if (!active) return;
          setLoaded(obj);
        },
        undefined,
        () => {
          // eslint-disable-next-line no-console
          console.warn("Failed to load USDZ: ", url);
        }
      );
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

export function InteractiveDishViewer({
  aiModelUrl,
  scanModelUrl,
  dishName,
  dishNameZh,
  unlockAtProgress = 0.35,
  rotations = 2.5,
  onSegmentChange,
}: InteractiveDishViewerProps) {
  const scroll = useGlobalScrollProgress();
  const [unlocked, setUnlocked] = useState(false);
  const [variant, setVariant] = useState<ModelVariant>("ai");

  const canUseScan = Boolean(scanModelUrl);

  useEffect(() => {
    if (!unlocked && scroll >= unlockAtProgress) {
      setUnlocked(true);
    }
  }, [scroll, unlockAtProgress, unlocked]);

  const targetAngle = useMemo(() => scroll * rotations * Math.PI * 2, [scroll, rotations]);

  // Map angle to 4 segments and emit index changes for info cards
  const segmentIndex = useMemo(() => {
    const norm = (targetAngle % (Math.PI * 2)) / (Math.PI * 2);
    if (norm < 0.25) return 0;
    if (norm < 0.5) return 1;
    if (norm < 0.75) return 2;
    return 3;
  }, [targetAngle]);

  useEffect(() => {
    onSegmentChange?.(segmentIndex);
  }, [segmentIndex, onSegmentChange]);

  const handleVariantChange = useCallback((next: ModelVariant) => setVariant(next), []);

  const modelUrl = variant === "ai" ? aiModelUrl : scanModelUrl || aiModelUrl;

  function SceneContent({ url, unlocked, targetAngle }: { url: string; unlocked: boolean; targetAngle: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const angleRef = useRef(0);

    useFrame(() => {
      if (!groupRef.current) return;
      // Smoothly lerp current angle towards target while locked
      const current = angleRef.current;
      const next = unlocked ? current : THREE.MathUtils.lerp(current, targetAngle, 0.08);
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

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
      {/* Decorative radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.15),_transparent_60%)]" />

      {/* Header strip */}
      <div className="relative z-[1] flex items-center justify-between px-5 py-3 border-b border-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">3D Model</p>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
          <span className="text-slate-300">{dishNameZh}</span>
          <span className="text-slate-500">{dishName}</span>
        </div>
      </div>

      <div className="relative z-[1] h-[56vh] min-h-[420px] w-full">
        <Canvas camera={{ position: [0, 2.2, 5.2], fov: 52 }} className={unlocked ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}>
          {/* Lighting tuned to brighten food */}
          <ambientLight intensity={1.15} />
          <directionalLight position={[7, 10, 7]} intensity={1.7} castShadow />
          <spotLight position={[0, 12, 2]} angle={0.4} penumbra={1} intensity={1.6} />
          <hemisphereLight intensity={0.5} groundColor={new THREE.Color("#111827")} />

          <Suspense fallback={null}>
            <SceneContent url={modelUrl} unlocked={unlocked} targetAngle={targetAngle} />
          </Suspense>

          <OrbitControls enableZoom={unlocked} enableRotate={unlocked} enablePan={false} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 1.7} minDistance={2.8} maxDistance={7.5} />
        </Canvas>

        {/* Loading indicator overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Suspense fallback={<div className="flex flex-col items-center gap-3"><div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500/30 border-t-orange-500" /><p className="text-xs uppercase tracking-wider text-orange-400/80">Loading 3D Model</p></div>}>
            <div className="hidden" />
          </Suspense>
        </div>

        {/* Unlock hint */}
        <AnimatePresence>
          {!unlocked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="pointer-events-none absolute bottom-4 left-0 right-0 mx-auto w-fit rounded-full bg-orange-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">
              Scroll to explore — interactive mode unlocks
            </motion.div>
          )}
        </AnimatePresence>

        {/* Capsule switch appears only after unlock */}
        <AnimatePresence>
          {unlocked && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ type: "spring", stiffness: 120, damping: 18 }} className="absolute top-4 right-4 z-[2]">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-1 py-1 backdrop-blur-xl">
                <button onClick={() => handleVariantChange("ai")} className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${variant === "ai" ? "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30" : "text-slate-300 hover:text-white"}`}>AI Model</button>
                <button onClick={() => handleVariantChange("scan")} disabled={!canUseScan} className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${variant === "scan" ? "bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30" : canUseScan ? "text-slate-300 hover:text-white" : "text-slate-500"}`}>Scan Model</button>
              </div>
              {!canUseScan && (
                <p className="mt-2 text-[11px] text-slate-400">Scan model unavailable due to specular reflection during capture.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

