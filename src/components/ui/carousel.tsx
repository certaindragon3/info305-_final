"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

interface SlideItem {
  title: string;
  button?: string;
  src: string;
  phrase?: string;
}

interface CarouselProps {
  slides: SlideItem[];
  className?: string;
  autoAdvanceMs?: number;
}

const clampIndex = (idx: number, length: number) => {
  if (length === 0) return 0;
  const mod = idx % length;
  return mod < 0 ? mod + length : mod;
};

const Carousel = ({ slides, className, autoAdvanceMs = 6000 }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => clampIndex(prev + 1, slides.length));
    }, autoAdvanceMs);
    return () => clearInterval(timer);
  }, [slides.length, autoAdvanceMs]);

  const goTo = (indexDelta: number) => {
    setCurrent((prev) => clampIndex(prev + indexDelta, slides.length));
  };

  const activeSlide = slides[current];

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950/80">
        <div className="relative aspect-[4/5] w-full">
          {slides.map((slide, index) => (
            <figure
              key={`${slide.src}-${index}`}
              className={cn(
                "absolute inset-0 flex h-full w-full flex-col justify-end transition-all duration-700",
                index === current
                  ? "translate-x-0 opacity-100"
                  : index < current
                    ? "-translate-x-10 opacity-0"
                    : "translate-x-10 opacity-0"
              )}
              aria-hidden={index !== current}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption className="relative z-[1] space-y-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 py-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">
                  Acheng Field Study
                </p>
                <h3 className="text-lg font-semibold text-white">{slide.title}</h3>
                {slide.phrase && (
                  <p className="text-sm text-slate-300">{slide.phrase}</p>
                )}
              </figcaption>
            </figure>
          ))}
          <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-white/5" />
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-orange-400 hover:text-orange-200"
              aria-label="Previous slide"
            >
              <IconArrowNarrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-orange-400 hover:text-orange-200"
              aria-label="Next slide"
            >
              <IconArrowNarrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-1">
            {slides.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={cn(
                  "h-1.5 w-6 rounded-full bg-slate-700 transition",
                  index === current && "bg-orange-400"
                )}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Carousel;
