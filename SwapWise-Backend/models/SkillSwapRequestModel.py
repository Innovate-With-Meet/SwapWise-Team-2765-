# SwapWise-Backend/models/SkillSwapRequestModel.py

from pydantic import BaseModel, Field, validator
from typing import Optional, List, Literal, Dict, Any
from bson import ObjectId
from datetime import datetime # Import datetime

# Helper function for Pydantic to handle ObjectId conversion
def convert_objectId(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v

# Model for creating a new Skill Swap Request
class SkillSwapRequestCreate(BaseModel):
    creator_id: str
    project_title: str
    required_skills: List[str]
    desc: str
    total_required_provider: int
    availability: str # E.g., "Weekdays evenings", "Flexible", "Specific dates"

# Model for updating existing Skill Swap Request details (general info, not provider actions)
class SkillSwapRequestUpdate(BaseModel):
    project_title: Optional[str] = None
    required_skills: Optional[List[str]] = None
    desc: Optional[str] = None
    total_required_provider: Optional[int] = None
    availability: Optional[str] = None
    status: Optional[Literal["active", "inactive"]] = None # Allow creator/admin to change status

# Output model for Skill Swap Request (includes ID and defaults for internal fields)
class SkillSwapRequestOut(SkillSwapRequestCreate):
    id: str = Field(alias="_id")
    provider_id: List[str] = [] # Default to empty list for providers who accepted/are assigned
    status: Literal["active", "inactive"] = "active" # Default status when created
    
    @validator("id", pre=True, always=True)
    def validate_id(cls, v):
        return convert_objectId(v)

    @validator("creator_id", pre=True, always=True)
    def validate_creator_id(cls, v):
        return convert_objectId(v)
    
    # Optional: If you want to ensure provider_ids are also strings when fetched from DB
    @validator("provider_id", pre=True, each_item=True, always=True)
    def validate_provider_ids(cls, v):
        return convert_objectId(v)


# Model for a provider accepting or rejecting a request
# This is mainly for the POST body when a provider acts on a request.
class ProviderAction(BaseModel):
    provider_id: str # The ID of the user (provider) taking the action


# Model for records in the 'accepted_requests' collection
class AcceptedRequestRecord(BaseModel):
    request_id: str
    provider_id: str
    accepted_at: datetime = Field(default_factory=datetime.now) # Automatically set creation time

    @validator("request_id", "provider_id", pre=True, always=True)
    def validate_ids(cls, v):
        return convert_objectId(v)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }


# Model for records in the 'rejected_requests' collection
class RejectedRequestRecord(BaseModel):
    request_id: str
    provider_id: str
    rejected_at: datetime = Field(default_factory=datetime.now) # Automatically set creation time

    @validator("request_id", "provider_id", pre=True, always=True)
    def validate_ids(cls, v):
        return convert_objectId(v)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }