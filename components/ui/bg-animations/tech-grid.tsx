"use client";

import { useEffect, useRef } from "react";

type TechGridProps = {
  className?: string;
  speed?: number;
  gridSize?: number;
  lineColor?: string;
  dotColor?: string;
};

export default function TechGrid({
  className,
  speed = 0.5,
  gridSize = 60,
  lineColor = "rgba(22, 101, 52, 0.15)",
  dotColor = "rgba(22, 101, 52, 0.4)",
}: TechGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let time = 0;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      const offset = (time * speed) % gridSize;

      // Draw vertical lines with wave effect
      for (let x = -gridSize + offset; x <= width + gridSize; x += gridSize) {
        context.beginPath();
        for (let y = 0; y <= height; y += 5) {
          const wave = Math.sin((y + time * speed * 2) * 0.01) * 8;
          if (y === 0) {
            context.moveTo(x + wave, y);
          } else {
            context.lineTo(x + wave, y);
          }
        }
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.stroke();
      }

      // Draw horizontal lines with wave effect
      for (let y = -gridSize + offset; y <= height + gridSize; y += gridSize) {
        context.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const wave = Math.sin((x + time * speed * 2) * 0.01) * 8;
          if (x === 0) {
            context.moveTo(x, y + wave);
          } else {
            context.lineTo(x, y + wave);
          }
        }
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.stroke();
      }

      // Draw animated dots at intersections
      for (let x = -gridSize + offset; x <= width + gridSize; x += gridSize) {
        for (
          let y = -gridSize + offset;
          y <= height + gridSize;
          y += gridSize
        ) {
          const waveX = Math.sin((y + time * speed * 2) * 0.01) * 8;
          const waveY = Math.sin((x + time * speed * 2) * 0.01) * 8;
          const pulse = Math.sin(time * 0.05 + x * 0.01 + y * 0.01) * 0.5 + 0.5;

          context.beginPath();
          context.arc(x + waveX, y + waveY, 2 + pulse * 1.5, 0, Math.PI * 2);
          context.fillStyle = dotColor.replace(
            /[\d.]+\)$/,
            `${0.4 + pulse * 0.4})`,
          );
          context.fill();
        }
      }

      time += 1;
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
  }, [speed, gridSize, lineColor, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
