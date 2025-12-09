"use client";

import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";

export default function GlobalCanvas() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 30, // Ensure it sits above standard content but below modals/overlays
      }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]} // Limit DPR for mobile performance
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
