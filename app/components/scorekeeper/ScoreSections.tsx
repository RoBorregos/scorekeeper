import { sectionOrder, type ScoreBreakdown } from "@/app/data/competitions";
import type { ChangeEvent } from "react";

type ScoreSectionsProps = {
  breakdown: ScoreBreakdown[];
  values: Record<string, string>;
  formatScore: Intl.NumberFormat;
  onFieldChange: (
    fieldId: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onStepFieldValue: (field: ScoreBreakdown, step: number) => void;
};

function ScoreFieldCard({
  field,
  values,
  formatScore,
  onFieldChange,
  onStepFieldValue,
}: {
  field: ScoreBreakdown;
  values: Record<string, string>;
  formatScore: Intl.NumberFormat;
  onFieldChange: (
    fieldId: string,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onStepFieldValue: (field: ScoreBreakdown, step: number) => void;
}) {
  return (
    <label className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/10 transition hover:border-cyan-300/20 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-white">{field.label}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            {field.description}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            field.score >= 0
              ? "bg-emerald-400/15 text-emerald-200"
              : "bg-rose-400/15 text-rose-200"
          }`}
        >
          {field.maxCount}x {field.score >= 0 ? "+" : ""}
          {field.score}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-2 shadow-inner shadow-slate-950/40">
          <button
            type="button"
            onClick={() => onStepFieldValue(field, -1)}
            disabled={field.value <= 0}
            aria-label={`Decrease ${field.label}`}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/70 text-2xl font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            -
          </button>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={String(field.maxCount).length}
            value={values[field.id] ?? ""}
            onChange={onFieldChange(field.id)}
            aria-label={field.label}
            className="score-input h-12 w-20 rounded-xl border border-white/10 bg-white/5 px-3 text-center text-xl font-semibold text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
          />

          <button
            type="button"
            onClick={() => onStepFieldValue(field, 1)}
            disabled={field.value >= field.maxCount}
            aria-label={`Increase ${field.label}`}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/70 text-2xl font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>

        <div className="text-sm text-slate-300">
          <p>
            Max count:{" "}
            <span className="font-semibold text-white">{field.maxCount}</span>
          </p>
          <p>
            Contribution:{" "}
            <span className="font-semibold text-cyan-200">
              {formatScore.format(field.contribution)}
            </span>
          </p>
        </div>
      </div>
    </label>
  );
}

export function ScoreSections({
  breakdown,
  values,
  formatScore,
  onFieldChange,
  onStepFieldValue,
}: ScoreSectionsProps) {
  return (
    <div className="space-y-6">
      {sectionOrder.map((sectionName) => (
        <section key={sectionName} className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-white">{sectionName}</h2>
          </div>

          <div className="grid gap-4">
            {breakdown
              .filter((field) => field.description === sectionName)
              .map((field) => (
                <ScoreFieldCard
                  key={field.id}
                  field={field}
                  values={values}
                  formatScore={formatScore}
                  onFieldChange={onFieldChange}
                  onStepFieldValue={onStepFieldValue}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
