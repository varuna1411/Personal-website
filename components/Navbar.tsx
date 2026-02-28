"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/travel", label: "Travel Portfolio" },
  { href: "https://aminmyhead.substack.com/", label: "Blog", external: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: vertical left sidebar */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-40 hidden w-52 flex-col border-r border-stone-700/50 bg-stone-950/95 backdrop-blur-md md:flex"
        aria-label="Main navigation"
      >
        <div className="flex flex-col gap-10 p-6 pt-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              className="h-10 w-10 shrink-0 rounded-full object-cover bg-stone-800"
              width={40}
              height={40}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="font-sans text-lg font-semibold tracking-tight text-stone-100 transition hover:text-amber-400/90">
              Varun Amin
            </span>
          </Link>
          <nav>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 font-sans text-sm font-medium text-stone-300 transition hover:text-stone-100"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 font-sans text-sm font-medium text-stone-300 transition hover:text-stone-100"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile: top bar with hamburger */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-700/50 bg-stone-950/80 backdrop-blur-md md:hidden">
        <nav className="flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-sans text-xl font-semibold tracking-tight text-stone-100 transition hover:text-amber-400/90"
          >
            Varun Amin
          </Link>
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-stone-100"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 bg-stone-100"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-stone-100"
            />
          </button>
        </nav>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-stone-700/50"
            >
              <ul className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 font-sans text-stone-300 hover:text-stone-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="block py-2 font-sans text-stone-300 hover:text-stone-100"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
