"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

const pillars = [
  {
    number: "01",
    title: "AI That Learns",
    description: "Systems that get smarter with every operation",
  },
  {
    number: "02",
    title: "Global Scale",
    description: "Cloud infrastructure that grows with you",
  },
  {
    number: "03",
    title: "Planet-First",
    description: "Green tech that cuts waste, not corners",
  },
  {
    number: "04",
    title: "Tomorrow-Ready",
    description: "Built for what's next, not what's now",
  },
];

const orbitalNodes = [
  { cx: 380, cy: 200 },
  { cx: 290, cy: 355.8846 },
  { cx: 110, cy: 355.8846 },
  { cx: 20, cy: 200 },
  { cx: 110, cy: 44.1154 },
  { cx: 290, cy: 44.1154 },
];

function GeometricVisualization() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <div ref={ref} className="relative aspect-square w-full max-w-sm mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-[15%] bg-primary/10 rounded-full blur-3xl" />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        style={{ rotate: rotate1, scale }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 12"
            className="text-border"
          />
          {/* Orbital nodes */}
          {orbitalNodes.map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="6"
              fill="currentColor"
              className={i % 2 === 0 ? "text-primary/40" : "text-accent/40"}
            />
          ))}
        </svg>
      </motion.div>

      {/* Middle ring */}
      <motion.div className="absolute inset-[15%]" style={{ rotate: rotate2 }}>
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <polygon
            points="200,40 360,200 200,360 40,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary/30"
          />
        </svg>
      </motion.div>

      {/* Inner static elements */}
      <div className="absolute inset-[30%]">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <rect
            x="100"
            y="100"
            width="200"
            height="200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
          />
        </svg>
      </div>

      {/* Center core */}
      <div className="absolute inset-[40%] flex items-center justify-center">
        <motion.div
          className="w-full h-full rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-3/4 h-3/4 rounded-full bg-card border border-border flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </div>

      {/* Data points */}
      <motion.div
        className="absolute top-[10%] right-[20%] px-3 py-2 bg-card border border-border rounded-lg shadow-lg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
          Efficiency
        </div>
        <div className="text-sm font-bold text-foreground">+40%</div>
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] left-[15%] px-3 py-2 bg-card border border-border rounded-lg shadow-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
          Carbon
        </div>
        <div className="text-sm font-bold text-primary">-32%</div>
      </motion.div>
    </div>
  );
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-32 lg:py-40 bg-background overflow-hidden"
      ref={ref}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="about-grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M80 0V80H0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ...spring }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">
                Our Vision
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">
              Smart Industry.{" "}
              <span className="text-primary">Sustainable Future.</span>
            </h2>

            {/* Body text */}
            <div className="mt-8 space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                We merge AI, IoT, and cloud tech to build manufacturing systems
                that work smarter—not harder.
              </p>
              <p>
                Boost efficiency by 40%. Cut carbon by 32%. Transform operations
                with intelligent automation that adapts and evolves.
              </p>
            </div>

            {/* Pillars */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ...spring,
                  }}
                  className="group"
                >
                  <div className="text-xs font-mono text-primary/60 mb-2">
                    {pillar.number}
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Geometric visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <GeometricVisualization />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
