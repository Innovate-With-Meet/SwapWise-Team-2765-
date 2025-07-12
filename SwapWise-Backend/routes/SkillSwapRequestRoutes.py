# SwapWise-Backend/routes/SkillSwapRequestRoutes.py

from fastapi import APIRouter, HTTPException, Path, Body
from controllers.SkillSwapRequestController import (
    createSkillSwapRequest,
    getAllSkillSwapRequests,
    getSkillSwapRequestById,
    updateSkillSwapRequest,
    providerAcceptsRequest,
    providerRejectsRequest,
    getAcceptedRequestsByProvider,
    getRejectedRequestsByProvider
)
from models.SkillSwapRequestModel import (
    SkillSwapRequestCreate,
    SkillSwapRequestOut,
    SkillSwapRequestUpdate,
    ProviderAction
)
from typing import List, Dict, Any

router = APIRouter()

# --- Skill Swap Request CRUD ---

@router.post("/skill-swap-requests/", response_model=Dict[str, Any], status_code=201)
async def create_skill_swap_request_route(request: SkillSwapRequestCreate):
    """Create a new skill swap request."""
    return await createSkillSwapRequest(request)

@router.get("/skill-swap-requests/", response_model=List[SkillSwapRequestOut])
async def get_all_skill_swap_requests_route():
    """Retrieve all skill swap requests."""
    return await getAllSkillSwapRequests()

@router.get("/skill-swap-requests/{request_id}", response_model=SkillSwapRequestOut)
async def get_skill_swap_request_by_id_route(
    request_id: str = Path(..., description="The ID of the skill swap request")
):
    """Retrieve a single skill swap request by ID."""
    return await getSkillSwapRequestById(request_id)

@router.put("/skill-swap-requests/{request_id}", response_model=Dict[str, Any])
async def update_skill_swap_request_route(
    request_id: str = Path(..., description="The ID of the skill swap request to update"),
    update_data: SkillSwapRequestUpdate = Body(..., description="Fields to update")
):
    """Update general details of a skill swap request."""
    return await updateSkillSwapRequest(request_id, update_data)


# --- Provider Actions on Skill Swap Requests ---

@router.post("/skill-swap-requests/{request_id}/accept", response_model=Dict[str, Any])
async def provider_accepts_request_route(
    request_id: str = Path(..., description="The ID of the request to accept"),
    action_data: ProviderAction = Body(..., description="Provider's ID")
):
    """A provider accepts a skill swap request."""
    return await providerAcceptsRequest(request_id, action_data.provider_id)

@router.post("/skill-swap-requests/{request_id}/reject", response_model=Dict[str, Any])
async def provider_rejects_request_route(
    request_id: str = Path(..., description="The ID of the request to reject"),
    action_data: ProviderAction = Body(..., description="Provider's ID")
):
    """A provider rejects a skill swap request."""
    return await providerRejectsRequest(request_id, action_data.provider_id)


# --- Fetching Accepted/Rejected Requests for a Provider ---

@router.get("/users/{provider_id}/accepted-requests/", response_model=List[SkillSwapRequestOut])
async def get_accepted_requests_for_provider_route(
    provider_id: str = Path(..., description="The ID of the provider")
):
    """Retrieve all skill swap requests accepted by a specific provider."""
    return await getAcceptedRequestsByProvider(provider_id)

@router.get("/users/{provider_id}/rejected-requests/", response_model=List[SkillSwapRequestOut])
async def get_rejected_requests_for_provider_route(
    provider_id: str = Path(..., description="The ID of the provider")
):
    """Retrieve all skill swap requests rejected by a specific provider."""
    return await getRejectedRequestsByProvider(provider_id)