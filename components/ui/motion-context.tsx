"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MotionContextType {
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextType>({
  reducedMotion: false,
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check system preference for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    setIsMounted(true);

    // Listen for changes in system preference
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Avoid hydration mismatch by waiting until mounted
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <MotionContext.Provider value={{ reducedMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useReducedMotion(): boolean {
  const context = useContext(MotionContext);
  return context.reducedMotion;
}
