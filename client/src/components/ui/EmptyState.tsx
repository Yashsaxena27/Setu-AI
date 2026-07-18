import type { ReactNode } from "react";
import { FaInbox } from "react-icons/fa";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#0F172A]/10 bg-white/50 px-6 py-12 text-center shadow-soft">
      <div className="rounded-full bg-[#FAF8F3] p-4 text-[#0F172A]/30 mb-4">
        {icon || <FaInbox className="h-8 w-8" />}
      </div>
      <h3 className="font-serif text-lg font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
