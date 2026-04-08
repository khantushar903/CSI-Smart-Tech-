"use client";

import {
  TechNeuralField,
  MatrixRain,
  CircuitBoard,
  GeometricWaves,
  DataFlow,
  TechGrid,
  ParticleNetwork,
} from "./index";

export default function AnimationPreview() {
  const animations = [
    {
      name: "Neural Field",
      id: "neural-field",
      component: (
        <TechNeuralField
          density={22000}
          speed={0.18}
          lineColor="rgba(22, 101, 52, 0.34)"
          nodeColor="rgba(22, 101, 52, 0.82)"
          sweepOpacity={0.24}
        />
      ),
      description: "Connected particles",
    },
    {
      name: "Matrix Rain",
      id: "matrix-rain",
      component: (
        <MatrixRain speed={1} density={0.95} color="rgba(22, 101, 52, 0.8)" />
      ),
      description: "Falling code",
    },
    {
      name: "Circuit Board",
      id: "circuit-board",
      component: (
        <CircuitBoard
          speed={0.5}
          lineColor="rgba(22, 101, 52, 0.3)"
          nodeColor="rgba(22, 101, 52, 0.6)"
          pulseColor="rgba(20, 184, 166, 0.9)"
        />
      ),
      description: "Circuit paths",
    },
    {
      name: "Geometric Waves",
      id: "geometric-waves",
      component: (
        <GeometricWaves
          speed={1}
          waveCount={4}
          color="rgba(22, 101, 52, 0.3)"
        />
      ),
      description: "Flowing waves",
    },
    {
      name: "Data Flow",
      id: "data-flow",
      component: (
        <DataFlow
          speed={1}
          particleCount={30}
          lineColor="rgba(22, 101, 52, 0.3)"
          particleColor="rgba(20, 184, 166, 0.8)"
        />
      ),
      description: "Particle trails",
    },
    {
      name: "Tech Grid",
      id: "tech-grid",
      component: (
        <TechGrid
          speed={0.5}
          gridSize={60}
          lineColor="rgba(22, 101, 52, 0.15)"
          dotColor="rgba(22, 101, 52, 0.4)"
        />
      ),
      description: "Wavy grid",
    },
    {
      name: "Particle Network",
      id: "particle-network",
      component: (
        <ParticleNetwork
          speed={0.5}
          particleCount={50}
          lineColor="rgba(22, 101, 52, 0.2)"
          particleColor="rgba(20, 184, 166, 0.7)"
          connectionDistance={120}
        />
      ),
      description: "Connected network",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          7 Background Animations
        </h1>
        <p className="text-muted-foreground mb-8">
          Click on any animation name to copy its ID
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {animations.map((a) => (
            <div
              key={a.id}
              className="border border-border rounded-lg overflow-hidden bg-card shadow-sm"
            >
              <div className="relative h-64 bg-background overflow-hidden">
                {a.component}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {a.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {a.description}
                </p>
                <code className="text-xs block bg-muted px-2 py-1 rounded font-mono">
                  &quot;{a.id}&quot;
                </code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-foreground">
            How to Switch
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            Edit{" "}
            <code className="bg-background px-1 py-0.5 rounded">
              components/csi/hero.tsx
            </code>{" "}
            line 21:
          </p>
          <pre className="bg-background p-3 rounded text-sm overflow-x-auto">
            <code>
              const ACTIVE_ANIMATION = &quot;radar-scan&quot; as AnimationType;
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
