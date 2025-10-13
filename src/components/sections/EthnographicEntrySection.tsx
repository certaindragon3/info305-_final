"use client";

import { motion } from "motion/react";
import { Calendar, Clock, Camera, Users, FileText, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

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
                  The restaurant's street-level frontage on Fenghuang Street draws regulars rather than destination diners. Signage is plain, consonant with a value proposition the owner describes as <span className="font-semibold text-orange-400">"接地气"</span> (grounded)—affordability and freshness "as the first gate to guard."
                </p>

                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
                  <p className="mb-2 text-sm font-semibold text-orange-400">
                    Micro-geographies of Labor
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    The back-of-house comprises <strong>prep</strong> (初加工), a <strong>steam and stew bench</strong> (蒸板), a <strong>sauté line</strong> (梅炉/炒灶), and <strong>plating</strong> (打荷)—a division of labor the owner described as indispensable for complex dishes. These spatial zones shape activity sequences and directly conditioned where cameras and equipment could be placed without interrupting service.
                  </p>
                </div>

                {/* Floor Plan Placeholder */}
                <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-slate-800/50">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-orange-400" />
                      </div>
                      <p className="text-sm font-semibold text-slate-400">
                        Interactive Floor Plan
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Kitchen zones: 初加工 → 蒸板 → 梅炉 → 打荷
                      </p>
                    </div>
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

              {/* Video Segments Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {/* Segment 1: Knife Work */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/30">
                  <div className="relative aspect-video bg-slate-800/50">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-orange-400" />
                        <p className="mt-2 text-xs text-slate-400">Video Clip</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Knife Work: Lattice Precision
                    </p>
                    <p className="mb-3 text-xs text-slate-400">
                      Duration: 45s | 松鼠桂鱼
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      <strong>Tacit cues:</strong> Blade angle relative to fish spine, depth control to avoid membrane rupture, rhythmic tempo indicating muscle memory
                    </p>
                  </div>
                </div>

                {/* Segment 2: Oil Temperature */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/30">
                  <div className="relative aspect-video bg-slate-800/50">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-orange-400" />
                        <p className="mt-2 text-xs text-slate-400">Video Clip</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Oil Temperature: Bubble Tempo
                    </p>
                    <p className="mb-3 text-xs text-slate-400">
                      Duration: 30s | Deep-frying technique
                    </p>
                    <p className="text-xs leading-relaxed text-slate-500">
                      <strong>Tacit cues:</strong> Bubble size, tempo, oil shimmer patterns—decision criteria encoded in visual and auditory signals
                    </p>
                  </div>
                </div>

                {/* Segment 3: Sauce Finishing */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-800/30">
                  <div className="relative aspect-video bg-slate-800/50">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <FileText className="mx-auto h-8 w-8 text-orange-400" />
                        <p className="mt-2 text-xs text-slate-400">Video Clip</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2 text-sm font-semibold text-white">
                      Sauce Finishing: Glaze at Nappe
                    </p>
                    <p className="mb-3 text-xs text-slate-400">
                      Duration: 40s | 活卤 technique
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
                    "新鲜度是第一道门" (Freshness is the first gate to guard)
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
