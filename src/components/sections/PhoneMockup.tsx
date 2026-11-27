"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";

interface PhoneMockupProps {
  title: string;
  screenshots?: string[];
  shotIndex: number;
  projectIndex: number;
  /** 0 -> 1 while the section is entering the viewport */
  enter: MotionValue<number>;
  /** smoothed scroll progress through the pinned section (0 -> 1) */
  progress: MotionValue<number>;
  total: number;
  reduceMotion: boolean;
}

export function PhoneMockup({
  title,
  screenshots = [],
  shotIndex,
  projectIndex,
  enter,
  progress,
  total,
  reduceMotion,
}: PhoneMockupProps) {
  // Grows and straightens while entering
  const scale = useTransform(enter, [0, 1], [0.65, 1]);
  const rotateX = useTransform(enter, [0, 1], [30, 0]);
  const rotateZ = useTransform(enter, [0, 1], [-10, 0]);

  // Gentle turn that follows the scroll inside each project
  const sway = useTransform(progress, (p) => Math.sin(p * total * Math.PI * 2) * -10);

  // Bigger turn when the project changes (time based, so it always settles)
  const flip = useMotionValue(0);
  const previous = useRef(projectIndex);

  useEffect(() => {
    if (previous.current === projectIndex) return;
    const direction = projectIndex > previous.current ? 1 : -1;
    previous.current = projectIndex;

    if (reduceMotion) {
      flip.set(0);
      return;
    }

    flip.set(-85 * direction);
    const controls = animate(flip, 0, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [projectIndex, reduceMotion, flip]);

  const rotateY = useTransform(() => sway.get() + flip.get());
  const safeIndex = Math.min(shotIndex, Math.max(screenshots.length - 1, 0));

  return (
    <div className="flex flex-col items-center">
      <motion.div
        style={
          reduceMotion
            ? { scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 }
            : { scale, rotateX, rotateY, rotateZ, transformPerspective: 1100 }
        }
        className="relative h-[44svh] md:h-[min(62svh,580px)] aspect-[9/19.5] rounded-[46px] p-[2px] bg-gradient-to-b from-[#f2efe9] via-[#c9c5bd] to-[#e6e2da] shadow-[0_30px_70px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.12)] will-change-transform"
      >
        {/* Side hardware buttons */}
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-[19%] h-[4.2%] w-[3px] rounded-l-sm bg-gradient-to-b from-[#e8e5de] via-[#a8a49c] to-[#d8d4cc]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-[26.5%] h-[7%] w-[3px] rounded-l-sm bg-gradient-to-b from-[#e8e5de] via-[#a8a49c] to-[#d8d4cc]"
        />
        <div
          aria-hidden="true"
          className="absolute -left-[3px] top-[35.5%] h-[7%] w-[3px] rounded-l-sm bg-gradient-to-b from-[#e8e5de] via-[#a8a49c] to-[#d8d4cc]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[3px] top-[29%] h-[10.5%] w-[3px] rounded-r-sm bg-gradient-to-b from-[#e8e5de] via-[#a8a49c] to-[#d8d4cc]"
        />

        {/* Inner black bezel */}
        <div className="relative h-full w-full rounded-[44px] bg-[#0a0a0c] p-[6px] shadow-[inset_0_0_2px_rgba(255,255,255,0.15)]">
          {/* Dynamic Island */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[17px] z-10 flex h-[22px] w-[80px] -translate-x-1/2 items-center justify-start rounded-full bg-black px-2.5 shadow-[0_0_0_0.5px_rgba(255,255,255,0.06)]"
          >
            <span className="h-[8px] w-[8px] rounded-full bg-[#121629] ring-1 ring-[#1f2642]/70" />
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-bg-2">
            {screenshots.length > 0 ? (
              // All images stay stacked so they can cross-fade
              screenshots.map((src, idx) => (
                <Image
                  key={`${src}-${idx}`}
                  src={src}
                  alt={idx === safeIndex ? `${title} screenshot ${idx + 1}` : ""}
                  aria-hidden={idx !== safeIndex}
                  fill
                  sizes="(max-width: 768px) 230px, 300px"
                  className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                    idx === safeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                <div className="font-mono text-4xl font-bold text-brand-1">&lt;/&gt;</div>
                <p className="text-base font-medium leading-snug text-white">{title}</p>
                <p className="font-mono text-[11px] tracking-wide text-brand-2/80">
                  Preview coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {screenshots.length > 1 && (
        <div aria-hidden="true" className="mt-3 flex items-center gap-2">
          {screenshots.map((src, idx) => (
            <span
              key={`${src}-${idx}`}
              className={`h-2 rounded-full transition-all ${
                idx === safeIndex ? "w-5 bg-brand-1" : "w-2 bg-grey"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
