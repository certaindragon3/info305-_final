"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Text3D } from '@react-three/drei';
import { Suspense } from 'react';

interface DishModel3DPlaceholderProps {
  dishName: string;
  dishNameZh: string;
}

function ModelContent({ dishName, dishNameZh }: { dishName: string; dishNameZh: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Center>
        <group>
          {/* Simple 3D mesh as placeholder */}
          <mesh>
            <boxGeometry args={[2, 0.5, 1.5]} />
            <meshStandardMaterial
              color="#fb923c"
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>

          {/* Decorative elements */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#fb923c"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      </Center>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export function DishModel3DPlaceholder({ dishName, dishNameZh }: DishModel3DPlaceholderProps) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="touch-none"
      >
        <Suspense fallback={null}>
          <ModelContent dishName={dishName} dishNameZh={dishNameZh} />
        </Suspense>
      </Canvas>
    </div>
  );
}
