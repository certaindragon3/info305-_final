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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,146,60,0.08),transparent_45%)]" />

        <Conversation className="relative flex-1">
          <ConversationContent className="gap-5 p-4 pb-6 sm:p-6">
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
                    {from === "assistant" && (
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/30">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <MessageContent
                      className={cn(
                        "max-w-[88%] rounded-2xl px-4 py-3",
                        from === "user"
                          ? "bg-orange-500 text-white shadow-[0_8px_24px_rgba(249,115,22,0.25)]"
                          : "border border-orange-500/10 bg-slate-900/80 text-slate-200"
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

                    {from === "user" && (
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 ring-1 ring-slate-700">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </Message>
              );
            })}

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error.message || "Failed to get response. Please try again."}
              </div>
            )}
          </ConversationContent>

          <ConversationScrollButton className="border-orange-500/30 bg-slate-900 text-orange-300 hover:bg-slate-800" />
        </Conversation>

        <div className="border-t border-orange-500/15 bg-slate-900/70 p-4 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            <PromptInput
              onSubmit={({ text }) => handleSend(text)}
              className="overflow-hidden rounded-2xl border border-orange-500/25 bg-slate-950 transition-colors focus-within:border-orange-500/55"
            >
              <PromptInputTextarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={`Ask about ${dish.nameEn}...`}
                className="min-h-[56px] w-full resize-none border-none bg-transparent px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-0"
              />

              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void handleClearHistory()}
                    disabled={isGenerating || messages.length <= 1}
                    className={cn(
                      "rounded-md border border-slate-700 px-2 py-1 text-[10px] text-slate-400 transition-colors",
                      "hover:border-orange-500/40 hover:text-orange-300",
                      "disabled:cursor-not-allowed disabled:opacity-40"
                    )}
                  >
                    Clear Chat
                  </button>
                  <p className="text-[10px] text-slate-500">
                    Enter to send, Shift+Enter for newline.
                  </p>
                </div>
                <div>
                  <PromptInputSubmit
                    status={status}
                    onStop={stop}
                    disabled={!isGenerating && !input.trim()}
                    className={cn(
                      "h-8 w-8 rounded-lg text-white",
                      isGenerating
                        ? "bg-red-500 hover:bg-red-400"
                        : "bg-orange-500 hover:bg-orange-400",
                      "disabled:bg-slate-700 disabled:text-slate-400"
                    )}
                  />
                </div>
              </div>
            </PromptInput>
            <p className="mt-2 text-center text-[10px] text-slate-500">
              AI can make mistakes. Please verify important details.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ChatPanel.displayName = "ChatPanel";

export default ChatPanel;
