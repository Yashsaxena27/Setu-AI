interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export default function Avatar({ name, size = "md" }: AvatarProps) {
  const getInitials = (fullName: string) => {
    const trimmed = fullName.trim();
    if (!trimmed) return "U";
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 font-bold text-[#0D9488] uppercase tracking-wider ${sizeClasses[size]}`}
    >
      {getInitials(name)}
    </div>
  );
}
