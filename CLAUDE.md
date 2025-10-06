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
A sophisticated, interactive virtual museum featuring:
- Immersive 3D experiences with GLB models
- Comprehensive cultural storytelling
- Academic-quality content presentation
- Modern, engaging user interface

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
- Use proper English academic writing style
- Incorporate authentic fieldwork interview quotes
- Maintain cultural sensitivity and accuracy
- Focus on heritage preservation narrative

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

#### Story 2.2: Photo Gallery & Customer Review Section ✅ COMPLETED
**As a visitor**, I want to see authentic restaurant atmosphere and customer experiences
**So that** I can connect emotionally with the restaurant's legacy

**Acceptance Criteria**:
- [x] Display restaurant photography gallery (parallax scroll)
- [x] Show verified customer reviews with ratings
- [x] Implement responsive image grid layout
- [x] Add review carousel (infinite moving cards)

**Technical Implementation**:
- ✅ Created `PhotoGallerySection.tsx` component (integrated gallery + reviews)
- ✅ Used ParallaxScrollSecond component for photo gallery
- ✅ Implemented InfiniteMovingCards from Aceternity UI for reviews
- ✅ Added 6 authentic Chinese reviews from Dianping.com
- ✅ Configured responsive grid with Tailwind CSS

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

**Technical Implementation**:
- ✅ Created `GallerySection.tsx` component following design system
- ✅ Implemented signature dish exhibition with Spotlight effect
- ✅ Added Framer Motion scroll animations
- ✅ Configured Next.js routing to dish detail pages
- ✅ Applied consistent orange accent color scheme
- ✅ Removed emojis, used professional academic style

**Implementation Notes**:
- Component location: `/src/components/sections/GallerySection.tsx`
- Used Aceternity UI Spotlight component for dramatic lighting
- Implemented decorative glow orbs and gradient backgrounds
- Created "Chef's Insight" card with interview-based content
- Badge design with line accents and uppercase tracking
- Placeholder section for 3 additional dishes (to be implemented)

#### Story 2.4: About Restaurant Section
**As a visitor**, I want to learn about Acheng Restaurant's history
**So that** I can appreciate the cultural context

**Acceptance Criteria**:
- [ ] Display restaurant history timeline
- [ ] Show founder and philosophy information
- [ ] Add contact and location details
- [ ] Implement elegant typography layout

**Technical Implementation**:
- Create `AboutSection.tsx` component
- Use shadcn/ui Typography and Card components
- Implement timeline design with CSS
- Add responsive layout for different screen sizes

---

### Epic 3: Dish Detail Pages
**Goal**: Create immersive individual dish exploration experiences

#### Story 3.1: Dynamic Dish Page Routing
**As a visitor**, I want to access specific dish information via clean URLs
**So that** I can bookmark and share specific dishes

**Acceptance Criteria**:
- [ ] Implement dynamic routing `/dishes/[slug]`
- [ ] Create slug-based data fetching
- [ ] Add proper metadata for SEO
- [ ] Implement navigation breadcrumbs

**Technical Implementation**:
- Create `app/dishes/[slug]/page.tsx`
- Implement `generateStaticParams` for static generation
- Configure metadata generation
- Add navigation components

#### Story 3.2: 3D Dish Model Showcase
**As a visitor**, I want to interact with detailed 3D dish models
**So that** I can examine dishes from all angles

**Acceptance Criteria**:
- [ ] Load and render GLB 3D models
- [ ] Implement model rotation and zoom controls
- [ ] Add model loading states and error handling
- [ ] Optimize performance for smooth interaction

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
- [ ] Display recipe with ingredients and steps
- [ ] Show cultural and historical significance
- [ ] Include chef notes and audio playback
- [ ] Add nutritional and difficulty information

**Technical Implementation**:
- Create `DishInfo.tsx` component
- Implement tabbed interface with shadcn/ui Tabs
- Add audio player for chef voice notes
- Use typography components for content hierarchy
- Implement progress indicators for cooking process

#### Story 3.4: Related Dishes Navigation
**As a visitor**, I want to discover related dishes
**So that** I can continue exploring the cuisine collection

**Acceptance Criteria**:
- [ ] Show related dish recommendations
- [ ] Enable quick navigation between dishes
- [ ] Implement back-to-museum navigation
- [ ] Add smooth page transitions

**Technical Implementation**:
- Create related dishes algorithm
- Implement navigation components
- Add smooth page transitions with CSS
- Configure Next.js Link optimization

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

**Technical Implementation**:
- Populate `/lib/data.ts` with authentic content
- Add proper TypeScript typing
- Implement data validation
- Create content management utilities

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

**Technical Implementation**:
- Use semantic HTML elements
- Add ARIA labels and descriptions
- Configure Next.js metadata API
- Implement keyboard navigation support

---

## 🚦 Definition of Done

### For Each Story:
- [ ] Functionality implemented and tested
- [ ] TypeScript compilation passes
- [ ] Responsive design verified
- [ ] Performance optimized
- [ ] Code reviewed and documented

### For Epic Completion:
- [ ] All stories completed
- [ ] Cross-browser testing passed
- [ ] Performance benchmarks met
- [ ] Accessibility standards satisfied
- [ ] Academic content standards achieved

---

## 📈 Success Metrics

### Technical Metrics:
- **Load Time**: < 3 seconds for initial page
- **3D Performance**: 60fps on mid-range devices
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Lighthouse score > 90

### Academic Metrics:
- **Content Depth**: Comprehensive cultural documentation
- **User Engagement**: Average session duration > 5 minutes
- **Educational Value**: Clear learning outcomes achieved
- **Cultural Preservation**: Authentic heritage representation

---

## 🔧 Development Guidelines

### Code Standards:
- Use TypeScript strict mode
- Follow React best practices
- Implement proper error boundaries
- Add comprehensive comments for complex logic

### Git Workflow:
- Feature branch development
- Descriptive commit messages
- Regular progress commits
- Epic completion documentation

### Testing Strategy:
- Component unit testing
- 3D interaction testing
- Performance monitoring
- Cross-device validation

---

*This document serves as the master reference for the Acheng Restaurant Virtual Museum project. All development should align with these specifications and success criteria.*
