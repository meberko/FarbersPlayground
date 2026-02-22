"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
  Plug,
  Activity,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Financial Reporting",
    href: "/reporting",
    icon: BarChart3,
    description: "P&L · Balance Sheet · Cash Flow",
  },
  {
    label: "KPIs & Analytics",
    href: "/kpis",
    icon: Activity,
    description: "Custom dashboards & metrics",
  },
  {
    label: "Forecasting",
    href: "/forecasting",
    icon: TrendingUp,
    description: "Scenarios · Budget vs Actuals",
  },
  {
    label: "EBITDA",
    href: "/ebitda",
    icon: DollarSign,
    description: "EBITDA tracking & waterfall",
  },
  {
    label: "Integrations",
    href: "/integrations",
    icon: Plug,
    description: "QuickBooks · NetSuite · Rippling",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 min-h-screen bg-zinc-950 border-r border-zinc-800/60 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800/60">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600">
          <Target className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-semibold tracking-tight text-white">
          Aria
        </span>
        <span className="ml-auto text-[10px] font-medium text-zinc-500 bg-zinc-800 rounded px-1.5 py-0.5">
          beta
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon, description }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-violet-600/15 text-violet-300"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  active ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              <span className="font-medium leading-none">{label}</span>
              {active && (
                <ChevronRight className="ml-auto w-3.5 h-3.5 text-violet-400/60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-zinc-800/60">
        <p className="text-[11px] text-zinc-600">© 2025 Aria</p>
      </div>
    </aside>
  );
}
