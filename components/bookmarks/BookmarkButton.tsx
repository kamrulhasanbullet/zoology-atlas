"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

import { isBookmarked, toggleBookmark } from "@/lib/storage/bookmarks";

interface BookmarkButtonProps {
  id: string;
  type: "question" | "study" | "anatomy";
  animalSlug: string;
  title: string;
  description?: string;
  referenceId?: string;
}

export default function BookmarkButton({
  id,
  type,
  animalSlug,
  title,
  description,
  referenceId,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(id));
  }, [id]);

  function handleToggle() {
    const result = toggleBookmark({
      id,
      type,
      animalSlug,
      title,
      description,
      referenceId,
    });

    setBookmarked(result);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
    >
      {bookmarked ? (
        <BookmarkCheck size={17} className="text-cyan-400" />
      ) : (
        <Bookmark size={17} />
      )}

      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
