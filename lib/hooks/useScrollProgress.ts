import { useState, useEffect } from "react";

/**
 * Hook to track scroll position and calculate progress
 * Debounced for performance
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const windowHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = windowHeight > 0 ? lastScrollY / windowHeight : 0;
        setProgress(scrolled);
        setIsScrolled(lastScrollY > 50);
      }, 30); // Debounce with 30ms delay for smooth performance
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { progress, isScrolled };
}
