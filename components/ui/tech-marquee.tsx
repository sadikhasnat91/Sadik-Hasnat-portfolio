"use client";

import React from "react";
import {
  Smartphone,
  Database,
  Globe,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Zap,
  Code2,
  Server,
  Radio,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  colorClass: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: "Android Native", category: "Kotlin & Java", icon: <Smartphone className="w-4 h-4 text-[#A3E635]" />, colorClass: "border-[#A3E635]/40 hover:border-[#A3E635]" },
  { name: "Node.js & Express", category: "Backend Runtime", icon: <Server className="w-4 h-4 text-[#34D399]" />, colorClass: "border-[#34D399]/40 hover:border-[#34D399]" },
  { name: "Flutter & Dart", category: "Mobile Framework", icon: <Smartphone className="w-4 h-4 text-[#C5F467]" />, colorClass: "border-[#C5F467]/40 hover:border-[#C5F467]" },
  { name: "TypeScript", category: "Strict Typing", icon: <Terminal className="w-4 h-4 text-[#60A5FA]" />, colorClass: "border-[#60A5FA]/40 hover:border-[#60A5FA]" },
  { name: "Next.js 16", category: "Full-Stack App", icon: <Globe className="w-4 h-4 text-[#F5F7FA]" />, colorClass: "border-white/30 hover:border-white" },
  { name: "React 19", category: "Frontend UI", icon: <Code2 className="w-4 h-4 text-[#38BDF8]" />, colorClass: "border-[#38BDF8]/40 hover:border-[#38BDF8]" },
  { name: "SQLite / Room", category: "Offline Database", icon: <Database className="w-4 h-4 text-[#F59E0B]" />, colorClass: "border-[#F59E0B]/40 hover:border-[#F59E0B]" },
  { name: "REST APIs", category: "HTTP Pipeline", icon: <Cpu className="w-4 h-4 text-[#F43F5E]" />, colorClass: "border-[#F43F5E]/40 hover:border-[#F43F5E]" },
  { name: "Riverpod & BLoC", category: "State Isolation", icon: <Zap className="w-4 h-4 text-[#C5F467]" />, colorClass: "border-[#C5F467]/40 hover:border-[#C5F467]" },
  { name: "Tailwind CSS", category: "Responsive Styling", icon: <Globe className="w-4 h-4 text-[#38BDF8]" />, colorClass: "border-[#38BDF8]/40 hover:border-[#38BDF8]" },
  { name: "Firebase & Supabase", category: "Cloud & Auth", icon: <Radio className="w-4 h-4 text-[#F59E0B]" />, colorClass: "border-[#F59E0B]/40 hover:border-[#F59E0B]" },
  { name: "Clean Architecture", category: "System Design", icon: <Layers className="w-4 h-4 text-[#818CF8]" />, colorClass: "border-[#818CF8]/40 hover:border-[#818CF8]" },
  { name: "Git & GitHub CI", category: "DevOps & SCM", icon: <Shield className="w-4 h-4 text-[#F87171]" />, colorClass: "border-[#F87171]/40 hover:border-[#F87171]" },
];

interface TechMarqueeProps {
  className?: string;
}

export function TechMarquee({ className = "" }: TechMarqueeProps) {
  // Duplicate items for continuous seamless loop
  const items = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className={`relative w-full overflow-hidden border-y border-[#29313C]/80 bg-[#090B10] py-3 sm:py-4 backdrop-blur-md ${className}`}>
      {/* Left and right gradient fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-24 lg:w-36 bg-gradient-to-r from-[#090B10] via-[#090B10]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-24 lg:w-36 bg-gradient-to-l from-[#090B10] via-[#090B10]/80 to-transparent z-20" />

      {/* ONLY LEFT-TO-RIGHT SINGLE STREAM */}
      <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
        {items.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className={`mx-1.5 sm:mx-2.5 inline-flex items-center gap-2 sm:gap-2.5 rounded-xl border bg-[#121720]/90 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-mono transition-all duration-200 hover:scale-105 hover:bg-[#161D29] hover:shadow-[0_0_15px_rgba(197,244,103,0.15)] select-none ${tech.colorClass}`}
          >
            <span className="flex items-center justify-center shrink-0">{tech.icon}</span>
            <span className="font-bold text-[#F5F7FA] text-xs sm:text-sm">{tech.name}</span>
            <span className="text-[9px] sm:text-[10px] text-[#9AA5B5] px-1.5 py-0.5 rounded bg-[#090B10] border border-[#29313C]">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
