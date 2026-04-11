"use client";

import { motion } from "framer-motion";

export interface NewsletterCardProps {
  title: string;
  excerpt: string;
  date: string;
  link?: string;
}

export default function NewsletterCard({
  title,
  excerpt,
  date,
  link,
}: NewsletterCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-r from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-accent">
            {formattedDate}
          </span>
          <div className="h-1 w-8 rounded bg-linear-to-r from-accent to-primary" />
        </div>

        <h3 className="mb-3 text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="mb-4 grow text-sm text-muted-foreground line-clamp-3">
          {excerpt}
        </p>

        {link && (
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            Read Newsletter
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
