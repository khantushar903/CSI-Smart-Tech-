"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ComponentType, PointerEvent as ReactPointerEvent } from "react";
import {
  Activity,
  ScanLine,
  Factory,
  LayoutDashboard,
  TrendingUp,
  Shield,
} from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const capabilities = [
  {
    icon: Activity,
    title: "Energy Monitoring & Sustainability Tracking",
    description:
      "Cut energy waste by 32% with AI insights. Track your carbon footprint. Generate reports that impress stakeholders and boost sustainability scores.",
    visual: "energy",
  },
  {
    icon: ScanLine,
    title: "IoT-based RFID / QR Tracking",
    description:
      "See every asset, everywhere, instantly. From raw materials to finished products. Zero blind spots. Maximum control.",
    visual: "tracking",
  },
  {
    icon: Factory,
    title: "Factory Automation & Cloud Manufacturing",
    description:
      "Connect any production line to the cloud in hours. Monitor remotely. Predict failures before they happen. Scale across facilities effortlessly.",
    visual: "factory",
  },
  {
    icon: LayoutDashboard,
    title: "Real-Time Data & ERP Dashboards",
    description:
      "One dashboard. All your data. Live updates from every corner of your operation. Make decisions fast with instant KPIs and custom reports.",
    visual: "dashboard",
  },
];

function EnergyVisual() {
  return (
    <div className="relative h-48 bg-linear-to-br from-primary/5 to-accent/5 rounded-xl p-4 overflow-hidden">
      <div className="flex items-end justify-between h-full gap-2 pb-4">
        {[65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95, 72].map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-primary/30 rounded-t"
            initial={{ height: 0 }}
            whileInView={{
              height: [
                `25%`,
                `${height}%`,
                `${Math.max(height - 12, 20)}%`,
                `${height}%`,
              ],
            }}
            transition={{
              duration: 2.1,
              delay: i * 0.05,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.45,
            }}
            viewport={{ once: false, amount: 0.35 }}
          />
        ))}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
        -32% Energy
      </div>
    </div>
  );
}

function TrackingVisual() {
  return (
    <div className="relative h-48 bg-linear-to-br from-accent/5 to-primary/5 rounded-xl p-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/6 to-transparent opacity-45" />

      <div className="grid grid-cols-4 gap-2 h-full">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-muted rounded flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            viewport={{ once: false, amount: 0.35 }}
          >
            <div className="w-4 h-4 border-2 border-primary/40 rounded" />
          </motion.div>
        ))}
      </div>
      <div className="rfid-scan-sweep" />
      <div className="rfid-scan-glow" />
    </div>
  );
}

function FactoryVisual() {
  return (
    <div className="relative h-48 bg-linear-to-br from-primary/5 to-transparent rounded-xl p-4 overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          {/* Central hub */}
          <motion.div
            className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
            initial={{ scale: 1 }}
            whileInView={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            viewport={{ once: false, amount: 0.45 }}
          >
            <Factory className="w-8 h-8 text-primary" />
          </motion.div>
          {/* Orbiting nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-accent/40 rounded-full"
              style={{
                top: "calc(50% - 0.5rem)",
                left: "calc(50% - 0.5rem)",
              }}
              whileInView={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 50,
                  Math.cos(((angle + 60) * Math.PI) / 180) * 50,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 50,
                  Math.sin(((angle + 60) * Math.PI) / 180) * 50,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
              }}
              viewport={{ once: false, amount: 0.45 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="relative h-48 bg-linear-to-br from-accent/5 to-primary/5 rounded-xl p-4 overflow-hidden">
      <div className="grid grid-cols-2 gap-3 h-full">
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Output</span>
          </div>
          <motion.span
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.6 }}
          >
            2,847
          </motion.span>
        </div>
        <div className="bg-card border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-foreground">Quality</span>
          </div>
          <motion.span
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
            viewport={{ once: false, amount: 0.6 }}
          >
            99.2%
          </motion.span>
        </div>
        <div className="col-span-2 bg-card border border-border rounded-lg p-3">
          <div className="h-full flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-full bg-primary/20 rounded"
                initial={{ scaleY: 0.2 }}
                whileInView={{ scaleY: [0.2, 1, 0.5 + (i % 3) * 0.15, 1] }}
                style={{ originY: 1 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.06,
                  ease: "easeInOut",
                  repeat: 1,
                  repeatDelay: 0.55,
                }}
                viewport={{ once: false, amount: 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, ComponentType> = {
  energy: EnergyVisual,
  tracking: TrackingVisual,
  factory: FactoryVisual,
  dashboard: DashboardVisual,
};

function CapabilityRow({
  capability,
  index,
  Visual,
}: {
  capability: (typeof capabilities)[number];
  index: number;
  Visual: ComponentType;
}) {
  const isEven = index % 2 === 0;
  const prefersReducedMotion = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 220,
    damping: 22,
    mass: 0.45,
  });
  const smoothRotateY = useSpring(rotateY, {
    stiffness: 220,
    damping: 22,
    mass: 0.45,
  });

  const smoothGlowX = useSpring(glowX, {
    stiffness: 260,
    damping: 28,
    mass: 0.3,
  });
  const smoothGlowY = useSpring(glowY, {
    stiffness: 260,
    damping: 28,
    mass: 0.3,
  });

  const textOffsetX = useTransform(smoothRotateY, [-8, 8], [-5, 5]);
  const textOffsetY = useTransform(smoothRotateX, [-8, 8], [5, -5]);
  const visualOffsetX = useTransform(smoothRotateY, [-8, 8], [-12, 12]);
  const visualOffsetY = useTransform(smoothRotateX, [-8, 8], [10, -10]);

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(22, 101, 52, 0.2), rgba(22, 101, 52, 0) 58%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const nextRotateY = (px - 0.5) * 12;
    const nextRotateX = (0.5 - py) * 10;

    rotateX.set(nextRotateX);
    rotateY.set(nextRotateY);
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: SECTION_TIMING.item,
        delay: index * SECTION_TIMING.stagger,
        ease: SECTION_EASE,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformPerspective: 1200,
            }
      }
      className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center rounded-3xl p-3 lg:p-6 group/capability transition-colors duration-300 transform-3d ${
        isEven ? "" : "lg:flex-row-reverse"
      } hover:bg-muted/20`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-r from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover/capability:opacity-100" />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/capability:opacity-100"
        style={
          prefersReducedMotion ? undefined : { backgroundImage: spotlight }
        }
      />

      {/* Text content */}
      <motion.div
        className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}
        style={
          prefersReducedMotion ? undefined : { x: textOffsetX, y: textOffsetY }
        }
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover/capability:scale-105 group-hover/capability:bg-primary/20 group-hover/capability:shadow-lg group-hover/capability:shadow-primary/15">
            <capability.icon className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            0{index + 1}
          </span>
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 transition-colors duration-300 group-hover/capability:text-primary">
          {capability.title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {capability.description}
        </p>
      </motion.div>

      {/* Visual */}
      <motion.div
        className={`relative ${isEven ? "lg:order-2" : "lg:order-1"}`}
        style={
          prefersReducedMotion
            ? undefined
            : { x: visualOffsetX, y: visualOffsetY }
        }
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <div className="rounded-2xl border border-border/70 bg-card/40 p-2 shadow-sm transition-all duration-300 group-hover/capability:border-primary/25 group-hover/capability:shadow-xl group-hover/capability:shadow-primary/10">
          <Visual />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-24 lg:py-32 bg-background/76"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-base sm:text-lg font-semibold text-primary uppercase tracking-wider">
            Core Capabilities
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            See Everything. Control Everything.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Transform chaos into clarity. Turn manual work into automated
            precision.
          </p>
        </motion.div>

        {/* Capabilities list - alternating layout */}
        <div className="space-y-16 lg:space-y-24">
          {capabilities.map((capability, index) => {
            const Visual = visuals[capability.visual];

            return (
              <CapabilityRow
                key={capability.title}
                capability={capability}
                index={index}
                Visual={Visual}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
