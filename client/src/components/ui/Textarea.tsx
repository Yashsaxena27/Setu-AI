import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full rounded-xl border ${
            error
              ? "border-[#EF4444] focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
              : "border-[#0F172A]/10 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
          } bg-[#FAF8F3]/50 px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 outline-hidden transition duration-150 focus:ring-4 focus:bg-white resize-y min-h-[100px] ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-[#EF4444] font-medium mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
