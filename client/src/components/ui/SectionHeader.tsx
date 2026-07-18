import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0F172A]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500 font-sans">{description}</p>
        )}
      </div>
      {action && <div className="mt-2 md:mt-0">{action}</div>}
    </div>
  );
}
