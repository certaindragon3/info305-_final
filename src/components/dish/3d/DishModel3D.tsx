"use client";

import { View, OrbitControls, Center, useGLTF } from '@react-three/drei';
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
        makeDefault
      />
    </>
  );
}

export function DishModel3D({ modelPath, dishName, dishNameZh, interactive = true }: DishModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load: only render View when in viewport to save bandwidth and memory
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // If model path doesn't exist, show placeholder
  if (!modelPath || modelPath === '/models/placeholder.glb') {
    return <DishModel3DPlaceholder dishName={dishName} dishNameZh={dishNameZh} />;
  }

  return (
    <div ref={containerRef} className="h-full w-full relative">
      {isVisible ? (
        <View className="h-full w-full absolute inset-0">
          <Suspense fallback={null}>
            <ModelContent modelPath={modelPath} interactive={interactive} />
          </Suspense>
        </View>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-900/50">
          <div className="h-8 w-8 animate-pulse rounded-full bg-orange-500/20" />
        </div>
      )}
    </div>
  );
}

