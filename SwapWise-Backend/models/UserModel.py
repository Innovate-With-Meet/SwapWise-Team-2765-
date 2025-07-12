from pydantic import BaseModel,Field,validator
from bson import ObjectId
from typing import Optional, Dict, Any
import bcrypt
import base64
from fastapi import File, UploadFile, Form

class User(BaseModel):
    firstName:str
    lastName:str
    role_id:str
    email:str
    password:str
    
    @validator("password",pre=True,always=True)
    def encrypt_password(cls,v):
        if v is None:
            return None
        return bcrypt.hashpw(v.encode("utf-8"),bcrypt.gensalt())

class UserOut(User):
    id:str = Field(alias="_id")
    firstName:str
    lastName:str
    status:Optional[bool] = None
    role_id:str
    skills:Optional[list] = None
    email:str
    password:str
    role:Optional[Dict[str,Any]] = None
    
    @validator("id", "role_id",pre=True,always=True)
    def convert_objectId(cls,v):
        if isinstance(v,ObjectId):
            return str(v)
        return v
    
    @validator("role", pre=True, always=True)
    def convert_role(cls, v):
        if isinstance(v, dict) and "_id" in v:
            v["_id"] = str(v["_id"])
        return v

class UserLogin(BaseModel):
    email:str
    password:str

class UserPasswordUpdate(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

    @validator("new_password")
    def password_match(cls, v, values, **kwargs):
        if 'confirm_password' in values and v != values['confirm_password']:
            raise ValueError('New password and confirmation do not match.')
        return v