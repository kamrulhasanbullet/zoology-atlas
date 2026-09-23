import type { AnimalAnatomy } from "@/types/zoology";

import { cockroachAnatomy } from "./cockroach";
import { frogAnatomy } from "./frog";
import { rabbitAnatomy } from "./rabbit";
import { rohuAnatomy } from "./rohu";

export const anatomyByAnimal: Record<string, AnimalAnatomy> = {
  cockroach: cockroachAnatomy,
  frog: frogAnatomy,
  rabbit: rabbitAnatomy,
  rohu: rohuAnatomy,
};

export function getAnimalAnatomy(
  animalSlug: string,
): AnimalAnatomy | undefined {
  return anatomyByAnimal[animalSlug];
}
