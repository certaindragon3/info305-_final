"use client";

import { Suspense, useState, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Clouds, useGLTF, Float } from "@react-three/drei";
import { Sparkles, Search, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import * as THREE from "three";

import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { routeDishIntent } from "@/app/actions/routeDishIntent";
import { getDishBySlug } from "@/lib/ai-archive/dish-registry";
import DishCard from "@/components/ai-archive/DishCard";

// 3D Clay Pot Model
function ClayPotModel() {
    const { scene } = useGLTF("/models/ai-archive-props/clay-pot.glb");
    const ref = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            // Continuous slow rotation for interactivity
            ref.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group ref={ref} scale={2} position={[0, -1.5, 0]}>
                <primitive object={scene} />
                {/* Inner glow light */}
                <pointLight position={[0, 0.5, 0]} intensity={0.8} color="#ff9944" distance={3} />
            </group>
        </Float>
    );
}

// Bold atmospheric steam effect - covers entire section top
function AtmosphericSteam() {
    return (
        <Clouds material={THREE.MeshLambertMaterial} limit={200}>
            {/* Main central steam column - rising from pot */}
            <Cloud
                seed={42}
                segments={40}
                bounds={[8, 6, 3]}
                volume={8}
                color="#fff8f0"
                opacity={0.5}
                speed={0.15}
                growth={4}
                fade={18}
                position={[0, 2, 0]}
            />
            {/* Left atmospheric layer */}
            <Cloud
                seed={123}
                segments={35}
                bounds={[10, 4, 2]}
                volume={6}
                color="#ffeedd"
                opacity={0.35}
                speed={0.08}
                growth={3}
                fade={20}
                position={[-4, 1, -1]}
            />
            {/* Right atmospheric layer */}
            <Cloud
                seed={456}
                segments={35}
                bounds={[10, 4, 2]}
                volume={6}
                color="#ffeedd"
                opacity={0.35}
                speed={0.1}
                growth={3}
                fade={20}
                position={[4, 1.5, -1]}
            />
            {/* Top wispy layer - extends across */}
            <Cloud
                seed={789}
                segments={30}
                bounds={[16, 3, 2]}
                volume={5}
                color="#ffffff"
                opacity={0.25}
                speed={0.05}
                growth={2}
                fade={25}
                position={[0, 4, -2]}
            />
            {/* Dense base near pot */}
            <Cloud
                seed={21}
                segments={25}
                bounds={[5, 2, 1.5]}
                volume={4}
                color="#ffeecc"
                opacity={0.6}
                speed={0.2}
                growth={5}
                fade={12}
                position={[0, -0.5, 1]}
            />
            {/* Accent wisps - left */}
            <Cloud
                seed={333}
                segments={20}
                bounds={[6, 3, 1]}
                volume={3}
                color="#fff5e6"
                opacity={0.3}
                speed={0.12}
                growth={3}
                fade={15}
                position={[-6, 2.5, 0]}
            />
            {/* Accent wisps - right */}
            <Cloud
                seed={444}
                segments={20}
                bounds={[6, 3, 1]}
                volume={3}
                color="#fff5e6"
                opacity={0.3}
                speed={0.14}
                growth={3}
                fade={15}
                position={[6, 3, 0]}
            />
        </Clouds>
    );
}

// Suggested question pills - dish-specific questions
const SUGGESTED_QUESTIONS = [
    "What is the story behind Squirrel Fish?",
    "What makes Golden Soy Shrimp special?",
    "How to make the perfect Sweet & Sour Ribs?",
];

export default function AIArchiveSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analyzeStatus, setAnalyzeStatus] = useState("");
    const [multipleMatches, setMultipleMatches] = useState<string[] | null>(null);

    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) return;

        setIsAnalyzing(true);
        setAnalyzeStatus("Connecting to culinary archive...");

        try {
            const matches = await routeDishIntent(query.trim());

            if (matches && matches.length === 1) {
                setAnalyzeStatus("Match found! Entering archive...");
                setTimeout(() => {
                    window.location.href = `/ai-archive/${matches[0]}?q=${encodeURIComponent(query.trim())}`;
                }, 800);
            } else if (matches && matches.length > 1) {
                setAnalyzeStatus("Multiple dishes match your query.");
                setTimeout(() => {
                    setIsAnalyzing(false);
                    setMultipleMatches(matches);
                }, 800);
            } else {
                setAnalyzeStatus("No specific dish matched.");
                setTimeout(() => {
                    setAnalyzeStatus("Opening full gallery instead...");
                    setTimeout(() => {
                        window.location.href = `/ai-archive/browse?q=${encodeURIComponent(query.trim())}`;
                    }, 1200);
                }, 1200);
            }
        } catch (error) {
            console.error("Routing error:", error);
            setAnalyzeStatus("Network error. Opening gallery...");
            setTimeout(() => {
                window.location.href = `/ai-archive/browse?q=${encodeURIComponent(query.trim())}`;
            }, 1200);
        }
    }, []);

    const handleSuggestionClick = useCallback((question: string) => {
        setSearchQuery(question);
    }, []);

    return (
        <section
            id="ai-archive"
            className={cn(
                "relative overflow-hidden bg-slate-950 py-32 text-slate-100",
                "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
            )}
        >
            {/* Analyzing Overlay (View 1.5) */}
            {isAnalyzing && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">
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
                </div>
            )}

            {/* Multiple Match Selection Modal */}
            {multipleMatches && (
                <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 p-6 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-4xl rounded-3xl border border-orange-500/20 bg-slate-900/90 p-8 shadow-2xl"
                    >
                        <h2 className="mb-2 text-2xl font-bold text-white">Multiple Matches Found</h2>
                        <p className="mb-8 text-slate-400">Your query matches several of our signature dishes. Which one were you looking for?</p>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[60vh] overflow-y-auto pr-2 pb-4">
                            {multipleMatches.map((slug, index) => {
                                const dish = getDishBySlug(slug);
                                if (!dish) return null;
                                return (
                                    <DishCard
                                        key={slug}
                                        dish={dish}
                                        index={index}
                                        searchQuery={searchQuery}
                                    />
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setMultipleMatches(null)}
                            className="mt-8 text-sm text-slate-500 hover:text-white"
                        >
                            Cancel
                        </button>
                    </motion.div>
                </div>
            )}

            {/* Gradient backgrounds - removed bottom orange to prevent clash with steam */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,146,60,0.12),_transparent_50%)]" />

            <Spotlight
                className="left-1/2 top-[-5%] h-[80%] w-[100%] -translate-x-1/2 opacity-40"
                fill="rgba(249,115,22,0.3)"
            />

            {/* FULL-WIDTH ATMOSPHERIC STEAM CANVAS - Covers entire top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px]">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    className="!absolute inset-0"
                    style={{ background: "transparent" }}
                >
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[0, 5, 5]} intensity={0.6} color="#fff8f0" />
                    <Suspense fallback={null}>
                        <AtmosphericSteam />
                    </Suspense>
                </Canvas>

                {/* Extended smooth gradient blend - no harsh cutoff */}
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            {/* 3D Clay Pot - centered above content */}
            <div className="pointer-events-none absolute inset-x-0 top-[200px] flex h-[240px] items-center justify-center">
                <Canvas
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    className="!h-full !w-[300px]"
                    style={{ background: "transparent" }}
                >
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[2, 3, 5]} intensity={1} color="#fff5ee" />
                    <Suspense fallback={null}>
                        <ClayPotModel />
                    </Suspense>
                </Canvas>
            </div>

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 pb-8 pt-[340px] lg:px-8">

                {/* Section Header */}
                <motion.header
                    className="relative z-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Eyebrow with AI indicator - pill background for readability */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-slate-900/80 px-4 py-2 backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
                            AI-Powered Culinary Archive
                        </p>
                        <Sparkles className="h-3.5 w-3.5 text-orange-400" />
                    </div>

                    <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                        Archive of Flavors
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
                        <span className="font-semibold text-orange-400">Converse with AI</span> to uncover the stories,
                        techniques, and traditions behind Suzhou cuisine.
                    </p>
                </motion.header>

                {/* Search Input */}
                <motion.div
                    className="relative z-10 w-full max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
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
                                placeholder="Ask AI anything about Suzhou dishes..."
                                className="flex-1 bg-transparent py-4 pr-4 text-base text-white placeholder:text-slate-400 focus:outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => handleSearch(searchQuery)}
                                className="mr-2 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 transition-all duration-200 hover:bg-orange-500/30 hover:text-orange-300"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Suggested Questions */}
                <motion.div
                    className="relative z-10 flex flex-wrap items-center justify-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <span className="text-sm text-slate-400">Try asking:</span>
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(question)}
                            className="rounded-full border border-orange-500/20 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-300"
                        >
                            {question}
                        </button>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Link
                        href="/ai-archive"
                        className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/50"
                    >
                        <Sparkles className="h-4 w-4" />
                        Enter AI Archive
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Decorative divider */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
            </div>
        </section>
    );
}
