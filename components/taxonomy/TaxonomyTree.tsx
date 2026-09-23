"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Dna, Search } from "lucide-react";

import { taxonomy } from "@/data/taxonomy";
import { TaxonomyNode } from "@/types/zoology";

function TreeNode({
  node,
  level = 0,
  search,
}: {
  node: TaxonomyNode;
  level?: number;
  search: string;
}) {
  const hasChildren = Boolean(node.children?.length);

  const [expanded, setExpanded] = useState(level < 2);

  const matchesSearch =
    !search ||
    node.name.toLowerCase().includes(search.toLowerCase()) ||
    node.rank.toLowerCase().includes(search.toLowerCase());

  const childMatches =
    node.children?.some(
      (child) =>
        child.name.toLowerCase().includes(search.toLowerCase()) ||
        child.rank.toLowerCase().includes(search.toLowerCase()) ||
        child.children?.some((nested) =>
          nested.name.toLowerCase().includes(search.toLowerCase()),
        ),
    ) ?? false;

  if (search && !matchesSearch && !childMatches) {
    return null;
  }

  const isOrganism = node.rank === "Organism";

  return (
    <div className="relative">
      {level > 0 && (
        <div
          className="absolute bottom-0 left-[-20px] top-0 border-l border-white/10"
          aria-hidden="true"
        />
      )}

      <div
        className={`group flex items-center gap-2 rounded-xl px-3 py-2 transition ${
          isOrganism ? "hover:bg-emerald-400/[0.06]" : "hover:bg-white/[0.03]"
        }`}
      >
        {hasChildren ? (
          <button
            onClick={() => setExpanded((value) => !value)}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${node.name}`}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-500 hover:bg-white/5 hover:text-white"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="h-7 w-7 shrink-0" />
        )}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          {isOrganism ? (
            <Dna size={16} className="shrink-0 text-emerald-400" />
          ) : (
            <div className="h-2 w-2 shrink-0 rounded-full bg-zinc-600" />
          )}

          <div className="min-w-0">
            <p
              className={`truncate text-sm ${
                isOrganism
                  ? "font-medium text-zinc-200"
                  : "font-semibold text-white"
              }`}
            >
              {node.name}
            </p>

            <p className="text-[10px] uppercase tracking-wider text-zinc-600">
              {node.rank}
            </p>
          </div>
        </div>

        {isOrganism && (
          <Link
            href={`/animals/${node.name.toLowerCase().replaceAll(" ", "-")}`}
            className="rounded-lg px-2 py-1 text-xs text-zinc-600 opacity-0 transition hover:text-emerald-400 group-hover:opacity-100"
          >
            Explore
          </Link>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="ml-7 border-l border-white/5 pl-4">
          {node.children?.map((child) => (
            <TreeNode
              key={`${node.name}-${child.name}`}
              node={child}
              level={level + 1}
              search={search}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TaxonomyTree() {
  const [search, setSearch] = useState("");

  const totalGroups = useMemo(() => {
    return taxonomy.children?.length ?? 0;
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:sticky lg:top-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Taxonomy
        </p>

        <h2 className="mt-2 text-xl font-bold text-white">Tree Explorer</h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Navigate through biological groups and explore organisms.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-black/10 p-4">
          <p className="text-2xl font-bold text-white">{totalGroups}</p>

          <p className="mt-1 text-xs text-zinc-600">Major groups</p>
        </div>
      </aside>

      {/* Tree */}
      <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="border-b border-white/10 p-4 sm:p-5">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search taxonomy..."
              className="h-11 w-full rounded-xl border border-white/10 bg-black/10 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-emerald-400/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto p-4 sm:p-6">
          <div className="min-w-[520px]">
            <div className="mb-3 flex items-center gap-2 px-3">
              <Dna size={18} className="text-emerald-400" />

              <div>
                <p className="text-sm font-bold text-white">{taxonomy.name}</p>

                <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                  {taxonomy.rank}
                </p>
              </div>
            </div>

            <div className="ml-2 border-l border-white/10 pl-5">
              {taxonomy.children?.map((node) => (
                <TreeNode
                  key={node.name}
                  node={node}
                  level={1}
                  search={search}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
