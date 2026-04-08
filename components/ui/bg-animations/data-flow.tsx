"use client";

import { useEffect, useRef } from "react";

type DataFlowProps = {
  className?: string;
  speed?: number;
  particleCount?: number;
  lineColor?: string;
  particleColor?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  trail: { x: number; y: number }[];
};

export default function DataFlow({
  className,
  speed = 1,
  particleCount = 30,
  lineColor = "rgba(22, 101, 52, 0.3)",
  particleColor = "rgba(20, 184, 166, 0.8)",
}: DataFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    const particles: Particle[] = [];

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: 2 + Math.random() * 2,
          trail: [],
        });
      }
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 20) particle.trail.shift();

        // Draw trail
        if (particle.trail.length > 1) {
          context.beginPath();
          context.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let i = 1; i < particle.trail.length; i++) {
            context.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          context.strokeStyle = lineColor;
          context.lineWidth = 1;
          context.stroke();
        }

        // Draw particle
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3,
        );
        gradient.addColorStop(0, particleColor);
        gradient.addColorStop(1, particleColor.replace(/[\d.]+\)$/, "0)"));

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
      });

      frameId = requestAnimationFrame(drawFrame);
    };

    setupCanvas();
    drawFrame();

    const handleResize = () => setupCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [speed, particleCount, lineColor, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
