"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchBlogPosts } from "@/lib/blog";
import type { BlogMeta } from "@/lib/blog";

interface BlogSearchProps {
  onSearchResults?: (results: BlogMeta[]) => void;
  placeholder?: string;
}

export default function BlogSearch({
  onSearchResults,
  placeholder = "Search posts by title, author, or tags...",
}: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      onSearchResults?.([]);
      return;
    }

    startTransition(async () => {
      try {
        const results = await searchBlogPosts(searchQuery);
        onSearchResults?.(results);
      } catch (error) {
        console.error("Search error:", error);
        onSearchResults?.([]);
      }
    });
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg bg-input border border-input text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        {isPending && (
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⚙️
          </motion.div>
        )}
      </div>
    </div>
  );
}
