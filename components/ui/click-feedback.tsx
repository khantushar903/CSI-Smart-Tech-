"use client";

import { useEffect } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [data-slot='button'], .cursor-pointer";

export function ClickFeedback() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const host = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
      if (!host) return;

      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const addedHostClass =
        getComputedStyle(host).position === "static" &&
        !host.classList.contains("click-fx-host");

      if (addedHostClass) {
        host.classList.add("click-fx-host");
      }

      host.classList.add("click-fx-active");

      if (prefersReducedMotion.matches) {
        window.setTimeout(() => {
          host.classList.remove("click-fx-active");
          if (addedHostClass) {
            host.classList.remove("click-fx-host");
          }
        }, 160);
        return;
      }

      const ripple = document.createElement("span");
      ripple.className = "click-fx-ripple";

      const size = Math.max(rect.width, rect.height) * 0.95;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      host.appendChild(ripple);

      const cleanup = () => {
        ripple.remove();
        host.classList.remove("click-fx-active");

        if (addedHostClass) {
          host.classList.remove("click-fx-host");
        }
      };

      ripple.addEventListener("animationend", cleanup, { once: true });
      window.setTimeout(cleanup, 650);
    };

    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return null;
}
