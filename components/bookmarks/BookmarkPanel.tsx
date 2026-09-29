"use client";

import { useEffect, useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";

import { getBookmarks, removeBookmark } from "@/lib/storage/bookmarks";

import type { BookmarkItem } from "@/types/zoology";

export default function BookmarkPanel() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  function loadBookmarks() {
    setBookmarks(getBookmarks());
  }

  useEffect(() => {
    loadBookmarks();
  }, []);

  function handleRemove(id: string) {
    removeBookmark(id);
    loadBookmarks();
  }

  if (!bookmarks.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <Bookmark className="mx-auto mb-4 text-white/30" size={36} />

        <h3 className="text-lg font-semibold">No bookmarks yet</h3>

        <p className="mt-2 text-sm text-white/50">
          Save important questions, study topics, or anatomy structures to
          access them later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <article
          key={bookmark.id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs capitalize text-cyan-300">
                  {bookmark.type}
                </span>

                <span className="text-xs text-white/40">
                  {bookmark.animalSlug}
                </span>
              </div>

              <h3 className="font-semibold text-white">{bookmark.title}</h3>

              {bookmark.description && (
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {bookmark.description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleRemove(bookmark.id)}
              className="rounded-lg p-2 text-white/40 transition hover:bg-red-400/10 hover:text-red-400"
              aria-label="Remove bookmark"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
