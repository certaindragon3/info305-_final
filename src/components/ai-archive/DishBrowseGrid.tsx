"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Filter, Star, UtensilsCrossed, CakeSlice, Utensils } from "lucide-react";
import Link from "next/link";

import { DISH_REGISTRY } from "@/lib/ai-archive/dish-registry";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import DishCard from "./DishCard";

type CategoryFilter = "all" | "signature" | "classic" | "dessert";

const FILTER_TABS: { key: CategoryFilter; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "all", label: "All Dishes", Icon: Utensils },
    { key: "signature", label: "Signature", Icon: Star },
    { key: "classic", label: "Classic", Icon: UtensilsCrossed },
    { key: "dessert", label: "Dessert", Icon: CakeSlice },
];

export default function DishBrowseGrid() {
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

    const filteredDishes = useMemo(() => {
        if (activeFilter === "all") return DISH_REGISTRY;
        return DISH_REGISTRY.filter((d) => d.category === activeFilter);
    }, [activeFilter]);

    const counts = useMemo(() => {
        const c = { all: DISH_REGISTRY.length, signature: 0, classic: 0, dessert: 0 };
        DISH_REGISTRY.forEach((d) => c[d.category]++);
        return c;
    }, []);

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100">
            {/* Ambient backgrounds */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,146,60,0.12),_transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(251,146,60,0.06),_transparent_40%)]" />

            <Spotlight
                className="left-1/2 top-[-5%] h-[60%] w-[80%] -translate-x-1/2 opacity-30"
                fill="rgba(249,115,22,0.25)"
            />

            {/* Top decorative line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
                {/* Navigation */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        href="/ai-archive"
                        className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-orange-400"
                    >
                        <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                        Back to Archive
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {/* Eyebrow */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                            Browse Collection
                        </p>
                        <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                    </div>

                    <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                        Explore Our Dishes
                    </h1>
                    <p className="mx-auto mt-3 max-w-lg text-base text-slate-300">
                        Select any dish to chat with AI and discover the stories, techniques, and flavors behind each creation.
                    </p>
                </motion.header>

                {/* Category Filter */}
                <motion.div
                    className="mb-10 flex flex-wrap items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Filter className="mr-1 h-4 w-4 text-slate-500" />
                    {FILTER_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveFilter(tab.key)}
                            className={cn(
                                "relative inline-flex items-center gap-1.5 rounded-full px-4 py-2",
                                "text-xs font-semibold uppercase tracking-wider",
                                "transition-all duration-300",
                                activeFilter === tab.key
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                                    : "border border-orange-500/20 bg-slate-900/60 text-slate-400 hover:border-orange-500/40 hover:text-slate-200"
                            )}
                        >
                            <tab.Icon className="h-3.5 w-3.5" />
                            {tab.label}
                            <span
                                className={cn(
                                    "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                                    activeFilter === tab.key
                                        ? "bg-white/20 text-white"
                                        : "bg-slate-800 text-slate-500"
                                )}
                            >
                                {counts[tab.key]}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Dish Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredDishes.map((dish, i) => (
                            <DishCard key={dish.slug} dish={dish} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state (shouldn't happen, but just in case) */}
                {filteredDishes.length === 0 && (
                    <motion.div
                        className="py-20 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-slate-400">No dishes found in this category.</p>
                    </motion.div>
                )}
            </div>

            {/* Bottom decorative line */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        </div>
    );
}
