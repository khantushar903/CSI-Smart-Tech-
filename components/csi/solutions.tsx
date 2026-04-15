"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { useState, useEffect } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  Cog,
  Share2,
  Cloud,
  Leaf,
  Brain,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";

const solutions = [
  {
    icon: Cloud,
    title: "Cloud Manufacturing",
    description: "Your factory in the cloud. Access everything, anywhere.",
    features: ["Smart Data", "Global Access", "Easy Integration"],
    color: "from-primary/15 to-accent/5",
  },
  {
    icon: Share2,
    title: "IoT Based Digital Transformation",
    description:
      "Every device connected. Raw data becomes real-time intelligence.",
    features: ["Live Sensors", "Data Intelligence", "Smart Integration"],
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Cog,
    title: "Smart Automation",
    description: "Production lines that think. Less manual work, more output.",
    features: ["Auto-Control", "Robot Integration", "Quality Check"],
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Brain,
    title: "AI-Powered ERP System",
    description: "ERP that predicts the future. Smart decisions on autopilot.",
    features: ["Predict Trends", "Smart Scheduling", "Auto Decisions"],
    color: "from-primary/20 to-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Sustainability Tracking",
    description:
      "Measure every impact. Turn compliance into competitive advantage.",
    features: ["Emissions Tracking", "ESG Metrics", "Impact Reports"],
    color: "from-accent/15 to-primary/5",
  },
  {
    icon: Leaf,
    title: "Green Operations",
    description:
      "Cut carbon, not corners. Track CO2, meet regulations effortlessly.",
    features: ["Energy Monitor", "Waste Reduction", "Carbon Tracker"],
    color: "from-accent/15 to-primary/5",
  },
];

type Solution = (typeof solutions)[number];

function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = useIsTouchDevice();
  const reducedMotion = prefersReducedMotion || isTouchDevice;
  const [isHovering, setIsHovering] = useState(false);
  const iconControls = useAnimationControls();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 230,
    damping: 24,
    mass: 0.45,
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 230,
    damping: 24,
    mass: 0.45,
  });

  const smoothGlowX = useSpring(glowX, {
    stiffness: 260,
    damping: 28,
    mass: 0.35,
  });
  const smoothGlowY = useSpring(glowY, {
    stiffness: 260,
    damping: 28,
    mass: 0.35,
  });

  const contentOffsetX = useTransform(smoothRotateY, [-8, 8], [-5, 5]);
  const contentOffsetY = useTransform(smoothRotateX, [-8, 8], [4, -4]);

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(22, 101, 52, 0.22), rgba(22, 101, 52, 0) 62%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const clampedX = Math.min(1, Math.max(0, px));
    const clampedY = Math.min(1, Math.max(0, py));

    rotateY.set((clampedX - 0.5) * 12);
    rotateX.set((0.5 - clampedY) * 10);
    glowX.set(clampedX * 100);
    glowY.set(clampedY * 100);
  };

  const resetParallax = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  // Floating icon animation on hover
  useEffect(() => {
    if (isHovering && !reducedMotion) {
      iconControls.start({
        y: [0, -4, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      iconControls.stop();
      iconControls.set({ y: 0 });
    }
  }, [isHovering, reducedMotion, iconControls]);

  // Determine entry animation direction based on index
  const getEntryAnimation = () => {
    if (prefersReducedMotion) {
      return { opacity: 0, y: 20 };
    }

    const row = Math.floor(index / 3);
    const col = index % 3;

    // Alternate pattern: diagonal wave
    if ((row + col) % 2 === 0) {
      return { opacity: 0, y: 44, x: -30, scale: 0.95, rotate: -2 };
    } else {
      return { opacity: 0, y: 44, x: 30, scale: 0.95, rotate: 2 };
    }
  };

  const entryAnimation = getEntryAnimation();

  return (
    <motion.div
      initial={entryAnimation}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      viewport={{
        once: isTouchDevice,
        amount: 0.22,
        margin: "-60px 0px -60px 0px",
      }}
      transition={{
        duration: 0.56,
        delay: (index % 3) * 0.06,
        ease: SECTION_EASE,
      }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      className="relative group/card will-change-transform"
      onPointerEnter={reducedMotion ? undefined : () => setIsHovering(true)}
      onPointerMove={reducedMotion ? undefined : handlePointerMove}
      onPointerLeave={() => {
        setIsHovering(false);
        resetParallax();
      }}
    >
      <motion.div
        className={`relative h-full bg-card border border-border rounded-2xl p-8 transition-all duration-500 overflow-hidden transform-3d ${
          isHovering
            ? "border-primary/30 shadow-xl shadow-primary/10"
            : "hover:border-muted-foreground/20"
        }`}
        style={
          reducedMotion
            ? undefined
            : {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 1200,
              }
        }
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
          animate={
            isHovering
              ? { opacity: 1, scaleX: 1 }
              : { opacity: 0.32, scaleX: 0.72 }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        {/* Background gradient on hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${solution.color} transition-opacity duration-500 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={reducedMotion ? undefined : { backgroundImage: spotlight }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        <motion.div
          className="relative z-10"
          style={
            reducedMotion ? undefined : { x: contentOffsetX, y: contentOffsetY }
          }
        >
          {/* Icon */}
          <motion.div
            className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:bg-primary/20 transition-colors"
            animate={iconControls}
            whileHover={reducedMotion ? undefined : { scale: 1.08, rotate: 6 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            {/* Icon glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/20 blur-xl"
              animate={{
                opacity: isHovering ? 0.6 : 0,
                scale: isHovering ? 1.2 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />
            <solution.icon className="relative w-7 h-7 text-primary" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300 group-hover/card:text-primary">
            {solution.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {solution.description}
          </p>

          {/* Features with stagger animation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {solution.features.map((feature, featureIndex) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: isTouchDevice, amount: 0.4 }}
                transition={{
                  duration: 0.32,
                  delay: 0.2 + featureIndex * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }
                }
                className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground transition-colors duration-300 group-hover/card:bg-muted/80 cursor-default"
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* Learn more link */}
          <motion.a
            href="#contact"
            data-track-click={`solutions-learn-more-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="inline-flex items-center text-sm font-medium text-primary group/link"
            whileHover={{ x: 4 }}
          >
            Learn more
            <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Solutions() {
  return (
    <section
      id="solutions"
      className="relative py-14 lg:py-20 bg-secondary/70 md:bg-secondary/30"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="solutions-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#solutions-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5, margin: "-60px 0px -80px 0px" }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
        >
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            Core Solutions
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Technology That Drives Transformation
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Smart solutions that boost efficiency, cut costs, and future-proof
            operations.
          </p>
        </motion.div>

        {/* Solutions grid - bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              solution={solution}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
