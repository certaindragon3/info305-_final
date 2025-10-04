"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll-2";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { reviews } from "@/lib/data";
import { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const baseImages = [
  "/images/gallery/exhibition/acheng-dining-room-01.jpg",
  "/images/gallery/exhibition/acheng-open-kitchen-01.jpg",
  "/images/gallery/exhibition/acheng-prep-station-01.jpg",
  "/images/gallery/exhibition/acheng-chef-action-01.jpg",
  "/images/gallery/exhibition/acheng-family-table-01.jpg",
  "/images/gallery/exhibition/acheng-night-exterior-01.jpg",
  "/images/gallery/exhibition/acheng-dish-plating-01.jpg",
  "/images/gallery/exhibition/acheng-lotus-lanterns-01.jpg",
  "/images/gallery/exhibition/acheng-water-town-approach-01.jpg",
];

const PhotoGallerySection = ({ className }: SectionProps) => {
  const images = useMemo(() => baseImages, []);

  // Transform reviews data for InfiniteMovingCards
  const testimonials = useMemo(() => reviews.map((review) => ({
    quote: review.content,
    name: review.author,
    title: `${"⭐".repeat(review.rating)} · ${review.date}`,
  })), []);

  return (
    <section
      id="photo-gallery"
      className={cn(
        "relative overflow-hidden bg-slate-950 py-24 text-slate-100",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {/* Enhanced gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,130,67,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(251,146,60,0.12),_transparent_60%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 lg:px-8">
        {/* Header */}
        <header className="relative z-[1] mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
            Acheng Restaurant Atmosphere
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            Immersive glimpses from the heart of Subang cuisine
          </h2>
          <p className="mt-4 text-base text-slate-300">
            A curated photo sequence documenting work-in-progress preservation imagery. Final archival assets will
            include chef craftsmanship, dining rituals, and the textures of Acheng&apos;s beloved space.
          </p>
        </header>

        {/* Photo Gallery */}
        <div className="relative z-[1] mb-8 min-h-[50rem]">
          <ParallaxScrollSecond images={images} className="h-full" />
        </div>

        {/* Dianping Introduction Card */}
        <motion.div
          className="relative z-[2] mx-auto w-full max-w-5xl"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-white/5 to-white/5 p-10 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
            {/* Decorative corner elements */}
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-orange-400/20 blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-600" />
                <p className="text-xs font-bold uppercase tracking-[0.45em] text-orange-400">
                  大众点评网 · Dianping.com
                </p>
              </div>

              <h3 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
                "Food lovers call Acheng the pulse of{" "}
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  authentic Subang cuisine
                </span>
                "
              </h3>

              <p className="mt-6 text-base leading-relaxed text-slate-300">
                Verified impressions sourced from the Dianping (大众点评网) community spotlight Acheng&apos;s unwavering dedication to
                heritage techniques, communal dining warmth, and the choreography of the kitchen.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300 ring-1 ring-orange-500/30">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9/5.0 Rating
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 ring-1 ring-white/20">
                  1000+ Reviews
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-300 ring-1 ring-white/20">
                  Verified Customers
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Customer Reviews Carousel */}
        <motion.div
          className="relative z-[2] w-full"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              Real voices from <span className="text-orange-400">food lovers</span>
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Browse authentic customer experiences shared on Dianping
            </p>
          </div>

          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
