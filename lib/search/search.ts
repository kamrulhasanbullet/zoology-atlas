import { animals } from "@/data/animals";
import type { Animal } from "@/types/zoology";

export type SearchResultType = "animal" | "anatomy" | "study";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  animalSlug?: string;
}

function normalize(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function matchesQuery(query: string, values: string[]) {
  const normalizedQuery = normalize(query);

  return values.some((value) => normalize(value).includes(normalizedQuery));
}

function animalToResult(animal: Animal): SearchResult {
  return {
    id: `animal-${animal.slug}`,
    type: "animal",
    title: animal.commonName,
    subtitle: animal.scientificName,
    description: animal.description,
    href: `/animals/${animal.slug}`,
    animalSlug: animal.slug,
  };
}

export function searchAnimals(query: string): SearchResult[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  return animals
    .filter((animal) => {
      const searchableFields = [
        animal.commonName,
        animal.scientificName,
        animal.phylum,
        animal.className,
        animal.slug,
        animal.description,
        ...(animal.systems ?? []),
      ];

      return matchesQuery(normalizedQuery, searchableFields);
    })
    .map(animalToResult);
}

export function searchAll(query: string): SearchResult[] {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  const results: SearchResult[] = [];

  for (const animal of animals) {
    const searchableFields = [
      animal.commonName,
      animal.scientificName,
      animal.phylum,
      animal.className,
      animal.slug,
      animal.description,
      ...(animal.systems ?? []),
    ];

    if (matchesQuery(normalizedQuery, searchableFields)) {
      results.push(animalToResult(animal));
    }
  }

  return results;
}
