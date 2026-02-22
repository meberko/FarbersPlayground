"""
AI router – stub for Phase 1.
In Phase 2 this will proxy requests to the Claude API / Anthropic SDK
to power natural-language financial explanations and AI-assisted forecasting.
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["ai"])


class ChatRequest(BaseModel):
    message: str
    context: dict = {}


class ChatResponse(BaseModel):
    reply: str
    model: str = "stub"


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Phase 1 stub – returns a placeholder response.
    Phase 2: integrate Claude API for financial Q&A and forecast generation.
    """
    return ChatResponse(
        reply=(
            "AI integration is coming in Phase 2. "
            "Aria will use Claude to explain your financials in plain English "
            "and assist with budget and forecast building."
        )
    )
