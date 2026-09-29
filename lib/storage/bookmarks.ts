import type { BookmarkItem, BookmarkType } from "@/types/zoology";

const BOOKMARKS_KEY = "zoology-atlas-bookmarks-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

function readBookmarks(): BookmarkItem[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeBookmarks(bookmarks: BookmarkItem[]) {
  if (!isBrowser()) return;

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
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

export function getBookmarks(): BookmarkItem[] {
  return readBookmarks();
}

export function isBookmarked(type: BookmarkType, referenceId: string): boolean {
  const bookmarks = readBookmarks();

  return bookmarks.some(
    (bookmark) =>
      bookmark.type === type && bookmark.referenceId === referenceId,
  );
}

export function addBookmark(bookmark: Omit<BookmarkItem, "id" | "createdAt">) {
  const bookmarks = readBookmarks();

  const alreadyExists = bookmarks.some(
    (item) =>
      item.type === bookmark.type && item.referenceId === bookmark.referenceId,
  );

  if (alreadyExists) return;

  const newBookmark: BookmarkItem = {
    ...bookmark,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  writeBookmarks([newBookmark, ...bookmarks]);
}

export function removeBookmark(type: BookmarkType, referenceId: string) {
  const bookmarks = readBookmarks();

  const filtered = bookmarks.filter(
    (bookmark) =>
      !(bookmark.type === type && bookmark.referenceId === referenceId),
  );

  writeBookmarks(filtered);
}

export function toggleBookmark(
  bookmark: Omit<BookmarkItem, "id" | "createdAt">,
): boolean {
  const bookmarked = isBookmarked(bookmark.type, bookmark.referenceId);

  if (bookmarked) {
    removeBookmark(bookmark.type, bookmark.referenceId);

    return false;
  }

  addBookmark(bookmark);

  return true;
}

export function getBookmarksByType(type: BookmarkType): BookmarkItem[] {
  return readBookmarks().filter((bookmark) => bookmark.type === type);
}
