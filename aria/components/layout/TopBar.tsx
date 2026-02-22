"use client";

import { useState } from "react";
import { Building2, ChevronDown, Sparkles, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const FISCAL_YEARS = [2022, 2023, 2024, 2025];

interface TopBarProps {
  onOpenAI: () => void;
}

export function TopBar({ onOpenAI }: TopBarProps) {
  const [fiscalYear, setFiscalYear] = useState(2025);
  const [fyOpen, setFyOpen] = useState(false);

  return (
    <header className="flex items-center h-14 px-6 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm shrink-0 gap-4">
      {/* Company */}
      <div className="flex items-center gap-2 text-sm text-zinc-300">
        <Building2 className="w-4 h-4 text-zinc-500" />
        <span className="font-medium">Acme SaaS Co.</span>
      </div>

      <div className="w-px h-5 bg-zinc-800 mx-1" />

      {/* Fiscal Year Selector */}
      <div className="relative">
        <button
          onClick={() => setFyOpen((v) => !v)}
          className={cn(
            "flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md transition-colors",
            "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
          )}
        >
          <span>FY {fiscalYear}</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
        </button>

        {fyOpen && (
          <div className="absolute top-full left-0 mt-1 w-32 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 py-1">
            {FISCAL_YEARS.map((fy) => (
              <button
                key={fy}
                onClick={() => { setFiscalYear(fy); setFyOpen(false); }}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-sm transition-colors",
                  fy === fiscalYear
                    ? "text-violet-300 bg-violet-600/10"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                )}
              >
                FY {fy}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications */}
      <button className="relative p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors">
        <Bell className="w-4 h-4" />
      </button>

      {/* AI Assistant */}
      <button
        onClick={onOpenAI}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
          "bg-violet-600 hover:bg-violet-500 text-white shadow-sm shadow-violet-900/40"
        )}
      >
        <Sparkles className="w-3.5 h-3.5" />
        Ask Aria
      </button>
    </header>
  );
}
