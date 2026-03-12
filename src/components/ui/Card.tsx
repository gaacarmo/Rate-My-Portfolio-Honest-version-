import { clsx } from "clsx";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "raised" | "ghost";
  interactive?: boolean;
}

export default function Card({
  className,
  variant = "default",
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl border",
        {
          "bg-bg-surface border-bg-border": variant === "default",
          "bg-bg-raised border-bg-border": variant === "raised",
          "bg-transparent border-bg-separator": variant === "ghost",
          "transition-colors duration-150 hover:border-white/12 cursor-pointer": interactive,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
