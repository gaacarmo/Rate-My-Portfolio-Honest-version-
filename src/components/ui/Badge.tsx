import { clsx } from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "brand";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-white/5 text-ink-tertiary border-white/8",
  success: "bg-success-muted text-success border-success/20",
  warning: "bg-warning-muted text-warning border-warning/20",
  danger: "bg-danger-muted text-danger border-danger/20",
  info: "bg-blue-muted text-blue-data border-blue-data/20",
  brand: "bg-brand-muted text-brand border-brand/20",
};

export default function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded text-2xs font-semibold border tracking-wide",
        variantMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
