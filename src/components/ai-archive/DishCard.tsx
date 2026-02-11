"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MessageCircle, ArrowRight, Star, UtensilsCrossed, CakeSlice } from "lucide-react";

import { DishModel3D } from "@/components/dish/3d/DishModel3D";
import { cn } from "@/lib/utils";
import type { DishArchiveEntry } from "@/lib/ai-archive/types";

export const CATEGORY_CONFIG: Record<string, { label: string; color: string; Icon: React.ComponentType<{ className?: string }> }> = {
    signature: { label: "Signature", Icon: Star, color: "text-amber-400 bg-amber-400/10 ring-amber-400/30" },
    classic: { label: "Classic", Icon: UtensilsCrossed, color: "text-orange-400 bg-orange-400/10 ring-orange-400/30" },
    dessert: { label: "Dessert", Icon: CakeSlice, color: "text-pink-400 bg-pink-400/10 ring-pink-400/30" },
} as const;

interface DishCardProps {
    dish: DishArchiveEntry;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.06,
            type: "spring" as const,
            stiffness: 200,
            damping: 22,
        },
    }),
    exit: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        transition: { duration: 0.2 },
    },
};

export default function DishCard({ dish, index }: DishCardProps) {
    const category = CATEGORY_CONFIG[dish.category];

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
            className="group relative"
        >
            <Link
                href={`/ai-archive/${dish.slug}`}
                className="block"
            >
                {/* Card container */}
                <div
                    className={cn(
                        "relative overflow-hidden rounded-2xl",
                        "border border-orange-500/20 bg-slate-900/80 backdrop-blur-xl",
                        "transition-all duration-500",
                        "hover:border-orange-500/40 hover:shadow-[0_0_40px_rgba(251,146,60,0.12)]",
                        "hover:-translate-y-1"
                    )}
                >
                    {/* Glow effect on hover */}
                    <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-orange-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* 3D Model Preview */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900">
                        {/* Subtle grid pattern */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,146,60,0.06)_0%,_transparent_70%)]" />

                        <DishModel3D
                            modelPath={dish.model3D}
                            dishName={dish.nameEn}
                            dishNameZh={dish.nameZh}
                            interactive={false}
                        />

                        {/* Category badge - positioned over the model */}
                        <div className="absolute left-3 top-3 z-10">
                            <span
                                className={cn(
                                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1",
                                    "text-[10px] font-semibold uppercase tracking-wider",
                                    "ring-1 backdrop-blur-md",
                                    category.color
                                )}
                            >
                                <category.Icon className="h-3 w-3" />
                                {category.label}
                            </span>
                        </div>

                        {/* Bottom gradient fade */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/90 to-transparent" />
                    </div>

                    {/* Card Content */}
                    <div className="relative z-10 p-5">
                        {/* Bilingual Name */}
                        <div className="mb-2">
                            <h3 className="text-lg font-bold leading-tight text-white transition-colors duration-300 group-hover:text-orange-400">
                                {dish.nameZh}
                            </h3>
                            <p className="mt-0.5 text-sm font-medium text-slate-400">
                                {dish.nameEn}
                            </p>
                        </div>

                        {/* Brief description */}
                        <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-400">
                            {dish.brief}
                        </p>

                        {/* CTA */}
                        <div
                            className={cn(
                                "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider",
                                "text-orange-400 transition-all duration-300",
                                "group-hover:text-orange-300 group-hover:gap-3"
                            )}
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            Chat with AI
                            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
