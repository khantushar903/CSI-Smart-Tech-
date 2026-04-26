"use client";

import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  lockModalScroll,
  unlockModalScroll,
} from "@/components/ui/modal-scroll-lock";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  Building,
  Phone,
  MessageSquare,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  website?: string;
}

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ContactFormModalContent({
  open,
  onOpenChange,
}: ContactFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (open) {
      lockModalScroll();
    } else {
      unlockModalScroll();
    }

    return () => {
      unlockModalScroll();
    };
  }, [open]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source: "contact-modal",
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();

      // Auto-close after 3 seconds on success
      setTimeout(() => {
        onOpenChange(false);
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      setSubmitStatus("idle");
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-131.25">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
            Start a Conversation
          </DialogTitle>
          <DialogDescription className="text-base">
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div className="py-8 text-center" role="status" aria-live="polite">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. We&apos;ll get back to you within 24
              hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />

            {submitStatus === "error" && (
              <div
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
                role="alert"
                aria-live="assertive"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm text-red-700 font-medium">
                    Failed to send message
                  </p>
                  <p className="text-xs text-red-600">
                    Please try again or contact us directly at{" "}
                    <a
                      href="mailto:info@csi-enc.com"
                      className="underline hover:no-underline"
                    >
                      info@csi-enc.com
                    </a>{" "}
                    or{" "}
                    <a href="tel:+88028991492" className="underline hover:no-underline">
                      +88028991492
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4" aria-hidden="true" />
                  Full Name <span aria-label="required">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Email Address <span aria-label="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="your@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Building className="w-4 h-4" aria-hidden="true" />
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  placeholder="Your Company"
                  {...register("company")}
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  placeholder="+880 XXX-XXXXXXX"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                Message <span aria-label="required">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tell us about your project, challenges, or how we can help you..."
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 h-11"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Contact Info Footer */}
        <div className="border-t pt-4 mt-6">
          <p className="text-xs text-muted-foreground text-center">
            Or reach us directly at{" "}
            <a
              href="mailto:info@csi-enc.com"
              className="text-primary hover:underline font-medium"
            >
              info@csi-enc.com
            </a>{" "}
            or{" "}
            <a
              href="tel:+88028991492"
              className="text-primary hover:underline font-medium sm:hidden"
            >
              +88028991492
            </a>
            <span className="text-foreground/80 font-medium hidden sm:inline">
              +88028991492
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Memoize the ContactFormModal to prevent unnecessary re-renders
export const ContactFormModal = memo(ContactFormModalContent);
