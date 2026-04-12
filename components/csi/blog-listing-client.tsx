"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBlogPostsByTag, searchBlogPosts } from "@/lib/blog";
import { SECTION_EASE, SECTION_TIMING } from "./motion-presets";
import BlogCard from "./blog-card";
import { BlogModal } from "./blog-modal";
import type { BlogMeta } from "@/lib/blog";

interface BlogListingClientProps {
  initialPosts: BlogMeta[];
  initialTags: string[];
}

export default function BlogListingClient({
  initialPosts,
  initialTags,
}: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogMeta[]>(initialPosts);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // Update filtered posts when search query or tag changes
  useEffect(() => {
    const updatePosts = async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const results = await searchBlogPosts(searchQuery);
        setFilteredPosts(results);
      } else if (selectedTag) {
        setIsSearching(false);
        const results = await getBlogPostsByTag(selectedTag);
        setFilteredPosts(results);
      } else {
        setIsSearching(false);
        setFilteredPosts(initialPosts);
      }
    };

    updatePosts();
  }, [searchQuery, selectedTag, initialPosts]);

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSelectedTag(null);
    }
  };

  const handleReadArticle = (slug: string) => {
    setSelectedSlug(slug);
    setIsBlogModalOpen(true);
  };

  const handleBlogModalOpenChange = (open: boolean) => {
    setIsBlogModalOpen(open);
    if (!open) {
      setSelectedSlug(null);
    }
  };

  return (
    <section id="blog" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="mb-4 text-sm uppercase tracking-widest text-accent font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Insights & Articles
          </motion.p>
          <motion.h2
            className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Our Blog
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Explore the latest insights, trends, and expertise from the CSI
            Smart Tech team
          </motion.p>
        </motion.div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search posts by title, author, or tags..."
            className="w-full px-4 py-3 rounded-lg bg-input border border-input text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Tag Filter */}
        {initialTags && initialTags.length > 0 && !searchQuery && (
          <div className="mb-10 flex flex-wrap gap-3">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-card/80 border border-border"
              }`}
            >
              All Posts
            </button>
            {initialTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-card/80 border border-border"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.15 }}
              >
                <BlogCard {...post} onReadClick={handleReadArticle} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No blog posts found</p>
            <p className="text-sm mt-2">Try a different search or tag</p>
          </div>
        )}

        <BlogModal
          open={isBlogModalOpen}
          slug={selectedSlug}
          onOpenChange={handleBlogModalOpenChange}
        />
      </div>
    </section>
  );
}
