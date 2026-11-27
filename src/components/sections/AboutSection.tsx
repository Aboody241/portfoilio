"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Layers } from "lucide-react";
import { ModuleTitle } from "@/components/ui/ModuleTitle";
import { education } from "@/content/experience";

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 px-5 sm:px-8 lg:px-12 bg-bg-2 overflow-hidden"
    >
      {/* Topographic background from docs/design/background/background.svg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/backgrounds/background.svg')" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <ModuleTitle
          title="About Me"
          subtitle="Engineering fundamentals, practical application delivery, and continuous growth"
        />

        <div className="mb-6">
          <div className="inline-block border-2 border-brand-1 bg-bg-1 rounded-tl-3xl rounded-br-3xl px-7 py-3">
            <h3 className="text-2xl sm:text-3xl font-normal text-white">
              Who I Am
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.95fr] gap-8 items-stretch">
          {/* Code-style bio card matching Interaction.png */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="flex"
          >
            <div className="w-full bg-bg-1/95 border border-grey/80 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between">
              <span className="font-mono text-xs text-brand-2 block mb-3">
                &lt;p&gt;
              </span>
              <div className="space-y-4 font-mono text-sm sm:text-base text-white/90 leading-relaxed pl-2">
                <p className="text-xl sm:text-2xl text-brand-1 font-medium">
                  Hello!
                </p>
                <p>
                  My name is Abdullah Essam and I am a{" "}
                  <span className="text-brand-1">General Software Engineer</span>{" "}
                  focused on mobile application development, backend integration,
                  and clean software architecture.
                </p>
                <p>
                  I build production-oriented applications with{" "}
                  <span className="text-brand-1">Flutter</span>,{" "}
                  <span className="text-brand-1">Laravel</span>,{" "}
                  <span className="text-brand-1">Swift</span>, and{" "}
                  <span className="text-brand-1">Python</span>—translating
                  real-world problems into modular, maintainable systems.
                </p>
                <p>
                  Through collaborative GitHub workflows and cross-functional
                  teamwork, I focus on writing clear code, designing solid
                  boundaries, and learning across technologies when the problem
                  requires them.
                </p>
              </div>
              <span className="font-mono text-xs text-brand-2 block mt-3">
                &lt;/p&gt;
              </span>
            </div>
          </motion.div>

          {/* Right Education & Engineering Focus Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col justify-between gap-5"
          >
            <div className="bg-bg-1/95 border border-grey/80 rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-3 text-brand-1">
                <GraduationCap className="w-6 h-6" aria-hidden="true" />
                <h4 className="font-mono text-lg font-medium text-white">
                  Education
                </h4>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.institution}
                    className="border-l-2 border-brand-1 pl-4 space-y-1"
                  >
                    <p className="font-medium text-white">{edu.institution}</p>
                    <p className="font-mono text-xs sm:text-sm text-brand-2">
                      {edu.degree}
                    </p>
                    <p className="font-mono text-xs text-white/60">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-bg-1/95 border border-grey/80 rounded-3xl p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-3 text-brand-1">
                <Layers className="w-6 h-6" aria-hidden="true" />
                <h4 className="font-mono text-lg font-medium text-white">
                  Engineering Approach
                </h4>
              </div>
              <p className="font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
                Feature-First Clean Architecture, typed error handling,
                explicit API contracts, and pragmatic technology choices matched
                to project scale.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

