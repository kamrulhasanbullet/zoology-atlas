"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search, Dna, BookOpen } from "lucide-react";

import { searchAll, type SearchResult } from "@/lib/search/search";

function ResultIcon({ type }: { type: SearchResult["type"] }) {
  if (type === "animal") {
    return <Dna className="h-5 w-5 text-cyan-300" />;
  }

  if (type === "study") {
    return <BookOpen className="h-5 w-5 text-cyan-300" />;
  }

  return <Search className="h-5 w-5 text-cyan-300" />;
}

function ResultCard({ result }: { result: SearchResult }) {
  return (
    <Link
      href={result.href}
      className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/20 hover:bg-white/[0.05]"
    >
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
          <ResultIcon type={result.type} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-white">{result.title}</h2>

            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] uppercase tracking-wider text-zinc-500">
              {result.type}
            </span>
          </div>

          {result.subtitle && (
            <p className="mt-1 text-sm italic text-zinc-500">
              {result.subtitle}
            </p>
          )}

          {result.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-500">
              {result.description}
            </p>
          )}
        </div>

        <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
      </div>
    </Link>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const results = query ? searchAll(query) : [];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-cyan-950/20 via-black to-black">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            Knowledge Search
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Search Zoology Atlas
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Find organisms and learning resources across the Zoology Atlas.
          </p>

          {query && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-zinc-400">
              <Search className="h-4 w-4 text-cyan-300" />
              Results for
              <span className="font-medium text-white">"{query}"</span>
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {!query ? (
          <div className="rounded-3xl border border-dashed border-white/10 px-6 py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-zinc-700" />

            <h2 className="mt-4 text-lg font-semibold text-white">
              Start searching
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Search for an animal, scientific name, phylum, or anatomy topic.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 px-6 py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-zinc-700" />

            <h2 className="mt-4 text-lg font-semibold text-white">
              No results found
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Try searching with a different keyword.
            </p>

            <Link
              href="/animals"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              Browse Animals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="mb-5 text-sm text-zinc-500">
              {results.length} result
              {results.length !== 1 ? "s" : ""} found
            </p>

            {results.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
