import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, generateObject, streamText, type UIMessage } from "ai";
import { z } from "zod";
import { DISH_REGISTRY, getDishBySlug } from "../src/lib/ai-archive/dish-registry";

type Env = {
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  ALLOWED_ORIGIN?: string;
  CONTEXT_BASE_URL?: string;
};

type CorsContext = {
  origin: string;
  allowHeaders: string;
};

type IncomingBody = {
  messages?: unknown;
  dishSlug?: unknown;
  data?: { dishSlug?: unknown };
};

const DEFAULT_CONTEXT_BASE_URL = "https://acheng.jiesen-huang.com";
const contextMarkdownCache = new Map<string, Promise<string>>();

function resolveOrigin(request: Request, env: Env): string {
  const requestOrigin = request.headers.get("origin");
  const allowed = new Set([
    env.ALLOWED_ORIGIN,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter(Boolean) as string[]);

  if (requestOrigin && (allowed.has(requestOrigin) || !env.ALLOWED_ORIGIN)) {
    return requestOrigin;
  }

  return env.ALLOWED_ORIGIN ?? "*";
}

function resolveAllowedHeaders(request: Request): string {
  const requested = request.headers.get("access-control-request-headers");
  if (requested && requested.trim()) {
    return requested;
  }
  return "Content-Type, Accept";
}

function isRemoteHttpOrigin(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    if (!(url.protocol === "http:" || url.protocol === "https:")) return false;
    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") return false;
    return true;
  } catch {
    return false;
  }
}

function resolveContextBaseUrl(request: Request, env: Env): string {
  if (isRemoteHttpOrigin(env.CONTEXT_BASE_URL)) return env.CONTEXT_BASE_URL;
  const requestOrigin = request.headers.get("origin");
  if (isRemoteHttpOrigin(requestOrigin)) return requestOrigin;
  if (isRemoteHttpOrigin(env.ALLOWED_ORIGIN)) return env.ALLOWED_ORIGIN;
  return DEFAULT_CONTEXT_BASE_URL;
}

function resolveContextUrl(baseUrl: string, contextPath: string): string | null {
  if (!contextPath.startsWith("/ai-context/") || !contextPath.endsWith(".md")) {
    return null;
  }
  try {
    return new URL(contextPath, baseUrl).toString();
  } catch {
    return null;
  }
}

function withCors(response: Response, cors: CorsContext): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", cors.origin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", cors.allowHeaders);
  headers.set(
    "Access-Control-Expose-Headers",
    "Content-Type, X-Vercel-AI-UI-Message-Stream"
  );
  headers.set("Access-Control-Max-Age", "86400");
  headers.set("Vary", "Origin");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function json(data: unknown, cors: CorsContext, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": cors.origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": cors.allowHeaders,
      "Access-Control-Expose-Headers": "Content-Type, X-Vercel-AI-UI-Message-Stream",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    },
  });
}

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

function getDishContextSummary(slug: string | undefined): string {
  if (!slug) return "";
  const dish = getDishBySlug(slug);
  if (!dish) return "";

  return [
    `Dish: ${dish.nameZh} (${dish.nameEn})`,
    `Category: ${dish.category}`,
    `Brief: ${dish.brief}`,
    `Welcome: ${dish.welcome}`,
    `Suggested Questions: ${dish.suggestedQuestions.join(" | ")}`,
    `Context Source: ${dish.contextSource}`,
  ].join("\n");
}

async function loadDishContextMarkdown(
  request: Request,
  env: Env,
  dishSlug: string | undefined
): Promise<string | null> {
  if (!dishSlug) return null;
  const dish = getDishBySlug(dishSlug);
  if (!dish) return null;

  const contextBase = resolveContextBaseUrl(request, env);
  const contextUrl = resolveContextUrl(contextBase, dish.contextPath);
  if (!contextUrl) return null;

  let task = contextMarkdownCache.get(contextUrl);
  if (!task) {
    task = (async () => {
      const response = await fetch(contextUrl, {
        method: "GET",
        headers: { Accept: "text/markdown,text/plain;q=0.9,*/*;q=0.1" },
      });
      if (!response.ok) {
        throw new Error(`Context fetch failed (${response.status}) for ${contextUrl}`);
      }
      const content = (await response.text()).trim();
      if (!content) {
        throw new Error(`Context is empty for ${contextUrl}`);
      }
      return content;
    })();
    contextMarkdownCache.set(contextUrl, task);
  }

  try {
    return await task;
  } catch {
    contextMarkdownCache.delete(contextUrl);
    return null;
  }
}

async function handleIntent(request: Request, env: Env, cors: CorsContext): Promise<Response> {
  const body = (await request.json()) as { query?: string };
  const query = (body.query ?? "").trim();
  if (!query) {
    return json({ matches: null }, cors);
  }

  const provider = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const result = await generateObject({
    model: provider("gemini-2.5-flash"),
    prompt: `You are an intent classifier for a Suzhou cuisine museum.

User query:
"${query}"

Catalog:
${DISH_REGISTRY.map((d) => `- ${d.slug}: ${d.nameZh} / ${d.nameEn}. ${d.brief}`).join("\n")}

Return the most likely dish matches. If unclear, return an empty list.`,
    schema: z.object({
      matches: z.array(
        z.object({
          dishSlug: z.string(),
          confidence: z.number().min(0).max(1),
        })
      ),
    }),
  });

  const validSlugs = new Set(DISH_REGISTRY.map((dish) => dish.slug));
  const matches = result.object.matches
    .filter((m) => validSlugs.has(m.dishSlug) && m.confidence >= 0.5)
    .sort((a, b) => b.confidence - a.confidence)
    .map((m) => m.dishSlug);

  return json({ matches: matches.length ? matches : null }, cors);
}

async function handleChat(request: Request, env: Env, cors: CorsContext): Promise<Response> {
  const body = (await request.json()) as IncomingBody;
  const dishSlug =
    typeof body.dishSlug === "string"
      ? body.dishSlug
      : typeof body.data?.dishSlug === "string"
        ? body.data.dishSlug
        : undefined;

  const dish = dishSlug ? getDishBySlug(dishSlug) : undefined;
  const normalizedMessages = normalizeMessages(body.messages);
  const fullContextMarkdown = await loadDishContextMarkdown(request, env, dishSlug);
  const contextSummary = getDishContextSummary(dishSlug);

  const systemPrompt = dish
    ? `你是「阿成饭店虚拟博物馆」的可爱导览员，也是资深苏帮菜文化讲解专家。

店名规范（必须遵守）：
- 中文名固定为：「阿成饭店」
- 英文名固定为："acheng restaurant"
- 不要把店名说成其他写法。

角色与语气：
- 亲切、可爱、热情，像在带观众参观博物馆。
- 同时保持专业、准确、清晰，像懂行的厨艺与饮食文化研究者。
- 乐于助人，愿意把复杂问题讲明白。
- 对苏帮菜文化有真实热爱和自己的见解，但不能脱离资料胡编。

语言规则（必须遵守）：
- 只看“最新一条用户消息”的主语言来决定输出语言，忽略此前 assistant 消息语言。
- 若最新用户消息主要是英文：必须全程英文回答（不要夹中文）。
- 若最新用户消息主要是中文：必须全程中文回答（必要时可补极短英文术语）。
- 若中英混合，以用户最后一句问题的主语言为准；除非用户明确要求切换语言。

回答原则：
- 先直接回答问题，再补充关键细节（做法、火候判断、历史背景、文化意义）。
- 内容必须以“已提供文档”与“菜品资料”为依据；不确定就明确说“文档没有直接证据”。
- 不要编造品牌、比例、年代、典故、人物或采访内容。
- 保持聚焦当前菜品：${dish.nameZh} (${dish.nameEn})。

当前菜品资料（结构化摘要）：
${contextSummary}

当前菜品完整文档（Markdown 原文）：
${fullContextMarkdown ?? "（完整文档加载失败，仅可使用结构化摘要回答）"}
`
    : `你是「阿成饭店虚拟博物馆」的可爱导览员与苏帮菜文化专家。

店名规范（必须遵守）：
- 中文名固定为：「阿成饭店」
- 英文名固定为："acheng restaurant"

语言规则（必须遵守）：
- 只看“最新一条用户消息”的主语言来决定输出语言，忽略此前 assistant 消息语言。
- 若最新用户消息主要是英文：必须全程英文回答（不要夹中文）。
- 若最新用户消息主要是中文：必须全程中文回答。
- 中英混合时，以用户最后一句问题的主语言回答。

请亲切、专业地回答，并优先引导用户先指定一道菜，再展开讲解。`;

  const provider = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const result = streamText({
    model: provider("gemini-2.5-flash"),
    system: systemPrompt,
    messages: await convertToModelMessages(normalizedMessages),
  });

  return withCors(result.toUIMessageStreamResponse(), cors);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors: CorsContext = {
      origin: resolveOrigin(request, env),
      allowHeaders: resolveAllowedHeaders(request),
    };
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": cors.origin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": cors.allowHeaders,
          "Access-Control-Expose-Headers": "Content-Type, X-Vercel-AI-UI-Message-Stream",
          "Access-Control-Max-Age": "86400",
          Vary: "Origin",
        },
      });
    }

    try {
      if (request.method === "GET" && url.pathname === "/api/health") {
        return json({ ok: true }, cors);
      }
      if (request.method === "POST" && url.pathname === "/api/intent") {
        return await handleIntent(request, env, cors);
      }
      if (request.method === "POST" && url.pathname === "/api/chat") {
        return await handleChat(request, env, cors);
      }

      return json({ error: "Not Found" }, cors, 404);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return json({ error: message }, cors, 500);
    }
  },
};
