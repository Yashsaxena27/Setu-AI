interface Props {
  reasons: string[];
}

export default function WhyMatchBox({ reasons }: Props) {
  return (
    <div className="mt-4 rounded-xl bg-green-50 p-4 border border-green-200">
      <h3 className="font-semibold text-green-700 mb-2">
        Why You Match
      </h3>

      <ul className="space-y-2">
        {reasons.map((item, index) => (
          <li key={index}>
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}