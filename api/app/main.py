"""
Aria – FastAPI Backend
Phase 1: Core scaffold with health check, AI stub, and integration stubs.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, ai, integrations

app = FastAPI(
    title="Aria API",
    description="FP&A and AI-powered financial reporting platform – backend API",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS – allow the Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ────────────────────────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(ai.router)
app.include_router(integrations.router)


@app.get("/")
async def root():
    return {
        "name": "Aria API",
        "version": "0.1.0",
        "phase": 1,
        "docs": "/docs",
        "health": "/health",
    }
