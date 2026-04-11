"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  author,
  tags,
  image,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 h-full"
    >
      <a href={`#blog/${slug}`} className="flex flex-col h-full">
        {/* Featured Image */}
        {image && (
          <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/20 to-accent/20">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/40 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col grow p-6">
          {/* Meta */}
          <div className="mb-3 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{formattedDate}</span>
            <span className="text-muted-foreground">By {author}</span>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 grow text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 bg-accent/10 text-xs font-medium text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <motion.div
            className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent/80"
            whileHover={{ x: 4 }}
          >
            Read Article
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.div>
        </div>
      </a>
    </motion.article>
  );
}
