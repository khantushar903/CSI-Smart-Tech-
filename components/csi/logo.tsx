"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className,
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* CSI Smart Tech Hexagon Logo */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 text-primary"
      >
        {/* Outer hexagon - primary blue */}
        <path
          d="M24 2L43.3 12V36L24 46L4.7 36V12L24 2Z"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Inner hexagon - lighter construction line */}
        <path
          d="M24 8L38.1 15.5V32.5L24 40L9.9 32.5V15.5L24 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          fill="none"
        />
        {/* Center accent point */}
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>

      {showWordmark && (
        <div className={cn("flex flex-col leading-tight", text)}>
          <span className="font-bold text-primary">CSI</span>
          <span className="text-xs font-semibold text-primary/70">SMART TECH</span>
        </div>
      )}
    </div>
  );
}
