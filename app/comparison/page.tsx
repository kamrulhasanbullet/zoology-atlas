"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, Search } from "lucide-react";

import { animals } from "@/data/animals";
import ComparisonTable from "@/data/comparison/ComparisonTable";

export default function ComparisonPage() {
  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "available"),
    [],
  );

  const firstDefault = availableAnimals[0];

  const secondDefault = availableAnimals[1] ?? availableAnimals[0];

  const [firstSlug, setFirstSlug] = useState(firstDefault?.slug ?? "");

  const [secondSlug, setSecondSlug] = useState(secondDefault?.slug ?? "");

  const firstAnimal = availableAnimals.find(
    (animal) => animal.slug === firstSlug,
  );

  const secondAnimal = availableAnimals.find(
    (animal) => animal.slug === secondSlug,
  );

  const handleSwap = () => {
    setFirstSlug(secondSlug);
    setSecondSlug(firstSlug);
  };

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
                <ArrowRightLeft className="h-5 w-5 text-cyan-400" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Comparative Anatomy
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Compare Organisms
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              Compare anatomical and biological features between two organisms
              in a structured learning environment.
            </p>
          </div>
        </div>
      </section>

      {/* Selectors */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
            {/* First */}
            <div>
              <label
                htmlFor="first-animal"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
              >
                First Organism
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <select
                  id="first-animal"
                  value={firstSlug}
                  onChange={(event) => setFirstSlug(event.target.value)}
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

            {/* Swap */}
            <button
              type="button"
              onClick={handleSwap}
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300"
              aria-label="Swap organisms"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>

            {/* Second */}
            <div>
              <label
                htmlFor="second-animal"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500"
              >
                Second Organism
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <select
                  id="second-animal"
                  value={secondSlug}
                  onChange={(event) => setSecondSlug(event.target.value)}
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
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        {firstAnimal && secondAnimal ? (
          <ComparisonTable
            firstAnimal={firstAnimal}
            secondAnimal={secondAnimal}
          />
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <p className="text-sm text-zinc-500">
              Select two organisms to begin comparison.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
