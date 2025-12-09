"use client";

import { useEffect, useState } from 'react';
import { preloadDishModels, DISH_MODELS } from '@/lib/model-preloader';

/**
 * Preloads 3D models progressively after initial page render
 * Uses requestIdleCallback for non-blocking loading
 */
export function ModelPreloader() {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    const schedulePreload = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 2000 });
      } else {
        setTimeout(callback, 100);
      }
    };

    // Preload models one by one to avoid blocking
    let currentIndex = 0;

    const preloadNext = () => {
      if (currentIndex >= DISH_MODELS.length) return;
      
      const modelPath = DISH_MODELS[currentIndex];
      
      // Create a hidden image-like fetch to preload
      fetch(modelPath)
        .then(() => {
          setLoadedCount((prev) => prev + 1);
          currentIndex++;
          schedulePreload(preloadNext);
        })
        .catch(() => {
          // Still continue even if one fails
          currentIndex++;
          schedulePreload(preloadNext);
        });
    };

    // Start preloading after a short delay to prioritize critical content
    const timer = setTimeout(() => {
      preloadDishModels(); // drei's preload method
      schedulePreload(preloadNext);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Optional: Debug indicator (remove in production)
  if (process.env.NODE_ENV === 'development' && loadedCount > 0 && loadedCount < DISH_MODELS.length) {
    return (
      <div className="fixed bottom-2 right-2 z-50 rounded bg-black/50 px-2 py-1 text-[10px] text-white/50">
        3D: {loadedCount}/{DISH_MODELS.length}
      </div>
    );
  }

  return null;
}
