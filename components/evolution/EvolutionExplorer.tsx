"use client";

import { useMemo, useState } from "react";
import { GitBranch, CircleAlert, ChevronRight, Dna } from "lucide-react";

import { evolutionNodes } from "@/data/evolution";

export default function EvolutionExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedNode = useMemo(
    () => evolutionNodes.find((node) => node.id === selectedId),
    [selectedId],
  );

  return (
    <div className="space-y-8">
      {/* Explorer */}
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#071014]">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
              <GitBranch className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Evolutionary Explorer
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Explore organism groups and their evolutionary relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Nodes */}
        <div className="p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {evolutionNodes.map((node) => {
              const active = selectedId === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedId(node.id)}
                  className={`group rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-emerald-400/30 bg-emerald-400/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          active
                            ? "bg-emerald-400 text-black"
                            : "bg-white/[0.05] text-zinc-400"
                        }`}
                      >
                        <Dna className="h-4 w-4" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {node.name}
                        </h3>

                        <p className="mt-1 text-[11px] text-zinc-500">
                          {node.group}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 transition ${
                        active
                          ? "text-emerald-400"
                          : "text-zinc-600 group-hover:text-zinc-400"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Node */}
      {selectedNode && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Dna className="h-5 w-5 text-emerald-400" />

                <h2 className="text-xl font-semibold text-white">
                  {selectedNode.name}
                </h2>
              </div>

              <p className="mt-2 text-sm text-zinc-500">{selectedNode.group}</p>
            </div>

            {!selectedNode.verified && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-amber-300">
                <CircleAlert className="h-3 w-3" />
                Pending Verification
              </span>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-black/10 p-5">
            <p className="text-sm leading-6 text-zinc-400">
              {selectedNode.description}
            </p>

            {!selectedNode.verified && (
              <p className="mt-4 text-xs leading-5 text-zinc-600">
                Verified evolutionary relationships, lineage information, and
                adaptation data will be connected here after scientific
                verification.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
