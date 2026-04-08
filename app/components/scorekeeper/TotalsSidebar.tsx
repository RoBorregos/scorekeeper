type TotalsSidebarProps = {
  coreTotal: number;
  specialAdjustments: number;
  finalTotal: number;
  formatScore: Intl.NumberFormat;
};

export function TotalsSidebar({
  coreTotal,
  specialAdjustments,
  finalTotal,
  formatScore,
}: TotalsSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
      <article className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
          Total summary
        </p>
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Official total
            </p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white">
              {formatScore.format(coreTotal)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Special adjustments
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-cyan-200">
              {formatScore.format(specialAdjustments)}
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">
              Combined total
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {formatScore.format(finalTotal)}
            </p>
          </div>
        </div>
      </article>
    </aside>
  );
}
