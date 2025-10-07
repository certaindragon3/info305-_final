"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

export function DishInteractiveWindow({ aiModelUrl, scanModelUrl }: { aiModelUrl: string; scanModelUrl?: string }) {
  const [variant, setVariant] = useState<'ai' | 'scan'>('ai');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const visible = e.isIntersecting && e.intersectionRatio > 0.2;
        if (!visible) {
          // inform rotation stage to hold completed state and reset variant
          setVariant('ai');
          window.dispatchEvent(new Event('dish-free-leave'));
        }
      },
      { threshold: [0, 0.2, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 p-4 md:p-6 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
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
    </section>
  );
}

