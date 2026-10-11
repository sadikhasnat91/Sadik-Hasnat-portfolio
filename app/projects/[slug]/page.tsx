import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TechTag } from "@/components/ui/tech-tag";
import { LinkButton } from "@/components/ui/button";
import { MotionFadeIn } from "@/components/ui/motion";
import { GithubIcon } from "@/components/ui/social-icons";
import { getDynamicPortfolioData } from "@/lib/get-content";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Code2,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const dynamicData = await getDynamicPortfolioData();
  return dynamicData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dynamicData = await getDynamicPortfolioData();
  const project = dynamicData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Sadik Hasnat Software Engineering Case Study`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dynamicData = await getDynamicPortfolioData();
  const project = dynamicData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find related / adjacent projects
  const currentIndex = dynamicData.projects.findIndex((p) => p.slug === slug);
  const nextProject =
    dynamicData.projects[(currentIndex + 1) % dynamicData.projects.length];
  const prevProject =
    dynamicData.projects[
      (currentIndex - 1 + dynamicData.projects.length) % dynamicData.projects.length
    ];

  return (
    <article className="flex flex-col">
      {/* =========================================================================
          HERO & OVERVIEW
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#29313C]/80 bg-[#090B10] py-16 sm:py-24">
        {/* Ambient atmospheric glow */}
        <div className="pointer-events-none absolute -top-28 -right-28 w-96 h-96 rounded-full bg-[#C5F467]/10 blur-[130px] animate-pulse-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 -left-28 w-96 h-96 rounded-full bg-[#38BDF8]/10 blur-[140px] animate-pulse-glow [animation-delay:2s]" aria-hidden="true" />

        <Container size="wide" className="relative z-10">
          {/* Back Navigation */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#9AA5B5] hover:text-[#C5F467] mb-8 transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467] rounded p-1 -ml-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 8 cols: Title, Tagline, Summary */}
            <div className="lg:col-span-8">
              <MotionFadeIn direction="up">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9AA5B5]">
                    {project.category}
                  </span>
                  <span className="text-[#29313C]">•</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono border ${
                      project.status === "production"
                        ? "border-[#C5F467]/30 text-[#C5F467] bg-[#C5F467]/10"
                        : "border-[#F59E0B]/30 text-[#F59E0B] bg-[#F59E0B]/10"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "production"
                          ? "bg-[#C5F467] shadow-[0_0_8px_#C5F467]"
                          : "bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]"
                      }`}
                    />
                    {project.status === "production"
                      ? "Production"
                      : project.status === "in-development"
                      ? "Active R&D"
                      : "Planned"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-tight mb-4">
                  {project.title}
                </h1>

                <p className="text-lg sm:text-xl font-medium text-[#C5F467] font-mono mb-6">
                  {project.tagline}
                </p>

                <p className="text-base sm:text-lg text-[#9AA5B5] leading-relaxed mb-8">
                  {project.summary}
                </p>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.links.github && (
                    <LinkButton
                      href={project.links.github}
                      variant="primary"
                      size="md"
                      isExternal={true}
                      icon={<GithubIcon className="w-4 h-4" />}
                      iconPosition="left"
                    >
                      View Source Repository
                    </LinkButton>
                  )}
                  {project.links.liveDemo && (
                    <LinkButton
                      href={project.links.liveDemo}
                      variant="secondary"
                      size="md"
                      isExternal={true}
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="right"
                    >
                      Launch Live Deployment
                    </LinkButton>
                  )}
                </div>
              </MotionFadeIn>
            </div>

            {/* Right 4 cols: Project Meta Specs Card */}
            <div className="lg:col-span-4">
              <MotionFadeIn direction="up" delay={0.15}>
                <div className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-6 card-glow-hover">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] font-semibold border-b border-[#29313C]/60 pb-3">
                    Project Metadata
                  </h3>

                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                      My Role & Contribution
                    </span>
                    <span className="text-sm font-semibold text-[#F5F7FA]">
                      {project.role}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                      Timeline
                    </span>
                    <span className="text-sm font-medium text-[#F5F7FA]">
                      {project.timeline}
                    </span>
                  </div>

                  {project.targetUsers && (
                    <div>
                      <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                        Target Audience
                      </span>
                      <span className="text-xs text-[#9AA5B5] leading-relaxed block mt-0.5">
                        {project.targetUsers}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase mb-2">
                      Verified Core Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.core.map((t) => (
                        <TechTag key={t} label={t} size="sm" variant="default" />
                      ))}
                      {project.techStack.secondary?.map((t) => (
                        <TechTag key={t} label={t} size="sm" variant="subtle" />
                      ))}
                    </div>
                  </div>
                </div>
              </MotionFadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          VERIFIED PROBLEM & ARCHITECTURAL SOLUTION
          ========================================================================= */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#0D1117]/60">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* The Verified Problem */}
            <div className="rounded-xl border border-[#29313C] bg-[#121720] p-7 sm:p-8">
              <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#F59E0B] mb-5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-3">
                The Verified Problem
              </h2>
              <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed">
                {project.verifiedProblem}
              </p>
            </div>

            {/* The Engineering Solution */}
            <div className="rounded-xl border border-[#29313C] bg-[#121720] p-7 sm:p-8">
              <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] mb-5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-3">
                The Engineering Solution
              </h2>
              <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed">
                {project.verifiedSolution}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          IMPLEMENTED FEATURES & ARCHITECTURAL DECISIONS
          ========================================================================= */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#090B10]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Key Features (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5F467] font-semibold">
                  Feature Specifications
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                Key Implemented Features
              </h2>

              <ul className="space-y-4 pt-2">
                {project.keyFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-[#29313C]/60 bg-[#121720]/60 p-4"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5F467] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#F5F7FA] leading-relaxed">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Decisions (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5F467] font-semibold">
                  System Architecture
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)]">
                Key Technical Decisions
              </h2>

              <ul className="space-y-4 pt-2">
                {project.architecturalDecisions.map((dec, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-[#29313C]/60 bg-[#121720]/60 p-4"
                  >
                    <Code2 className="w-4 h-4 text-[#C5F467] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#9AA5B5] leading-relaxed">
                      {dec}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          CHALLENGES & KNOWN LIMITATIONS
          ========================================================================= */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#0D1117]/60">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Technical Challenges (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-6">
                Technical Challenges & Solved Trade-offs
              </h2>

              <div className="space-y-4">
                {project.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#29313C] bg-[#121720] p-5 sm:p-6 space-y-2"
                  >
                    <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                      <span className="text-xs font-mono text-[#F59E0B] font-bold">
                        Challenge:
                      </span>
                      {c.challenge}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9AA5B5] leading-relaxed pl-4 border-l-2 border-[#C5F467]/60">
                      <strong className="text-[#C5F467] font-medium">
                        Implemented Solution:{" "}
                      </strong>
                      {c.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Known Limitations & Roadmap (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-6">
                Current Limitations & Scope
              </h2>

              <div className="rounded-xl border border-[#29313C] bg-[#121720] p-6 space-y-4">
                <p className="text-xs text-[#9AA5B5] leading-relaxed">
                  Honest engineering disclosure regarding features intentionally deferred or pending external access:
                </p>

                <ul className="space-y-3 pt-2">
                  {project.knownLimitations.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#9AA5B5]">
                      <span className="text-[#F59E0B] font-mono text-sm leading-none">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          ADJACENT PROJECT NAVIGATION
          ========================================================================= */}
      <section className="bg-[#090B10] py-12 sm:py-16">
        <Container size="wide">
          <div className="border-t border-[#29313C]/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex items-center gap-3 text-left group hover:text-[#C5F467] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467] rounded p-2"
            >
              <ArrowLeft className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#C5F467] group-hover:-translate-x-1 transition-all" />
              <div>
                <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                  Previous Project
                </span>
                <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467]">
                  {prevProject.title}
                </span>
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-3 text-right group hover:text-[#C5F467] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5F467] rounded p-2"
            >
              <div>
                <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                  Next Project
                </span>
                <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467]">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9AA5B5] group-hover:text-[#C5F467] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
