"use client";

interface BentoCard {
  id: string;
  label: string;
  title: string;
  body: string;
}

export function DishBentoCards({ cards }: { cards: BentoCard[] }) {
  if (!cards?.length) return null;
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-orange-500/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.12),_transparent_60%)]" />
      <div className="relative z-[1] mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-400">Curated Notes</p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Dish Insight Cards</h2>
      </div>
      <div className="relative z-[1] grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.id} className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-slate-900/70 to-slate-900/70 p-5 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-400">{c.label}</p>
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400" />
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">{c.title}</h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

