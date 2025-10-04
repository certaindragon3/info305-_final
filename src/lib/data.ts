import { Dish, Restaurant, Review, CulturalContext, PhotoGallery, InteractivePoint } from './types';

// Sample dishes data (placeholder content)
export const dishes: Dish[] = [
  {
    id: '1',
    slug: 'squirrel-fish',
    name: 'Squirrel Fish',
    nameZh: '松鼠桂鱼',
    category: 'signature',
    isSignature: true,
    description: 'The crown jewel of Subang cuisine with 400-year history. A masterpiece of knife work and sweet-sour balance.',
    story: 'Legend has it that this dish was created during the Ming Dynasty when a chef needed to prepare fish for the emperor. The intricate cutting technique makes the fish resemble a squirrel when cooked.',
    recipe: {
      ingredients: [
        'Fresh mandarin fish (1kg)',
        'Cornstarch for coating',
        'Sweet and sour sauce ingredients',
        'Pine nuts for garnish'
      ],
      steps: [
        'Debone the fish while keeping the shape intact',
        'Score the fish flesh in a crosshatch pattern',
        'Coat with cornstarch and deep fry until golden',
        'Pour the sweet and sour sauce over the fish',
        'Garnish with pine nuts'
      ],
      cookingTime: '45 minutes',
      difficulty: 'hard'
    },
    media: {
      model3D: '/models/squirrel-fish.glb',
      images: ['/images/squirrel-fish-1.jpg', '/images/squirrel-fish-2.jpg'],
      audio: '/audio/chef-squirrel-fish.mp3'
    },
    chef: {
      name: 'Master Chen',
      note: 'The key is precision in knife work. Each cut must be exactly 2mm apart to achieve the perfect texture.',
      voiceNote: '/audio/chef-squirrel-fish.mp3'
    },
    culturalSignificance: 'Represents the pinnacle of Subang cuisine knife skills and the harmony of sweet and sour flavors.'
  },
  {
    id: '2',
    slug: 'lotus-stir-fry',
    name: 'Lotus Pond Stir-fry',
    nameZh: '荷塘小炒',
    category: 'classic',
    isSignature: false,
    description: 'A light, elegant stir-fry with lotus root, lily bulb, snow peas, and seasonal vegetables—clean flavors and crisp textures.',
    story: 'Named for its lotus-inspired ingredients, this dish embodies the Su cuisine ethos of freshness, balance, and visual elegance.',
    recipe: {
      ingredients: [
        'Lotus root slices',
        'Fresh lily bulb (百合)',
        'Snow peas',
        'Carrot slices',
        'Wood ear fungus',
        'Salt, sugar, vegetable oil'
      ],
      steps: [
        'Blanch crunchy veggies briefly to retain texture',
        'Heat wok with light oil, stir-fry aromatics quickly',
        'Add vegetables by hardness and toss rapidly',
        'Season mildly to preserve natural sweetness',
        'Plate neatly to highlight color balance'
      ],
      cookingTime: '15 minutes',
      difficulty: 'easy'
    },
    media: {
      model3D: '/models/lotus-stir-fry.glb',
      images: ['/images/lotus-stir-fry-1.jpg']
    },
    culturalSignificance: 'Reflects the Subang preference for clarity and finesse—crisp textures, gentle seasoning, and seasonal produce.'
  },
  {
    id: '3',
    slug: 'biluochun-shrimp',
    name: 'Biluochun Tea Shrimp',
    nameZh: '碧螺虾仁',
    category: 'classic',
    isSignature: false,
    description: 'Delicate river shrimp flash-cooked and infused with Biluochun tea fragrance—fresh, sweet, and tender.',
    story: 'A Suzhou specialty marrying local tea culture with premium freshwater shrimp; timing and temperature control are crucial.',
    recipe: {
      ingredients: [
        'Shelled river shrimp (虾仁)',
        'Biluochun tea leaves',
        'Egg white and starch (for velveting)',
        'Salt and a touch of sugar'
      ],
      steps: [
        'Velvet shrimp with egg white and starch until lightly set',
        'Brew Biluochun tea to a light infusion; reserve leaves',
        'Gently stir-fry shrimp on low heat to just-opaque',
        'Add tea infusion and a few tea leaves for aroma',
        'Season delicately and plate immediately'
      ],
      cookingTime: '12 minutes',
      difficulty: 'medium'
    },
    media: {
      model3D: '/models/biluochun-shrimp.glb',
      images: ['/images/biluochun-shrimp-1.jpg']
    },
    culturalSignificance: 'Showcases Suzhou terroir—tea and waterways—through refined technique and subtle aromas.'
  },
  {
    id: '4',
    slug: 'hot-oil-eel',
    name: 'Hot Oil Eel',
    nameZh: '响油鳝糊',
    category: 'classic',
    isSignature: false,
    description: 'Silky-smooth shredded eel finished with sizzling hot oil for a signature aroma; savory-sweet and glossy.',
    story: 'A Jiangnan classic prized for texture. The finishing “sizzle” (响油) releases fragrance and gives the dish its name.',
    recipe: {
      ingredients: [
        'Eel fillets (shredded)',
        'Ginger and scallions',
        'Light soy, a touch of sugar',
        'Starch slurry',
        'Hot scallion oil for finishing'
      ],
      steps: [
        'Stir-fry eel shreds quickly to set texture',
        'Add aromatics and seasonings; thicken lightly',
        'Plate the eel and pour sizzling hot scallion oil over top',
        'Serve immediately for best aroma'
      ],
      cookingTime: '18 minutes',
      difficulty: 'medium'
    },
    media: {
      model3D: '/models/hot-oil-eel.glb',
      images: ['/images/hot-oil-eel-1.jpg']
    },
    culturalSignificance: 'Represents texture mastery and the hallmark finishing technique of Jiangnan kitchens.'
  }
];

export const restaurant: Restaurant = {
  name: 'Acheng Restaurant',
  history: 'Founded in 1999, this neighborhood Suzhou eatery just off Shiquan Street has quietly served classic Su cuisine for 26 years. Unlike celebrated Michelin-listed kitchens, this under-recognized community restaurant is cherished mainly by local elders. Now entering a sensitive transition as the chef-owner retires and stewardship passes to his son.',
  location: 'Near Shiquan Street, Suzhou, Jiangsu Province, China',
  established: '1999',
  philosophy: 'To preserve the slow, subtle idiom of authentic Subang cuisine through labor-intensive dishes and tacit techniques passed down through generations.',
  layout: {
    description: 'Traditional Suzhou-style architecture with modern kitchen facilities',
    zones: [
      {
        name: 'Main Dining Hall',
        description: 'Traditional Chinese dining room with round tables',
        position: { x: 0, y: 0 }
      },
      {
        name: 'Private Rooms',
        description: 'Intimate spaces for family gatherings',
        position: { x: 100, y: 0 }
      },
      {
        name: 'Open Kitchen',
        description: 'Where guests can observe the cooking process',
        position: { x: 50, y: 100 }
      }
    ]
  }
};

export const reviews: Review[] = [
  {
    id: '1',
    author: '美食探店王',
    rating: 5,
    content: '松鼠桂鱼是真的绝！外酥里嫩，酸甜恰到好处。师傅的刀工太厉害了，每一片鱼肉都薄厚均匀。环境也很雅致，适合家庭聚餐。',
    date: '2024-01-15',
    verified: true,
    type: 'customer'
  },
  {
    id: '2',
    author: '苏州老饕',
    rating: 5,
    content: '阿诚家的苏帮菜做的很地道，不愧是老字号。荷塘小炒清爽不油腻，碧螺虾仁鲜嫩入味，每一道菜都能看出厨师的用心和功底。',
    date: '2024-01-10',
    verified: true,
    type: 'customer'
  },
  {
    id: '3',
    author: '江南美食家',
    rating: 5,
    content: '这家店坚守传统工艺值得点赞！响油鳝糊的火候掌握得恰到好处，鳝丝嫩滑，油温的把控体现了真功夫。希望这样的老手艺能一直传承下去。',
    date: '2024-01-05',
    verified: true,
    type: 'customer'
  },
  {
    id: '4',
    author: '文化研究者',
    rating: 5,
    content: '不只是一家餐厅，更像是苏帮菜的活化石。从食材选择到烹饪手法都遵循古法，是研究江南饮食文化不可多得的实践样本。',
    date: '2023-12-28',
    verified: true,
    type: 'historian'
  },
  {
    id: '5',
    author: '上海吃货小分队',
    rating: 5,
    content: '专程从上海开车过来的，没有失望！菜品精致，摆盘讲究，味道正宗。特别推荐松鼠桂鱼和碧螺虾仁，性价比很高。',
    date: '2023-12-20',
    verified: true,
    type: 'customer'
  },
  {
    id: '6',
    author: '本地居民',
    rating: 5,
    content: '从1999年开业就一直光顾，二十多年了味道始终如一。陈师傅的手艺是真没话说，每次带外地朋友来都赞不绝口。',
    date: '2023-12-15',
    verified: true,
    type: 'customer'
  }
];

export const culturalContext: CulturalContext = {
  overview: 'Subang cuisine, with origins dating back to the Spring and Autumn period, represents one of China\'s Eight Great Cuisines. Rooted in the philosophy of "Golden Mean" and characterized by "seven tastes and seven senses," it embodies the cultural principle of balance and moderation. This Intangible Cultural Heritage emphasizes precise technique, natural flavors, and elegant presentation.',
  threats: [
    'Rising costs and prevalence of premade food',
    'Younger diners\' preference for spicier Sichuan/Hunan flavors',
    'Limited innovation and low brand recognition compared to other cuisines',
    'Difficulty in passing traditional techniques to younger generations',
    'Loss of master chefs with authentic knowledge',
    'Commercialization pressure threatening authenticity'
  ],
  preservation: 'If these labor-intensive techniques and tacit knowledge don\'t get recorded during this critical transition period, they may become impossible to revive later. Digital archives can preserve both recipes and the cultural stories surrounding them.',
  characteristics: [
    'Mild, refreshingly silky, lightly sweet, and umami flavors',
    'Exquisite knife work and precise temperature control',
    'Texture mastery: soft without mushiness',
    'Visual elegance and pursuit of perfection',
    'Integration of health principles with culinary artistry',
    'Balance of flavor, nutrition, color, and texture'
  ]
};

export const photoGallery: PhotoGallery[] = [
  {
    id: '1',
    title: 'Traditional Dining Hall',
    description: 'The main dining area showcasing classic Chinese round tables',
    category: 'dining-hall',
    imageUrl: '/images/gallery/dining-hall.jpg',
    alt: 'Traditional Chinese restaurant dining hall with round tables'
  },
  {
    id: '2',
    title: 'Master Chef at Work',
    description: 'Chef Chen demonstrating traditional knife techniques',
    category: 'kitchen',
    imageUrl: '/images/gallery/chef-work.jpg',
    alt: 'Chef working in traditional Chinese kitchen'
  },
  {
    id: '3',
    title: 'Chef Portrait',
    description: 'Master Chef Chen in traditional chef attire',
    category: 'chef',
    imageUrl: '/images/gallery/chef-portrait.jpg',
    alt: 'Portrait of Master Chef Chen'
  },
  {
    id: '4',
    title: 'Restaurant Interior',
    description: 'Traditional Suzhou-style interior design',
    category: 'interior',
    imageUrl: '/images/gallery/interior.jpg',
    alt: 'Traditional restaurant interior design'
  },
  {
    id: '5',
    title: 'Cooking Process',
    description: 'Traditional cooking techniques in action',
    category: 'process',
    imageUrl: '/images/gallery/cooking-process.jpg',
    alt: 'Traditional Chinese cooking process'
  }
];

export const interactivePoints: InteractivePoint[] = [
  {
    id: '1',
    dishId: '1',
    position: [2, 1, 0],
    label: 'Squirrel Fish'
  },
  {
    id: '2',
    dishId: '2',
    position: [-2, 1, 0],
    label: 'Lotus Stir-fry'
  },
  {
    id: '3',
    dishId: '3',
    position: [0, 1, 2],
    label: 'Biluochun Shrimp'
  },
  {
    id: '4',
    dishId: '4',
    position: [0, 1, -2],
    label: 'Hot Oil Eel'
  }
];

// Helper functions
export const getDishBySlug = (slug: string): Dish | undefined => {
  return dishes.find(dish => dish.slug === slug);
};

export const getSignatureDish = (): Dish => {
  return dishes.find(dish => dish.isSignature) || dishes[0];
};

export const getRegularDishes = (): Dish[] => {
  return dishes.filter(dish => !dish.isSignature);
};
