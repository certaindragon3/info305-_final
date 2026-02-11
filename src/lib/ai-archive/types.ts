// AI Archive TypeScript Interfaces

export interface DishArchiveEntry {
    id: number;
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

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    dishId: string;
}

export interface EmbeddingChunk {
    text: string;
    embedding: number[];
    source: 'interview' | 'observation' | 'review' | 'recipe' | 'background';
    dishId: string;
}
