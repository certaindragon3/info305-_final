"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { reviews } from "@/lib/data";
import { SectionProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const CustomerReviewSection = ({ className }: SectionProps) => {
  // Transform reviews data to match InfiniteMovingCards format
  const testimonials = reviews.map((review) => ({
    quote: review.content,
    name: review.author,
    title: `${review.rating}★ · ${new Date(review.date).toLocaleDateString("zh-CN")}`,
  }));

  return (
    <section
      id="customer-reviews"
      className={cn(
        "relative overflow-hidden bg-slate-950 py-24 text-slate-100",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,130,67,0.15),_transparent_50%)]" />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
            Customer Voices
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
            What food lovers say about <span className="text-orange-400">Acheng Restaurant</span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Authentic reviews from Dianping.com (大众点评网), China&apos;s most trusted restaurant review platform.
          </p>
        </header>

        <div className="mt-16">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
