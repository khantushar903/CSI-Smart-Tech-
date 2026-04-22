# CSI Smart Tech Website

A production-ready, animated marketing website for CSI Smart Tech built with Next.js App Router, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

This project focuses on modern presentation, strong visual storytelling, and content-driven growth through:

- A section-based landing page with smooth in-page navigation
- Blog content sourced from MDX files
- Newsletter content sourced from JSON
- Modal-first reading experiences for blog posts and newsletters
- Contact and newsletter forms powered by EmailJS
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
- Newsletter signup form integrated with EmailJS

### 4) Contact workflow

- Contact form modal with field validation via `react-hook-form`
- Email delivery through EmailJS using public runtime environment variables

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
- EmailJS (`@emailjs/browser`)
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
6. Contact and newsletter forms send data via EmailJS.

### Important config behavior

- `next.config.mjs` currently sets `typescript.ignoreBuildErrors: true`.
- `next.config.mjs` currently sets `images.unoptimized: true`.

These settings can be useful for rapid iteration, but see Operational Notes for production recommendations.

## Project Structure

```text
app/
  api/blog/[slug]/route.ts      # Blog post API endpoint
  layout.tsx                    # Global shell, analytics, providers
  page.tsx                      # Main one-page app composition
  globals.css                   # Theme tokens and global styles

components/
  csi/                          # Domain-specific website sections and modals
  ui/                           # Reusable UI primitives and effects

content/
  blog/*.mdx                    # Blog source content + frontmatter

lib/
  blog.ts                       # Blog indexing, filtering, search helpers
  utils.ts                      # Utility helpers
  hooks/                        # Shared custom hooks

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

Values are expected in `.env.local` and exposed to the client with the `NEXT_PUBLIC_` prefix.

| Variable                          | Required        | Purpose                     |
| --------------------------------- | --------------- | --------------------------- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID`  | Yes (for forms) | EmailJS service identifier  |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Yes (for forms) | EmailJS template identifier |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`  | Yes (for forms) | EmailJS public API key      |

If these are missing, contact/newsletter submission will fail gracefully in UI.

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

## Deployment Guide

### Build and run locally (production mode)

```bash
pnpm build
pnpm start
```

### Recommended hosting

Vercel is the most direct hosting target for this Next.js app.

Deployment checklist:

1. Set all EmailJS environment variables in host settings.
2. Run lint and production build in CI.
3. Verify modal workflows and contact/newsletter submissions after deploy.
4. Validate analytics events in production.

## Troubleshooting

### Contact/newsletter forms do not send

- Confirm EmailJS variables exist in `.env.local` (local) or host env settings (production).
- Ensure EmailJS service/template/key values are correct and active.

### Blog modal shows "Article unavailable"

- Confirm the slug exists as a matching `.mdx` filename in `content/blog`.
- Check frontmatter formatting and file readability.

### Anchor navigation seems offset

- Header height is accounted for by CSS variable `--header-offset` and smooth scroll logic.
- Verify navbar is present and not overridden by custom layout edits.

### Build passes despite type issues

- Current config ignores TypeScript build errors (`typescript.ignoreBuildErrors: true`).
- Consider turning this off before strict production release workflows.

## Operational Notes

- `.gitignore` excludes `.env*.local`, `.next/`, and `node_modules`.
- `scripts/` directory is currently empty and available for future automation scripts.
- If you plan to enforce stronger release quality, add a dedicated type-check script and disable `ignoreBuildErrors`.

---

For business inquiries: `csismarttech@gmail.com`
