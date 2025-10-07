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
    author: 'Diner A',
    rating: 5,
    content: 'A long-standing establishment on Fenghuang Street, specializing in traditional Subang cuisine. The restaurant spans two floors with modest décor focusing on affordability. The Baishi Platter is authentic with pork tendon, tripe, fish slices, meat slices, black fungus, and bamboo shoots—light yet incredibly fresh. The Cherry Pork has a beautiful cherry-red color and tender texture. The Squirrel Fish is perfectly fried, crispy inside and out, though the sauce could be slightly more sweet and sour. Excellent value for money.',
    date: '2025-10-07',
    verified: true,
    type: 'customer'
  },
  {
    id: '2',
    author: 'Diner B',
    rating: 5,
    content: 'A true Suzhou heritage restaurant, serving authentic Subang cuisine. With the opening of Metro Line 6, it is now more accessible than ever. Their Baishi Platter, Cherry Pork, Leek with Pork Kidneys, Hand-Peeled River Shrimp, Squirrel Fish, and Salted Pork Vegetable Rice reach truly impressive standards. Private dining rooms upstairs require early reservations, but plenty of seating is available for walk-ins. Many diners come specifically for their reputation.',
    date: '2025-10-06',
    verified: true,
    type: 'customer'
  },
  {
    id: '3',
    author: 'Diner C',
    rating: 5,
    content: 'This Acheng Restaurant on Fenghuang Street has been operating for decades and serves genuinely authentic Subang cuisine. I have been dining here with friends for many years, and most customers are locals. The restaurant has recently been renovated with a pleasant environment. Their seasonal vegetables, shrimp, and braised pork knuckle are all exceptionally well-executed.',
    date: '2025-09-26',
    verified: true,
    type: 'customer'
  },
  {
    id: '4',
    author: 'Diner D',
    rating: 5,
    content: 'Outstanding value for money. I come here frequently. The location is excellent, close to my former school. The staff are very attentive, regularly changing our plates and providing thoughtful service. The Subang cuisine is authentic, and I often order takeout as well. The Hot Oil Eel is aromatic, the Soy Sauce Shrimp is fresh, and the radish is flavorful and tender—delicious. You cannot go wrong with any dish here. Simply excellent.',
    date: '2025-09-21',
    verified: true,
    type: 'customer'
  },
  {
    id: '5',
    author: 'Diner E',
    rating: 5,
    content: 'I have been dining at this restaurant for thirty years. Located at the intersection of Fenghuang Street and Shiquan Street, with a metro station to the north at Wangxingqiao, and adjacent to the popular Shiquan Street. The facade has recently been renovated, making the dining environment even better. They specialize in Subang cuisine—Squirrel Fish and Hot Oil Eel are exceptional. Absolutely a high-quality, affordable Subang restaurant with excellent repeat customer rates.',
    date: '2025-09-13',
    verified: true,
    type: 'customer'
  },
  {
    id: '6',
    author: 'Diner F',
    rating: 5,
    content: 'Acheng Restaurant is a long-established venue on Fenghuang Street, specializing in Subang cuisine. I had not visited in a while, but the environment has completely transformed—clean and tidy, with outdoor seating available. The food is excellent: the Stir-Fried River Shrimp is fresh and bouncy, the Lotus Pond Stir-Fry is crisp and refreshing, and the Osmanthus Rice Cake is soft, glutinous, and sweet with beautiful presentation. Attentive service—truly a fine Subang restaurant.',
    date: '2025-09-01',
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
    id: '3',
    title: 'Chef Portrait',
    description: 'Master Chef Chen in traditional chef attire',
    category: 'chef',
    imageUrl: '/images/gallery/chef-portrait.jpg',
    alt: 'Portrait of Master Chef Chen'
  },
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
    title: 'Restaurant Mascot',
    description: 'The beloved mascot of Acheng Restaurant',
    category: 'mascot',
    imageUrl: '/images/gallery/restaurant-mascot.jpg',
    alt: 'Acheng Restaurant mascot'
  },
  {
    id: '4',
    title: 'Tempting Food',
    description: 'Delicious Subang cuisine dishes',
    category: 'food',
    imageUrl: '/images/gallery/tempting-food.jpg',
    alt: 'Tempting Subang cuisine dishes'
  },
  {
    id: '5',
    title: 'Ingredient Preparation',
    description: 'Fresh ingredients carefully prepared for cooking',
    category: 'preparation',
    imageUrl: '/images/gallery/ingredient-preparation.jpg',
    alt: 'Fresh ingredients preparation'
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
