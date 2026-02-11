import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getDishBySlug } from "@/lib/ai-archive/dish-registry";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

type IncomingBody = {
  messages?: unknown;
  dishSlug?: unknown;
  data?: { dishSlug?: unknown };
};

function normalizeMessages(messages: unknown): Array<Omit<UIMessage, "id">> {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages.flatMap((message) => {
    if (!message || typeof message !== "object") {
      return [];
    }

    const value = message as {
      role?: unknown;
      parts?: unknown;
      content?: unknown;
    };
    const role =
      value.role === "assistant" || value.role === "system" || value.role === "user"
        ? value.role
        : "user";

    if (Array.isArray(value.parts)) {
      return [{ role, parts: value.parts as UIMessage["parts"] }];
    }

    if (typeof value.content === "string" && value.content.trim()) {
      return [
        {
          role,
          parts: [{ type: "text", text: value.content }],
        },
      ];
    }

    return [];
  });
}

function resolveProjectPath(path: string): string {
  return path.startsWith("/") ? path.slice(1) : path;
}

export async function POST(req: Request) {
  const body = (await req.json()) as IncomingBody;
  const dishSlug =
    typeof body.dishSlug === "string"
      ? body.dishSlug
      : typeof body.data?.dishSlug === "string"
        ? body.data.dishSlug
        : undefined;

  const dish = dishSlug ? getDishBySlug(dishSlug) : undefined;
  const normalizedMessages = normalizeMessages(body.messages);

  let contextContent = "";
  if (dish?.contextPath) {
    try {
      const fullPath = join(process.cwd(), resolveProjectPath(dish.contextPath));
      contextContent = readFileSync(fullPath, "utf-8");
    } catch {
      console.warn(`Could not load context file: ${dish.contextPath}`);
    }
  }

  const systemPrompt = dish
    ? `You are a warm, precise bilingual (Chinese/English) culinary expert for A Cheng Restaurant (阿城餐馆).

You are currently discussing: ${dish.nameZh} (${dish.nameEn})
Category: ${dish.category}
Brief: ${dish.brief}

${contextContent ? `Ground your answers in this source context:\n\n${contextContent}` : ""}

Rules:
- Stay focused on this specific dish and Suzhou culinary culture.
- Prioritize factual details from provided context when possible.
- If context is missing, state uncertainty instead of inventing details.
- Keep answers practical and concise. Prefer short paragraphs and bullet points when useful.
- Use both Chinese and English terms naturally where helpful.`
    : `You are a bilingual (Chinese/English) culinary guide for A Cheng Restaurant (阿城餐馆), focused on Suzhou cuisine.`;

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: systemPrompt,
    messages: await convertToModelMessages(normalizedMessages),
  });

  return result.toUIMessageStreamResponse();
}
