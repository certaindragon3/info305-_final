// AI Archive Dish Registry
// All 12 dishes with slugs, names, metadata, and display content

import type { DishArchiveEntry } from './types';

export const DISH_REGISTRY: DishArchiveEntry[] = [
    // ═══════════════════════════════════════════
    // Existing dishes (from interview transcript)
    // ═══════════════════════════════════════════
    {
        id: 1,
        slug: 'squirrel-fish',
        nameZh: '松鼠桂鱼',
        nameEn: 'Squirrel Mandarin Fish',
        category: 'signature',
        thumbnail: '/images/ai-archive/squirrel-fish.jpg',
        model3D: '/models/squirrel-fish.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: 'The crown jewel of Suzhou cuisine. A whole mandarin fish is scored with masterful knife work into a squirrel shape, deep-fried until golden and crispy, then drizzled with a sweet-and-sour sauce — crunchy outside, tender inside.',
        welcome: '欢迎来到松鼠桂鱼档案！/ Welcome to the Squirrel Mandarin Fish archive!\n\n这道菜以精湛刀工和酸甜卤汁著称,是苏帮菜的代表之作。This signature dish is famous for its intricate knife work and sweet-sour sauce.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '为什么叫松鼠桂鱼？',
            '油温怎么判断？',
            '刀工有什么讲究？',
        ],
    },
    {
        id: 2,
        slug: 'hot-oil-eel',
        nameZh: '响油鳝糊',
        nameEn: 'Sizzling Eel',
        category: 'signature',
        thumbnail: '/images/ai-archive/hot-oil-eel.jpg',
        model3D: '/models/hot-oil-eel.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: 'A dish full of drama and ritual. Simmered eel strips are finished tableside with a sizzling pour of hot oil, releasing an intoxicating aroma — rich, silky, and deeply savory.',
        welcome: '欢迎来到响油鳝糊档案！/ Welcome to the Sizzling Eel archive!\n\n这道菜以上桌时现浇热油的仪式感著称。The signature sizzle when hot oil is poured tableside makes this dish a true showstopper.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '为什么要现浇热油？',
            '鳝鱼怎么处理才没有腥味？',
            '这道菜甜吗？',
        ],
    },
    {
        id: 3,
        slug: 'lotus-stir-fry',
        nameZh: '荷塘小炒',
        nameEn: 'Lotus Pond Stir-fry',
        category: 'classic',
        thumbnail: '/images/ai-archive/lotus-stir-fry.jpg',
        model3D: '/models/lotus-stir-fry.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: 'A vibrant stir-fry featuring lotus root, snow peas, and foxnut — seasonal treasures from the Jiangnan water towns. Crisp, colorful, and as refreshing as a summer lotus pond.',
        welcome: '欢迎来到荷塘小炒档案！/ Welcome to the Lotus Pond Stir-fry archive!\n\n这道菜汇集了江南水乡的时令鲜蔬,清爽可口。This dish brings together the freshest seasonal vegetables from the Jiangnan water towns.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '里面有哪些食材？',
            '什么是鸡头米？',
            '这道菜适合什么季节吃？',
        ],
    },
    {
        id: 4,
        slug: 'biluochun-shrimp',
        nameZh: '清炒虾仁',
        nameEn: 'Stir-fried Shrimp',
        category: 'signature',
        thumbnail: '/images/ai-archive/biluochun-shrimp.jpg',
        model3D: '/models/biluochun-shrimp.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: 'The ultimate test of a Suzhou chef\'s fundamentals. Hand-peeled river shrimp are flash-woked with Biluochun tea, yielding translucent, bouncy morsels that showcase the purest natural sweetness.',
        welcome: '欢迎来到清炒虾仁档案！/ Welcome to the Stir-fried Shrimp archive!\n\n这道菜看似简单,实则最考验厨师功力。手剥虾仁,旺火快炒,追求的是食材最纯粹的鲜美。Seemingly simple yet demanding mastery — hand-peeled shrimp, quick-fired to preserve pure, natural sweetness.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '为什么要用手剥虾仁？',
            '虾仁怎么做到这么弹牙？',
            '这道菜用的什么虾？',
        ],
    },

    // ═══════════════════════════════════════════
    // New dishes (from Dianping reviews)
    // ═══════════════════════════════════════════
    {
        id: 5,
        slug: 'golden-soy-shrimp',
        nameZh: '金牌酱油虾',
        nameEn: 'Golden Soy Sauce Shrimp',
        category: 'signature',
        thumbnail: '/images/ai-archive/golden-soy-shrimp.jpg',
        model3D: '/models/ai-archive/Golden Soy Sauce Shrimp.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/golden-soy-shrimp.md',
        brief: 'Acheng\'s signature dish. River shrimp are flash-fried for 6–7 seconds then plunged into a chilled secret sauce — the hot-meets-cold collision creates a crispy shell with tender, bouncy flesh, savory-sweet and unforgettable.',
        welcome: '欢迎来到金牌酱油虾档案！/ Welcome to the Golden Soy Sauce Shrimp archive!\n\n这道菜是阿成饭店的镇店招牌,以秘制酱汁和快速走油技法著称。热虾冷汁的瞬间碰撞,让酱油的复合风味完美渗入虾肉。This signature dish features a secret sauce and instant hot-oil technique. The quick collision of hot shrimp with cold sauce creates an unforgettable flavor.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '酱汁里有什么特别的配料？',
            '为什么叫"金牌"酱油虾？',
            '热虾冷汁的技法有什么讲究？',
        ],
    },
    {
        id: 6,
        slug: 'assorted-delicacies',
        nameZh: '白什锦',
        nameEn: 'Assorted Delicacies in Clear Broth',
        category: 'classic',
        thumbnail: '/images/ai-archive/assorted-delicacies.jpg',
        model3D: '/models/ai-archive/Assorted Delicacies in Clear Broth.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/assorted-delicacies.md',
        brief: 'The epitome of refined Suzhou elegance. Over ten ingredients — shrimp, chicken, tendon, fish maw — are individually cooked to perfection and united in a snowy-white platter, a true test of a chef\'s fire control.',
        welcome: '欢迎来到白什锦档案！/ Welcome to the Assorted Delicacies archive!\n\n这道菜看似朴实无华，实则极其考验功夫。多达十余种食材需分次下锅，以各自最佳火候处理，最后汇聚成一盘色泽雪白的"文人菜"。This dish may look simple, but it requires masterful skill. Over ten ingredients are cooked separately to perfection and combined into this elegant, white masterpiece.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '为什么叫"白什锦"？',
            '这道菜里包含哪些食材？',
            '为什么说它考验厨师功夫？',
        ],
    },
    {
        id: 7,
        slug: 'crab-roe-tofu',
        nameZh: '蟹粉豆腐',
        nameEn: 'Tofu with Crab Roe',
        category: 'classic',
        thumbnail: '/images/ai-archive/crab-roe-tofu.jpg',
        model3D: '/models/ai-archive/Crab Roe Tofu.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/crab-roe-tofu.md',
        brief: 'A classic "kung fu dish" of Suzhou cuisine. Silky southern tofu is gently simmered with hand-picked crab roe and meat from autumn river crabs — golden, fragrant, and melt-in-your-mouth tender.',
        welcome: '欢迎来到蟹粉豆腐档案！/ Welcome to the Crab Roe Tofu archive!\n\n这道菜色泽金黄，蟹香浓郁，是苏帮菜中"精致"的代名词。选用滑嫩南豆腐与鲜美蟹粉，经细火慢煨，让豆腐充分吸收蟹的精华。This dish features golden hues and rich crab aroma, representing the elegance of Suzhou cuisine. Silky tofu is simmered with fresh crab roe, absorbing every bit of the savory essence.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '这道菜的蟹粉是真的吗？',
            '这道菜的历史渊源是什么？',
            '口感有什么特别之处？',
        ],
    },
    {
        id: 8,
        slug: 'salt-pepper-pork',
        nameZh: '椒盐排条',
        nameEn: 'Salt and Pepper Pork Strips',
        category: 'classic',
        thumbnail: '/images/ai-archive/salt-pepper-pork.jpg',
        model3D: '/models/ai-archive/Salt and Pepper Pork Strips.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/salt-pepper-pork.md',
        brief: 'A crowd favorite from the streets of Suzhou. Premium pork strips are double-fried until golden and shatteringly crispy, then tossed with salt, pepper, and garlic — juicy inside, crunchy outside, loved by all ages.',
        welcome: '欢迎来到椒盐排条档案！/ Welcome to the Salt and Pepper Pork Strips archive!\n\n这道菜虽然家常，却有着不输大菜的魅力。二次复炸赋予了它极致的酥脆口感，椒盐与蒜香的结合更是灵魂所在。While humble, this dish rivals any banquet centerpiece. Double-frying gives it ultimate crispiness, while the blend of salt, pepper, and garlic creates its soulful flavor.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '怎么做到"外酥里嫩"的？',
            '这道菜的椒盐有什么讲究？',
            '是用什么部位的肉做的？',
        ],
    },
    {
        id: 9,
        slug: 'wine-lees-fish',
        nameZh: '糟溜黑鱼片',
        nameEn: 'Wine Lees Sliced Snakehead Fish',
        category: 'classic',
        thumbnail: '/images/ai-archive/wine-lees-fish.jpg',
        model3D: '/models/ai-archive/Wine Lees Sliced Snakehead Fish.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/wine-lees-fish.md',
        brief: 'A masterclass in wine-lees cooking. Jade-white snakehead fish slices are infused with the rich, aromatic fragrance of Suzhou\'s signature fermented rice lees — silky, delicate, and melting on the tongue.',
        welcome: '欢迎来到糟溜黑鱼片档案！/ Welcome to the Wine Lees Sliced Snakehead Fish archive!\n\n这道菜将黑鱼的鲜美与香糟的馥郁完美结合。鱼片洁白如玉，糟香扑鼻，滑嫩细腻。The snakehead fish slices are snowy white and tender, infused with the rich, aromatic fragrance of wine lees. It\'s a perfect marriage of freshness and fermentation.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '什么是"糟溜"？',
            '这道菜有酒味吗？',
            '黑鱼片为什么这么嫩？',
        ],
    },
    {
        id: 10,
        slug: 'sweet-sour-ribs',
        nameZh: '糖醋排骨',
        nameEn: 'Sweet and Sour Pork Ribs',
        category: 'classic',
        thumbnail: '/images/ai-archive/sweet-sour-ribs.jpg',
        model3D: '/models/ai-archive/Sweet and Sour Pork Ribs.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/sweet-sour-ribs.md',
        brief: 'The quintessential expression of Suzhou\'s love for sweetness. Pork ribs are fried then braised in a sweet-and-sour glaze until fork-tender and falling off the bone — rich red, perfectly balanced, a classic Jiangnan flavor.',
        welcome: '欢迎来到糖醋排骨档案！/ Welcome to the Sweet and Sour Pork Ribs archive!\n\n这道菜色泽酱红，酸甜适口，完美诠释了苏帮菜"浓油赤酱"的魅力。精选肋排经油炸与焖煮，肉质酥烂，酸甜开胃。Featuring a rich red glaze and perfect sweet-sour balance, this dish embodies the \'rich oil and red sauce\' style of Suzhou cuisine. The ribs are fried and braised until tender enough to fall off the bone.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '这道菜有多甜？',
            '排骨是炸过的吗？',
            '为什么说这道菜代表了苏州口味？',
        ],
    },
    {
        id: 11,
        slug: 'whitebait-eggs',
        nameZh: '银鱼炒蛋',
        nameEn: 'Scrambled Eggs with Whitebait',
        category: 'classic',
        thumbnail: '/images/ai-archive/whitebait-eggs.jpg',
        model3D: '/models/ai-archive/Scrambled Eggs with Whitebait.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/whitebait-eggs.md',
        brief: 'A celebration of Taihu Lake\'s "Three Whites." Translucent, boneless whitebait are scrambled with farm-fresh eggs into a golden-and-white mosaic — silky, smooth, and the essence of seasonal Suzhou freshness.',
        welcome: '欢迎来到银鱼炒蛋档案！/ Welcome to the Scrambled Eggs with Whitebait archive!\n\n这道菜虽看似简单，却是"鲜"的极致体现。洁白无瑕的太湖银鱼融合在金黄蛋液中，软嫩爽滑，鲜香四溢。Though simple in appearance, this dish is the ultimate expression of \'freshness\'. Pure white Taihu whitebait melds with golden eggs, creating a tender, smooth, and aromatic delight.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '什么是"太湖三白"？',
            '银鱼有刺吗？',
            '这道菜为什么这么嫩？',
        ],
    },
    {
        id: 12,
        slug: 'red-bean-soup',
        nameZh: '赤豆圆子',
        nameEn: 'Sweet Red Bean Soup with Rice Balls',
        category: 'dessert',
        thumbnail: '/images/ai-archive/red-bean-soup.jpg',
        model3D: '/models/ai-archive/Sweet Red Bean Soup with Rice Balls.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/red-bean-soup.md',
        brief: 'A warm, comforting memory of Suzhou\'s alleyways. Slow-simmered red beans form a velvety paste, crowned with chewy handmade rice balls — sweet, soft, and symbolic of reunion and happiness.',
        welcome: '欢迎来到赤豆圆子档案！/ Welcome to the Sweet Red Bean Soup with Rice Balls archive!\n\n这道甜品象征着圆满与甜蜜。绵密的红豆沙与Q弹的小圆子在口中交织，带来最纯粹的江南幸福感。Symbolizing reunion and sweetness, this dessert combines smooth red bean paste with chewy rice balls for a taste of pure Jiangnan bliss.\n\n有什么想了解的？What would you like to know?',
        suggestedQuestions: [
            '这道甜品有什么寓意？',
            '圆子是怎么做的？',
            '这道甜品有多甜？',
        ],
    },
];

// Helper to get dish by slug
export function getDishBySlug(slug: string): DishArchiveEntry | undefined {
    return DISH_REGISTRY.find((dish) => dish.slug === slug);
}

// Get all slugs as array
export const ALL_DISH_SLUGS = DISH_REGISTRY.map((dish) => dish.slug);

// Get random suggested questions from various dishes
export function getRandomSuggestedQuestions(count: number = 6): { question: string; dishNameZh: string }[] {
    const allQuestions = DISH_REGISTRY.flatMap((dish) =>
        dish.suggestedQuestions.map((q) => ({
            question: q,
            dishNameZh: dish.nameZh,
        }))
    );

    // Shuffle and pick
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
