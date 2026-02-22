import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency = "USD",
  compact = false
): string {
  const opts: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...(compact && { notation: "compact", compactDisplay: "short" }),
  };
  return new Intl.NumberFormat("en-US", opts).format(amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function generateId(): string {
  return crypto.randomUUID();
}
