"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Aria Seed Script
// Populates IndexedDB with realistic sample data if the DB is empty.
// Call `seedIfEmpty()` once in a client-side layout component.
// ─────────────────────────────────────────────────────────────────────────────

import { db } from "@/lib/db";
import {
  SEED_COMPANY,
  SEED_ACCOUNTS,
  SEED_TRANSACTIONS,
  SEED_EMPLOYEES,
  SEED_BUDGET,
  SEED_BUDGET_LINES,
  SEED_FORECAST,
  SEED_FORECAST_LINES,
  SEED_INTEGRATIONS,
} from "./data";

export async function seedIfEmpty(): Promise<void> {
  const existing = await db.companies.getAll();
  if (existing.length > 0) return; // already seeded

  console.info("[Aria] Seeding IndexedDB with sample data…");

  await Promise.all([
    db.companies.create(SEED_COMPANY),
    ...SEED_ACCOUNTS.map((a) => db.accounts.create(a)),
    ...SEED_EMPLOYEES.map((e) => db.employees.create(e)),
    ...SEED_INTEGRATIONS.map((i) => db.integrations.create(i)),
    db.budgets.create(SEED_BUDGET),
    db.forecasts.create(SEED_FORECAST),
  ]);

  // Transactions, budget lines, forecast lines in batches to avoid IDB contention
  for (const txn of SEED_TRANSACTIONS) {
    await db.transactions.create(txn);
  }
  for (const bl of SEED_BUDGET_LINES) {
    await db.budgetLines.create(bl);
  }
  for (const fl of SEED_FORECAST_LINES) {
    await db.forecastLines.create(fl);
  }

  console.info("[Aria] Seed complete.");
}
