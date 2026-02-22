"""
Aria – Pydantic schemas mirroring the frontend TypeScript data models.
These are used for request/response validation in the FastAPI layer.
"""

from __future__ import annotations

from datetime import date, datetime
from enum import Enum
from typing import Any, Optional
from pydantic import BaseModel, Field
import uuid


# ── Enums ──────────────────────────────────────────────────────────────────────

class Currency(str, Enum):
    USD = "USD"
    EUR = "EUR"
    GBP = "GBP"
    CAD = "CAD"
    AUD = "AUD"


class AccountType(str, Enum):
    asset = "asset"
    liability = "liability"
    equity = "equity"
    revenue = "revenue"
    expense = "expense"


class ExpenseType(str, Enum):
    prepaid = "prepaid"
    recurring = "recurring"
    variable = "variable"
    one_time = "one-time"


class BudgetStatus(str, Enum):
    draft = "draft"
    approved = "approved"


class ScenarioType(str, Enum):
    base = "base"
    optimistic = "optimistic"
    pessimistic = "pessimistic"


class ForecastDriver(str, Enum):
    manual = "manual"
    ai_generated = "ai_generated"
    employee_count_based = "employee_count_based"
    recurring = "recurring"


class IntegrationProvider(str, Enum):
    quickbooks = "quickbooks"
    netsuite = "netsuite"
    rippling = "rippling"
    gusto = "gusto"


class IntegrationStatus(str, Enum):
    connected = "connected"
    disconnected = "disconnected"
    error = "error"
    syncing = "syncing"


# ── Company ────────────────────────────────────────────────────────────────────

class Company(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    fiscal_year_start: int = Field(ge=1, le=12, description="Month number (1=January)")
    currency: Currency = Currency.USD
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ── Account ────────────────────────────────────────────────────────────────────

class Account(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    type: AccountType
    subtype: str
    parent_account_id: Optional[str] = None
    integration_source: Optional[IntegrationProvider] = None


# ── Transaction ────────────────────────────────────────────────────────────────

class Transaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: date
    account_id: str
    amount: float
    description: str
    vendor: Optional[str] = None
    category: Optional[str] = None
    is_recurring: bool = False
    expense_type: ExpenseType = ExpenseType.variable
    per_employee: bool = False
    integration_source: Optional[IntegrationProvider] = None
    raw_payload: Optional[dict[str, Any]] = None


# ── Employee ───────────────────────────────────────────────────────────────────

class Employee(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    department: str
    start_date: date
    end_date: Optional[date] = None
    salary: float
    integration_source: Optional[IntegrationProvider] = None


# ── Budget ─────────────────────────────────────────────────────────────────────

class Budget(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    fiscal_year: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: BudgetStatus = BudgetStatus.draft


class BudgetLine(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    budget_id: str
    account_id: str
    month: int = Field(ge=1, le=12)
    amount: float
    notes: Optional[str] = None


# ── Forecast ───────────────────────────────────────────────────────────────────

class Forecast(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    base_budget_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    scenario_type: ScenarioType = ScenarioType.base


class ForecastLine(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    forecast_id: str
    account_id: str
    month: int = Field(ge=1, le=12)
    amount: float
    driver: ForecastDriver = ForecastDriver.manual
    notes: Optional[str] = None


# ── Integration ────────────────────────────────────────────────────────────────

class Integration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    provider: IntegrationProvider
    status: IntegrationStatus = IntegrationStatus.disconnected
    last_synced_at: Optional[datetime] = None
    config_json: Optional[dict[str, Any]] = None
