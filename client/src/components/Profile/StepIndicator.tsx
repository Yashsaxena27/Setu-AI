interface Props {
  current: number;
  total: number;
}

export default function StepIndicator({ current, total }: Props) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="flex justify-between items-baseline mb-2">
      <h2 className="font-serif text-2xl font-bold tracking-tight text-[#0F172A]">
        Profile Step {current} <span className="text-slate-400 font-sans text-sm font-semibold">of {total}</span>
      </h2>
      <span className="text-xs font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded-md">
        {percentage}% Ready
      </span>
    </div>
  );
}