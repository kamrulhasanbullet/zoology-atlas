import type { StudyTopic } from "@/types/zoology";

import { cockroachStudy } from "./cockroach";
import { frogStudy } from "./frog";
import { rabbitStudy } from "./rabbit";
import { rohuStudy } from "./rohu";

export const studyByAnimal: Record<string, StudyTopic> = {
  cockroach: cockroachStudy,
  frog: frogStudy,
  rabbit: rabbitStudy,
  rohu: rohuStudy,
};

export function getStudyTopic(animalSlug: string): StudyTopic | undefined {
  return studyByAnimal[animalSlug];
}
