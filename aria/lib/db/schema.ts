"use client";
// ─────────────────────────────────────────────────────────────────────────────
// Aria Dexie Database Schema
// ─────────────────────────────────────────────────────────────────────────────

import Dexie, { type Table } from "dexie";
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

export class AriaDatabase extends Dexie {
  companies!: Table<Company, string>;
  accounts!: Table<Account, string>;
  transactions!: Table<Transaction, string>;
  employees!: Table<Employee, string>;
  budgets!: Table<Budget, string>;
  budgetLines!: Table<BudgetLine, string>;
  forecasts!: Table<Forecast, string>;
  forecastLines!: Table<ForecastLine, string>;
  integrations!: Table<Integration, string>;

  constructor() {
    super("AriaDB");

    this.version(1).stores({
      // Primary key is always `id`; list additional indexed fields after it.
      companies: "id, name",
      accounts: "id, type, parentAccountId, integrationSource",
      transactions: "id, date, accountId, vendor, category, integrationSource",
      employees: "id, department, startDate, integrationSource",
      budgets: "id, fiscalYear, status",
      budgetLines: "id, budgetId, accountId, month",
      forecasts: "id, baseBudgetId, scenarioType",
      forecastLines: "id, forecastId, accountId, month",
      integrations: "id, provider, status",
    });
  }
}

// Singleton — one database instance per browser session.
let _dexie: AriaDatabase | null = null;

export function getDexieInstance(): AriaDatabase {
  if (!_dexie) {
    _dexie = new AriaDatabase();
  }
  return _dexie;
}
