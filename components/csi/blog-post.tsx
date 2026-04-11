"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  getAllBlogPosts,
} from "@/lib/blog";
import BlogCard from "./blog-card";
import type { BlogPost, BlogMeta } from "@/lib/blog";

interface BlogPostProps {
  slug: string;
}

export default function BlogPostView({ slug }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogMeta[]>([]);
  const [allPosts, setAllPosts] = useState<BlogMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const [blogPost, related, posts] = await Promise.all([
          getBlogPostBySlug(slug),
          getRelatedPosts(slug, 3),
          getAllBlogPosts(),
        ]);

        if (!blogPost) {
          setError("Post not found");
          return;
        }

        setPost(blogPost);
        setRelatedPosts(related);
        setAllPosts(posts);
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const share = (platform: "twitter" | "linkedin" | "email" | "copy") => {
    if (!post) return;

    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/#blog/${slug}`;
    const title = post.title;
    const text = `Check out this article: ${title}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank",
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + url)}`,
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
  };

  if (isLoading) {
    return (
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-slate-400">
          Loading post...
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-white">Post Not Found</h1>
          <p className="mb-6 text-slate-400">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="#blog"
            className="inline-block px-6 py-2 rounded bg-accent text-slate-900 font-medium hover:bg-accent/90"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Featured Image */}
          {post.image && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Meta */}
          <div className="mb-4 flex items-center justify-between flex-wrap gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-4">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-white">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-6 text-lg text-slate-300">{post.excerpt}</p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-1 bg-accent/10 text-sm font-medium text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.section>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex items-center gap-4 pb-8 border-b border-white/10"
        >
          <span className="text-sm text-slate-400">Share:</span>
          <button
            onClick={() => share("twitter")}
            className="p-2 rounded hover:bg-white/10 text-accent hover:text-accent/80 transition-colors"
            title="Share on Twitter"
          >
            𝕏
          </button>
          <button
            onClick={() => share("linkedin")}
            className="p-2 rounded hover:bg-white/10 text-accent hover:text-accent/80 transition-colors"
            title="Share on LinkedIn"
          >
            in
          </button>
          <button
            onClick={() => share("email")}
            className="p-2 rounded hover:bg-white/10 text-accent hover:text-accent/80 transition-colors"
            title="Share via Email"
          >
            ✉️
          </button>
          <button
            onClick={() => share("copy")}
            className="p-2 rounded hover:bg-white/10 text-accent hover:text-accent/80 transition-colors"
            title="Copy Link"
          >
            🔗
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none mb-12"
        >
          <MDXRemote source={post.content} />
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 rounded-lg border border-border bg-card p-6"
        >
          <h3 className="mb-2 text-lg font-semibold text-white">
            About the Author
          </h3>
          <p className="text-slate-300">
            {post.author} is part of the CSI Smart Tech team, bringing expertise
            and insights to the industry.
          </p>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="mb-8 text-2xl font-bold text-white">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} {...relatedPost} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <Link
            href="#blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            ← Back to Blog
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
