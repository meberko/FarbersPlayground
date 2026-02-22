"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AIAssistantPanel } from "@/components/ai/AIAssistantPanel";
import { seedIfEmpty } from "@/lib/seed";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aiOpen, setAiOpen] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    seedIfEmpty()
      .then(() => setSeeded(true))
      .catch((err) => {
        console.error("[Aria] Seed failed:", err);
        setSeeded(true); // allow app to proceed even if seed fails
      });
  }, []);

  if (!seeded) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-sm text-zinc-500">Initializing…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar onOpenAI={() => setAiOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <AIAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
