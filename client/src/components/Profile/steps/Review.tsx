import Card from "../../ui/Card";

type Props = {
  formData: any;
};

export default function Review({ formData }: Props) {
  return (
    <Card className="border border-[#0F172A]/5 p-6 bg-[#FAF8F3]/30">
      <div className="space-y-4">
        {Object.entries(formData).map(([key, value]) => {
          const displayLabel = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <div
              key={key}
              className="flex justify-between items-center border-b border-[#0F172A]/5 pb-3 last:border-b-0 last:pb-0"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {displayLabel}
              </span>
              <span className="text-sm font-semibold text-[#0F172A]">
                {String(value) || "—"}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}