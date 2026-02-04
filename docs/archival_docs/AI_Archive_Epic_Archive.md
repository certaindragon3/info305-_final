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

### AI Archive Tech Stack (New)
| Layer | Tool | Purpose |
|-------|------|---------|
| **LLM** | Gemini (via Vercel AI SDK) | Streaming responses, multilingual |
| **Embeddings** | Transformers.js (gte-small) | Browser-side embedding (~30MB) |
| **Vector Search** | MeMemo / client-vector-search | IndexedDB-backed, no server |
| **Storage** | IndexedDB | Embeddings + chat history |
| **3D Models** | Tencent Hunyuan 3D Generation | GLB files for dish presentation |

### Client-Side RAG Pipeline
```
User query → Transformers.js generates embedding
           → MeMemo searches IndexedDB for closest dish
           → Dish context injected into Gemini prompt
           → Vercel AI SDK streams response back
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
│   ├── jinpai-jiangyou-xia.md      # 金牌酱油虾
│   ├── bai-shijin.md               # 白什锦
│   ├── xianrou-caifan.md           # 咸肉菜饭
│   ├── jiaoyan-paitiao.md          # 椒盐排条
│   ├── zaoliu-heiyu-pian.md        # 糟溜黑鱼片
│   ├── tangcu-paigu.md             # 糖醋排骨
│   ├── yinyu-chaodan.md            # 银鱼炒蛋
│   └── chidou-yuanzi.md            # 赤豆圆子
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
| 1 | 松鼠桂鱼 | Squirrel Mandarin Fish | `songshu-guiyu` |
| 2 | 响油鳝糊 | Sizzling Eel | `xiangyou-shanhu` |
| 3 | 荷塘小炒 | Lotus Pond Stir-fry | `hetang-xiaochao` |
| 4 | 清炒虾仁 | Stir-fried Shrimp | `qingchao-xiaren` |

### New Dishes (Context: `/docs/ai-archive/*.md` — Dianping Reviews)

| ID | 中文名 | English Name | Slug | Context File |
|----|--------|--------------|------|--------------|
| 5 | 金牌酱油虾 | Golden Soy Sauce Shrimp | `jinpai-jiangyou-xia` | `jinpai-jiangyou-xia.md` |
| 6 | 白什锦 | Mixed Vegetables | `bai-shijin` | `bai-shijin.md` |
| 7 | 咸肉菜饭 | Salted Pork Rice | `xianrou-caifan` | `xianrou-caifan.md` |
| 8 | 椒盐排条 | Salt & Pepper Pork Strips | `jiaoyan-paitiao` | `jiaoyan-paitiao.md` |
| 9 | 糟溜黑鱼片 | Wine-Lees Black Fish | `zaoliu-heiyu-pian` | `zaoliu-heiyu-pian.md` |
| 10 | 糖醋排骨 | Sweet & Sour Ribs | `tangcu-paigu` | `tangcu-paigu.md` |
| 11 | 银鱼炒蛋 | Silverfish Scrambled Eggs | `yinyu-chaodan` | `yinyu-chaodan.md` |
| 12 | 赤豆圆子 | Red Bean Dumplings | `chidou-yuanzi` | `chidou-yuanzi.md` |

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
  category: 'signature' | 'classic' | 'seasonal' | 'dessert';
  
  // Visual assets
  thumbnail: string;           // /images/ai-archive/{slug}.jpg
  model3D: string;             // /models/ai-archive/{slug}.glb
  lidarScan?: string;          // Optional USDZ LiDAR
  
  // RAG context
  contextSource: 'interview' | 'dianping';
  contextPath: string;         // Path to markdown context doc
  
  // Display
  briefDescription: string;    // 1-2 sentence teaser for cards
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
│                                                                     │
│           ╔═══════════════════════════════════════════╗             │
│           ║      今天你想吃什么？                     ║             │
│           ║      What would you like to eat today?    ║             │
│           ╚═══════════════════════════════════════════╝             │
│                                                                     │
│        ┌─────────────────────────────────────────────────┐          │
│        │  Ask me anything about Suzhou cuisine...        │          │
│        │                                          [🔍]   │          │
│        └─────────────────────────────────────────────────┘          │
│                                                                     │
│        💡 Try: "What makes Squirrel Fish special?"                  │
│            "Show me dishes with river shrimp"                       │
│            "How does Chef Shen judge freshness?"                    │
│                                                                     │
│                    [ View All Dishes → ]                            │
└─────────────────────────────────────────────────────────────────────┘
```

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
│                                │   ┌──────────────────────────┐    │
│    ╭──────────────────────╮    │   │ 🤖 AI                    │    │
│    │     🐟 3D MODEL      │    │   │ Squirrel Fish is the     │    │
│    │   ↻ drag to rotate   │    │   │ crown jewel of Suzhou... │    │
│    ╰──────────────────────╯    │   └──────────────────────────┘    │
│                                │                                    │
│    ┌────────────────────┐      │   ┌──────────────────────────┐    │
│    │ 📷 Toggle: AI Model│      │   │ 👤 You                   │    │
│    │    ○ LiDAR Scan    │      │   │ How hot should the oil   │    │
│    └────────────────────┘      │   │ be?                      │    │
│                                │   └──────────────────────────┘    │
│                                ├────────────────────────────────────┤
│                                │  ┌────────────────────────────┐   │
│                                │  │ Ask about this dish...     │   │
│                                │  └────────────────────────────┘   │
└────────────────────────────────┴────────────────────────────────────┘
```

---

## 🚀 Epic 7: AI Archive Implementation

### Story 7.1: Archive Section Integration
**As a visitor**, I want the AI Archive to appear naturally in the museum scroll  
**So that** I can discover this feature while browsing

**Acceptance Criteria:**
- [ ] Create `AIArchiveSection.tsx` component
- [ ] Integrate between `GallerySection` and `AboutSection` in `page.tsx`
- [ ] Match existing section styling (gradient backgrounds, spacing)
- [ ] Add to floating dock navigation

**Technical Notes:**
- Use lazy loading with Suspense (consistent with other sections)
- Apply `SectionLoader` fallback pattern

---

### Story 7.2: Home View Implementation
**As a visitor**, I want a welcoming entry point with bilingual prompt  
**So that** I understand I can ask questions about dishes

**Acceptance Criteria:**
- [ ] Display bilingual hero text (今天你想吃什么? / What would you like...)
- [ ] Implement search input with placeholder suggestions
- [ ] Add animated suggestion pills
- [ ] Create "View All Dishes" entry button

**Component Guidelines:**
> [!TIP]
> **Use shadcn MCP** to search the registry for suitable input/button components.  
> **Prioritize reuse** of existing components (e.g., `InteractiveHoverButton` from Hero).

---

### Story 7.3: Browse View (Dish Cards)
**As a visitor**, I want to browse all 12 dishes visually  
**So that** I can choose which to explore

**Acceptance Criteria:**
- [ ] Create responsive grid layout (2-4 columns)
- [ ] Implement `DishCard` with embedded 3D model preview
- [ ] Add bilingual dish names + brief description
- [ ] Include "Chat with AI" CTA per card
- [ ] Add category filter (signature/classic/seasonal/dessert)

**Component Guidelines:**
> [!TIP]
> Consider reusing card patterns from `GallerySection.tsx` (Spotlight effect, hover states).

---

### Story 7.4: Chat View Implementation
**As a visitor**, I want a split-panel chat interface  
**So that** I can view the 3D model while conversing

**Acceptance Criteria:**
- [ ] Left panel: Interactive 3D model (Hunyuan GLB)
- [ ] Right panel: Chat message list + input
- [ ] Model toggle: AI-generated ↔ LiDAR scan (if available)
- [ ] Persist chat history per dish (IndexedDB)
- [ ] Stream AI responses

**Technical Implementation:**
- Use Vercel AI SDK `useChat` hook
- Create `/api/chat/route.ts` for Gemini integration
- Inject dish context into system prompt

---

### Story 7.5: RAG Pipeline Integration
**As a visitor**, I want AI responses grounded in real documentation  
**So that** I get accurate, source-backed information

**Acceptance Criteria:**
- [ ] Initialize Transformers.js with `gte-small` model
- [ ] Pre-compute embeddings for all context documents
- [ ] Store embeddings in IndexedDB via MeMemo
- [ ] Implement semantic search on user query
- [ ] Inject top-k chunks into Gemini prompt

**Context Routing:**
```typescript
// Pseudo-logic for context selection
if (dish.contextSource === 'interview') {
  loadContext('/docs/interview_transcript.md', dish.slug);
} else {
  loadContext(`/docs/ai-archive/${dish.slug}.md`);
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
- [ ] Support GLB format (Hunyuan output)
- [ ] Optional: USDZ toggle for LiDAR scans

**Asset Paths:**
```
/public/models/ai-archive/{slug}.glb  # Hunyuan models
/public/models/ai-archive/{slug}.usdz # LiDAR scans (optional)
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
