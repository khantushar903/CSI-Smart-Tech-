"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

// Initialize EmailJS
if (typeof window !== "undefined") {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
}

interface NewsletterFormData {
  name: string;
  email: string;
}

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    mode: "onBlur",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: data.name,
          email: data.email,
          message: `Newsletter signup from: ${data.name} (${data.email})`,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
      );

      setStatus("success");
      reset();

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
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded bg-input border border-input text-foreground placeholder-muted-foreground transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded bg-input border border-input text-foreground placeholder-muted-foreground transition-colors focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-3 rounded bg-linear-to-r from-primary to-accent font-semibold text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/20"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-green-400 text-sm"
          >
            ✓ Thank you for subscribing! Check your email for confirmation.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-sm"
          >
            ✗ Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
