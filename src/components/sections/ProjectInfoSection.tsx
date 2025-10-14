"use client";

import { GridBeams } from "@/components/ui/grid-beams";
import { cn } from "@/lib/utils";

export default function ProjectInfoSection() {
  return (
    <section id="project" className="relative overflow-hidden bg-slate-950 py-24 text-slate-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <GridBeams
        className="absolute inset-0"
        gridSize={48}
        gridColor="rgba(251,146,60,0.15)"
        rayCount={10}
        rayOpacity={0.28}
        rayLength="55vh"
        backgroundColor="#0b1220"
      >
        <></>
      </GridBeams>

      <div className="relative z-[1] mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 lg:px-8">
        {/* Header */}
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
            Project Manifesto
          </p>
          <h2 className="mt-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            A Research Atlas of Subang Cuisine
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            An immersive, multi-modal documentation of Acheng Restaurant: four dishes, one shop, one community—preserved through photography, video, audio, 3D models, and structured data.
          </p>
        </header>

        {/* Big Metrics Ledger */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((m) => (
            <MetricTile key={m.label} value={m.value} label={m.label} note={m.note} />
          ))}
        </section>

        {/* Methods Vitrine (horizontal, image-friendly) */}
        <section>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            <h3 className="text-xl font-bold text-white">Field Methods — Modular Vitrine</h3>
          </div>

          <div className="mt-6 overflow-x-auto pb-4">
            <div className="flex snap-x snap-mandatory gap-6">
              {methods.map((m) => (
                <MethodCard key={m.title} {...m} />
              ))}
            </div>
          </div>
        </section>

        {/* Scrollytelling: From Consent to Archive */}
        <section className="grid gap-10 md:grid-cols-[1.1fr_1.5fr]">
          <div className="sticky top-24 h-fit self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Workflow
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              From Consent to Archive
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A two-hour field pattern extended to a four-hour solo session (Sept 21, 11:00–15:00). Each step produces verifiable, linked materials that feed dish pages and the 3D gallery.
            </p>
          </div>

          <div className="space-y-4">
            {workflow.map((w, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="relative z-[1] flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
                      Step {String(i + 1).padStart(2, "0")}
                    </div>
                    <h4 className="mt-2 text-lg font-semibold text-white">{w.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.desc}</p>
                  </div>
                  <div className="hidden min-w-[220px] shrink-0 md:block">
                    <ImageSlot hint={w.hint} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interview Clip (single video) */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            <h3 className="text-xl font-bold text-white">Interview Clip</h3>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Owner interview excerpt documenting heritage, technique, and preservation mindset.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/AAY6KJFXwgY?rel=0&showinfo=0&modestbranding=1"
                title="Owner Interview: Heritage and Technique at Acheng Fandian"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Interview with Mr. Shen Jiecheng discussing culinary heritage and preservation philosophy.
          </p>
        </section>

        {/* Data Schema (concise) */}
        <section className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-8 md:p-12">
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="relative z-[1] grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
                Data Schema
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Metadata for Dishes & Media</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Unified naming and metadata enable cross-linking between photos, videos, audio notes, and 3D models. This powers the dish detail pages and search.
              </p>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/70 p-5 text-[12.5px] leading-relaxed text-slate-300">
{`date_place_object_type_index
2025-09-21_阿成_松鼠桂鱼_视频_01.mp4

Fields (CSV/JSON):
- dish_zh, dish_en, alt_names
- story_summary (≈200 chars)
- ingredients (with weights/ratios)
- technique_tags (e.g., 上浆, 走油, 收汁)
- vessels_tools
- timing_heat (判据: 声/色/闻)
- season_festival
- cost_time_constraints
- audio_path, video_path, model_path
- rights_consent_id, review_status
- capture_date, location, photographer`}
            </pre>
          </div>
        </section>

        {/* 3D Model Practical Notes */}
        <section className="grid gap-6 md:grid-cols-2">
          <ProcedureCard
            title="SfM Photogrammetry"
            bullets={[
              "Route: outer ring → 45° top → top-down; ≥60% overlap",
              "Lock exposure/WB/focus; softbox or umbrella lighting",
              "Add CPL/cross polarization to kill grease reflections",
              "Place scale (checkerboard/10cm ruler) for real-world size",
              "Fragile/hot: stabilize temperature, then capture quickly",
            ]}
          />
          <ProcedureCard
            title="NeRF / Gaussian Splatting (30–60s video)"
            bullets={[
              "Steady orbit video at 30/60fps; lock exposure/focus",
              "Path: outer → 45° → top; avoid self reflection",
              "Export → clean floaters, decimate, bake textures",
              "Deliver glTF/GLB with 2–4 annotated hotspots",
              "Surface glare: prefer polarized soft light, minimal steam",
            ]}
          />
        </section>

        {/* Technology Strip (textual, no icons) */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techText.map((t) => (
              <div
                key={t.category}
                className="rounded-xl border border-white/10 bg-slate-900/60 p-5 transition-all duration-300 hover:border-orange-500/30 hover:bg-slate-900/80"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
                  {t.category}
                </div>
                <div className="mt-2 text-sm font-medium text-slate-200">{t.tools}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Framework */}
        <section className="grid gap-10 md:grid-cols-[1.1fr_1.5fr]">
          <div className="sticky top-24 h-fit self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Theoretical Framework
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Academic Significance
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              This project bridges interactive heritage discourse and human–food digital narration, positioning neighborhood restaurants as stewards of cultural memory and tacit knowledge.
            </p>
          </div>

          <div className="space-y-4">
            {academicFramework.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="relative z-[1]">
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
                    {item.category}
                  </div>
                  <h4 className="mt-2 text-lg font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  {item.citation && (
                    <div className="mt-4 rounded-lg border border-white/10 bg-slate-900/50 p-3">
                      <p className="text-xs leading-relaxed text-slate-500">{item.citation}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function MetricTile({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-slate-900/90 to-slate-900/90 p-6 shadow-2xl shadow-orange-500/10">
      <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative z-[1]">
        <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{value}</div>
        <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">{label}</div>
        {note ? <p className="mt-2 text-xs text-slate-400">{note}</p> : null}
      </div>
    </div>
  );
}

function MethodCard({
  title,
  lines,
  slotLabel,
}: {
  title: string;
  lines: string[];
  slotLabel: string;
}) {
  return (
    <div className="snap-center min-w-[280px] max-w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-sm">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-orange-500/5 to-slate-900/60">
        <ImageSlot hint={slotLabel} tall={false} />
      </div>
      <h4 className="mt-4 text-base font-semibold text-white">{title}</h4>
      <ul className="mt-2 space-y-1">
        {lines.map((l, i) => (
          <li key={i} className="text-xs leading-relaxed text-slate-400">{l}</li>
        ))}
      </ul>
    </div>
  );
}

function ImageSlot({ hint, tall = true }: { hint: string; tall?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl border border-dashed border-orange-500/30 text-center",
        tall ? "h-36" : "h-full min-h-40",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.15),_transparent_60%)]" />
      <div className="relative z-[1] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">Image Placeholder</p>
        <p className="mt-1 text-xs text-slate-400">{hint}</p>
      </div>
    </div>
  );
}

function ProcedureCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-all duration-300 hover:border-orange-500/30">
      <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative z-[1]">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <ul className="mt-3 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="text-sm leading-relaxed text-slate-300">• {b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const metrics = [
  { value: "4", label: "Signature Dishes", note: "松鼠桂鱼 · 荷塘小炒 · 响油鳝糊 · 碧螺虾仁" },
  { value: "600MP", label: "Photo Capture", note: "Multi-angle studio images with 5000K lighting" },
  { value: "4 h", label: "Field Session", note: "Sept 21, 11:00–15:00 (solo)" },
  { value: "25 min", label: "Interview", note: "Owner interview + chef voice notes" },
];

const methods = [
  {
    title: "Photography Setup",
    slotLabel: "Add dish close-ups / plating stage",
    lines: [
      "A7R4 + 50mm f/1.2; 3-point soft light at 5000K",
      "Consistent angles per dish for cross-comparison",
      "Use CPL / cross polarization to reduce glare",
    ],
  },
  {
    title: "3D Capture (GLB)",
    slotLabel: "Add scan screenshot / mesh preview",
    lines: [
      "Dual path: AI GLB + iPhone LiDAR GLB",
      "3 rings: outer → 45° → top; keep overlap",
      "鳝糊: heavy glare; used AI model only",
    ],
  },
  {
    title: "Video & Atmosphere",
    slotLabel: "Add kitchen still / street view",
    lines: [
      "Street exterior & dining ambience clips",
      "Process segments: 配料→上浆→走油→收汁→装盘",
      "60fps for action; mix to 24fps in edit",
    ],
  },
  {
    title: "Audio Notes",
    slotLabel: "Add waveform / recording moment",
    lines: [
      "30–60s chef notes per dish: origin + 判据",
      "Clip-on lav; 10s room tone per location",
      "Oral markers for scene changes",
    ],
  },
];

const workflow = [
  {
    title: "Consent & Orientation",
    desc: "Trusted access via concise consent form; align goals and privacy (renovation, recipes, visibility levels).",
    hint: "Insert photo of signed consent / briefing scene",
  },
  {
    title: "Space & Ambience",
    desc: "Exterior street context → dining room ambience; establish environmental baseline for narrative continuity.",
    hint: "Insert exterior or interior ambience still",
  },
  {
    title: "Dish Capture",
    desc: "Four dishes documented with studio photos, process videos, and 3D capture. Maintain angle and lighting consistency.",
    hint: "Insert plated dish hero shot",
  },
  {
    title: "Interview & Voice Notes",
    desc: "25-minute semi-structured owner interview + 30s chef voice cards (what’s hard, how to judge ‘到位’).",
    hint: "Insert interview still / waveform",
  },
  {
    title: "Data & Naming",
    desc: "3-2-1 backups; unified filenames and metadata table link media to dish pages and 3D exhibits.",
    hint: "Insert screenshot of your metadata sheet",
  },
];

const techText = [
  { category: "Frontend", tools: "Next.js 15 · React 19 · TypeScript" },
  { category: "3D", tools: "React Three Fiber · Three.js" },
  { category: "Styling", tools: "Tailwind CSS v4 · shadcn/ui" },
  { category: "UI", tools: "Aceternity UI · Magic UI" },
  { category: "Capture", tools: "Sony A7R4 · 50mm f/1.2" },
  { category: "3D Capture", tools: "iPhone LiDAR · Reality Composer" },
  { category: "Models", tools: "GLB (AI + LiDAR)" },
  { category: "Build", tools: "Static Generation" },
];

const academicFramework = [
  {
    category: "Embodied Interaction",
    title: "Hand-Based Manipulation as Cultural Learning",
    description:
      "Interactive digital narration enables visitors to engage with culinary heritage through embodied attention and exploratory manipulation. By inviting the viewer's hand through 3D rotation and zoom, we evoke a mode of learning that recalls studio pedagogy in craft, where hands mediate meaning between the viewer's sensorimotor intuition and the kitchen's tacit criteria.",
    citation:
      'Silvia Mirri, Catia Prandi, Marco Roccetti, and Paola Salomoni, "Handmade Narrations: Handling Digital Narrations on Food and Gastronomic Culture," ACM Journal on Computing and Cultural Heritage 10, no. 4 (July 2017): Article 20, https://doi.org/10.1145/3097569.',
  },
  {
    category: "Digital Heritage",
    title: "Reconstructive Media as Interpretive Instrument",
    description:
      "When direct access to cultural practices is constrained, contemporary technologies—3D fabrication, media performance, and interactive visualization—can render otherwise inaccessible traces sensible to modern audiences. This project adapts that logic to edible culture, using 3D not to monumentalize an object but to stabilize a way of seeing that might otherwise disappear with a retiring chef.",
    citation:
      'Tak‑Cheung Hui and Yu‑Chia Kuo, "A Concert in a Vanished Church: Contextualizing Peace Island\'s Auditory History with Modern Technology," Proceedings of the ACM on Computer Graphics and Interactive Techniques 7, no. 4 (August 2024): Article 65, https://doi.org/10.1145/3664218.',
  },
  {
    category: "Intangible Heritage",
    title: "Neighborhood Kitchens as Cultural Stewards",
    description:
      "By documenting Acheng Fandian at the threshold of intergenerational transfer, we attend to the fragile infrastructures through which taste is reproduced: seasonal sourcing, the patience of mise‑en‑place, and the rhythm of service that calibrates technique to the day's variability. The micro‑museum foregrounds a category of culinary heritage that often escapes institutional attention because it is ordinary and ongoing rather than spectacular.",
    citation:
      'Mr. Shen Jiecheng (owner‑chef, Acheng Fandian), interview by the project team, Suzhou, September 21, 2025. "新鲜度是第一道门 (Freshness is the first gate to guard)"—a craft value rather than a branding slogan.',
  },
  {
    category: "Methodological Contribution",
    title: "Replicable Pattern for Community-Led Preservation",
    description:
      "This project demonstrates that a careful blend of fieldwork and web‑native interactivity can capture and transmit fragile culinary knowledge at neighborhood scale. Rather than isolating recipes, we connect technique to space, time, and decision cues in a way that supports both scholarly citation and lay learning. The hope is that similar micro‑museums could be developed around other kitchens, forming a distributed documentation of regional cuisines.",
    citation: null,
  },
];
