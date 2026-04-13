"use client";

import {
  motion,
  useAnimationControls,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Factory,
  Handshake,
  Layers3,
  Scissors,
  Shirt,
  Sparkles,
} from "lucide-react";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";

const industries = [
  {
    icon: Factory,
    name: "Textile Mills",
    description:
      "Optimize weaving, dyeing, and finishing with intelligent monitoring and practical automation.",
    metric: "35%",
    label: "Efficiency Increase",
  },
  {
    icon: Shirt,
    name: "Garment Factories",
    description:
      "Streamline cutting, sewing, and assembly lines through real-time visibility and production control.",
    metric: "40%",
    label: "Waste Reduction",
  },
  {
    icon: Scissors,
    name: "Accessories and Trims",
    description:
      "Run precision operations with automated quality checks and tighter inventory coordination.",
    metric: "99.5%",
    label: "Quality Rate",
  },
  {
    icon: Layers3,
    name: "Knitting and Composite Units",
    description:
      "Monitor complex knitting patterns and composite workflows with fewer bottlenecks and better consistency.",
    metric: "28%",
    label: "Faster Cycles",
  },
  {
    icon: Sparkles,
    name: "General Manufacturing",
    description:
      "Deploy end-to-end smart systems for mixed manufacturing environments across diverse product lines.",
    metric: "50+",
    label: "Live Deployments",
  },
  {
    icon: Handshake,
    name: "OEM and Supplier Networks",
    description:
      "Connect suppliers, production partners, and internal teams through shared, reliable operational data.",
    metric: "24/7",
    label: "Supply Visibility",
  },
] as const;

function IndustryCard({
  industry,
  index,
}: {
  industry: (typeof industries)[number];
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

  const contentOffsetX = useTransform(smoothRotateY, [-5, 5], [-3, 3]);
  const contentOffsetY = useTransform(smoothRotateX, [-4, 4], [2, -2]);

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${smoothGlowX}% ${smoothGlowY}%, rgba(13, 110, 253, 0.22), rgba(13, 110, 253, 0) 63%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

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

  useEffect(() => {
    if (isHovering && !reducedMotion) {
      iconControls.start({
        y: [0, -5, 0],
        transition: {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    } else {
      iconControls.stop();
      iconControls.set({ y: 0 });
    }
  }, [isHovering, reducedMotion, iconControls]);

  const row = Math.floor(index / 3);
  const col = index % 3;

  const entryAnimation = reducedMotion
    ? { opacity: 0, y: 20 }
    : (row + col) % 2 === 0
      ? { opacity: 0, y: 44, x: -30, scale: 0.95, rotate: -2 }
      : { opacity: 0, y: 44, x: 30, scale: 0.95, rotate: 2 };

  return (
    <motion.div
      className="relative h-full"
      initial={entryAnimation}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.22, margin: "-60px 0px -60px 0px" }}
      transition={{
        duration: SECTION_TIMING.item,
        delay: (index % 3) * 0.06,
        ease: SECTION_EASE,
      }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      onPointerEnter={reducedMotion ? undefined : () => setIsHovering(true)}
      onPointerMove={reducedMotion ? undefined : handlePointerMove}
      onPointerLeave={() => {
        setIsHovering(false);
        resetCard();
      }}
    >
      <motion.div
        className={`group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 transform-3d ${
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
          className="pointer-events-none absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={
            isHovering
              ? { opacity: 0.8, scaleX: 1 }
              : { opacity: 0.2, scaleX: 0.85 }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        <div
          className={`absolute inset-0 bg-linear-to-br from-primary/15 to-accent/5 transition-opacity duration-500 ${
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
          className="relative z-10 flex h-full flex-col"
          style={
            reducedMotion ? undefined : { x: contentOffsetX, y: contentOffsetY }
          }
        >
          <motion.div
            className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
            animate={iconControls}
            whileHover={reducedMotion ? undefined : { scale: 1.12 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <industry.icon className="relative h-6 w-6 text-primary/80" />
          </motion.div>

          <h3 className="mb-3 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {industry.name}
          </h3>

          <p className="mb-6 leading-relaxed text-muted-foreground">
            {industry.description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/40 pt-4">
            <span className="text-lg font-bold text-primary">
              {industry.metric}
            </span>
            <span className="text-xs text-muted-foreground text-right">
              {industry.label}
            </span>
          </div>
        </motion.div>
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
      className="relative overflow-hidden bg-background/94 md:bg-background/78 py-14 sm:py-16 lg:py-20"
      ref={ref}
    >
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-linear-to-l from-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            Industries We Serve
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Built for Real Manufacturing Environments
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Each sector has different bottlenecks. Our systems adapt to those
            differences without adding complexity to your operations.
          </p>
        </motion.div>

        <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
