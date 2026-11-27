"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { animate, motion, useReducedMotion } from "motion/react";
import { Briefcase, Download, Mail, MapPin } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";

function subscribeToIntro(callback: () => void) {
  window.addEventListener("portfolio:intro-complete", callback);
  return () =>
    window.removeEventListener("portfolio:intro-complete", callback);
}

function getIntroReadySnapshot() {
  return document.documentElement.dataset.intro !== "playing";
}

function getIntroReadyServerSnapshot() {
  return true;
}

function StatCounter({
  value,
  active,
  reducedMotion,
}: {
  value: string;
  active: boolean;
  reducedMotion: boolean | null;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const hasNumber = Boolean(match);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active || reducedMotion || !hasNumber) {
      return;
    }

    const controls = animate(0, target, {
      duration: 1.05,
      delay: 0.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [active, reducedMotion, target, hasNumber]);

  const shown = !active || reducedMotion ? target : display;

  return (
    <>
      {shown}
      {suffix}
    </>
  );
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const introReady = useSyncExternalStore(
    subscribeToIntro,
    getIntroReadySnapshot,
    getIntroReadyServerSnapshot
  );
  const ready = Boolean(shouldReduceMotion) || introReady;

  const step = (delay: number, from?: { x?: number; y?: number }) => {
    if (shouldReduceMotion) return {};
    return {
      initial: { opacity: 0, x: from?.x ?? 0, y: from?.y ?? 16 },
      animate: ready
        ? { opacity: 1, x: 0, y: 0 }
        : { opacity: 0, x: from?.x ?? 0, y: from?.y ?? 16 },
      transition: { duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] as const },
    };
  };

  return (
    <section
      id="hero"
      className="relative py-12 md:py-16 lg:py-20 px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          {...step(0.05, { y: 18 })}
          className="text-center text-5xl sm:text-7xl lg:text-[108px] lg:leading-[120px] font-normal text-brand-2/90 mb-10 lg:mb-14 select-none"
        >
          Developer
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-[341px_1fr_270px] gap-10 xl:gap-12 items-center">
          {/* Left Profile Card — slides in from left */}
          <motion.div
            {...step(0.18, { x: -32, y: 0 })}
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            className="mx-auto w-full max-w-[341px] bg-bg-1 border-2 border-white/90 rounded-tl-[120px] rounded-br-[120px] rounded-tr-2xl rounded-bl-2xl px-6 pt-6 pb-9 shadow-[-4px_-4px_0_0_#12F7D6] transition-shadow duration-300 hover:shadow-[-6px_-6px_0_0_#12F7D6,0_16px_36px_rgba(0,0,0,0.35)]"
          >
            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-24 h-24 rounded-full border-2 border-brand-1 bg-bg-2 overflow-hidden flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(18,247,214,0.2)]">
                <Image
                  src="/images/backgrounds/avatar.jpg"
                  alt={profile.name}
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-mono text-2xl font-medium text-white">
                {profile.shortName}
              </h2>
              <p className="font-mono text-xs text-white/80 mt-1">
                {profile.title}
              </p>
            </div>

            <ul className="space-y-2.5 text-xs font-mono text-white/85 mb-5">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-1 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-brand-1 transition-colors truncate"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-1 shrink-0" aria-hidden="true" />
                <span>{profile.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-brand-1 shrink-0" aria-hidden="true" />
                <span>{profile.availability}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <GitHubIcon className="w-4 h-4 text-brand-1 shrink-0" />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-1 transition-colors truncate"
                >
                  github.com/Aboody241
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap gap-1.5 justify-center mb-6">
              {profile.heroPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-brand-1 text-bg-2 font-mono text-[11px] font-medium px-2.5 py-1"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                variant="white"
                href={profile.cvPath}
                download="Abdullah_Essam_CV.pdf"
                className="text-base px-7 py-2.5"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>

          {/* Center Hero Copy — line-by-line h1, paragraph, CTA */}
          <div className="space-y-6">
            <div>
              <motion.span
                {...step(0.12)}
                className="font-mono text-sm text-brand-2 block mb-1"
              >
                &lt;h1&gt;
              </motion.span>
              <h1 className="text-4xl sm:text-5xl xl:text-[64px] xl:leading-[72px] font-normal text-white">
                <motion.span {...step(0.16)} className="block">
                  Hey
                </motion.span>
                <motion.span {...step(0.24)} className="block">
                  I&apos;m{" "}
                  <span className="text-brand-1">{profile.shortName}</span>,
                </motion.span>
                <motion.span {...step(0.32)} className="block">
                  Software Engineer
                  <span className="font-mono text-sm text-brand-2 ml-2 align-baseline">
                    &lt;/h1&gt;
                  </span>
                </motion.span>
              </h1>
            </div>

            <motion.div {...step(0.4)} className="max-w-xl">
              <span className="font-mono text-sm text-brand-2 block mb-2">
                &lt;p&gt;
              </span>
              <p className="font-mono text-sm sm:text-base text-white/85 leading-relaxed pl-3">
                {profile.heroIntro}
              </p>
              <span className="font-mono text-sm text-brand-2 block mt-2">
                &lt;/p&gt;
              </span>
            </motion.div>

            <motion.div {...step(0.48)} className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 font-mono text-xl sm:text-2xl text-brand-1 hover:text-brand-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-1 rounded"
              >
                <span>Let&apos;s Talk</span>
                <span className="w-10 h-10 rounded-full bg-grey/70 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand-1" aria-hidden="true" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Stats Pill — slides in from right & counts up */}
          <motion.div
            {...step(0.22, { x: 32, y: 0 })}
            className="mx-auto w-full max-w-[270px] lg:max-w-none bg-bg-2 rounded-[64px] px-6 py-10 flex flex-col gap-8 border border-grey/50 shadow-xl"
          >
            {profile.heroStats.map((stat) => (
              <div
                key={stat.label}
                className="grid grid-cols-[92px_1fr] items-center gap-3"
              >
                <span className="font-mono text-3xl xl:text-4xl font-medium text-brand-1">
                  <StatCounter
                    value={stat.value}
                    active={ready}
                    reducedMotion={shouldReduceMotion}
                  />
                </span>
                <span className="font-mono text-xs sm:text-sm text-white/85 leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
