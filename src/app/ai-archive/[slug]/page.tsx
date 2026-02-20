import type { Metadata } from "next";
import DishChatView from "@/components/ai-archive/DishChatView";
import { getDishBySlug, DISH_REGISTRY } from "@/lib/ai-archive/dish-registry";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface DishPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return DISH_REGISTRY.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({ params }: DishPageProps): Promise<Metadata> {
    const { slug } = await params;
    const dish = getDishBySlug(slug);
    if (!dish) {
        return {
            title: "Dish Not Found",
            description: "The requested dish could not be found in the archive.",
        };
    }

    return {
        title: `${dish.nameZh} (${dish.nameEn}) | AI Culinary Archive`,
        description: dish.brief,
    };
}

export default async function DishPage({ params }: DishPageProps) {
    const { slug } = await params;
    const dish = getDishBySlug(slug);

    if (!dish) {
        notFound();
    }

    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
            <DishChatView dish={dish} />
        </Suspense>
    );
}
