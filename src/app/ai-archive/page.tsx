import type { Metadata } from "next";
import ArchiveHomeView from "@/components/ai-archive/ArchiveHomeView";

export const metadata: Metadata = {
    title: "AI Culinary Archive | Suzhou Cuisine",
    description:
        "Explore 12 signature Suzhou dishes through AI conversation. Ask anything about the ingredients, techniques, and stories behind each dish.",
};

export default function AIArchivePage() {
    return (
        <main className="bg-slate-950">
            <ArchiveHomeView />
        </main>
    );
}
