"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Dna, Search } from "lucide-react";

import { animals } from "@/data/animals";
import AnatomyViewer from "@/components/anatomy/AnatomyViewer";

export default function AnatomyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const animalFromUrl = searchParams.get("animal");

  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "available"),
    [],
  );

  const initialAnimal =
    availableAnimals.find((animal) => animal.slug === animalFromUrl) ??
    availableAnimals[0];

  const [selectedAnimal, setSelectedAnimal] = useState(initialAnimal);

  useEffect(() => {
    const animal = availableAnimals.find((item) => item.slug === animalFromUrl);

    if (animal) {
      setSelectedAnimal(animal);
    }
  }, [animalFromUrl, availableAnimals]);

  const handleAnimalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = event.target.value;

    const animal = availableAnimals.find((item) => item.slug === slug);

    if (!animal) return;

    setSelectedAnimal(animal);

    router.replace(`/anatomy?animal=${animal.slug}`, { scroll: false });
  };

  if (!selectedAnimal) {
    return (
      <main className="min-h-screen bg-[#05080a] px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-2xl font-bold">No anatomy-ready animals found</h1>
        </div>
      </main>
    );
  }

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

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <Dna className="h-5 w-5 text-cyan-400" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  Anatomy Atlas
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Interactive Anatomy
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                Explore verified anatomy structures and biological systems
                through an interactive learning workspace.
              </p>
            </div>

            {/* Animal selector */}
            <div className="w-full lg:w-80">
              <label
                htmlFor="animal"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500"
              >
                Select Animal
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                <select
                  id="animal"
                  value={selectedAnimal.slug}
                  onChange={handleAnimalChange}
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

      {/* Viewer */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <AnatomyViewer key={selectedAnimal.slug} animal={selectedAnimal} />
      </section>

      {/* Footer information */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-600">
              Animal
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {selectedAnimal.commonName}
            </h3>

            <p className="mt-1 text-sm italic text-zinc-500">
              {selectedAnimal.scientificName}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-600">
              Phylum
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {selectedAnimal.phylum}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {selectedAnimal.className}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs uppercase tracking-wider text-zinc-600">
              Scientific Asset Policy
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Anatomy visualizations will only be added after scientific
              verification.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
