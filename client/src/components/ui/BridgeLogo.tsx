export function BridgeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="6" cy="22" r="3" fill="#14B8A6" />
      <circle cx="26" cy="22" r="3" fill="#F59E0B" />
      <path
        d="M 6 22 C 11 10, 21 10, 26 22"
        stroke="#14B8A6"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className = "text-[#0F172A] text-lg", iconClassName = "h-6 w-6" }: { className?: string; iconClassName?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-serif font-black tracking-tight ${className}`}>
      <BridgeIcon className={iconClassName} />
      <span>Setu AI</span>
    </div>
  );
}
