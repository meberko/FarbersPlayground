// ─────────────────────────────────────────────────────────────────────────────
// Aria – Seed Data
// Realistic SaaS company "Acme SaaS Co." with 12 months of FY 2025 data.
// Used by lib/seed/index.ts to populate IndexedDB on first load.
// ─────────────────────────────────────────────────────────────────────────────

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
} from "@/lib/db/models";

// ─── Company ─────────────────────────────────────────────────────────────────

export const SEED_COMPANY: Company = {
  id: "co_acme",
  name: "Acme SaaS Co.",
  fiscalYearStart: 1,
  currency: "USD",
  createdAt: "2023-01-01T00:00:00Z",
};

// ─── Accounts ────────────────────────────────────────────────────────────────

export const SEED_ACCOUNTS: Account[] = [
  // Revenue
  { id: "acc_rev_saas", name: "SaaS Subscription Revenue", type: "revenue", subtype: "saas_subscription" },
  { id: "acc_rev_svc", name: "Professional Services Revenue", type: "revenue", subtype: "professional_services" },

  // COGS
  { id: "acc_cogs_hosting", name: "Cloud Hosting & Infrastructure", type: "expense", subtype: "cogs_hosting" },
  { id: "acc_cogs_support", name: "Customer Support", type: "expense", subtype: "cogs_support" },
  { id: "acc_cogs_third_party", name: "Third-Party Software (COGS)", type: "expense", subtype: "cogs_software" },

  // Operating Expenses
  { id: "acc_sm_salaries", name: "S&M Salaries & Benefits", type: "expense", subtype: "sm_salaries" },
  { id: "acc_sm_ads", name: "Paid Advertising", type: "expense", subtype: "sm_ads" },
  { id: "acc_sm_events", name: "Events & Conferences", type: "expense", subtype: "sm_events" },

  { id: "acc_rd_salaries", name: "R&D Salaries & Benefits", type: "expense", subtype: "rd_salaries" },
  { id: "acc_rd_tools", name: "R&D Tools & Services", type: "expense", subtype: "rd_tools" },

  { id: "acc_ga_salaries", name: "G&A Salaries & Benefits", type: "expense", subtype: "ga_salaries" },
  { id: "acc_ga_legal", name: "Legal & Professional", type: "expense", subtype: "ga_legal" },
  { id: "acc_ga_office", name: "Office & Facilities", type: "expense", subtype: "ga_office" },
  { id: "acc_ga_insurance", name: "Insurance", type: "expense", subtype: "ga_insurance" },

  // Balance sheet
  { id: "acc_cash", name: "Cash & Cash Equivalents", type: "asset", subtype: "cash" },
  { id: "acc_ar", name: "Accounts Receivable", type: "asset", subtype: "accounts_receivable" },
  { id: "acc_deferred_rev", name: "Deferred Revenue", type: "liability", subtype: "deferred_revenue" },
  { id: "acc_ap", name: "Accounts Payable", type: "liability", subtype: "accounts_payable" },
];

// ─── Employees ───────────────────────────────────────────────────────────────

export const SEED_EMPLOYEES: Employee[] = [
  { id: "emp_001", name: "Jamie Chen", department: "Engineering", startDate: "2022-03-15", salary: 165000, integrationSource: "rippling" },
  { id: "emp_002", name: "Alex Rivera", department: "Engineering", startDate: "2022-07-01", salary: 155000, integrationSource: "rippling" },
  { id: "emp_003", name: "Sam Okafor", department: "Engineering", startDate: "2023-01-10", salary: 150000, integrationSource: "rippling" },
  { id: "emp_004", name: "Taylor Kim", department: "Engineering", startDate: "2023-06-05", salary: 145000, integrationSource: "rippling" },
  { id: "emp_005", name: "Morgan Lee", department: "Engineering", startDate: "2024-02-12", salary: 140000, integrationSource: "rippling" },
  { id: "emp_006", name: "Jordan Park", department: "Sales", startDate: "2022-05-01", salary: 95000, integrationSource: "rippling" },
  { id: "emp_007", name: "Casey Wong", department: "Sales", startDate: "2023-02-20", salary: 90000, integrationSource: "rippling" },
  { id: "emp_008", name: "Riley Patel", department: "Sales", startDate: "2024-01-08", salary: 85000, integrationSource: "rippling" },
  { id: "emp_009", name: "Drew Martinez", department: "Marketing", startDate: "2022-09-19", salary: 110000, integrationSource: "rippling" },
  { id: "emp_010", name: "Blake Johnson", department: "Marketing", startDate: "2023-11-06", salary: 100000, integrationSource: "rippling" },
  { id: "emp_011", name: "Avery Thompson", department: "Finance", startDate: "2021-11-01", salary: 130000, integrationSource: "rippling" },
  { id: "emp_012", name: "Quinn Davis", department: "Finance", startDate: "2024-03-04", salary: 105000, integrationSource: "rippling" },
  { id: "emp_013", name: "Sage Wilson", department: "Customer Success", startDate: "2022-12-01", salary: 95000, integrationSource: "rippling" },
  { id: "emp_014", name: "Rowan Garcia", department: "Customer Success", startDate: "2023-08-14", salary: 88000, integrationSource: "rippling" },
  { id: "emp_015", name: "Phoenix Adams", department: "HR", startDate: "2022-04-01", salary: 115000, integrationSource: "gusto" },
];

// ─── Transactions ─────────────────────────────────────────────────────────────
// 12 months of realistic SaaS transactions (Jan–Dec 2025)

function makeId(prefix: string, idx: number) {
  return `${prefix}_${String(idx).padStart(4, "0")}`;
}

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const m = String(i + 1).padStart(2, "0");
  return `2025-${m}`;
});

// Revenue ramps up ~4% per month
const MRR_BASE = 310000;
const MRR_GROWTH = 1.038;

export const SEED_TRANSACTIONS: Transaction[] = [];

let txIdx = 1;

for (let m = 0; m < 12; m++) {
  const month = MONTHS[m];
  const mrr = Math.round(MRR_BASE * Math.pow(MRR_GROWTH, m));
  const services = Math.round(mrr * 0.11);

  // Revenue
  SEED_TRANSACTIONS.push(
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_rev_saas", amount: mrr, description: "Monthly SaaS subscription billings", isRecurring: true, expenseType: "recurring", perEmployee: false, integrationSource: "quickbooks" },
    { id: makeId("txn", txIdx++), date: `${month}-15`, accountId: "acc_rev_svc", amount: services, description: "Professional services billing", isRecurring: false, expenseType: "variable", perEmployee: false, integrationSource: "quickbooks" },

    // COGS
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_cogs_hosting", amount: -Math.round(mrr * 0.07), description: "AWS / GCP cloud infrastructure", vendor: "Amazon Web Services", isRecurring: true, expenseType: "recurring", perEmployee: false, integrationSource: "quickbooks" },
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_cogs_support", amount: -Math.round(mrr * 0.055), description: "Customer support team cost allocation", isRecurring: true, expenseType: "recurring", perEmployee: true, integrationSource: "quickbooks" },
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_cogs_third_party", amount: -Math.round(mrr * 0.025), description: "Twilio, Stripe, and other pass-through software", vendor: "Various", isRecurring: true, expenseType: "recurring", perEmployee: false, integrationSource: "quickbooks" },

    // S&M
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_sm_salaries", amount: -Math.round(mrr * 0.135), description: "Sales & Marketing payroll", isRecurring: true, expenseType: "recurring", perEmployee: true, integrationSource: "gusto" },
    { id: makeId("txn", txIdx++), date: `${month}-05`, accountId: "acc_sm_ads", amount: -Math.round(mrr * 0.048), description: "Google Ads / LinkedIn performance marketing", vendor: "Google", isRecurring: true, expenseType: "recurring", perEmployee: false, integrationSource: "quickbooks" },
    ...(m % 3 === 0
      ? [{ id: makeId("txn", txIdx++), date: `${month}-20`, accountId: "acc_sm_events", amount: -Math.round(mrr * 0.015), description: "SaaStr / industry conference sponsorship", vendor: "SaaStr", isRecurring: false, expenseType: "one-time" as const, perEmployee: false }]
      : []),

    // R&D
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_rd_salaries", amount: -Math.round(mrr * 0.12), description: "Engineering payroll", isRecurring: true, expenseType: "recurring", perEmployee: true, integrationSource: "gusto" },
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_rd_tools", amount: -Math.round(mrr * 0.018), description: "GitHub, Datadog, Linear, Figma, etc.", vendor: "Various", isRecurring: true, expenseType: "recurring", perEmployee: true, integrationSource: "quickbooks" },

    // G&A
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_ga_salaries", amount: -Math.round(mrr * 0.085), description: "G&A payroll", isRecurring: true, expenseType: "recurring", perEmployee: true, integrationSource: "gusto" },
    { id: makeId("txn", txIdx++), date: `${month}-01`, accountId: "acc_ga_insurance", amount: -Math.round(mrr * 0.014), description: "D&O, E&O, and health insurance", vendor: "Embroker", isRecurring: true, expenseType: "recurring", perEmployee: true, integrationSource: "quickbooks" },
    { id: makeId("txn", txIdx++), date: `${month}-10`, accountId: "acc_ga_office", amount: -Math.round(mrr * 0.011), description: "Office lease and facilities", isRecurring: true, expenseType: "recurring", perEmployee: false, integrationSource: "quickbooks" },
    ...(m % 6 === 0
      ? [{ id: makeId("txn", txIdx++), date: `${month}-15`, accountId: "acc_ga_legal", amount: -Math.round(mrr * 0.022), description: "Legal retainer and contract review", vendor: "Cooley LLP", isRecurring: false, expenseType: "one-time" as const, perEmployee: false }]
      : []),
  );
}

// ─── Budget (Draft FY2025) ────────────────────────────────────────────────────

export const SEED_BUDGET: Budget = {
  id: "bgt_fy2025",
  name: "FY 2025 Annual Budget",
  fiscalYear: 2025,
  createdAt: "2024-12-01T00:00:00Z",
  status: "approved",
};

export const SEED_BUDGET_LINES: BudgetLine[] = [];

let blIdx = 1;

// Budget lines: slightly more conservative than actuals
for (let m = 1; m <= 12; m++) {
  const mrr = Math.round(MRR_BASE * Math.pow(1.035, m - 1)); // budget assumed 3.5% growth
  SEED_BUDGET_LINES.push(
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_rev_saas", month: m, amount: mrr },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_rev_svc", month: m, amount: Math.round(mrr * 0.10) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_cogs_hosting", month: m, amount: Math.round(mrr * 0.075) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_cogs_support", month: m, amount: Math.round(mrr * 0.06) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_sm_salaries", month: m, amount: Math.round(mrr * 0.14) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_sm_ads", month: m, amount: Math.round(mrr * 0.05) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_rd_salaries", month: m, amount: Math.round(mrr * 0.125) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_ga_salaries", month: m, amount: Math.round(mrr * 0.09) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_ga_insurance", month: m, amount: Math.round(mrr * 0.015) },
    { id: makeId("bl", blIdx++), budgetId: "bgt_fy2025", accountId: "acc_ga_office", month: m, amount: Math.round(mrr * 0.012) },
  );
}

// ─── Forecast (Base Scenario FY2025) ─────────────────────────────────────────

export const SEED_FORECAST: Forecast = {
  id: "fc_fy2025_base",
  name: "FY 2025 Base Forecast",
  baseBudgetId: "bgt_fy2025",
  createdAt: "2025-01-15T00:00:00Z",
  scenarioType: "base",
};

export const SEED_FORECAST_LINES: ForecastLine[] = [];

let flIdx = 1;

for (let m = 1; m <= 12; m++) {
  const mrr = Math.round(MRR_BASE * Math.pow(MRR_GROWTH, m - 1)); // actuals trajectory
  SEED_FORECAST_LINES.push(
    { id: makeId("fl", flIdx++), forecastId: "fc_fy2025_base", accountId: "acc_rev_saas", month: m, amount: mrr, driver: "manual" },
    { id: makeId("fl", flIdx++), forecastId: "fc_fy2025_base", accountId: "acc_rev_svc", month: m, amount: Math.round(mrr * 0.11), driver: "manual" },
    { id: makeId("fl", flIdx++), forecastId: "fc_fy2025_base", accountId: "acc_sm_salaries", month: m, amount: Math.round(mrr * 0.135), driver: "employee_count_based" },
    { id: makeId("fl", flIdx++), forecastId: "fc_fy2025_base", accountId: "acc_rd_salaries", month: m, amount: Math.round(mrr * 0.12), driver: "employee_count_based" },
    { id: makeId("fl", flIdx++), forecastId: "fc_fy2025_base", accountId: "acc_cogs_hosting", month: m, amount: Math.round(mrr * 0.07), driver: "recurring" },
    { id: makeId("fl", flIdx++), forecastId: "fc_fy2025_base", accountId: "acc_ga_salaries", month: m, amount: Math.round(mrr * 0.085), driver: "employee_count_based" },
  );
}

// ─── Integrations ─────────────────────────────────────────────────────────────

export const SEED_INTEGRATIONS: Integration[] = [
  { id: "int_qbo", provider: "quickbooks", status: "connected", lastSyncedAt: "2025-06-10T08:00:00Z", configJson: { realmId: "123456789", environment: "production" } },
  { id: "int_netsuite", provider: "netsuite", status: "disconnected" },
  { id: "int_rippling", provider: "rippling", status: "error", lastSyncedAt: "2025-06-07T14:22:00Z" },
  { id: "int_gusto", provider: "gusto", status: "disconnected" },
];
