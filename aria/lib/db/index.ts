"use client";
// ─────────────────────────────────────────────────────────────────────────────
// db singleton – the ONLY place where IndexedDB is accessed.
//
// Usage:
//   import { db } from "@/lib/db";
//   const txns = await db.transactions.getAll();
//
// To swap the backend (e.g. to PostgreSQL) replace IndexedDBRepository with a
// new concrete class that implements Repository<T>.  Zero business logic changes.
// ─────────────────────────────────────────────────────────────────────────────

import { getDexieInstance } from "./schema";
import { IndexedDBRepository } from "./repositories/indexeddb";
import type {
  Company,
  Account,
  Transaction,
  Employee,
  Budget,
  BudgetLine,
  Forecast,
  ForecastLine,
  Integration,
} from "./models";

function createDb() {
  const dexie = getDexieInstance();

  return {
    companies: new IndexedDBRepository<Company>(dexie.companies),
    accounts: new IndexedDBRepository<Account>(dexie.accounts),
    transactions: new IndexedDBRepository<Transaction>(dexie.transactions),
    employees: new IndexedDBRepository<Employee>(dexie.employees),
    budgets: new IndexedDBRepository<Budget>(dexie.budgets),
    budgetLines: new IndexedDBRepository<BudgetLine>(dexie.budgetLines),
    forecasts: new IndexedDBRepository<Forecast>(dexie.forecasts),
    forecastLines: new IndexedDBRepository<ForecastLine>(dexie.forecastLines),
    integrations: new IndexedDBRepository<Integration>(dexie.integrations),
  } as const;
}

// Lazily created – safe in SSR because the "use client" directive ensures
// this module is only evaluated in the browser.
let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

// Convenience re-export: `import { db } from "@/lib/db"`
export const db = {
  get companies() { return getDb().companies; },
  get accounts() { return getDb().accounts; },
  get transactions() { return getDb().transactions; },
  get employees() { return getDb().employees; },
  get budgets() { return getDb().budgets; },
  get budgetLines() { return getDb().budgetLines; },
  get forecasts() { return getDb().forecasts; },
  get forecastLines() { return getDb().forecastLines; },
  get integrations() { return getDb().integrations; },
};

// Re-export types and the Repository interface for consumers.
export type { Repository, QueryFilter } from "./repositories/base";
export type * from "./models";
