import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  icon: LucideIcon;
  feature: string;
  bullets?: string[];
  className?: string;
}

export function ComingSoon({
  icon: Icon,
  feature,
  bullets = [],
  className,
}: ComingSoonProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center flex-1 px-8 py-16 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/40 mb-5">
        <Icon className="w-7 h-7 text-zinc-400" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-500 mb-2">
        Coming in Phase 2
      </p>
      <h2 className="text-lg font-semibold text-zinc-200 mb-3">{feature}</h2>
      {bullets.length > 0 && (
        <ul className="text-sm text-zinc-500 space-y-1 max-w-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 justify-center">
              <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
