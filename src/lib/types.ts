// Core data types for Acheng Restaurant Virtual Museum

export interface Dish {
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
  nutritionalInfo?: {
    calories: number;
    mainIngredients: string[];
  };
}

export interface Restaurant {
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

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
  type: 'customer' | 'critic' | 'historian';
}

export interface CulturalContext {
  overview: string;
  threats: string[];
  preservation: string;
  characteristics: string[];
}

export interface PhotoGallery {
  id: string;
  title: string;
  description: string;
  category: 'chef' | 'dining-hall' | 'mascot' | 'food' | 'preparation';
  imageUrl: string;
  alt: string;
}

// 3D Scene types
export interface InteractivePoint {
  id: string;
  dishId: string;
  position: [number, number, number];
  label: string;
}

export interface Scene3DProps {
  interactivePoints: InteractivePoint[];
  onPointClick: (dishId: string) => void;
}

// Component Props types
export interface DishCardProps {
  dish: Dish;
  variant?: 'default' | 'signature';
  className?: string;
}

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

// Philosophy types for deep-dive pages
export interface Philosophy {
  id: string;
  slug: string;
  titleZh: string;
  titleEn: string;
  subtitle: string;
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