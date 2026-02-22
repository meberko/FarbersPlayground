"use client";

import { Plug, CheckCircle2, XCircle, Clock, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    description: "Sync your chart of accounts, transactions, and vendors from QuickBooks.",
    logo: "QB",
    logoColor: "bg-emerald-600",
    status: "connected" as const,
    lastSync: "2 hours ago",
    category: "Accounting",
  },
  {
    id: "netsuite",
    name: "NetSuite",
    description: "Enterprise ERP integration for multi-entity, multi-currency financials.",
    logo: "NS",
    logoColor: "bg-sky-600",
    status: "disconnected" as const,
    lastSync: null,
    category: "Accounting / ERP",
  },
  {
    id: "rippling",
    name: "Rippling",
    description: "Sync employee roster, salaries, and department data for headcount tracking.",
    logo: "RP",
    logoColor: "bg-orange-600",
    status: "error" as const,
    lastSync: "3 days ago",
    category: "HR / Payroll",
  },
  {
    id: "gusto",
    name: "Gusto",
    description: "Pull payroll runs, benefits costs, and employee headcount from Gusto.",
    logo: "GU",
    logoColor: "bg-pink-600",
    status: "disconnected" as const,
    lastSync: null,
    category: "HR / Payroll",
  },
] as const;

type Status = "connected" | "disconnected" | "error" | "syncing";

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: typeof CheckCircle2; color: string }
> = {
  connected: {
    label: "Connected",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  disconnected: { label: "Not connected", icon: XCircle, color: "text-zinc-600" },
  error: { label: "Error", icon: XCircle, color: "text-amber-400" },
  syncing: { label: "Syncing…", icon: Clock, color: "text-violet-400" },
};

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        icon={Plug}
        title="Integrations"
        description="Connect your accounting, ERP, and HR systems"
      />

      <div className="px-8 pb-8">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-5">
          Available connectors
        </p>
        <div className="grid grid-cols-2 gap-4">
          {INTEGRATIONS.map((integration) => {
            const { label, icon: StatusIcon, color } = STATUS_CONFIG[integration.status];
            const isConnected = integration.status === "connected";

            return (
              <div
                key={integration.id}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900 p-5 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                      integration.logoColor
                    )}
                  >
                    <span className="text-xs font-bold text-white">
                      {integration.logo}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-zinc-100">
                        {integration.name}
                      </p>
                      <span className="text-[10px] text-zinc-600 bg-zinc-800 rounded px-1.5 py-0.5">
                        {integration.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                </div>

                {/* Status + action */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className={cn("w-3.5 h-3.5", color)} />
                    <span className={cn("text-xs font-medium", color)}>{label}</span>
                    {integration.lastSync && (
                      <span className="text-xs text-zinc-600 ml-1">
                        · Last synced {integration.lastSync}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isConnected && (
                      <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                        <RefreshCw className="w-3 h-3" />
                        Sync
                      </button>
                    )}
                    <button
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        isConnected
                          ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                          : integration.status === "error"
                          ? "bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 border border-amber-600/30"
                          : "bg-violet-600 text-white hover:bg-violet-500"
                      )}
                    >
                      {isConnected ? "Manage" : integration.status === "error" ? "Reconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming soon section */}
        <div className="mt-8 rounded-xl border border-dashed border-zinc-800 p-6 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-zinc-400">More integrations coming soon</p>
          <p className="text-xs text-zinc-600 max-w-sm">
            Salesforce · Stripe · Brex · Mercury · Workday · ADP — and more. Integration
            connectors are read-only and never write to your source systems.
          </p>
        </div>
      </div>
    </div>
  );
}
