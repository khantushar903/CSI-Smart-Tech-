// Premium easing curves for smooth, polished animations
export const SECTION_EASE = [0.22, 1, 0.36, 1] as const;

// Additional premium easing curves
export const EASING = {
  // Smooth and natural
  smooth: [0.25, 0.46, 0.45, 0.94] as const,

  // Sharp and snappy
  snappy: [0.4, 0, 0.2, 1] as const,

  // Elegant ease-out
  elegant: [0.16, 1, 0.3, 1] as const,

  // Bouncy spring effect
  bouncy: [0.68, -0.55, 0.265, 1.55] as const,

  // Fluid motion
  fluid: [0.87, 0, 0.13, 1] as const,

  // Premium default
  premium: [0.25, 0.46, 0.45, 0.94] as const,
} as const;

export const SECTION_TIMING = {
  container: 0.82,
  header: 0.72,
  item: 0.76,
  detail: 0.52,
  line: 1,
  stagger: 0.09,
  microStagger: 0.08,
  beam: 10,
} as const;

// Spring configurations for smooth physics-based animations
export const SPRING = {
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 30,
    mass: 1,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
    mass: 1,
  },
  smooth: {
    type: "spring" as const,
    stiffness: 150,
    damping: 25,
    mass: 0.5,
  },
  responsive: {
    type: "spring" as const,
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  },
} as const;
