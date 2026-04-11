export function SiteAmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        contain: "layout style paint",
        willChange: "transform",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(36,76,176,0.24),transparent_44%),radial-gradient(circle_at_86%_12%,rgba(71,137,255,0.2),transparent_42%),radial-gradient(circle_at_16%_84%,rgba(29,57,130,0.2),transparent_44%),radial-gradient(circle_at_84%_78%,rgba(36,76,176,0.18),transparent_45%)]" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
    </div>
  );
}
