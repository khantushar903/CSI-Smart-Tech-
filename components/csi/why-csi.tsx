"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Award, TrendingUp, Wrench, Zap, Shield } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const reasons = [
  {
    icon: Award,
    title: "Industry Expertise",
    description:
      "Deep domain knowledge across manufacturing sectors with proven implementation experience.",
    value: "15+",
    label: "Years Combined Experience",
  },
  {
    icon: TrendingUp,
    title: "Scalable Systems",
    description:
      "Architecture designed to grow with your business, from single facilities to global operations.",
    value: "10x",
    label: "Growth Capacity",
  },
  {
    icon: Wrench,
    title: "Field-Tested Solutions",
    description:
      "Every solution is validated in real-world manufacturing environments before deployment.",
    value: "50+",
    label: "Live Deployments",
  },
  {
    icon: Zap,
    title: "Efficiency Focus",
    description:
      "Measurable improvements in operational efficiency, energy usage, and resource optimization.",
    value: "40%",
    label: "Average Efficiency Gain",
  },
  {
    icon: Shield,
    title: "Future-Ready Foundation",
    description:
      "Built on modern standards ensuring compatibility with emerging technologies and protocols.",
    value: "100%",
    label: "Cloud-Native",
  },
];

export function WhyCSI() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-csi"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Why CSI Smart Tech
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                Built for Results, Designed for Tomorrow
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                We combine deep industrial expertise with cutting-edge
                technology to deliver solutions that work today and scale for
                the future. Our track record speaks for itself.
              </p>

              {/* Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-4">
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
                    className={`px-4 py-2 rounded-full ${badge.className}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{
                      duration: SECTION_TIMING.detail,
                      ease: SECTION_EASE,
                      delay: 0.2 + index * SECTION_TIMING.microStagger,
                    }}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -2, scale: 1.03 }
                    }
                  >
                    <span className="text-sm font-medium">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - reasons list */}
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
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
                whileHover={prefersReducedMotion ? undefined : { x: 2, y: -2 }}
              >
                <div className="group/reason relative bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/6 via-transparent to-accent/6 opacity-0 transition-opacity duration-300 group-hover/reason:opacity-100" />
                  <div className="flex gap-5">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover/reason:bg-primary/20 transition-colors">
                        <reason.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {reason.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {reason.description}
                          </p>
                        </div>

                        {/* Value badge */}
                        <div className="flex-shrink-0 text-right">
                          <motion.div
                            className="text-2xl font-bold text-primary"
                            animate={
                              isInView ? { opacity: [0.86, 1] } : { opacity: 1 }
                            }
                            transition={{
                              duration: 0.6,
                              delay: index * 0.15,
                            }}
                          >
                            {reason.value}
                          </motion.div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            {reason.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
