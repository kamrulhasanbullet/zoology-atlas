import TaxonomyTree from "@/components/taxonomy/TaxonomyTree";

export const metadata = {
  title: "Taxonomy Explorer | Zoology Atlas",
  description:
    "Explore zoological classification through an interactive taxonomy tree.",
};

export default function TaxonomyPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Classification
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Explore the architecture of life.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            Navigate zoological groups through an interactive classification
            tree and discover organisms across major taxonomic groups.
          </p>
        </div>
      </section>

      {/* Explorer */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <TaxonomyTree />
      </section>
    </main>
  );
}
