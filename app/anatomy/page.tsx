"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { animals } from "@/data/animals";
import AnatomyViewer from "@/components/anatomy/AnatomyViewer";

export default function AnatomyPage() {
  const availableAnimals = animals.filter(
    (animal) => animal.status === "available",
  );

  const [selectedAnimal, setSelectedAnimal] = useState(availableAnimals[0]);

  return (
    <main className="min-h-screen bg-[#03070b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Atlas
          </Link>

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
                Zoology Atlas
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Interactive Anatomy
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Explore anatomical systems through an interactive learning
                environment built for Zoology students.
              </p>
            </div>

            {/* ANIMAL SELECTOR */}
            <div>
              <label
                htmlFor="animal"
                className="mb-2 block text-xs uppercase tracking-wider text-slate-500"
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
                  }
                }}
                className="min-w-[220px] rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
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

        {/* VIEWER */}
        <AnatomyViewer animalName={selectedAnimal.commonName} />
      </div>
    </main>
  );
}
