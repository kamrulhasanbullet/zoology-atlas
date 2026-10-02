"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Brain,
  ChevronRight,
  Clock3,
  FileQuestion,
  Trash2,
} from "lucide-react";

import type { BookmarkItem, BookmarkType } from "@/types/zoology";
import { getBookmarks, removeBookmark } from "@/lib/storage/bookmarks";
import { animals } from "@/data/animals";

type FilterType = "all" | BookmarkType;

const filters: {
  id: FilterType;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "anatomy-structure", label: "Anatomy" },
  { id: "study-section", label: "Study" },
  { id: "quiz-question", label: "Quiz" },
];

function getTypeIcon(type: BookmarkType) {
  switch (type) {
    case "anatomy-structure":
      return <Brain className="h-4 w-4" />;
    case "study-section":
      return <BookOpen className="h-4 w-4" />;
    case "quiz-question":
      return <FileQuestion className="h-4 w-4" />;
  }
}

function getTypeLabel(type: BookmarkType) {
  switch (type) {
    case "anatomy-structure":
      return "Anatomy";
    case "study-section":
      return "Study";
    case "quiz-question":
      return "Quiz";
  }
}

function getBookmarkHref(bookmark: BookmarkItem) {
  switch (bookmark.type) {
    case "anatomy-structure":
      return `/anatomy?animal=${bookmark.animalSlug}`;

    case "study-section":
      return `/animals/${bookmark.animalSlug}`;

    case "quiz-question":
      return `/quiz?animal=${bookmark.animalSlug}`;

    default:
      return "/bookmarks";
  }
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BookmarkPanel() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBookmarks(getBookmarks());
  }, []);

  const filteredBookmarks = useMemo(() => {
    if (filter === "all") {
      return bookmarks;
    }

    return bookmarks.filter((bookmark) => bookmark.type === filter);
  }, [bookmarks, filter]);

  const counts = useMemo(() => {
    return {
      all: bookmarks.length,
      anatomy: bookmarks.filter(
        (bookmark) => bookmark.type === "anatomy-structure",
      ).length,
      study: bookmarks.filter((bookmark) => bookmark.type === "study-section")
        .length,
      quiz: bookmarks.filter((bookmark) => bookmark.type === "quiz-question")
        .length,
    };
  }, [bookmarks]);

  function handleRemove(bookmark: BookmarkItem) {
    removeBookmark(bookmark.type, bookmark.referenceId);

    setBookmarks((current) =>
      current.filter(
        (item) =>
          !(
            item.type === bookmark.type &&
            item.referenceId === bookmark.referenceId
          ),
      ),
    );
  }

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-white/10" />
        <div className="mt-6 h-24 animate-pulse rounded-2xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Saved"
          value={counts.all}
          icon={<BookmarkCheck className="h-5 w-5" />}
        />

        <StatCard
          label="Anatomy"
          value={counts.anatomy}
          icon={<Brain className="h-5 w-5" />}
        />

        <StatCard
          label="Study"
          value={counts.study}
          icon={<BookOpen className="h-5 w-5" />}
        />

        <StatCard
          label="Quiz"
          value={counts.quiz}
          icon={<FileQuestion className="h-5 w-5" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = filter === item.id;

          const count =
            item.id === "all"
              ? counts.all
              : item.id === "anatomy-structure"
                ? counts.anatomy
                : item.id === "study-section"
                  ? counts.study
                  : counts.quiz;

          return (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {item.label}

              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBookmarks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
            <Bookmark className="h-7 w-7 text-cyan-300" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No bookmarks yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Save anatomy structures, study sections, and quiz questions while
            learning. They will appear here for quick access.
          </p>

          <Link
            href="/animals"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
          >
            Explore Animals
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookmarks.map((bookmark) => {
            const animal = animals.find(
              (item) => item.slug === bookmark.animalSlug,
            );

            return (
              <BookmarkCard
                key={`${bookmark.type}-${bookmark.referenceId}`}
                bookmark={bookmark}
                animalName={animal?.commonName ?? bookmark.animalSlug}
                onRemove={() => handleRemove(bookmark)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
          {icon}
        </div>

        <span className="text-2xl font-bold text-white">{value}</span>
      </div>

      <p className="mt-4 text-sm text-zinc-500">{label}</p>
    </div>
  );
}

function BookmarkCard({
  bookmark,
  animalName,
  onRemove,
}: {
  bookmark: BookmarkItem;
  animalName: string;
  onRemove: () => void;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/20 hover:bg-white/[0.045]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          {/* Type + Animal */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
              {getTypeIcon(bookmark.type)}
              {getTypeLabel(bookmark.type)}
            </span>

            <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-zinc-500">
              {animalName}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-4 text-base font-semibold text-white">
            {bookmark.title}
          </h3>

          {/* Description */}
          {bookmark.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              {bookmark.description}
            </p>
          )}

          {/* Date */}
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-600">
            <Clock3 className="h-3.5 w-3.5" />
            Saved {formatDate(bookmark.createdAt)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={getBookmarkHref(bookmark)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
          >
            Open
            <ChevronRight className="h-4 w-4" />
          </Link>

          <button
            onClick={onRemove}
            aria-label={`Remove ${bookmark.title} bookmark`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/5 text-red-300 transition hover:bg-red-400/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
