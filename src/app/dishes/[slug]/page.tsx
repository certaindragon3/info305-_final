import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import path from 'path'
import fs from 'fs'
import { dishes, getDishBySlug } from '@/lib/data'
import { DishPhotoGallery } from '@/components/dish/DishPhotoGallery'
import type { PerspectiveCardItem } from '@/components/dish/DishPerspectiveCards'
import { DishSubpageExperience } from '@/components/dish/DishSubpageExperience'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const dish = getDishBySlug(params.slug)
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

export default function DishPage({ params }: Params) {
  const dish = getDishBySlug(params.slug)
  if (!dish) return notFound()

  // Derive model variants
  const aiModelUrl = dish.media.model3D
  const file = path.basename(aiModelUrl)
  const nameNoExt = file.replace(/\.glb$/i, '')
  const scanFile = `${nameNoExt}_scan.usdz`
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
        .sort()
        .map((f) => `/images/${folderName}/${encodeURIComponent(f).replace(/%2F/g, '/')}`)
    }
  } catch {}

  // Perspective cards content per dish
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

        {/* Rotation-driven stage leading to interactive stage */}
        <DishSubpageExperience
          aiModelUrl={aiModelUrl}
          scanModelUrl={scanModelUrl}
          dishName={dish.name}
          dishNameZh={dish.nameZh}
          annotations={[
            { id: cards[0].id, title: cards[0].title, subtitle: cards[0].subtitle, body: cards[0].description },
            { id: cards[1].id, title: cards[1].title, subtitle: cards[1].subtitle, body: cards[1].description },
            { id: cards[2].id, title: cards[2].title, subtitle: cards[2].subtitle, body: cards[2].description },
            { id: cards[3].id, title: cards[3].title, subtitle: cards[3].subtitle, body: cards[3].description },
          ]}
          rotationSectionVh={300}
        />

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

        {/* Field photos */}
        <div className="mt-14">
          <DishPhotoGallery images={photoImages} title="Field Photography" />
        </div>
      </div>
    </main>
  )
}

// no client islands here
