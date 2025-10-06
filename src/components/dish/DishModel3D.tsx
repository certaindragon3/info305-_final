"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { DishModel3DPlaceholder } from './DishModel3DPlaceholder';

interface DishModel3DProps {
  modelPath: string;
  dishName: string;
  dishNameZh: string;
}

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

function ModelContent({ modelPath }: { modelPath: string }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.2} />
      <spotLight position={[-10, -10, -10]} angle={0.3} penumbra={1} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />

      <Model modelPath={modelPath} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
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

export function DishModel3D({ modelPath, dishName, dishNameZh }: DishModel3DProps) {
  // If model path doesn't exist, show placeholder
  if (!modelPath || modelPath === '/models/placeholder.glb') {
    return <DishModel3DPlaceholder dishName={dishName} dishNameZh={dishNameZh} />;
  }

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        className="touch-none"
      >
        <Suspense fallback={null}>
          <ModelContent modelPath={modelPath} />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={<LoadingFallback />}>
          <div className="hidden" />
        </Suspense>
      </div>
    </div>
  );
}
