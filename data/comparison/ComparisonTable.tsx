"use client";

import { ArrowRightLeft } from "lucide-react";

import type { Animal, ComparisonCategory } from "@/types/zoology";

import { getComparisonData } from "@/data/comparison";

interface ComparisonTableProps {
  firstAnimal: Animal;
  secondAnimal: Animal;
}

const categories: {
  key: ComparisonCategory;
  label: string;
}[] = [
  {
    key: "classification",
    label: "Classification",
  },
  {
    key: "habitat",
    label: "Habitat",
  },
  {
    key: "bodyCovering",
    label: "Body Covering",
  },
  {
    key: "skeleton",
    label: "Skeleton",
  },
  {
    key: "heart",
    label: "Heart",
  },
  {
    key: "circulation",
    label: "Circulation",
  },
  {
    key: "respiration",
    label: "Respiration",
  },
  {
    key: "digestion",
    label: "Digestion",
  },
  {
    key: "excretion",
    label: "Excretion",
  },
  {
    key: "reproduction",
    label: "Reproduction",
  },
  {
    key: "fertilization",
    label: "Fertilization",
  },
  {
    key: "development",
    label: "Development",
  },
];

export default function ComparisonTable({
  firstAnimal,
  secondAnimal,
}: ComparisonTableProps) {
  const firstData = getComparisonData(firstAnimal.slug);

  const secondData = getComparisonData(secondAnimal.slug);

  if (!firstData || !secondData) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <ArrowRightLeft className="mx-auto h-8 w-8 text-zinc-600" />

        <h2 className="mt-4 text-lg font-semibold text-white">
          Comparison data unavailable
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Verified comparison data for one or both organisms has not been
          configured yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071014]">
      {/* Header */}
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* First Animal */}
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-600">
              Organism A
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              {firstAnimal.commonName}
            </h2>

            <p className="mt-1 text-sm italic text-zinc-500">
              {firstAnimal.scientificName}
            </p>
          </div>

          {/* VS */}
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
            <ArrowRightLeft className="h-4 w-4 text-cyan-400" />
          </div>

          {/* Second Animal */}
          <div className="md:text-right">
            <p className="text-xs uppercase tracking-wider text-zinc-600">
              Organism B
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              {secondAnimal.commonName}
            </h2>

            <p className="mt-1 text-sm italic text-zinc-500">
              {secondAnimal.scientificName}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.025]">
              <th className="w-48 px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Feature
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {firstAnimal.commonName}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {secondAnimal.commonName}
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.key}
                className={`border-b border-white/[0.06] ${
                  index % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                }`}
              >
                <td className="px-5 py-5 align-top">
                  <span className="text-sm font-medium text-zinc-300">
                    {category.label}
                  </span>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="text-sm leading-6 text-zinc-400">
                    {firstData[category.key]}
                  </p>
                </td>

                <td className="px-5 py-5 align-top">
                  <p className="text-sm leading-6 text-zinc-400">
                    {secondData[category.key]}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-5">
        <p className="text-xs leading-5 text-zinc-600">
          Comparison content is displayed only after scientific verification.
          Unverified fields are explicitly marked as pending.
        </p>
      </div>
    </div>
  );
}
