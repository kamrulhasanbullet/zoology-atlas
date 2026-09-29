import BookmarkPanel from "@/components/bookmarks/BookmarkPanel";

export default function BookmarksPage() {
  return (
    <main className="min-h-screen bg-[#05080d] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Learning Library
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Your Bookmarks
          </h1>

          <p className="mt-4 max-w-2xl text-white/55">
            Keep important study materials, questions, and anatomy references in
            one place.
          </p>
        </div>

        <BookmarkPanel />
      </div>
    </main>
  );
}
