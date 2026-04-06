export function SiteAmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(22,101,52,0.13),transparent_42%),radial-gradient(circle_at_82%_10%,rgba(13,148,136,0.11),transparent_40%),radial-gradient(circle_at_52%_84%,rgba(6,95,70,0.12),transparent_48%)]" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
    </div>
  );
}
