export function GlassBackdrop() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <img src="/background.jpg" alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-parchment/85" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-light/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-pink-light/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blue/20 blur-3xl" />
    </div>
  );
}
