"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface DishImageCarouselProps {
  images: string[];
}

export function DishImageCarousel({ images }: DishImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  const len = images?.length || 0;

  // Preload adjacent images (prev and next)
  useEffect(() => {
    if (len <= 1) return;

    const toPreload: number[] = [
      (index + 1) % len,                         // next
      (index - 1 + len) % len,                   // prev
      (index + 2) % len,                         // next+1 for smoother experience
    ];

    toPreload.forEach((i) => {
      if (!loadedImages.has(i)) {
        const img = new window.Image();
        img.src = images[i];
        img.onload = () => {
          setLoadedImages((prev) => new Set(prev).add(i));
        };
      }
    });
  }, [index, len, images, loadedImages]);

  const go = useCallback((delta: number) => {
    setIndex((prev) => {
      const mod = (prev + delta) % len;
      return mod < 0 ? mod + len : mod;
    });
  }, [len]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [go]);

  if (!images?.length) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 md:p-6 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_60%)]" />
      <div className="relative z-[1] flex items-center justify-between pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Field Photography</p>
        <span className="text-xs text-slate-500">{index + 1} / {len}</span>
      </div>
      <div className="relative z-[1]">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50">
          {/* Current image with fade transition */}
          <Image 
            src={images[index]} 
            alt={`Dish photo ${index + 1}`} 
            fill 
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover transition-opacity duration-300"
            priority={index === 0}
          />
          {/* Loading indicator for unloaded images */}
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-400 border-t-transparent" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button 
            onClick={() => go(-1)} 
            aria-label="Previous image"
            className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs text-white transition hover:border-orange-400 hover:text-orange-200 active:scale-95"
          >
            Prev
          </button>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 w-6 rounded-full transition-all duration-200 ${
                  i === index 
                    ? 'bg-orange-400 scale-110' 
                    : 'bg-slate-700 hover:bg-slate-600'
                }`} 
              />
            ))}
          </div>
          <button 
            onClick={() => go(1)} 
            aria-label="Next image"
            className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs text-white transition hover:border-orange-400 hover:text-orange-200 active:scale-95"
          >
            Next
          </button>
        </div>
        {/* Keyboard hint */}
        <p className="mt-3 text-center text-[10px] text-slate-600">
          Use ← → arrow keys to navigate
        </p>
      </div>
    </section>
  );
}

