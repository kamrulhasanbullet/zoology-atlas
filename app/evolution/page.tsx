import { ArrowRight, Dna, GitBranch } from "lucide-react";

import EvolutionExplorer from "@/components/evolution/EvolutionExplorer";

export default function EvolutionPage() {
  return (
    <main className="min-h-screen bg-[#050b09] text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <Dna className="h-3.5 w-3.5" />
              Evolution Explorer
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Explore the <span className="text-emerald-400">evolutionary</span>{" "}
              world.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">
              Explore organism groups, evolutionary relationships, lineage, and
              major adaptations through an interactive learning environment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-500">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                Interactive exploration
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                Evolutionary relationships
              </span>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                Scientific verification
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <EvolutionExplorer />
      </section>

      {/* Future */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-cyan-400" />

                <h2 className="font-semibold text-white">
                  Interactive Evolution Tree
                </h2>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                A richer interactive evolutionary tree with verified
                relationships, lineage exploration, and organism connections
                will be added as the scientific dataset grows.
              </p>
            </div>

            <ArrowRight className="hidden h-5 w-5 text-zinc-700 sm:block" />
          </div>
        </div>
      </section>
    </main>
  );
}
