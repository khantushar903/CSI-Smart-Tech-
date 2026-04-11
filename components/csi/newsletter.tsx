"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsletterCard from "./newsletter-card";
import NewsletterForm from "./newsletter-form";
import { SECTION_EASE, SECTION_TIMING } from "./motion-presets";

export interface Newsletter {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  link?: string;
}

export default function NewsletterSection() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <section id="newsletter" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: SECTION_TIMING.header, ease: SECTION_EASE }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            className="mb-4 text-sm uppercase tracking-widest text-accent font-semibold"
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
        <div className="mb-20 rounded-lg border border-border bg-card p-8 sm:p-10">
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
                    link={newsletter.link}
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
      </div>
    </section>
  );
}
