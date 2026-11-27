"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ModuleTitle } from "@/components/ui/ModuleTitle";
import { PhoneMockup } from "@/components/sections/PhoneMockup";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { projects } from "@/content/projects";

/** Scroll distance for each step (one screenshot), in svh. Higher = slower. */
const STEP_SVH = 80;

// Every screenshot is one scroll step; a project without screenshots still gets one.
const steps = projects.flatMap((p, projectIndex) =>
  Array.from({ length: Math.max(p.screenshots?.length ?? 0, 1) }, (_, shotIndex) => ({
    projectIndex,
    shotIndex,
  }))
);

export function WorksSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const [pinned, setPinned] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const { projectIndex: activeIndex, shotIndex } = steps[stepIndex];
  const project = projects[activeIndex];

  // Pin only when motion is allowed and the screen is tall enough
  useEffect(() => {
    const query = window.matchMedia("(min-height: 600px)");
    const update = () => setPinned(query.matches && !reduceMotion);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduceMotion]);

  const { scrollYProgress: enter } = useScroll({
    target: trackRef,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const spring = { stiffness: 120, damping: 28, restDelta: 0.0005 };
  const smoothEnter = useSpring(enter, spring);
  const smoothProgress = useSpring(scrollYProgress, spring);
  const focusOpacity = useTransform(smoothEnter, [0.4, 1], [0, 1]);

  const syncStep = useCallback((value: number) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    setStepIndex(next);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (pinned) syncStep(value);
  });

  // Correct state after a reload in the middle of the section
  useEffect(() => {
    if (!pinned) return;
    const id = requestAnimationFrame(() => syncStep(scrollYProgress.get()));
    return () => cancelAnimationFrame(id);
  }, [pinned, scrollYProgress, syncStep]);

  // While pinned, scroll is the single source of truth: tabs and arrows just scroll
  const goTo = (projectIdx: number) => {
    const index = (projectIdx + projects.length) % projects.length;
    const target = steps.findIndex((s) => s.projectIndex === index);
    const track = trackRef.current;

    if (!pinned || !track) {
      setStepIndex(target);
      return;
    }

    const top = track.getBoundingClientRect().top + window.scrollY;
    const distance = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((target + 0.5) / steps.length) * distance,
      behavior: "smooth",
    });
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (idx + (e.key === "ArrowRight" ? 1 : -1) + projects.length) % projects.length;
    tabRefs.current[next]?.focus({ preventScroll: true });
    goTo(next);
  };

  const codeHref = project.links.repo ?? project.links.github;
  const codeLabel = project.links.repo ? "View Code" : "GitHub Profile";

  const arrowClass =
    "w-10 h-10 rounded-full bg-bg-1 border border-grey text-white hover:border-brand-1 hover:text-brand-1 flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1";

  return (
    // No overflow-hidden here: it breaks position: sticky
    <section id="works" className="relative bg-bg-2 pt-20 md:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/worksbackground.svg')" }}
      />

      <div className="relative px-5">
        <ModuleTitle
          title="Works"
          subtitle="Selected software engineering projects and architectural case studies"
        />
      </div>

      {/* Tall track: gives the scroll distance */}
      <div
        ref={trackRef}
        className="relative"
        style={pinned ? { height: `${100 + steps.length * STEP_SVH}svh` } : undefined}
      >
        {/* Stage: stays on screen while scrolling through the track */}
        <div
          className={`flex flex-col items-center justify-center gap-4 px-5 sm:px-8 lg:px-12 ${
            pinned ? "sticky top-0 h-svh overflow-clip pt-16 pb-3" : "py-12"
          }`}
        >
          {/* Focus layer: darker edges + soft glow behind the phone */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: pinned ? focusOpacity : 1 }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(114,241,212,0.10)_0%,rgba(0,0,0,0.15)_35%,rgba(0,0,0,0.65)_100%)]"
          />

          <div
            role="tablist"
            aria-label="Featured projects"
            className="relative flex max-w-full gap-2 overflow-x-auto p-1 md:flex-wrap md:justify-center"
          >
            {projects.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.slug}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={`project-tab-${item.slug}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="project-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => goTo(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`relative shrink-0 font-mono text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 ${
                    isActive
                      ? "text-bg-2 border-brand-1 font-medium"
                      : "bg-bg-1/80 text-white/80 border-grey hover:border-brand-1 hover:text-brand-1"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={reduceMotion ? undefined : "works-active-tab"}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-brand-1"
                    />
                  )}
                  <span className="relative z-10">{item.title}</span>
                </button>
              );
            })}
          </div>

          <div
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${project.slug}`}
            className="relative w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10"
          >
            {/* Phone: first on mobile, center on desktop */}
            <div className="flex justify-center lg:order-2 lg:min-w-[320px]">
              <PhoneMockup
                title={project.title}
                screenshots={project.screenshots}
                shotIndex={shotIndex}
                projectIndex={activeIndex}
                enter={smoothEnter}
                progress={smoothProgress}
                total={steps.length}
                reduceMotion={!pinned}
              />
            </div>

            {/* Architecture card: large screens (always shown when not pinned) */}
            <div
              className={`order-3 lg:order-1 bg-bg-1/90 border-2 border-grey rounded-2xl p-5 shadow-xl lg:min-h-[380px] ${
                pinned ? "hidden lg:block" : "md:col-span-2 lg:col-span-1"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E54F26]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E7A020]" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-1" />
                <span className="font-mono text-xs text-white/50 ml-2">architecture.md</span>
              </div>

              <div key={project.slug}>
                <p className="font-mono text-xs text-brand-2 mb-3">
                  {"//"} {project.role}
                </p>
                <ul className="space-y-2.5 font-mono text-xs text-white/85">
                  {project.engineering.map((point, idx) => (
                    <motion.li
                      key={point}
                      initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.12 }}
                      className="leading-relaxed"
                    >
                      <span className="text-brand-1 mr-1.5">&gt;</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-grey/60">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] bg-bg-2 text-brand-2 px-2.5 py-1 rounded border border-grey/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="order-2 lg:order-3 text-center md:text-left md:min-h-[300px] flex flex-col justify-center">
              <motion.div
                key={project.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="space-y-2 md:space-y-3"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-brand-1">
                  Case Study {String(activeIndex + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl md:text-3xl text-white">{project.title}</h3>
                <p className="font-mono text-xs md:text-sm text-brand-2">{project.subtitle}</p>
                <p className="hidden md:block text-sm text-white/80 leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-1 text-bg-2 font-mono text-xs sm:text-sm font-medium px-5 py-2.5 hover:bg-brand-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  {codeHref && (
                    <a
                      href={codeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-white/80 hover:text-brand-1 underline underline-offset-4"
                    >
                      <GitHubIcon className="w-4 h-4 text-brand-1" />
                      {codeLabel}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative flex items-center gap-5 mt-12">
            <button type="button" aria-label="Previous project" onClick={() => goTo(activeIndex - 1)} className={arrowClass}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-white/60">
              {activeIndex + 1} / {projects.length}
            </span>
            <button type="button" aria-label="Next project" onClick={() => goTo(activeIndex + 1)} className={arrowClass}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
