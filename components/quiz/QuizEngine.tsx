"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, RotateCcw, XCircle } from "lucide-react";

import type { Animal } from "@/types/zoology";
import { getQuizQuestions } from "@/data/quiz";

interface QuizEngineProps {
  animal: Animal;
}

export default function QuizEngine({ animal }: QuizEngineProps) {
  const questions = useMemo(
    () => getQuizQuestions(animal.slug).filter((question) => question.verified),
    [animal.slug],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <CircleAlert className="mx-auto h-8 w-8 text-amber-400" />

        <h2 className="mt-4 text-xl font-semibold text-white">
          Quiz unavailable
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Verified quiz questions for {animal.commonName} have not been added
          yet.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const progress = ((currentIndex + 1) / questions.length) * 100;

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelect = (answerId: string) => {
    if (submitted) return;

    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || submitted) return;

    setSubmitted(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((current) => current + 1);
    }
  };

  const handleNext = () => {
    if (!submitted) return;

    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((current) => current + 1);

    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Quiz Complete
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          {animal.commonName}
        </h2>

        <div className="mt-8">
          <p className="text-5xl font-black text-white">
            {score}
            <span className="text-2xl text-zinc-600">/{questions.length}</span>
          </p>

          <p className="mt-2 text-sm text-zinc-500">Correct answers</p>
        </div>

        <button
          type="button"
          onClick={handleRetry}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
        >
          <RotateCcw className="h-4 w-4" />
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      {/* Top */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-400">
            {animal.commonName} Quiz
          </p>

          <p className="mt-1 text-sm text-zinc-600">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-500">
          Score: {score}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold leading-8 text-white sm:text-2xl">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Options */}
      <div className="mt-7 space-y-3">
        {currentQuestion.options.map((option) => {
          const selected = selectedAnswer === option.id;

          const correct =
            submitted && option.id === currentQuestion.correctAnswer;

          const wrong =
            submitted &&
            selected &&
            option.id !== currentQuestion.correctAnswer;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              disabled={submitted}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                correct
                  ? "border-emerald-400/30 bg-emerald-400/10"
                  : wrong
                    ? "border-red-400/30 bg-red-400/10"
                    : selected
                      ? "border-cyan-400/40 bg-cyan-400/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  correct
                    ? "bg-emerald-400/20 text-emerald-300"
                    : wrong
                      ? "bg-red-400/20 text-red-300"
                      : selected
                        ? "bg-cyan-400/20 text-cyan-300"
                        : "bg-white/5 text-zinc-500"
                }`}
              >
                {option.id.toUpperCase()}
              </span>

              <span className="flex-1 text-sm leading-6 text-zinc-300">
                {option.text}
              </span>

              {correct && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              )}

              {wrong && <XCircle className="h-5 w-5 shrink-0 text-red-400" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {submitted && (
        <div
          className={`mt-6 rounded-2xl border p-5 ${
            isCorrect
              ? "border-emerald-400/20 bg-emerald-400/[0.05]"
              : "border-red-400/20 bg-red-400/[0.05]"
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            )}

            <div>
              <p
                className={`text-sm font-semibold ${
                  isCorrect ? "text-emerald-300" : "text-red-300"
                }`}
              >
                {isCorrect ? "Correct answer" : "Incorrect answer"}
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-7 flex justify-end">
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Check Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            {currentIndex === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
