"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const links = [
  {
    name: "Animals",
    href: "/animals",
  },
  {
    name: "Taxonomy",
    href: "/taxonomy",
  },
  {
    name: "Anatomy",
    href: "/anatomy",
  },
  {
    name: "Compare",
    href: "/comparison",
  },
  {
    name: "Evolution",
    href: "/evolution",
  },
  {
    name: "Quiz",
    href: "/quiz",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07100d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 font-black text-black">
            Z
          </div>

          <div className="leading-none">
            <p className="text-sm font-bold tracking-wide text-white">
              ZOOLOGY
            </p>

            <p className="mt-1 text-[10px] tracking-[0.25em] text-emerald-400">
              ATLAS
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="hidden rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white sm:block"
          >
            <Search size={18} />
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className="rounded-lg border border-white/10 p-2 text-zinc-300 transition hover:border-emerald-400/30 hover:text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/10 bg-[#07100d] px-4 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
