"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { profile } from "@/content/profile";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Works", href: "/#works" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg-1/90 backdrop-blur-md border-b border-grey/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
        <Link
          href="/#hero"
          className="font-mono text-xl sm:text-2xl font-medium flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 rounded"
        >
          <span className="text-brand-1">&lt;C/&gt;</span>
          <span className="text-white">{profile.brandHandle}</span>
        </Link>

        {/* Desktop & Tablet Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-sm lg:text-base text-white/85 hover:text-brand-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 rounded px-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social Links + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-2 font-mono text-sm text-white/85 hover:text-brand-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 rounded px-1"
          >
            <GitHubIcon className="w-4 h-4 text-brand-1" />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            aria-label="Send email"
            className="inline-flex items-center gap-2 font-mono text-sm text-white/85 hover:text-brand-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 rounded px-1"
          >
            <Mail className="w-4 h-4 text-brand-1" aria-hidden="true" />
            <span className="hidden lg:inline">Email</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg border border-grey text-white hover:border-brand-1 hover:text-brand-1 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-bg-2 border-b border-grey px-5 py-4 flex flex-col gap-3"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-base text-white/90 hover:text-brand-1 py-1.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
