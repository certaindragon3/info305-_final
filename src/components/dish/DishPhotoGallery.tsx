"use client";

import Image from "next/image";

interface DishPhotoGalleryProps {
  images: string[]; // absolute public paths (e.g. /images/Squirrel_Fish/1.JPG)
  title?: string;
}

export function DishPhotoGallery({ images, title = "Field Photography" }: DishPhotoGalleryProps) {
  if (!images?.length) return null;
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_60%)]" />
      <header className="relative z-[1] mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Photographic Record</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-sm text-slate-300">Selected images from field documentation. Hover to inspect details.</p>
      </header>
      <div className="relative z-[1] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((src, i) => (
          <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-slate-800/50">
            <Image src={src} alt="Dish photo" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}

