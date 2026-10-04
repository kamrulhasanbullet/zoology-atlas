"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  CheckCircle2,
  GitCompareArrows,
  Info,
} from "lucide-react";

import type { Animal } from "@/types/zoology";
import { getComparisonData } from "@/data/comparison";

interface ComparisonToolProps {
  animals: Animal[];
}

interface ComparisonField {
  key:
    | "classification"
    | "habitat"
    | "bodyCovering"
    | "skeleton"
    | "heart"
    | "circulation"
    | "respiration"
    | "digestion"
    | "excretion"
    | "reproduction"
    | "fertilization"
    | "development";
  label: string;
  category: string;
}

const comparisonFields: ComparisonField[] = [
  {
    key: "classification",
    label: "Classification",
    category: "Classification",
  },
  {
    key: "habitat",
    label: "Habitat",
    category: "Ecology",
  },
  {
    key: "bodyCovering",
    label: "Body Covering",
    category: "Anatomy",
  },
  {
    key: "skeleton",
    label: "Skeleton",
    category: "Anatomy",
  },
  {
    key: "heart",
    label: "Heart",
    category: "Physiology",
  },
  {
    key: "circulation",
    label: "Circulation",
    category: "Physiology",
  },
  {
    key: "respiration",
    label: "Respiration",
    category: "Physiology",
  },
  {
    key: "digestion",
    label: "Digestion",
    category: "Physiology",
  },
  {
    key: "excretion",
    label: "Excretion",
    category: "Physiology",
  },
  {
    key: "reproduction",
    label: "Reproduction",
    category: "Reproduction",
  },
  {
    key: "fertilization",
    label: "Fertilization",
    category: "Reproduction",
  },
  {
    key: "development",
    label: "Development",
    category: "Development",
  },
];

const categoryOrder = [
  "Classification",
  "Ecology",
  "Anatomy",
  "Physiology",
  "Reproduction",
  "Development",
];

export default function ComparisonTool({ animals }: ComparisonToolProps) {
  const availableAnimals = useMemo(
    () => animals.filter((animal) => animal.status === "available"),
    [animals],
  );

  const [leftSlug, setLeftSlug] = useState(availableAnimals[0]?.slug ?? "");

  const [rightSlug, setRightSlug] = useState(
    availableAnimals[1]?.slug ?? availableAnimals[0]?.slug ?? "",
  );

  const leftAnimal = availableAnimals.find(
    (animal) => animal.slug === leftSlug,
  );

  const rightAnimal = availableAnimals.find(
    (animal) => animal.slug === rightSlug,
  );

  const leftComparison = leftAnimal
    ? getComparisonData(leftAnimal.slug)
    : undefined;

  const rightComparison = rightAnimal
    ? getComparisonData(rightAnimal.slug)
    : undefined;

  function handleSwap() {
    setLeftSlug(rightSlug);
    setRightSlug(leftSlug);
  }

  const groupedFields = categoryOrder.map((category) => ({
    category,
    fields: comparisonFields.filter((field) => field.category === category),
  }));

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      {/* Animal Selectors */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
          {/* Animal A */}
          <AnimalSelector
            label="Animal A"
            value={leftSlug}
            animals={availableAnimals}
            onChange={setLeftSlug}
          />

          {/* Swap */}
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap animals"
            title="Swap animals"
            className="mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 lg:mx-0"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>

          {/* Animal B */}
          <AnimalSelector
            label="Animal B"
            value={rightSlug}
            animals={availableAnimals}
            onChange={setRightSlug}
          />
        </div>
      </div>

      {/* Empty state */}
      {!leftAnimal || !rightAnimal ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <GitCompareArrows className="mx-auto h-8 w-8 text-zinc-700" />

          <p className="mt-4 text-sm text-zinc-500">
            Select two animals to compare.
          </p>
        </div>
      ) : (
        <>
          {/* Selected Animals */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimalCard animal={leftAnimal} label="Animal A" />

            <AnimalCard animal={rightAnimal} label="Animal B" />
          </div>

          {/* Comparison Table */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            {/* Header */}
            <div className="grid grid-cols-[150px_minmax(180px,1fr)_minmax(180px,1fr)] border-b border-white/10 bg-white/[0.03] sm:grid-cols-[220px_minmax(250px,1fr)_minmax(250px,1fr)]">
              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                  Feature
                </span>
              </div>

              <ComparisonHeader animal={leftAnimal} />

              <ComparisonHeader animal={rightAnimal} />
            </div>

            {/* Groups */}
            {groupedFields.map((group) => (
              <div key={group.category}>
                {/* Category */}
                <div className="border-b border-white/10 bg-zinc-950/70 px-4 py-3 sm:px-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                    {group.category}
                  </p>
                </div>

                {/* Rows */}
                {group.fields.map((field) => {
                  const leftValue = leftComparison?.[field.key];

                  const rightValue = rightComparison?.[field.key];

                  return (
                    <ComparisonRow
                      key={field.key}
                      label={field.label}
                      leftValue={leftValue}
                      rightValue={rightValue}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Data Notice */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

            <div>
              <p className="text-sm font-medium text-amber-300">
                Scientific data verification
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                Comparison information is displayed according to the current
                verified-content status of the atlas. Content that has not yet
                been verified remains clearly marked as pending.
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function AnimalSelector({
  label,
  value,
  animals,
  onChange,
}: {
  label: string;
  value: string;
  animals: Animal[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex-1">
      <label
        htmlFor={label}
        className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500"
      >
        {label}
      </label>

      <select
        id={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-cyan-400/40"
      >
        {animals.map((animal) => (
          <option key={animal.slug} value={animal.slug} className="bg-zinc-950">
            {animal.commonName}
          </option>
        ))}
      </select>
    </div>
  );
}

function AnimalCard({ animal, label }: { animal: Animal; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
        {label}
      </p>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/5">
          <GitCompareArrows className="h-5 w-5 text-cyan-400" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-white">
            {animal.commonName}
          </h2>

          <p className="mt-1 truncate text-sm italic text-zinc-500">
            {animal.scientificName}
          </p>

          <p className="mt-2 text-xs text-zinc-600">{animal.phylum}</p>
        </div>
      </div>
    </div>
  );
}

function ComparisonHeader({ animal }: { animal: Animal }) {
  return (
    <div className="border-l border-white/10 p-4 sm:p-5">
      <p className="truncate text-sm font-semibold text-white">
        {animal.commonName}
      </p>

      <p className="mt-1 truncate text-xs italic text-zinc-500">
        {animal.scientificName}
      </p>
    </div>
  );
}

function ComparisonRow({
  label,
  leftValue,
  rightValue,
}: {
  label: string;
  leftValue?: string;
  rightValue?: string;
}) {
  const leftPending = !leftValue || leftValue.toLowerCase().includes("pending");

  const rightPending =
    !rightValue || rightValue.toLowerCase().includes("pending");

  return (
    <div className="grid grid-cols-[150px_minmax(180px,1fr)_minmax(180px,1fr)] border-b border-white/5 last:border-b-0 sm:grid-cols-[220px_minmax(250px,1fr)_minmax(250px,1fr)]">
      {/* Feature */}
      <div className="flex items-center p-4 sm:p-5">
        <p className="text-sm font-medium text-zinc-300">{label}</p>
      </div>

      {/* Left */}
      <ComparisonValue value={leftValue} pending={leftPending} />

      {/* Right */}
      <ComparisonValue value={rightValue} pending={rightPending} />
    </div>
  );
}

function ComparisonValue({
  value,
  pending,
}: {
  value?: string;
  pending: boolean;
}) {
  return (
    <div className="border-l border-white/5 p-4 sm:p-5">
      <div className="flex items-start gap-2">
        {pending ? (
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
        ) : (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/70" />
        )}

        <p
          className={`text-sm leading-6 ${
            pending ? "text-zinc-600" : "text-zinc-300"
          }`}
        >
          {value || "Data pending verification."}
        </p>
      </div>
    </div>
  );
}
