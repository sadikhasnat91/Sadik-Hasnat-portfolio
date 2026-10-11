import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/ui/project-card";
import { MotionFadeIn, MotionStaggerContainer, MotionStaggerItem } from "@/components/ui/motion";
import { getDynamicPortfolioData } from "@/lib/get-content";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";

export const metadata: Metadata = {
  title: "Projects & Engineering Case Studies",
  description:
    "Production mobile applications, systems architecture, and web engineering implementations built by Sadik Hasnat.",
};

export default async function ProjectsPage() {
  const dynamicData = await getDynamicPortfolioData();
  const projects = dynamicData.projects;
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-[#29313C]/80 bg-[#090B10] py-16 sm:py-20 lg:py-24">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C5F467]/8 blur-[120px] animate-pulse-glow" aria-hidden="true" />

        <Container size="wide" className="relative z-10">
          <MotionFadeIn direction="up">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#9AA5B5] hover:text-[#C5F467] mb-8 transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467] rounded p-1 -ml-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Overview</span>
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#29313C] bg-[#121720] px-3 py-1 text-xs font-mono text-[#C5F467] mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5F467] shadow-[0_0_8px_#C5F467]" />
                <span>Verified Project Case Studies</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-tight mb-6">
                Engineering Work, Architectural Decisions & Systems
              </h1>

              <p className="text-base sm:text-lg text-[#9AA5B5] leading-relaxed">
                Explore implemented mobile applications, offline-first architectures, and modern web platforms. Each case study details actual technical decisions, verified problems, real challenges, and current operational limitations.
              </p>
            </div>
          </MotionFadeIn>
        </Container>
      </section>

      {/* Projects Grid */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#090B10]">
        <Container size="wide">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#9AA5B5] font-semibold">
              All Case Studies ({projects.length})
            </h2>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9AA5B5]">
              <span className="w-2 h-2 rounded-full bg-[#C5F467] shadow-[0_0_6px_#C5F467]" />
              <span>Production</span>
              <span className="mx-1 text-[#29313C]">•</span>
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span>Active R&D</span>
              <span className="mx-1 text-[#29313C]">•</span>
              <span className="w-2 h-2 rounded-full bg-[#9AA5B5]" />
              <span>Planned</span>
            </div>
          </div>

          <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <MotionStaggerItem key={project.slug}>
                <ProjectCard project={project} isDetailed={true} />
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>

          {/* Verification Transparency Notice */}
          <div className="mt-16 rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-1">
                  Non-Deceptive Presentation Standards
                </h3>
                <p className="text-xs sm:text-sm text-[#9AA5B5] max-w-2xl leading-relaxed">
                  In strict accordance with professional engineering ethics, no customer metrics, user counts, revenue, or production claims are fabricated. Implemented capabilities are clearly separated from features currently in active development.
                </p>
              </div>
            </div>

            <a
              href="https://github.com/Sadihasnat91"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#29313C] bg-[#090B10] hover:bg-[#161D29] hover:border-[#C5F467]/50 text-xs font-semibold text-[#F5F7FA] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5F467]"
            >
              <GithubIcon className="w-4 h-4 text-[#C5F467]" />
              <span>Audit GitHub Codebases</span>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
