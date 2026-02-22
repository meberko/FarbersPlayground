"use client";

import { Activity, TrendingUp, Users, Percent, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";

const KPI_CARDS = [
  { label: "ARR", value: "$5.04M", delta: "18.2%", deltaPositive: true, icon: DollarSign },
  { label: "MRR", value: "$420K", delta: "4.1%", deltaPositive: true, icon: DollarSign },
  { label: "MRR Growth MoM", value: "4.1%", delta: "0.3pp", deltaPositive: true, icon: TrendingUp },
  { label: "Gross Margin", value: "72%", delta: "1.5pp", deltaPositive: false, icon: Percent },
  { label: "Customer Count", value: "312", delta: "8.3%", deltaPositive: true, icon: Users },
  { label: "Avg ARR / Customer", value: "$16.2K", delta: "9.2%", deltaPositive: true, icon: DollarSign },
  { label: "Churn Rate", value: "1.2%", delta: "0.2pp", deltaPositive: false, icon: TrendingUp },
  { label: "NRR", value: "118%", delta: "2pp", deltaPositive: true, icon: Percent },
  { label: "CAC", value: "$8.4K", delta: "5.6%", deltaPositive: false, icon: DollarSign },
  { label: "LTV", value: "$134K", delta: "11.4%", deltaPositive: true, icon: DollarSign },
  { label: "LTV:CAC", value: "16x", delta: "0.8x", deltaPositive: true, icon: Percent },
  { label: "Burn Multiple", value: "0.6x", delta: "0.1x", deltaPositive: true, icon: TrendingUp },
] as const;

export default function KPIsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        icon={Activity}
        title="KPIs & Analytics"
        description="Custom KPI dashboards and SaaS metrics"
        actions={
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">
            + Add KPI
          </button>
        }
      />

      <div className="px-8 pb-8">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Key Metrics — FY 2025
        </p>
        <div className="grid grid-cols-4 gap-4">
          {KPI_CARDS.map((kpi) => (
            <StatCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              deltaPositive={kpi.deltaPositive}
              icon={kpi.icon}
            />
          ))}
        </div>

        {/* Placeholder for charts */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <ChartPlaceholder label="MRR Growth" />
          <ChartPlaceholder label="Churn vs Expansion" />
          <ChartPlaceholder label="CAC Payback Period" />
          <ChartPlaceholder label="LTV by Cohort" />
        </div>
      </div>
    </div>
  );
}

function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-900 p-5 h-52 flex flex-col">
      <p className="text-sm font-medium text-zinc-300 mb-3">{label}</p>
      <div className="flex-1 flex items-center justify-center rounded-lg bg-zinc-800/40 border border-dashed border-zinc-700/60">
        <p className="text-xs text-zinc-600">Chart coming in Phase 2</p>
      </div>
    </div>
  );
}
