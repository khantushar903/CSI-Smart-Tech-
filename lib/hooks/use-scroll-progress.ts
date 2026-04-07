"use client";

import { useEffect, useState, useCallback } from "react";

interface ScrollProgress {
  scrollY: number;
  scrollProgress: number;
  direction: "up" | "down";
}

export function useScrollProgress() {
  const [progress, setProgress] = useState<ScrollProgress>({
    scrollY: 0,
    scrollProgress: 0,
    direction: "down",
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / documentHeight, 1);

    setProgress((prev) => ({
      scrollY,
      scrollProgress,
      direction: scrollY > prev.scrollY ? "down" : "up",
    }));
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return progress;
}
