"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#29313C]/80 bg-[#090B10]/90 backdrop-blur-md transition-colors">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand identity */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[#C5F467] rounded-sm py-1"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#121720] border border-[#29313C] font-mono text-sm font-bold text-[#C5F467] transition-colors group-hover:border-[#C5F467]/60">
              SH
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-none text-sm sm:text-base">
                Sadik Hasnat
              </span>
              <span className="text-[11px] font-mono text-[#9AA5B5] leading-tight">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C5F467] bg-[#121720] border border-[#29313C]"
                      : "text-[#9AA5B5] hover:text-[#F5F7FA] hover:bg-[#121720]/60"
                  } focus-visible:outline-2 focus-visible:outline-[#C5F467]`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Status Indicator */}
          <div className="hidden md:flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#121720] border border-[#29313C] text-xs font-mono text-[#9AA5B5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467] animate-pulse" />
              <span>Available for Work</span>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#C5F467] text-[#090B10] hover:bg-[#D4F880] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-2 rounded-lg text-[#9AA5B5] hover:text-[#F5F7FA] hover:bg-[#121720] border border-transparent hover:border-[#29313C] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#F5F7FA]" />
              ) : (
                <Menu className="w-5 h-5 text-[#F5F7FA]" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile navigation drawer / overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-b border-[#29313C] bg-[#090B10] px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#C5F467] bg-[#121720] border border-[#29313C]"
                      : "text-[#9AA5B5] hover:text-[#F5F7FA] hover:bg-[#121720]/60"
                  } focus-visible:outline-2 focus-visible:outline-[#C5F467]`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#29313C]/80 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#121720] border border-[#29313C] text-xs font-mono text-[#9AA5B5] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467] animate-pulse" />
              <span>Available for Work</span>
            </div>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#C5F467] text-[#090B10] hover:bg-[#D4F880] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
