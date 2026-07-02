import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-xl px-6 py-3 font-semibold transition duration-200";

  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-gray-300 bg-white hover:bg-gray-100";

  return (
    <button
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}