"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { CompetitionOverview } from "@/app/components/scorekeeper/CompetitionOverview";
import { ScoreHeader } from "@/app/components/scorekeeper/ScoreHeader";
import { ScoreSections } from "@/app/components/scorekeeper/ScoreSections";
import { TotalsSidebar } from "@/app/components/scorekeeper/TotalsSidebar";
import {
  competitions,
  type Competition,
  type ScoreBreakdown,
} from "@/app/data/competitions";

function buildInitialValues(competition: Competition) {
  return Object.fromEntries(
    competition.fields.map((field) => [field.id, ""]),
  ) as Record<string, string>;
}

export default function Home() {
  const [competitionId, setCompetitionId] = useState(competitions[0].id);
  const [values, setValues] = useState<Record<string, string>>(() =>
    buildInitialValues(competitions[0]),
  );

  const selectedCompetition = useMemo(
    () =>
      competitions.find((competition) => competition.id === competitionId) ??
      competitions[0],
    [competitionId],
  );

  useEffect(() => {
    setValues(buildInitialValues(selectedCompetition));
  }, [selectedCompetition]);

  const breakdown: ScoreBreakdown[] = useMemo(() => {
    return selectedCompetition.fields.map((field) => {
      const rawValue = Number.parseFloat(values[field.id] ?? "");
      const safeValue = Number.isFinite(rawValue) ? rawValue : 0;
      const clampedValue = Math.max(0, Math.min(safeValue, field.maxCount));
      const contribution = clampedValue * field.score;

      return {
        ...field,
        value: clampedValue,
        contribution,
      };
    });
  }, [selectedCompetition, values]);

  const coreTotal = useMemo(
    () =>
      breakdown.reduce(
        (sum, field) =>
          sum + (field.includeInCoreTotal === false ? 0 : field.contribution),
        0,
      ),
    [breakdown],
  );

  const specialAdjustments = useMemo(
    () =>
      breakdown.reduce(
        (sum, field) =>
          sum + (field.includeInCoreTotal === false ? field.contribution : 0),
        0,
      ),
    [breakdown],
  );

  const finalTotal = coreTotal + specialAdjustments;

  const formatScore = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
    [],
  );

  const handleFieldChange =
    (fieldId: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const digitsOnly = event.target.value.replace(/[^0-9]/g, "");
      setValues((current) => ({
        ...current,
        [fieldId]: digitsOnly,
      }));
    };

  const stepFieldValue = (field: ScoreBreakdown, step: number) => {
    setValues((current) => {
      const rawCurrent = Number.parseFloat(current[field.id] ?? "0");
      const safeCurrent = Number.isFinite(rawCurrent) ? rawCurrent : 0;
      const nextValue = Math.max(
        0,
        Math.min(safeCurrent + step, field.maxCount),
      );

      return {
        ...current,
        [field.id]: String(nextValue),
      };
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_42%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] text-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <ScoreHeader
          competitions={competitions}
          competitionId={competitionId}
          coreTotal={coreTotal}
          formatScore={formatScore}
          onCompetitionChange={setCompetitionId}
        />

        <div className="mt-6 grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <section className="space-y-6">
            <CompetitionOverview
              competition={selectedCompetition}
              specialAdjustments={specialAdjustments}
              finalTotal={finalTotal}
              formatScore={formatScore}
            />

            <ScoreSections
              breakdown={breakdown}
              values={values}
              formatScore={formatScore}
              onFieldChange={handleFieldChange}
              onStepFieldValue={stepFieldValue}
            />
          </section>

          <TotalsSidebar
            coreTotal={coreTotal}
            specialAdjustments={specialAdjustments}
            finalTotal={finalTotal}
            formatScore={formatScore}
          />
        </div>
      </div>
    </main>
  );
}
