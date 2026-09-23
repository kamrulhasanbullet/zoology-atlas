import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Dna, Microscope, Network } from "lucide-react";

import { animals } from "@/data/animals";

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
    <main className="min-h-screen">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/animals"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Animals
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
                {animal.phylum}
              </p>

              <h1 className="mt-3 text-5xl font-black text-white">
                {animal.commonName}
              </h1>

              <p className="mt-2 text-lg italic text-zinc-500">
                {animal.scientificName}
              </p>

              <p className="mt-6 max-w-2xl leading-8 text-zinc-400">
                {animal.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {animal.systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/[0.08] to-transparent">
              <Dna
                size={130}
                strokeWidth={0.7}
                className="text-emerald-400/50"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={Network}
            title="Classification"
            description="Explore the organism's taxonomic position."
          />

          <Feature
            icon={Microscope}
            title="Anatomy"
            description="Explore external and internal structures."
          />

          <Feature
            icon={BookOpen}
            title="Study Mode"
            description="Read structured zoological learning material."
          />

          <Feature
            icon={Dna}
            title="Systems"
            description="Explore major biological systems."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <Icon size={20} className="text-emerald-400" />

      <h3 className="mt-4 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
    </div>
  );
}
