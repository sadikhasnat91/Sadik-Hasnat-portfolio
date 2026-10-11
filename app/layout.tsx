import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollProgressBar, BackToTopButton } from "@/components/ui/motion";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#090B10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Sadik Hasnat — Software Engineer",
    default: "Sadik Hasnat — Software Engineer & Product Builder",
  },
  description:
    "Production-grade mobile and full-stack software engineer specializing in Flutter, modern TypeScript web architectures, and high-performance user interfaces.",
  metadataBase: new URL("https://sadikhasnat.vercel.app"),
  openGraph: {
    title: "Sadik Hasnat — Software Engineer & Product Builder",
    description:
      "Engineering disciplined mobile and web products with clean architecture, real-world utility, and meticulous design.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090B10] text-[#F5F7FA]">
        {/* Top interactive glowing scroll indicator */}
        <ScrollProgressBar />

        {/* Skip to main content link for screen reader & keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5F467] focus:text-[#090B10] focus:font-semibold focus:rounded focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        {/* Spring animated floating back to top button */}
        <BackToTopButton />
      </body>
    </html>
  );
}
