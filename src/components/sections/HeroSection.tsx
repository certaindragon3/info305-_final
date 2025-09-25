"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { IconArrowDownRight } from "@tabler/icons-react";

import Carousel from "@/components/ui/carousel";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { culturalContext, photoGallery, restaurant } from "@/lib/data";

const heroPhotos = photoGallery.slice(0, 5);

export default function HeroSection() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("photo-gallery");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="relative mx-auto flex min-h-screen w-full items-center justify-center px-6 py-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.18),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
        <Spotlight className="left-1/2 top-[-10%] h-[120%] w-[120%] -translate-x-1/2 opacity-60" fill="rgba(249,115,22,0.55)" />

        <div className="relative z-10 grid w-full max-w-6xl gap-16 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_0.9fr)]">
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <motion.span
              className="text-xs font-semibold uppercase tracking-[0.45em] text-orange-400"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Acheng Restaurant Preservation
            </motion.span>

            <motion.h1
              className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            >
              Safeguarding Acheng Restaurant&apos;s Subang legacy.
            </motion.h1>

            <TextGenerateEffect
              words="We preserve Acheng Restaurant's slow Subang mastery through immersive digital archiving."
              className="text-balance"
              textClassName="text-lg text-slate-300"
              duration={0.6}
            />

            <motion.p
              className="max-w-xl text-sm leading-relaxed text-slate-400"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            >
              Focus: {restaurant.name} • Est. {restaurant.established} • {restaurant.location}
            </motion.p>

            <motion.div
              className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
            >
              <InteractiveHoverButton
                type="button"
                onClick={scrollToNext}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition"
              >
                Enter the museum
              </InteractiveHoverButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-slate-900/70 p-8 backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-slate-900/60" />
              <div className="relative">
                <Carousel
                  slides={heroPhotos.map((photo) => ({
                    title: photo.title,
                    button: "Explore",
                    src: photo.imageUrl,
                  }))}
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
