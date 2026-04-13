"use client";

import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);

  useEffect(() => {
    // Check multiple indicators for touch device
    const hasTouch = () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none), (pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

    const update = () => {
      setIsTouchDevice(mediaQuery.matches);
    };

    // Set initial value immediately
    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  // Return true for mobile/touch devices, false for desktop
  // null indicates not yet determined (shouldn't happen after mount)
  return isTouchDevice ?? false;
}
