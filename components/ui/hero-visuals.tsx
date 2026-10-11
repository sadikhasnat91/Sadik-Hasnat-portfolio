"use client";

import React from "react";
import { motion } from "motion/react";
import { Smartphone, Database, ShieldCheck, Zap } from "lucide-react";

/**
 * Ambient background lighting orbs that give depth and vibrance
 */
export function HeroAmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Lime Accent Orb */}
      <div className="absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#C5F467]/10 blur-[130px] animate-pulse-glow" />
      {/* Cyan/Teal Secondary Orb */}
      <div className="absolute top-1/4 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#38BDF8]/8 blur-[140px] animate-pulse-glow [animation-delay:2s]" />
      {/* Bottom Center Subtle Depth */}
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-[#A855F7]/5 blur-[120px] animate-pulse-glow [animation-delay:3s]" />
    </div>
  );
}

/**
 * Floating badge component with levitation physics
 */
export function HeroFloatingBadges() {
  return (
    <>
      {/* Floating Badge 1: Flutter & Dart (Top Left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden sm:flex absolute -top-5 -left-6 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121720]/95 backdrop-blur-md border border-[#29313C] shadow-xl animate-float hover:border-[#C5F467]/60 transition-colors"
      >
        <div className="h-6 w-6 rounded-lg bg-[#C5F467]/10 border border-[#C5F467]/30 flex items-center justify-center text-[#C5F467]">
          <Smartphone className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#F5F7FA] leading-none">Flutter & Android</span>
          <span className="text-[9px] font-mono text-[#9AA5B5]">Mobile Native</span>
        </div>
      </motion.div>

      {/* Floating Badge 2: Offline SQLite (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden sm:flex absolute -bottom-5 -right-6 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121720]/95 backdrop-blur-md border border-[#29313C] shadow-xl animate-float-delayed hover:border-[#C5F467]/60 transition-colors"
      >
        <div className="h-6 w-6 rounded-lg bg-[#60A5FA]/10 border border-[#60A5FA]/30 flex items-center justify-center text-[#60A5FA]">
          <Database className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-[#F5F7FA] leading-none">Local SQLite Sync</span>
          <span className="text-[9px] font-mono text-[#9AA5B5]">Offline-First</span>
        </div>
      </motion.div>

      {/* Floating Badge 3: Verified Production Code (Top Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex absolute top-12 -right-8 z-20 items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#121720]/95 backdrop-blur-md border border-[#29313C] shadow-xl animate-float [animation-delay:1s] hover:border-[#C5F467]/60 transition-colors"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5F467] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5F467]" />
        </span>
        <span className="text-[10px] font-mono font-medium text-[#F5F7FA]">INTELLEEO Active</span>
      </motion.div>
    </>
  );
}

/**
 * Radar status badge
 */
export function RadarStatusBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-full border border-[#29313C] bg-[#121720]/90 backdrop-blur-sm px-3 sm:px-3.5 py-1.5 text-xs font-mono text-[#9AA5B5] shadow-sm hover:border-[#C5F467]/40 transition-colors ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5F467] opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5F467]" />
      </span>
      <span className="truncate max-w-[260px] sm:max-w-none">{text}</span>
    </div>
  );
}
