"use client";

import { motion } from "motion/react";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { getSignatureDish, getRegularDishes } from '@/lib/data';
import { Spotlight } from '@/components/ui/spotlight';
import { HorizontalDishScroll } from '@/components/sections/HorizontalDishScroll';
import { DishModel3D } from '@/components/dish/3d/DishModel3D';
import { cn } from "@/lib/utils";

export function GallerySection() {
  const signatureDish = getSignatureDish();
  const regularDishes = getRegularDishes();

  return (
    <section
      id="gallery-exhibition"
      className={cn(
        "relative overflow-hidden bg-slate-950 py-24 text-slate-100",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
      )}
    >
      {/* Enhanced gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.15),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.1),_transparent_50%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 lg:px-8">
        {/* Section Header */}
        <header className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
            Culinary Heritage Exhibition
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Masterworks of Subang cuisine tradition
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Each dish represents decades of refinement, passed down through generations of master chefs dedicated to preserving authentic flavors and techniques.
          </p>
        </header>

        {/* Signature Exhibition */}
        <motion.div
          className="relative z-[2]"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Decorative spotlight effect */}
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="rgba(249,115,22,0.4)"
          />

          {/* Featured Exhibition Frame */}
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
            {/* Decorative corner elements */}
            <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-orange-400/15 blur-2xl" />

            {/* Exhibition Badge */}
            <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
                <span className="text-xs font-bold uppercase tracking-[0.45em] text-orange-400">
                  Signature Exhibition
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-400" />
              </div>
            </div>

            <div className="relative z-10 p-10 pt-20 md:p-16 md:pt-24">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                {/* Left: 3D Model Preview */}
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
                  <DishModel3D
                    modelPath={signatureDish.media.model3D}
                    dishName={signatureDish.name}
                    dishNameZh={signatureDish.nameZh}
                    interactive={false}
                  />
                  {/* Hover glow effect */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                </div>

                {/* Right: Dish Information */}
                <div className="space-y-8">
                  {/* Title */}
                  <div className="space-y-3">
                    <h3 className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                      {signatureDish.nameZh}
                    </h3>
                    <p className="text-xl font-light tracking-wide text-orange-400/90">
                      {signatureDish.name}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-orange-500/50 via-orange-500/20 to-transparent" />

                  {/* Description */}
                  <p className="text-base leading-relaxed text-slate-300">
                    The crown jewel of Subang cuisine—a masterpiece demanding extraordinary knife work, precise oil temperature control, and the perfect balance of sweet-sour flavors. Three critical techniques define this dish: intricate crosshatch scoring, controlled deep-frying for sculptural form, and a living sauce that harmonizes acidity and sweetness.
                  </p>

                  {/* Chef's Insight */}
                  <div className="rounded-xl border border-orange-500/20 bg-slate-900/50 p-5 backdrop-blur-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400/80">
                      Chef&apos;s Insight
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      &quot;This dish represents Subang cuisine&apos;s pinnacle achievement. The knife work, the oil technique, the sauce choreography—three pillars that transform fresh mandarin fish into a work of art with striking visual presence and exquisite flavor layers.&quot;
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-orange-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">
                      {signatureDish.recipe.cookingTime}
                    </span>
                    <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-300 ring-1 ring-white/10">
                      {signatureDish.recipe.difficulty} Difficulty
                    </span>
                    <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-300 ring-1 ring-white/10">
                      Heritage Technique
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/dishes/${signatureDish.slug}`}
                    className="group mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-orange-500/50 hover:scale-105"
                  >
                    Enter Exhibition
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Horizontal Scroll Section for Other Dishes */}
      <div className="relative z-[1] mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
              Additional Exhibitions
            </p>
            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              Scroll to explore more masterworks
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Swipe or scroll horizontally to discover three classic dishes
            </p>
          </div>
        </div>

        <HorizontalDishScroll dishes={regularDishes} />
      </div>
    </section>
  );
}
