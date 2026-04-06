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
import { Database, Code2, Sparkles, ArrowRight } from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const futureServices = [
  {
    icon: Database,
    title: "Custom ERP Systems",
    description:
      "Tailored enterprise resource planning solutions designed specifically for your business processes and growth trajectory.",
    status: "Coming 2026",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Bespoke software solutions built from the ground up to address your unique operational challenges and opportunities.",
    status: "In Development",
  },
  {
    icon: Sparkles,
    title: "Digital Transformation Solutions",
    description:
      "Comprehensive transformation roadmaps and implementation services to modernize your entire technology ecosystem.",
    status: "Expanding",
  },
];

type FutureService = (typeof futureServices)[number];

function FutureCard({
  service,
  index,
  isInView,
}: {
  service: FutureService;
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
    damping: 27,
    mass: 0.34,
  });
  const smoothGlowY = useSpring(glowY, {
    stiffness: 240,
    damping: 27,
    mass: 0.34,
  });

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(34, 197, 94, 0.24), rgba(34, 197, 94, 0) 63%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 5);
    rotateX.set((0.5 - py) * 4);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const resetCard = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 42, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 42, scale: 0.98 }
      }
      transition={{
        duration: SECTION_TIMING.item,
        delay: index * SECTION_TIMING.stagger,
        ease: SECTION_EASE,
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className="group"
    >
      <motion.div
        className="relative h-full bg-background/5 border border-background/10 rounded-2xl p-8 hover:bg-background/10 hover:border-background/20 transition-all duration-300 overflow-hidden"
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
          resetCard();
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={
            prefersReducedMotion ? undefined : { backgroundImage: spotlight }
          }
          animate={{ opacity: isHovering ? 0.62 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent z-0"
          animate={
            isHovering
              ? { opacity: 1, scaleX: 1 }
              : { opacity: 0.35, scaleX: 0.68 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <div className="relative z-10">
          {/* Status badge */}
          <motion.div
            className="absolute top-6 right-6"
            animate={isHovering ? { y: -1 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/25">
              {service.status}
            </span>
          </motion.div>

          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-xl bg-emerald-400/15 flex items-center justify-center mb-6 group-hover:bg-emerald-400/25 transition-colors"
            animate={
              isHovering ? { scale: 1.08, rotate: 6 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <service.icon className="w-7 h-7 text-emerald-200" />
          </motion.div>

          {/* Content */}
          <h3 className="text-xl font-semibold mb-3 text-background">
            {service.title}
          </h3>
          <p className="text-background/78 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Learn more */}
          <motion.a
            href="#contact"
            data-track-click={`future-get-notified-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="inline-flex items-center text-sm font-medium text-emerald-200 group/link"
            whileHover={{ x: 4 }}
          >
            Get notified
            <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Future() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      id="future"
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
      ref={ref}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="future-grid"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="23" cy="23" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#future-grid)" />
        </svg>
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Future Scope
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
            The Road Ahead
          </h2>
          <p className="mt-6 text-lg text-background/70 leading-relaxed">
            As we continue to innovate, our expanding portfolio will encompass
            comprehensive digital solutions for the modern enterprise.
          </p>
        </motion.div>

        {/* Future services grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {futureServices.map((service, index) => (
            <FutureCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: SECTION_TIMING.container,
            ease: SECTION_EASE,
            delay: 0.45,
          }}
          className="mt-16 text-center"
        >
          <p className="text-background/50 text-sm">
            Join our early access program to be the first to experience our
            upcoming solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
