"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
import { Suspense, useMemo, useEffect, useState, useRef } from 'react';
import { DishModel3DPlaceholder } from './DishModel3DPlaceholder';

// For mainpage gallery section

interface DishModel3DProps {
  modelPath: string;
  dishName: string;
  dishNameZh: string;
  interactive?: boolean; // New prop to control interaction
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <Center>
      <primitive object={clonedScene} scale={3.5} />
    </Center>
  );
}

function ModelContent({ modelPath, interactive = true }: { modelPath: string; interactive?: boolean }) {
  return (
    <>
      {/* Enhanced lighting for brighter models */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={2.0} />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} />
      <spotLight position={[0, 15, 0]} angle={0.4} penumbra={1} intensity={1.8} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.6} />

      <Model modelPath={modelPath} />

      <OrbitControls
        enableZoom={interactive}
        enablePan={false}
        enableRotate={interactive}
        autoRotate={true}
        autoRotateSpeed={1.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={3}
        maxDistance={8}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500/30 border-t-orange-500" />
        <p className="text-xs uppercase tracking-wider text-orange-400/60">Loading 3D Model</p>
      </div>
    </div>
  );
}

export function DishModel3D({ modelPath, dishName, dishNameZh, interactive = true }: DishModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Lazy load: only render Canvas when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we keep it loaded
          io.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0 } // Start loading 200px before visible
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Preload the model when component mounts
  useEffect(() => {
    if (modelPath && modelPath !== '/models/placeholder.glb') {
      useGLTF.preload(modelPath);
    }
  }, [modelPath]);

  // If model path doesn't exist, show placeholder
  if (!modelPath || modelPath === '/models/placeholder.glb') {
    return <DishModel3DPlaceholder dishName={dishName} dishNameZh={dishNameZh} />;
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      {isVisible ? (
        <>
          <Canvas
            camera={{ position: [0, 2, 5], fov: 50 }}
            frameloop={interactive ? "always" : "demand"} // Save GPU when not interactive
            className={interactive ? "touch-auto cursor-grab active:cursor-grabbing" : "touch-none pointer-events-none"}
            onCreated={() => setHasLoaded(true)}
          >
            <Suspense fallback={null}>
              <ModelContent modelPath={modelPath} interactive={interactive} />
            </Suspense>
          </Canvas>

          {/* Loading overlay */}
          {!hasLoaded && (
            <div className="pointer-events-none absolute inset-0">
              <LoadingFallback />
            </div>
          )}
        </>
      ) : (
        // Placeholder while waiting for intersection
        <div className="flex h-full w-full items-center justify-center bg-slate-900/50">
          <div className="h-8 w-8 animate-pulse rounded-full bg-orange-500/20" />
        </div>
      )}
    </div>
  );
}

