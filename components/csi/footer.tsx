"use client";

import { motion } from "framer-motion";
import { Logo } from "./logo";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import { ContactFormModal } from "@/components/csi/contact-form-modal";

const footerLinks = {
  solutions: [
    { label: "Industrial Automation", href: "#solutions" },
    { label: "IoT Systems", href: "#solutions" },
    { label: "Cloud Manufacturing", href: "#solutions" },
    { label: "Sustainability", href: "#solutions" },
    { label: "AI-ERP Integration", href: "#solutions" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Industries", href: "#industries" },
    { label: "Why CSI", href: "#why-csi" },
    { label: "Contact", href: "#contact" },
  ],
  resources: [
    { label: "Case Studies", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "mailto:anonymas903@gmail.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Logo size="md" className="text-background" />
              <p className="mt-4 text-background/60 text-sm leading-relaxed max-w-xs">
                Building intelligent industrial systems for sustainable,
                efficient, and future-ready manufacturing.
              </p>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-4">
                {socialLinks.map((social) =>
                  social.label === "Email" ? (
                    <motion.button
                      key={social.label}
                      onClick={() => setIsContactModalOpen(true)}
                      className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </div>

          {/* Solutions links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  anonymas903@gmail.com
                </button>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-background transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>© {currentYear} CSI Smart Tech. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </footer>
  );
}
