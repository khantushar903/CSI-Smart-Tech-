"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useAnimationControls,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Award, TrendingUp, Wrench, Zap, Shield } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const reasons = [
  {
    icon: Award,
    title: "Industry Expertise",
    description:
      "Real manufacturing knowledge. Proven results across multiple sectors.",
    value: "15+",
    label: "Years Combined Experience",
  },
  {
    icon: TrendingUp,
    title: "Scalable Systems",
    description:
      "Start small. Scale big. From one facility to global operations.",
    value: "10x",
    label: "Growth Capacity",
  },
  {
    icon: Wrench,
    title: "Field-Tested Solutions",
    description:
      "Every solution works in real factories before it reaches yours.",
    value: "50+",
    label: "Live Deployments",
  },
  {
    icon: Zap,
    title: "Efficiency Focus",
    description:
      "Cut costs. Save energy. Boost productivity. See measurable results.",
    value: "40%",
    label: "Average Efficiency Gain",
  },
  {
    icon: Shield,
    title: "Future-Ready Foundation",
    description: "Built on modern standards. Ready for tomorrow's technology.",
    value: "100%",
    label: "Cloud-Native",
  },
];

function ReasonCard({
  reason,
  index,
  isInView,
}: {
  reason: (typeof reasons)[number];
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const iconControls = useAnimationControls();

  // Floating icon animation
  useEffect(() => {
    if (isHovering && !prefersReducedMotion) {
      iconControls.start({
        y: [0, -4, 0],
        rotate: [0, 5, 0],
        transition: {
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      iconControls.stop();
      iconControls.set({ y: 0, rotate: 0 });
    }
  }, [isHovering, prefersReducedMotion, iconControls]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: 30, scale: 0.98 }
      }
      transition={{
        duration: SECTION_TIMING.item,
        delay: index * SECTION_TIMING.stagger,
        ease: SECTION_EASE,
      }}
      whileHover={
        prefersReducedMotion ? undefined : { x: 4, y: -3, scale: 1.01 }
      }
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      <div className="group/reason relative bg-card border border-border rounded-2xl p-4 sm:p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/8 via-transparent to-accent/8 opacity-0 transition-opacity duration-300 group-hover/reason:opacity-100" />

        {/* Shimmer effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{
            x: isHovering ? ["-100%", "200%"] : "-100%",
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 relative z-10">
          {/* Icon */}
          <div className="flex-shrink-0">
            <motion.div
              className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover/reason:bg-primary/20 transition-colors"
              animate={iconControls}
              whileHover={{ scale: 1.1 }}
            >
              {/* Icon glow */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/20 blur-xl"
                animate={{
                  opacity: isHovering ? 0.6 : 0,
                  scale: isHovering ? 1.3 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />
              <reason.icon className="relative w-6 h-6 text-primary" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover/reason:text-primary transition-colors">
                  {reason.title}
                </h3>

                {/* Word-by-word description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {reason.description.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }
                      }
                      transition={{
                        duration: 0.2,
                        delay: index * SECTION_TIMING.stagger + 0.2 + i * 0.012,
                        ease: "easeOut",
                      }}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              </div>

              {/* Value badge */}
              <div className="flex-shrink-0 sm:text-right">
                <motion.div
                  className="relative text-xl sm:text-2xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * SECTION_TIMING.stagger + 0.3,
                    ease: SECTION_EASE,
                  }}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.1, rotate: 2 }
                  }
                >
                  {/* Value glow */}
                  <motion.span
                    className="absolute inset-0 blur-lg text-primary"
                    animate={{
                      opacity: isHovering ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {reason.value}
                  </motion.span>
                  <span className="relative">{reason.value}</span>
                </motion.div>
                <motion.div
                  className="text-xs text-muted-foreground whitespace-nowrap mt-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * SECTION_TIMING.stagger + 0.4,
                  }}
                >
                  {reason.label}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WhyCSI() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-csi"
      className="relative py-16 sm:py-24 lg:py-32 bg-background/78 overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left column - sticky header */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: SECTION_TIMING.header,
                ease: SECTION_EASE,
              }}
            >
              <span className="text-base sm:text-lg font-semibold text-primary uppercase tracking-wider">
                Why CSI Smart Tech
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                Smart Tech That Actually Works
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Industrial expertise meets cutting-edge technology. Solutions
                that work today and scale tomorrow. Results you can measure.
              </p>

              {/* Trust indicators */}
              <div className="mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-4">
                {[
                  {
                    label: "ISO Certified",
                    className: "bg-primary/10 text-primary",
                  },
                  {
                    label: "24/7 Support",
                    className: "bg-accent/10 text-accent",
                  },
                  {
                    label: "Enterprise Ready",
                    className: "bg-muted text-muted-foreground",
                  },
                ].map((badge, index) => (
                  <motion.div
                    key={badge.label}
                    className={`relative px-3 sm:px-4 py-2 rounded-full ${badge.className} cursor-default overflow-hidden`}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 10, scale: 0.9 }
                    }
                    transition={{
                      duration: SECTION_TIMING.detail,
                      ease: SECTION_EASE,
                      delay: 0.2 + index * SECTION_TIMING.microStagger,
                    }}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -3, scale: 1.05 }
                    }
                  >
                    <span className="relative text-sm font-medium">
                      {badge.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - reasons list */}
          <div className="space-y-4 sm:space-y-6">
            {reasons.map((reason, index) => (
              <ReasonCard
                key={reason.title}
                reason={reason}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
