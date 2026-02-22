import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between px-8 pt-8 pb-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/60">
          <Icon className="w-5 h-5 text-zinc-300" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-zinc-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
