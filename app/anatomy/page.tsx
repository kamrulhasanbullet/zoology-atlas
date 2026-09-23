"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { animals } from "@/data/animals";
import AnatomyViewer from "@/components/anatomy/AnatomyViewer";

export default function AnatomyPage() {
  const searchParams = useSearchParams();

  const animalSlug = searchParams.get("animal");

  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "available"),
    [],
  );

  const initialAnimal =
    availableAnimals.find((animal) => animal.slug === animalSlug) ??
    availableAnimals[0];

  const [selectedAnimal, setSelectedAnimal] = useState(initialAnimal);

  useEffect(() => {
    const animal = availableAnimals.find((item) => item.slug === animalSlug);

    if (animal) {
      setSelectedAnimal(animal);
    }
  }, [animalSlug, availableAnimals]);

  if (!selectedAnimal) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#03070b] text-white">
        <p className="text-zinc-500">No animal available.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#03070b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/animals"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Animals
          </Link>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            {/* TITLE */}
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Zoology Atlas
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Interactive Anatomy
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Explore anatomical systems through an interactive learning
                environment built for Zoology students.
              </p>
            </div>

            {/* ANIMAL SELECTOR */}
            <div>
              <label
                htmlFor="animal"
                className="mb-2 block text-xs uppercase tracking-wider text-zinc-600"
              >
                Select organism
              </label>

              <select
                id="animal"
                value={selectedAnimal.slug}
                onChange={(event) => {
                  const animal = availableAnimals.find(
                    (item) => item.slug === event.target.value,
                  );

                  if (animal) {
                    setSelectedAnimal(animal);

                    window.history.replaceState(
                      null,
                      "",
                      `/anatomy?animal=${animal.slug}`,
                    );
                  }
                }}
                className="min-w-[220px] rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
              >
                {availableAnimals.map((animal) => (
                  <option
                    key={animal.id}
                    value={animal.slug}
                    className="bg-[#071018]"
                  >
                    {animal.commonName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CURRENT ANIMAL */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
            {selectedAnimal.phylum}
          </span>

          <span className="text-sm text-zinc-500">
            {selectedAnimal.commonName}
          </span>

          <span className="text-sm italic text-zinc-600">
            {selectedAnimal.scientificName}
          </span>
        </div>

        {/* ANATOMY VIEWER */}
        <AnatomyViewer animalName={selectedAnimal.commonName} />
      </div>
    </main>
  );
}
