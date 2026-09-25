import type { QuizQuestion } from "@/types/zoology";

import { cockroachQuiz } from "./cockroach";
import { frogQuiz } from "./frog";
import { rabbitQuiz } from "./rabbit";
import { rohuQuiz } from "./rohu";

export const quizByAnimal: Record<string, QuizQuestion[]> = {
  cockroach: cockroachQuiz,
  frog: frogQuiz,
  rabbit: rabbitQuiz,
  rohu: rohuQuiz,
};

export function getQuizQuestions(animalSlug: string): QuizQuestion[] {
  return quizByAnimal[animalSlug] ?? [];
}
