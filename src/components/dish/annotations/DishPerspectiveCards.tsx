"use client";

import { motion, AnimatePresence } from "motion/react";

export interface PerspectiveCardItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  direction: "left" | "right" | "up" | "down";
}

interface DishPerspectiveCardsProps {
  activeIndex: number; // 0..3
  items: PerspectiveCardItem[]; // length up to 4
}

const dirVariants: Record<PerspectiveCardItem["direction"], any> = {
  left: { initial: { x: -40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: 40, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  up: { initial: { y: -24, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  down: { initial: { y: 24, opacity: 0 }, animate: { y: 0, opacity: 1 } },
};

export function DishPerspectiveCards({ activeIndex, items }: DishPerspectiveCardsProps) {
  return (
    <div className="relative z-[1] grid gap-4">
      {items.map((item, idx) => {
        const visible = idx === activeIndex;
        const v = dirVariants[item.direction];
        return (
          <AnimatePresence key={item.id} mode="wait">
            {visible && (
              <motion.div initial={v.initial} animate={v.animate} exit={{ opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Perspective Note</p>
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
                </div>
                <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                {item.subtitle ? <p className="text-sm text-orange-400/80">{item.subtitle}</p> : null}
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </div>
  );
}

