import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full rounded-xl border ${
            error
              ? "border-[#EF4444] focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
              : "border-[#0F172A]/10 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
          } bg-[#FAF8F3]/50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-hidden transition duration-150 focus:ring-4 focus:bg-white ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-[#EF4444] font-medium mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
