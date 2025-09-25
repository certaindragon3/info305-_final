"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll-2";
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

  return (
    <section
      id="photo-gallery"
      className={cn(
        "relative overflow-hidden bg-slate-950 py-24 text-slate-100",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,130,67,0.18),_transparent_55%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 lg:px-8">
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

        <div className="relative z-[1]">
          <ParallaxScrollSecond images={images} className="h-[34rem]" />
        </div>

        <motion.div
          className="relative z-[1] mx-auto w-full max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="absolute inset-0 -z-[1] bg-gradient-to-r from-amber-500/20 via-rose-500/10 to-sky-500/20 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-amber-200">
              Voices from Dianping.com
            </p>
            <motion.h3
              className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl"
              initial={{ backgroundPositionX: "0%" }}
              animate={{ backgroundPositionX: "100%" }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              style={{
                backgroundImage: "linear-gradient(90deg,#fcd34d,#f97316,#fb7185,#38bdf8,#fcd34d)",
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              “Food lovers on Dianping call Acheng the pulse of authentic Subang cuisine—savor every preserved detail.”
            </motion.h3>
            <p className="mt-4 text-sm text-slate-200">
              Verified impressions sourced from the Dianping (大众点评网) community spotlight Acheng&apos;s unwavering dedication to
              heritage techniques, communal dining warmth, and the choreography of the kitchen. Expect the same
              genuine acclaim once the full archival gallery is online.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-300">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-200 shadow-sm shadow-amber-500/30">
                Consistently rated 4.9★
              </span>
              <span className="rounded-full bg-rose-500/10 px-3 py-1 text-rose-200 shadow-sm shadow-rose-500/30">
                Praised for chef craftsmanship
              </span>
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sky-200 shadow-sm shadow-sky-500/30">
                Recognized on Dianping.com
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;
