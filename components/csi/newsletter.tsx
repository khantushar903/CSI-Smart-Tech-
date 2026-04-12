"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsletterCard from "./newsletter-card";
import NewsletterForm from "./newsletter-form";
import { NewsletterModal } from "./newsletter-modal";
import { SECTION_EASE, SECTION_TIMING } from "./motion-presets";
import type { Newsletter } from "./newsletter-types";

export default function NewsletterSection() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNewsletter, setSelectedNewsletter] =
    useState<Newsletter | null>(null);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        const response = await fetch("/data/newsletters.json");
        if (response.ok) {
          const data = await response.json();
          setNewsletters(data);
        }
      } catch (error) {
        console.error("Failed to load newsletters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNewsletters();
  }, []);

  const handleReadNewsletter = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsNewsletterModalOpen(true);
  };

  const handleNewsletterModalOpenChange = (open: boolean) => {
    setIsNewsletterModalOpen(open);
    if (!open) {
      setSelectedNewsletter(null);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative px-4 py-12 sm:py-14 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 lg:mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="mb-4 inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Stay Updated
          </motion.p>
          <motion.h2
            className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Newsletter & Updates
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Get insights, industry trends, and CSI updates delivered to your
            inbox
          </motion.p>
        </motion.div>

        {/* Newsletter Signup Form */}
        <div className="mb-10 rounded-lg border border-border bg-card p-8 sm:p-10">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            Subscribe to Our Newsletter
          </h3>
          <NewsletterForm />
        </div>

        {/* Featured Newsletters */}
        {!isLoading && newsletters.length > 0 && (
          <div>
            <h3 className="mb-8 text-2xl font-semibold text-foreground">
              Latest Newsletters
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsletters.map((newsletter, index) => (
                <motion.div
                  key={newsletter.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <NewsletterCard
                    title={newsletter.title}
                    excerpt={newsletter.excerpt}
                    date={newsletter.date}
                    onReadClick={() => handleReadNewsletter(newsletter)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center text-muted-foreground py-12">
            Loading newsletters...
          </div>
        )}

        <NewsletterModal
          open={isNewsletterModalOpen}
          newsletter={selectedNewsletter}
          onOpenChange={handleNewsletterModalOpenChange}
        />
      </div>
    </section>
  );
}
