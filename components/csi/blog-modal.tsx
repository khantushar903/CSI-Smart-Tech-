"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, User, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContentRenderer } from "./content-renderer";
import type { BlogPost } from "@/lib/blog";

interface BlogModalProps {
  open: boolean;
  slug: string | null;
  onOpenChange: (open: boolean) => void;
}

export function BlogModal({ open, slug, onOpenChange }: BlogModalProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !slug) {
      return;
    }

    const controller = new AbortController();

    const loadPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/blog/${slug}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load blog post");
        }

        const data = (await response.json()) as BlogPost;
        setPost(data);
      } catch (loadError) {
        if ((loadError as Error).name !== "AbortError") {
          console.error("Failed to load blog post:", loadError);
          setError("We could not load this article right now.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();

    return () => {
      controller.abort();
    };
  }, [open, slug]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) {
      setPost(null);
      setError(null);
      setIsLoading(false);
    }
  }, [open]);

  const formattedDate = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95">
        <DialogHeader className="space-y-4 text-left">
          <div className="space-y-3">
            <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
              {isLoading
                ? "Loading article"
                : error
                  ? "Article unavailable"
                  : (post?.title ?? "Article")}
            </DialogTitle>
            {post && !isLoading && !error && (
              <DialogDescription className="text-base text-muted-foreground">
                {post.excerpt}
              </DialogDescription>
            )}
          </div>

          {post && !isLoading && !error && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>
          )}
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading article...
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              Article unavailable
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : post ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {post.image && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <ContentRenderer content={post.content} className="pt-2" />
          </motion.div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
