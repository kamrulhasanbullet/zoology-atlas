"use client";

import { useMemo, useState } from "react";
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  Layers3,
  CircleAlert,
  Box,
} from "lucide-react";

import type { Animal, AnatomyStructure, AnatomySystem } from "@/types/zoology";

import { getAnimalAnatomy } from "@/data/anatomy";

interface AnatomyViewerProps {
  animal: Animal;
}

const systemLabels: Record<AnatomySystem, string> = {
  external: "External",
  skeletal: "Skeletal",
  muscular: "Muscular",
  digestive: "Digestive",
  respiratory: "Respiratory",
  circulatory: "Circulatory",
  excretory: "Excretory",
  nervous: "Nervous",
  reproductive: "Reproductive",
};

export default function AnatomyViewer({ animal }: AnatomyViewerProps) {
  const anatomy = getAnimalAnatomy(animal.slug);

  const availableSystems = anatomy?.systems ?? [];

  const [activeSystem, setActiveSystem] = useState<AnatomySystem>(
    availableSystems[0] ?? "external",
  );

  const [selectedStructure, setSelectedStructure] = useState<
    AnatomyStructure | undefined
  >();

  const [showInfo, setShowInfo] = useState(true);

  const [zoom, setZoom] = useState(100);

  const structures = useMemo(() => {
    if (!anatomy) return [];

    return anatomy.structures.filter(
      (structure) => structure.system === activeSystem,
    );
  }, [anatomy, activeSystem]);

  const handleSystemChange = (system: AnatomySystem) => {
    setActiveSystem(system);

    const firstStructure = anatomy?.structures.find(
      (structure) => structure.system === system,
    );

    setSelectedStructure(firstStructure);
  };

  const handleZoomIn = () => {
    setZoom((current) => Math.min(current + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((current) => Math.max(current - 10, 70));
  };

  const handleReset = () => {
    setZoom(100);

    const firstStructure = anatomy?.structures.find(
      (structure) => structure.system === activeSystem,
    );

    setSelectedStructure(firstStructure);
  };

  if (!anatomy) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <CircleAlert className="mx-auto mb-4 h-10 w-10 text-amber-400" />

        <h2 className="text-xl font-semibold text-white">
          Anatomy data unavailable
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-400">
          Verified anatomy data for{" "}
          <span className="text-white">{animal.commonName}</span> has not been
          added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#071014] shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-cyan-400" />

            <h2 className="font-semibold text-white">
              {animal.commonName} Anatomy
            </h2>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Interactive anatomy workspace
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleZoomOut}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <div className="min-w-14 text-center text-xs text-zinc-400">
            {zoom}%
          </div>

          <button
            type="button"
            onClick={handleZoomIn}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
            aria-label="Reset viewer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowInfo((current) => !current)}
            className={`rounded-lg border p-2 transition ${
              showInfo
                ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08]"
            }`}
            aria-label="Toggle information"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr_280px]">
        {/* Systems */}
        <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <Layers3 className="h-4 w-4" />
            Systems
          </div>

          <div className="flex gap-2 overflow-x-auto lg:flex-col">
            {availableSystems.map((system) => {
              const active = activeSystem === system;

              const count = anatomy.structures.filter(
                (structure) => structure.system === system,
              ).length;

              return (
                <button
                  key={system}
                  type="button"
                  onClick={() => handleSystemChange(system)}
                  className={`flex min-w-fit items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{systemLabels[system]}</span>

                  <span className="ml-3 rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-zinc-500">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Viewer */}
        <section className="relative min-h-[520px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_45%)]">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-black/20 px-3 py-2 backdrop-blur">
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              Active System
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              {systemLabels[activeSystem]}
            </p>
          </div>

          {/* Placeholder canvas */}
          <div className="relative z-10 flex min-h-[520px] items-center justify-center p-8">
            <div
              className="text-center transition-transform duration-300"
              style={{
                transform: `scale(${zoom / 100})`,
              }}
            >
              <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.03] shadow-[0_0_100px_rgba(34,211,238,0.06)]">
                <div className="flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-cyan-400/20">
                  <Box className="h-14 w-14 text-cyan-400/50" />
                </div>
              </div>

              <div className="mt-7">
                <p className="text-sm font-medium text-zinc-300">
                  Scientific visualization pending
                </p>

                <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-600">
                  A verified 2D or 3D anatomy asset will be connected here. No
                  fabricated anatomy visualization is being used.
                </p>
              </div>
            </div>
          </div>

          {/* Structures */}
          {structures.length > 0 && (
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-xl">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Available Structures
                </div>

                <div className="flex flex-wrap gap-2">
                  {structures.map((structure) => {
                    const active = selectedStructure?.id === structure.id;

                    return (
                      <button
                        key={structure.id}
                        type="button"
                        onClick={() => setSelectedStructure(structure)}
                        className={`rounded-lg border px-3 py-2 text-xs transition ${
                          active
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {structure.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Information */}
        {showInfo && (
          <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-cyan-400" />

              <h3 className="text-sm font-semibold text-white">
                Structure Information
              </h3>
            </div>

            {selectedStructure ? (
              <div className="mt-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-semibold text-white">
                      {selectedStructure.name}
                    </h4>

                    {!selectedStructure.verified && (
                      <span className="shrink-0 rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-amber-300">
                        Pending
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {selectedStructure.shortDescription ??
                      "Scientific description pending verification."}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Asset Status
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    {selectedStructure.assetType === "2d"
                      ? "2D visualization asset connected"
                      : selectedStructure.assetType === "3d"
                        ? "3D visualization asset connected"
                        : "No visualization asset connected"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-5 text-center">
                <Info className="mx-auto h-6 w-6 text-zinc-600" />

                <p className="mt-3 text-sm text-zinc-500">
                  Select a structure to inspect it.
                </p>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
