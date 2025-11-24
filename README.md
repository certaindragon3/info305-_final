# Acheng Restaurant Virtual Museum

A digital micro-museum preserving intangible culinary heritage through immersive web experience.

> Documenting tacit technique, spatial routines, and oral histories at Acheng Fandian — a neighborhood Suzhou eatery in continuous operation since 1999.

## Overview

This project translates ethnographic fieldwork into an engaging public interface, positioned between academic rigor and accessible storytelling. It serves as a research instrument that uses design to shape how visitors understand culinary knowledge transmission.

**Live Website**: [acheng.jiesen-huang.com](https://acheng.jiesen-huang.com)

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 15, React 19, TypeScript |
| 3D Graphics | React Three Fiber, Three.js, Drei |
| Styling | Tailwind CSS v4, shadcn/ui |
| Animations | Framer Motion, tw-animate-css |
| UI Components | Aceternity UI, Magic UI |
| Visualization | React Flow |
| Deployment | Cloudflare Pages |

## Features

- **Immersive Scroll Journey**: Single-page narrative from street approach to cultural understanding
- **Interactive 3D Models**: Examine dishes from all angles with dual capture variants (AI mesh + LiDAR)
- **Philosophy Concept Maps**: React Flow-based interactive knowledge graphs
- **Ethnographic Documentation**: Fieldwork video, chef interview audio, methodology transparency
- **Community Voice Integration**: Triangulated evidence from researcher observation and customer testimonials

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Main scroll page
│   ├── dishes/[slug]/      # Dynamic dish detail pages
│   └── philosophy/[slug]/  # Philosophy deep-dive pages
├── components/
│   ├── sections/           # Page sections (Hero, Gallery, About, etc.)
│   ├── dish/               # Dish page components (3D, gallery, info)
│   ├── philosophy/         # Philosophy visualization components
│   └── ui/                 # Reusable UI primitives
├── lib/
│   ├── data.ts             # Static content (dishes, reviews)
│   ├── philosophies.ts     # Philosophy data with concept maps
│   └── types.ts            # TypeScript interfaces
└── public/
    ├── models/             # GLB 3D models
    ├── images/             # Photography assets
    ├── audio/              # Chef interview clips
    └── videos/             # Fieldwork documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/acheng-museum.git
cd acheng-museum

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

### Build

```bash
# Production build
npm run build

# Preview production build
npm run start
```

### Deploy

```bash
# Deploy to Cloudflare Pages
npm run deploy
```

## Content

### Dishes Documented

| Dish | Chinese | Category |
|------|---------|----------|
| Squirrel Fish | 松鼠桂鱼 | Signature |
| Lotus Pond Stir-fry | 荷塘小炒 | Classic |
| Biluochun Tea Shrimp | 碧螺虾仁 | Seasonal |
| Hot Oil Eel | 响油鳝糊 | Classic |

### Philosophies Explored

- **Seasonal Sourcing** (应时应季): "Freshness is the first gate to guard"
- **Sincerity & Craft** (诚与工): Embodied technique and quality standards
- **Grounded Approach** (接地气): Community-embedded business model

## Fieldwork

- **Date**: September 21, 2025
- **Duration**: 4 hours (11:00–15:00)
- **Methods**: Participant observation, semi-structured interview, dual 3D capture pipeline
- **Participant**: Mr. Shen Jiecheng (owner-chef since 1999)

## Academic Context

This project explores how tacit culinary knowledge — skills embedded in hands, not books — can be preserved through digital media. It draws on theories of embodied knowledge, intangible cultural heritage, and human-food interaction.

## License

This project is for academic and educational purposes.

## Author

**Jiesen Huang**
INFO 305 Project, Fall 2025

---

*"Solution Always Prevails"*
