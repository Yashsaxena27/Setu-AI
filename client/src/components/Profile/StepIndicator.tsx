interface Props {
  current: number;
  total: number;
}

export default function StepIndicator({
  current,
  total,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">
        Step {current} of {total}
      </h2>

      <span className="text-gray-500">
        {Math.round((current / total) * 100)}%
      </span>
    </div>
  );
}