import React from "react";

import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24 sm:py-32">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#121720] border border-[#29313C] flex items-center justify-center text-[#C5F467] mb-6">
            <Compass className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-wider text-[#C5F467] font-semibold mb-2">
            Error 404
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-4">
            Page or Case Study Not Found
          </h1>

          <p className="text-base text-[#9AA5B5] max-w-md leading-relaxed mb-8">
            The path you requested does not exist, has been archived, or refers to an unverified project slug.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <LinkButton
              href="/"
              variant="primary"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Return Home
            </LinkButton>
            <LinkButton href="/projects" variant="secondary" size="md">
              View Verified Projects
            </LinkButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
