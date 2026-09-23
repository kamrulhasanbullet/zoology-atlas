import AnimalExplorer from "@/components/animals/AnimalExplorer";

export const metadata = {
  title: "Animal Explorer | Zoology Atlas",
  description:
    "Explore organisms, taxonomy and biological systems through Zoology Atlas.",
};

export default function AnimalsPage() {
  return (
    <main className="min-h-screen">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
            Animal Explorer
          </p>

          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Explore the animal kingdom.
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-500">
            Browse organisms by name, scientific name and taxonomic group.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <AnimalExplorer />
      </section>
    </main>
  );
}
