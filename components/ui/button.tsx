import React from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

export type ButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type LinkButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    isExternal?: boolean;
  };

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#C5F467] text-[#090B10] font-semibold hover:bg-[#D4F880] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(197,244,103,0.35)] active:translate-y-0 active:scale-[0.98] border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.4)] relative overflow-hidden group",
  secondary:
    "bg-[#121720] text-[#F5F7FA] border border-[#29313C] hover:bg-[#161D29] hover:border-[#3E4B5B] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:translate-y-0 active:scale-[0.98]",
  outline:
    "bg-transparent text-[#F5F7FA] border border-[#29313C] hover:border-[#C5F467]/60 hover:text-[#C5F467] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(197,244,103,0.15)] active:translate-y-0 active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#9AA5B5] hover:text-[#F5F7FA] hover:bg-[#121720]/80 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-md gap-1.5 h-8",
  md: "text-sm px-4 py-2.5 rounded-lg gap-2 h-10",
  lg: "text-base px-6 py-3.5 rounded-lg gap-2.5 h-12",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5F467] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <button
      className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  children,
  href,
  isExternal = false,
  ...props
}: LinkButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5F467] focus-visible:outline-offset-2";

  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const resolvedHref =
    isExternal && href && !href.startsWith("http://") && !href.startsWith("https://") && !href.startsWith("mailto:") && !href.startsWith("tel:")
      ? `https://${href}`
      : href;

  return (
    <Link
      href={resolvedHref}
      className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...externalProps}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </Link>
  );
}
