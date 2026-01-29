import type { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: "primary" | "danger" | "ghost" | "outline";

  size?: "sm" | "md" | "lg";

  loading?: boolean;

  fullWidth?: boolean;

  className?: string;

  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled = false,
  className,
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "btn",

        // Variant
        {
          "btn-primary": variant === "primary",
          "btn-danger": variant === "danger",
          "btn-ghost": variant === "ghost",
          "btn-outline": variant === "outline",
        },

        // Size
        {
          "btn-sm": size === "sm",
          "btn-md": size === "md",
          "btn-lg": size === "lg",
        },

        // Full width
        {
          "btn-full": fullWidth,
        },

        // Disabled
        {
          "btn-disabled": disabled || loading,
        },

        className
      )}
      {...props}
    >
      {/* Loading */}
      {loading && <span className="btn-spinner" />}

      {/* Icon */}
      {!loading && icon && <span className="btn-icon">{icon}</span>}

      {/* Text */}
      <span>{children}</span>
    </button>
  );
}
