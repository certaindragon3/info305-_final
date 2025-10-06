"use client";

import { PinContainer } from '@/components/ui/3d-pin';
import { DishModel3D } from '@/components/dish/DishModel3D';
import type { Dish } from '@/lib/types';
import { motion } from 'motion/react';

interface HorizontalDishScrollProps {
  dishes: Dish[];
}

export function HorizontalDishScroll({ dishes }: HorizontalDishScrollProps) {
  // Refined dish descriptions based on interview insights
  const dishInsights: Record<string, { tagline: string; essence: string }> = {
    'lotus-stir-fry': {
      tagline: 'Jiangnan Water Delicacy',
      essence: 'Eight treasures of aquatic harvest—crisp textures meet summer freshness'
    },
    'biluochun-shrimp': {
      tagline: 'Tea Meets River',
      essence: 'Velvety shrimp kissed by Biluochun fragrance—speed defines perfection'
    },
    'hot-oil-eel': {
      tagline: 'The Sizzling Finale',
      essence: 'Silky eel meets blazing scallion oil—a symphony of sound and taste'
    }
  };

  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 px-6 lg:px-8 max-w-7xl mx-auto py-12">
      {dishes.map((dish, index) => {
        const insight = dishInsights[dish.slug] || {
          tagline: dish.name,
          essence: dish.description
        };

        return (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.2
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <PinContainer
              title={dish.nameZh}
              href={`/dishes/${dish.slug}`}
              containerClassName="w-full"
            >
              <div className="flex w-full flex-col gap-4 p-4">
                {/* 3D Model Display */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <DishModel3D
                    modelPath={dish.media.model3D}
                    dishName={dish.name}
                    dishNameZh={dish.nameZh}
                  />
                </div>

                {/* Dish Info */}
                <div className="space-y-3">
                  {/* Tagline Badge */}
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">
                      {insight.tagline}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-orange-500/50 to-transparent" />
                  </div>

                  {/* Dish Names */}
                  <div className="text-center">
                    <h3 className="text-2xl font-extrabold text-white">
                      {dish.nameZh}
                    </h3>
                    <p className="mt-1 text-xs font-light tracking-wide text-orange-400/80">
                      {dish.name}
                    </p>
                  </div>

                  {/* Essence Description */}
                  <p className="text-center text-xs leading-relaxed text-slate-300">
                    {insight.essence}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 ring-1 ring-orange-500/30">
                      {dish.recipe.cookingTime}
                    </span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 ring-1 ring-white/10">
                      {dish.recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </PinContainer>
          </motion.div>
        );
      })}
    </div>
  );
}
