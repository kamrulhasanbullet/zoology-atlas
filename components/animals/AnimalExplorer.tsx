"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { animals } from "@/data/animals";
import AnimalCard from "./AnimalCard";

export default function AnimalExplorer() {
  const [search, setSearch] = useState("");
  const [phylum, setPhylum] = useState("All");

  const phyla = [
    "All",
    ...Array.from(new Set(animals.map((animal) => animal.phylum))),
  ];

  const filteredAnimals = useMemo(() => {
    const query = search.toLowerCase().trim();

    return animals.filter((animal) => {
      const matchesSearch =
        !query ||
        animal.commonName.toLowerCase().includes(query) ||
        animal.scientificName.toLowerCase().includes(query) ||
        animal.phylum.toLowerCase().includes(query);

      const matchesPhylum = phylum === "All" || animal.phylum === phylum;

      return matchesSearch && matchesPhylum;
    });
  }, [search, phylum]);

  return (
    <div>
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search animal, scientific name or phylum..."
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-emerald-400/40"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <SlidersHorizontal size={18} className="shrink-0 text-zinc-500" />

          {phyla.map((item) => (
            <button
              key={item}
              onClick={() => setPhylum(item)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                phylum === item
                  ? "bg-emerald-400 text-black"
                  : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredAnimals.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <p className="text-sm text-zinc-500">No organisms found.</p>
        </div>
      )}
    </div>
  );
}
