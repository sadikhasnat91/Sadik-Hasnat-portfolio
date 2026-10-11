import React from "react";
import Link from "next/link";

import { Container } from "./container";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { getDynamicPortfolioData } from "@/lib/get-content";

export async function SiteFooter() {
  const currentYear = 2026;
  const dynamicData = await getDynamicPortfolioData();
  const personalInfo = dynamicData.personalInfo;

  return (
    <footer className="mt-auto border-t border-[#29313C] bg-[#090B10] py-12 sm:py-16 text-[#9AA5B5]">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#29313C]/60">
          {/* Identity col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#121720] border border-[#29313C] font-mono text-xs font-bold text-[#C5F467]">
                SH
              </div>
              <span className="font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                Sadik Hasnat
              </span>
            </div>
            <p className="text-sm text-[#9AA5B5] max-w-sm leading-relaxed">
              Software engineer focused on high-performance mobile applications and modern web architectures. Dedicated to clean engineering, verifiable utility, and disciplined design.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#121720] border border-[#29313C] text-xs font-mono text-[#9AA5B5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467]" />
                Next.js App Router • TypeScript • Tailwind CSS
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  About & Background
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-xs font-mono text-[#9AA5B5]/70 hover:text-[#C5F467] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  ⚙ Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Social / Connect links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] font-semibold">
              Connect & Verify
            </h4>
            <ul className="space-y-2 text-sm">
              {personalInfo.githubUrl && (
                <li>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F5F7FA] transition-colors group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <GithubIcon className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#F5F7FA]" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
              )}
              {personalInfo.linkedinUrl && (
                <li>
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F5F7FA] transition-colors group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#F5F7FA]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
              )}
              {personalInfo.facebookUrl && (
                <li>
                  <a
                    href={personalInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F5F7FA] transition-colors group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#F5F7FA]" />
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
              )}
              {personalInfo.instagramUrl && (
                <li>
                  <a
                    href={personalInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#F5F7FA] transition-colors group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#F5F7FA]" />
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>
                </li>
              )}
              {personalInfo.email && (
                <li>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#F5F7FA] transition-colors group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <Mail className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#F5F7FA]" />
                    <span>{personalInfo.email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {currentYear} Sadik Hasnat. All rights reserved.</p>
          <p className="text-[#9AA5B5] font-mono">
            Designed with precision • Built for production
          </p>
        </div>
      </Container>
    </footer>
  );
}
