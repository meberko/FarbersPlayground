// ─────────────────────────────────────────────────────────────────────────────
// Aria – Core Data Models
// ─────────────────────────────────────────────────────────────────────────────

export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD";

export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export type ExpenseType = "prepaid" | "recurring" | "variable" | "one-time";

export type BudgetStatus = "draft" | "approved";

export type ScenarioType = "base" | "optimistic" | "pessimistic";

export type ForecastDriver =
  | "manual"
  | "ai_generated"
  | "employee_count_based"
  | "recurring";

export type IntegrationProvider =
  | "quickbooks"
  | "netsuite"
  | "rippling"
  | "gusto";

export type IntegrationStatus = "connected" | "disconnected" | "error" | "syncing";

// ─── Company ─────────────────────────────────────────────────────────────────

export interface Company {
  id: string;
  name: string;
  fiscalYearStart: number; // 1–12 (month)
  currency: Currency;
  createdAt: string; // ISO date string
}

// ─── Account ─────────────────────────────────────────────────────────────────

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  subtype: string; // e.g. "cash", "accounts_receivable", "saas_revenue"
  parentAccountId?: string;
  integrationSource?: IntegrationProvider;
}

// ─── Transaction ─────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  accountId: string;
  amount: number; // positive = debit, negative = credit (in company currency)
  description: string;
  vendor?: string;
  category?: string;
  isRecurring: boolean;
  expenseType: ExpenseType;
  perEmployee: boolean;
  integrationSource?: IntegrationProvider;
  rawPayload?: Record<string, unknown>; // original payload from integration
}

// ─── Employee ────────────────────────────────────────────────────────────────

export interface Employee {
  id: string;
  name: string;
  department: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string, undefined = still active
  salary: number; // annual salary in company currency
  integrationSource?: IntegrationProvider;
}

// ─── Budget ──────────────────────────────────────────────────────────────────

export interface Budget {
  id: string;
  name: string;
  fiscalYear: number; // e.g. 2024
  createdAt: string;
  status: BudgetStatus;
}

export interface BudgetLine {
  id: string;
  budgetId: string;
  accountId: string;
  month: number; // 1–12
  amount: number;
  notes?: string;
}

// ─── Forecast ────────────────────────────────────────────────────────────────

export interface Forecast {
  id: string;
  name: string;
  baseBudgetId?: string;
  createdAt: string;
  scenarioType: ScenarioType;
}

export interface ForecastLine {
  id: string;
  forecastId: string;
  accountId: string;
  month: number; // 1–12
  amount: number;
  driver: ForecastDriver;
  notes?: string;
}

// ─── Integration ─────────────────────────────────────────────────────────────

export interface Integration {
  id: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  lastSyncedAt?: string; // ISO date string
  configJson?: Record<string, unknown>;
}
