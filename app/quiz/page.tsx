"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Search } from "lucide-react";

import { animals } from "@/data/animals";
import QuizEngine from "@/components/quiz/QuizEngine";
import VivaMode from "@/components/viva/VivaMode";

export default function QuizPage() {
  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "available"),
    [],
  );

  const [selectedSlug, setSelectedSlug] = useState(
    availableAnimals[0]?.slug ?? "",
  );

  const selectedAnimal = availableAnimals.find(
    (animal) => animal.slug === selectedSlug,
  );

  return (
    <main className="min-h-screen bg-[#05080a] text-white">
      {/* Header */}
      <section className="border-b border-white/10 bg-gradient-to-b from-cyan-400/[0.05] to-transparent">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            href="/animals"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Animals
          </Link>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <Brain className="h-5 w-5 text-cyan-400" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Exam Mode
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Zoology Quiz
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              Test your understanding with structured zoology questions and
              instant feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Animal Selector */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <label
            htmlFor="quiz-animal"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
          >
            Select Animal
          </label>

          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

            <select
              id="quiz-animal"
              value={selectedSlug}
              onChange={(event) => setSelectedSlug(event.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
            >
              {availableAnimals.map((animal) => (
                <option
                  key={animal.slug}
                  value={animal.slug}
                  className="bg-[#071014]"
                >
                  {animal.commonName} — {animal.scientificName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="mx-auto max-w-4xl px-6 pb-16 lg:px-8">
        {selectedAnimal ? (
          <QuizEngine animal={selectedAnimal} />
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <p className="text-sm text-zinc-500">
              Select an animal to start the quiz.
            </p>
          </div>
        )}
      </section>

      {selectedAnimal && (
        <section className="mx-auto mt-8 max-w-4xl px-6 pb-16 lg:px-8">
          <VivaMode animal={selectedAnimal} />
        </section>
      )}
    </main>
  );
}
