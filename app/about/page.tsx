import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechTag } from "@/components/ui/tech-tag";
import { LinkButton } from "@/components/ui/button";
import { MotionFadeIn } from "@/components/ui/motion";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { getDynamicPortfolioData } from "@/lib/get-content";
import {
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About & Engineering Philosophy",
  description:
    "Professional background, verified experience at INTELLEEO, academic progression, and technical principles of software engineer Sadik Hasnat.",
};

export default async function AboutPage() {
  const dynamicData = await getDynamicPortfolioData();
  const personalInfo = dynamicData.personalInfo;
  const skills = dynamicData.skills;
  const education = dynamicData.education;
  const experience = dynamicData.experience;
  return (
    <div className="flex flex-col">
      {/* =========================================================================
          HERO & INTRODUCTION
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#29313C]/80 bg-[#090B10] py-16 sm:py-24">
        {/* Ambient atmospheric glow */}
        <div className="pointer-events-none absolute -top-28 -left-28 w-96 h-96 rounded-full bg-[#C5F467]/10 blur-[130px] animate-pulse-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 -right-28 w-96 h-96 rounded-full bg-[#38BDF8]/10 blur-[140px] animate-pulse-glow [animation-delay:2s]" aria-hidden="true" />

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 7 cols: Bio & Philosophy */}
            <div className="lg:col-span-7">
              <MotionFadeIn direction="up">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#29313C] bg-[#121720] px-3.5 py-1.5 text-xs font-mono text-[#C5F467] mb-6 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5F467] shadow-[0_0_8px_#C5F467]" />
                  <span>Software Engineer • Khulna, Bangladesh</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-tight mb-6">
                  Engineering with architectural discipline, local resilience, and clarity.
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-[#9AA5B5] leading-relaxed">
                  <p>
                    I am <strong className="text-[#F5F7FA] font-semibold">{personalInfo.name}</strong>, a mobile and software systems engineer based in Khulna, Bangladesh. I build high-performance client applications, focusing primarily on Android Native, Flutter, Dart, and modern TypeScript web platforms.
                  </p>
                  <p>
                    Currently, I work professionally at <strong className="text-[#F5F7FA] font-semibold">{personalInfo.currentCompany}</strong>, where I develop resilient mobile applications, structure local SQLite persistence layers, and integrate RESTful backend pipelines for real-world operations.
                  </p>
                  <p>
                    My engineering philosophy is simple: software must solve verified operational needs without gratuitous complexity. Rather than relying on fragile cloud round-trips for every UI interaction, I build local-first workflows with deterministic state isolation, accessible component styling, and clean testable boundaries.
                  </p>
                </div>

                {/* Verified Badges */}
                <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono text-[#9AA5B5]">
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#29313C] bg-[#121720] px-3 py-1.5 hover:border-[#C5F467]/40 transition-colors">
                    <Building2 className="w-4 h-4 text-[#C5F467]" />
                    <span>{personalInfo.currentCompany} (Current Role)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#29313C] bg-[#121720] px-3 py-1.5 hover:border-[#C5F467]/40 transition-colors">
                    <MapPin className="w-4 h-4 text-[#C5F467]" />
                    <span>{personalInfo.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#29313C] bg-[#121720] px-3 py-1.5 hover:border-[#C5F467]/40 transition-colors">
                    <GraduationCap className="w-4 h-4 text-[#C5F467]" />
                    <span>BSc in CSE, NUBTK (Expected 2026)</span>
                  </span>
                </div>
              </MotionFadeIn>
            </div>

            {/* Right 5 cols: Portrait Card & Direct Links */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <MotionFadeIn direction="up" delay={0.2} className="w-full max-w-sm">
                <div className="group relative w-full rounded-2xl border border-[#29313C] bg-[#121720] p-5 shadow-2xl card-glow-hover">
                  {/* Subtle neon aura */}
                  <div className="pointer-events-none absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[#C5F467]/20 to-[#38BDF8]/15 blur-xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-glow" aria-hidden="true" />
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#29313C]/80 bg-[#090B10]">
                  <Image
                    src={personalInfo.profileImagePath}
                    alt="Sadik Hasnat portrait"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121720] via-transparent to-transparent opacity-60" />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                        {personalInfo.name}
                      </p>
                      <p className="text-xs font-mono text-[#9AA5B5]">
                        {personalInfo.currentRole}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {personalInfo.githubUrl && (
                        <a
                          href={personalInfo.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Profile"
                          className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {personalInfo.linkedinUrl && (
                        <a
                          href={personalInfo.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn Profile"
                          className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                        >
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {personalInfo.facebookUrl && (
                        <a
                          href={personalInfo.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook Profile"
                          className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                        >
                          <FacebookIcon className="w-4 h-4" />
                        </a>
                      )}
                      {personalInfo.instagramUrl && (
                        <a
                          href={personalInfo.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram Profile"
                          className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                        >
                          <InstagramIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#29313C]/60 flex items-center justify-between text-xs font-mono text-[#9AA5B5]">
                    <span>Status: Available for Work</span>
                    <span className="text-[#C5F467]">Verified Profile</span>
                  </div>
                </div>
              </div>
              </MotionFadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          VERIFIED EXPERIENCE & EDUCATION
          ========================================================================= */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#0D1117]/60">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Experience (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-[#C5F467]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5F467] font-semibold">
                  Professional Experience
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                Confirmed Employment History
              </h2>

              <div className="space-y-6 pt-2">
                {experience.map((exp) => (
                  <div
                    key={exp.company}
                    className="rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-7 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-[#C5F467]">
                          {exp.company} • {exp.location}
                        </p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#161D29] border border-[#29313C] text-[#9AA5B5] w-fit">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#9AA5B5]">
                      {exp.focus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#C5F467] mt-0.5">›</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-[#C5F467]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5F467] font-semibold">
                  Academic Progression
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                Confirmed Educational Credentials
              </h2>

              <div className="space-y-4 pt-2">
                {education.map((edu) => (
                  <div
                    key={edu.degree}
                    className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-sm font-bold text-[#F5F7FA]">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono text-[#C5F467]">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#9AA5B5]">
                      {edu.institution}
                    </p>
                    {edu.field && (
                      <p className="text-[11px] font-mono text-[#9AA5B5]/80 pt-1">
                        Curriculum Focus: {edu.field}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          VERIFIED TECHNICAL CAPABILITIES & EVIDENCE
          ========================================================================= */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#090B10]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Technical Stack Matrix"
            title="Competencies & Applied Tools"
            description="Verified technologies used in production and active R&D codebases. Organized by operational domain without arbitrary percentage ratings."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-2">
                    {skillGroup.category}
                  </h3>
                  <p className="text-xs text-[#9AA5B5] leading-relaxed mb-6">
                    {skillGroup.description}
                  </p>

                  <ul className="space-y-4">
                    {skillGroup.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="border-b border-[#29313C]/40 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-[#F5F7FA]">
                            {skill.name}
                          </span>
                          {skill.badge && (
                            <TechTag label={skill.badge} size="sm" variant="accent" />
                          )}
                        </div>
                        <p className="text-xs text-[#9AA5B5]">
                          {skill.verifiedContext}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Link to Case Studies */}
          <div className="mt-12 rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-1">
                See these technologies in action
              </h3>
              <p className="text-xs sm:text-sm text-[#9AA5B5]">
                Review detailed case studies for FitTracker, MarginX, RestroFlow, and Showcase Dashboard.
              </p>
            </div>

            <LinkButton
              href="/projects"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore Project Case Studies
            </LinkButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
