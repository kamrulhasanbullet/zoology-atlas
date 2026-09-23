import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              Learn differently
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              From organism to ecosystem.
            </h2>

            <p className="mt-4 leading-7 text-zinc-500">
              Explore organisms, understand their structures, compare biological
              systems and prepare for examinations through an interactive
              learning environment.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
