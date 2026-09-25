"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  CircleAlert,
  FileText,
  Layers3,
  Lightbulb,
} from "lucide-react";

import type { Animal } from "@/types/zoology";
import { getStudyTopic } from "@/data/study";

interface StudyModeProps {
  animal: Animal;
}

export default function StudyMode({ animal }: StudyModeProps) {
  const study = getStudyTopic(animal.slug);

  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!study) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <CircleAlert className="mx-auto h-8 w-8 text-amber-400" />

        <h2 className="mt-4 text-xl font-semibold text-white">
          Study mode unavailable
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Verified study content for {animal.commonName} has not been configured
          yet.
        </p>
      </section>
    );
  }

  const toggleSection = (id: string) => {
    setOpenSection((current) => (current === id ? null : id));
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <BookOpen className="h-5 w-5 text-cyan-400" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
              Study Mode
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Study {animal.commonName}
            </h2>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
          Review structured learning material, important concepts and verified
          study resources.
        </p>
      </div>

      {/* Overview */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            {study.overview.title}
          </h3>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-5">
          <div className="flex items-start gap-3">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

            <p className="text-sm leading-6 text-zinc-400">
              {study.overview.content}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-3">
          <Layers3 className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">Detailed Study</h3>
        </div>

        <div className="mt-5 space-y-3">
          {study.detailedSections.map((section) => {
            const isOpen = openSection === section.id;

            return (
              <div
                key={section.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {section.title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      {section.status === "available"
                        ? "Available"
                        : "Pending verification"}
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-5 py-5">
                    <p className="text-sm leading-7 text-zinc-400">
                      {section.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Terms */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-cyan-400" />

            <h3 className="text-lg font-semibold text-white">
              Important Terms
            </h3>
          </div>

          {study.importantTerms.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {study.importantTerms.map((term) => (
                <span
                  key={term}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-zinc-400"
                >
                  {term}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Characteristics */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center gap-3">
            <Layers3 className="h-5 w-5 text-cyan-400" />

            <h3 className="text-lg font-semibold text-white">
              Key Characteristics
            </h3>
          </div>

          {study.keyCharacteristics.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="mt-5 space-y-3">
              {study.keyCharacteristics.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-zinc-400"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Important Facts */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">Important Facts</h3>
        </div>

        {study.importantFacts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {study.importantFacts.map((fact) => (
              <div
                key={fact}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-6 text-zinc-400"
              >
                {fact}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Diagrams */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
        <div className="flex items-center gap-3">
          <Layers3 className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">Diagrams</h3>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {study.diagrams.map((diagram) => (
            <div
              key={diagram.id}
              className="rounded-2xl border border-white/10 bg-[#071014] p-5"
            >
              <p className="font-medium text-white">{diagram.title}</p>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {diagram.description}
              </p>

              <span className="mt-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] uppercase tracking-wider text-amber-300">
                Asset Pending
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="mt-5 rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-4">
      <p className="text-xs leading-5 text-zinc-600">
        Verified content for this section is currently being prepared.
      </p>
    </div>
  );
}
