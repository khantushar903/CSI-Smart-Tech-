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
    <div className={cn("flex items-center gap-2", className)}>
      {/* Abstract geometric symbol representing connectivity and intelligence */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer hexagonal frame representing systems architecture */}
        <path
          d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Inner connected nodes representing IoT and connectivity */}
        <circle cx="24" cy="14" r="3" fill="currentColor" />
        <circle cx="14" cy="24" r="3" fill="currentColor" />
        <circle cx="34" cy="24" r="3" fill="currentColor" />
        <circle cx="24" cy="34" r="3" fill="currentColor" />
        {/* Connection lines representing data flow */}
        <line
          x1="24"
          y1="17"
          x2="24"
          y2="31"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="17"
          y1="24"
          x2="31"
          y2="24"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="17"
          y1="17"
          x2="31"
          y2="31"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="31"
          y1="17"
          x2="17"
          y2="31"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        {/* Center intelligence node */}
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>

      {showWordmark && (
        <div className={cn("font-semibold tracking-tight", text)}>
          <span>CSI</span>
          <span className="opacity-60 font-normal ml-1">Smart Tech</span>
        </div>
      )}
    </div>
  );
}
