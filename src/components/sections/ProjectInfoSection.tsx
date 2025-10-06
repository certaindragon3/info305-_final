"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Camera,
  Mic,
  Video,
  Box,
  Users,
  MapPin,
  Clock,
  Database,
  Sparkles,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

export default function ProjectInfoSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-slate-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      {/* Gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(251,146,60,0.15),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.08),_transparent_50%)]" />

      {/* Content container */}
      <div className="relative z-[1] mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:px-8">
        {/* Section header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
            Project Context
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Fieldwork Methodology & Data Collection
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            A comprehensive ethnographic study documenting Subang cuisine
            heritage through multi-modal data collection at Acheng Restaurant
          </p>
        </header>

        {/* Mission Statement Card */}
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-slate-900/90 to-slate-900/90 p-10 backdrop-blur-xl shadow-2xl shadow-orange-500/10 md:p-12">
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative z-[1] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 ring-1 ring-orange-500/40">
                <Target className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Research Mission</h3>
            </div>
            <p className="text-lg leading-relaxed text-slate-200">
              This virtual museum preserves the labor-intensive traditional
              Subang cuisine techniques that are disappearing in modern
              fast-paced society. Acheng Restaurant, established in 1999,
              represents critical cultural heritage requiring digital
              preservation through academic documentation and immersive
              storytelling.
            </p>
          </div>
        </div>

        {/* Research Objectives */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            <h3 className="text-xl font-bold text-white">Research Objectives</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {objectives.map((objective, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/20 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:ring-orange-500/40">
                    {objective.icon}
                  </div>
                  <h4 className="font-semibold text-white">
                    {objective.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {objective.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fieldwork Execution */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            <h3 className="text-xl font-bold text-white">Fieldwork Execution</h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </span>
                </div>
                <p className="text-base text-slate-200">
                  Acheng Restaurant, Shiquan Street, Suzhou
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Duration
                  </span>
                </div>
                <p className="text-base text-slate-200">
                  4 hours (11:00 AM - 3:00 PM, Sept 21)
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Researcher
                  </span>
                </div>
                <p className="text-base text-slate-200">Solo ethnographic study</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Collection Methodology - Bento Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            <h3 className="text-xl font-bold text-white">
              Multi-Modal Data Collection
            </h3>
          </div>
          <BentoGrid className="md:auto-rows-[20rem]">
            {dataCollectionItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>

        {/* Technical Stack */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            <h3 className="text-xl font-bold text-white">Technical Stack</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/30 hover:bg-slate-900/80"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    {tech.category}
                  </span>
                  <p className="text-sm font-medium text-slate-200">
                    {tech.tools}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Context */}
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-10 backdrop-blur-sm md:p-12">
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="relative z-[1] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/30">
                <BookOpen className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Academic Framework</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Research Method
                </p>
                <p className="text-base leading-relaxed text-slate-300">
                  Semi-structured ethnographic interviews combined with
                  multi-modal documentation techniques
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Documentation Standards
                </p>
                <p className="text-base leading-relaxed text-slate-300">
                  Academic-quality content with authentic fieldwork quotes and
                  comprehensive cultural analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Achievement */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-6 py-3 ring-1 ring-orange-500/30">
            <Sparkles className="h-5 w-5 text-orange-400" />
            <p className="text-sm font-medium text-orange-400">
              Comprehensive heritage documentation achieved through 25-minute
              interview, 4 signature dishes with 3D models, and complete
              restaurant environment capture
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Research Objectives Data
const objectives = [
  {
    icon: <Users className="h-5 w-5 text-orange-400" />,
    title: "Generational Transfer",
    description:
      "Document father-to-son transmission and pre/post-renovation evolution",
  },
  {
    icon: <Database className="h-5 w-5 text-orange-400" />,
    title: "Multi-Modal Archives",
    description:
      "Build comprehensive archives with stories, recipes, techniques, and 3D models for 4-5 signature dishes",
  },
  {
    icon: <Lightbulb className="h-5 w-5 text-orange-400" />,
    title: "Cultural Insights",
    description:
      "Semi-structured interviews exploring ingredients, techniques, market pressures, and succession planning",
  },
];

// Data Collection Bento Grid Items
const dataCollectionItems = [
  {
    title: "High-Resolution Photography",
    description:
      "Sony A7R4 with 50mm f/1.2 lens, professional lighting studio setup (3-point lighting, 5000K color temp), 600-megapixel multi-angle captures for 4 signature dishes",
    header: (
      <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-slate-800/80">
        <Camera className="h-12 w-12 text-orange-400/60" />
      </div>
    ),
    icon: <Camera className="h-4 w-4 text-orange-400" />,
    className: "md:col-span-2",
  },
  {
    title: "3D Model Generation",
    description:
      "Dual-method approach: AI-generated GLB models (Tencent Hunyuan 3.0) and LiDAR scanning (iPhone Reality Composer) with multi-angle capture",
    header: (
      <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-slate-800/80">
        <Box className="h-12 w-12 text-orange-400/60" />
      </div>
    ),
    icon: <Box className="h-4 w-4 text-orange-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Video Documentation",
    description:
      "Complete cooking process recordings for each signature dish, street context footage, and dining atmosphere captures",
    header: (
      <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-slate-800/80">
        <Video className="h-12 w-12 text-orange-400/60" />
      </div>
    ),
    icon: <Video className="h-4 w-4 text-orange-400" />,
    className: "md:col-span-1",
  },
  {
    title: "Audio Interviews",
    description:
      "25-minute semi-structured interview with owner Shen Jiecheng, plus 30-second chef voice notes for each dish covering origin stories and technique essentials",
    header: (
      <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-slate-800/80">
        <Mic className="h-12 w-12 text-orange-400/60" />
      </div>
    ),
    icon: <Mic className="h-4 w-4 text-orange-400" />,
    className: "md:col-span-2",
  },
];

// Technical Stack Data
const techStack = [
  {
    category: "Frontend",
    tools: "Next.js 15, React 19, TypeScript",
  },
  {
    category: "3D Graphics",
    tools: "React Three Fiber, Three.js",
  },
  {
    category: "Styling",
    tools: "Tailwind CSS v4, shadcn/ui",
  },
  {
    category: "UI Components",
    tools: "Aceternity UI, Magic UI",
  },
  {
    category: "Photography",
    tools: "Sony A7R4, 50mm f/1.2",
  },
  {
    category: "3D Capture",
    tools: "iPhone LiDAR, Reality Composer",
  },
  {
    category: "AI Tools",
    tools: "Tencent Hunyuan 3.0",
  },
  {
    category: "Deployment",
    tools: "Static Generation",
  },
];
