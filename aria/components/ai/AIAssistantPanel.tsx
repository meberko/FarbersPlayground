"use client";

import { useState, useRef, useEffect } from "react";
import { X, Sparkles, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const PLACEHOLDER_MESSAGES: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hi! I'm Aria, your AI financial analyst. I can help you understand your financials, explain variances, and help you build forecasts. What would you like to explore?",
    timestamp: new Date(),
  },
];

const SUGGESTED_PROMPTS = [
  "Explain my Q3 revenue trend",
  "What's driving EBITDA compression?",
  "Help me build a headcount budget",
  "Where are we vs. plan YTD?",
];

interface AIAssistantPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AIAssistantPanel({ open, onClose }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>(PLACEHOLDER_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const aiMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "AI functionality is coming soon. This is a scaffold placeholder — the real Aria AI will analyse your financial data and respond in plain English.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-[420px] z-50 flex flex-col",
          "bg-zinc-950 border-l border-zinc-800/60 shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800/60">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20">
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">Aria AI</p>
            <p className="text-[11px] text-zinc-500">Financial intelligence</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2.5",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-0.5",
                  msg.role === "assistant"
                    ? "bg-violet-600/20"
                    : "bg-zinc-700"
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-3.5 h-3.5 text-violet-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-zinc-300" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "bg-zinc-800/80 text-zinc-200"
                    : "bg-violet-600 text-white"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setInput(p)}
                className="text-xs px-2.5 py-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors border border-zinc-700/50"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-4 border-t border-zinc-800/60">
          <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-700 rounded-xl p-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about your financials…"
              rows={1}
              className="flex-1 resize-none bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none min-h-[24px] max-h-32"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-lg transition-colors shrink-0",
                input.trim()
                  ? "bg-violet-600 hover:bg-violet-500 text-white"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              )}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[10px] text-zinc-600 mt-2 text-center">
            AI not yet connected — scaffold only
          </p>
        </div>
      </aside>
    </>
  );
}
