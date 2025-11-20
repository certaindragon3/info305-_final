import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, BookOpen, Quote } from 'lucide-react';
import { getPhilosophyBySlug, philosophies } from '@/lib/philosophies';
import PhilosophyConceptMap from '@/components/philosophy/PhilosophyConceptMap';

export async function generateStaticParams() {
  return philosophies.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const philosophy = getPhilosophyBySlug(slug);

  if (!philosophy) {
    return {
      title: 'Philosophy Not Found',
    };
  }

  return {
    title: `${philosophy.titleZh} (${philosophy.titleEn}) | Acheng Restaurant`,
    description: philosophy.subtitle,
  };
}

export default async function PhilosophyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const philosophy = getPhilosophyBySlug(slug);

  if (!philosophy) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Breadcrumb Navigation */}
      <nav className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-orange-400"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/philosophy"
              className="transition-colors duration-300 hover:text-orange-400"
            >
              Philosophy
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">{philosophy.titleZh}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pb-8 pt-8">
        <div className="relative z-[1] mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {philosophy.titleZh}
            </h1>
            <h2 className="mt-3 text-xl font-semibold text-orange-400">
              {philosophy.titleEn}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              {philosophy.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Concept Map Section */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Interactive Framework
            </p>
            <h3 className="mt-2 text-2xl font-bold text-white">
              Concept Relationship Map
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Explore how core values enable practices, which produce outcomes while
              navigating constraints. Click and drag to interact.
            </p>
          </header>

          <PhilosophyConceptMap philosophy={philosophy} />
        </div>
      </section>

      {/* Ethnographic Evidence Section */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Fieldwork Documentation
            </p>
            <h3 className="mt-2 text-3xl font-bold text-white">
              Ethnographic Evidence
            </h3>
            <p className="mt-3 text-base text-slate-300">
              Primary data collected during participant observation (September 21, 2025, 11:00–15:00)
            </p>
          </header>

          {/* Interview Quotes */}
          <div>
            <h4 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
              <Quote className="h-5 w-5 text-orange-400" />
              Interview Excerpts
            </h4>
            <div className="grid gap-6 md:grid-cols-2">
              {philosophy.fieldworkEvidence.interviewQuotes.map((quote, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30">
                      {quote.speaker}
                    </span>
                    {quote.timestamp && (
                      <span className="text-xs text-slate-500">
                        @ {quote.timestamp}
                      </span>
                    )}
                  </div>
                  <blockquote className="mb-4 border-l-2 border-orange-500/30 pl-4 text-base italic leading-relaxed text-slate-200">
                    &quot;{quote.content}&quot;
                  </blockquote>
                  <p className="text-xs text-slate-400">
                    <strong>Context:</strong> {quote.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Context Section */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <header className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">
              Research Framework
            </p>
            <h3 className="mt-2 text-3xl font-bold text-white">
              Academic Context
            </h3>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Research Question */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
              <div className="mb-4 inline-flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-400" />
                <h4 className="text-lg font-bold text-white">Research Question</h4>
              </div>
              <p className="text-base leading-relaxed text-slate-300">
                {philosophy.academicContext.researchQuestion}
              </p>
            </div>

            {/* Theoretical Lens */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
              <h4 className="mb-4 text-lg font-bold text-white">
                Theoretical Lens
              </h4>
              <div className="flex flex-wrap gap-2">
                {philosophy.academicContext.theoreticalLens.map((lens, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-orange-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-orange-400 ring-1 ring-orange-500/30"
                  >
                    {lens}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key References */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl">
            <h4 className="mb-6 text-lg font-bold text-white">Key References</h4>
            <div className="space-y-4">
              {philosophy.academicContext.keyReferences.map((ref, index) => (
                <div key={index} className="border-l-2 border-orange-500/30 pl-4">
                  <p className="mb-2 text-sm text-slate-300">{ref.citation}</p>
                  <p className="text-xs text-slate-500">
                    <strong>Relevance:</strong> {ref.relevance}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
