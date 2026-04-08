import type { Competition } from "@/app/data/competitions";

type CompetitionOverviewProps = {
  competition: Competition;
  specialAdjustments: number;
  finalTotal: number;
  formatScore: Intl.NumberFormat;
};

export function CompetitionOverview({
  competition,
  specialAdjustments,
  finalTotal,
  formatScore,
}: CompetitionOverviewProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/10 backdrop-blur">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
        {competition.name}
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
        {competition.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Reference total: {formatScore.format(competition.referenceTotal)}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Special adjustments: {formatScore.format(specialAdjustments)}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
          Combined total: {formatScore.format(finalTotal)}
        </span>
      </div>
    </article>
  );
}
