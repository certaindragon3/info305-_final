"use client";

import { useChat } from "@ai-sdk/react";
import { DishArchiveEntry } from "@/lib/ai-archive/types";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Bot, Layers, RefreshCw, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  clearDishChatHistory,
  loadDishChatHistory,
  saveDishChatHistory,
} from "@/lib/ai-archive/chat-history";
import { getChatApiPath } from "@/lib/ai-archive/worker-api";

/** Number of messages (including welcome) that trigger the "explore again" banner */
const DEEP_CONVERSATION_THRESHOLD = 5;

interface ChatPanelProps {
  dish: DishArchiveEntry;
}

export interface ChatPanelRef {
  fillInput: (question: string) => void;
  /** Called by parent header menu to trigger the two-step clear flow */
  triggerClear: () => void;
}

function getTextFromMessage(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

const ChatPanel = forwardRef<ChatPanelRef, ChatPanelProps>(
  ({ dish }, ref) => {
    const [input, setInput] = useState("");
    const [isHydrated, setIsHydrated] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const initialQuery = searchParams.get("q");

    const welcomeMessage = useMemo<UIMessage>(
      () => ({
        id: `welcome-${dish.slug}`,
        role: "assistant",
        parts: [
          {
            type: "text",
            text:
              dish.welcome ||
              `Welcome! I'm here to tell you all about ${dish.nameEn}.`,
          },
        ],
      }),
      [dish.nameEn, dish.slug, dish.welcome]
    );

    const { messages, status, sendMessage, stop, error, clearError, setMessages } =
      useChat({
        id: `dish-${dish.slug}`,
        transport: new DefaultChatTransport({
          api: getChatApiPath(),
        }),
        messages: [welcomeMessage],
      });

    const isGenerating = status === "submitted" || status === "streaming";

    /** Whether the conversation is "deep" enough to show the explore-again banner */
    const isDeepConversation = messages.length >= DEEP_CONVERSATION_THRESHOLD;

    useEffect(() => {
      let isCancelled = false;

      const hydrateChatHistory = async () => {
        const savedMessages = await loadDishChatHistory(dish.slug);
        if (isCancelled) {
          return;
        }

        let currentMessages = [welcomeMessage];
        if (savedMessages && savedMessages.length > 0) {
          currentMessages = savedMessages;
          setMessages(currentMessages);
        } else {
          setMessages(currentMessages);
        }

        setIsHydrated(true);

        // Auto-trigger if initial query exists and we haven't answered it yet
        if (initialQuery) {
          const hasQueryAlready = currentMessages.some(
            (m) => m.role === "user" && getTextFromMessage(m as UIMessage) === initialQuery
          );

          if (!hasQueryAlready) {
            setTimeout(() => {
              sendMessage(
                { text: initialQuery },
                { body: { dishSlug: dish.slug } }
              );
              router.replace(pathname, { scroll: false });
            }, 500);
          } else {
            router.replace(pathname, { scroll: false });
          }
        }
      };

      setIsHydrated(false);
      void hydrateChatHistory();

      return () => {
        isCancelled = true;
      };
    }, [dish.slug, setMessages, welcomeMessage, initialQuery, pathname, router]);

    useEffect(() => {
      if (!isHydrated) {
        return;
      }
      void saveDishChatHistory(dish.slug, messages);
    }, [dish.slug, isHydrated, messages]);

    const handleSend = async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText || isGenerating) {
        return;
      }

      if (error) {
        clearError();
      }

      setInput("");
      try {
        await sendMessage(
          { text: trimmedText },
          { body: { dishSlug: dish.slug } }
        );
      } catch {
        // Error state is surfaced by useChat.
      }
    };

    /** Resets chat to the welcome message and clears persisted history */
    const executeReset = useCallback(async () => {
      stop();
      if (error) {
        clearError();
      }
      setInput("");
      setMessages([welcomeMessage]);
      await clearDishChatHistory(dish.slug);
    }, [clearError, dish.slug, error, setMessages, stop, welcomeMessage]);

    useImperativeHandle(
      ref,
      () => ({
        fillInput: (question: string) => {
          setInput(question);
          requestAnimationFrame(() => {
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(
              question.length,
              question.length
            );
          });
        },
        // Confirmation already happened in the header menu — execute directly.
        triggerClear: () => { void executeReset(); },
      }),
      [executeReset]
    );

    return (
      <div className="relative flex h-full flex-col bg-slate-950">
        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.06),transparent_50%)]" />

        {/* Chat messages area */}
        <Conversation className="relative flex-1">
          <ConversationContent className="gap-6 px-4 py-6 sm:px-6">
            {messages.map((message) => {
              const from = message.role === "user" ? "user" : "assistant";
              const text = getTextFromMessage(message);
              const fallbackText =
                from === "assistant" && isGenerating ? "Thinking..." : "";
              const content = text || fallbackText;

              if (!content) {
                return null;
              }

              return (
                <Message
                  key={message.id}
                  from={from}
                  className={from === "user" ? "ml-auto" : ""}
                >
                  <div
                    className={cn(
                      "flex w-full items-start gap-3",
                      from === "user" ? "justify-end" : ""
                    )}
                  >
                    {/* Assistant avatar */}
                    {from === "assistant" && (
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 text-orange-400 ring-1 ring-orange-500/25">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <MessageContent
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        from === "user"
                          ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                          : "bg-slate-800/70 text-slate-200 ring-1 ring-white/[0.06]"
                      )}
                    >
                      <MessageResponse
                        className={cn(
                          "text-sm leading-relaxed",
                          from === "user" ? "text-white" : "text-slate-200",
                          // Markdown list indentation for assistant messages
                          from === "assistant" && [
                            "[&_ul]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1",
                            "[&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1",
                            "[&_li]:leading-relaxed",
                          ]
                        )}
                      >
                        {content}
                      </MessageResponse>
                    </MessageContent>

                    {/* User avatar */}
                    {from === "user" && (
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 ring-1 ring-white/[0.08]">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </Message>
              );
            })}

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                {error.message || "Failed to get response. Please try again."}
              </div>
            )}
          </ConversationContent>

          <ConversationScrollButton className="border-slate-700 bg-slate-800 text-orange-300 shadow-lg hover:bg-slate-700" />
        </Conversation>

        {/* ── Context-aware "Explore Again" banner ── */}
        {isDeepConversation && !isGenerating && (
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
            {/* Accent gradient line at top */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            {/* Banner body */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-950/30 via-slate-900/80 to-slate-900/60 px-4 py-4 backdrop-blur-sm">
              {/* Subtle warm glow blob */}
              <div className="pointer-events-none absolute -left-8 top-1/2 h-20 w-32 -translate-y-1/2 rounded-full bg-orange-500/10 blur-2xl" />

              <div className="relative mx-auto flex max-w-3xl items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Layers className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                    You&apos;ve dug deep into this dish.
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Want a fresh start? Clear the conversation and ask something new.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => void executeReset()}
                  className={cn(
                    "shrink-0 flex items-center gap-2 rounded-full px-4 py-2",
                    "bg-gradient-to-r from-orange-500/20 to-orange-600/10",
                    "text-xs font-semibold text-orange-300",
                    "ring-1 ring-orange-500/30",
                    "transition-all duration-200",
                    "hover:from-orange-500/30 hover:to-orange-600/20 hover:text-orange-200",
                    "hover:ring-orange-500/50 hover:shadow-[0_0_12px_rgba(249,115,22,0.15)]",
                    "active:scale-95"
                  )}
                >
                  <RefreshCw className="h-3 w-3" />
                  Explore Again
                </button>
              </div>
            </div>
          </div>
        )}


        {/* ── Input area ── */}
        <div className="relative border-t border-white/[0.06] bg-slate-900/80 px-4 pb-4 pt-3 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            <PromptInput
              onSubmit={({ text }) => handleSend(text)}
              className={cn(
                /* ---- Kill every InputGroup default ---- */
                "[&_[data-slot=input-group]]:!border-0",
                "[&_[data-slot=input-group]]:!shadow-none",
                "[&_[data-slot=input-group]]:!ring-0",
                "[&_[data-slot=input-group]]:!bg-transparent",
                "[&_[data-slot=input-group]]:!outline-none",
                "[&_[data-slot=input-group]]:flex-col",
                "[&_[data-slot=input-group]]:items-stretch",
                "[&_[data-slot=input-group]]:!rounded-2xl",
                /* ---- Our own container styling ---- */
                "rounded-2xl border border-slate-700/60 bg-slate-800/60",
                "transition-all duration-200",
                "focus-within:border-orange-500/40 focus-within:bg-slate-800/80",
                "focus-within:shadow-[0_0_0_1px_rgba(249,115,22,0.15),0_4px_24px_rgba(0,0,0,0.3)]",
              )}
            >
              {/* Textarea */}
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={`Ask about ${dish.nameEn}...`}
                className={cn(
                  "!min-h-[44px] w-full resize-none",
                  "!border-none !bg-transparent !shadow-none !ring-0 !outline-none",
                  "px-4 py-3 text-sm text-white",
                  "placeholder:text-slate-500",
                  "focus-visible:!ring-0 focus-visible:!border-none",
                )}
              />

              {/* Bottom toolbar */}
              <div className="flex items-center justify-between border-t border-white/[0.04] px-3 py-2">
                <span className="hidden text-[11px] text-slate-600 sm:inline">
                  ↵ Send · ⇧↵ Newline
                </span>
                {/* Spacer on mobile */}
                <span className="sm:hidden" />

                <PromptInputSubmit
                  status={status}
                  onStop={stop}
                  disabled={!isGenerating && !input.trim()}
                  className={cn(
                    "!h-8 !w-8 !rounded-lg text-white transition-all",
                    isGenerating
                      ? "!bg-red-500 hover:!bg-red-400"
                      : "!bg-orange-500 hover:!bg-orange-400",
                    "disabled:!bg-slate-700/50 disabled:!text-slate-500"
                  )}
                />
              </div>
            </PromptInput>

            <p className="mt-2 text-center text-[10px] text-slate-600">
              AI responses may be inaccurate. Verify important information.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ChatPanel.displayName = "ChatPanel";

export default ChatPanel;
