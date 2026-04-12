"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";

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
  const isTouchDevice = useIsTouchDevice();
  const reducedMotion = prefersReducedMotion || isTouchDevice;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Lighter parallax for smoother performance
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.3],
  );

  return (
    <motion.div
      ref={containerRef}
      className="relative isolate"
      initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "-80px 0px -80px 0px" }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        aria-hidden
        style={reducedMotion ? undefined : { y, opacity }}
        className={cn(
          "pointer-events-none absolute inset-x-0 top-8 h-32 blur-3xl will-change-transform",
          toneStyles[tone],
        )}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
