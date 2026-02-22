"use client";

import { BarChart3, FileText, Scale, Waves } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

const TABS = [
  { label: "P&L", icon: FileText },
  { label: "Balance Sheet", icon: Scale },
  { label: "Cash Flow", icon: Waves },
] as const;

type Tab = (typeof TABS)[number]["label"];

export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState<Tab>("P&L");

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        icon={BarChart3}
        title="Financial Reporting"
        description="P&L · Balance Sheet · Cash Flow Statement"
        actions={
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 border border-zinc-700 transition-colors">
            Export PDF
          </button>
        }
      />

      {/* Stat cards */}
      <div className="px-8 pb-6 grid grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$4.2M" delta="12.4%" deltaPositive />
        <StatCard label="Gross Profit" value="$2.8M" delta="8.1%" deltaPositive />
        <StatCard label="EBITDA" value="$1.1M" delta="3.2%" deltaPositive={false} />
        <StatCard label="Net Income" value="$640K" delta="5.7%" deltaPositive />
      </div>

      {/* Tab bar */}
      <div className="px-8 flex gap-1 border-b border-zinc-800/60 mb-6">
        {TABS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              activeTab === label
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Placeholder table */}
      <div className="px-8">
        <ReportTable tab={activeTab} />
      </div>
    </div>
  );
}

function ReportTable({ tab }: { tab: Tab }) {
  const rows = getPlaceholderRows(tab);

  return (
    <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800/60 bg-zinc-900/60">
            <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Account
            </th>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (m) => (
                <th
                  key={m}
                  className="text-right px-3 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider"
                >
                  {m}
                </th>
              )
            )}
            <th className="text-right px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-zinc-800/40 transition-colors hover:bg-zinc-800/30",
                row.isSection
                  ? "bg-zinc-900/40 font-semibold text-zinc-300"
                  : "text-zinc-400"
              )}
            >
              <td
                className={cn("px-5 py-2.5", row.indent && "pl-10")}
              >
                {row.label}
              </td>
              {row.months.map((v, mi) => (
                <td key={mi} className="text-right px-3 py-2.5 tabular-nums">
                  {v}
                </td>
              ))}
              <td className="text-right px-5 py-2.5 tabular-nums font-medium text-zinc-300">
                {row.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Row {
  label: string;
  months: string[];
  total: string;
  isSection?: boolean;
  indent?: boolean;
}

function getPlaceholderRows(tab: Tab): Row[] {
  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(n);

  const monthly = [310, 295, 340, 355, 370, 380, 360, 390, 410, 420, 430, 440];
  const sum = monthly.reduce((a, b) => a + b, 0);

  if (tab === "P&L") {
    return [
      { label: "Revenue", months: monthly.map((v) => fmt(v * 1000)), total: fmt(sum * 1000), isSection: true },
      { label: "SaaS Subscription", months: monthly.map((v) => fmt(v * 900)), total: fmt(sum * 900), indent: true },
      { label: "Professional Services", months: monthly.map((v) => fmt(v * 100)), total: fmt(sum * 100), indent: true },
      { label: "Cost of Revenue", months: monthly.map((v) => fmt(v * 280)), total: fmt(sum * 280), isSection: true },
      { label: "Gross Profit", months: monthly.map((v) => fmt(v * 720)), total: fmt(sum * 720), isSection: true },
      { label: "Operating Expenses", months: monthly.map((v) => fmt(v * 450)), total: fmt(sum * 450), isSection: true },
      { label: "Sales & Marketing", months: monthly.map((v) => fmt(v * 180)), total: fmt(sum * 180), indent: true },
      { label: "R&D", months: monthly.map((v) => fmt(v * 160)), total: fmt(sum * 160), indent: true },
      { label: "G&A", months: monthly.map((v) => fmt(v * 110)), total: fmt(sum * 110), indent: true },
      { label: "EBITDA", months: monthly.map((v) => fmt(v * 270)), total: fmt(sum * 270), isSection: true },
    ];
  }

  if (tab === "Balance Sheet") {
    return [
      { label: "Assets", months: monthly.map((v) => fmt(v * 3000)), total: fmt(sum * 3000), isSection: true },
      { label: "Cash & Equivalents", months: monthly.map((v) => fmt(v * 1200)), total: fmt(sum * 1200), indent: true },
      { label: "Accounts Receivable", months: monthly.map((v) => fmt(v * 800)), total: fmt(sum * 800), indent: true },
      { label: "Other Assets", months: monthly.map((v) => fmt(v * 1000)), total: fmt(sum * 1000), indent: true },
      { label: "Liabilities", months: monthly.map((v) => fmt(v * 1100)), total: fmt(sum * 1100), isSection: true },
      { label: "Accounts Payable", months: monthly.map((v) => fmt(v * 400)), total: fmt(sum * 400), indent: true },
      { label: "Deferred Revenue", months: monthly.map((v) => fmt(v * 700)), total: fmt(sum * 700), indent: true },
      { label: "Equity", months: monthly.map((v) => fmt(v * 1900)), total: fmt(sum * 1900), isSection: true },
    ];
  }

  return [
    { label: "Operating Activities", months: monthly.map((v) => fmt(v * 270)), total: fmt(sum * 270), isSection: true },
    { label: "Net Income", months: monthly.map((v) => fmt(v * 150)), total: fmt(sum * 150), indent: true },
    { label: "D&A", months: monthly.map((v) => fmt(v * 40)), total: fmt(sum * 40), indent: true },
    { label: "Changes in WC", months: monthly.map((v) => fmt(v * 80)), total: fmt(sum * 80), indent: true },
    { label: "Investing Activities", months: monthly.map((v) => fmt(-v * 60)), total: fmt(-sum * 60), isSection: true },
    { label: "Financing Activities", months: monthly.map((v) => fmt(-v * 10)), total: fmt(-sum * 10), isSection: true },
    { label: "Net Cash Flow", months: monthly.map((v) => fmt(v * 200)), total: fmt(sum * 200), isSection: true },
  ];
}
