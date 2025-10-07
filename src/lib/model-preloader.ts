import { useGLTF } from '@react-three/drei';

// List of all dish models to preload
const DISH_MODELS = [
  '/models/squirrel-fish.glb',
  '/models/lotus-stir-fry.glb',
  '/models/biluochun-shrimp.glb',
  '/models/hot-oil-eel.glb',
];

/**
 * Preload all dish 3D models for better performance
 * Call this function during app initialization
 */
export function preloadDishModels() {
  DISH_MODELS.forEach((modelPath) => {
    useGLTF.preload(modelPath);
  });
}

/**
 * Clear the GLB cache for a specific model
 */
export function clearModelCache(modelPath: string) {
  useGLTF.clear(modelPath);
}

/**
 * Clear all GLB caches
 */
export function clearAllModelCaches() {
  DISH_MODELS.forEach((modelPath) => {
    useGLTF.clear(modelPath);
  });
}
