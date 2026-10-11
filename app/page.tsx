import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { TechTag } from "@/components/ui/tech-tag";
import { ProjectCard } from "@/components/ui/project-card";
import { MotionFadeIn, MotionStaggerContainer, MotionStaggerItem } from "@/components/ui/motion";
import { HeroAmbientGlow, HeroFloatingBadges, RadarStatusBadge } from "@/components/ui/hero-visuals";
import { ParticleBackground } from "@/components/ui/particle-background";
import { TiltCard } from "@/components/ui/tilt-card";
import { TechMarquee } from "@/components/ui/tech-marquee";
import { StatCounterGrid } from "@/components/ui/stat-counter";
import { RoleTicker } from "@/components/ui/role-ticker";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { getDynamicPortfolioData } from "@/lib/get-content";
import {
  ArrowDown,
  Mail,
  MapPin,
  Building2,
  GraduationCap,
  MessageCircle,
  Phone,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

export default async function Home() {
  const dynamicData = await getDynamicPortfolioData();
  const personalInfo = dynamicData.personalInfo;
  const projects = dynamicData.projects;
  const skills = dynamicData.skills;
  const education = dynamicData.education;
  const experience = dynamicData.experience;
  return (
    <div className="flex flex-col">
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section
        id="hero"
        aria-label="Introduction & Overview"
        className="relative overflow-hidden border-b border-[#29313C]/80 bg-[#090B10] pt-6 sm:pt-9 lg:pt-10 pb-8 sm:pb-10 lg:pb-12"
      >
        {/* Interactive Constellation Particle Canvas */}
        <ParticleBackground />

        {/* Ambient atmospheric glow orbs */}
        <HeroAmbientGlow />

        {/* Subtle background technical grid line */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#F5F7FA 1px, transparent 1px), linear-gradient(90deg, #F5F7FA 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Col: Editorial Headline & Actions */}
            <div className="lg:col-span-6">
              <MotionFadeIn direction="up" delay={0.05}>
                <div className="flex flex-wrap items-center gap-3 mb-3.5">
                  <RadarStatusBadge text="Available for Software Development Roles" />
                  <RoleTicker />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl lg:text-[3.1rem] font-[family-name:var(--font-heading)] leading-[1.1] mb-3.5">
                  Building disciplined mobile applications & robust software systems.
                </h1>

                <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed mb-4 sm:mb-5 max-w-xl font-sans">
                  I am <strong className="font-semibold text-[#F5F7FA]">{personalInfo.name}</strong>, a software engineer in Khulna, Bangladesh. Currently developing mobile products at <strong className="font-semibold text-[#F5F7FA]">{personalInfo.currentCompany}</strong> and engineering with Flutter, Dart, Android native, and modern TypeScript architectures.
                </p>

                {/* Verified Hero Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-xs text-[#9AA5B5]">
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#29313C] bg-[#121720] px-2.5 py-1 hover:border-[#C5F467]/40 transition-colors">
                    <Building2 className="h-3.5 w-3.5 text-[#C5F467]" />
                    {personalInfo.currentCompany}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#29313C] bg-[#121720] px-2.5 py-1 hover:border-[#C5F467]/40 transition-colors">
                    <MapPin className="h-3.5 w-3.5 text-[#C5F467]" />
                    {personalInfo.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-[#29313C] bg-[#121720] px-2.5 py-1 hover:border-[#C5F467]/40 transition-colors">
                    <GraduationCap className="h-3.5 w-3.5 text-[#C5F467]" />
                    BSc CSE (2026)
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3">
                  <LinkButton
                    href="/projects"
                    variant="primary"
                    size="md"
                    icon={<ArrowDown className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    Explore Verified Work
                  </LinkButton>
                  <LinkButton
                    href="/contact"
                    variant="secondary"
                    size="md"
                    icon={<Mail className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    Initiate Contact
                  </LinkButton>
                </div>
              </MotionFadeIn>
            </div>

            {/* Right Col: Verified Portrait & Engineering Credentials Card with 3D Tilt, Floating Badges & Aura */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
              <MotionFadeIn delay={0.2} direction="up" className="w-full flex justify-center lg:justify-end">
                <TiltCard maxTilt={7} className="w-full max-w-[470px]">
                  <div className="group/card relative w-full">
                    {/* Atmospheric neon aura behind portrait */}
                    <div
                      className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#C5F467]/20 via-[#38BDF8]/15 to-[#C5F467]/20 blur-2xl opacity-70 group-hover/card:opacity-100 transition-opacity duration-500 animate-pulse-glow"
                      aria-hidden="true"
                    />

                    {/* Floating Levitation Tech Badges */}
                    <HeroFloatingBadges />

                    {/* Glassmorphic Card Surface */}
                    <div className="relative rounded-2xl border border-[#29313C] bg-[#121720]/95 backdrop-blur-md p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:border-[#3E4B5B]">
                      {/* Photo Container */}
                      <div className="relative aspect-[4/4.6] w-full min-h-[320px] sm:min-h-[400px] overflow-hidden rounded-xl border border-[#29313C]/80 bg-[#090B10]">
                        <Image
                          src={personalInfo?.profileImagePath || "https://avatars.githubusercontent.com/u/152088012?s=400&u=ed0ecd3fd1396773b70ed0e4b52e373413e8a95a&v=4"}
                          alt={`${personalInfo?.name || "Sadik Hasnat"} portrait`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 470px"
                          className="object-cover object-top transition-transform duration-700 group-hover/card:scale-[1.02]"
                          priority
                          unoptimized={personalInfo?.profileImagePath?.startsWith("http") ? false : undefined}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121720] via-transparent to-transparent opacity-40" />
                      </div>

                      {/* Summary Footer on Card */}
                      <div className="mt-4 pt-3 border-t border-[#29313C]/60 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
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
                              aria-label="Sadik Hasnat GitHub Profile"
                              className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] hover:scale-110 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                            >
                              <GithubIcon className="h-4 w-4" />
                            </a>
                          )}
                          {personalInfo.linkedinUrl && (
                            <a
                              href={personalInfo.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Sadik Hasnat LinkedIn Profile"
                              className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] hover:scale-110 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                            >
                              <LinkedinIcon className="h-4 w-4" />
                            </a>
                          )}
                          {personalInfo.facebookUrl && (
                            <a
                              href={personalInfo.facebookUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Sadik Hasnat Facebook Profile"
                              className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] hover:scale-110 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                            >
                              <FacebookIcon className="h-4 w-4" />
                            </a>
                          )}
                          {personalInfo.instagramUrl && (
                            <a
                              href={personalInfo.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Sadik Hasnat Instagram Profile"
                              className="rounded p-2 text-[#9AA5B5] hover:bg-[#29313C]/60 hover:text-[#F5F7FA] hover:scale-110 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                            >
                              <InstagramIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </MotionFadeIn>
            </div>
          </div>

          {/* Animated Counter Grid in Hero */}
          <MotionFadeIn direction="up" delay={0.3}>
            <StatCounterGrid />
          </MotionFadeIn>
        </Container>
      </section>

      {/* =========================================================================
          INFINITE TECH MARQUEE TICKER
          ========================================================================= */}
      <TechMarquee />

      {/* =========================================================================
          2. SELECTED WORK SECTION
          ========================================================================= */}
      <Section id="work" spacing="default" className="border-b border-[#29313C]/80 bg-[#090B10]">
        <Container size="wide">
          <SectionHeading
            eyebrow="Portfolio Track Record"
            title="Selected Work & Engineering Implementations"
            description="Verified projects engineered with real mobile codebases, offline database sync, and modern component architectures."
          />

          <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <MotionStaggerItem key={project.slug}>
                <ProjectCard
                  project={project}
                  isDetailed={true}
                />
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>

          {/* Verification Notice Banner */}
          <MotionFadeIn delay={0.2} direction="up">
            <div className="mt-12 rounded-xl border border-[#29313C] bg-[#121720]/80 backdrop-blur-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-glow-hover">
              <div className="flex items-start sm:items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#C5F467] shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <p className="text-sm font-semibold text-[#F5F7FA]">
                    Honest & Non-Deceptive Project Claims
                  </p>
                  <p className="text-xs text-[#9AA5B5]">
                    All listed architectures reflect genuine codebases in local repositories with verified technical implementations.
                  </p>
                </div>
              </div>

              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#C5F467] hover:underline shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5F467]"
              >
                <span>Explore GitHub Repositories</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </MotionFadeIn>
        </Container>
      </Section>

      {/* =========================================================================
          3. CAPABILITIES & TECHNOLOGY SECTION
          ========================================================================= */}
      <Section id="capabilities" spacing="default" className="border-b border-[#29313C]/80 bg-[#0D1117]/60">
        <Container size="wide">
          <SectionHeading
            eyebrow="Technical Stack"
            title="Capabilities & Engineering Practices"
            description="Core technologies and architectural patterns applied directly across verified client work and mobile applications."
          />

          {/* Continuous Left-to-Right Tech Stream */}
          <MotionFadeIn direction="up" delay={0.05}>
            <div className="mb-8 sm:mb-10 rounded-2xl border border-[#29313C] overflow-hidden shadow-2xl bg-[#090B10]">
              <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-[#29313C]/80 bg-[#121720]/80 backdrop-blur-sm flex items-center justify-between text-xs font-mono text-[#9AA5B5]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5F467] animate-pulse shadow-[0_0_8px_#C5F467]" />
                  <span className="font-semibold text-[#F5F7FA] text-xs sm:text-sm">Active Technology Pipeline</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#9AA5B5] hidden xs:inline">Continuous Stream (Left to Right) • Hover to Pause</span>
              </div>
              <TechMarquee className="border-y-0 py-3" />
            </div>
          </MotionFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skillGroup, idx) => (
              <MotionFadeIn
                key={skillGroup.category}
                delay={idx * 0.1}
                direction="up"
                className="h-full"
              >
                <div
                  className="rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-7 flex flex-col justify-between h-full card-glow-hover"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#C5F467] shadow-[0_0_8px_#C5F467]" aria-hidden="true" />
                      <h3 className="text-lg font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                        {skillGroup.category}
                      </h3>
                    </div>

                    <p className="text-xs text-[#9AA5B5] leading-relaxed mb-6">
                      {skillGroup.description}
                    </p>

                    <ul className="space-y-4">
                      {skillGroup.skills.map((skill) => (
                        <li key={skill.name} className="border-b border-[#29313C]/40 pb-3 last:border-0 last:pb-0">
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
              </MotionFadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          4. ABOUT PREVIEW & BACKGROUND SECTION
          ========================================================================= */}
      <Section id="about" spacing="default" className="border-b border-[#29313C]/80 bg-[#090B10]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 6 cols: Background narrative */}
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Background & Philosophy"
                title="Engineering mobile solutions with discipline and clarity."
                className="mb-8"
              />

              <div className="space-y-4 text-sm sm:text-base text-[#9AA5B5] leading-relaxed">
                <p>
                  I am a software engineer committed to writing maintainable code that solves tangible operational problems. Currently working at <strong className="text-[#F5F7FA]">INTELLEEO</strong>, my day-to-day focus centers on developing fluid, dependable Android and Flutter client software.
                </p>
                <p>
                  My engineering philosophy values system reliability and intuitive user experiences over unnecessary complexity. Whether establishing local SQLite synchronization routines for offline mobile stability or implementing responsive TypeScript interfaces, I prioritize clarity and accessibility.
                </p>
                <p>
                  Alongside active professional development, I am completing my BSc in Computer Science and Engineering at <strong className="text-[#F5F7FA]">Northern University Business and Technology, Khulna</strong>.
                </p>
              </div>

              {/* Quick Contact Info */}
              <div className="mt-8 pt-6 border-t border-[#29313C]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">Location</span>
                    <span className="text-sm font-medium text-[#F5F7FA]">{personalInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] shrink-0">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">Company</span>
                    <span className="text-sm font-medium text-[#F5F7FA]">{personalInfo.currentCompany}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Experience & Academic Progression */}
            <div className="lg:col-span-6 space-y-8">
              {/* Experience Card */}
              <MotionFadeIn direction="up" delay={0.1}>
                <div className="rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-7 card-glow-hover">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#C5F467] font-semibold mb-6 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5F467] shadow-[0_0_8px_#C5F467]" />
                    Verified Employment Experience
                  </h3>

                  {experience.map((exp) => (
                    <div key={exp.company} className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                          {exp.role}
                        </h4>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#161D29] border border-[#29313C] text-[#C5F467] w-fit">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-[#9AA5B5]">
                        {exp.company} • {exp.location}
                      </p>

                      <ul className="space-y-2 pt-2 text-xs text-[#9AA5B5]">
                        {exp.focus.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#C5F467] mt-0.5">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </MotionFadeIn>

              {/* Education Card */}
              <MotionFadeIn direction="up" delay={0.2}>
                <div className="rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-7 card-glow-hover">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#9AA5B5] font-semibold mb-6 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#C5F467]" />
                    Education & Academic Credentials
                  </h3>

                  <div className="space-y-6">
                    {education.map((edu) => (
                      <div key={edu.degree} className="border-b border-[#29313C]/40 pb-4 last:border-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-sm font-bold text-[#F5F7FA]">
                            {edu.degree}
                          </h4>
                          <span className="text-xs font-mono text-[#9AA5B5]">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-xs text-[#9AA5B5]">
                          {edu.institution}
                        </p>
                        {edu.field && (
                          <p className="text-[11px] font-mono text-[#9AA5B5]/80 mt-1">
                            Focus: {edu.field}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </MotionFadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          5. CONTACT & DIRECT INQUIRY SECTION
          ========================================================================= */}
      <Section id="contact" spacing="default" className="bg-[#090B10]">
        <Container size="wide">
          <MotionFadeIn direction="up">
            <div className="rounded-2xl border border-[#29313C] bg-[#121720] p-5 sm:p-10 lg:p-14 relative overflow-hidden card-glow-hover">
              {/* Atmospheric Glow in Contact Card */}
              <div
                className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C5F467]/10 blur-[130px] animate-pulse-glow"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#38BDF8]/10 blur-[120px] animate-pulse-glow [animation-delay:2s]"
                aria-hidden="true"
              />

              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C5F467]/30 bg-[#C5F467]/10 px-3 py-1 text-xs font-mono text-[#C5F467] mb-4 sm:mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5F467] animate-pulse shadow-[0_0_8px_#C5F467]" />
                  Direct Communication
                </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-tight mb-3 sm:mb-4">
                Interested in working together on software engineering projects?
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-[#9AA5B5] leading-relaxed mb-6 sm:mb-8">
                I am open to software development positions, internships, freelance contracts, and technical product discussions. Reach out directly through any verified channel below:
              </p>

              {/* Verified Contact Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Email Direct */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#9AA5B5] block uppercase">Direct Email</span>
                    <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">{personalInfo.email}</span>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/8801973133814`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#9AA5B5] block uppercase">WhatsApp Direct</span>
                    <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">{personalInfo.whatsapp}</span>
                  </div>
                </a>

                {/* Phone Direct */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#9AA5B5] block uppercase">Mobile Call</span>
                    <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">{personalInfo.phone}</span>
                  </div>
                </a>

                {/* GitHub Direct */}
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <GithubIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#9AA5B5] block uppercase">GitHub Repos</span>
                    <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">@Sadihasnat91</span>
                  </div>
                </a>

                {/* LinkedIn Direct */}
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                      <LinkedinIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#9AA5B5] block uppercase">LinkedIn Profile</span>
                      <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">Professional Network</span>
                    </div>
                  </a>
                )}

                {/* Facebook Direct */}
                {personalInfo.facebookUrl && (
                  <a
                    href={personalInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                      <FacebookIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#9AA5B5] block uppercase">Facebook</span>
                      <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">Connect on Facebook</span>
                    </div>
                  </a>
                )}

                {/* Instagram Direct */}
                {personalInfo.instagramUrl && (
                  <a
                    href={personalInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl border border-[#29313C] bg-[#090B10] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <div className="h-10 w-10 rounded-lg bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                      <InstagramIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#9AA5B5] block uppercase">Instagram</span>
                      <span className="text-sm font-medium text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">Follow on Instagram</span>
                    </div>
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <LinkButton
                  href={`mailto:${personalInfo.email}`}
                  variant="primary"
                  size="md"
                  icon={<Mail className="h-4 w-4" />}
                  iconPosition="left"
                >
                  Send Direct Email
                </LinkButton>
                <LinkButton
                  href={`https://wa.me/8801973133814`}
                  variant="secondary"
                  size="md"
                  isExternal={true}
                  icon={<MessageCircle className="h-4 w-4" />}
                  iconPosition="left"
                >
                  Open WhatsApp Chat
                </LinkButton>
              </div>
            </div>
          </div>
          </MotionFadeIn>
        </Container>
      </Section>
    </div>
  );
}
