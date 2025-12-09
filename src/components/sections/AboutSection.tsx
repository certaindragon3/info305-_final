"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Store, Users, Heart, Sparkles, Paintbrush, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const timelineData = [
    {
      title: "1992",
      content: (
        <div className="group relative">
          {/* Decorative background glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/20 via-transparent to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative space-y-6">
            {/* Epic header with gradient */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl">
              <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 ring-1 ring-orange-500/40 shadow-lg shadow-orange-500/20">
                      <Sparkles className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        The Pioneer Era
                      </h3>
                      <p className="text-sm text-orange-400">When dreams took shape</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-orange-500/10 px-4 py-1 text-xs font-bold text-orange-400 ring-1 ring-orange-500/30">
                    CHAPTER I
                  </div>
                </div>

                {/* Story content with dramatic formatting */}
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-slate-200">
                    In an era when private restaurants were revolutionary...
                  </p>
                  <p className="leading-relaxed text-slate-300">
                    The first flames were lit in a modest kitchen. This wasn&apos;t just about cooking—it was about preserving a dying art. While state-owned restaurants dominated, one chef dared to dream of authentic Subang cuisine served with heart.
                  </p>

                  {/* Key highlight box */}
                  <div className="mt-6 flex items-start gap-4 rounded-xl border-l-4 border-orange-500 bg-slate-950/50 p-5">
                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20">
                      <span className="text-sm font-bold text-orange-400">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-orange-400">Historical Context</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        Private dining was rare and risky. This wasn&apos;t just business—it was cultural rebellion, preserving techniques that were fading into obscurity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "1999",
      content: (
        <div className="group relative">
          {/* Epic glow effect */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/30 via-orange-400/20 to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative space-y-6">
            <div className="overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
              <div className="p-8">
                {/* Dramatic header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/20 ring-1 ring-orange-500/50 shadow-xl shadow-orange-500/30">
                      <Store className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Birth of a Legend
                      </h3>
                      <p className="text-sm text-orange-400">The Acheng story begins</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-orange-500/20 px-4 py-1 text-xs font-bold text-orange-400 ring-1 ring-orange-500/40">
                    CHAPTER II
                  </div>
                </div>

                {/* Story-driven content */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-slate-200">
                      Fenghuang Street, 1999. A name is born.
                    </p>
                    <p className="leading-relaxed text-slate-300">
                      <span className="font-semibold text-orange-400">&quot;Acheng&quot;</span> — simple, honest, grounded. The founder chose his own given name, rejecting flashy marketing for something real. This wasn&apos;t a restaurant for the elite. This was for <span className="italic text-slate-200">the people</span>.
                    </p>
                  </div>

                  {/* Photo with dramatic reveal */}
                  <div className="group/image relative overflow-hidden rounded-xl ring-1 ring-white/10 transition-all duration-500 hover:ring-orange-500/50">
                    <Image
                      src="/images/aboutsection/old.webp"
                      alt="Acheng Restaurant original storefront in 1999"
                      width={800}
                      height={600}
                      className="w-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                      style={{ aspectRatio: "4/3" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
                    <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover/image:translate-y-0 group-hover/image:opacity-100">
                      <p className="text-sm font-semibold text-white">Where it all started</p>
                      <p className="text-xs text-slate-300">The original Fenghuang Street location</p>
                    </div>
                  </div>

                  {/* Philosophy as a manifesto */}
                  <div className="relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent p-6">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
                    <div className="relative space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-400 to-transparent" />
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                          The Founding Manifesto
                        </p>
                      </div>
                      <blockquote className="border-l-2 border-orange-500 pl-4 text-base italic leading-relaxed text-slate-200">
                        &quot;The name sounds ordinary, but the meaning is to be grounded and align with the mass consumption route—high cost-performance ratio, not expensive, but the ingredients are genuine and fresh.&quot;
                      </blockquote>
                      <p className="text-xs font-semibold text-orange-400">
                        — Shen Jiecheng, Founder
                      </p>
                    </div>
                  </div>

                  {/* Impact statement */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-slate-950/50 p-4 ring-1 ring-white/5">
                      <p className="mb-1 text-2xl font-bold text-orange-400">26+</p>
                      <p className="text-xs text-slate-400">Years of legacy building</p>
                    </div>
                    <div className="rounded-lg bg-slate-950/50 p-4 ring-1 ring-white/5">
                      <p className="mb-1 text-2xl font-bold text-orange-400">∞</p>
                      <p className="text-xs text-slate-400">Authentic dishes served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="group relative">
          {/* Vibrant glow for transformation */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/40 via-pink-500/20 to-purple-500/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative space-y-6">
            <div className="overflow-hidden rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-900/80 shadow-2xl shadow-orange-500/20 backdrop-blur-xl">
              <div className="p-8">
                {/* Bold transformation header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/40 to-pink-500/30 ring-1 ring-orange-500/60 shadow-xl shadow-orange-500/40">
                      <Paintbrush className="h-8 w-8 text-orange-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        The Bold Transformation
                      </h3>
                      <p className="text-sm text-orange-400">Evolution meets heritage</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-orange-500/20 px-4 py-1 text-xs font-bold text-orange-400 ring-1 ring-orange-500/40">
                    CHAPTER III
                  </div>
                </div>

                {/* Transformation narrative */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-slate-200">
                      25 years later. Time for a renaissance.
                    </p>
                    <p className="leading-relaxed text-slate-300">
                      The walls that held decades of memories were ready for rebirth. <span className="font-semibold text-orange-400">Bold colors</span>, <span className="font-semibold text-pink-400">modern aesthetics</span>, <span className="font-semibold text-purple-400">youthful energy</span>—but the soul? That stays eternal.
                    </p>
                  </div>

                  {/* Before/After concept box */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Heritage</p>
                      <p className="text-sm text-slate-300">Traditional craftsmanship, authentic recipes, cultural roots</p>
                    </div>
                    <div className="rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-400">Innovation</p>
                      <p className="text-sm text-slate-300">Contemporary design, youth appeal, Instagram-worthy aesthetics</p>
                    </div>
                  </div>

                  {/* Video showcase with cinematic frame */}
                  <div className="group/video relative overflow-hidden rounded-xl bg-black ring-2 ring-orange-500/30 transition-all duration-500 hover:ring-orange-500/60">
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">Watch Transformation</span>
                    </div>
                    <video
                      className="w-full transition-transform duration-700 group-hover/video:scale-105"
                      controls
                      loop
                      muted
                      preload="metadata"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <source src="/videos/renovation.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Impact metrics */}
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-gradient-to-br from-orange-500/10 to-transparent p-4 ring-1 ring-orange-500/20">
                      <p className="mb-1 text-2xl font-bold text-orange-400">100%</p>
                      <p className="text-xs text-slate-400">Exterior renewed</p>
                    </div>
                    <div className="rounded-lg bg-gradient-to-br from-pink-500/10 to-transparent p-4 ring-1 ring-pink-500/20">
                      <p className="mb-1 text-2xl font-bold text-pink-400">Gen Z</p>
                      <p className="text-xs text-slate-400">New audience reached</p>
                    </div>
                    <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-transparent p-4 ring-1 ring-purple-500/20">
                      <p className="mb-1 text-2xl font-bold text-purple-400">0%</p>
                      <p className="text-xs text-slate-400">Soul compromised</p>
                    </div>
                  </div>

                  {/* Source with style */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/30">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400">Video Source</p>
                        <a
                          href="http://xhslink.com/o/4ihKxCnyPAZ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-slate-300 transition-colors hover:text-orange-400"
                        >
                          Xiaohongshu
                        </a>
                      </div>
                    </div>
                    <svg className="h-5 w-5 text-slate-500 transition-colors hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="group relative">
          {/* Golden glow for the present */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/30 via-yellow-500/20 to-orange-500/30 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative space-y-6">
            <div className="overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
              <div className="p-8">
                {/* Present moment header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/30 to-orange-600/20 ring-1 ring-orange-500/50 shadow-xl shadow-orange-500/30">
                      <Heart className="h-8 w-8 text-orange-400" />
                      <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-orange-400 ring-2 ring-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        The Living Legacy
                      </h3>
                      <p className="text-sm text-orange-400">Today and tomorrow</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-1 ring-1 ring-orange-500/40">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
                    <span className="text-xs font-bold text-orange-400">NOW</span>
                  </div>
                </div>

                {/* Present day narrative */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-slate-200">
                      2025. The story continues—stronger than ever.
                    </p>
                    <p className="leading-relaxed text-slate-300">
                      Three decades of evolution. A new facade that turns heads. But step inside? The same <span className="font-semibold text-orange-400">unwavering commitment</span> to craft, the same <span className="font-semibold text-orange-400">obsession with freshness</span>, the same <span className="font-semibold text-orange-400">handmade soul</span> that started it all.
                    </p>
                  </div>

                  {/* Renovated Storefront Photo */}
                  <div className="group/image relative overflow-hidden rounded-xl ring-1 ring-white/10 transition-all duration-500 hover:ring-orange-500/50">
                    <Image
                      src="/images/aboutsection/renovated.webp"
                      alt="Acheng Restaurant after 2024 renovation"
                      width={800}
                      height={600}
                      className="w-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                      style={{ aspectRatio: "4/3" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/image:opacity-100" />
                    <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition-all duration-500 group-hover/image:translate-y-0 group-hover/image:opacity-100">
                      <p className="text-sm font-semibold text-white">The transformed storefront</p>
                      <p className="text-xs text-slate-300">Bold colors, modern design, timeless soul</p>
                    </div>
                  </div>

                  {/* Core principles showcase */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Principle 1 */}
                    <div className="group/card relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-6 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10">
                      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition-all duration-500 group-hover/card:bg-orange-500/20" />
                      <div className="relative">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-500/30">
                            <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-orange-400">9PM → 9AM</h4>
                        </div>
                        <p className="text-sm font-semibold text-slate-200">Daily Fresh Supply Chain</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          Orders placed at night, delivered at dawn. Every ingredient arrives fresh, ready for the day&apos;s magic.
                        </p>
                      </div>
                    </div>

                    {/* Principle 2 */}
                    <div className="group/card relative overflow-hidden rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-6 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10">
                      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition-all duration-500 group-hover/card:bg-orange-500/20" />
                      <div className="relative">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-500/30">
                            <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-orange-400">0% Pre-made</h4>
                        </div>
                        <p className="text-sm font-semibold text-slate-200">100% From Scratch</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          No shortcuts. No frozen meals. No compromises. Every dish crafted by hand, the traditional way.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Health-conscious evolution */}
                  <div className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-400 to-transparent" />
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                        Modern Adaptation
                      </p>
                    </div>
                    <p className="leading-relaxed text-slate-300">
                      Tradition doesn&apos;t mean stubborn. We&apos;ve adapted: <span className="font-semibold text-slate-200">less oil, less sugar, less salt</span>—responding to modern health consciousness without sacrificing the essence of Subang cuisine.
                    </p>
                  </div>

                  {/* Future vision */}
                  <div className="relative overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-transparent p-6">
                    <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-orange-500/20 blur-3xl" />
                    <div className="relative space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">The Question Ahead</p>
                      <p className="text-base italic leading-relaxed text-slate-200">
                        &quot;As society evolves and people change, who will carry the torch? Family succession? A trusted apprentice? The future is uncertain—but the mission is crystal clear: these techniques must survive.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const philosophyCards = [
    {
      icon: Users,
      title: "Accessibility to All",
      image: "/images/aboutsection/accessibility.webp",
      description:
        "Positioned as a restaurant for ordinary people with affordable pricing and high cost-performance ratio, ensuring quality Subang cuisine is accessible to everyone.",
      quote:
        "It can attract more diners to visit and consume - this is the main business philosophy.",
      philosophySlug: "grounded-approach",
    },
    {
      icon: Sparkles,
      title: "Freshness First",
      image: "/images/aboutsection/freshness.webp",
      description:
        "The degree of freshness is the primary quality control checkpoint. Experienced chefs employ the traditional method: look, smell, and touch to ensure ingredient quality.",
      quote:
        "For Subang cuisine, the main ingredients must be very fresh. If the main ingredient is not fresh, the dish fails.",
      philosophySlug: "seasonal-sourcing",
    },
    {
      icon: Heart,
      title: "Craftsmanship Heritage",
      image: "/images/aboutsection/craftsmanship.webp",
      description:
        "From chef to business owner, the founder maintains the tradition of handcrafted dishes, refusing to adopt pre-made ingredients despite industry trends.",
      quote:
        "For Subang cuisine, following the traditional approach yields better results.",
      philosophySlug: "sincerity-craft",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.1),_transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Philosophy Cards Section */}
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
            Restaurant Heritage
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            About Acheng Restaurant
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            A 26-year journey of preserving Subang cuisine heritage while
            serving the local community with authentic, handcrafted dishes
          </p>
        </motion.header>

        {/* Founder Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-6 py-3 ring-1 ring-orange-500/30">
              <div className="h-2 w-2 rounded-full bg-orange-400" />
              <p className="text-sm font-semibold text-slate-200">
                Founder&apos;s 3 Business Philosophy
              </p>
              <div className="h-px w-8 bg-gradient-to-r from-orange-400 to-transparent" />
              <p className="text-sm font-bold text-orange-400">
                Shen Jiecheng (沈洁成)
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {philosophyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <DirectionAwareHover
                  imageUrl={card.image}
                  className="h-[400px] w-full rounded-2xl"
                  imageClassName="object-cover"
                  childrenClassName="w-full p-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 backdrop-blur-sm ring-1 ring-orange-500/40">
                        <Icon className="h-5 w-5 text-orange-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-200">
                      {card.description}
                    </p>

                    <div className="rounded-lg bg-black/30 p-3 backdrop-blur-sm">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-400">
                        Chef&apos;s Philosophy
                      </p>
                      <blockquote className="border-l-2 border-orange-500/50 pl-2 text-xs italic leading-relaxed text-slate-300">
                        &quot;{card.quote}&quot;
                      </blockquote>
                    </div>

                    <Link
                      href={`/philosophy/${card.philosophySlug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-semibold text-orange-400 ring-1 ring-orange-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/50"
                    >
                      <span>Explore Philosophy</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </DirectionAwareHover>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Timeline Header Badge */}
        <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 pt-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-2 max-w-2xl text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-6 py-3 ring-1 ring-orange-500/30">
              <div className="h-2 w-2 rounded-full bg-orange-400" />
              <p className="text-sm font-semibold text-slate-200">
                Restaurant Evolution Timeline
              </p>
              <div className="h-px w-8 bg-gradient-to-r from-orange-400 to-transparent" />
              <p className="text-sm font-bold text-orange-400">
                Heritage Journey
              </p>
            </div>
          </motion.div>
        </div>

        {/* Custom styling override for timeline */}
        <style jsx global>{`
          .timeline-section .dark\:bg-neutral-950 {
            background: transparent !important;
          }
          .timeline-section .dark\:text-white {
            color: rgb(248 250 252) !important;
          }
          .timeline-section .dark\:text-neutral-300 {
            color: rgb(203 213 225) !important;
          }
          .timeline-section .dark\:text-neutral-500 {
            color: rgb(251 146 60) !important;
            font-weight: 800 !important;
          }
          .timeline-section .dark\:bg-black {
            background: rgb(15 23 42) !important;
          }
          .timeline-section .dark\:bg-neutral-800 {
            background: rgb(30 41 59) !important;
          }
          .timeline-section .dark\:border-neutral-700 {
            border-color: rgba(251, 146, 60, 0.3) !important;
          }
          .timeline-section .dark\:via-neutral-700 {
            --tw-gradient-to: rgb(251 146 60 / 0.5) var(--tw-gradient-to-position) !important;
            --tw-gradient-stops: var(--tw-gradient-from),
              rgb(251 146 60 / 0.3) var(--tw-gradient-via-position),
              var(--tw-gradient-to) !important;
          }
        `}</style>

        <div className="timeline-section dark">
          <Timeline data={timelineData} />
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 pb-24 lg:px-8">
        {/* Research Context & Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl"
        >
          <div className="p-10 md:p-16">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                Research Context
              </p>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Methodology & Limitations
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-semibold text-orange-400">Fieldwork Scope</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  This documentation is based on a four-hour fieldwork session (September 21, 2025, 11:00–15:00) combining participant observation, photography, video capture, and a semi-structured interview with owner-chef Mr. Shen Jiecheng. A dual 3D capture pipeline (AI-assisted mesh + LiDAR USDZ scans) was employed for dish models.
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-orange-400">Limitations</p>
                <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-orange-400">•</span>
                    <span><strong>Temporal snapshot:</strong> Single-day observation captures routines but not seasonal or long-term variations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-400">•</span>
                    <span><strong>Equipment constraints:</strong> Narrow aisles, heat, and steam limited camera placement and LiDAR stability for glossy dishes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-400">•</span>
                    <span><strong>Community voice:</strong> Planned patron interviews could not be executed; Dianping reviews supplement but do not replace direct testimony</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-orange-400">•</span>
                    <span><strong>Perspective:</strong> Documentation reflects owner-chef&apos;s managerial and didactic frames; head chef&apos;s preference for privacy shifted narrative balance</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-orange-400">Future Work</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Next phase: full-day documentary from supply intake through closing, community interviews across age cohorts, improved 3D fidelity with controlled lighting, and institutional repository deposit for long-term access.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="h-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-slate-900/80 to-slate-900/80 backdrop-blur-xl"
        >
          <div className="p-10 md:p-16">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                  Location
                </p>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Visit Acheng Restaurant
                </h3>
              </div>
              <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-orange-500/20 ring-1 ring-orange-500/40 sm:flex">
                <Store className="h-8 w-8 text-orange-400" />
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm font-medium text-orange-400">
                    Address
                  </p>
                  <p className="text-base text-slate-300">
                    66 Fenghuang Street, Suzhou, Jiangsu Province
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-orange-400">
                    Established
                  </p>
                  <p className="text-base text-slate-300">1999</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/50 p-6">
                <p className="mb-3 text-sm font-semibold text-orange-400">
                  Cultural Legacy
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  As society evolves and people change, the question of
                  heritage continuation remains. Whether through family
                  succession or trusted representatives, the goal is to ensure
                  these culinary techniques continue for future generations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
