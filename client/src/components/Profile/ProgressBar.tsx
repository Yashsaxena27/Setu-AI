interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-[#0F172A]/5 rounded-full h-2 overflow-hidden shadow-inner">
      <div
        className="h-full bg-[#14B8A6] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}