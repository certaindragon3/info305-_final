"use client";

import { DishArchiveEntry } from "@/lib/ai-archive/types";
import { DishModel3D } from "@/components/dish/3d/DishModel3D";
import DishInfoCard from "@/components/ai-archive/DishInfoCard";
import ChatPanel, { ChatPanelRef } from "@/components/ai-archive/ChatPanel";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DishChatViewProps {
    dish: DishArchiveEntry;
}

export default function DishChatView({ dish }: DishChatViewProps) {
    const chatPanelRef = useRef<ChatPanelRef>(null);
    const [showMobileChat, setShowMobileChat] = useState(false);

    const handleQuestionClick = useCallback((question: string) => {
        chatPanelRef.current?.fillInput(question);
        // On mobile, switch to chat view when a question is picked
        setShowMobileChat(true);
    }, []);

    return (
        <div className="flex h-[100dvh] flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Top navigation bar */}
            <header className="flex h-13 shrink-0 items-center justify-between border-b border-white/[0.06] bg-slate-950/90 px-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <Link
                        href="/ai-archive/browse"
                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-orange-400"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Browse</span>
                    </Link>
                    <div className="h-4 w-px bg-white/[0.08]" />
                    <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-semibold text-white">{dish.nameZh}</span>
                        <span className="hidden text-xs text-slate-500 sm:inline">
                            {dish.nameEn}
                        </span>
                    </div>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setShowMobileChat(!showMobileChat)}
                    className={cn(
                        "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all lg:hidden",
                        showMobileChat
                            ? "bg-slate-800 text-orange-400 ring-1 ring-orange-500/20"
                            : "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    )}
                >
                    {showMobileChat ? (
                        <>View 3D Model</>
                    ) : (
                        <>
                            <MessageCircle className="h-3 w-3" />
                            Chat with AI
                        </>
                    )}
                </button>
            </header>

            {/* Main split-panel content */}
            <div className="relative flex flex-1 overflow-hidden">
                {/* Left Panel — 3D Model + Info Card */}
                <aside
                    className={cn(
                        "flex w-full flex-col border-r border-white/[0.06] transition-transform duration-300 lg:w-[420px] lg:translate-x-0 xl:w-[480px]",
                        showMobileChat ? "absolute inset-0 -translate-x-full lg:static" : "relative translate-x-0"
                    )}
                >
                    {/* 3D Model Viewer */}
                    <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 lg:aspect-[4/3]">
                        <DishModel3D
                            modelPath={dish.model3D}
                            dishName={dish.nameEn}
                            dishNameZh={dish.nameZh}
                            interactive={true}
                        />
                        {/* Gradient fade at bottom */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    </div>

                    {/* Info Card */}
                    <div className="flex-1 overflow-y-auto">
                        <DishInfoCard
                            dish={dish}
                            onQuestionClick={handleQuestionClick}
                        />
                    </div>
                </aside>

                {/* Right Panel — Chat */}
                <main
                    className={cn(
                        "flex w-full flex-1 flex-col transition-transform duration-300 lg:translate-x-0",
                        showMobileChat ? "relative translate-x-0" : "absolute inset-0 translate-x-full lg:static"
                    )}
                >
                    <ChatPanel ref={chatPanelRef} dish={dish} />
                </main>
            </div>
        </div>
    );
}
