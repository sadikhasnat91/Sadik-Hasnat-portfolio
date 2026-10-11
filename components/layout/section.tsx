import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  spacing?: "default" | "compact" | "loose" | "none";
}

export function Section({
  children,
  id,
  className = "",
  spacing = "default",
  ...props
}: SectionProps) {
  const spacingClasses = {
    none: "py-0",
    compact: "py-8 sm:py-12 md:py-14",
    default: "py-12 sm:py-16 md:py-20",
    loose: "py-16 sm:py-20 md:py-28",
  };

  return (
    <section
      id={id}
      className={`relative w-full ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
