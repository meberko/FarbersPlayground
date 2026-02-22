"use client";

import { TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Scenario = "base" | "optimistic" | "pessimistic";

const SCENARIO_COLORS: Record<Scenario, string> = {
  base: "text-violet-400 bg-violet-600/10 border-violet-600/30",
  optimistic: "text-emerald-400 bg-emerald-600/10 border-emerald-600/30",
  pessimistic: "text-amber-400 bg-amber-600/10 border-amber-600/30",
};

const SCENARIOS: { key: Scenario; label: string; arr: string; growth: string }[] = [
  { key: "base", label: "Base", arr: "$6.2M", growth: "23%" },
  { key: "optimistic", label: "Optimistic", arr: "$7.5M", growth: "49%" },
  { key: "pessimistic", label: "Pessimistic", arr: "$5.1M", growth: "1%" },
];

export default function ForecastingPage() {
  const [active, setActive] = useState<Scenario>("base");

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        icon={TrendingUp}
        title="Forecasting & Budgeting"
        description="Scenario-based forecasting · Budget vs Actuals"
        actions={
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">
            + New Forecast
          </button>
        }
      />

      {/* Scenario switcher */}
      <div className="px-8 mb-6">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
          Scenarios
        </p>
        <div className="flex gap-3">
          {SCENARIOS.map(({ key, label, arr, growth }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                "flex-1 rounded-xl border p-4 text-left transition-all",
                active === key
                  ? SCENARIO_COLORS[key]
                  : "border-zinc-800/60 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/40"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-70">
                {label}
              </p>
              <p className="text-xl font-bold tracking-tight">{arr} ARR</p>
              <p className="text-xs mt-1 opacity-60">{growth} YoY growth</p>
            </button>
          ))}
        </div>
      </div>

      {/* BvA summary */}
      <div className="px-8 mb-6 grid grid-cols-4 gap-4">
        <StatCard label="Budget ARR" value="$6.0M" />
        <StatCard label="Forecast ARR" value="$6.2M" delta="3.3% above budget" deltaPositive />
        <StatCard label="Actuals YTD" value="$2.9M" delta="On track" deltaPositive />
        <StatCard label="Remaining Budget" value="$3.1M" />
      </div>

      {/* Placeholder table */}
      <div className="px-8">
        <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/60 bg-zinc-900/60">
                {["Account", "Budget", "Forecast", "Actuals YTD", "Variance", "Variance %"].map((h) => (
                  <th
                    key={h}
                    className={cn(
                      "py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider",
                      h === "Account" ? "text-left px-5" : "text-right px-4"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FORECAST_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors">
                  <td className={cn("px-5 py-2.5", row.isSection ? "font-semibold text-zinc-300" : "text-zinc-400 pl-10")}>
                    {row.label}
                  </td>
                  <td className="text-right px-4 py-2.5 text-zinc-400 tabular-nums">{row.budget}</td>
                  <td className="text-right px-4 py-2.5 text-zinc-400 tabular-nums">{row.forecast}</td>
                  <td className="text-right px-4 py-2.5 text-zinc-400 tabular-nums">{row.actuals}</td>
                  <td className={cn("text-right px-4 py-2.5 tabular-nums font-medium", row.varPos ? "text-emerald-400" : "text-red-400")}>
                    {row.variance}
                  </td>
                  <td className={cn("text-right px-4 py-2.5 tabular-nums font-medium", row.varPos ? "text-emerald-400" : "text-red-400")}>
                    {row.variancePct}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const FORECAST_ROWS = [
  { label: "Revenue", budget: "$6.0M", forecast: "$6.2M", actuals: "$2.9M", variance: "+$200K", variancePct: "+3.3%", varPos: true, isSection: true },
  { label: "SaaS Revenue", budget: "$5.4M", forecast: "$5.6M", actuals: "$2.6M", variance: "+$200K", variancePct: "+3.7%", varPos: true },
  { label: "Services", budget: "$600K", forecast: "$600K", actuals: "$290K", variance: "$0", variancePct: "0%", varPos: true },
  { label: "COGS", budget: "$1.7M", forecast: "$1.7M", actuals: "$820K", variance: "$0", variancePct: "0%", varPos: true, isSection: true },
  { label: "Gross Profit", budget: "$4.3M", forecast: "$4.5M", actuals: "$2.1M", variance: "+$200K", variancePct: "+4.7%", varPos: true, isSection: true },
  { label: "OpEx", budget: "$2.8M", forecast: "$2.9M", actuals: "$1.4M", variance: "-$100K", variancePct: "-3.6%", varPos: false, isSection: true },
  { label: "S&M", budget: "$1.1M", forecast: "$1.1M", actuals: "$540K", variance: "$0", variancePct: "0%", varPos: true },
  { label: "R&D", budget: "$1.0M", forecast: "$1.1M", actuals: "$540K", variance: "-$100K", variancePct: "-10%", varPos: false },
  { label: "G&A", budget: "$700K", forecast: "$700K", actuals: "$320K", variance: "$0", variancePct: "0%", varPos: true },
];
