import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Dna,
  Microscope,
  Network,
  Sparkles,
} from "lucide-react";

import { animals } from "@/data/animals";
import StudyMode from "@/components/study/StudyMode";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return animals.map((animal) => ({
    slug: animal.slug,
  }));
}

export default async function AnimalPage({ params }: PageProps) {
  const { slug } = await params;

  const animal = animals.find((item) => item.slug === slug);

  if (!animal) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#03070b] text-white">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          {/* BACK */}
          <Link
            href="/animals"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Animals
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
            {/* CONTENT */}
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  {animal.phylum}
                </span>

                {animal.status === "available" && (
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Available
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {animal.commonName}
              </h1>

              <p className="mt-3 text-lg italic text-zinc-500">
                {animal.scientificName}
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
                {animal.description}
              </p>

              {/* TAXONOMIC INFO */}
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
                <InfoItem label="Phylum" value={animal.phylum} />

                <InfoItem label="Class" value={animal.className} />

                <InfoItem label="Habitat" value={animal.habitat} />
              </div>

              {/* SYSTEM TAGS */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  Biological Systems
                </p>

                <div className="flex flex-wrap gap-2">
                  {animal.systems.map((system) => (
                    <span
                      key={system}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 transition hover:border-emerald-400/20 hover:text-emerald-300"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={`/anatomy?animal=${animal.slug}`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  <Microscope size={17} />
                  Explore Anatomy
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/taxonomy"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Network size={17} />
                  View Taxonomy
                </Link>
              </div>
            </div>

            {/* VISUAL */}
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-emerald-400/[0.04] blur-3xl" />

              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-emerald-400/[0.08] via-white/[0.02] to-transparent">
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.06]">
                    <Dna
                      size={90}
                      strokeWidth={0.7}
                      className="text-emerald-400/60"
                    />
                  </div>

                  <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-600">
                    Zoology Atlas
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    Interactive organism profile
                  </p>
                </div>

                {/* Corner decorations */}
                <div className="absolute left-5 top-5 h-8 w-8 border-l border-t border-emerald-400/20" />
                <div className="absolute right-5 top-5 h-8 w-8 border-r border-t border-emerald-400/20" />
                <div className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-emerald-400/20" />
                <div className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-emerald-400/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LEARNING AREAS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <Sparkles size={14} />
            Explore Organism
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Learn through exploration
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Explore the organism through taxonomy, anatomy, biological systems,
            and structured study materials.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={Network}
            title="Classification"
            description="Explore the organism's taxonomic position and biological relationships."
            href="/taxonomy"
          />

          <Feature
            icon={Microscope}
            title="Anatomy"
            description="Explore external and internal anatomical structures."
            href={`/anatomy?animal=${animal.slug}`}
            highlight
          />

          <Feature
            icon={BookOpen}
            title="Study Mode"
            description="Study structured zoological learning materials and concepts."
          />

          <Feature
            icon={Dna}
            title="Biological Systems"
            description="Explore the major systems associated with this organism."
          />
        </div>
      </section>

      {/* ORGANISM OVERVIEW */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Organism Overview
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white">
                {animal.commonName}
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-8 text-zinc-500">
                {animal.description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Quick Facts
              </p>

              <div className="mt-5 space-y-4">
                <QuickFact
                  label="Scientific Name"
                  value={animal.scientificName}
                  italic
                />

                <QuickFact label="Phylum" value={animal.phylum} />

                <QuickFact label="Class" value={animal.className} />

                <QuickFact label="Habitat" value={animal.habitat} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </p>

      <p className="mt-1 truncate text-sm text-zinc-300">{value}</p>
    </div>
  );
}

function QuickFact({
  label,
  value,
  italic = false,
}: {
  label: string;
  value: string;
  italic?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-zinc-600">{label}</span>

      <span
        className={`text-right text-sm text-zinc-300 ${italic ? "italic" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

<section className="mt-16">
  <StudyMode animal={animal} />
</section>;

function Feature({
  icon: Icon,
  title,
  description,
  href,
  highlight = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  highlight?: boolean;
}) {
  const content = (
    <>
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          highlight
            ? "bg-emerald-400/10 text-emerald-400"
            : "bg-white/[0.04] text-zinc-400"
        }`}
      >
        <Icon size={19} />
      </div>

      <h3 className="mt-5 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>

      {href && (
        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
          Explore
          <ArrowRight size={14} />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/20 hover:bg-white/[0.04]"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      {content}
    </div>
  );
}
