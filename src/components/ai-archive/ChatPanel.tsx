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
import type { UIMessage } from "ai";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  clearDishChatHistory,
  loadDishChatHistory,
  saveDishChatHistory,
} from "@/lib/ai-archive/chat-history";

interface ChatPanelProps {
  dish: DishArchiveEntry;
}

export interface ChatPanelRef {
  fillInput: (question: string) => void;
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
        messages: [welcomeMessage],
      });

    const isGenerating = status === "submitted" || status === "streaming";

    useEffect(() => {
      let isCancelled = false;

      const hydrateChatHistory = async () => {
        const savedMessages = await loadDishChatHistory(dish.slug);
        if (isCancelled) {
          return;
        }

        if (savedMessages && savedMessages.length > 0) {
          setMessages(savedMessages);
        } else {
          setMessages([welcomeMessage]);
        }
        setIsHydrated(true);
      };

      setIsHydrated(false);
      void hydrateChatHistory();

      return () => {
        isCancelled = true;
      };
    }, [dish.slug, setMessages, welcomeMessage]);

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

    const handleClearHistory = async () => {
      if (typeof window !== "undefined") {
        const confirmed = window.confirm(
          `Clear chat history for ${dish.nameZh} (${dish.nameEn})?`
        );
        if (!confirmed) {
          return;
        }
      }

      stop();
      if (error) {
        clearError();
      }
      setInput("");
      setMessages([welcomeMessage]);
      await clearDishChatHistory(dish.slug);
    };

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
      }),
      []
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
                          from === "user" ? "text-white" : "text-slate-200"
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

        {/* ── Input area ── */}
        <div className="relative border-t border-white/[0.06] bg-slate-900/80 px-4 pb-4 pt-3 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            {/* Prompt input — override InputGroup defaults via descendant selectors */}
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

              {/* Bottom toolbar — inline with textarea inside InputGroup */}
              <div className="flex items-center justify-between border-t border-white/[0.04] px-3 py-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void handleClearHistory()}
                    disabled={isGenerating || messages.length <= 1}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-500 transition-colors",
                      "hover:bg-slate-700/50 hover:text-slate-300",
                      "disabled:cursor-not-allowed disabled:opacity-30"
                    )}
                  >
                    Clear
                  </button>
                  <span className="hidden text-[11px] text-slate-600 sm:inline">
                    ↵ Send · ⇧↵ Newline
                  </span>
                </div>

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
