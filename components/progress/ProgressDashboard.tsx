"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Brain, CheckCircle2, Trophy } from "lucide-react";

import { animals } from "@/data/animals";

import { getProgressRecords, getQuizAttempts } from "@/lib/storage/progress";

import type { ProgressRecord, QuizAttempt } from "@/types/zoology";

export default function ProgressDashboard() {
  const [progress, setProgress] = useState<ProgressRecord[]>([]);

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  useEffect(() => {
    setProgress(getProgressRecords());
    setAttempts(getQuizAttempts());
  }, []);

  const studiedCount = progress.filter((item) => item.studied).length;

  const anatomyCount = progress.filter((item) => item.anatomyExplored).length;

  const studyCompletedCount = progress.filter(
    (item) => item.studyCompleted,
  ).length;

  const bestScore = useMemo(() => {
    if (!attempts.length) return 0;

    return Math.max(...attempts.map((attempt) => attempt.percentage));
  }, [attempts]);

  const overallProgress =
    animals.length > 0 ? Math.round((studiedCount / animals.length) * 100) : 0;

  const recentAttempts = [...attempts]
    .sort(
      (a, b) =>
        new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Animals Studied"
          value={studiedCount}
          description={`of ${animals.length} animals`}
        />

        <StatCard
          icon={CheckCircle2}
          label="Study Completed"
          value={studyCompletedCount}
          description="completed topics"
        />

        <StatCard
          icon={Brain}
          label="Quiz Attempts"
          value={attempts.length}
          description="total attempts"
        />

        <StatCard
          icon={Trophy}
          label="Best Score"
          value={`${bestScore}%`}
          description="highest quiz score"
        />
      </div>

      {/* Overall Progress */}

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Overall Learning Progress</h2>

            <p className="mt-1 text-sm text-white/45">
              Based on animals you have studied.
            </p>
          </div>

          <span className="text-2xl font-bold text-cyan-400">
            {overallProgress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all"
            style={{
              width: `${overallProgress}%`,
            }}
          />
        </div>
      </section>

      {/* Animal Progress */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Animal Progress</h2>

          <p className="mt-1 text-sm text-white/45">
            Track your learning activity by organism.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {animals.map((animal) => {
            const record = progress.find(
              (item) => item.animalSlug === animal.slug,
            );

            return (
              <div
                key={animal.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{animal.commonName}</h3>

                    <p className="mt-1 text-sm italic text-white/40">
                      {animal.scientificName}
                    </p>
                  </div>

                  {record?.studied && (
                    <CheckCircle2 size={20} className="text-cyan-400" />
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  <ProgressRow label="Studied" active={!!record?.studied} />

                  <ProgressRow
                    label="Anatomy explored"
                    active={!!record?.anatomyExplored}
                  />

                  <ProgressRow
                    label="Study completed"
                    active={!!record?.studyCompleted}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Quiz Attempts */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">Recent Quiz Attempts</h2>
        </div>

        {!recentAttempts.length ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/45">
            No quiz attempts yet.
          </div>
        ) : (
          <div className="space-y-3">
            {recentAttempts.map((attempt) => {
              const animal = animals.find(
                (item) => item.slug === attempt.animalSlug,
              );

              return (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div>
                    <p className="font-medium">
                      {animal?.commonName ?? attempt.animalSlug}
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      {new Date(attempt.attemptedAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-cyan-400">
                      {attempt.percentage}%
                    </p>

                    <p className="text-xs text-white/40">
                      {attempt.score}/{attempt.totalQuestions}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
        <Icon size={20} />
      </div>

      <p className="text-sm text-white/45">{label}</p>

      <p className="mt-1 text-3xl font-bold">{value}</p>

      <p className="mt-1 text-xs text-white/35">{description}</p>
    </div>
  );
}

function ProgressRow({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/55">{label}</span>

      <span className={active ? "text-cyan-400" : "text-white/25"}>
        {active ? "Completed" : "Pending"}
      </span>
    </div>
  );
}
