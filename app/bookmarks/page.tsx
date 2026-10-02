import BookmarkPanel from "@/components/bookmarks/BookmarkPanel";
import { BookmarkCheck } from "lucide-react";

export default function BookmarksPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/10 bg-gradient-to-b from-cyan-950/20 via-black to-black">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <BookmarkCheck className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                Your Learning Library
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Bookmarks
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Keep important anatomy structures, study sections, and quiz
                questions in one place for quick revision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BookmarkPanel />
      </section>
    </main>
  );
}
