"""
Integrations router – stub connectors for Phase 1.
Phase 2 will implement OAuth flows and data sync for each provider.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/integrations", tags=["integrations"])

SUPPORTED_PROVIDERS = ["quickbooks", "netsuite", "rippling", "gusto"]


class ConnectRequest(BaseModel):
    provider: str
    config: dict = {}


class SyncResponse(BaseModel):
    provider: str
    status: str
    message: str
    records_synced: Optional[int] = None


@router.get("")
async def list_integrations():
    """List all available integration providers and their stub status."""
    return {
        "integrations": [
            {"provider": p, "status": "stub", "note": "OAuth connector coming in Phase 2"}
            for p in SUPPORTED_PROVIDERS
        ]
    }


@router.post("/{provider}/connect")
async def connect_integration(provider: str, request: ConnectRequest):
    if provider not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=404, detail=f"Provider '{provider}' not supported")
    return {
        "provider": provider,
        "status": "stub",
        "message": f"{provider} OAuth flow will be implemented in Phase 2.",
    }


@router.post("/{provider}/sync", response_model=SyncResponse)
async def sync_integration(provider: str):
    if provider not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=404, detail=f"Provider '{provider}' not supported")
    return SyncResponse(
        provider=provider,
        status="stub",
        message=f"Real sync for {provider} is coming in Phase 2.",
        records_synced=0,
    )


@router.delete("/{provider}/disconnect")
async def disconnect_integration(provider: str):
    if provider not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=404, detail=f"Provider '{provider}' not supported")
    return {"provider": provider, "status": "disconnected"}
