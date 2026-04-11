"use client";

import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBlogPostsByTag, searchBlogPosts } from "@/lib/blog";
import BlogCard from "./blog-card";
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

  return (
    <section id="blog" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm uppercase tracking-widest text-accent font-semibold">
            Insights & Articles
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Blog
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore the latest insights, trends, and expertise from the CSI
            Smart Tech team
          </p>
        </div>

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
          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layoutId={post.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: 0 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No blog posts found</p>
            <p className="text-sm mt-2">Try a different search or tag</p>
          </div>
        )}
      </div>
    </section>
  );
}
