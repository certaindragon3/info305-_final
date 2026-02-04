// AI Archive Dish Registry
// All 12 dishes with slugs, names, and metadata

export interface DishEntry {
    id: number;
    slug: string;
    nameZh: string;
    nameEn: string;
    category: 'signature' | 'classic' | 'seasonal' | 'dessert';
    contextSource: 'interview' | 'dianping';
}

export const DISH_REGISTRY: DishEntry[] = [
    // Existing dishes (from interview transcript)
    {
        id: 1,
        slug: 'squirrel-fish',
        nameZh: '松鼠桂鱼',
        nameEn: 'Squirrel Mandarin Fish',
        category: 'signature',
        contextSource: 'interview',
    },
    {
        id: 2,
        slug: 'hot-oil-eel',
        nameZh: '响油鳝糊',
        nameEn: 'Sizzling Eel',
        category: 'signature',
        contextSource: 'interview',
    },
    {
        id: 3,
        slug: 'lotus-stir-fry',
        nameZh: '荷塘小炒',
        nameEn: 'Lotus Pond Stir-fry',
        category: 'classic',
        contextSource: 'interview',
    },
    {
        id: 4,
        slug: 'biluochun-shrimp',
        nameZh: '清炒虾仁',
        nameEn: 'Stir-fried Shrimp',
        category: 'signature',
        contextSource: 'interview',
    },

    // New dishes (from Dianping reviews)
    {
        id: 5,
        slug: 'golden-soy-shrimp',
        nameZh: '金牌酱油虾',
        nameEn: 'Golden Soy Sauce Shrimp',
        category: 'signature',
        contextSource: 'dianping',
    },
    {
        id: 6,
        slug: 'assorted-delicacies',
        nameZh: '白什锦',
        nameEn: 'Assorted Delicacies in Clear Broth',
        category: 'classic',
        contextSource: 'dianping',
    },
    {
        id: 7,
        slug: 'crab-roe-tofu',
        nameZh: '蟹粉豆腐',
        nameEn: 'Tofu with Crab Roe',
        category: 'seasonal',
        contextSource: 'dianping',
    },
    {
        id: 8,
        slug: 'salt-pepper-pork',
        nameZh: '椒盐排条',
        nameEn: 'Salt and Pepper Pork Strips',
        category: 'classic',
        contextSource: 'dianping',
    },
    {
        id: 9,
        slug: 'wine-lees-fish',
        nameZh: '糟溜黑鱼片',
        nameEn: 'Wine Lees Sliced Snakehead Fish',
        category: 'classic',
        contextSource: 'dianping',
    },
    {
        id: 10,
        slug: 'sweet-sour-ribs',
        nameZh: '糖醋排骨',
        nameEn: 'Sweet and Sour Pork Ribs',
        category: 'classic',
        contextSource: 'dianping',
    },
    {
        id: 11,
        slug: 'whitebait-eggs',
        nameZh: '银鱼炒蛋',
        nameEn: 'Scrambled Eggs with Whitebait',
        category: 'classic',
        contextSource: 'dianping',
    },
    {
        id: 12,
        slug: 'red-bean-soup',
        nameZh: '赤豆圆子',
        nameEn: 'Sweet Red Bean Soup with Rice Balls',
        category: 'dessert',
        contextSource: 'dianping',
    },
];

// Helper to get dish by slug
export function getDishBySlug(slug: string): DishEntry | undefined {
    return DISH_REGISTRY.find((dish) => dish.slug === slug);
}

// Get all slugs as array
export const ALL_DISH_SLUGS = DISH_REGISTRY.map((dish) => dish.slug);
