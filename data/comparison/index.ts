import type { ComparativeData } from "@/types/zoology";

import { cockroachComparison } from "./cockroach";
import { frogComparison } from "./frog";
import { rabbitComparison } from "./rabbit";
import { rohuComparison } from "./rohu";

export const comparisonByAnimal: Record<string, ComparativeData> = {
  cockroach: cockroachComparison,
  frog: frogComparison,
  rabbit: rabbitComparison,
  rohu: rohuComparison,
};

export function getComparisonData(
  animalSlug: string,
): ComparativeData | undefined {
  return comparisonByAnimal[animalSlug];
}
