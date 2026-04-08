"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactFormModal } from "@/components/csi/contact-form-modal";
import { SECTION_EASE, SECTION_TIMING } from "@/components/csi/motion-presets";

const faqs = [
  {
    question: "What types of industrial automation solutions do you provide?",
    answer:
      "We provide comprehensive industrial automation solutions including IoT systems, cloud manufacturing platforms, AI-ERP integration, and sustainability-focused solutions. Our systems are designed to optimize efficiency, reduce costs, and improve overall manufacturing performance across various industries.",
  },
  {
    question:
      "How do your IoT systems integrate with existing manufacturing equipment?",
    answer:
      "Our IoT solutions are designed for seamless integration with legacy and modern equipment. We use standardized protocols and APIs to connect various devices, sensors, and systems. Our platform provides real-time data collection, monitoring, and analytics while maintaining compatibility with your existing infrastructure.",
  },
  {
    question: "How long does it typically take to implement your solutions?",
    answer:
      "Implementation timelines vary based on project scope and complexity. Simple IoT deployments can be completed in 4-6 weeks, while comprehensive automation systems may take 3-6 months. We provide detailed project timelines during our initial consultation and maintain regular progress updates throughout the implementation.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support packages including 24/7 monitoring, regular maintenance, software updates, training, and technical support. Our team ensures your systems operate at peak performance with minimal downtime.",
  },
  {
    question: "What is the typical ROI for your automation solutions?",
    answer:
      "ROI varies by implementation, but most clients see significant returns within 12-18 months through increased efficiency, reduced operational costs, minimized downtime, and improved quality control. We provide detailed ROI projections during the planning phase based on your specific requirements.",
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-background/50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: SECTION_TIMING.header,
            ease: SECTION_EASE,
          }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: SECTION_TIMING.detail,
              ease: SECTION_EASE,
              delay: 0.1,
            }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
          >
            <HelpCircle className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our industrial automation
            solutions and services.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: 30, scale: 0.98 }
              }
              transition={{
                duration: SECTION_TIMING.item,
                delay: index * SECTION_TIMING.stagger + 0.2,
                ease: SECTION_EASE,
              }}
            >
              <Accordion.Item
                value={`item-${index}`}
                className="group border border-border rounded-2xl bg-card hover:shadow-lg transition-all duration-300"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200 rounded-2xl group-data-[state=open]:rounded-b-none">
                    <h3 className="text-lg font-semibold text-foreground pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <motion.div
                      initial={false}
                      animate={{ rotate: 0 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </motion.div>
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    className="px-6 pb-6 pt-2"
                  >
                    <div className="prose prose-neutral max-w-none dark:prose-invert">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion.Root>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: SECTION_TIMING.detail,
            delay: faqs.length * SECTION_TIMING.stagger + 0.4,
            ease: SECTION_EASE,
          }}
          className="text-center mt-16"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Our team of experts is ready to help you find the perfect solution
              for your business.
            </p>
            <motion.button
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200"
            >
              Contact Our Experts
            </motion.button>
          </div>
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
