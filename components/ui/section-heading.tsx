import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex flex-col mb-8 sm:mb-12 lg:mb-14 max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467]" aria-hidden="true" />
          <span className="text-xs font-mono tracking-wider uppercase font-semibold text-[#C5F467]">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#9AA5B5] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
