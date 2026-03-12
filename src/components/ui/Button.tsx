"use client";

import { clsx } from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:opacity-30 disabled:cursor-not-allowed select-none",
          {
            // Primary — solid orange, Apple-style
            "bg-brand hover:bg-brand-hover active:scale-[0.98] text-white": variant === "primary",
            // Secondary — surface with hairline border
            "bg-bg-raised border border-bg-border text-ink-secondary hover:text-ink hover:border-white/12 active:scale-[0.98]": variant === "secondary",
            // Ghost — no background
            "text-ink-tertiary hover:text-ink-secondary hover:bg-white/4 active:scale-[0.98]": variant === "ghost",
            // Danger
            "bg-danger-muted border border-danger/20 text-danger hover:bg-danger/20 active:scale-[0.98]": variant === "danger",
          },
          {
            "text-xs px-3 py-1.5 h-7": size === "sm",
            "text-sm px-4 py-2 h-9": size === "md",
            "text-[15px] px-6 py-3 h-12": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
