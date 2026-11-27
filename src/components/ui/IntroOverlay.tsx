"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";

const STORAGE_KEY = "portfolio_intro_seen";
const FULL_NAME = `<${profile.brandHandle} />`;
const STATUS_STEPS = ["initializing", "compiling", "ready"] as const;

export function IntroOverlay() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "playing" | "docking" | "done">(
    "idle"
  );
  const [typedCount, setTypedCount] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [dockDelta, setDockDelta] = useState({ x: 0, y: 0, scale: 0.55 });
  const brandRef = useRef<HTMLDivElement>(null);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore storage errors in restricted contexts
    }
    delete document.documentElement.dataset.intro;
    setPhase("done");
    window.dispatchEvent(new CustomEvent("portfolio:intro-complete"));
  }, []);

  useEffect(() => {
    const isPlaying = document.documentElement.dataset.intro === "playing";
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!isPlaying || shouldReduceMotion) {
      timers.push(
        setTimeout(() => {
          if (isPlaying) {
            finishIntro();
          } else {
            setPhase("done");
          }
        }, 0)
      );
      return () => timers.forEach(clearTimeout);
    }

    timers.push(setTimeout(() => setPhase("playing"), 0));

    // Typewriter effect: ~0.45s to ~1.55s
    const startDelay = 420;
    const charInterval = 68;

    for (let i = 1; i <= FULL_NAME.length; i++) {
      timers.push(
        setTimeout(() => {
          setTypedCount(i);
        }, startDelay + i * charInterval)
      );
    }

    // Status progression: initializing -> compiling -> ready
    timers.push(setTimeout(() => setStatusIndex(1), 720));
    timers.push(setTimeout(() => setStatusIndex(2), 1650));

    // Measure navbar target and dock smoothly (~1.85s)
    timers.push(
      setTimeout(() => {
        const navBrand = document.querySelector("header a");
        if (brandRef.current && navBrand) {
          const from = brandRef.current.getBoundingClientRect();
          const to = navBrand.getBoundingClientRect();
          setDockDelta({
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: 0.58,
          });
        } else {
          setDockDelta({ x: 0, y: -220, scale: 0.6 });
        }
        setPhase("docking");
      }, 1850)
    );

    // Complete & restore scroll (~2.45s)
    timers.push(setTimeout(finishIntro, 2450));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [finishIntro, shouldReduceMotion]);

  useEffect(() => {
    if (phase !== "playing" && phase !== "docking") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, finishIntro]);

  if (phase === "done") {
    return null;
  }

  return (
    <motion.div
      aria-label="Portfolio loading intro"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "docking" ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="intro-shell fixed inset-0 z-50 bg-bg-1 flex-col items-center justify-center px-6 select-none"
    >
      {/* Skip button */}
      <button
        type="button"
        onClick={finishIntro}
        className="fixed top-6 right-6 font-mono text-xs text-white/70 hover:text-brand-1 border border-grey hover:border-brand-1 rounded-full px-3.5 py-1.5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1"
      >
        Skip (Esc)
      </button>

      {/* Brand assembly that docks toward navbar */}
      <motion.div
        ref={brandRef}
        animate={
          phase === "docking"
            ? {
                x: dockDelta.x,
                y: dockDelta.y,
                scale: dockDelta.scale,
                opacity: 0,
              }
            : { x: 0, y: 0, scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5 max-w-full"
      >
        {/* Self-drawing </> SVG Logo */}
        <svg
          width="88"
          height="52"
          viewBox="0 0 88 52"
          fill="none"
          aria-hidden="true"
          className="text-brand-1"
        >
          <motion.path
            d="M26 10L8 26L26 42"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
          <motion.path
            d="M50 6L38 46"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          />
          <motion.path
            d="M62 10L80 26L62 42"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
          />
        </svg>

        {/* Typed Name + Blinking Cursor */}
        <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-medium text-white tracking-tight text-center min-h-[44px] flex items-center justify-center">
          <span>{FULL_NAME.slice(0, typedCount)}</span>
          <motion.span
            aria-hidden="true"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="inline-block w-[2px] h-7 sm:h-8 bg-brand-1 ml-1"
          />
        </div>
      </motion.div>

      {/* Progress line & status */}
      <motion.div
        animate={{ opacity: phase === "docking" ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="w-56 sm:w-64 mt-7 space-y-2.5"
      >
        <div className="h-[2px] w-full bg-grey rounded-full overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-full w-full bg-brand-1"
          />
        </div>
        <p className="font-mono text-xs text-brand-2 text-center tracking-wider">
          {STATUS_STEPS[statusIndex]}...
        </p>
      </motion.div>
    </motion.div>
  );
}
