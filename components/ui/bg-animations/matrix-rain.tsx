"use client";

import { useEffect, useRef } from "react";

type MatrixRainProps = {
  className?: string;
  speed?: number;
  density?: number;
  color?: string;
};

export default function MatrixRain({
  className,
  speed = 1,
  density = 0.95,
  color = "rgba(22, 101, 52, 0.8)",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    const columns: number[] = [];
    const fontSize = 14;

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      const numColumns = Math.floor(width / fontSize);
      columns.length = 0;
      for (let i = 0; i < numColumns; i++) {
        columns[i] = Math.random() < density ? Math.random() * height : height;
      }
    };

    const drawFrame = () => {
      // Transparent fade effect instead of black
      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(255, 255, 255, 0.05)";
      context.fillRect(0, 0, width, height);

      context.fillStyle = color;
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = columns[i];

        context.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          columns[i] = 0;
        }

        columns[i] += fontSize * speed;
      }

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
  }, [speed, density, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
