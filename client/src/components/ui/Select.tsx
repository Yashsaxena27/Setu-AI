import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = "", id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full appearance-none rounded-xl border ${
              error
                ? "border-[#EF4444] focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
                : "border-[#0F172A]/10 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
            } bg-[#FAF8F3]/50 px-4 py-3 pr-10 text-sm text-[#0F172A] outline-hidden transition duration-150 focus:ring-4 focus:bg-white cursor-pointer ${className}`}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#0F172A]/40">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-xs text-[#EF4444] font-medium mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
