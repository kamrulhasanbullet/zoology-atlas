"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { searchAll, type SearchResult } from "@/lib/search/search";

export default function SearchBox() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setResults(searchAll(query).slice(0, 6));
    }, 150);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    setOpen(false);

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }

  function handleResultClick(result: SearchResult) {
    setOpen(false);
    setQuery("");
    router.push(result.href);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search animals, anatomy..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-10 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-cyan-400/30 focus:bg-white/[0.06]"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => handleResultClick(result)}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.06]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                    <Search className="h-4 w-4 text-cyan-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {result.title}
                    </p>

                    {result.subtitle && (
                      <p className="truncate text-xs italic text-zinc-500">
                        {result.subtitle}
                      </p>
                    )}
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-zinc-600" />
                </button>
              ))}

              <button
                type="submit"
                onClick={handleSubmit}
                className="mt-1 w-full rounded-xl border-t border-white/10 px-3 py-3 text-left text-xs text-zinc-500 transition hover:text-cyan-300"
              >
                View all results for{" "}
                <span className="text-zinc-300">"{query}"</span>
              </button>
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <Search className="mx-auto h-6 w-6 text-zinc-700" />

              <p className="mt-3 text-sm text-zinc-400">No matching results</p>

              <p className="mt-1 text-xs text-zinc-600">
                Try an animal, scientific name, or phylum.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
