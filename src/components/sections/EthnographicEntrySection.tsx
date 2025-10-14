"use client";

import { motion } from "motion/react";
import { Calendar, Clock, Camera, Users, FileText, Shield, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function EthnographicEntrySection() {
  return (
    <section
      id="ethnographic-entry"
      className={cn(
        "relative overflow-hidden bg-slate-950 py-24 text-slate-100",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
      )}
    >
      {/* Gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.08),_transparent_50%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 lg:px-8">
        {/* Section Header */}
        <header className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
            Entering the Field
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            A Spatial and Temporal Ethnography
          </h2>
          <p className="mt-4 text-base text-slate-300">
            From street approach to kitchen choreography: documenting the micro-geographies of culinary labor at Acheng Fandian.
          </p>
        </header>

        {/* Spatial Entry */}
        <motion.div
          className="relative z-[2]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <div className="p-10 md:p-16">
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                    Part I: Spatial Context
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  From Street to Kitchen
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-base leading-relaxed text-slate-300">
                  The restaurant&apos;s street-level frontage on Fenghuang Street draws regulars rather than destination diners. Signage is plain, consonant with a value proposition the owner describes as <span className="font-semibold text-orange-400">&ldquo;接地气&rdquo;</span> (grounded)—affordability and freshness &ldquo;as the first gate to guard.&rdquo;
                </p>

                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
                  <p className="mb-2 text-sm font-semibold text-orange-400">
                    Micro-geographies of Labor
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    The back-of-house comprises <strong>prep</strong> (初加工), a <strong>steam and stew bench</strong> (蒸板), a <strong>sauté line</strong> (梅炉/炒灶), and <strong>plating</strong> (打荷)—a division of labor the owner described as indispensable for complex dishes. These spatial zones shape activity sequences and directly conditioned where cameras and equipment could be placed without interrupting service.
                  </p>
                </div>

                {/* Street View Video */}
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-slate-800/50">
                  <div className="relative h-full w-full">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/_H3U9LTUO6k?rel=0&showinfo=0&modestbranding=1"
                      title="Street Approach to Acheng Fandian"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
                    <p className="text-xs font-medium text-white">
                      Street approach to Acheng Fandian
                    </p>
                    <p className="text-xs text-slate-300">
                      Fenghuang Street, Subang
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Methodology Disclosure */}
        <motion.div
          className="relative z-[2]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <div className="p-10 md:p-16">
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                    Part II: Fieldwork Protocol
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Methodology Disclosure
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Session Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">Date</p>
                      <p className="text-sm text-slate-400">September 21, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">Duration</p>
                      <p className="text-sm text-slate-400">11:00–15:00 (4 hours)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">Participant</p>
                      <p className="text-sm text-slate-400">
                        Mr. Shen Jiecheng (owner-chef)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Methods */}
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-orange-400">
                      Data Collection Methods
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Participant observation (non-intrusive)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Semi-structured interview (25 minutes)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-400">•</span>
                        <span>High-resolution photography</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Short video clips (mise-en-place to plating)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-orange-400">•</span>
                        <span>Dual 3D capture (AI mesh + LiDAR USDZ)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ethics Statement */}
              <div className="mt-8 rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
                <div className="flex items-start gap-3">
                  <Shield className="mt-1 h-5 w-5 flex-shrink-0 text-orange-400" />
                  <div>
                    <p className="mb-2 text-sm font-semibold text-orange-400">
                      Ethics & Consent
                    </p>
                    <p className="text-sm leading-relaxed text-slate-300">
                      Written informed consent obtained. Staff and patron privacy protected. Owner granted pre-publication review rights. Audio recording and image capture limited to agreed windows outside peak service hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Constraints */}
              <div className="mt-6">
                <p className="mb-3 text-sm font-semibold text-orange-400">
                  Field Constraints
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  Narrow aisles, heat, and steam limited tripod placement and shot stability. Glossy surfaces and steam interference challenged LiDAR accuracy for certain dishes. These constraints disciplined the project toward precision—selecting vantage points that show consequential details rather than generic action.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Labor Ethnography */}
        <motion.div
          className="relative z-[2]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <div className="p-10 md:p-16">
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-400">
                    Part III: Craft Observation
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Craft, Rhythm, and Decision
                </h3>
              </div>

              <div className="mb-8 space-y-4">
                <p className="text-base leading-relaxed text-slate-300">
                  Decision criteria across dishes are encoded in visible and tactile signals: <strong>bubble size and tempo in oil</strong>, <strong>glaze viscosity at the moment of nappe</strong>, <strong>alignment and thickness of knife cuts</strong>, and <strong>fingertip tackiness tests</strong> that register surface starch development. The owner named these cues in the interview; we recorded them across footage in ways that can be referenced in the interface.
                </p>
              </div>

              {/* Craft Documentation Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {/* Documentation 1: Knife Work */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/30">
                  <div className="relative aspect-video bg-slate-800/50">
                    <img
                      src="/images/eth/Knife.png"
                      alt="Knife Work: Lattice Precision"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4">
                      <Camera className="h-4 w-4 text-white/80" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Knife Work: Lattice Precision
                    </p>
                    <p className="mb-3 text-xs text-slate-400">
                      Photo Documentation | 松鼠桂鱼 preparation
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      <strong>Tacit cues:</strong> Blade angle relative to fish spine, depth control to avoid membrane rupture, rhythmic tempo indicating muscle memory
                    </p>
                  </div>
                </div>

                {/* Documentation 2: Oil Temperature */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/30">
                  <div className="relative aspect-video bg-slate-800/50">
                    <img
                      src="/images/eth/Oil.png"
                      alt="Oil Temperature: Bubble Tempo"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4">
                      <Camera className="h-4 w-4 text-white/80" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Oil Temperature: Bubble Tempo
                    </p>
                    <p className="mb-3 text-xs text-slate-400">
                      Photo Documentation | Deep-frying technique
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      <strong>Tacit cues:</strong> Bubble size, tempo, oil shimmer patterns—decision criteria encoded in visual and auditory signals
                    </p>
                  </div>
                </div>

                {/* Documentation 3: Sauce Finishing */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/30">
                  <div className="relative aspect-video bg-slate-800/50">
                    <img
                      src="/images/eth/Sauce.png"
                      alt="Sauce Finishing: Glaze at Nappe"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 right-4">
                      <Camera className="h-4 w-4 text-white/80" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Sauce Finishing: Glaze at Nappe
                    </p>
                    <p className="mb-3 text-xs text-slate-400">
                      Photo Documentation | 活卤 technique
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      <strong>Tacit cues:</strong> Glaze viscosity and clarity at the moment of nappe—visual judgment of sweet-sour balance
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Control Framework */}
              <div className="mt-8 rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-transparent p-6">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-orange-400">
                    Quality as Craft Value
                  </p>
                  <blockquote className="border-l-2 border-orange-500 pl-4 text-base italic leading-relaxed text-slate-200">
                    &ldquo;新鲜度是第一道门&rdquo; (Freshness is the first gate to guard)
                  </blockquote>
                  <p className="text-sm leading-relaxed text-slate-300">
                    This operates as a <strong>craft value</strong> rather than a branding slogan. It structures daily routines: morning market sourcing, tactile assessment (look, smell, touch), and time-sensitive prep sequences. We treat this value as a curatorial principle—footage and 3D assets privilege material truth over excessive post-processing.
                  </p>
                  <p className="text-xs text-slate-500">
                    — Mr. Shen Jiecheng, Interview (Sept 21, 2025)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
