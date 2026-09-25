"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";

import type { Animal } from "@/types/zoology";
import { getVivaQuestions } from "@/data/viva";

interface VivaModeProps {
  animal: Animal;
}

export default function VivaMode({ animal }: VivaModeProps) {
  const questions = useMemo(
    () => getVivaQuestions(animal.slug).filter((question) => question.verified),
    [animal.slug],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [showAnswer, setShowAnswer] = useState(false);

  const [completed, setCompleted] = useState(0);

  if (questions.length === 0) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
        <CircleAlert className="mx-auto h-8 w-8 text-amber-400" />

        <h2 className="mt-4 text-xl font-semibold text-white">
          Viva unavailable
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
          Verified viva questions for {animal.commonName} have not been added
          yet.
        </p>
      </section>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    setCompleted((current) => Math.max(current, currentIndex + 1));

    setShowAnswer(false);

    if (currentIndex === questions.length - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex((current) => current + 1);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setCompleted(0);
  };

  const progress = (completed / questions.length) * 100;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Viva Mode
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white">
            {animal.commonName}
          </h2>
        </div>

        <span className="text-xs text-zinc-600">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#071014] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-wider text-zinc-600">
          Question
        </p>

        <h3 className="mt-3 text-xl font-semibold leading-8 text-white">
          {currentQuestion.question}
        </h3>

        {currentQuestion.hint && (
          <p className="mt-4 text-sm text-zinc-600">
            Hint: {currentQuestion.hint}
          </p>
        )}
      </div>

      {showAnswer && (
        <div className="mt-5 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />

            <div>
              <p className="text-sm font-semibold text-emerald-300">Answer</p>

              <p className="mt-2 text-sm leading-7 text-zinc-400">
                {currentQuestion.answer}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowAnswer((current) => !current)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.07] hover:text-white"
        >
          {showAnswer ? (
            <>
              <EyeOff className="h-4 w-4" />
              Hide Answer
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Show Answer
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
        >
          Next Question
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </section>
  );
}
