"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Search, MessageCircle, ChefHat, ArrowRight, Star, UtensilsCrossed, CakeSlice } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { routeDishIntentClient } from "@/lib/ai-archive/worker-api";

import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { cn } from "@/lib/utils";
import { DISH_REGISTRY } from "@/lib/ai-archive/dish-registry";

// Curated suggested questions for the Home View
const HOME_SUGGESTIONS = [
    { question: "Why is it called Squirrel Fish?", dish: "Squirrel Mandarin Fish" },
    { question: "What's the secret sauce for Golden Soy Shrimp?", dish: "Golden Soy Sauce Shrimp" },
    { question: "What ratio of sugar to vinegar is used in the ribs?", dish: "Sweet and Sour Pork Ribs" },
    { question: "What are the 'Three Whites of Taihu'?", dish: "Scrambled Eggs with Whitebait" },
    { question: "Why is Assorted Delicacies a test of chef skill?", dish: "Assorted Delicacies" },
    { question: "What does 'wine lees' cooking mean?", dish: "Wine Lees Fish" },
];

// Staggered animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const pillVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
};

export default function ArchiveHomeView() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q");

    const [searchQuery, setSearchQuery] = useState(initialQuery || "");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analyzeStatus, setAnalyzeStatus] = useState("");
    const hasAutoTriggered = useRef(false);

    const handleSearch = useCallback(
        async (query: string) => {
            if (!query.trim()) return;

            setIsAnalyzing(true);
            setAnalyzeStatus("Analyzing your question...");

            try {
                const matches = await routeDishIntentClient(query.trim());

                if (matches && matches.length > 0) {
                    setAnalyzeStatus("Match found! Entering archive...");
                    setTimeout(() => {
                        // Even if multiple matches, default route them to the best match on View 2
                        // because we already showed the selection UI on View 1 if they came from the landing page.
                        router.push(`/ai-archive/${matches[0]}?q=${encodeURIComponent(query.trim())}`);
                        setTimeout(() => setIsAnalyzing(false), 500); // cleanup after push
                    }, 800);
                } else {
                    setAnalyzeStatus("No specific dish matched.");
                    setTimeout(() => {
                        setAnalyzeStatus("Opening full gallery instead...");
                        setTimeout(() => {
                            router.push(`/ai-archive/browse?q=${encodeURIComponent(query.trim())}`);
                            setTimeout(() => setIsAnalyzing(false), 500); // cleanup after push
                        }, 1200);
                    }, 1200);
                }
            } catch (error) {
                console.error("Routing error:", error);
                setAnalyzeStatus("Network error. Opening gallery...");
                setTimeout(() => {
                    router.push(`/ai-archive/browse?q=${encodeURIComponent(query.trim())}`);
                    setTimeout(() => setIsAnalyzing(false), 500); // cleanup after push
                }, 1200);
            }
        },
        [router]
    );

    const handleSuggestionClick = useCallback((question: string) => {
        setSearchQuery(question);
    }, []);

    useEffect(() => {
        if (initialQuery && !hasAutoTriggered.current) {
            hasAutoTriggered.current = true;
            handleSearch(initialQuery);
        }
    }, [initialQuery, handleSearch]);

    // Dish count by category for stats display
    const categoryStats = useMemo(() => {
        const stats = { signature: 0, classic: 0, dessert: 0 };
        DISH_REGISTRY.forEach((d) => stats[d.category]++);
        return stats;
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            {/* Analyzing Overlay (View 1.5) */}
            <AnimatePresence>
                {isAnalyzing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md"
                    >
                        <div className="flex flex-col items-center gap-6">
                            <Sparkles className="h-12 w-12 animate-pulse text-orange-400" />
                            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-widest">{analyzeStatus}</h2>
                            <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-800">
                                <motion.div
                                    className="h-full bg-orange-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient background effects */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,146,60,0.15),_transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(251,146,60,0.08),_transparent_40%)]" />

            <Spotlight
                className="left-1/2 top-[-5%] h-[80%] w-[100%] -translate-x-1/2 opacity-40"
                fill="rgba(249,115,22,0.3)"
            />

            {/* Decorative top line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

            {/* Main content */}
            <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24">
                {/* Back to Museum link */}
                <motion.div
                    className="absolute left-6 top-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Link
                        href="/#ai-archive"
                        className="group flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-orange-400"
                    >
                        <ArrowRight className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                        Back to Museum
                    </Link>
                </motion.div>

                {/* Eyebrow */}
                <motion.div
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                        AI Culinary Archive
                    </p>
                    <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                </motion.div>

                {/* Bilingual Hero */}
                <motion.div
                    className="mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                        <FlipWords
                            words={["今天你想吃什么？", "What would you like to eat?"]}
                            duration={4000}
                            className="text-orange-400 px-0"
                        />
                    </h1>
                </motion.div>

                <motion.p
                    className="mb-10 max-w-lg text-center text-base leading-relaxed text-slate-300 sm:text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Explore <span className="font-semibold text-orange-400">12 signature dishes</span> through
                    AI conversation. Ask anything about Suzhou cuisine.
                </motion.p>

                {/* Category stats */}
                <motion.div
                    className="mb-10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 sm:gap-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                >
                    {[
                        { label: "Signature", count: categoryStats.signature, Icon: Star },
                        { label: "Classic", count: categoryStats.classic, Icon: UtensilsCrossed },
                        { label: "Dessert", count: categoryStats.dessert, Icon: CakeSlice },
                    ].map((stat) => (
                        <span key={stat.label} className="flex items-center gap-1.5">
                            <stat.Icon className="h-3.5 w-3.5 text-orange-400" />
                            <span className="font-medium text-slate-300">{stat.count}</span>
                            <span>{stat.label}</span>
                        </span>
                    ))}
                </motion.div>

                {/* Search Input */}
                <motion.div
                    className="w-full max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="group relative">
                        {/* Glow effect on focus */}
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-orange-500/20 opacity-0 blur-lg transition-opacity duration-300 group-focus-within:opacity-100" />

                        <div className="relative flex items-center overflow-hidden rounded-2xl border border-orange-500/30 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 group-focus-within:border-orange-500/50 group-focus-within:shadow-[0_0_30px_rgba(251,146,60,0.15)]">
                            {/* AI Icon */}
                            <div className="flex items-center gap-2 pl-5 pr-2">
                                <MessageCircle className="h-5 w-5 text-orange-400" />
                            </div>

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                                placeholder="Ask AI anything about Suzhou cuisine..."
                                className="flex-1 bg-transparent py-4 pr-4 text-base text-white placeholder:text-slate-500 focus:outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => handleSearch(searchQuery)}
                                className={cn(
                                    "mr-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                                    searchQuery.trim()
                                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-400"
                                        : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:text-orange-300"
                                )}
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Suggested Questions */}
                <motion.div
                    className="mt-8 flex flex-col items-center gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span
                        className="flex items-center gap-2 text-sm text-slate-400"
                        variants={pillVariants}
                    >
                        <ChefHat className="h-4 w-4" />
                        Try asking:
                    </motion.span>

                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        {HOME_SUGGESTIONS.map((suggestion, index) => (
                            <motion.button
                                key={index}
                                type="button"
                                onClick={() => handleSuggestionClick(suggestion.question)}
                                variants={pillVariants}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className={cn(
                                    "group/pill relative rounded-full border border-orange-500/20 bg-slate-900/60 px-4 py-2",
                                    "text-xs font-medium text-slate-300",
                                    "transition-all duration-200",
                                    "hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-300",
                                    "hover:shadow-[0_0_20px_rgba(251,146,60,0.1)]"
                                )}
                            >
                                <span className="relative z-10">{suggestion.question}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link
                        href="/ai-archive/browse"
                        className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50"
                    >
                        <Sparkles className="h-4 w-4" />
                        View All 12 Dishes
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Bottom decorative grid stats */}
                <motion.div
                    className="mt-16 grid grid-cols-3 gap-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <div>
                        <p className="text-2xl font-bold text-orange-400">12</p>
                        <p className="mt-1 text-xs text-slate-400">Signature Dishes</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-orange-400">AI</p>
                        <p className="mt-1 text-xs text-slate-400">Powered Chat</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-orange-400">中英</p>
                        <p className="mt-1 text-xs text-slate-400">Bilingual</p>
                    </div>
                </motion.div>
            </div>

            {/* Bottom decorative line */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        </div>
    );
}
