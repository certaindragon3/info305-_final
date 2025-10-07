"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

const ITEMS: Item[] = [
  { id: "hero", label: "Overview" },
  { id: "photo-gallery", label: "Photos" },
  { id: "gallery-exhibition", label: "Exhibition" },
  { id: "about", label: "About" },
  { id: "project", label: "Project" },
];

export default function FloatingDockNav({ className }: { className?: string }) {
  const [active, setActive] = useState<string>("hero");
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(true);
  const observers = useMemo(() => new Map<string, IntersectionObserver>(), []);

  useEffect(() => {
    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(id);
        }
      }
    };

    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect(id), {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      });
      observer.observe(el);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((obs, _id) => obs.disconnect());
      observers.clear();
    };
  }, [observers]);

  // Separate observer for hero section visibility
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsHeroVisible(entry.isIntersecting);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    heroObserver.observe(heroEl);

    return () => {
      heroObserver.disconnect();
    };
  }, []);

  const onJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // no magnetic scaling — highlight only

  return (
    <div className={cn("pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center", className)}>
      <nav
        className={cn(
          "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-2 py-2 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 transition-all duration-500 ease-in-out",
          isHeroVisible ? "translate-y-32 opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        {ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onJump(item.id)}
              className={cn(
                "group relative rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors transition-shadow",
                isActive
                  ? "bg-orange-500/25 text-orange-200 ring-1 ring-orange-500/40 shadow-[0_0_0_1px_rgba(251,146,60,0.28),0_0_34px_0_rgba(251,146,60,0.38)]"
                  : "bg-black/10 text-slate-300 ring-1 ring-white/10 hover:bg-orange-500/15 hover:text-orange-200 hover:ring-orange-500/40 hover:shadow-[0_0_0_1px_rgba(251,146,60,0.20),0_0_28px_0_rgba(251,146,60,0.28)]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
