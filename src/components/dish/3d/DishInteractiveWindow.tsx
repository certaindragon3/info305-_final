"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

function GLBModel({ url, scale = 1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url);

  // Clone the scene to prevent shared material/geometry issues
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clonedScene} scale={scale} />;
}

function LoaderOverlay() {
  const { active } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500/30 border-t-orange-500" />
        <p className="text-xs uppercase tracking-wider text-orange-400/80">Loading 3D Model</p>
      </div>
    </div>
  );
}

export function DishInteractiveWindow({ aiModelUrl, scanModelUrl, hideVariantSwitch, aiModelScale = 5, scanModelScale = 15 }: { aiModelUrl: string; scanModelUrl?: string; hideVariantSwitch?: boolean; aiModelScale?: number; scanModelScale?: number }) {
  const [variant, setVariant] = useState<'ai' | 'scan'>('ai');
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const derivedScan = useMemo(() => aiModelUrl.replace(/\.glb$/i, '_scan.glb'), [aiModelUrl]);

  // Compute the current model URL and scale
  const currentModelUrl = variant === 'ai' ? aiModelUrl : (scanModelUrl || derivedScan || aiModelUrl);
  const currentModelScale = variant === 'ai' ? aiModelScale : scanModelScale;

  // Preload both models on mount
  useEffect(() => {
    useGLTF.preload(aiModelUrl);
    if (scanModelUrl) {
      useGLTF.preload(scanModelUrl);
    } else {
      useGLTF.preload(derivedScan);
    }
  }, [aiModelUrl, scanModelUrl, derivedScan]);

  // Handle visibility with IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        setIsVisible(visible);

        if (!visible) {
          // Reset variant when leaving viewport
          setVariant('ai');
          window.dispatchEvent(new Event('dish-free-leave'));
        }
      },
      { threshold: [0, 0.2, 0.6, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Cleanup GLTF cache on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      useGLTF.clear(aiModelUrl);
      if (scanModelUrl) useGLTF.clear(scanModelUrl);
      useGLTF.clear(derivedScan);
    };
  }, [aiModelUrl, scanModelUrl, derivedScan]);

  return (
    <section ref={containerRef} className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 p-4 md:p-6 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.1),_transparent_70%)]" />
      <div className="relative">
        <div className="flex items-center justify-between px-1 pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Interactive Mode</p>
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
        </div>

        <div className="relative h-[60vh] min-h-[420px] w-full">
          {isVisible && (
            <Canvas
              key={currentModelUrl}
              camera={{ position: [0, 2.2, 5.2], fov: 52 }}
              frameloop="demand"
              className="cursor-grab active:cursor-grabbing"
            >
              <ambientLight intensity={1.15} />
              <directionalLight position={[7, 10, 7]} intensity={1.7} />
              <spotLight position={[0, 12, 2]} angle={0.4} penumbra={1} intensity={1.6} />
              <hemisphereLight intensity={0.5} groundColor={new THREE.Color('#111827')} />
              <Suspense fallback={null}>
                <Center disableZ>
                  <GLBModel url={currentModelUrl} scale={currentModelScale} />
                </Center>
              </Suspense>
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 1.7}
                minDistance={2.8}
                maxDistance={7.5}
              />
            </Canvas>
          )}
          <LoaderOverlay />
        </div>

        {/* Capsule switch */}
        {!hideVariantSwitch && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-1 py-1 backdrop-blur-xl">
              <button onClick={() => setVariant('ai')} className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${variant === 'ai' ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30' : 'text-slate-300 hover:text-white'}`}>AI Model</button>
              <button onClick={() => setVariant('scan')} disabled={!scanModelUrl} className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${variant === 'scan' ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/30' : scanModelUrl ? 'text-slate-300 hover:text-white' : 'text-slate-500'}`}>Scan Model</button>
            </div>
          </div>
        )}
        {!hideVariantSwitch && !scanModelUrl && (
          <p className="mt-2 text-center text-[11px] text-slate-400">Scan model unavailable due to specular reflection during capture.</p>
        )}
      </div>
    </section>
  );
}
