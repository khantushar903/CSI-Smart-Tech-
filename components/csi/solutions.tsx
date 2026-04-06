"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Cog, Radio, Cloud, Leaf, Brain, ArrowRight } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const solutions = [
  {
    icon: Cog,
    title: "Industrial Automation",
    description:
      "End-to-end automation systems that streamline production workflows, reduce manual intervention, and maximize operational efficiency across your manufacturing floor.",
    features: ["Process Control", "Robotic Integration", "Quality Assurance"],
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Radio,
    title: "IoT-Based Systems",
    description:
      "Connected sensor networks and intelligent devices that provide real-time visibility into every aspect of your operations, from equipment health to environmental conditions.",
    features: ["Sensor Networks", "Edge Computing", "Real-Time Analytics"],
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: Cloud,
    title: "Cloud Manufacturing",
    description:
      "Scalable cloud infrastructure that enables seamless data management, collaborative workflows, and instant access to critical manufacturing insights from anywhere.",
    features: ["Data Lakes", "Hybrid Cloud", "API Integration"],
    color: "from-primary/15 to-accent/5",
  },
  {
    icon: Leaf,
    title: "Sustainability Solutions",
    description:
      "Environmental monitoring and optimization systems that help you track, reduce, and report your carbon footprint while meeting regulatory compliance requirements.",
    features: ["Energy Monitoring", "Waste Reduction", "Carbon Tracking"],
    color: "from-accent/15 to-primary/5",
  },
  {
    icon: Brain,
    title: "AI-Based ERP Integration",
    description:
      "Intelligent enterprise resource planning systems enhanced with machine learning for predictive analytics, demand forecasting, and autonomous decision-making.",
    features: [
      "Predictive Analytics",
      "Smart Scheduling",
      "Demand Forecasting",
    ],
    color: "from-primary/20 to-accent/10",
  },
  {
    icon: Cloud,
    title: "Digital Twin Operations",
    description:
      "Virtual replicas of production lines and assets that let teams simulate outcomes, optimize scheduling, and reduce downtime before changes hit the shop floor.",
    features: ["Scenario Modeling", "Downtime Prediction", "Live Sync"],
    color: "from-accent/20 to-primary/10",
  },
];

type Solution = (typeof solutions)[number];

function SolutionCard({
  solution,
  index,
  isInView,
}: {
  solution: Solution;
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
    if (prefersReducedMotion) return;

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 44, scale: 0.98 }
      }
      transition={{
        duration: SECTION_TIMING.item,
        delay: index * SECTION_TIMING.stagger,
        ease: SECTION_EASE,
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="relative group/card"
      onPointerEnter={() => setIsHovering(true)}
      onPointerMove={handlePointerMove}
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
          prefersReducedMotion
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
          style={
            prefersReducedMotion ? undefined : { backgroundImage: spotlight }
          }
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        <motion.div
          className="relative z-10"
          style={
            prefersReducedMotion
              ? undefined
              : { x: contentOffsetX, y: contentOffsetY }
          }
        >
          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:bg-primary/20 transition-colors"
            animate={
              isHovering
                ? { scale: 1.08, rotate: 6, y: -2 }
                : { scale: 1, rotate: 0, y: 0 }
            }
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <solution.icon className="w-7 h-7 text-primary" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300 group-hover/card:text-primary">
            {solution.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {solution.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {solution.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground transition-colors duration-300 group-hover/card:bg-muted/80"
              >
                {feature}
              </span>
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
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="solutions"
      className="relative py-24 lg:py-32 bg-secondary/30"
      ref={ref}
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
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Core Solutions
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Technology That Drives Transformation
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our integrated suite of solutions addresses every aspect of modern
            manufacturing, from shop floor automation to enterprise-wide
            intelligence.
          </p>
        </motion.div>

        {/* Solutions grid - bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              solution={solution}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
