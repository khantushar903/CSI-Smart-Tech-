"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

type SectionTone = "emerald" | "teal" | "slate";

const toneStyles: Record<SectionTone, string> = {
  emerald: "bg-linear-to-r from-primary/20 via-primary/8 to-transparent",
  teal: "bg-linear-to-r from-accent/16 via-primary/6 to-transparent",
  slate: "bg-linear-to-r from-muted-foreground/18 via-primary/4 to-transparent",
};

type SectionRevealProps = {
  children: ReactNode;
  tone?: SectionTone;
};

export function SectionReveal({
  children,
  tone = "emerald",
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative isolate"
      initial={
        prefersReducedMotion ? undefined : { opacity: 0, y: 28, scale: 0.99 }
      }
      whileInView={
        prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: false, amount: 0.14, margin: "-90px 0px -90px 0px" }}
      transition={{ duration: SECTION_TIMING.container, ease: SECTION_EASE }}
    >
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-8 h-24 blur-2xl",
          toneStyles[tone],
        )}
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 0.36 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
