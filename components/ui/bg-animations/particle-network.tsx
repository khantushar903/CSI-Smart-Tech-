"use client";

import { useEffect, useRef } from "react";

type ParticleNetworkProps = {
  className?: string;
  speed?: number;
  particleCount?: number;
  lineColor?: string;
  particleColor?: string;
  connectionDistance?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function ParticleNetwork({
  className,
  speed = 0.5,
  particleCount = 50,
  lineColor = "rgba(22, 101, 52, 0.2)",
  particleColor = "rgba(20, 184, 166, 0.7)",
  connectionDistance = 120,
}: ParticleNetworkProps) {
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
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: 2 + Math.random() * 2,
        });
      }
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      // Update positions
      particles.forEach((p) => {
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.strokeStyle = lineColor.replace(
              /[\d.]+\)$/,
              `${opacity * 0.4})`,
            );
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Glow
        const gradient = context.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3,
        );
        gradient.addColorStop(0, particleColor);
        gradient.addColorStop(1, particleColor.replace(/[\d.]+\)$/, "0)"));

        context.beginPath();
        context.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();

        // Core
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = particleColor;
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
  }, [speed, particleCount, lineColor, particleColor, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
