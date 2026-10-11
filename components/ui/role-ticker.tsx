"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ROLES = [
  "Mobile Software Engineer",
  "Flutter & Dart Specialist",
  "Android Native Developer",
  "Offline-First Systems Builder",
  "Full-Stack TypeScript Engineer",
];

export function RoleTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base font-mono font-semibold text-[#C5F467] flex items-center gap-1.5"
        >
          <span className="text-[#9AA5B5] font-normal hidden xs:inline">Specialization:</span>
          <span>{ROLES[index]}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
