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

    const getNavbarHeight = () => {
      const header = document.querySelector(
        "[data-site-header='true']",
      ) as HTMLElement | null;
      if (header) {
        return header.offsetHeight;
      }

      return window.innerWidth >= 1024 ? 80 : 64;
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href) {
        return;
      }

      event.preventDefault();

      if (href === "#") {
        lenis.scrollTo(0, {
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      }

      const section = document.querySelector(href);
      if (!section) {
        return;
      }

      const navbarHeight = getNavbarHeight();
      const targetPosition =
        section.getBoundingClientRect().top + window.scrollY - navbarHeight;

      lenis.scrollTo(targetPosition, {
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    // Delegate hash-link handling so dynamically rendered menu links also scroll correctly.
    document.addEventListener("click", handleDocumentClick);

    // Optimized animation frame loop with RAF
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
