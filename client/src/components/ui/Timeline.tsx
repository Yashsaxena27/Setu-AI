import { FaCheckCircle, FaCircle } from "react-icons/fa";

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  completed?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="relative pb-8">
              {itemIdx !== items.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      item.completed
                        ? "bg-[#22C55E]/10 text-[#22C55E]"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {item.completed ? (
                      <FaCheckCircle className="h-5 w-5" />
                    ) : (
                      <FaCircle className="h-2.5 w-2.5" />
                    )}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-sm font-semibold text-[#0F172A]">
                    {item.title}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  {item.date && (
                    <p className="mt-1 text-xs text-slate-400 font-medium">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
