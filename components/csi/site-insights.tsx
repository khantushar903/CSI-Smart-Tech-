"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

const SECTION_OBSERVER_THRESHOLD = 0.45;
const CLICK_TARGET_SELECTOR =
  "[data-track-click], a, button, [role='button'], [data-slot='button'], .cursor-pointer";

const cleanLabel = (value: string) => {
  return value.replace(/\s+/g, " ").trim().slice(0, 72);
};

export function SiteInsights() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const observed = new Set<string>();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const section = entry.target as HTMLElement;
          const sectionId = section.id;
          if (!sectionId || observed.has(sectionId)) continue;

          observed.add(sectionId);
          track("section_view", {
            section: sectionId,
            page: window.location.pathname,
            ratio: Math.round(entry.intersectionRatio * 100),
          });
        }
      },
      {
        threshold: [SECTION_OBSERVER_THRESHOLD],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest<HTMLElement>(CLICK_TARGET_SELECTOR);
      if (!interactive) return;

      const sectionId = interactive.closest("section[id]")?.id ?? "global";
      const href =
        interactive instanceof HTMLAnchorElement
          ? interactive.getAttribute("href") || ""
          : "";

      const rawLabel =
        interactive.getAttribute("data-track-click") ||
        interactive.getAttribute("aria-label") ||
        interactive.textContent ||
        interactive.tagName.toLowerCase();

      const label = cleanLabel(rawLabel);

      track("ui_click", {
        section: sectionId,
        label: label || "unlabeled",
        target: href,
        page: window.location.pathname,
      });
    };

    const useCapture = true;
    document.addEventListener("click", onClick, useCapture);

    return () => {
      sectionObserver.disconnect();
      document.removeEventListener("click", onClick, useCapture);
    };
  }, []);

  return null;
}
