# CSI Smart Tech Website

A production-ready, animated marketing website for CSI Smart Tech built with Next.js App Router, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

This project focuses on modern presentation, strong visual storytelling, and content-driven growth through:

- A section-based landing page with smooth in-page navigation
- Blog content sourced from MDX files
- Newsletter content sourced from JSON
- Modal-first reading experiences for blog posts and newsletters
- Contact and newsletter forms powered by server-side Resend API routes
- Production analytics through Vercel Analytics

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Content Management Guide](#content-management-guide)
- [API Reference](#api-reference)
- [Analytics and Event Tracking](#analytics-and-event-tracking)
- [Styling and Motion System](#styling-and-motion-system)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Operational Notes](#operational-notes)

## Project Overview

The site is implemented as a single-page experience in the Next.js App Router with reusable section components:

- Hero
- About
- Solutions
- Capabilities
- Industries
- Why CSI
- Future Services
- Call to Action / Contact
- FAQ
- Blog
- Newsletter
- Footer

Blog and newsletter items open in modal dialogs, preserving browsing context while allowing users to read complete content.

## Core Features

### 1) Section-based landing experience

- Rich visual sections assembled in `app/page.tsx`
- Anchor-based navigation managed by a smooth scrolling provider
- Mobile and desktop navigation variants with animated transitions

### 2) Content-driven blog

- Blog posts stored as MDX files under `content/blog`
- Metadata parsing using `gray-matter`
- Search and tag filtering in the blog listing UI
- API endpoint for fetching post-by-slug data

### 3) Newsletter hub

- Newsletter entries loaded from `public/data/newsletters.json`
- Modal reader for newsletter detail content
- Newsletter signup form posting to a server API route

### 4) Contact workflow

- Contact form modal with field validation via `react-hook-form`
- Email delivery through Resend using server-side environment variables

### 5) Observability and engagement analytics

- Section visibility tracking
- Generic click tracking for interactive elements
- Events sent using `@vercel/analytics`

## Technology Stack

### Application

- Next.js `16.2.0` (App Router)
- React `19`
- TypeScript `5.7.x`

### UI and interaction

- Tailwind CSS `4.2.x`
- Framer Motion `11.x`
- Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-accordion`)
- Lucide icons

### Data/content

- MDX content parsing with `gray-matter`
- JSON data for newsletters

### Forms and integrations

- `react-hook-form`
- Resend (`resend`)
- Vercel Analytics (`@vercel/analytics`)

### Tooling

- ESLint 9 + `eslint-config-next`
- PostCSS + `@tailwindcss/postcss`
- PNPM lockfile included (`pnpm-lock.yaml`)

## Architecture Overview

### Rendering model

- Mixed Server/Client Component architecture
- Server-side content loading for blog indexing and metadata extraction
- Client-side interactivity for filtering, animations, and modal state

### Main flow

1. `app/layout.tsx` sets global styles, fonts, analytics hooks, and smooth scroll provider.
2. `app/page.tsx` composes the full landing page sections.
3. Blog metadata is read from MDX files via utilities in `lib/blog.ts`.
4. `app/api/blog/[slug]/route.ts` returns a post payload for modal consumption.
5. Newsletter data is fetched client-side from `public/data/newsletters.json`.
6. Contact and newsletter forms post to server API routes and are delivered via Resend.

### Important config behavior

- `next.config.mjs` currently sets `typescript.ignoreBuildErrors: true`.
- `next.config.mjs` currently sets `images.unoptimized: true`.

These settings can be useful for rapid iteration, but see Operational Notes for production recommendations.

## Project Structure

```text
app/
  api/blog/[slug]/route.ts      # Blog post API endpoint
  api/contact/route.ts          # Contact form submission endpoint
  api/newsletter/route.ts       # Newsletter submission endpoint
  layout.tsx                    # Global shell, analytics, providers
  page.tsx                      # Main one-page app composition
  globals.css                   # Theme tokens and global styles

components/
  csi/                          # Domain-specific website sections and modals
    hero.tsx                    # Memoized hero section with neural field animation
    navbar.tsx                  # Memoized navigation with debounced scroll tracking
    contact-form-modal.tsx      # Memoized contact form with accessibility improvements
    newsletter-form.tsx         # Memoized newsletter form with ARIA labels
    ...                         # Other section components
  ui/                           # Reusable UI primitives and effects
    motion-context.tsx          # Motion preference context for a11y
    ...                         # Other UI components

content/
  blog/*.mdx                    # Blog source content + frontmatter

lib/
  api-utils.ts                  # Shared API validation, rate limiting, HTML escaping
  blog.ts                       # Blog indexing, filtering, search helpers
  utils.ts                      # Utility helpers
  hooks/
    useScrollProgress.ts        # Debounced scroll progress tracking hook
    useDebounce.ts              # Reusable debounce hook
    index.ts                    # Barrel export for hooks

public/
  data/newsletters.json         # Newsletter content source
  images/                       # Static imagery

scripts/                        # Reserved (currently empty)
```

## Getting Started

### Prerequisites

- Node.js 20 LTS or newer
- PNPM (recommended, lockfile is PNPM)

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment variables

Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

macOS/Linux:

```bash
cp .env.local.example .env.local
```

Then fill values in `.env.local`.

### 3) Start local development

```bash
pnpm dev
```

Application will be available at `http://localhost:3000`.

## Environment Variables

Values are expected in `.env.local` and read server-side by API routes.

| Variable                | Required | Purpose                                 |
| ----------------------- | -------- | --------------------------------------- |
| `RESEND_API_KEY`        | Yes      | Resend API key for sending emails       |
| `CONTACT_FROM_EMAIL`    | Optional | Sender identity for contact submissions |
| `CONTACT_TO_EMAIL`      | Optional | Recipient email for contact submissions |
| `NEWSLETTER_FROM_EMAIL` | Optional | Sender identity for newsletter submits  |
| `NEWSLETTER_TO_EMAIL`   | Optional | Recipient email for newsletter submits  |

If `RESEND_API_KEY` is missing, contact/newsletter submission will fail gracefully in UI.

## Available Scripts

| Script      | Command      | Description                    |
| ----------- | ------------ | ------------------------------ |
| Development | `pnpm dev`   | Starts Next.js dev server      |
| Build       | `pnpm build` | Creates production build       |
| Start       | `pnpm start` | Runs production server         |
| Lint        | `pnpm lint`  | Runs ESLint across the project |

## Content Management Guide

### Blog posts (MDX)

Location: `content/blog/*.mdx`

Each post should include frontmatter like:

```mdx
---
title: "Post Title"
date: "2026-04-18"
author: "CSI Team"
tags: ["AI", "Operations"]
excerpt: "Short summary for cards and previews"
image: "https://example.com/cover-image.jpg"
---

Post content starts here...
```

Supported behavior:

- Posts are sorted by date (newest first)
- Tags are aggregated for filters
- Search checks title, excerpt, tags, and author
- Slug is derived from file name

### Newsletters (JSON)

Location: `public/data/newsletters.json`

Each entry follows this shape:

```json
{
  "id": "nl-2026-04",
  "title": "April 2026: Operational AI Update",
  "excerpt": "Summary shown on newsletter cards",
  "date": "2026-04-18",
  "link": "#newsletter/april-2026",
  "content": "Long-form newsletter body in markdown-like plain text"
}
```

## API Reference

### `GET /api/blog/[slug]`

Returns a blog post payload for modal rendering.

#### Success response (200)

```json
{
  "title": "The Future of AI in Smart Tech",
  "date": "2024-04-10",
  "author": "CSI Team",
  "tags": ["AI", "Technology", "Innovation"],
  "excerpt": "Exploring how artificial intelligence...",
  "image": "https://...",
  "slug": "the-future-of-ai-in-smart-tech",
  "content": "Full markdown content..."
}
```

#### Not found response (404)

```json
{
  "error": "Blog post not found"
}
```

## Analytics and Event Tracking

`components/csi/site-insights.tsx` tracks interactions in production mode:

- `section_view`: fired when content sections enter viewport threshold
- `ui_click`: fired for tracked interactive targets

Tracking is intentionally disabled outside production (`NODE_ENV !== "production"`).

## Styling and Motion System

### Styling

- Global tokens and design system variables are defined in `app/globals.css`
- Tailwind CSS v4 with CSS variables and utility-first styling
- Shadcn-compatible component setup via `components.json`

### Motion and UX behavior

- Framer Motion used for section reveals, card interactions, and modal transitions
- Lenis-based smooth scrolling provider for anchor navigation
- Scroll lock utility coordinates modal open/close behavior and body scroll state
- Respects `prefers-reduced-motion` CSS media query for accessibility

## Best Practices and Accessibility

### Performance Optimizations

- **Component Memoization**: Key components (Hero, Navbar, Modals, Forms) use React.memo() to prevent unnecessary re-renders
- **Debounced Scroll Listeners**: Scroll events debounced with 30-50ms delays for smooth 60+ FPS scrolling
- **Passive Event Listeners**: All scroll/resize listeners use `{ passive: true }` flag
- **Image Optimization**: Next.js Image component with responsive sizes prop for optimal Core Web Vitals
- **Proper Cleanup**: All useEffect hooks properly clean up timeouts and event listeners

### Accessibility (A11y)

- **ARIA Labels**: All interactive elements and icons have proper `aria-label` attributes
- **Screen Reader Support**: Decorative icons marked with `aria-hidden="true"`, semantic content properly labeled
- **Form Accessibility**: Form fields linked to labels via `htmlFor`, required fields indicated with `aria-label="required"`
- **Status Messages**: Success/error feedback uses proper `role="status"` and `aria-live` regions
- **Semantic HTML**: Modal dialogs use Radix Dialog, global error page uses semantic elements (`<main>`, `<article>`)
- **Keyboard Navigation**: Mobile navigation with `aria-expanded` and `aria-controls` for keyboard users

### Code Quality

- **Shared Utilities**: Common API logic extracted to `lib/api-utils.ts` to eliminate duplication
- **Custom Hooks**: Reusable hooks in `lib/hooks/` for scroll tracking and debouncing
- **Proper Error Handling**: Enhanced global error handler with accessible error messages
- **Type Safety**: TypeScript strict mode enabled throughout codebase

## Deployment Guide

### Build and run locally (production mode)

```bash
pnpm build
pnpm start
```

### Recommended hosting

Vercel is the most direct hosting target for this Next.js app.

Deployment checklist:

1. Set all Resend environment variables in host settings.
2. Run lint and production build in CI.
3. Verify modal workflows and contact/newsletter submissions after deploy.
4. Validate analytics events in production.

## Troubleshooting

### Contact/newsletter forms do not send

- Confirm `RESEND_API_KEY` exists in `.env.local` (local) or host env settings (production).
- Ensure sender/recipient addresses are valid and your sender domain is configured in Resend.

### Blog modal shows "Article unavailable"

- Confirm the slug exists as a matching `.mdx` filename in `content/blog`.
- Check frontmatter formatting and file readability.

### Anchor navigation seems offset

- Header height is accounted for by CSS variable `--header-offset` and smooth scroll logic.
- Verify navbar is present and not overridden by custom layout edits.

### Type errors in build

- TypeScript strict mode is now enabled. Run `tsc --noEmit` to check for type errors.
- All type errors should be fixed before deployment to maintain code quality.

## Operational Notes

### Configuration Status

- ✅ **TypeScript strict mode enabled**: Type checking is active throughout the codebase
- ✅ **Image optimization enabled**: Proper responsive image sizing configured with quality levels [100, 75]
- ✅ **Accessibility improved**: ARIA labels, semantic HTML, and keyboard navigation added
- ✅ **Performance optimized**: Component memoization and debounced event listeners implemented

### Development Guidelines

- `.gitignore` excludes `.env*.local`, `.next/`, and `node_modules`.
- `scripts/` directory is currently empty and available for future automation scripts.
- When adding new API routes, use utilities from `lib/api-utils.ts` for validation and rate limiting
- When adding scroll-dependent features, use `useScrollProgress` hook from `lib/hooks/`
- Always wrap new components that don't depend on frequently changing props with `React.memo()`

---

For business inquiries: `info@csi-enc.com`
