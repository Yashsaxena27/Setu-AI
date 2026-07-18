interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export default function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const shapeClass = {
    text: "h-4 rounded-md w-full",
    circular: "rounded-full",
    rectangular: "rounded-xl",
  }[variant];

  return (
    <div
      className={`animate-pulse bg-[#0F172A]/5 ${shapeClass} ${className}`}
    />
  );
}
