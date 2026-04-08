import type { Competition } from "@/app/data/competitions";

type ScoreHeaderProps = {
  competitions: Competition[];
  competitionId: string;
  coreTotal: number;
  formatScore: Intl.NumberFormat;
  onCompetitionChange: (competitionId: string) => void;
};

export function ScoreHeader({
  competitions,
  competitionId,
  coreTotal,
  formatScore,
  onCompetitionChange,
}: ScoreHeaderProps) {
  return (
    <header className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
            Scorekeeper
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Live competition scoring
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Choose a competition, fill in the scoring fields, and keep the total
            visible while you work.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-md">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Competition
            </span>
            <select
              value={competitionId}
              onChange={(event) => onCompetitionChange(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
            >
              {competitions.map((competition) => (
                <option key={competition.id} value={competition.id}>
                  {competition.name}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Official total
            </p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-white">
                {formatScore.format(coreTotal)}
              </span>
              <span className="pb-1 text-sm text-cyan-100/80">points</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-cyan-50/80">
              Excluding special penalties and standard bonuses.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
