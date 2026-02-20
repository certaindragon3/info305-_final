# 🥟 Acheng Restaurant Virtual Museum - AI Archive Epic

## 📋 Project Overview

**Project Name**: Acheng Restaurant Virtual Museum — AI Archive Extension  
**Objective**: Add an interactive AI-powered dish archive to the virtual museum, enabling visitors to explore 12 signature dishes through conversation, 3D models, and bilingual content.  
**Position**: Between `GallerySection` (Exhibition) and `AboutSection` (Philosophy) on the main page  
**Tech Stack**: Next.js 15, React 19, TypeScript, React Three Fiber, Vercel AI SDK, Transformers.js, MeMemo

---

## 🎯 Feature Vision

### Why AI Archive?

Static galleries don't cut it. You can't ask a photo *why* the oil needs to be at that exact temperature.

This archive lets visitors **talk to the dishes** — ask about ingredients, techniques, or the chef's philosophy. RAG keeps responses grounded in real interview transcripts and customer reviews, so the AI doesn't make stuff up.

**Three reasons this works:**
- **Just ask**: Don't know Suzhou food? Ask in plain language.
- **Go as deep as you want**: Browse casually or dig into technique.
- **Capture what cameras can't**: "一看二闻三摸" (look, smell, touch) — now queryable, not just displayed.

---

## 🏗️ Technical Architecture

### Core Tech Stack (Preserved)
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **3D**: React Three Fiber + Three.js + drei
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion (motion/react)

### AI Archive Tech Stack (New / Optimized)
| Layer | Tool | Purpose |
|-------|------|---------|
| **LLM Engine** | Gemini (via Vercel AI SDK) | Core text generation, streaming |
| **Intent/Routing** | Vercel AI SDK `generateObject` | Zero-shot classification of queries to 1 of 12 dishes |
| **RAG Retrieval** | Next.js Server Actions + lightweight vector search | Server-side embedding matching (no heavy client downloads) |
| **Storage** | Memory / Local JSON | Pre-computed embeddings for 12 dishes (tiny footprint) |
| **3D Models** | Tencent Hunyuan 3D Generation | GLB files for dish presentation |

### Hybrid RAG Pipeline (Server-Routing + Client-Chat)
```
1. GLOBAL SEARCH (View 1 & 2): User enters question
   → Next.js Server Action uses LLM or pre-computed vectors to classify intent
   → Returns target Dish Slug
   → Client transitions (View 1.5) and redirects to `/ai-archive/[slug]?q=question`

2. DISH CHAT (View 3): Page loads with query
   → Vercel AI SDK `useChat` initializes with the specific dish's context document
   → LLM streams contextual, grounded response back to user
```

---

## 🎨 Design System (Preserved)

> [!NOTE]
> All design tokens from the original project are preserved. Reference the archived `CLAUDE.md` for complete design documentation.

### Quick Reference

**Colors:**
- Background: `bg-slate-950`
- Accent: `text-orange-400` / `from-orange-400 to-orange-600`
- Borders: `border-orange-500/30`

**Typography:**
- Eyebrow: `text-xs font-semibold uppercase tracking-[0.35em] text-orange-400`
- Heading: `text-3xl font-bold text-white sm:text-4xl`
- Body: `text-base leading-relaxed text-slate-300`

**Cards:**
- `bg-slate-900/80 border border-orange-500/30 backdrop-blur-xl rounded-2xl`

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Main scroll page (add AIArchiveSection)
│   └── ai-archive/
│       └── [slug]/page.tsx         # Dish chat pages
├── components/
│   ├── sections/
│   │   └── AIArchiveSection.tsx    # Home view with search
│   ├── ai-archive/                 # NEW FOLDER
│   │   ├── ArchiveHomeView.tsx     # Hero + search entry
│   │   ├── DishBrowseGrid.tsx      # Card grid with 3D previews
│   │   ├── DishChatView.tsx        # Split-panel chat interface
│   │   ├── DishCard.tsx            # Individual dish card
│   │   └── ChatPanel.tsx           # Message list + input
│   └── 3d/
│       └── DishModel.tsx           # Hunyuan model loader
├── lib/
│   ├── ai-archive/                 # NEW FOLDER
│   │   ├── dishes.ts               # 12-dish data registry
│   │   ├── rag.ts                  # Embedding + search logic
│   │   └── types.ts                # TypeScript interfaces
│   └── data.ts                     # Existing data (preserved)
docs/
├── ai-archive/                     # NEW FOLDER - Context documents
│   ├── README.md                   # Source mapping
│   ├── golden-soy-shrimp.md        # 金牌酱油虾
│   ├── assorted-delicacies.md      # 白什锦
│   ├── crab-roe-tofu.md            # 蟹粉豆腐
│   ├── salt-pepper-pork.md         # 椒盐排条
│   ├── wine-lees-fish.md           # 糟溜黑鱼片
│   ├── sweet-sour-ribs.md          # 糖醋排骨
│   ├── whitebait-eggs.md           # 银鱼炒蛋
│   └── red-bean-soup.md            # 赤豆圆子
└── interview_transcript.md         # Existing - context for 4 dishes
public/
├── models/ai-archive/              # NEW FOLDER - Hunyuan GLB models
├── images/ai-archive/              # NEW FOLDER - Dish photos
└── models/                         # Existing 3D models (preserved)
```

---

## 🍜 12 Dishes Registry

### Existing Dishes (Context: `interview_transcript.md`)

| ID | 中文名 | English Name | Slug |
|----|--------|--------------|------|
| 1 | 松鼠桂鱼 | Squirrel Mandarin Fish | `squirrel-fish` |
| 2 | 响油鳝糊 | Sizzling Eel | `hot-oil-eel` |
| 3 | 荷塘小炒 | Lotus Pond Stir-fry | `lotus-stir-fry` |
| 4 | 清炒虾仁 | Stir-fried Shrimp | `biluochun-shrimp` |

### New Dishes (Context: `/docs/ai-archive/*.md` — Dianping Reviews)

| ID | 中文名 | English Name | Slug | Context File |
|----|--------|--------------|------|--------------|
| 5 | 金牌酱油虾 | Golden Soy Sauce Shrimp | `golden-soy-shrimp` | `golden-soy-shrimp.md` |
| 6 | 白什锦 | Assorted Delicacies in Clear Broth | `assorted-delicacies` | `assorted-delicacies.md` |
| 7 | 蟹粉豆腐 | Tofu with Crab Roe | `crab-roe-tofu` | `crab-roe-tofu.md` |
| 8 | 椒盐排条 | Salt and Pepper Pork Strips | `salt-pepper-pork` | `salt-pepper-pork.md` |
| 9 | 糟溜黑鱼片 | Wine Lees Sliced Snakehead Fish | `wine-lees-fish` | `wine-lees-fish.md` |
| 10 | 糖醋排骨 | Sweet and Sour Pork Ribs | `sweet-sour-ribs` | `sweet-sour-ribs.md` |
| 11 | 银鱼炒蛋 | Scrambled Eggs with Whitebait | `whitebait-eggs` | `whitebait-eggs.md` |
| 12 | 赤豆圆子 | Sweet Red Bean Soup with Rice Balls | `red-bean-soup` | `red-bean-soup.md` |

> [!IMPORTANT]
> **Context Source Distinction:**
> - **Existing 4 dishes**: Rich context from chef interview transcript (techniques, philosophy, tacit knowledge)
> - **New 8 dishes**: Context from authentic Dianping customer reviews (taste, presentation, value feedback)

---

## 📊 Data Structures

```typescript
// lib/ai-archive/types.ts

interface DishArchiveEntry {
  id: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  category: 'signature' | 'classic' | 'dessert';
  
  // Visual assets
  thumbnail: string;           // /images/ai-archive/{slug}.jpg
  model3D: string;             // /models/ai-archive/{slug}.glb
  
  // RAG context
  contextSource: 'interview' | 'dianping';
  contextPath: string;         // Path to markdown context doc
  
  // Display content (from context document frontmatter)
  brief: string;               // 2-3 sentence dish description for info card
  welcome: string;             // AI opening message (bilingual)
  suggestedQuestions: string[]; // 2-3 clickable prompts
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  dishId: string;
}

interface EmbeddingChunk {
  text: string;
  embedding: number[];
  source: 'interview' | 'observation' | 'review' | 'recipe';
  dishId: string;
}
```

---

## 🖼️ Interface Architecture

### View 1: Home Page (Integrated Section)

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ☁️ STEAM EFFECT ☁️                              │
│                        🍲 3D Clay Pot                               │
│                                                                     │
│         ╭──────────────────────────────────────────────╮            │
│         │  ✨ AI-POWERED CULINARY ARCHIVE ✨            │            │
│         ╰──────────────────────────────────────────────╯            │
│                                                                     │
│                    Archive of Flavors                               │
│         Converse with AI to uncover the stories...                  │
│                                                                     │
│        ┌─────────────────────────────────────────────────┐          │
│        │ 💬 Ask AI anything about Suzhou dishes...       │          │
│        │                                          [🔍]   │          │
│        └─────────────────────────────────────────────────┘          │
│                                                                     │
│        💡 Try asking:                                               │
│            「为什么叫松鼠桂鱼？」                                    │
│            「金牌酱油虾的酱油是什么牌子？」                          │
│            「糖醋排骨的糖醋比例是多少？」                            │
│                                                                     │
│                 [ ✨ Explore All 12 Dishes → ]                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Suggested Questions (dish-specific):**
- 为什么叫松鼠桂鱼？ / Why is it called Squirrel Fish?
- 金牌酱油虾的酱油是什么牌子？ / What makes Golden Soy Shrimp "golden"?
- 糖醋排骨的糖醋比例是多少？ / What's the sweet-sour ratio for the ribs?

**Pill Behavior:** Click fills input only; user must click 🔍 to search.

---

### View 1.5: Search Matching Flow (Transition State)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│                     ✨ ✨ ✨ ✨ ✨ ✨ ✨                               │
│                                                                     │
│              ┌─────────────────────────────────┐                    │
│              │                                 │                    │
│              │    Analyzing your question...   │                    │
│              │    [AI Processing Animation]    │                    │
│              │                                 │                    │
│              └─────────────────────────────────┘                    │
│                                                                     │
│                         ↓ (on match)                                │
│                                                                     │
│              ┌─────────────────────────────────┐                    │
│              │  ✅ Found: 松鼠桂鱼              │                    │
│              │     Squirrel Mandarin Fish      │                    │
│              │                                 │                    │
│              │     Entering Archive...         │                    │
│              └─────────────────────────────────┘                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**State Machine (Routing Flow):**

```
IDLE (View 1 or View 2)
    │ User submits question
    ▼
ANALYZING (View 1.5)
    │ Next.js Server Action (`routeDishIntent`)
    │ (Uses Vercel AI SDK generateObject or Vector similarity)
    ▼
┌───┴───────────────────┐
│                       │
▼                       ▼
MATCHED (Dish Identified) NO_CLEAR_MATCH
    │                       │
    ▼                       ▼
┌─────────────────┐   ┌──────────────────────────────┐
│ Show "Found"    │   │ Show recommendation cards    │
│ + dish name     │   │ (Unable to identify dish)    │
│                 │   │                              │
│ Redirect to     │   │ [ Browse All Dishes → ]      │
│ /ai-archive/    │   └──────────────────────────────┘
│ {slug}?q={query}│
└─────────────────┘
```

**Behavior Rules:**

| Scenario | Condition | Action |
|----------|-----------|--------|
| Intent Matched | Server Action identifies specific dish | Show "Found: {dish}" → push to `/ai-archive/{slug}?q={encoded_query}` |
| General Query / Unmatched | Action returns null | Show "Couldn't match a specific dish." → Prompt to browse all dishes. |

**Animation:** Seamless transition using Framer Motion while the Server Action resolves.
**Data Handoff:** The query is passed via URL parameters `?q=` so the specific dish page can immediately trigger the AI response upon loading.

---

### View 2: Browse Mode (Grid)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back                                      [🔍 Search]  [Filter]  │
├─────────────────────────────────────────────────────────────────────┤
│   ┌───────────────────────┐    ┌───────────────────────┐            │
│   │    ╭─────────────╮    │    │    ╭─────────────╮    │            │
│   │    │   🐟 3D     │    │    │    │   🦐 3D     │    │            │
│   │    │  (rotate)   │    │    │    │  (rotate)   │    │            │
│   │    ╰─────────────╯    │    │    ╰─────────────╯    │            │
│   │  **松鼠桂鱼**         │    │  **金牌酱油虾**       │            │
│   │  Squirrel Fish        │    │  Golden Soy Shrimp    │            │
│   │  [ Chat with AI → ]   │    │  [ Chat with AI → ]   │            │
│   └───────────────────────┘    └───────────────────────┘            │
│   ...12 cards total...                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### View 3: Chat Interface (Split Panel)

```
┌────────────────────────────────┬────────────────────────────────────┐
│  LEFT PANEL                      │  RIGHT PANEL: Chat               │
│                                  │                                  │
│    ╭──────────────────────╮    │   ┌──────────────────────────┐    │
│    │       🐟 3D MODEL      │    │   │ 🤖 AI Welcome             │    │
│    │     ↻ drag to rotate  │    │   │                          │    │
│    ╮──────────────────────╯    │   │ 欢迎来到松鼠桂鱼档案！   │    │
│                                  │   │ 这道菜以精湛刀工和酸甜   │    │
│  ╔══════════════════════════╗  │   │ 卤汁著称。有什么想了解的？ │    │
│  ║ 松鼠桂鱼                   ║  │   └──────────────────────────┘    │
│  ║ Squirrel Mandarin Fish   ║  │                                  │
│  ╟──────────────────────────╢  │   ┌──────────────────────────┐    │
│  ║ 苏帮名菜，以精湛刀工将鳃 ║  │   │ 👤 You                   │    │
│  ║ 鱼改成松鼠形，外酥里嫩， ║  │   │ How hot should the oil   │    │
│  ║ 浇上酸甜卤汁。           ║  │   │ be?                      │    │
│  ╟──────────────────────────╢  │   └──────────────────────────┘    │
│  ║ 💡 试试问：                ║  │                                  │
│  ║ • 为什么叫松鼠鱼？         ║  │   ┌──────────────────────────┐    │
│  ║ • 油温怎么判断？           ║  │   │ 🤖 AI                    │    │
│  ╚══════════════════════════╝  │   │ The oil should be...     │    │
│                                  │   └──────────────────────────┘    │
│                                  ├──────────────────────────────────┤
│                                  │  ┌────────────────────────────┐   │
│                                  │  │ Ask about this dish...     │   │
│                                  │  └────────────────────────────┘   │
└────────────────────────────────┴──────────────────────────────────┘
```

**Left Panel Components:**
- **3D Model Viewer**: Hunyuan-generated GLB model with OrbitControls
- **Dish Info Card**: Bilingual title + 2-3 line description + clickable suggested questions

**Right Panel Components:**
- **AI Welcome Message**: Auto-generated from context document `welcome` field
- **Chat History**: Scrollable message list with user/AI bubbles
- **Input Box**: Text input with send button

---

## 🚀 Epic 7: AI Archive Implementation

### Story 7.1: Archive Section Integration ✅
**As a visitor**, I want the AI Archive to appear naturally in the museum scroll  
**So that** I can discover this feature while browsing

**Acceptance Criteria:**
- [x] Create `AIArchiveSection.tsx` component
- [x] Integrate between `GallerySection` and `AboutSection` in `page.tsx`
- [x] Match existing section styling (gradient backgrounds, spacing)
- [x] Add to floating dock navigation
- [x] WebGL steam effect with drei `<Cloud>` covering section top
- [x] 3D clay pot model with rotation animation
- [x] Dish-specific suggested questions
- [x] Pill click fills input only (no auto-search)

**Technical Notes:**
- Use lazy loading with Suspense (consistent with other sections)
- Apply `SectionLoader` fallback pattern
- Dish registry created at `src/lib/ai-archive/dish-registry.ts`

---

### Story 7.2: Home View Implementation
**As a visitor**, I want a welcoming entry point with bilingual prompt  
**So that** I understand I can ask questions about dishes

**Acceptance Criteria:**
- [x] Display bilingual hero text (今天你想吃什么? / What would you like...)
- [x] Implement search input with placeholder suggestions
- [x] Add animated suggestion pills
- [x] Create "View All Dishes" entry button

**Component Guidelines:**
> [!TIP]
> **Use shadcn MCP** to search the registry for suitable input/button components.  
> **Prioritize reuse** of existing components (e.g., `InteractiveHoverButton` from Hero).

---

### Story 7.3: Browse View (Dish Cards) ✅
**As a visitor**, I want to browse all 12 dishes visually  
**So that** I can choose which to explore

**Acceptance Criteria:**
- [x] Create responsive grid layout (2-4 columns)
- [x] Implement `DishCard` with embedded 3D model preview
- [x] Add bilingual dish names + brief description
- [x] Include "Chat with AI" CTA per card
- [x] Add category filter (signature/classic/dessert)

**Component Guidelines:**
> [!TIP]
> Consider reusing card patterns from `GallerySection.tsx` (Spotlight effect, hover states).

---

### Story 7.4: Chat View Implementation
**As a visitor**, I want a split-panel chat interface  
**So that** I can view the 3D model and dish info while conversing

**Acceptance Criteria:**
- [ ] Left panel: Interactive 3D model (Hunyuan GLB) at top
- [ ] Left panel: Dish info card below model (bilingual title + brief + suggested questions)
- [ ] Right panel: AI welcome message on load (from context doc `welcome` field)
- [ ] Right panel: Chat message list + input
- [ ] Suggested questions are clickable and populate input
- [ ] Persist chat history per dish (IndexedDB)
- [ ] Stream AI responses

**Technical Implementation:**
- Use Vercel AI SDK `useChat` hook
- Create `/api/chat/route.ts` for Gemini integration
- Inject dish context into system prompt
- Load `brief`, `welcome`, `suggestedQuestions` from context document frontmatter

---

### Story 7.5: Intent Routing & RAG Integration
**As a visitor**, I want the system to understand my question and direct me to the right place  
**So that** I don't have to manually search through all the dishes

**Acceptance Criteria:**
- [ ] Create Next.js Server Action `routeDishQuery(query: string)`
- [ ] Implement Vercel AI SDK `generateObject` for zero-shot classification OR pre-compute simple embeddings for the 12 dishes.
- [ ] Create View 1.5 loading state while action resolves.
- [ ] On match, automatically redirect to `/ai-archive/[slug]?q={query}`.
- [ ] On destination page, extract the `q` parameter and auto-trigger the Vercel AI SDK `useChat` submit function.
- [ ] Inject the specific dish's markdown context document into the `useChat` system prompt.

**Context Injection (Server-Side):**
```typescript
// /api/chat/route.ts
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages, dishSlug } = await req.json();
  const context = await loadDishContext(dishSlug); // Loads local .md file
  
  const systemPrompt = `You are a museum AI... Use this context to answer: \n\n${context}`;
  
  const result = await streamText({
    model: google('models/gemini-2.5-flash'),
    system: systemPrompt,
    messages,
  });
  
  return result.toDataStreamResponse();
}
```

---

### Story 7.6: 3D Model Integration
**As a visitor**, I want rotatable 3D dish models  
**So that** I can examine dishes from all angles

**Acceptance Criteria:**
- [ ] Create `DishModel.tsx` component with drei loader
- [ ] Implement OrbitControls with constrained rotation
- [ ] Add loading skeleton during model fetch
- [ ] Support GLB format (Hunyuan output only)

**Asset Paths:**
```
/public/models/ai-archive/{slug}.glb  # Hunyuan AI-generated models
```

---

## 🔍 Development Guidelines

### Component Discovery
> [!IMPORTANT]
> Before implementing new UI components, **use shadcn MCP** to search the registry for existing solutions.  
> Command: Search `@shadcn/ui` registry for components matching your needs.

### Component Reuse Priority
1. **First**: Check `/components/ui/` for existing shadcn components
2. **Second**: Check Aceternity UI components already imported
3. **Third**: Check existing section components for reusable patterns
4. **Last**: Create new custom components

### Existing Reusable Components
| Component | Location | Reuse For |
|-----------|----------|-----------|
| `InteractiveHoverButton` | Aceternity UI | Action buttons |
| `Spotlight` | Aceternity UI | Card highlights |
| `InfiniteMovingCards` | Aceternity UI | Testimonial strips |
| `BackgroundGradientAnimation` | Aceternity UI | Section backgrounds |
| `DirectionAwareHover` | Aceternity UI | Interactive cards |

---

## 📈 Success Metrics

### Technical Metrics
- **Load Time**: < 3 seconds for initial section view
- **Embedding Init**: < 5 seconds for Transformers.js model load
- **3D Performance**: 60fps model rotation on mid-range devices
- **RAG Latency**: < 500ms for context retrieval

### User Experience Metrics
- **Accessibility**: WCAG 2.1 AA compliance
- **Bilingual**: All UI text in Chinese + English
- **Mobile**: Responsive chat interface on small screens
- **Retention**: Chat history persists across sessions

---

## 📎 Asset Checklist

### Required Assets (To Be Provided)
- [ ] **3D Models**: 12 Hunyuan-generated GLB files → `/public/models/ai-archive/`
- [ ] **Photos**: 12 high-res dish images → `/public/images/ai-archive/`
- [ ] **Context**: 8 Dianping review documents → `/docs/ai-archive/*.md`

### Already Available
- [x] **Interview transcript**: `/docs/interview_transcript.md` (4 dishes)
- [x] **Folder structure**: Created and ready for assets
