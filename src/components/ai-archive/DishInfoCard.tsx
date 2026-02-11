"use client";

import { DishArchiveEntry } from "@/lib/ai-archive/types";
import { CATEGORY_CONFIG } from "@/components/ai-archive/DishCard";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { cn } from "@/lib/utils";

interface DishInfoCardProps {
    dish: DishArchiveEntry;
    onQuestionClick: (question: string) => void;
}

export default function DishInfoCard({ dish, onQuestionClick }: DishInfoCardProps) {
    const category = CATEGORY_CONFIG[dish.category];

    return (
        <div className="space-y-4 p-5">
            {/* Category badge */}
            <div>
                <span
                    className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
                        "text-[10px] font-semibold uppercase tracking-wider",
                        "ring-1 backdrop-blur-md",
                        category.color
                    )}
                >
                    <category.Icon className="h-3 w-3" />
                    {category.label}
                </span>
            </div>

            {/* Bilingual title */}
            <div>
                <h2 className="text-xl font-bold text-white">{dish.nameZh}</h2>
                <p className="mt-0.5 text-sm font-medium text-slate-400">
                    {dish.nameEn}
                </p>
            </div>

            {/* Brief description */}
            <p className="text-sm leading-relaxed text-slate-300">
                {dish.brief}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-transparent" />

            {/* Suggested questions */}
            <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Suggested Questions
                </h3>
                <div className="flex flex-wrap gap-2">
                    {dish.suggestedQuestions.map((question, index) => (
                        <Suggestion
                            key={index}
                            suggestion={question}
                            onClick={onQuestionClick}
                            className="whitespace-normal text-left text-xs border-orange-500/20 bg-slate-800/60 text-slate-300 hover:border-orange-500/40 hover:bg-slate-700/60 hover:text-orange-300"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
