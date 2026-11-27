"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  User,
  Code2,
  Monitor,
  Award,
  Mail,
} from "lucide-react";

const railItems = [
  { id: "hero", label: "Home", icon: LayoutGrid },
  { id: "about", label: "About Me", icon: User },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "works", label: "Works", icon: Monitor },
  { id: "experience", label: "Experience", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export function NavRail() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.05 }
    );

    for (const item of railItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Section navigation"
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 bg-bg-2/95 border border-white/30 rounded-full px-2.5 py-3 shadow-lg backdrop-blur-sm"
    >
      {railItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            className={`group relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 ${
              isActive
                ? "bg-white text-bg-2"
                : "text-white/80 hover:text-brand-1 hover:bg-bg-1"
            }`}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span
              role="tooltip"
              className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 absolute left-12 whitespace-nowrap rounded-md bg-white text-bg-2 font-mono text-xs font-medium px-2.5 py-1 shadow-md"
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

