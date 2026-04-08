"use client";

import { useEffect, useRef } from "react";

type GeometricWavesProps = {
  className?: string;
  speed?: number;
  waveCount?: number;
  color?: string;
};

export default function GeometricWaves({
  className,
  speed = 1,
  waveCount = 4,
  color = "rgba(22, 101, 52, 0.3)",
}: GeometricWavesProps) {
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

    const drawWave = (
      offset: number,
      amplitude: number,
      frequency: number,
      opacity: number,
    ) => {
      context.beginPath();
      context.moveTo(0, height / 2);

      for (let x = 0; x < width; x += 10) {
        const y =
          height / 2 + Math.sin((x * frequency + offset) * 0.01) * amplitude;
        context.lineTo(x, y);
      }

      context.strokeStyle = color.replace(/[\d.]+\)$/, `${opacity})`);
      context.lineWidth = 2;
      context.stroke();
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      // Draw simplified waves
      for (let i = 0; i < waveCount; i++) {
        const offset = time * speed + i * 150;
        const amplitude = 40 + i * 15;
        const frequency = 0.8 + i * 0.15;
        const opacity = 0.4 - i * 0.08;
        drawWave(offset, amplitude, frequency, opacity);
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
  }, [speed, waveCount, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
