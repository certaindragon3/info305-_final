"use client";

import { LoaderThree } from "@/components/ui/loader";

interface SectionLoaderProps {
  text?: string;
  className?: string;
}

export function SectionLoader({
  text = "Loading...",
  className = ""
}: SectionLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-20 ${className}`}>
      <LoaderThree />
      <p className="text-sm font-medium uppercase tracking-wider text-orange-400">
        {text}
      </p>
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="relative overflow-hidden bg-slate-950 py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-16 space-y-4 text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded bg-slate-800" />
          <div className="mx-auto h-8 w-64 animate-pulse rounded bg-slate-800" />
          <div className="mx-auto h-4 w-96 animate-pulse rounded bg-slate-800" />
        </div>

        {/* Grid skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl bg-slate-900/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DishCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6">
      <div className="space-y-4">
        {/* Badge skeleton */}
        <div className="h-6 w-24 animate-pulse rounded-full bg-slate-800" />

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-3/4 animate-pulse rounded bg-slate-800" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-slate-800" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 w-full animate-pulse rounded-lg bg-slate-800" />
      </div>
    </div>
  );
}

export function Model3DSkeleton() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-900/50">
      <div className="flex flex-col items-center gap-4">
        <LoaderThree />
        <p className="text-sm font-medium uppercase tracking-wider text-orange-400">
          Loading 3D Model
        </p>
      </div>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,146,60,0.1),_transparent_70%)]" />
    </div>
  );
}
