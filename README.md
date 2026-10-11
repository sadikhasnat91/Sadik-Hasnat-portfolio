# Sadik Hasnat — Software Engineer Portfolio

A premium, production-grade developer portfolio for **Sadik Hasnat**, engineered with the **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Turbopack**. Designed with a dark editorial aesthetic, strict typography hierarchy, accessible focus states, and verifiable project case studies.

---

## 🚀 Live Production Website
- **Production URL**: [https://sadikhasnat.vercel.app](https://sadikhasnat.vercel.app) *(or your connected custom domain)*
- **GitHub Profile**: [https://github.com/Sadihasnat91](https://github.com/Sadihasnat91)

---

## 🛠️ Technology Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack, Partial Prerendering, Cache Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org) (Strict type checking, zero implicit `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with curated dark editorial design tokens
- **Icons**: [Lucide React](https://lucide.dev) & bespoke SVG icons
- **Animations**: [Motion for React](https://motion.dev) with full `prefers-reduced-motion` suppression
- **SEO & Social**: Programmatic dynamic `sitemap.xml`, `robots.txt`, OpenGraph metadata, and semantic HTML5

---

## 🎨 Design Tokens

- **Background**: `#090B10`
- **Surface**: `#121720` (Subtle: `#0D1117`, Elevated: `#161D29`)
- **Borders**: `#29313C` (Hover: `#3E4B5B`)
- **Accent**: `#C5F467`
- **Primary Text**: `#F5F7FA`
- **Secondary Text**: `#9AA5B5`
- **Typography**: Space Grotesk (headings) & Inter (body text) via `next/font/google`

---

## 📁 Repository Structure

```text
├── app/
│   ├── about/page.tsx             # Dedicated About & Experience view
│   ├── contact/page.tsx           # Direct verified contact channels
│   ├── projects/
│   │   ├── page.tsx               # Projects & Case Studies grid
│   │   └── [slug]/page.tsx        # Dynamic individual project case study template
│   ├── globals.css                # CSS variables, tokens, focus rings & scrollbars
│   ├── layout.tsx                 # Root layout, fonts, skip-to-content, metadata
│   ├── not-found.tsx              # Custom accessible 404 page
│   ├── page.tsx                   # Editorial homepage with all core sections
│   ├── robots.ts                  # Programmatic robots.txt
│   └── sitemap.ts                 # Programmatic sitemap.xml
├── components/
│   ├── layout/
│   │   ├── container.tsx          # Standardized responsive container wrapper
│   │   ├── section.tsx            # Semantic section with rhythmic spacing
│   │   ├── site-header.tsx        # Responsive header with accessible mobile drawer
│   │   └── site-footer.tsx        # Footer with direct links & copyright
│   └── ui/
│       ├── button.tsx             # Accessible Button and LinkButton components
│       ├── feedback-states.tsx    # Loading, Empty, and Error states
│       ├── motion.tsx             # Reduced-motion compliant animation wrappers
│       ├── project-card.tsx       # Reusable project card with status indicators
│       ├── section-heading.tsx    # Typographic section lockup
│       ├── social-icons.tsx       # GitHub and LinkedIn SVG components
│       └── tech-tag.tsx           # Monospace technology badge component
├── data/
│   └── portfolio-data.ts          # Strictly verified profile, experience, and project data
├── types/
│   └── index.ts                   # Strongly typed data models
├── public/                        # Static assets (profile image, icons)
├── package.json
└── tsconfig.json
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm 9+

### 2. Clone & Install
```bash
git clone https://github.com/Sadihasnat91/sadik_portfolio.git
cd sadik_portfolio
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Quality Assurance & Build Commands

- **Type Checking**:
  ```bash
  npx tsc --noEmit
  ```
- **Linting**:
  ```bash
  npm run lint
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## 🚢 Deploying to Vercel

### Option 1: Git Integration (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete production portfolio"
   git branch -M main
   git remote add origin https://github.com/Sadihasnat91/sadik_portfolio.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `sadik_portfolio` repository.
4. Framework preset will automatically detect **Next.js**.
5. Click **"Deploy"**. The site will build and publish automatically with zero configuration required.

### Option 2: Vercel CLI
```bash
npx vercel
```
Follow the interactive prompts to link and deploy to your personal Vercel team.

---

## 🔒 Content Verification & Non-Deceptive Ethics

All projects, experience, educational history, and capabilities reflect genuine, verifiable records from Sadik Hasnat's active codebases and documents. No customer metrics, user counts, client quotes, or fake contact form submissions are fabricated.
