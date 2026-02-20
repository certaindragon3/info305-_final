"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          aria-roledescription="carousel"
          className={cn("relative", className)}
          onKeyDownCapture={handleKeyDown}
          role="region"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      aria-roledescription="slide"
      role="group"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

interface HeroSlideItem {
  title: string;
  button?: string;
  src: string;
  phrase?: string;
}

interface HeroCarouselProps {
  slides: HeroSlideItem[];
  className?: string;
  autoAdvanceMs?: number;
}

const clampIndex = (idx: number, length: number) => {
  if (length === 0) return 0;
  const mod = idx % length;
  return mod < 0 ? mod + length : mod;
};

const HeroCarousel = ({
  slides,
  className,
  autoAdvanceMs = 6000,
}: HeroCarouselProps) => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => clampIndex(prev + 1, slides.length));
    }, autoAdvanceMs);
    return () => clearInterval(timer);
  }, [slides.length, autoAdvanceMs]);

  const goTo = (indexDelta: number) => {
    setCurrent((prev) => clampIndex(prev + indexDelta, slides.length));
  };

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
                {slide.phrase && <p className="text-sm text-slate-300">{slide.phrase}</p>}
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

export { type CarouselApi, Carousel, CarouselContent, CarouselItem };

export default HeroCarousel;
