import type { Metadata } from "next";
import DishBrowseGrid from "@/components/ai-archive/DishBrowseGrid";

export const metadata: Metadata = {
    title: "Browse Dishes | AI Culinary Archive",
    description:
        "Browse all 12 signature Suzhou dishes. Explore 3D models, bilingual descriptions, and chat with AI about each dish's ingredients and techniques.",
};

export default function BrowsePage() {
    return (
        <main className="bg-slate-950">
            <DishBrowseGrid />
        </main>
    );
}
