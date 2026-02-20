import { DISH_REGISTRY } from "@/lib/ai-archive/dish-registry";

const DEFAULT_WORKER_BASE = "https://bootstrap.certaindragon3.workers.dev";
const WORKER_BASE = (
  process.env.NEXT_PUBLIC_AI_WORKER_URL || DEFAULT_WORKER_BASE
).replace(/\/$/, "");

function resolveApiPath(path: string): string {
  if (WORKER_BASE) {
    return `${WORKER_BASE}${path}`;
  }
  return path;
}

export function getChatApiPath(): string {
  return resolveApiPath("/api/chat");
}

function fallbackIntentMatch(query: string): string[] | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const keywordMap: Record<string, string[]> = {
    "squirrel-fish": ["松鼠桂鱼", "squirrel", "mandarin fish", "桂鱼", "sweet sour fish"],
    "hot-oil-eel": ["响油鳝糊", "eel", "鳝", "hot oil"],
    "lotus-stir-fry": ["荷塘小炒", "lotus", "藕", "foxnut", "ji tou mi"],
    "biluochun-shrimp": ["清炒虾仁", "shrimp", "虾仁", "biluochun"],
    "golden-soy-shrimp": ["金牌酱油虾", "soy shrimp", "酱油虾", "golden shrimp"],
    "assorted-delicacies": ["白什锦", "什锦", "clear broth", "assorted"],
    "crab-roe-tofu": ["蟹粉豆腐", "crab roe", "蟹粉", "tofu"],
    "salt-pepper-pork": ["椒盐排条", "pork strips", "椒盐", "排条"],
    "wine-lees-fish": ["糟溜黑鱼片", "wine lees", "糟溜", "snakehead fish", "黑鱼"],
    "sweet-sour-ribs": ["糖醋排骨", "sweet sour ribs", "糖醋", "ribs"],
    "whitebait-eggs": ["银鱼炒蛋", "whitebait", "银鱼", "eggs"],
    "red-bean-soup": ["赤豆圆子", "red bean", "圆子", "dessert"],
  };

  const scored = DISH_REGISTRY.map((dish) => {
    const haystack = `${dish.nameZh} ${dish.nameEn} ${dish.slug} ${dish.brief}`.toLowerCase();
    let score = 0;

    if (q.includes(dish.nameZh.toLowerCase()) || q.includes(dish.nameEn.toLowerCase())) {
      score += 10;
    }
    if (haystack.includes(q)) {
      score += 4;
    }

    const keywords = keywordMap[dish.slug] ?? [];
    for (const kw of keywords) {
      if (q.includes(kw.toLowerCase()) || kw.toLowerCase().includes(q)) {
        score += 3;
      }
    }

    return { slug: dish.slug, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return null;
  const top = scored[0].score;
  return scored
    .filter((item) => item.score >= Math.max(3, top - 1))
    .slice(0, 3)
    .map((item) => item.slug);
}

export async function routeDishIntentClient(query: string): Promise<string[] | null> {
  const trimmed = query.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const intentUrl = resolveApiPath("/api/intent");
    const response = await fetch(intentUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: trimmed }),
    });

    if (response.ok) {
      const json = (await response.json()) as { matches?: string[] | null };
      if (Array.isArray(json.matches)) {
        return json.matches;
      }
      if (json.matches === null) {
        return null;
      }
      console.warn("[ai-archive] intent response has unexpected payload", json);
    } else {
      const errorText = await response.text();
      console.warn("[ai-archive] intent request failed", {
        url: intentUrl,
        status: response.status,
        body: errorText.slice(0, 300),
      });
    }
  } catch (error) {
    console.warn("[ai-archive] intent network error", error);
    // fall through to local matcher
  }

  return fallbackIntentMatch(trimmed);
}
