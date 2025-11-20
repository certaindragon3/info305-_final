import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import path from 'path'
import fs from 'fs'
import { dishes, getDishBySlug } from '@/lib/data'
import type { PerspectiveCardItem } from '@/components/dish/annotations/DishPerspectiveCards'
import { DishSubpageExperience } from '@/components/dish/3d/DishSubpageExperience'
import { DishImageCarousel } from '@/components/dish/gallery/DishImageCarousel'
import { DishBentoCards } from '@/components/dish/info/DishBentoCards'
import { DishInteractiveWindow } from '@/components/dish/3d/DishInteractiveWindow'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const dish = getDishBySlug(slug)
  if (!dish) return {}
  const title = `${dish.nameZh} | ${dish.name} — Acheng Museum`
  const description = dish.description
  return {
    title,
    description,
    alternates: { canonical: `/dishes/${dish.slug}` },
    openGraph: {
      title,
      description,
      type: 'article'
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  }
}

export default async function DishPage({ params }: Params) {
  const { slug } = await params
  const dish = getDishBySlug(slug)
  if (!dish) return notFound()

  // Derive model variants
  const aiModelUrl = dish.media.model3D
  const file = path.basename(aiModelUrl)
  const nameNoExt = file.replace(/\.glb$/i, '')
  const scanFile = `${nameNoExt}_scan.glb`
  const scanFsPath = path.join(process.cwd(), 'public', 'models', scanFile)
  const scanExists = fs.existsSync(scanFsPath)
  const scanModelUrl = scanExists ? `/models/${scanFile}` : undefined

  // Collect field images from public/images/<Folder>
  const folderBySlug: Record<string, string> = {
    'squirrel-fish': 'Squirrel_Fish',
    'lotus-stir-fry': 'Lotus_Pond_Stir-fry',
    'biluochun-shrimp': 'Biluochun_Tea Shrimp',
    'hot-oil-eel': 'Hot_Oil_Eel',
  }
  const folderName = folderBySlug[dish.slug]
  let photoImages: string[] = []
  try {
    if (folderName) {
      const dir = path.join(process.cwd(), 'public', 'images', folderName)
      const files = fs.readdirSync(dir)
      photoImages = files
        .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
        .sort((a, b) => {
          // Sort numerically by filename (1.JPG, 2.JPG, 3.JPG)
          const aNum = parseInt(a.match(/\d+/)?.[0] || '0')
          const bNum = parseInt(b.match(/\d+/)?.[0] || '0')
          return aNum - bNum
        })
        .map((f) => `/images/${folderName}/${f}`)
    }
  } catch { }

  // Perspective cards content per dish (English annotations for rotation stage)
  const cards: PerspectiveCardItem[] = (() => {
    const d = dish.slug
    if (d === 'squirrel-fish') {
      return [
        {
          id: 'sf-1',
          title: 'Knife Work as Architecture',
          subtitle: '2mm spacing, structural crispness',
          direction: 'left',
          description:
            '“扛鼎之作”的核心在刀工。细密均匀的网格式开刀不仅造型如松鼠，更决定了起炸后外酥内嫩的口感层次。',
        },
        {
          id: 'sf-2',
          title: 'Oil Temperature and Shaping',
          subtitle: 'Deep-fry to precise set',
          direction: 'right',
          description:
            '下锅定型的温度与时间构成技艺门槛：外观需立体挺拔，鱼肉纤维又需保持弹性与汁水。',
        },
        {
          id: 'sf-3',
          title: '活卤的平衡',
          subtitle: 'Sweet–sour harmony',
          direction: 'up',
          description:
            '“活卤”强调现调现熬的酸甜平衡与流动性，挂覆后既要明亮通透，又不掩鱼本味。',
        },
        {
          id: 'sf-4',
          title: 'Form, Aroma, and Texture',
          subtitle: 'Three-point standard',
          direction: 'down',
          description:
            '造型、香气与口感三者并举，是传统师承系统中对松鼠桂鱼的核心考核标准。',
        },
      ]
    }
    if (d === 'lotus-stir-fry') {
      return [
        { id: 'lt-1', title: 'Crisp–Tender Timing', subtitle: 'Blanch, then flash stir-fry', direction: 'left', description: '以“嫩而脆”为目标，分层次入锅，尽量缩短受热时间，保留蔬材自然清甜。' },
        { id: 'lt-2', title: 'Color Balance', subtitle: 'Visual elegance', direction: 'right', description: '色彩配伍对应荷塘意象：莹白、翠绿、点缀橙红，呈现江南雅致的视觉秩序。' },
        { id: 'lt-3', title: 'Light Seasoning', subtitle: 'Salt, a touch of sugar', direction: 'up', description: '调味极轻，强调原味清亮；油量控制与起锅温度共同决定“清爽不腻”。' },
        { id: 'lt-4', title: 'Knife and Shape', subtitle: 'Uniform geometry', direction: 'down', description: '切配几何统一、厚薄一致，使口感与视觉都趋于秩序与克制。' },
      ]
    }
    if (d === 'biluochun-shrimp') {
      return [
        { id: 'bs-1', title: 'Tea–Seafood Dialogue', subtitle: 'Biluochun infusion', direction: 'left', description: '以碧螺春清香衔接虾仁的鲜甜，强调香气的“轻”“短”“净”。' },
        { id: 'bs-2', title: 'Velveting Technique', subtitle: 'Protein set just-so', direction: 'right', description: '蛋清与淀粉上浆，热力仅至“转白即离”，保留弹嫩与水分。' },
        { id: 'bs-3', title: 'Aroma Placement', subtitle: 'Leaves as garnish', direction: 'up', description: '少量茶汤与芽叶收尾，令茶香附着而不夺味，呈现江南时令气息。' },
        { id: 'bs-4', title: 'Temperature Discipline', subtitle: 'Low heat control', direction: 'down', description: '全程温度克制，避免过熟发柴，是成败关键。' },
      ]
    }
    // hot-oil-eel
    return [
      { id: 'he-1', title: 'Texture First', subtitle: 'Silky, not mushy', direction: 'left', description: '鳝丝需滑而有筋，淀粉勾薄芡，强调“糊而不糊”的口感边界。' },
      { id: 'he-2', title: 'The “Sizzle” Finish', subtitle: 'Aroma release', direction: 'right', description: '滚烫葱油临门，“响油”声中挥发香气，是命名之源与风味记忆点。' },
      { id: 'he-3', title: 'Sweet–Savory Calibration', subtitle: 'Suzhou palate', direction: 'up', description: '微甜与鲜咸平衡，兼顾地方口味与现代减糖的健康取向。' },
      { id: 'he-4', title: 'Knife and Fire', subtitle: 'Even shreds, quick set', direction: 'down', description: '均匀切丝与快速定型相辅相成，防止鳝肉碎散与出水。' },
    ]
  })()

  const annotationsEn = (() => {
    switch (dish.slug) {
      case 'squirrel-fish':
        return [
          { id: 'sf-1', title: 'Knife Work Architecture', subtitle: '2mm grid, crisp geometry', body: 'The lattice cuts are structural—controlling crispness, volume, and the iconic silhouette once fried.' },
          { id: 'sf-2', title: 'Oil & Form', subtitle: 'Precise set in hot oil', body: 'Shaping happens in the oil: exterior must lift and hold, while fibers remain juicy and resilient.' },
          { id: 'sf-3', title: 'The “Live” Sauce', subtitle: 'Sweet–sour, transparent, mobile', body: 'A freshly balanced syrup coats without masking fish—a luminous glaze that stays alive on the plate.' },
          { id: 'sf-4', title: 'Form • Aroma • Texture', subtitle: 'Three-point standard', body: 'Evaluation hinges on silhouette, fragrance, and bite—a classic Suzhou rubric for a master-level result.' },
        ] as const
      case 'lotus-stir-fry':
        return [
          { id: 'lt-1', title: 'Crisp–Tender Timing', subtitle: 'Blanch then flash-fry', body: 'Heat exposure is minimal and tiered by hardness to preserve vegetal sweetness and snap.' },
          { id: 'lt-2', title: 'Palette Discipline', subtitle: 'Lotus pond tones', body: 'Pearl white, jade green, and accents of orange deliver a calm Jiangnan color grammar.' },
          { id: 'lt-3', title: 'Light Seasoning', subtitle: 'Salt + faint sweetness', body: 'Seasoning stays quiet to foreground freshness; oil and temperature complete the clarity.' },
          { id: 'lt-4', title: 'Knife • Shape • Order', subtitle: 'Uniform geometry', body: 'Even cuts align mouthfeel and presentation—order and restraint as aesthetic practice.' },
        ] as const
      case 'biluochun-shrimp':
        return [
          { id: 'bs-1', title: 'Tea–Sea Dialogue', subtitle: 'Biluochun infusion', body: 'Aromatics are feather-light and short-lived: enough to perfume, never to overpower shrimp sweetness.' },
          { id: 'bs-2', title: 'Velveting', subtitle: 'Protein set “just-so”', body: 'Egg white and starch secure tenderness; remove the moment opacity arrives.' },
          { id: 'bs-3', title: 'Aroma Placement', subtitle: 'Leaves as garnish', body: 'A few leaves and a whisper of tea liquor bind aroma to the surface with elegance.' },
          { id: 'bs-4', title: 'Temperature Discipline', subtitle: 'Low, even heat', body: 'Controlled heat prevents cottony texture—the defining risk in this delicate dish.' },
        ] as const
      default: // hot-oil-eel
        return [
          { id: 'he-1', title: 'Silky, Not Mushy', subtitle: 'Texture as doctrine', body: 'Shreds must be supple yet structured; a thin sheen—not a heavy gloss—keeps the flow.' },
          { id: 'he-2', title: 'The Sizzle Finish', subtitle: 'Aroma release', body: 'Scallion oil poured sizzlingly at the end—the signature sound as fragrance blooms.' },
          { id: 'he-3', title: 'Sweet–Savory Calibration', subtitle: 'Suzhou palate', body: 'A gentle sweetness supports savory depth, updated for contemporary preferences.' },
          { id: 'he-4', title: 'Knife and Fire', subtitle: 'Even shreds, quick set', body: 'Uniform cuts with a rapid set prevent breakage and water loss.' },
        ] as const
    }
  })()

  return (
    <main className="relative min-h-screen bg-slate-950 py-24 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-slate-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white hover:underline">Museum</Link>
            </li>
            <li aria-hidden="true" className="text-slate-500">/</li>
            <li>
              <Link href="/#gallery-exhibition" className="hover:text-white hover:underline">Dishes</Link>
            </li>
            <li aria-hidden="true" className="text-slate-500">/</li>
            <li aria-current="page" className="text-white">{dish.nameZh}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="relative z-[1] mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Exhibition — Dish</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {dish.nameZh}
            <span className="ml-3 text-2xl font-semibold text-slate-300">{dish.name}</span>
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            {dish.isSignature && (
              <span className="rounded-full bg-orange-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">Signature</span>
            )}
            <span className="text-slate-400">{dish.recipe.cookingTime}</span>
            <span className="text-slate-500">Difficulty: {dish.recipe.difficulty}</span>
          </div>
        </header>

        {/* Rotation-driven stage (AI only) */}
        <DishSubpageExperience
          aiModelUrl={aiModelUrl}
          dishName={dish.name}
          dishNameZh={dish.nameZh}
          annotations={annotationsEn as any}
          rotationSectionVh={500}
          modelScale={2.5}
        />

        {/* Guided rotation has its own internal scroll gate; no spacer/gate needed here */}

        {/* High-res image carousel with lightbox */}
        <div className="mt-10">
          <DishImageCarousel images={photoImages} />
        </div>

        {/* Bento cards with concise detail points */}
        <div className="mt-14">
          <DishBentoCards
            cards={[
              { id: 'c1', label: 'Essence', title: dish.culturalSignificance.split(' ')[0] ? 'Heritage Technique' : 'Heritage', body: dish.culturalSignificance },
              { id: 'c2', label: 'Difficulty', title: dish.recipe.difficulty.toUpperCase(), body: `Typical timing: ${dish.recipe.cookingTime}. Precision and pacing define success.` },
              { id: 'c3', label: 'Ingredients', title: 'Core Inputs', body: dish.recipe.ingredients.slice(0, 4).join(' · ') + (dish.recipe.ingredients.length > 4 ? ' · …' : '') },
              { id: 'c4', label: 'Chef Note', title: dish.chef?.name ?? 'Chef Insight', body: dish.chef?.note ?? 'Technique-driven flavor with restrained seasoning in the Jiangnan idiom.' },
            ]}
          />
        </div>

        {/* Interactive window title badge */}
        <div className="mt-16 mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 px-6 py-3 ring-1 ring-orange-500/30">
            <div className="h-2 w-2 rounded-full bg-orange-400" />
            <p className="text-sm font-semibold text-slate-200">3D Interactive Mode</p>
            <div className="h-px w-8 bg-gradient-to-r from-orange-400 to-transparent" />
            <p className="text-sm font-bold text-orange-400">{dish.nameZh} · {dish.name}</p>
          </div>
        </div>

        {/* Methodology note: dual 3D capture rationale */}
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/30">
                <svg className="h-3.5 w-3.5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-400/90">Methodological Note</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                We present <span className="font-semibold text-white">two 3D models</span>: an <span className="text-orange-300">AI-generated mesh</span> optimized for visual clarity and pedagogical annotation, and a <span className="text-orange-300">photogrammetry scan</span> preserving material authenticity—glossiness, micro-texture, and color fidelity. This dual approach balances <span className="italic">analytical legibility</span> with <span className="italic">documentary precision</span>, addressing the trade-offs inherent in digital food preservation.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive window */}
        <div className="mt-8">
          <DishInteractiveWindow
            aiModelUrl={aiModelUrl}
            scanModelUrl={scanModelUrl}
            hideVariantSwitch={dish.slug === 'hot-oil-eel'}
          />
          {dish.slug === 'hot-oil-eel' && (
            <p className="mt-2 text-center text-[11px] text-slate-400">
              No photogrammetry model: specular reflection prevented reliable scanning.
            </p>
          )}
        </div>

        {/* Recipe & Steps */}
        <section className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Ingredients</p>
            <h2 className="mt-2 text-2xl font-bold text-white">食材</h2>
            <ul className="mt-4 list-disc pl-5 text-sm text-slate-300 space-y-1">
              {dish.recipe.ingredients.map((it, i) => (<li key={i}>{it}</li>))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8 backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Method</p>
            <h2 className="mt-2 text-2xl font-bold text-white">步骤</h2>
            <ol className="mt-4 list-decimal pl-5 text-sm text-slate-300 space-y-1">
              {dish.recipe.steps.map((s, i) => (<li key={i}>{s}</li>))}
            </ol>
          </div>
        </section>

        {/* end */}
      </div>
    </main>
  )
}

// no client islands here
