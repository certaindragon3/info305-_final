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
    slug: 'red-braised-pork',
    name: 'Red Braised Pork',
    nameZh: '红烧肉',
    category: 'classic',
    isSignature: false,
    description: 'A classic Subang dish featuring tender pork belly in rich, caramelized soy sauce.',
    story: 'This comfort food has been a staple in Suzhou households for generations, representing the essence of home cooking.',
    recipe: {
      ingredients: [
        'Pork belly (500g)',
        'Dark soy sauce',
        'Light soy sauce',
        'Rock sugar',
        'Shaoxing wine'
      ],
      steps: [
        'Cut pork belly into cubes',
        'Blanch to remove impurities',
        'Caramelize rock sugar',
        'Braise with soy sauces and wine',
        'Simmer until tender'
      ],
      cookingTime: '1.5 hours',
      difficulty: 'medium'
    },
    media: {
      model3D: '/models/red-braised-pork.glb',
      images: ['/images/red-braised-pork-1.jpg']
    },
    culturalSignificance: 'Symbolizes prosperity and family unity in Chinese culture.'
  },
  {
    id: '3',
    slug: 'sweet-sour-ribs',
    name: 'Sweet and Sour Ribs',
    nameZh: '糖醋排骨',
    category: 'classic',
    isSignature: false,
    description: 'Perfectly balanced sweet and sour flavors coating tender pork ribs.',
    story: 'A beloved dish that showcases the Subang expertise in balancing contrasting flavors.',
    recipe: {
      ingredients: [
        'Pork ribs (600g)',
        'Black vinegar',
        'Rock sugar',
        'Light soy sauce',
        'Ginger and scallions'
      ],
      steps: [
        'Blanch ribs to remove blood',
        'Fry until golden brown',
        'Create sweet and sour sauce',
        'Braise ribs in sauce',
        'Reduce sauce until glossy'
      ],
      cookingTime: '40 minutes',
      difficulty: 'medium'
    },
    media: {
      model3D: '/models/sweet-sour-ribs.glb',
      images: ['/images/sweet-sour-ribs-1.jpg']
    },
    culturalSignificance: 'Demonstrates the Subang mastery of sauce-based cooking techniques.'
  },
  {
    id: '4',
    slug: 'steamed-fish',
    name: 'Steamed Bass',
    nameZh: '清蒸鲈鱼',
    category: 'classic',
    isSignature: false,
    description: 'Fresh bass steamed to perfection with minimal seasoning to highlight natural flavors.',
    story: 'This dish embodies the Subang principle of preserving the natural essence of fresh ingredients.',
    recipe: {
      ingredients: [
        'Fresh sea bass (1 whole)',
        'Ginger slices',
        'Scallions',
        'Light soy sauce',
        'Cooking wine'
      ],
      steps: [
        'Clean and score the fish',
        'Marinate with wine and ginger',
        'Steam for 8-10 minutes',
        'Top with fresh scallions',
        'Finish with hot oil and soy sauce'
      ],
      cookingTime: '15 minutes',
      difficulty: 'easy'
    },
    media: {
      model3D: '/models/steamed-fish.glb',
      images: ['/images/steamed-fish-1.jpg']
    },
    culturalSignificance: 'Represents the Subang philosophy of respecting ingredient integrity.'
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
    author: 'Sarah L.',
    rating: 5,
    content: 'The squirrel fish here brings back childhood memories of my grandmother\'s cooking. Absolutely authentic!',
    date: '2024-01-15',
    verified: true,
    type: 'customer'
  },
  {
    id: '2',
    author: 'Food Critic Wang',
    rating: 5,
    content: 'Authentic Subang cuisine at its finest. Master Chen\'s skills are unmatched in preserving traditional techniques.',
    date: '2024-01-10',
    verified: true,
    type: 'critic'
  },
  {
    id: '3',
    author: 'Local Historian',
    rating: 5,
    content: 'A cultural treasure that must be preserved. This restaurant maintains the true essence of Subang culinary heritage.',
    date: '2024-01-05',
    verified: true,
    type: 'historian'
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
    label: 'Red Braised Pork'
  },
  {
    id: '3',
    dishId: '3',
    position: [0, 1, 2],
    label: 'Sweet-Sour Ribs'
  },
  {
    id: '4',
    dishId: '4',
    position: [0, 1, -2],
    label: 'Steamed Fish'
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