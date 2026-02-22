"use client";

import { DollarSign } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";

const WATERFALL = [
  { label: "Revenue", value: 4200, type: "start" as const },
  { label: "Cost of Revenue", value: -1176, type: "negative" as const },
  { label: "Gross Profit", value: 3024, type: "subtotal" as const },
  { label: "Sales & Marketing", value: -756, type: "negative" as const },
  { label: "Research & Development", value: -672, type: "negative" as const },
  { label: "General & Administrative", value: -462, type: "negative" as const },
  { label: "EBITDA", value: 1134, type: "total" as const },
];

const TYPE_STYLES = {
  start: "bg-violet-600",
  negative: "bg-rose-500/80",
  subtotal: "bg-sky-600/80",
  total: "bg-emerald-600",
};

const maxVal = Math.max(...WATERFALL.map((w) => Math.abs(w.value)));

export default function EBITDAPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        icon={DollarSign}
        title="EBITDA Reporting"
        description="EBITDA tracking · Waterfall view · Bridge analysis"
      />

      {/* KPIs */}
      <div className="px-8 pb-6 grid grid-cols-4 gap-4">
        <StatCard label="EBITDA" value="$1.13M" delta="6.2%" deltaPositive />
        <StatCard label="EBITDA Margin" value="27%" delta="1.2pp" deltaPositive={false} />
        <StatCard label="vs Budget" value="+$48K" delta="4.4%" deltaPositive />
        <StatCard label="vs Prior Year" value="+$134K" delta="13.4%" deltaPositive />
      </div>

      {/* Waterfall chart (bar-based approximation) */}
      <div className="px-8 mb-8">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          EBITDA Waterfall — FY 2025
        </p>
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900 p-6">
          <div className="flex items-end gap-3 h-52">
            {WATERFALL.map(({ label, value, type }) => {
              const pct = (Math.abs(value) / maxVal) * 100;
              return (
                <div key={label} className="flex flex-col items-center flex-1 gap-1.5">
                  <span className="text-xs font-semibold text-zinc-300 tabular-nums">
                    {value > 0 ? "+" : ""}
                    {(value / 1000).toFixed(1)}M
                  </span>
                  <div
                    className={cn("w-full rounded-t-md", TYPE_STYLES[type])}
                    style={{ height: `${pct}%`, minHeight: 8 }}
                  />
                  <span className="text-[10px] text-zinc-500 text-center leading-tight w-full">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="px-8">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Monthly EBITDA Bridge
        </p>
        <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/60 bg-zinc-900/60">
                {["Item", "Q1", "Q2", "Q3", "Q4", "FY Total", "% of Revenue"].map((h) => (
                  <th
                    key={h}
                    className={cn(
                      "py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider",
                      h === "Item" ? "text-left px-5" : "text-right px-4"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EBITDA_TABLE.map((row, i) => (
                <tr key={i} className={cn("border-b border-zinc-800/40 hover:bg-zinc-800/20", row.bold && "bg-zinc-900/40")}>
                  <td className={cn("px-5 py-2.5", row.bold ? "font-semibold text-zinc-200" : "text-zinc-400", row.indent && "pl-10")}>
                    {row.label}
                  </td>
                  {[row.q1, row.q2, row.q3, row.q4, row.total, row.pct].map((v, vi) => (
                    <td key={vi} className={cn("text-right px-4 py-2.5 tabular-nums", row.bold ? "font-semibold text-zinc-200" : "text-zinc-400")}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const EBITDA_TABLE = [
  { label: "Revenue", q1: "$945K", q2: "$1.02M", q3: "$1.1M", q4: "$1.14M", total: "$4.2M", pct: "100%", bold: true },
  { label: "SaaS Revenue", q1: "$850K", q2: "$918K", q3: "$990K", q4: "$1.03M", total: "$3.79M", pct: "90%", indent: true },
  { label: "Services", q1: "$95K", q2: "$102K", q3: "$110K", q4: "$113K", total: "$420K", pct: "10%", indent: true },
  { label: "COGS", q1: "$265K", q2: "$285K", q3: "$308K", q4: "$318K", total: "$1.18M", pct: "28%", bold: true },
  { label: "Gross Profit", q1: "$680K", q2: "$735K", q3: "$792K", q4: "$822K", total: "$3.03M", pct: "72%", bold: true },
  { label: "S&M", q1: "$168K", q2: "$185K", q3: "$195K", q4: "$208K", total: "$756K", pct: "18%", indent: true },
  { label: "R&D", q1: "$149K", q2: "$162K", q3: "$176K", q4: "$185K", total: "$672K", pct: "16%", indent: true },
  { label: "G&A", q1: "$102K", q2: "$113K", q3: "$120K", q4: "$127K", total: "$462K", pct: "11%", indent: true },
  { label: "Total OpEx", q1: "$419K", q2: "$460K", q3: "$491K", q4: "$520K", total: "$1.89M", pct: "45%", bold: true },
  { label: "EBITDA", q1: "$261K", q2: "$275K", q3: "$301K", q4: "$302K", total: "$1.13M", pct: "27%", bold: true },
];
