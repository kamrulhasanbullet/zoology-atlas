import Link from "next/link";
import { ArrowRight, Dna, Microscope, Network, Scan } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Interactive Zoology Learning Atlas
          </div>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Explore Life.
            <span className="block text-emerald-400">Understand Anatomy.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
            An interactive digital atlas for exploring animal diversity,
            anatomy, physiology and evolution.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/animals"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-emerald-300"
            >
              Explore Animals
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/taxonomy"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
            >
              <Network size={17} />
              Explore Taxonomy
            </Link>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-3">
            <Stat icon={Dna} label="Taxonomy" />
            <Stat icon={Scan} label="Anatomy" />
            <Stat icon={Microscope} label="Study" />
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-square">
            <div className="absolute inset-10 rounded-full border border-emerald-400/20" />
            <div className="absolute inset-20 rounded-full border border-white/10" />
            <div className="absolute inset-32 rounded-full border border-emerald-400/10" />

            <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/5 shadow-[0_0_100px_rgba(52,211,153,0.12)]">
              <Dna size={90} strokeWidth={1} className="text-emerald-400" />
            </div>

            <div className="absolute left-[10%] top-[20%] rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Explore
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Animal Diversity
              </p>
            </div>

            <div className="absolute bottom-[18%] right-[8%] rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                Discover
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Comparative Anatomy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <Icon size={18} className="text-emerald-400" />
      <p className="mt-2 text-xs text-zinc-400">{label}</p>
    </div>
  );
}
