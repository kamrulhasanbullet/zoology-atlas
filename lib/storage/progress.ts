"use client";

import type { ProgressRecord, QuizAttempt } from "@/types/zoology";

const PROGRESS_KEY = "zoology-atlas-progress-v1";

const QUIZ_ATTEMPTS_KEY = "zoology-atlas-quiz-attempts-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function readProgress(): ProgressRecord[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(PROGRESS_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProgress(records: ProgressRecord[]) {
  if (!isBrowser()) return;

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(records));
}

function readQuizAttempts(): QuizAttempt[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(QUIZ_ATTEMPTS_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeQuizAttempts(attempts: QuizAttempt[]) {
  if (!isBrowser()) return;

  localStorage.setItem(QUIZ_ATTEMPTS_KEY, JSON.stringify(attempts));
}

function generateId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/* --------------------------------
   Animal Progress
-------------------------------- */

export function getProgressRecords(): ProgressRecord[] {
  return readProgress();
}

export function getAnimalProgress(
  animalSlug: string,
): ProgressRecord | undefined {
  return readProgress().find((record) => record.animalSlug === animalSlug);
}

export function markAnimalStudied(animalSlug: string) {
  const records = readProgress();
  const existingIndex = records.findIndex(
    (record) => record.animalSlug === animalSlug,
  );

  const now = new Date().toISOString();

  if (existingIndex === -1) {
    records.push({
      animalSlug,
      studied: true,
      studyCompleted: false,
      firstStudiedAt: now,
      lastStudiedAt: now,
    });
  } else {
    records[existingIndex] = {
      ...records[existingIndex],
      studied: true,
      lastStudiedAt: now,
    };
  }

  writeProgress(records);
}

export function markStudyCompleted(animalSlug: string) {
  const records = readProgress();
  const existingIndex = records.findIndex(
    (record) => record.animalSlug === animalSlug,
  );

  const now = new Date().toISOString();

  if (existingIndex === -1) {
    records.push({
      animalSlug,
      studied: true,
      studyCompleted: true,
      firstStudiedAt: now,
      lastStudiedAt: now,
    });
  } else {
    records[existingIndex] = {
      ...records[existingIndex],
      studied: true,
      studyCompleted: true,
      lastStudiedAt: now,
    };
  }

  writeProgress(records);
}

/* --------------------------------
   Quiz Attempts
-------------------------------- */

export function getQuizAttempts(): QuizAttempt[] {
  return readQuizAttempts();
}

export function saveQuizAttempt(
  attempt: Omit<QuizAttempt, "id" | "attemptedAt">,
) {
  const attempts = readQuizAttempts();

  const newAttempt: QuizAttempt = {
    ...attempt,
    id: generateId(),
    attemptedAt: new Date().toISOString(),
  };

  writeQuizAttempts([newAttempt, ...attempts]);

  return newAttempt;
}

/* --------------------------------
   Quiz Statistics
-------------------------------- */

export function getQuizStats() {
  const attempts = readQuizAttempts();

  if (attempts.length === 0) {
    return {
      attempts: 0,
      bestScore: 0,
      averageScore: 0,
    };
  }

  const bestScore = Math.max(...attempts.map((attempt) => attempt.percentage));

  const totalPercentage = attempts.reduce(
    (total, attempt) => total + attempt.percentage,
    0,
  );

  const averageScore = totalPercentage / attempts.length;

  return {
    attempts: attempts.length,
    bestScore,
    averageScore,
  };
}

/* --------------------------------
   Reset
-------------------------------- */

export function clearProgress() {
  if (!isBrowser()) return;

  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(QUIZ_ATTEMPTS_KEY);
}
