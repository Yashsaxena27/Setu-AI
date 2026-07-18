interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export default function Progress({
  value,
  max = 100,
  className = "",
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full bg-[#0F172A]/5 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-[#14B8A6] h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
