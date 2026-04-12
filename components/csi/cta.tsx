"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactFormModal } from "@/components/csi/contact-form-modal";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative py-14 lg:py-20 bg-background/95 md:bg-background/78 overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-5">
            <Mail className="w-4 h-4" />
            {"Let's Connect"}
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
            Ready to Build Something{" "}
            <span className="text-primary">Smarter?</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your manufacturing operations with intelligent systems
            designed for efficiency, sustainability, and growth. Let&apos;s
            discuss your vision.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: SECTION_TIMING.item,
              ease: SECTION_EASE,
              delay: 0.18,
            }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base font-medium group"
              onClick={() => setIsContactModalOpen(true)}
              data-track-click="contact-start-conversation"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 h-14 text-base font-medium border-border text-foreground hover:bg-muted hover:text-foreground"
            >
              <a href="#solutions" data-track-click="contact-view-solutions">
                View Our Solutions
              </a>
            </Button>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: SECTION_TIMING.item,
              ease: SECTION_EASE,
              delay: 0.3,
            }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground text-sm"
          >
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              anonymas903@gmail.com
            </button>
            <span className="hidden sm:block">•</span>
            <a
              href="tel:+1234567890"
              className="hover:text-foreground transition-colors"
            >
              +1 (234) 567-890
            </a>
            <span className="hidden sm:block">•</span>
            <span>Dhaka, Bangladesh</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </section>
  );
}
