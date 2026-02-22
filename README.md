# Aria – FP&A & AI-Powered Financial Reporting Platform

> **Phase 1 — Core scaffold and data models**

Aria is a local-first financial planning & analysis platform designed for modern SaaS companies. It provides financial reporting, KPI dashboards, scenario-based forecasting, EBITDA tracking, and integrations with leading accounting and HR systems.

---

## Architecture Overview

```
FarbersPlayground/
├── aria/          # Next.js 15 frontend (App Router, TypeScript, Tailwind)
└── api/           # Python FastAPI backend
```

### Storage Strategy

All data lives in **IndexedDB** in the browser (via [Dexie.js](https://dexie.org/)), accessed exclusively through a **Repository pattern** (`lib/db/`). The abstraction layer makes it trivial to swap IndexedDB for a PostgreSQL backend in Phase 2 without touching any business logic.

```
lib/db/
├── models/index.ts           # TypeScript data model interfaces
├── repositories/
│   ├── base.ts               # Repository<T> interface (getAll, getById, create, update, delete, query)
│   └── indexeddb.ts          # IndexedDBRepository<T> — Dexie.js implementation
├── schema.ts                 # AriaDatabase (Dexie schema + versioning)
└── index.ts                  # db singleton — the ONLY entry point for all DB access
```

**Rule:** Never import Dexie directly from business logic or components. Always use `import { db } from "@/lib/db"`.

---

## Prerequisites

- **Node.js** ≥ 20
- **Python** ≥ 3.11
- **npm** ≥ 10

---

## Getting Started

### 1. Frontend (Next.js)

```bash
cd aria
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app will initialize IndexedDB and seed it with sample data on first load.

### 2. Backend (FastAPI)

```bash
cd api

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate        # macOS/Linux
# .venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# Copy and edit environment variables
cp .env.example .env

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## Modules

| Route | Description |
|-------|-------------|
| `/reporting` | Financial Reporting — P&L, Balance Sheet, Cash Flow |
| `/kpis` | KPIs & Analytics — SaaS metrics dashboard |
| `/forecasting` | Forecasting & Budgeting — Scenario planning, Budget vs Actuals |
| `/ebitda` | EBITDA Reporting — Waterfall view, bridge analysis |
| `/integrations` | Integrations — QuickBooks, NetSuite, Rippling, Gusto connectors |

---

## Data Models

All models are defined in `aria/lib/db/models/index.ts` (TypeScript) and mirrored in `api/app/models/schemas.py` (Pydantic).

| Model | Key Fields |
|-------|-----------|
| `Company` | name, fiscalYearStart, currency |
| `Account` | type (asset/liability/equity/revenue/expense), subtype, parentAccountId |
| `Transaction` | date, accountId, amount, expenseType, isRecurring, perEmployee |
| `Employee` | department, startDate, salary, integrationSource |
| `Budget` | fiscalYear, status (draft/approved) |
| `BudgetLine` | budgetId, accountId, month, amount |
| `Forecast` | baseBudgetId, scenarioType (base/optimistic/pessimistic) |
| `ForecastLine` | forecastId, accountId, month, amount, driver |
| `Integration` | provider, status, lastSyncedAt, configJson |

---

## Seed Data

On first load, the app seeds IndexedDB with realistic sample data for **Acme SaaS Co.** (FY 2025):

- **12 months** of transactions (revenue, COGS, S&M, R&D, G&A)
- **15 employees** across Engineering, Sales, Marketing, Finance, CS, HR
- **Chart of accounts** with ~16 accounts across all types
- **FY 2025 approved budget** with monthly lines for all major accounts
- **Base forecast** driven by actuals trajectory and employee-count-based models
- **Integration stubs** (QuickBooks connected, others disconnected/error)

To reset seed data, open browser DevTools → Application → IndexedDB → delete `AriaDB` and refresh.

---

## Development Conventions

### Adding a new DB table

1. Add the TypeScript interface to `aria/lib/db/models/index.ts`
2. Add the Pydantic schema to `api/app/models/schemas.py`
3. Add the table to `AriaDatabase` in `aria/lib/db/schema.ts`
4. Add a repository accessor to `aria/lib/db/index.ts`
5. Use via `db.<tableName>.<method>()`

### Swapping the storage backend

Implement a new class that satisfies `Repository<T>` (from `aria/lib/db/repositories/base.ts`) and substitute it in `aria/lib/db/index.ts`. Zero changes needed elsewhere.

### Adding a new module page

1. Create `aria/app/(dashboard)/<module>/page.tsx`
2. Add the nav entry to `aria/components/layout/Sidebar.tsx`

---

## Phase 2 Roadmap

- **AI Assistant** — Connect Claude API for natural-language financial Q&A and AI-assisted forecast building
- **Real Integrations** — OAuth flows for QuickBooks, NetSuite, Rippling, Gusto
- **Charts** — Interactive time-series charts (Recharts or Tremor)
- **PostgreSQL migration** — Swap IndexedDB repositories for a server-side DB
- **Multi-entity** — Support for multiple companies / subsidiaries
- **Export** — PDF and Excel report generation
