"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const industries = [
  {
    name: "Textile Mills",
    description:
      "Optimize weaving, dyeing, and finishing processes with intelligent monitoring and automation.",
    metric: "35% efficiency increase",
  },
  {
    name: "Garment Factories",
    description:
      "Streamline cutting, sewing, and assembly lines with real-time production tracking.",
    metric: "40% reduced waste",
  },
  {
    name: "Accessories & Trims",
    description:
      "Precision manufacturing with automated quality control and inventory management.",
    metric: "99.5% quality rate",
  },
  {
    name: "Knitting & Composite Units",
    description:
      "Advanced monitoring for complex knitting patterns and composite material production.",
    metric: "28% faster cycles",
  },
  {
    name: "Manufacturing",
    description:
      "End-to-end solutions for general manufacturing operations across diverse product lines.",
    metric: "50+ deployments",
  },
];

type Industry = (typeof industries)[number];

function IndustryCard({
  industry,
  index,
  isInView,
}: {
  industry: Industry;
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 220,
    damping: 24,
    mass: 0.4,
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 220,
    damping: 24,
    mass: 0.4,
  });
  const smoothGlowX = useSpring(glowX, {
    stiffness: 240,
    damping: 28,
    mass: 0.33,
  });
  const smoothGlowY = useSpring(glowY, {
    stiffness: 240,
    damping: 28,
    mass: 0.33,
  });

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(20, 184, 166, 0.22), rgba(20, 184, 166, 0) 64%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 7);
    rotateX.set((0.5 - py) * 6);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -36, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: -36, scale: 0.98 }
      }
      transition={{
        duration: SECTION_TIMING.item,
        delay: index * SECTION_TIMING.stagger,
        ease: SECTION_EASE,
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
    >
      <motion.div
        className="group relative bg-card border border-border rounded-xl p-6 lg:p-8 transition-all duration-400 cursor-pointer overflow-hidden"
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 1200,
              }
        }
        onPointerEnter={() => setIsHovering(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          setIsHovering(false);
          resetTilt();
        }}
        data-track-click={`industry-card-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={
            prefersReducedMotion ? undefined : { backgroundImage: spotlight }
          }
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-3 right-3 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
          animate={
            isHovering
              ? { opacity: 1, scaleX: 1 }
              : { opacity: 0.35, scaleX: 0.7 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <motion.span
                className="text-sm font-mono text-muted-foreground transition-colors group-hover:text-primary"
                animate={isHovering ? { scale: 1.08 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
            </div>
            <p className="text-muted-foreground lg:pl-10">
              {industry.description}
            </p>
          </div>

          <div className="flex items-center gap-6 lg:pl-8">
            <motion.div
              className="px-4 py-2 bg-primary/10 rounded-full"
              animate={isHovering ? { scale: 1.03 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <span className="text-sm font-medium text-primary whitespace-nowrap">
                {industry.metric}
              </span>
            </motion.div>
            <motion.div
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              animate={
                isHovering
                  ? { scale: 1.1, rotate: 10 }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function Industries() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="industries"
      className="relative py-24 lg:py-32 bg-secondary/30"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="max-w-2xl mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Industries We Serve
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Expertise Across Manufacturing Sectors
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From textile production to advanced manufacturing, our solutions are
            tailored to meet the unique challenges of each industry.
          </p>
        </motion.div>

        {/* Industries list */}
        <div className="space-y-4">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
