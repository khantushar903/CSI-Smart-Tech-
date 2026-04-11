# Newsletter & Blog Implementation Guide

## Overview

Added complete newsletter and blog functionality to the CSI Smart Tech website. Both sections integrate seamlessly into the single-page layout with anchor navigation.

## Newsletter Features

### Components

- **`newsletter.tsx`** - Main newsletter section with signup form and featured newsletters
- **`newsletter-form.tsx`** - Full form with validation (name, email)
- **`newsletter-card.tsx`** - Featured newsletter display cards
- **`newsletter-footer.tsx`** - Lightweight email-only signup for footer

### Data

- Newsletter archive stored in `public/data/newsletters.json`
- Add/update newsletters by editing this JSON file

### Configuration

Add these environment variables to `.env.local`:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=your_newsletter_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Usage

- Newsletter section accessible via `#newsletter` anchor
- Footer has integrated newsletter signup
- EmailJS handles all email submissions

---

## Blog Features

### Components

- **`blog-listing.tsx`** - Server component that fetches all posts
- **`blog-listing-client.tsx`** - Client component with filtering and search
- **`blog-card.tsx`** - Individual post preview card
- **`blog-post.tsx`** - Full blog post display with comments, sharing, related posts
- **`blog-search.tsx`** - Client-side search with server-side queries

### Data Structure

Blog posts are stored as MDX files in `content/blog/` with frontmatter:

```mdx
---
title: "Post Title"
date: "2024-04-10"
author: "Author Name"
tags: ["tag1", "tag2"]
excerpt: "Brief description"
image: "/images/blog/post-image.jpg"
---

# Content goes here

This supports **markdown** and even JSX components.
```

### Creating New Posts

1. Create a new `.mdx` file in `content/blog/`
2. Add required frontmatter (title, date, author, tags, excerpt, image)
3. Write content in MDX format
4. Posts automatically appear on the blog listing

### Blog Features

- ✅ Tag-based filtering
- ✅ Full-text search (client-side)
- ✅ Featured images
- ✅ Author information
- ✅ Related posts (matching tags)
- ✅ Social sharing buttons (Twitter, LinkedIn, Email, Copy)
- ✅ Responsive design with animations

### Blog Utilities (`lib/blog.ts`)

Server-side functions for blog data management:

- `getAllBlogPosts()` - Fetch all posts sorted by date
- `getBlogPostBySlug(slug)` - Get single post with content
- `getAllTags()` - Get unique tags from all posts
- `getBlogPostsByTag(tag)` - Filter posts by tag
- `getRelatedPosts(slug, limit)` - Get related posts by matching tags
- `searchBlogPosts(query)` - Search posts by title, excerpt, author, or tags

---

## Navigation Integration

### Updated Components

- **`navbar.tsx`** - Added blog and newsletter anchor links
- **`footer.tsx`** - Added newsletter signup section
- **`app/page.tsx`** - Added blog and newsletter sections

### Anchor Links

Users can navigate to sections via:

- `#blog` - Blog listing page
- `#newsletter` - Newsletter signup section

---

## Sample Content Included

### Blog Posts (5 sample posts)

1. **The Future of AI in Smart Tech** - AI trends and innovation
2. **Digital Transformation: Strategic Imperative** - Business transformation guide
3. **Cloud-Native Architecture: Building for Scale** - Cloud architecture patterns
4. **Data Security Best Practices in 2024** - Security fundamentals
5. **The Rise of Sustainable Technology** - Sustainability in tech

### Newsletter Archive (5 featured newsletters)

- April 2024: AI Innovation & Smart Tech Trends
- March 2024: Digital Transformation Success Stories
- February 2024: Cloud Security & Compliance Updates
- January 2024: Technology Outlook & Strategic Planning
- December 2023: Year-End Tech Summary & Looking Ahead

### Images

Placeholder SVG images created for all blog posts in `public/images/blog/`:

- `ai-future.jpg`
- `digital-transformation.jpg`
- `cloud-native.jpg`
- `data-security.jpg`
- `sustainable-tech.jpg`

---

## Development

### Adding Blog Posts

```bash
# Create new post in content/blog/your-post-slug.mdx
# Add frontmatter and content
# Post automatically appears on blog listing
```

### Testing

```bash
npm run dev
# Visit http://localhost:3000
# Navigate to #blog or #newsletter
```

### Build

```bash
npm run build
# All MDX posts are statically generated at build time
```

---

## Technical Stack

- **next-mdx-remote** - MDX content processing
- **gray-matter** - Frontmatter parsing
- **Framer Motion** - Scroll animations and interactions
- **Tailwind CSS** - Styling
- **EmailJS** - Newsletter email delivery
- **React Hook Form** - Form validation
- **TypeScript** - Type safety

---

## Environment Variables Required

For newsletter functionality to work, configure EmailJS:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=your_newsletter_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

Get these from: https://dashboard.emailjs.com/

---

## Future Enhancements

- [ ] Disqus comments integration for blog posts
- [ ] Blog post canonical URLs
- [ ] XML sitemap generation
- [ ] RSS feed for blog
- [ ] Author pages
- [ ] Blog archive by month/year
- [ ] Newsletter template optimization
- [ ] Email confirmation flow
- [ ] Newsletter unsubscribe page

---

## File Structure

```
content/
  blog/
    *.mdx          # Blog posts

public/
  data/
    newsletters.json

  images/
    blog/
      *.jpg        # Blog post featured images

components/csi/
  blog-listing.tsx
  blog-listing-client.tsx
  blog-card.tsx
  blog-post.tsx
  blog-search.tsx

  newsletter.tsx
  newsletter-form.tsx
  newsletter-card.tsx
  newsletter-footer.tsx

lib/
  blog.ts         # Blog utilities and data functions

app/
  page.tsx        # Updated main page with new sections
```

---

## Notes

- All blog posts are statically generated at build time for optimal performance
- Search is client-side only (no backend required)
- Newsletter uses EmailJS (existing service, no backend needed)
- Feature images should be placed in `public/images/blog/`
- Blog section uses "emerald" tone, Newsletter uses "teal" tone (matching site design)
