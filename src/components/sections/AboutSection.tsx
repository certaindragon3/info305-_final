"use client";

import { motion } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { Store, Users, Heart, Sparkles } from "lucide-react";

export default function AboutSection() {
  const timelineData = [
    {
      title: "1992",
      content: (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/30">
                <Sparkles className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">The Beginning</h3>
            </div>
            <p className="leading-relaxed text-slate-300">
              The foundation was laid when the first private restaurant opened
              during a time when privately-owned dining establishments were
              still rare in society. This marked the beginning of a culinary
              journey that would span generations.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "1999",
      content: (
        <div className="space-y-6">
          <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 p-8 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 ring-1 ring-orange-500/40">
                <Store className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Acheng Restaurant Established
              </h3>
            </div>
            <p className="mb-4 leading-relaxed text-slate-300">
              The Fenghuang Street location opened its doors, establishing what
              would become a 26-year legacy of Subang cuisine excellence. The
              name &quot;Acheng&quot; was chosen from the founder&apos;s given
              name, symbolizing a down-to-earth approach to dining.
            </p>
            <div className="space-y-3 rounded-xl bg-slate-950/50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
                Founding Philosophy
              </p>
              <blockquote className="border-l-2 border-orange-500/50 pl-4 italic text-slate-300">
                &quot;The name sounds ordinary, but the meaning is to be
                grounded and align with the mass consumption route - high
                cost-performance ratio, not expensive, but the ingredients are
                genuine and fresh.&quot;
              </blockquote>
              <p className="text-xs text-slate-400">
                — Founder&apos;s Vision Statement
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/30">
                <Heart className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Heritage Preservation
              </h3>
            </div>
            <p className="mb-6 leading-relaxed text-slate-300">
              Today, Acheng Restaurant continues to uphold traditional Subang
              cuisine techniques while adapting to modern health consciousness
              through reduced oil, sugar, and salt. The commitment to
              handmade dishes and fresh ingredients remains unwavering.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-950/50 p-5">
                <p className="mb-2 text-sm font-semibold text-orange-400">
                  Daily Fresh Supply
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Orders placed at 9 PM, delivered by 9 AM for immediate
                  processing
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/50 p-5">
                <p className="mb-2 text-sm font-semibold text-orange-400">
                  Zero Pre-made Dishes
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Every dish prepared from scratch using traditional methods
                </p>
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
      image: "/images/aboutsection/accessibility.png",
      description:
        "Positioned as a restaurant for ordinary people with affordable pricing and high cost-performance ratio, ensuring quality Subang cuisine is accessible to everyone.",
      quote:
        "It can attract more diners to visit and consume - this is the main business philosophy.",
    },
    {
      icon: Sparkles,
      title: "Freshness First",
      image: "/images/aboutsection/freshness.png",
      description:
        "The degree of freshness is the primary quality control checkpoint. Experienced chefs employ the traditional method: look, smell, and touch to ensure ingredient quality.",
      quote:
        "For Subang cuisine, the main ingredients must be very fresh. If the main ingredient is not fresh, the dish fails.",
    },
    {
      icon: Heart,
      title: "Craftsmanship Heritage",
      image: "/images/aboutsection/craftsmanship.png",
      description:
        "From chef to business owner, the founder maintains the tradition of handcrafted dishes, refusing to adopt pre-made ingredients despite industry trends.",
      quote:
        "For Subang cuisine, following the traditional approach yields better results.",
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
          className="mb-12"
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
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                        Chef&apos;s Philosophy
                      </p>
                      <blockquote className="border-l-2 border-orange-500/50 pl-2 text-xs italic leading-relaxed text-slate-300">
                        &quot;{card.quote}&quot;
                      </blockquote>
                    </div>
                  </div>
                </DirectionAwareHover>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative">
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
                    Fenghuang Street, Suzhou, Jiangsu Province
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
