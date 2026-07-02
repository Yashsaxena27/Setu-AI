interface Props {
  type: "Strong" | "Partial";
}

export default function MatchBadge({ type }: Props) {
  const strong = type === "Strong";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        strong
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {strong ? "🟢 Strong Match" : "🟡 Partial Match"}
    </span>
  );
}