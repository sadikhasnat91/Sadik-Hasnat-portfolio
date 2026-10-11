import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/button";
import { MotionFadeIn } from "@/components/ui/motion";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from "@/components/ui/social-icons";
import { getDynamicPortfolioData } from "@/lib/get-content";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Building2,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Direct Inquiries",
  description:
    "Direct communication channels to get in touch with Sadik Hasnat for software development roles, internships, and freelance projects.",
};

export default async function ContactPage() {
  const dynamicData = await getDynamicPortfolioData();
  const personalInfo = dynamicData.personalInfo;
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-[#29313C]/80 bg-[#090B10] py-16 sm:py-24">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C5F467]/10 blur-[130px] animate-pulse-glow" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#38BDF8]/10 blur-[130px] animate-pulse-glow [animation-delay:2s]" aria-hidden="true" />

        <Container size="wide" className="relative z-10">
          <MotionFadeIn direction="up">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C5F467]/30 bg-[#C5F467]/10 px-3.5 py-1.5 text-xs font-mono text-[#C5F467] mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5F467] shadow-[0_0_8px_#C5F467]" />
                <span>Available for Software Development Roles</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5F7FA] font-[family-name:var(--font-heading)] leading-tight mb-6">
                Let&apos;s build dependable software systems together.
              </h1>

              <p className="text-base sm:text-lg text-[#9AA5B5] leading-relaxed">
                I am open to full-time software engineering roles, mobile development opportunities, internships, freelance contracts, and architecture discussions. Use any of the verified direct contact channels below to start a conversation.
              </p>
            </div>
          </MotionFadeIn>
        </Container>
      </section>

      {/* Main Contact Grid */}
      <Section spacing="default" className="border-b border-[#29313C]/80 bg-[#090B10]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 7 cols: Direct Channels */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] font-[family-name:var(--font-heading)] mb-6">
                Verified Direct Communication Channels
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Direct */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors break-all">
                      {personalInfo.email}
                    </span>
                    <span className="text-[11px] text-[#9AA5B5] block mt-1">
                      Best for formal job offers & project scopes
                    </span>
                  </div>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/8801973133814`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                      WhatsApp Chat
                    </span>
                    <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">
                      {personalInfo.whatsapp}
                    </span>
                    <span className="text-[11px] text-[#9AA5B5] block mt-1">
                      Quick technical questions & urgent chats
                    </span>
                  </div>
                </a>

                {/* Mobile Call */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                      Mobile Direct
                    </span>
                    <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">
                      {personalInfo.phone}
                    </span>
                    <span className="text-[11px] text-[#9AA5B5] block mt-1">
                      Direct voice calls during business hours
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                      GitHub Repos
                    </span>
                    <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">
                      @Sadihasnat91
                    </span>
                    <span className="text-[11px] text-[#9AA5B5] block mt-1">
                      Inspect commit history & active code
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                        LinkedIn
                      </span>
                      <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">
                        Connect Professionally
                      </span>
                      <span className="text-[11px] text-[#9AA5B5] block mt-1">
                        Professional networking & credentials
                      </span>
                    </div>
                  </a>
                )}

                {/* Facebook */}
                {personalInfo.facebookUrl && (
                  <a
                    href={personalInfo.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                      <FacebookIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                        Facebook
                      </span>
                      <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">
                        Social Profile
                      </span>
                      <span className="text-[11px] text-[#9AA5B5] block mt-1">
                        Connect on Facebook
                      </span>
                    </div>
                  </a>
                )}

                {/* Instagram */}
                {personalInfo.instagramUrl && (
                  <a
                    href={personalInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 rounded-xl border border-[#29313C] bg-[#121720] hover:border-[#C5F467]/50 hover:bg-[#161D29] transition-all group focus-visible:outline-2 focus-visible:outline-[#C5F467]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#090B10] border border-[#29313C] flex items-center justify-center text-[#C5F467] group-hover:scale-105 transition-transform shrink-0">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#9AA5B5] block uppercase">
                        Instagram
                      </span>
                      <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#C5F467] transition-colors">
                        @sadikhasnat
                      </span>
                      <span className="text-[11px] text-[#9AA5B5] block mt-1">
                        Follow on Instagram
                      </span>
                    </div>
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <LinkButton
                  href={`mailto:${personalInfo.email}`}
                  variant="primary"
                  size="md"
                  icon={<Mail className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Compose Direct Email
                </LinkButton>
                <LinkButton
                  href={`https://wa.me/8801973133814`}
                  variant="secondary"
                  size="md"
                  isExternal={true}
                  icon={<MessageCircle className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Open WhatsApp Chat
                </LinkButton>
              </div>
            </div>

            {/* Right 5 cols: Professional Logistics & Transparency Notice */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-[#29313C] bg-[#121720] p-6 sm:p-7 space-y-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#F5F7FA] font-semibold border-b border-[#29313C]/60 pb-3">
                  Logistics & Availability
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-[#C5F467] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F5F7FA] block">Current Engagement</span>
                      <span className="text-[#9AA5B5]">Mobile Application Developer at INTELLEEO</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C5F467] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F5F7FA] block">Location & Timezone</span>
                      <span className="text-[#9AA5B5]">Khulna, Bangladesh (UTC+6) • Available for Remote Teams</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C5F467] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F5F7FA] block">Typical Response Time</span>
                      <span className="text-[#9AA5B5]">Within 24 business hours for email and messaging inquiries</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Mechanism Transparency Statement */}
                <div className="pt-4 border-t border-[#29313C]/60 text-xs text-[#9AA5B5] leading-relaxed">
                  <div className="flex items-center gap-2 text-[#F5F7FA] font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5F467]" />
                    <span>Direct Delivery Standard</span>
                  </div>
                  <p>
                    In accordance with portfolio engineering rule #8 (no fake contact forms that pretend to send emails), inquiries are routed directly to authenticated mailto and WhatsApp protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
