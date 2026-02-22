import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaPositive,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-zinc-900 border border-zinc-800/60 p-5",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          {label}
        </p>
        {Icon && <Icon className="w-4 h-4 text-zinc-600" />}
      </div>
      <p className="text-2xl font-semibold text-zinc-100 tracking-tight">
        {value}
      </p>
      {delta && (
        <p
          className={cn(
            "text-xs mt-1.5 font-medium",
            deltaPositive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {deltaPositive ? "▲" : "▼"} {delta} vs last period
        </p>
      )}
    </div>
  );
}
