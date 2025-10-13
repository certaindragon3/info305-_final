import Link from 'next/link';
import { philosophies } from '@/lib/philosophies';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Culinary Philosophies | Acheng Restaurant Virtual Museum',
  description:
    'Explore the three core philosophies that define Subang cuisine craft at Acheng Restaurant: Seasonal Sourcing, Sincerity & Craft, and Grounded Approach.',
};

export default function PhilosophyOverviewPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.15),_transparent_60%)]" />

        <div className="relative z-[1] mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Research Framework
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Culinary Philosophies
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Three foundational principles that organize craft practice, spatial routines, and 
              community relationships at Acheng Restaurant. Documented through ethnographic fieldwork 
              and semi-structured interviews (September 2025).
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Cards Grid */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {philosophies.map((philosophy, index) => (
              <Link
                key={philosophy.id}
                href={`/philosophy/${philosophy.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/5 via-slate-900/80 to-slate-900/80 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                {/* Glow effect on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-orange-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Index badge */}
                <div className="mb-4 inline-flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400 ring-1 ring-orange-500/30">
                    {index + 1}
                  </span>
                  <div className="h-px w-8 bg-gradient-to-r from-orange-400 to-transparent" />
                </div>

                {/* Title */}
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {philosophy.titleZh}
                </h2>
                <h3 className="mb-4 text-sm font-semibold text-orange-400">
                  {philosophy.titleEn}
                </h3>

                {/* Subtitle */}
                <p className="mb-6 text-sm leading-relaxed text-slate-400">
                  {philosophy.subtitle}
                </p>

                {/* Key concepts preview */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {philosophy.conceptMap.nodes
                    .filter((n) => n.category === 'core-value')
                    .slice(0, 2)
                    .map((node) => (
                      <span
                        key={node.id}
                        className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400 ring-1 ring-orange-500/30"
                      >
                        {node.label.split('\n')[0]}
                      </span>
                    ))}
                </div>

                {/* View details button */}
                <div className="flex items-center gap-2 text-sm font-semibold text-orange-400 transition-all duration-300 group-hover:gap-4">
                  <span>Explore Framework</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* Methodology Note */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/30">
                  <span className="text-lg">📋</span>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-white">Methodology Note</h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  These philosophies emerged from <strong>participant observation</strong> (4 hours, September 21, 2025) 
                  and a <strong>semi-structured interview</strong> with Mr. Shen Jiecheng, owner-chef. 
                  Each framework integrates: (1) verbatim interview quotes with timestamps, (2) observational 
                  field notes, (3) interactive concept maps showing practice relationships, and (4) academic 
                  contextualization drawing on embodied knowledge theory and intangible heritage studies.
                </p>
                <Link
                  href="/methodology"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition-colors duration-300 hover:text-orange-500"
                >
                  View Full Research Protocol
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors duration-300 hover:text-orange-400"
          >
            ← Return to Museum Home
          </Link>
        </div>
      </section>
    </main>
  );
}
