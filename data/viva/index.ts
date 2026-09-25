import type { VivaQuestion } from "@/types/zoology";

import { cockroachViva } from "./cockroach";
import { frogViva } from "./frog";
import { rabbitViva } from "./rabbit";
import { rohuViva } from "./rohu";

export const vivaByAnimal: Record<string, VivaQuestion[]> = {
  cockroach: cockroachViva,
  frog: frogViva,
  rabbit: rabbitViva,
  rohu: rohuViva,
};

export function getVivaQuestions(animalSlug: string): VivaQuestion[] {
  return vivaByAnimal[animalSlug] ?? [];
}
