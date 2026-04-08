"use client";

import { useEffect, useRef } from "react";

type CircuitBoardProps = {
  className?: string;
  speed?: number;
  lineColor?: string;
  nodeColor?: string;
  pulseColor?: string;
};

type Node = {
  x: number;
  y: number;
};

type Connection = {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
};

export default function CircuitBoard({
  className,
  speed = 0.5,
  lineColor = "rgba(22, 101, 52, 0.3)",
  nodeColor = "rgba(22, 101, 52, 0.6)",
  pulseColor = "rgba(20, 184, 166, 0.9)",
}: CircuitBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      nodes.length = 0;
      connections.length = 0;

      const cols = Math.floor(width / 120) + 2;
      const rows = Math.floor(height / 120) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            x: i * 120 + (Math.random() - 0.5) * 40,
            y: j * 120 + (Math.random() - 0.5) * 40,
          });
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nearbyNodes = nodes.filter((n) => {
          const dx = n.x - node.x;
          const dy = n.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist > 0 && dist < 150;
        });

        nearbyNodes.forEach((target) => {
          if (Math.random() > 0.6) {
            connections.push({
              from: node,
              to: target,
              progress: Math.random(),
              speed: 0.3 + Math.random() * 0.5,
            });
          }
        });
      }
    };

    const drawFrame = () => {
      // Transparent background to match existing UI
      context.clearRect(0, 0, width, height);

      // Draw connections
      connections.forEach((conn) => {
        const dx = conn.to.x - conn.from.x;
        const dy = conn.to.y - conn.from.y;

        // Static line
        context.beginPath();
        context.moveTo(conn.from.x, conn.from.y);
        context.lineTo(conn.to.x, conn.to.y);
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.stroke();

        // Animated pulse
        const pulseX = conn.from.x + dx * conn.progress;
        const pulseY = conn.from.y + dy * conn.progress;

        const gradient = context.createRadialGradient(
          pulseX,
          pulseY,
          0,
          pulseX,
          pulseY,
          8,
        );
        gradient.addColorStop(0, pulseColor);
        gradient.addColorStop(1, "rgba(20, 184, 166, 0)");

        context.beginPath();
        context.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();

        conn.progress += conn.speed * 0.01 * speed;
        if (conn.progress > 1) {
          conn.progress = 0;
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, 3, 0, Math.PI * 2);
        context.fillStyle = nodeColor;
        context.fill();

        context.beginPath();
        context.arc(node.x, node.y, 6, 0, Math.PI * 2);
        context.strokeStyle = lineColor;
        context.lineWidth = 1;
        context.stroke();
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
  }, [speed, lineColor, nodeColor, pulseColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
