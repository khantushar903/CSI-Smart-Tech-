"use client";

import { motion } from "framer-motion";
import { CalendarDays, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContentRenderer } from "./content-renderer";
import type { Newsletter } from "./newsletter-types";

interface NewsletterModalProps {
  open: boolean;
  newsletter: Newsletter | null;
  onOpenChange: (open: boolean) => void;
}

export function NewsletterModal({
  open,
  newsletter,
  onOpenChange,
}: NewsletterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95">
        <DialogHeader className="space-y-4 text-left">
          <div className="space-y-3">
            <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
              {newsletter?.title ?? "Newsletter"}
            </DialogTitle>
            {newsletter && (
              <DialogDescription className="text-base text-muted-foreground">
                {newsletter.excerpt}
              </DialogDescription>
            )}
          </div>

          {newsletter && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {new Date(newsletter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {newsletter.link && (
                <a
                  href={newsletter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open source link
                </a>
              )}
            </div>
          )}
        </DialogHeader>

        {newsletter ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <ContentRenderer content={newsletter.content} className="pt-2" />
          </motion.div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
