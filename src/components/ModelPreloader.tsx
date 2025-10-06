"use client";

import { useEffect } from 'react';
import { preloadDishModels } from '@/lib/model-preloader';

export function ModelPreloader() {
  useEffect(() => {
    // Preload all dish models on mount
    preloadDishModels();
  }, []);

  return null;
}
