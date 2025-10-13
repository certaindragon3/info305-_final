# 🥟 Acheng Restaurant Virtual Museum - Project Epic

## 📋 Project Overview

**Project Name**: Acheng Restaurant Virtual Museum
**Objective**: Create an immersive virtual museum website to preserve and showcase Subang cuisine culture, focusing on Acheng Restaurant as a cultural heritage case study.
**Target Audience**: Academic researchers, cultural preservation enthusiasts, food history scholars
**Timeline**: Academic semester project
**Tech Stack**: Next.js 15, React 19, TypeScript, React Three Fiber, Tailwind CSS, shadcn/ui

---

## 🎯 Project Vision

### Problem Statement
Labor-intensive traditional Subang cuisine techniques are disappearing in modern fast-paced society. Acheng Restaurant, established in 1999, represents a critical cultural heritage that needs digital preservation.

### Solution
A research-driven digital micro-museum that translates academic fieldwork into an engaging public interface:
- Ethnographic documentation with interactive 3D models
- Theory-grounded cultural analysis (human-food interaction, intangible heritage)
- Multi-vocal storytelling (chef, customers, researcher perspectives)
- Accessible academic content without sacrificing visual appeal

### Project Positioning
**Between academic rigor and public engagement** — not a commercial website with academic polish, but a serious research project with public-friendly presentation. Think: NYT Interactive Features meets academic ethnography.

---

## 🏗️ Technical Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **3D**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion (motion/react) + tw-animate-css
- **UI Components**: shadcn/ui + Aceternity UI + Magic UI
- **Deployment**: Static generation (no backend required)

### Design System & Style Guidelines

#### Color Palette
- **Background**: `bg-slate-950` (deep black foundation)
- **Text**:
  - Primary: `text-white` / `text-slate-100`
  - Secondary: `text-slate-300`
  - Tertiary: `text-slate-400` / `text-slate-500`
- **Accent Color** (Orange Spectrum):
  - Primary: `text-orange-400` (main accent)
  - Hover: `text-orange-500`
  - Deep: `text-orange-600`
  - Gradients: `from-orange-400 to-orange-600`
- **Borders**:
  - Subtle: `border-white/10` / `border-slate-700`
  - Accent: `border-orange-500/20` ~ `border-orange-500/30`

#### Typography Hierarchy
- **Eyebrow/Label** (Small Headers):
  - Classes: `text-xs font-semibold uppercase tracking-[0.35em] text-orange-400`
  - Alternative: `tracking-[0.3em]` or `tracking-[0.45em]` for different spacing
  - Usage: Section labels, badges, metadata

- **Main Headings**:
  - H1: `text-4xl font-extrabold tracking-tight text-white sm:text-6xl`
  - H2: `text-3xl font-bold text-white sm:text-4xl`
  - H3: `text-2xl font-bold text-white sm:text-3xl`

- **Body Text**:
  - Primary: `text-base leading-relaxed text-slate-300`
  - Secondary: `text-sm text-slate-400`

- **Accented Text**:
  - Gradient: `bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent`
  - Light: `text-orange-400/90`

#### Component Patterns

**Section Structure**:
```tsx
<section className="relative overflow-hidden bg-slate-950 py-24 text-slate-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
  {/* Gradient backgrounds */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.15),_transparent_60%)]" />

  {/* Content container */}
  <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 lg:px-8">
    {/* Section header */}
    <header className="relative z-[1] mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400">
        Eyebrow Label
      </p>
      <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
        Main Section Title
      </h2>
      <p className="mt-4 text-base text-slate-300">
        Section description text
      </p>
    </header>
  </div>
</section>
```

**Card/Container Styling**:
- Background: `bg-slate-900/80` or `bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80`
- Border: `border border-orange-500/30` or `border-white/10`
- Effects: `backdrop-blur-xl shadow-2xl shadow-orange-500/10`
- Rounded corners: `rounded-2xl` or `rounded-3xl`

**Badge/Pill Components**:
```tsx
<span className="rounded-full bg-orange-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">
  Label Text
</span>
```

**Decorative Elements**:
- Divider lines: `<div className="h-px bg-gradient-to-r from-orange-500/50 via-orange-500/20 to-transparent" />`
- Glow orbs: `<div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />`
- Line accents: `<div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />`

#### Animation Guidelines
- **Scroll Animations**: Use Framer Motion's `whileInView` with `viewport={{ once: true }}`
- **Transitions**: `transition={{ type: "spring", stiffness: 100, damping: 20 }}`
- **Hover Effects**: `transition-all duration-300` or `duration-500`
- **Scale on Hover**: `hover:scale-105`
- **Glow Effects**: `hover:shadow-orange-500/50`

#### Content Guidelines
- **NO EMOJIS** in production content (academic/professional context)
- Use proper English academic writing style with accessible language
- Incorporate authentic fieldwork interview quotes with proper attribution
- Maintain cultural sensitivity and accuracy
- Focus on heritage preservation narrative
- **Tone**: Academic but not dense; informative but not promotional
- **Voice**: From "marketing persuasion" to "ethnographic exposition"
- Replace subjective praise ("amazing", "best") with objective description
- Add source citations and methodological transparency where appropriate

#### Spacing & Layout
- Section padding: `py-24`
- Content gap: `gap-20` (between major sections)
- Card padding: `p-10 md:p-16`
- Max width: `max-w-7xl` (main container)
- Centered content: `max-w-3xl` (for text blocks)

### Project Structure
```
src/
├── app/
│   ├── page.tsx              # Main scroll page
│   ├── dishes/[slug]/page.tsx # Dish detail pages
│   └── layout.tsx            # Global layout
├── components/
│   ├── sections/             # Page sections
│   ├── dish/                 # Dish-related components
│   ├── 3d/                   # 3D components
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── data.ts              # Static data store
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Utility functions
└── public/
    ├── models/              # GLB 3D models
    ├── images/              # Photography assets
    └── audio/               # Chef voice notes
    └── videos/               # Supporting videos
```

---

## 🧭 Fieldwork Dish Context

- Signature: 松鼠桂鱼 (Squirrel Fish)
- Others: 荷塘小炒 (Lotus Pond Stir-fry), 碧螺虾仁 (Biluochun Tea Shrimp), 响油鳝糊 (Hot Oil Eel)

This set drives gallery cards, routes, and related content.

---

## 📊 Data Structure Design

### Core Data Models

```typescript
interface Dish {
  id: string;
  slug: string;
  name: string;
  nameZh: string;
  category: 'signature' | 'classic' | 'seasonal' | 'special';
  isSignature: boolean;
  description: string;
  story: string;
  recipe: {
    ingredients: string[];
    steps: string[];
    cookingTime: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  media: {
    model3D: string;
    images: string[];
    audio?: string;
  };
  chef?: {
    name: string;
    note: string;
    voiceNote?: string;
  };
  culturalSignificance: string;
}

interface Restaurant {
  name: string;
  history: string;
  location: string;
  established: string;
  philosophy: string;
  layout: {
    description: string;
    zones: Array<{
      name: string;
      description: string;
      position: { x: number; y: number };
    }>;
  };
}

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
}

interface Philosophy {
  id: string;
  slug: string; // 'seasonal-sourcing' | 'sincerity-craft' | 'grounded-approach'
  titleZh: string;
  titleEn: string;
  subtitle: string; // Academic positioning from final_report
  heroVisual: {
    type: 'video' | 'image' | '3d-scene';
    src: string;
  };

  // Core concept map (for React Flow visualization)
  conceptMap: {
    nodes: Array<{
      id: string;
      label: string;
      description: string;
      category: 'core-value' | 'practice' | 'outcome' | 'constraint';
    }>;
    edges: Array<{
      from: string;
      to: string;
      relationship: 'enables' | 'conflicts-with' | 'derives-from';
    }>;
  };

  // Ethnographic evidence
  fieldworkEvidence: {
    interviewQuotes: Array<{
      speaker: '沈师傅' | '顾客' | '观察笔记';
      timestamp?: string; // Audio timestamp if available
      content: string;
      context: string;
      audioClip?: string; // 5-15 second audio snippet
    }>;
    observationalData: {
      photos: string[];
      videos: string[];
      captions: string[]; // Field note-style descriptions
    };
  };

  // Academic framing
  academicContext: {
    researchQuestion: string;
    theoreticalLens: string[]; // e.g., ['embodied knowledge', 'intangible heritage']
    keyReferences: Array<{
      citation: string;
      relevance: string;
    }>;
  };

  // Cross-references
  relatedDishes: string[]; // dish slugs
  relatedPhilosophies: string[];
}

interface EthnographicEntry {
  // Spatial entry (street to kitchen)
  spatialEntry: {
    streetView: {
      video: string;
      voiceoverScript: string; // Academic narration
    };
    layoutDiagram: {
      type: 'interactive-svg' | 'three-js-floorplan';
      zones: Array<{
        id: string;
        nameZh: string;
        nameEn: string;
        dimensions: string;
        activities: string[];
        observationalNote: string;
      }>;
    };
    ethnographicNote: string; // From final_report
  };

  // Methodology transparency
  methodologyDisclosure: {
    date: string;
    duration: string;
    methods: Array<{
      method: string;
      description: string;
      constraints?: string;
      audioAvailable?: boolean;
    }>;
    ethicsStatement: {
      consent: string;
      privacy: string;
      ownerReview: string;
    };
  };

  // Labor ethnography
  laborEthnography: {
    videoSegments: Array<{
      title: string;
      video: string;
      duration: string;
      annotation: string; // From final_report
      tacitCues: string[];
    }>;
    qualityControlFramework: {
      title: string;
      quote: string;
      speaker: string;
      analysis: string;
    };
  };
}
```

---

## 🚀 Epic Breakdown

### Epic 1: Foundation Setup
**Goal**: Establish project foundation with all required dependencies and basic structure

#### Story 1.1: Project Infrastructure Setup
**As a developer**, I want to set up the complete development environment
**So that** I can begin implementing features efficiently

**Acceptance Criteria**:
- [*] Install React Three Fiber and dependencies
- [*] Configure TypeScript interfaces
- [*] Set up project folder structure
- [*] Configure development scripts

**Technical Implementation**:
- Install `@react-three/fiber`, `@react-three/drei`, `three`
- Create type definitions in `/lib/types.ts`
- Configure path aliases in `tsconfig.json`
- Set up development and build scripts

---

### Epic 2: Main Page Development
**Goal**: Create the immersive single-scroll main page experience

#### Story 2.1: Hero Section Implementation ✅ COMPLETED
**As a visitor**, I want to see an engaging introduction to Subang cuisine heritage
**So that** I understand the cultural significance and mission

**Acceptance Criteria**:
- [x] Display compelling hero banner with cultural messaging
- [x] Include Acheng Restaurant establishment information
- [x] Implement smooth scroll invitation
- [x] Add cultural background context

**Technical Implementation**:
- ✅ Created `HeroSection.tsx` component with interactive hover button
- ✅ Used shadcn/ui components and Aceternity UI components
- ✅ Implemented Tailwind CSS gradient backgrounds and animations
- ✅ Added scroll behavior with smooth transitions

**Implementation Notes**:
- Component location: `/src/components/sections/HeroSection.tsx`
- Used BackgroundGradientAnimation for dynamic visual effect
- Integrated InteractiveHoverButton from Aceternity UI
- Implemented dual-language title (English + Chinese)

#### Story 2.1.5: Ethnographic Entry Section 🆕
**As a visitor**, I want to understand the research context and spatial setting
**So that** I can appreciate the ethnographic foundation of this project

**Acceptance Criteria**:
- [ ] Display street-to-kitchen video entry with academic narration
- [ ] Show interactive restaurant floor plan with labor zones
- [ ] Present methodology disclosure (fieldwork protocol)
- [ ] Include annotated kitchen video segments showcasing craft
- [ ] Document quality control framework with chef's philosophy

**Technical Implementation**:
- Create `EthnographicEntrySection.tsx` component
- Integrate video player with optional voiceover subtitles
- Build interactive floor plan (SVG or Three.js based)
- Add methodology panel with ethics statement
- Create video annotation system for tacit cues
- Use Framer Motion for spatial transitions

**Content Requirements**:
- Street view video with academic voiceover script
- Floor plan with zones: 初加工 (prep), 蒸板 (steam bench), 梅炉 (sauté line), 打荷 (plating)
- Fieldwork date: 2025-09-21, Duration: 11:00–15:00 (4 hours)
- Methods: Participant observation, semi-structured interview, dual 3D capture
- Kitchen videos: knife work, oil temperature judgment, sauce finishing
- Quality framework: "新鲜度是第一道门" analysis

**Visual Style**:
- Documentary-style long takes (not commercial quick cuts)
- Eye-level angles (not Instagram overhead shots)
- Environmental audio + low-key academic narration
- Field note-style text overlays on videos

**Position**: Between Hero Section (Story 2.1) and Photo Gallery (Story 2.2)

#### Story 2.2: Photo Gallery & Customer Review Section ✅ COMPLETED
**As a visitor**, I want to see authentic restaurant atmosphere and customer experiences
**So that** I can connect emotionally with the restaurant's legacy

**Acceptance Criteria**:
- [x] Display restaurant photography gallery (parallax scroll)
- [x] Show verified customer reviews with ratings
- [x] Implement responsive image grid layout
- [x] Add review carousel (infinite moving cards)
- [ ] 🔧 Add "Ethnographic Testimonials" framing to reviews

**Technical Implementation**:
- ✅ Created `PhotoGallerySection.tsx` component (integrated gallery + reviews)
- ✅ Used ParallaxScrollSecond component for photo gallery
- ✅ Implemented InfiniteMovingCards from Aceternity UI for reviews
- ✅ Added 6 authentic Chinese reviews from Dianping.com
- ✅ Configured responsive grid with Tailwind CSS
- 🔧 Update review section header to: "Ethnographic Testimonials: Community Voice"
- 🔧 Add explanatory text: "These reviews from Dianping.com offer lay perspectives on taste, atmosphere, and value that complement our observational data."

**Implementation Notes**:
- Component location: `/src/components/sections/PhotoGallerySection.tsx`
- Integrated both photo gallery and customer reviews in single section
- Used dual radial gradient backgrounds for visual depth
- Created bold Dianping introduction card with orange gradient design
- Reviews display with star ratings and dates
- Fixed hydration error by using stable date format

#### Story 2.3: Gallery Exhibition Section ✅ COMPLETED
**As a visitor**, I want to browse the cuisine collection
**So that** I can discover different dishes and their significance

**Acceptance Criteria**:
- [x] Feature 松鼠桂鱼 as signature exhibition
- [x] Display 3 additional cuisine cards (placeholder added)
- [x] Enable navigation to detailed dish pages
- [x] Implement hover effects and animations
- [ ] 🔧 Retitle section to "Representative Cuisines: Case Studies"

**Technical Implementation**:
- ✅ Created `GallerySection.tsx` component following design system
- ✅ Implemented signature dish exhibition with Spotlight effect
- ✅ Added Framer Motion scroll animations
- ✅ Configured Next.js routing to dish detail pages
- ✅ Applied consistent orange accent color scheme
- ✅ Removed emojis, used professional academic style
- 🔧 Update eyebrow text from "Gallery" to "Culinary Archive"
- 🔧 Update section description to emphasize "technique as cultural practice"

**Implementation Notes**:
- Component location: `/src/components/sections/GallerySection.tsx`
- Used Aceternity UI Spotlight component for dramatic lighting (pedagogical instrument)
- Implemented decorative glow orbs and gradient backgrounds
- Created "Chef's Insight" card with interview-based content
- Badge design with line accents and uppercase tracking
- Placeholder section for 3 additional dishes (to be implemented)

#### Story 2.4: About Restaurant Section ✅ COMPLETED
**As a visitor**, I want to learn about Acheng Restaurant's history
**So that** I can appreciate the cultural context

**Acceptance Criteria**:
- [x] Display restaurant history timeline
- [x] Show founder and philosophy information
- [x] Add contact and location details
- [x] Implement elegant typography layout

**Technical Implementation**:
- ✅ Created `AboutSection.tsx` component with story-driven timeline
- ✅ Used Aceternity UI Timeline component with custom styling
- ✅ Implemented DirectionAwareHover for philosophy cards
- ✅ Added chapter-based narrative structure (1992, 1999, 2024, 2025)
- ✅ Integrated historical photos and renovation video
- ✅ Created founder badge with business philosophy attribution

**Implementation Notes**:
- Component location: `/src/components/sections/AboutSection.tsx`
- Timeline features 4 chapters with dramatic storytelling approach
- 1992: "The Pioneer Era" - Cultural rebellion context
- 1999: "Birth of a Legend" - Restaurant establishment with original photo
- 2024: "The Bold Transformation" - Renovation video showcase
- 2025: "The Living Legacy" - Present-day operations and future vision
- Philosophy cards use DirectionAwareHover with images from `/public/images/aboutsection/`
- Founder badge highlights Shen Jiecheng's business philosophy
- Custom timeline styling with orange accent colors and hover effects

#### Story 2.5: Project Information Section
**As a visitor**, I want to understand the virtual museum project itself
**So that** I can appreciate the academic and preservation context

**Acceptance Criteria**:
- [x] Display project overview and mission statement
- [x] Show academic research context and methodology
- [x] Include team information and acknowledgments
- [x] Add technical implementation details
- [x] Provide contact information for inquiries
- [ ] 🔧 Expand with research framework from final_report
- [ ] 🔧 Add limitations and future work section
- [ ] 🔧 Include key theoretical references

**Technical Implementation**:
- Create `ProjectInfoSection.tsx` component
- Use design system consistent with other sections
- Implement academic-style content presentation
- Add visual elements to showcase preservation goals
- Include fieldwork methodology and data sources
- 🔧 Add expandable panels for detailed methodology
- 🔧 Include citation system for theoretical framework

**Content Requirements**:
- Project title and tagline
- **Research Questions**:
  - How is tacit culinary knowledge embedded in spatial, material, and temporal routines?
  - How can digital media preserve embodied skills for future generations?
- **Theoretical Framework**: Human-food interaction, intangible cultural heritage, embodied knowledge
- **Methodology**: Participant observation, semi-structured interviews, dual 3D capture pipeline
- **Limitations**: Narrow aisles limited equipment placement, single-day snapshot, etc.
- **Future Work**: Full-day documentary, expanded dish coverage
- Technical stack showcase
- Team and acknowledgments
- Contact information

---

### Epic 3: Dish Detail Pages
**Goal**: Create immersive individual dish exploration experiences

#### Story 3.1: Dynamic Dish Page Routing
**As a visitor**, I want to access specific dish information via clean URLs
**So that** I can bookmark and share specific dishes

**Acceptance Criteria**:
- [x] Implement dynamic routing `/dishes/[slug]`
- [x] Create slug-based data fetching
- [x] Add proper metadata for SEO
- [x] Implement navigation breadcrumbs

**Technical Implementation**:
- Create `app/dishes/[slug]/page.tsx`
- Implement `generateStaticParams` for static generation
- Configure metadata generation
- Add navigation components

#### Story 3.2: 3D Dish Model Showcase
**As a visitor**, I want to interact with detailed 3D dish models
**So that** I can examine dishes from all angles

**Acceptance Criteria**:
- [x] Load and render GLB 3D models
- [x] Implement model rotation and zoom controls
- [x] Add model loading states and error handling
- [x] Optimize performance for smooth interaction

**Technical Implementation**:
- Create `DishModel3D.tsx` component
- Use drei `useGLTF` hook for model loading
- Implement OrbitControls for interaction
- Add loading spinner and error boundaries
- Configure model scaling and positioning

#### Story 3.3: Comprehensive Dish Information
**As a visitor**, I want to access detailed dish information
**So that** I can learn about recipes, history, and cultural significance

**Acceptance Criteria**:
- [x] Display recipe with ingredients and steps
- [x] Show cultural and historical significance
- [x] Include chef notes and audio playback
- [x] Add nutritional and difficulty information
- [ ] 🔧 Add tacit decision cues to recipe steps

**Technical Implementation**:
- Create `DishInfo.tsx` component
- Implement tabbed interface with shadcn/ui Tabs
- Add audio player for chef voice notes
- Use typography components for content hierarchy
- Implement progress indicators for cooking process
- 🔧 Enhance recipe steps format:
  - Each step includes observable signal (e.g., "oil shimmer", "bubble size")
  - Add chef's decision criterion
  - Retitle "Ingredients" to "Material Inventory and Sourcing Notes"
  - Retitle "Steps" to "Procedural Sequence with Tacit Decision Cues"
  - Retitle "Chef's Secret" to "Embodied Knowledge: What the Chef Sees and Feels"

#### Story 3.4: Related Dishes Navigation
**As a visitor**, I want to discover related dishes
**So that** I can continue exploring the cuisine collection

**Acceptance Criteria**:
- [x] Show related dish recommendations
- [x] Enable quick navigation between dishes
- [x] Implement back-to-museum navigation
- [x] Add smooth page transitions

**Technical Implementation**:
- Create related dishes algorithm
- Implement navigation components
- Add smooth page transitions with CSS
- Configure Next.js Link optimization

---

### Epic 3.5: Research Translation Layer 🆕
**Goal**: Translate academic fieldwork into engaging, accessible public interface while maintaining scholarly rigor

#### Story 3.5.1: Philosophy Deep-Dive Pages with Interactive Concept Maps
**As a visitor**, I want to explore the restaurant's culinary philosophies in depth
**So that** I can understand the theoretical underpinnings of craft practices

**Acceptance Criteria**:
- [ ] Create dynamic routing for `/philosophy` and `/philosophy/[slug]`
- [ ] Implement interactive concept maps using React Flow
- [ ] Integrate fieldwork evidence (quotes, photos, videos)
- [ ] Add academic contextualization with theoretical references
- [ ] Build cross-referencing system to related dishes and philosophies
- [ ] Implement breadcrumb navigation from AboutSection

**URL Structure**:
```
/philosophy                      # Overview page
/philosophy/seasonal-sourcing    # 应时应季 (First Gate to Guard)
/philosophy/sincerity-craft      # 诚与工 (Sincerity & Craft)
/philosophy/grounded-approach    # 接地气 (Grounded Community Model)
```

**Breadcrumb Navigation**:
```
Home → About → Philosophy: [理念名]           # From AboutSection
Philosophy Overview → [specific philosophy]    # Within philosophy section
Home → Dish: 松鼠桂鱼 → Related Philosophy     # Cross-reference from dishes
```

**Technical Implementation**:
- Create `app/philosophy/page.tsx` (overview)
- Create `app/philosophy/[slug]/page.tsx` (detail pages)
- Install and configure React Flow (`reactflow`)
- Create `PhilosophyConceptMap.tsx` component
- Implement `PhilosophyContent.tsx` with fieldwork integration
- Add `PhilosophyCrossRef.tsx` for related content navigation
- Configure `generateStaticParams` for static generation

**Page Structure**:
Each philosophy page includes:
1. **Hero Section**:
   - Title (ZH + EN)
   - Academic subtitle from final_report
   - Hero visual (video/image/3D scene)

2. **Interactive Concept Map** (React Flow):
   - Visual graph of philosophy → practices → outcomes
   - Clickable nodes with detailed descriptions
   - Relationship edges (enables, conflicts-with, derives-from)
   - Node categories: core-value, practice, outcome, constraint
   - Example nodes for "应时应季":
     - Core: "第一道门 (First Gate to Guard)"
     - Practice: "市场清晨采购 (Morning Market Sourcing)"
     - Practice: "触感测试 (Tactile Assessment)"
     - Outcome: "菜品时令调整 (Seasonal Dish Adaptation)"

3. **Ethnographic Evidence**:
   - Interview quotes with audio snippets (5-15s)
   - Observational photos and videos
   - Field note-style captions
   - Proper attribution and timestamps

4. **Academic Context Panel**:
   - Research question this philosophy addresses
   - Theoretical lens (embodied knowledge, intangible heritage)
   - Key academic references with relevance notes

5. **Cross-References**:
   - Related dishes where this philosophy is practiced
   - Related philosophies (complementary or contrasting)

**Content Requirements** (from final_report):
- **应时应季 (Seasonal Sourcing)**:
  - Quote: "新鲜度是第一道门" (Mr. Shen)
  - Practice: Morning market tactile assessment
  - Connects to: 松鼠桂鱼, 荷塘小炒

- **诚与工 (Sincerity & Craft)**:
  - Knife work precision, oil temperature judgment
  - "活卤" (lively sauce) technique
  - Connects to: 松鼠桂鱼

- **接地气 (Grounded Approach)**:
  - Community-embedded model vs. destination dining
  - Neighborhood relationships and pricing strategy
  - Connects to: Restaurant history, customer testimonials

**Visual Design**:
- React Flow custom node styling with orange accent colors
- Smooth zoom/pan interactions
- Animated edge connections on hover
- Mobile-responsive node layout
- Dark theme consistent with site design

**Data Structure**:
Reference the `Philosophy` interface in Data Structure Design section for complete type definitions.

#### Story 3.5.2: Academic Tone Calibration (Surgical Copy Edits)
**As a visitor**, I want content that feels scholarly yet accessible
**So that** I trust the information while staying engaged

**Acceptance Criteria**:
- [ ] Update Hero Section copy from promotional to descriptive
- [ ] Retitle Gallery Section to "Representative Cuisines: Case Studies"
- [ ] Reframe Photo Gallery reviews as "Ethnographic Testimonials"
- [ ] Add academic framing to dish detail pages
- [ ] Include source citations throughout site
- [ ] Implement footnote/tooltip system for references

**Copy Transformation Checklist**:

**Hero Section**:
- ❌ "Discover the art of Suzhou cuisine"
- ✅ "A digital micro-museum documenting culinary knowledge at Acheng Fandian, a neighborhood Suzhou eatery in continuous operation since 1999"

- ❌ "Experience authentic flavors"
- ✅ "Preserving tacit technique, spatial routines, and oral histories that root craft in situated practice"

**Gallery Section**:
- ❌ Section title: "Signature Dishes"
- ✅ Section title: "Representative Cuisines: Case Studies"

- ❌ Eyebrow: "Gallery"
- ✅ Eyebrow: "Culinary Archive"

- ❌ "Exquisite presentation meets cultural heritage"
- ✅ "Technique as cultural practice: embodied skills, material cues, and decision criteria"

**Dish Detail Pages**:
- ❌ Tab: "Ingredients"
- ✅ Tab: "Material Inventory and Sourcing Notes"
  - Add: "Seasonal variations observed during fieldwork"

- ❌ Tab: "Cooking Steps"
- ✅ Tab: "Procedural Sequence with Tacit Decision Cues"
  - Each step format: [Action] → [Observable Signal] → [Chef's Criterion]

- ❌ Section: "Chef's Secret"
- ✅ Section: "Embodied Knowledge: What the Chef Sees and Feels"

**Photo Gallery Section**:
- ❌ "Customer Reviews"
- ✅ "Ethnographic Testimonials: Community Voice"
  - Add intro: "These reviews, collected from Dianping.com (2024-2025), offer lay perspectives on taste, atmosphere, and value that complement our observational data."

**About Section**:
- ✅ Already scholarly (Timeline structure)
- 🔧 Add citation for "1992 cultural context" → Reference Suzhou economic reform history
- 🔧 Add source attribution to historical photos

**Button Text Updates**:
- ❌ "Explore" → ✅ "View Documentation"
- ❌ "Learn More" → ✅ "Read Full Analysis"
- ❌ "Discover" → ✅ "Examine Case Study"

**Technical Implementation**:
- Create `FootnoteTooltip.tsx` component for inline citations
- Create `MethodBadge.tsx` for methodology indicators
- Create `DataSourceIndicator.tsx` for data attribution
- Update all section components with new copy
- Add hover tooltips for academic terms
- Implement citation numbering system

**Tone Principles**:
- Replace subjective praise → objective description
- Remove marketing language → use descriptive exposition
- Add source citations → build credibility
- Include methodology notes → transparency
- Preserve visual effects → maintain engagement

---

### Epic 4: User Experience & Performance
**Goal**: Optimize for smooth, engaging user experience

#### Story 4.1: Smooth Scroll Implementation
**As a visitor**, I want seamless navigation between page sections
**So that** I have a fluid browsing experience

**Acceptance Criteria**:
- [ ] Implement smooth scroll between sections
- [ ] Add scroll progress indicators
- [ ] Create scroll-triggered animations
- [ ] Optimize scroll performance

**Technical Implementation**:
- Use Intersection Observer API
- Implement scroll progress tracking
- Add CSS scroll-behavior and animations
- Optimize rendering with React useMemo

#### Story 4.2: 3D Performance Optimization
**As a visitor**, I want fast-loading 3D content
**So that** I can interact without delays

**Acceptance Criteria**:
- [ ] Implement 3D model lazy loading
- [ ] Optimize model file sizes
- [ ] Add loading states for 3D content
- [ ] Configure efficient rendering settings

**Technical Implementation**:
- Use React.lazy for component splitting
- Implement drei Suspense boundaries
- Configure Three.js performance settings
- Add model compression techniques

#### Story 4.3: Responsive Design Implementation
**As a visitor**, I want optimal experience across all devices
**So that** I can explore on desktop, tablet, or mobile

**Acceptance Criteria**:
- [ ] Implement mobile-responsive layouts
- [ ] Optimize 3D interactions for touch devices
- [ ] Ensure readable typography scaling
- [ ] Test across different screen sizes

**Technical Implementation**:
- Use Tailwind CSS responsive utilities
- Implement touch-friendly 3D controls
- Configure fluid typography scaling
- Add mobile-specific interaction patterns

---

### Epic 5: Content Integration & Polish
**Goal**: Integrate all content and add final polish

#### Story 5.1: Static Data Integration
**As a developer**, I want all content properly integrated
**So that** the museum displays authentic information

**Acceptance Criteria**:
- [ ] Create comprehensive dish data
- [ ] Add restaurant historical information
- [ ] Include authentic customer reviews
- [ ] Populate all placeholder content
- [ ] 🔧 Add `philosophies` data array with concept maps
- [ ] 🔧 Add `ethnographicEntry` data with fieldwork content
- [ ] 🔧 Populate fieldwork evidence (quotes, videos, photos)

**Technical Implementation**:
- Populate `/lib/data.ts` with authentic content
- Add proper TypeScript typing
- Implement data validation
- Create content management utilities
- 🔧 Structure philosophy data with React Flow node/edge format
- 🔧 Organize ethnographic videos with timestamps and annotations
- 🔧 Add academic references and citations

#### Story 5.2: Visual Polish & Animations
**As a visitor**, I want visually stunning interactions
**So that** I have a memorable museum experience

**Acceptance Criteria**:
- [ ] Add sophisticated CSS animations
- [ ] Implement hover effects and transitions
- [ ] Create loading animations
- [ ] Polish 3D scene lighting and materials

**Technical Implementation**:
- Use tw-animate-css for animations
- Configure Three.js lighting setup
- Add custom CSS transitions
- Implement smooth state transitions

#### Story 5.3: SEO & Accessibility
**As a visitor**, I want the site to be accessible and discoverable
**So that** it reaches the intended academic audience

**Acceptance Criteria**:
- [ ] Add proper semantic HTML structure
- [ ] Implement ARIA accessibility features
- [ ] Configure SEO metadata
- [ ] Test with accessibility tools
- [ ] 🔧 Add academic metadata (keywords from final_report)

**Technical Implementation**:
- Use semantic HTML elements
- Add ARIA labels and descriptions
- Configure Next.js metadata API
- Implement keyboard navigation support
- 🔧 Add academic keywords: "intangible cultural heritage", "embodied knowledge", "culinary ethnography", "digital preservation"
- 🔧 Configure Open Graph tags for academic sharing

---

### Epic 6: Academic Infrastructure 🆕
**Goal**: Build transparent research documentation and citation systems

#### Story 6.1: Citation & Reference System
**As a visitor**, I want to verify sources and academic claims
**So that** I can trust the research quality

**Acceptance Criteria**:
- [ ] Implement inline footnote tooltips for citations
- [ ] Create `/references` page with full bibliography
- [ ] Add "Cite this project" functionality with multiple formats
- [ ] Include DOI/permalink for academic referencing

**Technical Implementation**:
- Create `FootnoteTooltip.tsx` component
  - Hover to show citation details
  - Click to navigate to full reference
  - Numbered footnote system
- Create `app/references/page.tsx`
  - Organized by section/topic
  - APA and Chicago style formatting
  - Filterable by content type (book, article, interview)
- Add citation export functionality
  - BibTeX format
  - RIS format
  - Plain text APA/Chicago

**Content Requirements**:
- Key references from final_report:
  - Abbate (2021) - Phenomenology of making
  - Mirri et al. (2017) - Embodied interaction
  - UNESCO Intangible Cultural Heritage Convention
  - Suzhou economic reform history sources
- Fieldwork citation:
  - Interview with Mr. Shen Jiecheng (2025-09-21)
  - Dianping.com reviews (2024-2025)
  - Personal observations and photos

#### Story 6.2: Methodology Appendix
**As a visitor**, I want to understand how this research was conducted
**So that** I can evaluate its validity

**Acceptance Criteria**:
- [ ] Create `/methodology` page with detailed protocol
- [ ] Document 3D capture pipeline with technical specs
- [ ] Explain interview protocol and consent process
- [ ] Include limitations and challenges section

**Technical Implementation**:
- Create `app/methodology/page.tsx`
- Use expandable accordion sections for detailed protocols
- Add visual diagrams of 3D capture workflow
- Include sample consent form (anonymized)
- Link to relevant sections from main site

**Content Structure**:
1. **Research Design**:
   - Ethnographic approach rationale
   - Fieldwork site selection criteria
   - Temporal scope (single-day snapshot)

2. **Data Collection Methods**:
   - **Participant Observation**:
     - Date: 2025-09-21
     - Duration: 11:00–15:00 (4 hours)
     - Constraints: Narrow aisles, heat, steam
   - **Semi-structured Interview**:
     - Participant: Mr. Shen Jiecheng (owner-chef)
     - Duration: 25 minutes
     - Key topics: Philosophy, techniques, business model
   - **Dual 3D Capture Pipeline**:
     - Method 1: AI-assisted mesh from photos
     - Method 2: LiDAR USDZ scans
     - Challenges: Glossy surfaces, steam interference

3. **Ethics & Consent**:
   - Written informed consent obtained
   - Staff/patron privacy protection protocols
   - Owner pre-publication review rights
   - Data storage and anonymization

4. **Limitations**:
   - Single-day observation (temporal snapshot)
   - Equipment constraints (narrow space)
   - Language barriers (technical Suzhou dialect terms)
   - Researcher positionality (outsider perspective)

#### Story 6.3: Data Transparency & Accessibility
**As a researcher**, I want access to underlying data
**So that** I can verify findings and build upon this work

**Acceptance Criteria**:
- [ ] Add "View raw data" links where appropriate
- [ ] Provide downloadable interview transcripts (with consent)
- [ ] Include metadata for all media assets
- [ ] Link to institutional repository (if available)

**Technical Implementation**:
- Create download links for:
  - Interview audio segments (with timestamps)
  - Photo metadata (camera settings, date, location)
  - 3D model technical specs (poly count, texture resolution)
- Add data licensing information (Creative Commons)
- Include ORCID or institutional affiliation
- Provide contact for data access requests

**Privacy Considerations**:
- Anonymize customer faces in photos
- Redact personal identifying information
- Require data use agreement for full transcripts
- Respect owner's review rights


## 📈 Success Metrics

### Technical Metrics:
- **Load Time**: < 3 seconds for initial page
- **3D Performance**: 60fps on mid-range devices
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Lighthouse score > 90

### Academic Metrics:
- **Content Depth**: Comprehensive cultural documentation with theoretical grounding
- **User Engagement**: Average session duration > 5 minutes
- **Educational Value**: Clear learning outcomes achieved
- **Cultural Preservation**: Authentic heritage representation
- **Research Transparency**: Full methodology disclosure and data attribution
- **Scholarly Impact**: Citable with proper academic referencing

### Dual Audience Success:
- **For Scholars**: Rigorous methodology, transparent data, academic citations
- **For General Public**: Engaging visuals, accessible language, progressive disclosure
- **For Heritage Community**: Respectful representation, authentic voice, practical preservation

---

