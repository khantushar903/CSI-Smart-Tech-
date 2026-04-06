import TechNeuralField from "@/components/ui/tech-neural-field";

export function SiteAmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(22,101,52,0.1),transparent_44%),radial-gradient(circle_at_86%_12%,rgba(13,148,136,0.08),transparent_42%),radial-gradient(circle_at_16%_84%,rgba(6,95,70,0.08),transparent_44%),radial-gradient(circle_at_84%_78%,rgba(22,101,52,0.07),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.46]">
        <TechNeuralField
          density={26000}
          speed={0.14}
          lineColor="rgba(22, 101, 52, 0.32)"
          nodeColor="rgba(22, 101, 52, 0.58)"
          interactive={false}
        />
      </div>
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
    </div>
  );
}
