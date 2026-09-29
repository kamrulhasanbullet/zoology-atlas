import type { ProgressRecord, QuizAttempt } from "@/types/zoology";

const PROGRESS_KEY = "zoology-atlas-progress-v1";
const QUIZ_ATTEMPTS_KEY = "zoology-atlas-quiz-attempts-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

/* -----------------------------
   Progress Records
------------------------------ */

export function getProgressRecords(): ProgressRecord[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);

    if (!stored) return [];

    return JSON.parse(stored) as ProgressRecord[];
  } catch {
    return [];
  }
}

function saveProgressRecords(records: ProgressRecord[]) {
  if (!isBrowser()) return;

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(records));
}

export function getAnimalProgress(animalSlug: string): ProgressRecord | null {
  const records = getProgressRecords();

  return records.find((record) => record.animalSlug === animalSlug) ?? null;
}

export function updateAnimalProgress(
  animalSlug: string,
  updates: Partial<Omit<ProgressRecord, "animalSlug">>,
) {
  const records = getProgressRecords();

  const existingIndex = records.findIndex(
    (record) => record.animalSlug === animalSlug,
  );

  const existing: ProgressRecord =
    existingIndex >= 0
      ? records[existingIndex]
      : {
          animalSlug,
          studied: false,
          anatomyExplored: false,
          studyCompleted: false,
        };

  const updated: ProgressRecord = {
    ...existing,
    ...updates,
    lastStudiedAt:
      updates.lastStudiedAt ??
      existing.lastStudiedAt ??
      new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    records[existingIndex] = updated;
  } else {
    records.push(updated);
  }

  saveProgressRecords(records);

  return updated;
}

export function markAnimalStudied(animalSlug: string) {
  return updateAnimalProgress(animalSlug, {
    studied: true,
    lastStudiedAt: new Date().toISOString(),
  });
}

export function markAnatomyExplored(animalSlug: string) {
  return updateAnimalProgress(animalSlug, {
    anatomyExplored: true,
    lastStudiedAt: new Date().toISOString(),
  });
}

export function markStudyCompleted(animalSlug: string) {
  return updateAnimalProgress(animalSlug, {
    studied: true,
    studyCompleted: true,
    lastStudiedAt: new Date().toISOString(),
  });
}

/* -----------------------------
   Quiz Attempts
------------------------------ */

export function getQuizAttempts(): QuizAttempt[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(QUIZ_ATTEMPTS_KEY);

    if (!stored) return [];

    return JSON.parse(stored) as QuizAttempt[];
  } catch {
    return [];
  }
}

function saveQuizAttempts(attempts: QuizAttempt[]) {
  if (!isBrowser()) return;

  localStorage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function saveQuizAttempt(
  attempt: Omit<QuizAttempt, "id" | "attemptedAt">,
) {
  const attempts = getQuizAttempts();

  const newAttempt: QuizAttempt = {
    ...attempt,
    id: crypto.randomUUID(),
    attemptedAt: new Date().toISOString(),
  };

  attempts.push(newAttempt);

  saveQuizAttempts(attempts);

  return newAttempt;
}

export function getAnimalQuizAttempts(animalSlug: string) {
  return getQuizAttempts().filter(
    (attempt) => attempt.animalSlug === animalSlug,
  );
}

export function getBestQuizScore(animalSlug: string) {
  const attempts = getAnimalQuizAttempts(animalSlug);

  if (!attempts.length) return null;

  return Math.max(...attempts.map((attempt) => attempt.percentage));
}
