"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Award, Users } from "lucide-react";
import { ModuleTitle } from "@/components/ui/ModuleTitle";
import { achievements, experiences } from "@/content/experience";

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 px-5 sm:px-8 lg:px-12 bg-bg-1 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/backgrounds/codingbackground.svg')",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <ModuleTitle
          title="Experience"
          subtitle="Collaborative engineering work, community contributions, and technical recognition"
        />

        {/* Experience Entries */}
        <div className="space-y-6 mb-14">
          {experiences.map((exp) => (
            <motion.article
              key={exp.organization}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="bg-bg-2 border border-grey/80 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-1/15 text-brand-1 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-normal text-brand-1">
                      {exp.organization}
                    </h3>
                    <p className="font-mono text-sm text-white/90">
                      {exp.role}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs sm:text-sm text-brand-2 bg-bg-1 px-3 py-1 rounded-full self-start sm:self-auto border border-grey/60">
                  {exp.period}
                </span>
              </div>

              <p className="text-white/85 leading-relaxed mb-4">
                {exp.description}
              </p>

              <ul className="space-y-2 font-mono text-xs sm:text-sm text-white/80">
                {exp.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-brand-1 mt-0.5">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="border-t border-grey/70 pt-10">
          <div className="flex items-center gap-2.5 mb-6">
            <Award className="w-5 h-5 text-brand-1" aria-hidden="true" />
            <h3 className="font-mono text-lg sm:text-xl text-white">
              Competitions &amp; Achievements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                className="bg-bg-2/85 backdrop-blur-sm border border-grey/70 hover:border-brand-1/60 rounded-xl p-5 flex flex-col justify-between gap-2 transition-colors duration-200"
              >
                <div>
                  <h4 className="font-medium text-white text-base">
                    {item.title}
                  </h4>
                  <p className="font-mono text-xs sm:text-sm text-white/75 mt-1">
                    {item.detail}
                  </p>
                </div>
                {item.year && (
                  <span className="font-mono text-xs text-brand-1">
                    {item.year}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

