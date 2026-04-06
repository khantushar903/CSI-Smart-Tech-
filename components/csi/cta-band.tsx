"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

export function CTABand() {
  return (
    <section
      id="strategy-cta"
      className="relative py-14 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          className="relative rounded-3xl border border-primary/20 bg-foreground text-background p-8 md:p-12 lg:p-14"
        >
          <div className="absolute -top-16 right-8 h-36 w-36 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-background/80">
                <CalendarCheck2 className="h-4 w-4" />
                Strategy Session
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                Want a 30-minute factory intelligence blueprint?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-background/75 leading-relaxed">
                Share your current setup and get a practical roadmap for IoT,
                automation, and energy optimization aligned to your operations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-52"
              >
                <a href="#contact" data-track-click="strategy-cta-book-session">
                  Book Session
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/25 bg-background/10 text-background hover:bg-background/20 hover:text-background min-w-52"
              >
                <a
                  href="#capabilities"
                  data-track-click="strategy-cta-view-capabilities"
                >
                  View Capabilities
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
