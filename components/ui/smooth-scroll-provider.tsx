"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { modalLockEventName } from "@/components/ui/modal-scroll-lock";

export function SmoothScrollProvider() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    const lenis = isTouchDevice
      ? null
      : new Lenis({
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
          infinite: false,
          autoResize: true,
          syncTouch: false,
        });

    lenisRef.current = lenis;

    const syncLenisModalState = () => {
      const count = Number.parseInt(
        document.body.getAttribute("data-modal-lock-count") || "0",
        10,
      );

      if (Number.isFinite(count) && count > 0) {
        lenis?.stop();
      } else {
        lenis?.start();
      }
    };

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
        if (lenis) {
          lenis.scrollTo(0, {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      let section: Element | null = null;
      try {
        section = document.querySelector(href);
      } catch (e) {
        // Invalid selector, silently ignore
        return;
      }

      if (!section) {
        return;
      }

      const navbarHeight = getNavbarHeight();
      const targetPosition =
        section.getBoundingClientRect().top + window.scrollY - navbarHeight;

      if (lenis) {
        lenis.scrollTo(targetPosition, {
          duration: 0.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    };

    // Delegate hash-link handling so dynamically rendered menu links also scroll correctly.
    document.addEventListener("click", handleDocumentClick);
    window.addEventListener(modalLockEventName, syncLenisModalState);

    syncLenisModalState();

    let rafId = 0;

    if (lenis) {
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    }

    // Cleanup
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener(modalLockEventName, syncLenisModalState);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, []);

  return null;
}
