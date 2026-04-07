"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll with optimized settings
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
      autoResize: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Handle anchor links with proper offset
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const href = anchor.getAttribute("href");
        if (href && href !== "#") {
          const target = document.querySelector(href);
          if (target) {
            // Get navbar height dynamically
            const navbarHeight = window.innerWidth >= 1024 ? 96 : 80; // lg:h-20 = 80px, h-16 = 64px + padding
            const targetPosition =
              target.getBoundingClientRect().top +
              window.scrollY -
              navbarHeight;

            lenis.scrollTo(targetPosition, {
              duration: 0.8,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        } else if (href === "#") {
          lenis.scrollTo(0);
        }
      });
    });

    // Optimized animation frame loop with RAF
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
