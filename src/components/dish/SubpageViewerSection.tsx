"use client";

import { useState } from "react";
import { InteractiveDishViewer } from "./InteractiveDishViewer";
import { DishPerspectiveCards, type PerspectiveCardItem } from "./DishPerspectiveCards";

interface SubpageViewerSectionProps {
  aiModelUrl: string;
  scanModelUrl?: string;
  dishName: string;
  dishNameZh: string;
  cards: PerspectiveCardItem[];
  description: string;
  story: string;
}

export function SubpageViewerSection({ aiModelUrl, scanModelUrl, dishName, dishNameZh, cards, description, story }: SubpageViewerSectionProps) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <InteractiveDishViewer aiModelUrl={aiModelUrl} scanModelUrl={scanModelUrl} dishName={dishName} dishNameZh={dishNameZh} onSegmentChange={setActive} />
      <div className="flex flex-col gap-4">
        <DishPerspectiveCards activeIndex={active} items={cards} />
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{story}</p>
        </div>
        <div className="rounded-full bg-orange-500/10 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">
          Cards reveal as the 3D model rotates with scroll
        </div>
      </div>
    </div>
  );
}

