import Link from "next/link";
import { ArrowUpRight, Dna } from "lucide-react";
import { Animal } from "@/types/zoology";

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Link
      href={`/animals/${animal.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.04]"
    >
      <div className="flex h-48 items-center justify-center border-b border-white/10 bg-gradient-to-br from-emerald-400/[0.08] to-transparent">
        <Dna
          size={64}
          strokeWidth={1}
          className="text-emerald-400/50 transition duration-500 group-hover:scale-110 group-hover:text-emerald-400"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-400">
              {animal.phylum}
            </p>

            <h3 className="mt-1 text-lg font-bold text-white">
              {animal.commonName}
            </h3>

            <p className="mt-1 text-sm italic text-zinc-500">
              {animal.scientificName}
            </p>
          </div>

          <ArrowUpRight
            size={18}
            className="text-zinc-600 transition group-hover:text-emerald-400"
          />
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-500">
          {animal.description}
        </p>
      </div>
    </Link>
  );
}
