"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TechNeuralField,
  MatrixRain,
  CircuitBoard,
  GeometricWaves,
  DataFlow,
  TechGrid,
  ParticleNetwork,
  type AnimationType,
} from "@/components/ui/bg-animations";

// ===== ANIMATION SELECTOR =====
// Change this value to switch between different background animations:
// Options: "neural-field" | "matrix-rain" | "circuit-board" | "geometric-waves" | "data-flow" | "tech-grid" | "particle-network"
const ACTIVE_ANIMATION = "neural-field" as AnimationType;
// ==============================

// Render the selected background animation
const BackgroundAnimation = () => {
  switch (ACTIVE_ANIMATION) {
    case "neural-field":
      return (
        <TechNeuralField
          density={22000}
          speed={0.18}
          lineColor="rgba(22, 101, 52, 0.34)"
          nodeColor="rgba(22, 101, 52, 0.82)"
          sweepOpacity={0.24}
        />
      );
    case "matrix-rain":
      return (
        <MatrixRain speed={1} density={0.95} color="rgba(22, 101, 52, 0.8)" />
      );
    case "circuit-board":
      return (
        <CircuitBoard
          speed={0.5}
          lineColor="rgba(22, 101, 52, 0.3)"
          nodeColor="rgba(22, 101, 52, 0.6)"
          pulseColor="rgba(20, 184, 166, 0.9)"
        />
      );
    case "geometric-waves":
      return (
        <GeometricWaves
          speed={1}
          waveCount={4}
          color="rgba(22, 101, 52, 0.3)"
        />
      );
    case "data-flow":
      return (
        <DataFlow
          speed={1}
          particleCount={30}
          lineColor="rgba(22, 101, 52, 0.3)"
          particleColor="rgba(20, 184, 166, 0.8)"
        />
      );
    case "tech-grid":
      return (
        <TechGrid
          speed={0.5}
          gridSize={60}
          lineColor="rgba(22, 101, 52, 0.15)"
          dotColor="rgba(22, 101, 52, 0.4)"
        />
      );
    case "particle-network":
      return (
        <ParticleNetwork
          speed={0.5}
          particleCount={50}
          lineColor="rgba(22, 101, 52, 0.2)"
          particleColor="rgba(20, 184, 166, 0.7)"
          connectionDistance={120}
        />
      );
    default:
      return null;
  }
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with layered elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-88">
        <BackgroundAnimation />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_24%_18%,rgba(22,101,52,0.2),transparent_50%)] pointer-events-none" />
      {/* Abstract grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated accent circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 z-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 z-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Manufacturing
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6 text-balance"
          >
            Intelligent Systems for{" "}
            <span className="text-primary">Smarter Industry</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty"
          >
            Transform your manufacturing operations with cutting-edge IoT,
            cloud-based automation, and AI-powered systems designed for
            sustainable growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base font-medium group"
            >
              <a href="#contact" data-track-click="hero-start-transformation">
                Start Your Transformation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 h-12 text-base font-medium border-border text-foreground hover:bg-muted hover:text-foreground group"
            >
              <a href="#capabilities" data-track-click="hero-explore-solutions">
                <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                Explore Solutions
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "50+", label: "Active Deployments" },
            { value: "99.9%", label: "System Uptime" },
            { value: "40%", label: "Efficiency Gains" },
            { value: "24/7", label: "Monitoring" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
