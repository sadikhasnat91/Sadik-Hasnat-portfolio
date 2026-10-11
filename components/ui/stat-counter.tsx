"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Cpu, Code2, Sparkles } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    value: 2,
    suffix: "+ Yrs",
    label: "Professional Engineering",
    sublabel: "INTELLEEO & Native Mobile",
    icon: <Cpu className="w-4 h-4 text-[#C5F467]" />,
  },
  {
    value: 6,
    suffix: "+",
    label: "Verified Systems",
    sublabel: "Production & Open Source",
    icon: <Code2 className="w-4 h-4 text-[#38BDF8]" />,
  },
  {
    value: 100,
    suffix: "%",
    label: "Offline-First Sync",
    sublabel: "SQLite & Drift Integrity",
    icon: <ShieldCheck className="w-4 h-4 text-[#A3E635]" />,
  },
  {
    value: 4,
    suffix: "+",
    label: "Core Platforms",
    sublabel: "Android, Flutter, TS, Next",
    icon: <Sparkles className="w-4 h-4 text-[#818CF8]" />,
  },
];

function SingleCounter({ item }: { item: StatItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 1400; // ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * item.value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(item.value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, item.value]);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col justify-between rounded-xl border border-[#29313C] bg-[#121720]/80 p-3.5 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#C5F467]/50 hover:bg-[#161D29] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(197,244,103,0.1)]"
    >
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center group-hover:border-[#C5F467]/40 transition-colors">
          {item.icon}
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-[#C5F467]/60 group-hover:bg-[#C5F467] group-hover:scale-125 transition-all shadow-[0_0_6px_#C5F467]" />
      </div>

      <div>
        <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono text-[#F5F7FA] tracking-tight group-hover:text-[#C5F467] transition-colors">
          {count}
          <span className="text-[#C5F467] text-base sm:text-xl ml-0.5">{item.suffix}</span>
        </div>
        <p className="text-[11px] sm:text-xs font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mt-1 leading-snug">
          {item.label}
        </p>
        <p className="text-[10px] sm:text-[11px] font-mono text-[#9AA5B5] mt-0.5 leading-tight">
          {item.sublabel}
        </p>
      </div>
    </div>
  );
}

export function StatCounterGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-5 sm:mt-8 mb-1 sm:mb-2">
      {STATS.map((stat) => (
        <SingleCounter key={stat.label} item={stat} />
      ))}
    </div>
  );
}
