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
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* CSI Smart Tech Premium Logo */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer hexagon with gradient effect */}
        <path
          d="M32 2L58 16V48L32 62L6 48V16L32 2Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />

        {/* Subtle inner hexagon */}
        <path
          d="M32 10L50 20V44L32 54L14 44V20L32 10Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />

        {/* Premium geometric design - tech pattern */}
        <g opacity="0.85">
          {/* Top point accent */}
          <line
            x1="32"
            y1="10"
            x2="32"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Bottom point accent */}
          <line
            x1="32"
            y1="42"
            x2="32"
            y2="54"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Left center accent */}
          <line
            x1="14"
            y1="32"
            x2="26"
            y2="32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Right center accent */}
          <line
            x1="38"
            y1="32"
            x2="50"
            y2="32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Center accent circle - premium dot */}
        <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.9" />
      </svg>

      {showWordmark && (
        <div className={cn("flex flex-col leading-tight", text)}>
          <span className="font-bold" style={{ color: "inherit" }}>
            CSI
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "currentColor", opacity: 0.7 }}
          >
            SMART TECH
          </span>
        </div>
      )}
    </div>
  );
}
