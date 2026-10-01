import { BarChart3, ArrowLeft } from "lucide-react";

import Link from "next/link";

import ProgressDashboard from "@/components/progress/ProgressDashboard";

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-[#050b09] text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-500 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400">
              <BarChart3 className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your Progress
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                Track your Zoology learning journey, study completion, and quiz
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <ProgressDashboard />
      </section>
    </main>
  );
}
