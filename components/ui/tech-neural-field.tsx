"use client";

import { useEffect, useRef } from "react";

type TechNeuralFieldProps = {
  className?: string;
  density?: number;
  speed?: number;
  lineColor?: string;
  nodeColor?: string;
  sweepOpacity?: number;
  interactive?: boolean;
};

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

export default function TechNeuralField({
  className,
  density = 24000,
  speed = 0.16,
  lineColor = "rgba(36, 76, 176, 0.28)",
  nodeColor = "rgba(36, 76, 176, 0.74)",
  sweepOpacity = 0.1,
  interactive = true,
}: TechNeuralFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let isCanvasVisible = true;
    let isPageVisible = !document.hidden;
    let observer: IntersectionObserver | null = null;

    let pointerX = 0;
    let pointerY = 0;
    let hasPointer = false;

    const nodes: NodePoint[] = [];

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.35);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes.length = 0;
      const targetNodeCount = Math.min(
        96,
        Math.max(26, Math.floor((width * height) / density)),
      );

      for (let i = 0; i < targetNodeCount; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          radius: 1.2 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      setupCanvas();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = clamp(event.clientX - rect.left, 0, width);
      pointerY = clamp(event.clientY - rect.top, 0, height);
      hasPointer = true;
    };

    const handlePointerLeave = () => {
      hasPointer = false;
    };

    const stopLoop = () => {
      if (!frameId) return;
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const startLoop = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(drawFrame);
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && isCanvasVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const drawFrame = (timestamp: number) => {
      const time = timestamp * 0.001;
      const moveFactor = prefersReducedMotion.matches ? speed * 0.25 : speed;

      context.clearRect(0, 0, width, height);

      const backdrop = context.createRadialGradient(
        width * 0.24,
        height * 0.2,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.9,
      );
      backdrop.addColorStop(0, "rgba(36, 76, 176, 0.11)");
      backdrop.addColorStop(0.45, "rgba(71, 137, 255, 0.06)");
      backdrop.addColorStop(1, "rgba(15, 23, 42, 0)");
      context.fillStyle = backdrop;
      context.fillRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx * moveFactor;
        node.y += node.vy * moveFactor;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.x = clamp(node.x, 0, width);
        node.y = clamp(node.y, 0, height);
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 140) continue;

          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = lineColor;
          context.globalAlpha = (1 - distance / 140) * 0.38;
          context.lineWidth = 0.8;
          context.stroke();
        }
      }

      if (interactive && hasPointer) {
        for (const node of nodes) {
          const dx = node.x - pointerX;
          const dy = node.y - pointerY;
          const distance = Math.hypot(dx, dy);
          if (distance > 170) continue;

          context.beginPath();
          context.moveTo(node.x, node.y);
          context.lineTo(pointerX, pointerY);
          context.strokeStyle = "rgba(20, 184, 166, 0.56)";
          context.globalAlpha = (1 - distance / 170) * 0.45;
          context.lineWidth = 0.9;
          context.stroke();
        }
      }

      context.globalAlpha = 1;
      for (const node of nodes) {
        const pulse = 0.7 + Math.sin(time * 2.4 + node.phase) * 0.35;

        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = nodeColor;
        context.fill();
      }

      if (!prefersReducedMotion.matches && sweepOpacity > 0) {
        const sweepX = ((time * 66) % (width + 260)) - 130;
        const sweep = context.createLinearGradient(
          sweepX - 90,
          0,
          sweepX + 90,
          0,
        );
        sweep.addColorStop(0, "rgba(36, 76, 176, 0)");
        sweep.addColorStop(0.5, `rgba(36, 76, 176, ${sweepOpacity})`);
        sweep.addColorStop(1, "rgba(36, 76, 176, 0)");
        context.fillStyle = sweep;
        context.fillRect(0, 0, width, height);
      }

      context.globalAlpha = 1;
      frameId = window.requestAnimationFrame(drawFrame);
    };

    setupCanvas();
    observer = new IntersectionObserver(
      (entries) => {
        isCanvasVisible = entries[0]?.isIntersecting ?? false;
        if (isCanvasVisible && isPageVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (interactive) {
      canvas.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      canvas.addEventListener("pointerleave", handlePointerLeave);
    }

    if (isPageVisible) {
      startLoop();
    }

    return () => {
      stopLoop();
      observer?.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (interactive) {
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [density, interactive, lineColor, nodeColor, speed, sweepOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
