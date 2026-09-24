"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Layers3,
  RotateCcw,
} from "lucide-react";

import type { Animal, DissectionLayer } from "@/types/zoology";

import { getAnimalAnatomy } from "@/data/anatomy";

interface VirtualDissectionProps {
  animal: Animal;
}

export default function VirtualDissection({ animal }: VirtualDissectionProps) {
  const anatomy = getAnimalAnatomy(animal.slug);

  const layers = useMemo(() => {
    if (!anatomy) return [];

    return [...anatomy.dissectionLayers].sort((a, b) => a.order - b.order);
  }, [anatomy]);

  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  const activeLayer: DissectionLayer | undefined = layers[activeLayerIndex];

  const handleNext = () => {
    if (activeLayerIndex < layers.length - 1) {
      setActiveLayerIndex((current) => current + 1);
    }
  };

  const handlePrevious = () => {
    if (activeLayerIndex > 0) {
      setActiveLayerIndex((current) => current - 1);
    }
  };

  const handleReset = () => {
    setActiveLayerIndex(0);
  };

  if (!anatomy || layers.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <CircleAlert className="mx-auto h-8 w-8 text-amber-400" />

        <h2 className="mt-4 text-lg font-semibold text-white">
          Virtual dissection unavailable
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          A verified virtual dissection module for {animal.commonName} has not
          been configured yet.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#071014]">
      {/* Header */}
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-cyan-400" />

              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Virtual Dissection
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-white">
              Explore {animal.commonName}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Progressively explore anatomical layers through a structured
              educational workflow.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-zinc-600">
            Dissection Progress
          </span>

          <span className="text-xs text-zinc-500">
            {activeLayerIndex + 1} / {layers.length}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          {layers.map((layer, index) => {
            const completed = index < activeLayerIndex;

            const active = index === activeLayerIndex;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerIndex(index)}
                className="group flex flex-1 flex-col gap-2 text-left"
              >
                <div
                  className={`h-1.5 rounded-full transition ${
                    completed || active ? "bg-cyan-400" : "bg-white/10"
                  }`}
                />

                <span
                  className={`hidden text-[10px] leading-4 sm:block ${
                    active ? "text-cyan-300" : "text-zinc-600"
                  }`}
                >
                  {layer.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main workspace */}
      <div className="grid lg:grid-cols-[1fr_340px]">
        {/* Visualization */}
        <div className="relative min-h-[460px] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.07),transparent_50%)] lg:border-b-0 lg:border-r">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex min-h-[460px] items-center justify-center p-8">
            <div className="w-full max-w-md text-center">
              {/* Layer visualization placeholder */}
              <div className="relative mx-auto h-64 w-64">
                <div className="absolute inset-0 animate-pulse rounded-full border border-cyan-400/10 bg-cyan-400/[0.02]" />

                <div className="absolute inset-8 rounded-full border border-cyan-400/10 bg-cyan-400/[0.025]" />

                <div className="absolute inset-16 rounded-full border border-dashed border-cyan-400/20" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <Layers3 className="h-12 w-12 text-cyan-400/40" />
                </div>
              </div>

              <div className="mt-8">
                <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-300">
                  Visualization Pending
                </span>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {activeLayer.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  A verified 2D or 3D visualization will be connected to this
                  layer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layer Information */}
        <aside className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
              Current Layer
            </span>

            <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px] text-zinc-500">
              Layer {activeLayer.order}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white">
            {activeLayer.name}
          </h3>

          {/* Description */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Description
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {activeLayer.description}
            </p>
          </div>

          {/* Function */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Function
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {activeLayer.function}
            </p>
          </div>

          {/* Related System */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Related System
            </p>

            <p className="mt-2 text-sm capitalize text-zinc-400">
              {activeLayer.relatedSystem ?? "Multiple systems"}
            </p>
          </div>

          {/* Verification */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              {activeLayer.verified ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10">
                  <Check className="h-4 w-4 text-emerald-400" />
                </div>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/10">
                  <CircleAlert className="h-4 w-4 text-amber-400" />
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-white">
                  {activeLayer.verified ? "Verified" : "Pending Verification"}
                </p>

                <p className="mt-0.5 text-[10px] text-zinc-600">
                  Scientific asset status
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={activeLayerIndex === 0}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeLayerIndex === layers.length - 1}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>

      {/* Layer List */}
      <div className="border-t border-white/10 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
          Dissection Layers
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {layers.map((layer, index) => {
            const active = index === activeLayerIndex;

            const completed = index < activeLayerIndex;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayerIndex(index)}
                className={`rounded-xl border p-4 text-left transition ${
                  active
                    ? "border-cyan-400/30 bg-cyan-400/[0.07]"
                    : completed
                      ? "border-emerald-400/10 bg-emerald-400/[0.02]"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      active
                        ? "text-cyan-300"
                        : completed
                          ? "text-emerald-400"
                          : "text-zinc-500"
                    }`}
                  >
                    0{layer.order}
                  </span>

                  {completed && (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  )}
                </div>

                <p
                  className={`mt-3 text-sm font-medium ${
                    active ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {layer.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
