"use client";

import { useMemo, useState } from "react";
import { RotateCcw, ZoomIn, ZoomOut, Eye, EyeOff, Info } from "lucide-react";

import { anatomyStructures, anatomySystems } from "@/data/anatomy";

import { AnatomySystem } from "@/types/zoology";

interface AnatomyViewerProps {
  animalName: string;
}

export default function AnatomyViewer({ animalName }: AnatomyViewerProps) {
  const [activeSystem, setActiveSystem] = useState<AnatomySystem>("external");

  const [selectedStructure, setSelectedStructure] = useState(
    anatomyStructures[0],
  );

  const [zoom, setZoom] = useState(1);

  const [showInfo, setShowInfo] = useState(true);

  const structures = useMemo(
    () =>
      anatomyStructures.filter(
        (structure) => structure.system === activeSystem,
      ),
    [activeSystem],
  );

  const handleReset = () => {
    setZoom(1);
    setActiveSystem("external");
    setSelectedStructure(anatomyStructures[0]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr_320px]">
      {/* SYSTEM SIDEBAR */}
      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
            Anatomy
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">Systems</h2>
        </div>

        <div className="space-y-1">
          {anatomySystems.map((system) => {
            const active = activeSystem === system.id;

            return (
              <button
                key={system.id}
                onClick={() => {
                  setActiveSystem(system.id);

                  const firstStructure = anatomyStructures.find(
                    (item) => item.system === system.id,
                  );

                  if (firstStructure) {
                    setSelectedStructure(firstStructure);
                  }
                }}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {system.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* VIEWER */}
      <section className="relative min-h-[620px] overflow-hidden rounded-2xl border border-white/10 bg-[#071018]">
        {/* top toolbar */}
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Interactive Viewer
            </p>

            <h3 className="mt-1 font-semibold text-white">{animalName}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((value) => Math.min(value + 0.1, 1.8))}
              className="rounded-lg border border-white/10 bg-black/30 p-2 text-slate-300 hover:bg-white/10"
              aria-label="Zoom in"
            >
              <ZoomIn size={17} />
            </button>

            <button
              onClick={() => setZoom((value) => Math.max(value - 0.1, 0.7))}
              className="rounded-lg border border-white/10 bg-black/30 p-2 text-slate-300 hover:bg-white/10"
              aria-label="Zoom out"
            >
              <ZoomOut size={17} />
            </button>

            <button
              onClick={handleReset}
              className="rounded-lg border border-white/10 bg-black/30 p-2 text-slate-300 hover:bg-white/10"
              aria-label="Reset"
            >
              <RotateCcw size={17} />
            </button>

            <button
              onClick={() => setShowInfo((value) => !value)}
              className="rounded-lg border border-white/10 bg-black/30 p-2 text-slate-300 hover:bg-white/10"
              aria-label="Toggle information"
            >
              {showInfo ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {/* viewer canvas */}
        <div className="flex min-h-[620px] items-center justify-center p-12">
          <div
            className="relative flex aspect-[3/4] w-full max-w-[360px] items-center justify-center rounded-[40%] border border-cyan-400/10 bg-gradient-to-b from-cyan-400/[0.04] via-transparent to-blue-500/[0.03] transition-transform duration-300"
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            <div className="text-center px-8">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5">
                <Info className="text-cyan-400" size={30} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                Anatomy Asset Required
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                A verified anatomy diagram or 3D model will be connected to this
                viewer.
              </p>

              <div className="mt-5 inline-flex rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
                Scientific asset pending verification
              </div>
            </div>
          </div>
        </div>

        {/* bottom status */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
          <span className="text-xs text-slate-500">Active layer</span>

          <span className="text-xs font-medium text-cyan-300">
            {anatomySystems.find((system) => system.id === activeSystem)?.label}
          </span>
        </div>
      </section>

      {/* INFORMATION PANEL */}
      {showInfo && (
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Structure
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              {selectedStructure?.name ?? "No structure selected"}
            </h2>
          </div>

          {selectedStructure ? (
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Description
                </p>

                <p className="text-sm leading-6 text-slate-400">
                  {selectedStructure.description}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Function
                </p>

                <p className="text-sm leading-6 text-slate-400">
                  {selectedStructure.function}
                </p>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Verification</span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      selectedStructure.verified
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {selectedStructure.verified ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Select an anatomical structure to inspect it.
            </p>
          )}

          {/* available structures */}
          {structures.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
                Available structures
              </p>

              <div className="space-y-2">
                {structures.map((structure) => (
                  <button
                    key={structure.id}
                    onClick={() => setSelectedStructure(structure)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                      selectedStructure?.id === structure.id
                        ? "border-cyan-400/20 bg-cyan-400/5 text-cyan-300"
                        : "border-white/5 text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {structure.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
