"use client";

import { useEffect, useMemo, useState } from "react";

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Target,
  Trophy,
} from "lucide-react";

import { animals } from "@/data/animals";

import {
  clearProgress,
  getProgressRecords,
  getQuizAttempts,
  getQuizStats,
} from "@/lib/storage/progress";

import type { ProgressRecord, QuizAttempt } from "@/types/zoology";

interface ProgressDashboardProps {
  onReset?: () => void;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getAnimalName(slug: string) {
  const animal = animals.find((item) => item.slug === slug);

  return animal?.commonName ?? slug;
}

export default function ProgressDashboard({ onReset }: ProgressDashboardProps) {
  const [progress, setProgress] = useState<ProgressRecord[]>([]);

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);

  const [stats, setStats] = useState({
    attempts: 0,
    bestScore: 0,
    averageScore: 0,
  });

  const [loaded, setLoaded] = useState(false);

  const loadProgress = () => {
    setProgress(getProgressRecords());

    setAttempts(getQuizAttempts());

    setStats(getQuizStats());

    setLoaded(true);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "available"),
    [],
  );

  const studiedCount = progress.filter((item) => item.studied).length;

  const completedCount = progress.filter((item) => item.studyCompleted).length;

  const studyPercentage =
    availableAnimals.length > 0
      ? Math.round((studiedCount / availableAnimals.length) * 100)
      : 0;

  const completedPercentage =
    availableAnimals.length > 0
      ? Math.round((completedCount / availableAnimals.length) * 100)
      : 0;

  const handleReset = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all learning progress?",
    );

    if (!confirmed) return;

    clearProgress();

    loadProgress();

    onReset?.();
  };

  if (!loaded) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <p className="text-sm text-zinc-500">Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Animals Studied"
          value={studiedCount}
          description={`${studyPercentage}% of available animals`}
        />

        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Study Completed"
          value={completedCount}
          description={`${completedPercentage}% completed`}
        />

        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Quiz Attempts"
          value={stats.attempts}
          description={
            stats.attempts > 0
              ? `Average ${Math.round(stats.averageScore)}%`
              : "No attempts yet"
          }
        />

        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Best Quiz Score"
          value={`${Math.round(stats.bestScore)}%`}
          description={
            stats.bestScore > 0 ? "Your highest score" : "No score yet"
          }
        />
      </section>

      {/* Study Progress */}
      <section className="rounded-3xl border border-white/10 bg-[#071014] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Learning Progress
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Track the organisms you have started and completed.
            </p>
          </div>

          <div className="text-sm font-semibold text-emerald-400">
            {studyPercentage}%
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{
              width: `${studyPercentage}%`,
            }}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {availableAnimals.map((animal) => {
            const record = progress.find(
              (item) => item.animalSlug === animal.slug,
            );

            return (
              <AnimalProgressCard
                key={animal.slug}
                name={animal.commonName}
                scientificName={animal.scientificName}
                studied={record?.studied ?? false}
                completed={record?.studyCompleted ?? false}
                lastStudiedAt={record?.lastStudiedAt}
              />
            );
          })}
        </div>
      </section>

      {/* Quiz Attempts */}
      <section className="rounded-3xl border border-white/10 bg-[#071014] p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Quiz Attempts
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Your latest quiz activity.
          </p>
        </div>

        {attempts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-8 text-center">
            <Target className="mx-auto h-8 w-8 text-zinc-700" />

            <p className="mt-3 text-sm text-zinc-500">No quiz attempts yet.</p>

            <p className="mt-1 text-xs text-zinc-700">
              Complete a quiz to see your results here.
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <div className="divide-y divide-white/10">
              {attempts.slice(0, 10).map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {getAnimalName(attempt.animalSlug)}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {attempt.score} / {attempt.totalQuestions} correct
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <div>
                      <p
                        className={`text-sm font-bold ${
                          attempt.percentage >= 80
                            ? "text-emerald-400"
                            : attempt.percentage >= 50
                              ? "text-amber-400"
                              : "text-red-400"
                        }`}
                      >
                        {Math.round(attempt.percentage)}%
                      </p>

                      <p className="mt-1 text-[10px] text-zinc-600">Score</p>
                    </div>

                    <div className="hidden items-center gap-1 text-xs text-zinc-600 sm:flex">
                      <Clock3 className="h-3.5 w-3.5" />
                      {formatDate(attempt.attemptedAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Reset */}
      <section className="flex justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2.5 text-xs font-medium text-red-300 transition hover:bg-red-400/10"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Progress
        </button>
      </section>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
}

function StatCard({ icon, label, value, description }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071014] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs text-zinc-500">{label}</p>

      <p className="mt-1 text-2xl font-bold text-white">{value}</p>

      <p className="mt-1 text-[11px] text-zinc-600">{description}</p>
    </div>
  );
}

interface AnimalProgressCardProps {
  name: string;
  scientificName: string;
  studied: boolean;
  completed: boolean;
  lastStudiedAt?: string;
}

function AnimalProgressCard({
  name,
  scientificName,
  studied,
  completed,
  lastStudiedAt,
}: AnimalProgressCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{name}</h3>

          <p className="mt-1 text-xs italic text-zinc-600">{scientificName}</p>
        </div>

        {completed ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
        ) : studied ? (
          <BookOpen className="h-5 w-5 shrink-0 text-cyan-400" />
        ) : (
          <div className="h-5 w-5 rounded-full border border-white/10" />
        )}
      </div>

      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full transition-all ${
              completed
                ? "w-full bg-emerald-400"
                : studied
                  ? "w-1/2 bg-cyan-400"
                  : "w-0"
            }`}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-zinc-600">
          {completed ? "Completed" : studied ? "In Progress" : "Not Started"}
        </span>

        {lastStudiedAt && (
          <span className="text-[10px] text-zinc-700">
            {formatDate(lastStudiedAt)}
          </span>
        )}
      </div>
    </div>
  );
}
