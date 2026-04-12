"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";

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
  const isTouchDevice = useIsTouchDevice();
  const reducedMotion = prefersReducedMotion || isTouchDevice;
  const [isHovering, setIsHovering] = useState(false);
  const numberControls = useAnimationControls();

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

  const contentOffsetX = useTransform(smoothRotateY, [-7, 7], [-3, 3]);
  const contentOffsetY = useTransform(smoothRotateX, [-6, 6], [2, -2]);

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(20, 184, 166, 0.22), rgba(20, 184, 166, 0) 64%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

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

  // Floating number animation on hover
  useEffect(() => {
    if (isHovering && !reducedMotion) {
      numberControls.start({
        y: [0, -3, 0],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      numberControls.stop();
      numberControls.set({ y: 0 });
    }
  }, [isHovering, reducedMotion, numberControls]);

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
      whileHover={reducedMotion ? undefined : { y: -3 }}
    >
      <motion.div
        className="group relative bg-card border border-border rounded-xl p-6 lg:p-8 transition-all duration-400 cursor-pointer overflow-hidden"
        style={
          reducedMotion
            ? undefined
            : {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 1200,
              }
        }
        onPointerEnter={reducedMotion ? undefined : () => setIsHovering(true)}
        onPointerMove={reducedMotion ? undefined : handlePointerMove}
        onPointerLeave={() => {
          setIsHovering(false);
          resetTilt();
        }}
        data-track-click={`industry-card-${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={reducedMotion ? undefined : { backgroundImage: spotlight }}
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

        <motion.div
          className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
          style={
            reducedMotion ? undefined : { x: contentOffsetX, y: contentOffsetY }
          }
        >
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <motion.span
                className="relative text-sm font-mono text-muted-foreground transition-colors group-hover:text-primary"
                animate={numberControls}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                {/* Number glow effect */}
                <motion.span
                  className="absolute inset-0 blur-md text-primary"
                  animate={{
                    opacity: isHovering ? 0.4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
                <span className="relative">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.span>
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
            </div>

            {/* Word-by-word description reveal */}
            {isTouchDevice ? (
              <p className="text-muted-foreground text-sm sm:text-base lg:pl-10">
                {industry.description}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm sm:text-base lg:pl-10">
                {industry.description.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                    }
                    transition={{
                      duration: 0.25,
                      delay: index * SECTION_TIMING.stagger + 0.25 + i * 0.015,
                      ease: "easeOut",
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: 0.4,
                delay: index * SECTION_TIMING.stagger + 0.4,
                ease: SECTION_EASE,
              }}
              className="relative px-4 py-2 bg-primary/10 rounded-full overflow-hidden"
              whileHover={reducedMotion ? undefined : { scale: 1.05, y: -2 }}
            >
              {/* Shimmer effect on metric badge */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{
                  x: isHovering ? ["0%", "200%"] : "0%",
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
              <span className="relative text-sm font-medium text-primary whitespace-nowrap">
                {industry.metric}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.8, rotate: -45 }
              }
              transition={{
                duration: 0.5,
                delay: index * SECTION_TIMING.stagger + 0.5,
                ease: SECTION_EASE,
              }}
              whileHover={
                reducedMotion ? undefined : { scale: 1.1, rotate: 10 }
              }
              className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              {/* Arrow glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-lg"
                animate={{
                  opacity: isHovering ? 0.6 : 0,
                  scale: isHovering ? 1.3 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />
              <ArrowUpRight className="relative w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function Industries() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="industries"
      className="relative py-14 lg:py-20 bg-secondary/30"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="max-w-2xl mb-8 lg:mb-10"
        >
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-primary">
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
