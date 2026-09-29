import type { BookmarkItem } from "@/types/zoology";

const BOOKMARKS_KEY = "zoology-atlas-bookmarks-v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getBookmarks(): BookmarkItem[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);

    if (!stored) return [];

    return JSON.parse(stored) as BookmarkItem[];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: BookmarkItem[]) {
  if (!isBrowser()) return;

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(id: string) {
  return getBookmarks().some((bookmark) => bookmark.id === id);
}

export function addBookmark(bookmark: Omit<BookmarkItem, "createdAt">) {
  const bookmarks = getBookmarks();

  const exists = bookmarks.some((item) => item.id === bookmark.id);

  if (exists) return;

  const newBookmark: BookmarkItem = {
    ...bookmark,
    createdAt: new Date().toISOString(),
  };

  saveBookmarks([newBookmark, ...bookmarks]);
}

export function removeBookmark(id: string) {
  const bookmarks = getBookmarks();

  saveBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
}

export function toggleBookmark(bookmark: Omit<BookmarkItem, "createdAt">) {
  if (isBookmarked(bookmark.id)) {
    removeBookmark(bookmark.id);

    return false;
  }

  addBookmark(bookmark);

  return true;
}

export function getBookmarksByAnimal(animalSlug: string) {
  return getBookmarks().filter(
    (bookmark) => bookmark.animalSlug === animalSlug,
  );
}
