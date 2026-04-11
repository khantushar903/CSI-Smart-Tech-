"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

// Initialize EmailJS
if (typeof window !== "undefined") {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
}

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID || "",
        {
          email: email,
          from_name: "CSI Smart Tech",
          message: `New newsletter subscription from: ${email}`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );

      setStatus("success");
      setEmail("");

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");

      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="flex-1 px-4 py-2 rounded bg-input border border-input text-foreground placeholder-muted-foreground text-sm transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded bg-linear-to-r from-primary to-accent font-medium text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/20"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </motion.button>
      </div>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-green-400"
        >
          ✓ Successfully subscribed!
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-sm text-red-400"
        >
          ✗ Subscription failed. Please try again.
        </motion.p>
      )}
    </form>
  );
}
