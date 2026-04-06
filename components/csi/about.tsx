"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Cpu, Cloud, Zap } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const pillars = [
  {
    icon: Cpu,
    title: "Intelligent Automation",
    description: "Smart systems that learn and adapt",
  },
  {
    icon: Cloud,
    title: "Cloud-Native",
    description: "Scalable infrastructure built for growth",
  },
  {
    icon: Leaf,
    title: "Sustainability First",
    description: "Green solutions for responsible manufacturing",
  },
  {
    icon: Zap,
    title: "Future-Ready",
    description: "Technologies designed for tomorrow",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-background"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
              duration: SECTION_TIMING.container,
              ease: SECTION_EASE,
            }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Our Vision
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              Building the Future of Industrial Intelligence
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              CSI Smart Tech is a modern industrial technology company
              pioneering the convergence of IoT, cloud manufacturing, and
              artificial intelligence. We believe in creating systems that are
              not only efficient but sustainable.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From intelligent automation to real-time data insights, we help
              manufacturers transform their operations while reducing
              environmental impact. Our future roadmap includes custom ERP
              systems and comprehensive digital transformation solutions.
            </p>

            {/* Pillars grid */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: SECTION_TIMING.detail,
                    ease: SECTION_EASE,
                    delay: 0.18 + index * SECTION_TIMING.microStagger,
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <pillar.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{
              duration: SECTION_TIMING.container,
              ease: SECTION_EASE,
              delay: 0.14,
            }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Abstract system visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-3xl" />

              {/* Layered cards representing different systems */}
              <motion.div
                className="absolute top-8 left-8 right-16 bg-card border border-border rounded-2xl p-6 shadow-lg"
                animate={isInView ? { y: [0, -10, 0] } : { y: 0 }}
                transition={
                  isInView
                    ? {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    : { duration: 0.25 }
                }
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-primary/20 rounded-full w-3/4" />
                  <div className="h-2 bg-muted rounded-full w-1/2" />
                  <div className="h-2 bg-muted rounded-full w-2/3" />
                </div>
              </motion.div>

              <motion.div
                className="absolute top-32 right-8 left-16 bg-card border border-border rounded-2xl p-6 shadow-lg"
                animate={isInView ? { y: [0, 10, 0] } : { y: 0 }}
                transition={
                  isInView
                    ? {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }
                    : { duration: 0.25 }
                }
              >
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[40, 65, 85, 55, 75, 45].map((height, i) => (
                    <div key={i} className="flex flex-col justify-end h-16">
                      <motion.div
                        className="bg-primary/20 rounded-t"
                        initial={{ height: 0 }}
                        animate={
                          isInView ? { height: `${height}%` } : { height: 0 }
                        }
                        transition={{
                          duration: SECTION_TIMING.item,
                          ease: SECTION_EASE,
                          delay: 0.42 + i * SECTION_TIMING.microStagger,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="h-2 bg-muted rounded-full w-full" />
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-12 right-12 bg-card border border-border rounded-2xl p-6 shadow-lg"
                animate={isInView ? { y: [0, -8, 0] } : { y: 0 }}
                transition={
                  isInView
                    ? {
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }
                    : { duration: 0.25 }
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Sustainability Score
                    </span>
                  </div>
                  <span className="text-lg font-bold text-primary">94%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "94%" } : { width: 0 }}
                    transition={{
                      duration: SECTION_TIMING.item,
                      ease: SECTION_EASE,
                      delay: 0.55,
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
