import { useGLTF } from '@react-three/drei';

// List of all dish models to preload
export const DISH_MODELS = [
  '/models/squirrel-fish.glb',
  '/models/lotus-stir-fry.glb',
  '/models/biluochun-shrimp.glb',
  '/models/hot-oil-eel.glb',
] as const;

// Scan models (larger, only preload when needed)
export const SCAN_MODELS = [
  '/models/squirrel-fish_scan.glb',
  '/models/lotus-stir-fry_scan.glb',
  '/models/biluochun-shrimp_scan.glb',
  // hot-oil-eel_scan.glb doesn't exist
] as const;

/**
 * Preload all primary dish 3D models for better performance
 * These are the AI-generated models (~4MB each)
 */
export function preloadDishModels() {
  DISH_MODELS.forEach((modelPath) => {
    useGLTF.preload(modelPath);
  });
}

/**
 * Preload a specific model by path
 */
export function preloadModel(modelPath: string) {
  useGLTF.preload(modelPath);
}

/**
 * Preload scan models (larger ~14MB, use sparingly)
 */
export function preloadScanModels() {
  SCAN_MODELS.forEach((modelPath) => {
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
  SCAN_MODELS.forEach((modelPath) => {
    useGLTF.clear(modelPath);
  });
}
