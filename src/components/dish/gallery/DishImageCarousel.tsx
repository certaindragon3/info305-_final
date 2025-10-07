"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface DishImageCarouselProps {
  images: string[];
}

export function DishImageCarousel({ images }: DishImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  if (!images?.length) return null;

  const go = (delta: number) => {
    const len = images.length;
    setIndex((prev) => {
      const mod = (prev + delta) % len;
      return mod < 0 ? mod + len : mod;
    });
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-4 md:p-6 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_60%)]" />
      <div className="relative z-[1] flex items-center justify-between pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Field Photography</p>
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
      </div>
      <div className="relative z-[1]">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50">
          <Image src={images[index]} alt="Dish photo" fill sizes="100vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => go(-1)} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs text-white transition hover:border-orange-400 hover:text-orange-200">Prev</button>
          <div className="flex gap-1">
            {images.map((_, i) => (
              <span key={i} className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-orange-400' : 'bg-slate-700'} transition`} />
            ))}
          </div>
          <button onClick={() => go(1)} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs text-white transition hover:border-orange-400 hover:text-orange-200">Next</button>
        </div>
        <div className="mt-4 flex justify-center">
          <button onClick={() => setLightbox(true)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white transition hover:border-orange-400 hover:text-orange-200">
            View High‑Res
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 18 }} className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90">
              <div className="relative aspect-[16/10] w-full">
                <Image src={images[index]} alt="Dish photo large" fill sizes="100vw" className="object-contain" />
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <button onClick={() => go(-1)} className="rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 ring-1 ring-white/15 hover:text-white">Prev</button>
                <button onClick={() => go(1)} className="rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 ring-1 ring-white/15 hover:text-white">Next</button>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button onClick={() => setLightbox(false)} className="rounded-full bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 ring-1 ring-white/15 hover:text-white">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

