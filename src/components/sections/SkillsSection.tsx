"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Layers, Server, Smartphone } from "lucide-react";
import { ModuleTitle } from "@/components/ui/ModuleTitle";
import { skillGroups, techBadges } from "@/content/skills";

const iconMap = {
  mobile: Smartphone,
  server: Server,
  layers: Layers,
  code: Code2,
};

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 px-5 sm:px-8 lg:px-12 bg-bg-1 overflow-hidden"
    >
      {/* Code background from docs/design/background/codingbackground.svg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/backgrounds/codingbackground.svg')",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Decorative </> mark from Skills.png */}
        <motion.div
          aria-hidden="true"
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute right-4 top-2 font-mono text-7xl lg:text-8xl font-bold text-brand-1/90 select-none"
        >
          &lt;/&gt;
        </motion.div>

        <ModuleTitle
          title="Skills"
          subtitle="I am striving to never stop learning and improving"
        />

        {/* Two Brand 2 Capability Cards matching Skills.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto mb-14">
          {skillGroups.map((group, idx) => {
            const Icon = iconMap[group.iconName];
            return (
              <motion.div
                key={group.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className="bg-brand-2 text-bg-2 rounded-xl border-l-8 border-brand-1 p-6 shadow-lg transition-shadow duration-300 hover:shadow-[0_14px_30px_rgba(18,247,214,0.18)]"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <Icon className="w-7 h-7 mb-2 text-bg-2" aria-hidden="true" />
                  <h3 className="font-mono text-xl font-medium">
                    {group.title}
                  </h3>
                  <p className="font-mono text-xs text-bg-2/80 mt-1">
                    {group.subtitle}
                  </p>
                </div>

                <ul className="space-y-1.5 font-mono text-xs sm:text-sm text-bg-2/90 border-t border-bg-2/15 pt-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-bg-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Circular Tech Badges matching Skills.png */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {techBadges.map((badge, idx) => (
            <motion.div
              key={badge.name}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={shouldReduceMotion ? undefined : { y: -6 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(255,255,255,0.22)]"
                style={{ borderColor: badge.color }}
              >
                {badge.iconSrc ? (
                  <Image
                    src={badge.iconSrc}
                    alt={`${badge.name} icon`}
                    width={44}
                    height={44}
                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                  />
                ) : (
                  <span className="font-mono text-xs sm:text-sm font-semibold text-white tracking-wide px-2 text-center">
                    {badge.name}
                  </span>
                )}
              </div>
              <span
                className="font-mono text-sm sm:text-base font-medium"
                style={{ color: badge.color }}
              >
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

