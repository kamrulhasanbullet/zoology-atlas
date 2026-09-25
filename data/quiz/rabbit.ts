import type { QuizQuestion } from "@/types/zoology";

export const rabbitQuiz: QuizQuestion[] = [
  {
    id: "rabbit-q1",
    animalSlug: "rabbit",
    type: "mcq",

    question: "Verified question content for Rabbit is not available yet.",

    options: [
      {
        id: "a",
        text: "Content pending verification",
      },
      {
        id: "b",
        text: "Content pending verification",
      },
      {
        id: "c",
        text: "Content pending verification",
      },
      {
        id: "d",
        text: "Content pending verification",
      },
    ],

    correctAnswer: "",

    explanation:
      "A scientifically verified explanation will be added before this question becomes active.",

    verified: false,
  },
];
