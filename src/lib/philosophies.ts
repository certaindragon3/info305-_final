import { Philosophy } from './types';

export const philosophies: Philosophy[] = [
  {
    id: '1',
    slug: 'seasonal-sourcing',
    titleZh: '应时应季',
    titleEn: 'Seasonal Sourcing: The First Gate',
    subtitle: 'Freshness as craft value and daily discipline',
    heroVisual: {
      type: 'image',
      src: '/images/philosophy/market-morning.jpg'
    },

    // Concept map nodes and edges for React Flow
    conceptMap: {
      nodes: [
        {
          id: 'core',
          label: '第一道门\nFirst Gate to Guard',
          description: 'Freshness as foundational principle organizing daily practice',
          category: 'core-value'
        },
        {
          id: 'practice1',
          label: '市场清晨采购\nMorning Market Sourcing',
          description: 'Daily 9am market visits with tactile assessment',
          category: 'practice'
        },
        {
          id: 'practice2',
          label: '触感测试\nTactile Assessment',
          description: 'Look, smell, touch - embodied quality judgment',
          category: 'practice'
        },
        {
          id: 'practice3',
          label: '时令食材\nSeasonal Ingredients',
          description: 'Solar terms knowledge guides ingredient selection',
          category: 'practice'
        },
        {
          id: 'constraint1',
          label: '时间敏感性\nTime Sensitivity',
          description: 'Prep sequences structured around ingredient freshness windows',
          category: 'constraint'
        },
        {
          id: 'outcome1',
          label: '菜品时令调整\nSeasonal Dish Variations',
          description: 'Menu adapts to market availability - 松鼠桂鱼, 荷塘小炒',
          category: 'outcome'
        },
        {
          id: 'outcome2',
          label: '主料为主\nIngredient-Forward',
          description: 'Main ingredient占3/4, minimal seasoning to honor original flavor',
          category: 'outcome'
        }
      ],
      edges: [
        { from: 'core', to: 'practice1', relationship: 'enables' },
        { from: 'core', to: 'practice2', relationship: 'enables' },
        { from: 'core', to: 'practice3', relationship: 'enables' },
        { from: 'practice1', to: 'outcome1', relationship: 'enables' },
        { from: 'practice2', to: 'constraint1', relationship: 'enables' },
        { from: 'practice3', to: 'outcome1', relationship: 'enables' },
        { from: 'constraint1', to: 'outcome2', relationship: 'enables' }
      ]
    },

    fieldworkEvidence: {
      interviewQuotes: [
        {
          speaker: '沈师傅',
          timestamp: '00:01:43',
          content: '新鲜度啊肯定是首要把关的，这个是一个一个关键点了。',
          context: 'Interview discussion on restaurant positioning and values',
          audioClip: '/audio/interview-freshness.mp3'
        },
        {
          speaker: '沈师傅',
          timestamp: '00:10:20',
          content: '首先一看跟闻基本上定型，摸呢基本上可能就说在再验证一下。一看二闻三摸，这个是我们行业里的一个心得。',
          context: 'Explaining embodied assessment criteria for ingredient quality',
          audioClip: '/audio/interview-assessment.mp3'
        },
        {
          speaker: '观察笔记',
          content: 'Morning orders placed at 9pm previous day for 9am delivery. Owner personally inspects each delivery, handling fish and vegetables to assess texture and smell.',
          context: 'Field observation, September 21, 2025'
        }
      ],
      observationalData: {
        photos: [
          '/images/fieldwork/market-delivery.jpg',
          '/images/fieldwork/fish-inspection.jpg',
          '/images/fieldwork/vegetable-prep.jpg'
        ],
        videos: [
          '/videos/fieldwork/morning-delivery.mp4',
          '/videos/fieldwork/ingredient-assessment.mp4'
        ],
        captions: [
          'Morning delivery inspection: tactile assessment of fish freshness',
          'Vegetable selection process showing seasonal variation',
          'Prep station organized by ingredient freshness windows'
        ]
      }
    },

    academicContext: {
      researchQuestion: 'How do craft values structure daily routines and material choices in neighborhood kitchens?',
      theoreticalLens: [
        'embodied knowledge',
        'material culture',
        'temporal routines',
        'quality as craft value'
      ],
      keyReferences: [
        {
          citation: 'Abbate, C. S. (2021). The phenomenology of making: Habit, insight, and material life. Rowman & Littlefield.',
          relevance: 'Theoretical framework for understanding craft values as organizing principles rather than branding'
        },
        {
          citation: 'Shen, J. (2025, September 21). Interview with project team. Suzhou.',
          relevance: 'Primary source for freshness-as-gate principle and embodied assessment criteria'
        }
      ]
    },

    relatedDishes: ['squirrel-fish', 'lotus-stir-fry', 'tea-shrimp'],
    relatedPhilosophies: ['sincerity-craft']
  },

  {
    id: '2',
    slug: 'sincerity-craft',
    titleZh: '诚与工',
    titleEn: 'Sincerity & Craft',
    subtitle: 'Three decisive competencies that define mastery',
    heroVisual: {
      type: 'image',
      src: '/images/philosophy/knife-work.jpg'
    },

    conceptMap: {
      nodes: [
        {
          id: 'core',
          label: '三大技术点\nThree Decisive Competencies',
          description: 'Knife work, oil shaping, living sauce - 松鼠桂鱼 mastery',
          category: 'core-value'
        },
        {
          id: 'skill1',
          label: '刀工\nPrecise Knife Work',
          description: 'Crosshatch lattice without membrane rupture',
          category: 'practice'
        },
        {
          id: 'skill2',
          label: '油锅定型\nDeep-Fry Shaping',
          description: 'Temperature judgment by bubble tempo and oil shimmer',
          category: 'practice'
        },
        {
          id: 'skill3',
          label: '活卤\nLiving Sauce',
          description: 'Sweet-sour balance at nappe - glaze viscosity and clarity',
          category: 'practice'
        },
        {
          id: 'signal1',
          label: '气泡节奏\nBubble Tempo',
          description: 'Auditory and visual cues for oil readiness',
          category: 'outcome'
        },
        {
          id: 'signal2',
          label: '刀口深度\nBlade Depth',
          description: 'Muscle memory - rhythmic tempo indicating precision',
          category: 'outcome'
        },
        {
          id: 'outcome1',
          label: '造型独特\nSculptural Form',
          description: 'Squirrel shape maintained through cooking',
          category: 'outcome'
        }
      ],
      edges: [
        { from: 'core', to: 'skill1', relationship: 'enables' },
        { from: 'core', to: 'skill2', relationship: 'enables' },
        { from: 'core', to: 'skill3', relationship: 'enables' },
        { from: 'skill1', to: 'signal2', relationship: 'enables' },
        { from: 'skill2', to: 'signal1', relationship: 'enables' },
        { from: 'skill1', to: 'outcome1', relationship: 'enables' },
        { from: 'skill2', to: 'outcome1', relationship: 'enables' },
        { from: 'skill3', to: 'outcome1', relationship: 'enables' }
      ]
    },

    fieldworkEvidence: {
      interviewQuotes: [
        {
          speaker: '沈师傅',
          timestamp: '00:08:24',
          content: '这个菜里面其实行业里面讲究三大点：一个刀工，一个就是说它是在油锅里那个怎么样定型油炸，再第三个就是说它的那个卤汁要把它调和成呢活卤。',
          context: 'Explaining the three pillars of 松鼠桂鱼 mastery',
          audioClip: '/audio/interview-three-techniques.mp3'
        },
        {
          speaker: '观察笔记',
          content: 'Chef\'s blade angle remains consistent at ~30° to spine. Each cut takes approximately 1.2 seconds. Pause after every 5th cut to assess progress. Total lattice time: ~8 minutes for one fish.',
          context: 'Video analysis of knife work sequence, September 21, 2025'
        }
      ],
      observationalData: {
        photos: [
          '/images/fieldwork/knife-lattice.jpg',
          '/images/fieldwork/oil-bubbles.jpg',
          '/images/fieldwork/sauce-nappe.jpg'
        ],
        videos: [
          '/videos/fieldwork/knife-work-sequence.mp4',
          '/videos/fieldwork/oil-temperature-judgment.mp4',
          '/videos/fieldwork/sauce-finishing.mp4'
        ],
        captions: [
          'Crosshatch knife work: blade depth and angle consistency',
          'Oil bubble assessment: tempo and size indicate readiness',
          'Sauce finishing: achieving nappe viscosity for proper glaze'
        ]
      }
    },

    academicContext: {
      researchQuestion: 'How are tacit decision criteria encoded in observable signals during culinary practice?',
      theoreticalLens: [
        'embodied cognition',
        'tacit knowledge transmission',
        'sensory expertise',
        'craft mastery'
      ],
      keyReferences: [
        {
          citation: 'Mirri, S., Prandi, C., Roccetti, M., & Salomoni, P. (2017). Handmade narrations: Handling digital narrations on food and gastronomic culture. ACM Journal on Computing and Cultural Heritage, 10(4), Article 20.',
          relevance: 'Framework for understanding hands as mediators of meaning in culinary culture'
        }
      ]
    },

    relatedDishes: ['squirrel-fish'],
    relatedPhilosophies: ['seasonal-sourcing']
  },

  {
    id: '3',
    slug: 'grounded-approach',
    titleZh: '接地气',
    titleEn: 'Grounded Approach: Community-Embedded Practice',
    subtitle: 'Neighborhood model vs destination dining',
    heroVisual: {
      type: 'image',
      src: '/images/philosophy/community-dining.jpg'
    },

    conceptMap: {
      nodes: [
        {
          id: 'core',
          label: '接地气\nGrounded Philosophy',
          description: 'Community-embedded, accessible, no-frills hospitality',
          category: 'core-value'
        },
        {
          id: 'practice1',
          label: '性价比\nValue Proposition',
          description: 'High quality at accessible prices for neighborhood diners',
          category: 'practice'
        },
        {
          id: 'practice2',
          label: '实诚\nAuthenticity',
          description: 'Plain name, plain signage, genuine ingredients',
          category: 'practice'
        },
        {
          id: 'adaptation',
          label: '市场适应\nMarket Adaptation',
          description: 'Core Su cuisine + small spicy repertoire for travelers',
          category: 'practice'
        },
        {
          id: 'outcome1',
          label: '社区食客\nRegular Patrons',
          description: 'Neighborhood elders, families - not destination diners',
          category: 'outcome'
        },
        {
          id: 'outcome2',
          label: '包容性待客\nInclusive Hospitality',
          description: 'Adjustments without dissolving core identity',
          category: 'outcome'
        }
      ],
      edges: [
        { from: 'core', to: 'practice1', relationship: 'enables' },
        { from: 'core', to: 'practice2', relationship: 'enables' },
        { from: 'practice1', to: 'outcome1', relationship: 'enables' },
        { from: 'practice2', to: 'outcome1', relationship: 'enables' },
        { from: 'core', to: 'adaptation', relationship: 'enables' },
        { from: 'adaptation', to: 'outcome2', relationship: 'enables' }
      ]
    },

    fieldworkEvidence: {
      interviewQuotes: [
        {
          speaker: '沈师傅',
          timestamp: '00:01:43',
          content: '阿成饭店呢就说名字听上去就很普通嘛，也就是说寓意的话也就是说能够接地气，贴合那个我们大众消费的一个路线，也就是说性价比相对高一点。',
          context: 'Explaining restaurant name and positioning philosophy',
          audioClip: '/audio/interview-grounded.mp3'
        },
        {
          speaker: '沈师傅',
          timestamp: '00:05:04',
          content: '对于我们饭店来讲，你说除了苏帮菜家常菜的话，那我们还适时的加入一些湘菜、川菜...对于他们的口味调剂，那个适应度呢相约能够提高一点。',
          context: 'Discussing pragmatic menu adaptation for diverse diners',
          audioClip: '/audio/interview-adaptation.mp3'
        }
      ],
      observationalData: {
        photos: [
          '/images/fieldwork/plain-signage.jpg',
          '/images/fieldwork/family-table.jpg',
          '/images/fieldwork/neighborhood-diners.jpg'
        ],
        videos: [],
        captions: [
          'Unassuming exterior on Fenghuang Street - no ornate signage',
          'Multi-generational family dining - regular neighborhood patrons',
          'Utilitarian dining room reflecting accessibility over luxury'
        ]
      }
    },

    academicContext: {
      researchQuestion: 'How do neighborhood restaurants balance cultural identity with market pragmatism?',
      theoreticalLens: [
        'community-embedded practice',
        'cultural identity maintenance',
        'adaptive tradition',
        'inclusive hospitality'
      ],
      keyReferences: [
        {
          citation: 'Shen, J. (2025, September 21). Interview with project team. Suzhou.',
          relevance: 'Primary articulation of grounded philosophy and market adaptation strategy'
        }
      ]
    },

    relatedDishes: ['squirrel-fish', 'lotus-stir-fry', 'tea-shrimp', 'hot-oil-eel'],
    relatedPhilosophies: ['seasonal-sourcing', 'sincerity-craft']
  }
];

// Helper functions
export function getPhilosophyBySlug(slug: string): Philosophy | undefined {
  return philosophies.find(p => p.slug === slug);
}

export function getAllPhilosophies(): Philosophy[] {
  return philosophies;
}
