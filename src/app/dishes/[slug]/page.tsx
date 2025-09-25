import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { dishes, getDishBySlug } from '@/lib/data'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const dish = getDishBySlug(params.slug)
  if (!dish) return {}
  const title = `${dish.nameZh} | ${dish.name} — Acheng Museum`
  const description = dish.description
  return { title, description }
}

export default function DishPage({ params }: Params) {
  const dish = getDishBySlug(params.slug)
  if (!dish) return notFound()

  return (
    <main className="min-h-screen py-10 px-6 md:px-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-primary hover:underline">← 返回博物馆 Back to Museum</Link>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {dish.nameZh} <span className="text-muted-foreground text-xl">{dish.name}</span>
        </h1>
        {dish.isSignature ? (
          <p className="mt-2 inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs">Signature</p>
        ) : null}
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border p-4 bg-card">
          <div className="aspect-[4/3] w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            3D Model Placeholder: {dish.media.model3D}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-base leading-relaxed">{dish.description}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{dish.story}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border p-3">
              <div className="text-muted-foreground">Cooking Time</div>
              <div className="font-medium">{dish.recipe.cookingTime}</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-muted-foreground">Difficulty</div>
              <div className="font-medium capitalize">{dish.recipe.difficulty}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border p-5">
          <h2 className="text-lg font-semibold mb-3">食材 Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {dish.recipe.ingredients.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-5">
          <h2 className="text-lg font-semibold mb-3">步骤 Steps</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            {dish.recipe.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}

