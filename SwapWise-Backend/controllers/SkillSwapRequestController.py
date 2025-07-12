# SwapWise-Backend/controllers/SkillSwapRequestController.py

from models.SkillSwapRequestModel import (
    SkillSwapRequestCreate,
    SkillSwapRequestOut,
    SkillSwapRequestUpdate,
    AcceptedRequestRecord,
    RejectedRequestRecord,
    ProviderAction # Though ProviderAction model is used in routes, not here directly
)
from bson import ObjectId
from config.database import (
    skill_swap_requests_collection,
    accepted_requests_collection,
    rejected_requests_collection,
    user_collection # To check if provider exists
)
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from typing import List, Dict, Any


# --- Helper Function to prepare SkillSwapRequest document for output ---
async def _prepare_request_output(request_doc: Dict[str, Any]) -> SkillSwapRequestOut:
    """Converts MongoDB document to SkillSwapRequestOut Pydantic model."""
    if request_doc:
        request_doc["_id"] = str(request_doc["_id"])
        # Ensure creator_id is string
        if "creator_id" in request_doc and isinstance(request_doc["creator_id"], ObjectId):
            request_doc["creator_id"] = str(request_doc["creator_id"])
        # Ensure provider_id elements are strings
        if "provider_id" in request_doc and request_doc["provider_id"] is not None:
            request_doc["provider_id"] = [str(pid) if isinstance(pid, ObjectId) else pid for pid in request_doc["provider_id"]]
        return SkillSwapRequestOut(**request_doc)
    return None


# --- CRUD Operations for Skill Swap Requests ---

async def createSkillSwapRequest(request: SkillSwapRequestCreate):
    """Creates a new skill swap request."""
    # Ensure creator_id is a valid ObjectId if you plan to link it to users collection
    # If creator_id is just a string, no conversion needed here. Assuming it might be an ObjectId string.
    
    # Prepare data for insertion, initializing provider_id and status
    request_data = request.dict()
    request_data["_id"] = ObjectId() # Generate a new ObjectId for the request
    request_data["provider_id"] = [] # Initialize as empty list
    request_data["status"] = "active" # Default status

    try:
        # Convert creator_id string to ObjectId if it's meant to be stored as such
        # This assumes creator_id in Pydantic model is a string, but in DB it's ObjectId.
        if ObjectId.is_valid(request.creator_id):
            request_data["creator_id"] = ObjectId(request.creator_id)
        else:
            raise HTTPException(status_code=400, detail="Invalid creator_id format.")

        result = await skill_swap_requests_collection.insert_one(request_data)
        if result.inserted_id:
            # Fetch the newly created document to return it formatted
            new_request = await skill_swap_requests_collection.find_one({"_id": result.inserted_id})
            return JSONResponse(status_code=201, content={
                "message": "Skill swap request created successfully.",
                "request": await _prepare_request_output(new_request)
            })
        raise HTTPException(status_code=500, detail="Failed to create skill swap request.")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


async def getAllSkillSwapRequests():
    """Retrieves all skill swap requests."""
    requests = await skill_swap_requests_collection.find().to_list(length=None)
    
    prepared_requests = []
    for req_doc in requests:
        prepared_requests.append(await _prepare_request_output(req_doc))
    
    return prepared_requests


async def getSkillSwapRequestById(request_id: str):
    """Retrieves a single skill swap request by its ID."""
    try:
        object_id = ObjectId(request_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request ID format.")

    request_doc = await skill_swap_requests_collection.find_one({"_id": object_id})
    if request_doc:
        return await _prepare_request_output(request_doc)
    raise HTTPException(status_code=404, detail="Skill swap request not found.")


async def updateSkillSwapRequest(request_id: str, update_data: SkillSwapRequestUpdate):
    """Updates general fields of a skill swap request by its creator."""
    try:
        object_id = ObjectId(request_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request ID format.")

    # Convert update_data to dict, excluding unset fields
    update_fields = update_data.dict(exclude_unset=True)

    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    # Ensure status is valid if provided
    if "status" in update_fields and update_fields["status"] not in ["active", "inactive"]:
        raise HTTPException(status_code=400, detail="Status must be 'active' or 'inactive'.")

    result = await skill_swap_requests_collection.update_one(
        {"_id": object_id},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        # Check if request exists at all
        existing_request = await skill_swap_requests_collection.find_one({"_id": object_id})
        if not existing_request:
            raise HTTPException(status_code=404, detail="Skill swap request not found.")
        else:
            raise HTTPException(status_code=200, detail="No changes made or values were identical.")

    updated_request_doc = await skill_swap_requests_collection.find_one({"_id": object_id})
    return JSONResponse(status_code=200, content={
        "message": "Skill swap request updated successfully.",
        "request": await _prepare_request_output(updated_request_doc)
    })

# --- Provider Action Functions ---

# Helper to check if a provider ID is valid
async def _validate_provider_id(provider_id: str):
    try:
        provider_obj_id = ObjectId(provider_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid provider ID format.")
    
    # Optionally, check if the provider actually exists in the users collection
    existing_provider = await user_collection.find_one({"_id": provider_obj_id})
    if not existing_provider:
        raise HTTPException(status_code=404, detail="Provider not found.")
    return provider_obj_id


async def providerAcceptsRequest(request_id: str, provider_id: str):
    """
    Allows a provider to accept a skill swap request.
    Adds provider_id to the request's provider_id list and logs in accepted_requests collection.
    """
    try:
        request_obj_id = ObjectId(request_id)
        provider_obj_id = await _validate_provider_id(provider_id)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request ID format.")

    request_doc = await skill_swap_requests_collection.find_one({"_id": request_obj_id})
    if not request_doc:
        raise HTTPException(status_code=404, detail="Skill swap request not found.")
    
    # Check if provider has already rejected this request
    existing_rejected_record = await rejected_requests_collection.find_one(
        {"request_id": request_obj_id, "provider_id": provider_obj_id}
    )
    if existing_rejected_record:
        raise HTTPException(status_code=400, detail="You have previously rejected this request. Cannot accept.")

    # Check if provider has already accepted this request
    if provider_obj_id in request_doc.get("provider_id", []):
        raise HTTPException(status_code=400, detail="You have already accepted this request.")

    # Check if the request is still active and has room for more providers
    current_providers_count = len(request_doc.get("provider_id", []))
    total_required = request_doc.get("total_required_provider", 0)

    if request_doc.get("status") == "inactive":
        raise HTTPException(status_code=400, detail="This skill swap request is no longer active.")
    
    if current_providers_count >= total_required:
        raise HTTPException(status_code=400, detail="This request has already reached its maximum number of providers.")
    
    # 1. Add provider_id to the request's provider_id list (atomically)
    update_result = await skill_swap_requests_collection.update_one(
        {"_id": request_obj_id},
        {"$addToSet": {"provider_id": provider_obj_id}} # $addToSet prevents duplicates
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to add provider to request.")

    # Re-fetch the updated request to get the new provider_id count
    updated_request_doc = await skill_swap_requests_collection.find_one({"_id": request_obj_id})
    
    # 2. Update request status if total_required_provider is met
    if len(updated_request_doc.get("provider_id", [])) >= updated_request_doc.get("total_required_provider", 0):
        await skill_swap_requests_collection.update_one(
            {"_id": request_obj_id},
            {"$set": {"status": "inactive"}}
        )

    # 3. Log the acceptance in the accepted_requests collection
    accepted_record_data = AcceptedRequestRecord(
        request_id=str(request_obj_id),
        provider_id=str(provider_obj_id)
    ).dict()
    # Convert IDs back to ObjectId for storage if needed, Pydantic model keeps them strings after validation
    accepted_record_data["request_id"] = ObjectId(accepted_record_data["request_id"])
    accepted_record_data["provider_id"] = ObjectId(accepted_record_data["provider_id"])

    await accepted_requests_collection.insert_one(accepted_record_data)

    return JSONResponse(status_code=200, content={
        "message": "You have successfully accepted this skill swap request.",
        "request": await _prepare_request_output(updated_request_doc)
    })


async def providerRejectsRequest(request_id: str, provider_id: str):
    """
    Allows a provider to reject a skill swap request.
    Logs the rejection in the rejected_requests collection.
    """
    try:
        request_obj_id = ObjectId(request_id)
        provider_obj_id = await _validate_provider_id(provider_id)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid request ID format.")

    request_doc = await skill_swap_requests_collection.find_one({"_id": request_obj_id})
    if not request_doc:
        raise HTTPException(status_code=404, detail="Skill swap request not found.")

    # Check if provider has already accepted this request
    if provider_obj_id in request_doc.get("provider_id", []):
        raise HTTPException(status_code=400, detail="You have already accepted this request. Cannot reject.")
    
    # Check if provider has already rejected this request
    existing_rejected_record = await rejected_requests_collection.find_one(
        {"request_id": request_obj_id, "provider_id": provider_obj_id}
    )
    if existing_rejected_record:
        raise HTTPException(status_code=400, detail="You have already rejected this request.")

    # Log the rejection in the rejected_requests collection
    rejected_record_data = RejectedRequestRecord(
        request_id=str(request_obj_id),
        provider_id=str(provider_obj_id)
    ).dict()
    # Convert IDs back to ObjectId for storage
    rejected_record_data["request_id"] = ObjectId(rejected_record_data["request_id"])
    rejected_record_data["provider_id"] = ObjectId(rejected_record_data["provider_id"])

    await rejected_requests_collection.insert_one(rejected_record_data)

    return JSONResponse(status_code=200, content={
        "message": "You have successfully rejected this skill swap request."
    })

# --- Additional Fetching Functions (Optional but useful) ---

async def getAcceptedRequestsByProvider(provider_id: str):
    """Retrieves all requests accepted by a specific provider."""
    try:
        provider_obj_id = await _validate_provider_id(provider_id)
    except HTTPException as e:
        raise e

    accepted_records = await accepted_requests_collection.find({"provider_id": provider_obj_id}).to_list(length=None)
    
    # Fetch the actual request details for each accepted record
    accepted_requests_details = []
    for record in accepted_records:
        request_doc = await skill_swap_requests_collection.find_one({"_id": record["request_id"]})
        if request_doc:
            accepted_requests_details.append(await _prepare_request_output(request_doc))
    
    return accepted_requests_details

async def getRejectedRequestsByProvider(provider_id: str):
    """Retrieves all requests rejected by a specific provider."""
    try:
        provider_obj_id = await _validate_provider_id(provider_id)
    except HTTPException as e:
        raise e

    rejected_records = await rejected_requests_collection.find({"provider_id": provider_obj_id}).to_list(length=None)
    
    # Fetch the actual request details for each rejected record
    rejected_requests_details = []
    for record in rejected_records:
        request_doc = await skill_swap_requests_collection.find_one({"_id": record["request_id"]})
        if request_doc:
            rejected_requests_details.append(await _prepare_request_output(request_doc))
    
    return rejected_requests_details