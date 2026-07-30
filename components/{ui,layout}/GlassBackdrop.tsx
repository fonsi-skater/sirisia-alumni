export function GlassBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-light/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blue/20 blur-3xl" />
    </div>
  );
}