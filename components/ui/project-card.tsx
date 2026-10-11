"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./social-icons";
import { ProjectDetailData } from "@/types";
import { TechTag } from "./tech-tag";

interface ProjectCardProps {
  project: ProjectDetailData;
  className?: string;
  isDetailed?: boolean;
}

const statusBadgeConfig = {
  production: {
    label: "Production",
    dotClass: "bg-[#C5F467] shadow-[0_0_8px_#C5F467]",
    borderClass: "border-[#C5F467]/30 text-[#C5F467] bg-[#C5F467]/10",
  },
  "open-source": {
    label: "Open Source",
    dotClass: "bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]",
    borderClass: "border-[#60A5FA]/30 text-[#60A5FA] bg-[#60A5FA]/10",
  },
  "in-development": {
    label: "Active R&D",
    dotClass: "bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]",
    borderClass: "border-[#F59E0B]/30 text-[#F59E0B] bg-[#F59E0B]/10",
  },
  planned: {
    label: "Planned",
    dotClass: "bg-[#9AA5B5]",
    borderClass: "border-[#9AA5B5]/30 text-[#9AA5B5] bg-[#9AA5B5]/10",
  },
};

export function ProjectCard({
  project,
  className = "",
  isDetailed = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const statusInfo = statusBadgeConfig[project.status] || {
    label: project.status,
    dotClass: "bg-gray-400",
    borderClass: "border-gray-500/30 text-gray-300 bg-gray-500/10",
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between rounded-xl border border-[#29313C] bg-[#121720] p-4 sm:p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C5F467]/40 hover:bg-[#151B26] hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.8),0_0_24px_-4px_rgba(197,244,103,0.12)] focus-within:border-[#C5F467]/60 overflow-hidden ${className}`}
    >
      {/* Interactive spotlight glow following mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 244, 103, 0.09), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header row: category, status, links */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-wider text-[#9AA5B5]">
              {project.category}
            </span>
            <span className="text-[#29313C]" aria-hidden="true">
              •
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono border ${statusInfo.borderClass}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`}
                aria-hidden="true"
              />
              {statusInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {project.links.github && (
              <a
                href={
                  project.links.github.startsWith("http://") || project.links.github.startsWith("https://")
                    ? project.links.github
                    : `https://${project.links.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="p-1.5 text-[#9AA5B5] hover:text-[#F5F7FA] hover:bg-[#29313C]/60 hover:scale-110 active:scale-95 transition-all rounded focus-visible:outline-2 focus-visible:outline-[#C5F467]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.links.liveDemo && (
              <a
                href={
                  project.links.liveDemo.startsWith("http://") || project.links.liveDemo.startsWith("https://")
                    ? project.links.liveDemo
                    : `https://${project.links.liveDemo}`
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live deployment for ${project.title}`}
                className="p-1.5 text-[#9AA5B5] hover:text-[#C5F467] hover:bg-[#29313C]/60 hover:scale-110 active:scale-95 transition-all rounded focus-visible:outline-2 focus-visible:outline-[#C5F467]"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title and Tagline */}
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] group-hover:text-[#C5F467] transition-colors duration-200">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 focus-visible:outline-none"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-40 translate-y-0.5 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 text-[#C5F467]" />
            </Link>
          </h3>
          <p className="text-sm font-medium text-[#C5F467] mt-1 font-mono">
            {project.tagline}
          </p>
        </div>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed mb-5">
          {project.summary}
        </p>

        {/* Detailed verification view if requested */}
        {isDetailed && (
          <div className="mb-5 space-y-3 pt-3 border-t border-[#29313C]/60 text-xs">
            <div>
              <span className="font-semibold text-[#F5F7FA] block mb-1">
                Verified Problem:
              </span>
              <p className="text-[#9AA5B5]">{project.verifiedProblem}</p>
            </div>
            <div>
              <span className="font-semibold text-[#F5F7FA] block mb-1">
                Engineering Solution:
              </span>
              <p className="text-[#9AA5B5]">{project.verifiedSolution}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer: Tech Stack Badges */}
      <div className="relative z-10 pt-4 border-t border-[#29313C]/60 flex flex-wrap gap-1.5 items-center">
        {project.techStack.core.map((tech) => (
          <TechTag key={tech} label={tech} size="sm" variant="default" />
        ))}
        {project.techStack.secondary?.slice(0, 2).map((tech) => (
          <TechTag key={tech} label={tech} size="sm" variant="subtle" />
        ))}
      </div>
    </article>
  );
}
