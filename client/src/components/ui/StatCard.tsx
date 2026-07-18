import type { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
}: StatCardProps) {
  return (
    <Card className="flex flex-col justify-between border border-[#0F172A]/5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {icon && <div className="text-[#14B8A6]">{icon}</div>}
      </div>
      <div className="mt-4">
        <h3 className="text-4xl font-bold font-serif text-[#0F172A] tracking-tight">
          {value}
        </h3>
        {(description || trend) && (
          <div className="mt-2 flex items-center gap-2 text-xs font-semibold">
            {trend && (
              <span
                className={trend.positive ? "text-[#22C55E]" : "text-[#EF4444]"}
              >
                {trend.value}
              </span>
            )}
            {description && <span className="text-slate-400">{description}</span>}
          </div>
        )}
      </div>
    </Card>
  );
}
