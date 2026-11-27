"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ModuleTitleProps {
  title: string;
  subtitle: string;
  id?: string;
}

export function ModuleTitle({ title, subtitle, id }: ModuleTitleProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col items-center text-center mb-12 md:mb-16"
    >
      {/* Scroll / mouse indicator from Component.png */}
      <div className="flex flex-col items-center mb-6" aria-hidden="true">
        <div className="w-6 h-10 rounded-full border-2 border-brand-1 flex items-start justify-center p-1.5 shadow-[0_0_12px_rgba(18,247,214,0.25)]">
          <motion.span
            animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 rounded-full bg-brand-1"
          />
        </div>
        <div className="h-10 border-l border-dashed border-white/60 mt-1" />
        <span className="w-2 h-2 rotate-45 bg-white" />
      </div>

      <h2 className="text-4xl md:text-[64px] md:leading-[72px] font-normal text-brand-1">
        {title}
      </h2>

      {/* Flanking line with endpoint dots */}
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0.5, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-0 mt-2 mb-4"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-brand-1" />
        <span className="w-36 md:w-44 h-[2px] bg-brand-1" />
        <span className="w-2 h-2 rounded-full bg-brand-1" />
      </motion.div>

      <p className="font-mono text-sm md:text-base text-white/80 max-w-xl">
        {subtitle}
      </p>
    </motion.div>
  );
}
