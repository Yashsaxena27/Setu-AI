import { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown, FaTimes } from "react-icons/fa";

interface SearchableSelectProps {
  label?: string;
  error?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function SearchableSelect({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  required = false,
  className = "",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setSearchQuery("");
  };

  return (
    <div className={`w-full space-y-1.5 font-sans ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A]/70">
          {label} {required && <span className="text-[#EF4444]">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Toggle Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full text-left flex items-center justify-between rounded-xl border ${
            error
              ? "border-[#EF4444] focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
              : "border-[#0F172A]/10 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"
          } ${disabled ? "bg-slate-100 opacity-60 cursor-not-allowed" : "bg-[#FAF8F3]/50 cursor-pointer"} px-4 py-3 text-sm text-[#0F172A] outline-hidden transition duration-150 focus:ring-4 focus:bg-white`}
        >
          <span className={value ? "font-semibold text-[#0F172A]" : "text-slate-400 font-medium"}>
            {value || placeholder}
          </span>

          <div className="flex items-center gap-2 text-slate-400">
            {value && !disabled && (
              <span
                onClick={handleClear}
                className="p-1 hover:text-[#0F172A] rounded-md transition"
                title="Clear selection"
              >
                <FaTimes className="h-3 w-3" />
              </span>
            )}
            <FaChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl bg-white border border-[#0F172A]/10 shadow-premium overflow-hidden font-sans">
            {/* Search Bar */}
            <div className="p-2 border-b border-slate-100 bg-[#FAF8F3]/50 flex items-center gap-2">
              <FaSearch className="text-slate-400 h-3.5 w-3.5 ml-2" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-xs font-semibold text-[#0F172A] placeholder-slate-400 focus:outline-hidden py-1.5 pr-2"
              />
            </div>

            {/* Options List */}
            <div className="max-h-56 overflow-y-auto p-1 space-y-0.5">
              {filteredOptions.length === 0 ? (
                <div className="py-3 px-4 text-center text-xs font-bold text-slate-400">
                  No matching options found
                </div>
              ) : (
                filteredOptions.map((option, idx) => {
                  const isSelected = option.toLowerCase() === value.toLowerCase();
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                        isSelected
                          ? "bg-[#14B8A6]/10 text-[#0D9488] font-bold"
                          : "hover:bg-slate-100 text-[#0F172A]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-[#EF4444] font-medium mt-1">{error}</p>}
    </div>
  );
}
