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
        model3D: '/models/ai-archive/squirrel-fish.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: '松鼠桂鱼是苏帮菜的看家名菜,以精湛刀工将鳜鱼改刀成松鼠形,经高温油炸后浇上酸甜卤汁,外酥里嫩,形似松鼠,是苏州宴席的压轴之作。',
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
        model3D: '/models/ai-archive/hot-oil-eel.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: '响油鳝糊是苏帮菜中极具仪式感的一道菜。新鲜鳝鱼丝烧制入味后,上桌时现浇滚烫热油,发出"刺啦"一声,香气四溢,浓油赤酱,滑嫩鲜美。',
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
        model3D: '/models/ai-archive/lotus-stir-fry.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: '荷塘小炒以莲藕、荷兰豆、鸡头米等水乡食材为主,清脆爽口,色彩缤纷。这道菜如同一幅江南水乡画,将夏日荷塘的鲜美收录在一盘之中。',
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
        model3D: '/models/ai-archive/biluochun-shrimp.glb',
        contextSource: 'interview',
        contextPath: '/docs/interview_transcript.md',
        brief: '清炒虾仁是苏帮菜中最考验基本功的一道菜。手剥河虾仁,以龙井或碧螺春茶汤滑炒,虾仁晶莹饱满,Q弹鲜嫩,清淡中尽显食材本味。',
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
        model3D: '/models/ai-archive/golden-soy-shrimp.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/golden-soy-shrimp.md',
        brief: '金牌酱油虾是阿成饭店的镇店招牌菜,以秘制酱汁和热虾冷汁的瞬间碰撞著称。新鲜河虾油炸6-7秒后浸入冰凉酱汁,虾壳酥脆,虾肉鲜嫩弹牙,咸中带甜,鲜美无比。',
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
        model3D: '/models/ai-archive/assorted-delicacies.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/assorted-delicacies.md',
        brief: '白什锦，又名"白什盘"，是苏帮菜中"清淡雅致"的代表。将虾仁、鸡片、蹄筋、鱼肚等多种食材，分别独立烹饪后汇于一盘，色泽雪白，口感软硬兼备，极其考验厨师对火候的掌控能力。',
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
        model3D: '/models/ai-archive/crab-roe-tofu.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/crab-roe-tofu.md',
        brief: '蟹粉豆腐是苏帮菜中的经典"功夫菜"。选用滑嫩南豆腐，配以金秋时节肥美河蟹拆出的蟹粉与蟹黄，细火慢煨，成菜色泽金黄，蟹香浓郁，口感嫩滑，入口即化。',
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
        model3D: '/models/ai-archive/salt-pepper-pork.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/salt-pepper-pork.md',
        brief: '椒盐排条是苏州街头巷尾的"人气王"。选用上等猪里脊或肋排，经两次复炸至金黄酥脆，再佐以椒盐、蒜末爆炒。外壳酥脆，内里鲜嫩多汁，咸香适口，是老少皆宜的下酒佐餐佳品。',
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
        model3D: '/models/ai-archive/wine-lees-fish.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/wine-lees-fish.md',
        brief: '糟溜黑鱼片完美融合了酒糟的陈香与黑鱼的鲜嫩。苏州特产香糟卤赋予鱼片馥郁的酒香，鱼肉洁白如玉，滑嫩细腻，入口即化，是苏帮菜中"糟"味烹饪的典范。',
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
        model3D: '/models/ai-archive/sweet-sour-ribs.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/sweet-sour-ribs.md',
        brief: '糖醋排骨是苏州人"尚甜"饮食文化的代表。精选猪肋排，经油炸与糖醋汁焖煮，色泽酱红，肉质酥烂脱骨。入口酸甜适度，收口微酸，口感丰富，是江南水乡的经典味道。',
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
        model3D: '/models/ai-archive/whitebait-eggs.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/whitebait-eggs.md',
        brief: '银鱼炒蛋是太湖"三白"之一银鱼与土鸡蛋的完美结合。银鱼通体洁白，无骨无刺，肉质细嫩；鸡蛋金黄软嫩。成菜色泽黄白相间，口感滑嫩，鲜美清淡，是苏州时令美味的代表。',
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
        model3D: '/models/ai-archive/red-bean-soup.glb',
        contextSource: 'dianping',
        contextPath: '/docs/ai-archive/red-bean-soup.md',
        brief: '赤豆圆子是苏州街头巷尾的温暖记忆。精选赤豆慢熬成绵密豆沙，搭配手工"拖"制的Q弹小圆子，甜润软糯。它不仅是一道甜品，更寓意着"团圆"与"甜蜜"。',
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
