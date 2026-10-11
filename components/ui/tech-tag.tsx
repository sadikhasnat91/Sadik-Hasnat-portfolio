import React from "react";

export type TechTagVariant = "default" | "accent" | "subtle" | "outline";
export type TechTagSize = "sm" | "md";

interface TechTagProps {
  label: string;
  variant?: TechTagVariant;
  size?: TechTagSize;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TechTagVariant, string> = {
  default:
    "bg-[#121720] text-[#9AA5B5] border border-[#29313C] hover:border-[#C5F467]/40 hover:text-[#F5F7FA] hover:bg-[#161D29] hover:scale-105 transition-all duration-200",
  accent:
    "bg-[#C5F467]/10 text-[#C5F467] border border-[#C5F467]/30 font-medium hover:bg-[#C5F467]/20 hover:scale-105 transition-all duration-200 shadow-[0_0_10px_rgba(197,244,103,0.1)]",
  subtle:
    "bg-[#0D1117] text-[#9AA5B5] border border-[#1C232E] hover:border-[#29313C] hover:text-[#F5F7FA] transition-all duration-200",
  outline:
    "bg-transparent text-[#9AA5B5] border border-[#29313C] hover:border-[#C5F467]/40 hover:text-[#C5F467] transition-all duration-200",
};

const sizeStyles: Record<TechTagSize, string> = {
  sm: "text-[11px] px-2 py-0.5 rounded gap-1 tracking-tight font-mono",
  md: "text-xs px-2.5 py-1 rounded-md gap-1.5 font-mono",
};

export function TechTag({
  label,
  variant = "default",
  size = "md",
  icon,
  className = "",
}: TechTagProps) {
  return (
    <span
      className={`inline-flex items-center select-none transition-colors duration-150 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}
