type Props = {
  title: string;
  currentTotal: number;
  goalAmount: number;
};

export function ContributionThermometer({ title, currentTotal, goalAmount }: Props) {
  const percent = Math.min(100, Math.round((currentTotal / goalAmount) * 100));

  return (
    <div className="glass relative rounded-xl p-5 overflow-hidden">
      {/* Sash corner — the two uniform colors as a fixed detail, not a gradient */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute top-0 right-0 w-16 h-4 bg-blue rotate-45 translate-x-4 -translate-y-2" />
        <div className="absolute top-0 right-0 w-16 h-4 bg-pink rotate-45 translate-x-4 translate-y-3" />
      </div>

      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-display text-lg text-blue-dark">{title}</h3>
        <span className="font-mono text-sm text-blue-dark">{percent}%</span>
      </div>

      <div className="relative h-4 rounded-sm bg-white/50 border border-white/60 overflow-hidden">
        <div className="h-full bg-blue" style={{ width: `${percent}%` }} />
        <div className="absolute inset-0 flex">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-pink/40" />
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-3 font-mono text-sm">
        <span className="text-ink">KES {currentTotal.toLocaleString()}</span>
        <span className="text-ink/60">of KES {goalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}
