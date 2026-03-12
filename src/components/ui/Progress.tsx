import { clsx } from "clsx";

interface ProgressProps {
  value: number;
  color?: "brand" | "success" | "warning" | "danger";
  size?: "xs" | "sm" | "md";
  className?: string;
}

const colorMap = {
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export function getScoreColor(score: number): "success" | "brand" | "warning" | "danger" {
  if (score >= 75) return "success";
  if (score >= 60) return "brand";
  if (score >= 45) return "warning";
  return "danger";
}

export default function Progress({
  value,
  color = "brand",
  size = "sm",
  className,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={clsx(
        "w-full bg-white/5 rounded-full overflow-hidden",
        size === "xs" ? "h-[3px]" : size === "sm" ? "h-1.5" : "h-2",
        className
      )}
    >
      <div
        className={clsx("h-full rounded-full transition-all duration-700 ease-out", colorMap[color])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
