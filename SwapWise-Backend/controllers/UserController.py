from models.UserModel import *
from bson import ObjectId
from config.database import user_collection,role_collection
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi import APIRouter, HTTPException, UploadFile, File,Form
from fastapi.responses import JSONResponse
import bcrypt
import shutil
import os

async def addUser(user:User):
    user.role_id = ObjectId(user.role_id)
    print("after type cast",user.role_id)
    result = await user_collection.insert_one(user.dict())
    return JSONResponse(status_code=201,content={"message":"User created successfully"})

async def getAllUsers():
    users = await user_collection.find().to_list(length=None)

    for user in users:
        if "role_id" in user and isinstance(user["role_id"], ObjectId):
            user["role_id"] = str(user["role_id"])
        
        role = await role_collection.find_one({"_id": ObjectId(user["role_id"])})  
        
        if role:
            role["_id"] = str(role["_id"])
            user["role"] = role

    return [UserOut(**user) for user in users]

async def loginUser(request:UserLogin):
    foundUser = await user_collection.find_one({"email":request.email})
    if foundUser is None:
        raise HTTPException(status_code=404,detail="User not found")
        
    if "password" in foundUser and bcrypt.checkpw(request.password.encode(),foundUser["password"].encode()):
        foundUser["_id"] = str(foundUser["_id"])
        foundUser["role_id"] = str(foundUser["role_id"])
        role = await role_collection.find_one({"_id":ObjectId(foundUser["role_id"])})
        foundUser["role"] = role
        print("foundUser",foundUser)
        return {"message":"user login success","user":UserOut(**foundUser)}
    else:
        raise HTTPException(status_code=404,detail="Invalid password")
    
async def updateUserFromUserOut(user_id: str, user_update_data: UserOut):
    try:
        object_id_from_path = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID format in path.")

    existing_user_doc = await user_collection.find_one({"_id": object_id_from_path})
    if not existing_user_doc:
        raise HTTPException(status_code=404, detail="User not found.")

    update_fields = {}

    updatable_field_names = ["firstName", "lastName", "status", "skills"]

    incoming_data = user_update_data.model_dump(exclude={"id", "role"}, exclude_unset=True)
    
    for field_name, value in incoming_data.items():
        if field_name in updatable_field_names:
            if value is not None:
                update_fields[field_name] = value

    if not update_fields:
        if "role_id" in existing_user_doc and isinstance(existing_user_doc["role_id"], ObjectId):
            role = await role_collection.find_one({"_id": existing_user_doc["role_id"]})
            if role:
                role["_id"] = str(role["_id"])
                existing_user_doc["role"] = role
        existing_user_doc["_id"] = str(existing_user_doc["_id"])
        return JSONResponse(status_code=200, content={"message": "No updatable fields provided or no changes requested.", "user": UserOut(**existing_user_doc).dict()})

    result = await user_collection.update_one(
        {"_id": object_id_from_path},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User found, but no updatable changes were provided or values were identical.")

    updated_user_doc = await user_collection.find_one({"_id": object_id_from_path})
    if updated_user_doc:
        updated_user_doc["_id"] = str(updated_user_doc["_id"])
        if "role_id" in updated_user_doc and isinstance(updated_user_doc["role_id"], ObjectId):
            updated_user_doc["role_id"] = str(updated_user_doc["role_id"])
        
        if "role_id" in updated_user_doc:
            role = await role_collection.find_one({"_id": ObjectId(updated_user_doc["role_id"])})
            if role:
                role["_id"] = str(role["_id"])
                updated_user_doc["role"] = role

        return JSONResponse(status_code=200, content={"message": "User updated successfully", "user": UserOut(**updated_user_doc).dict()})
    else:
        return JSONResponse(status_code=500, content={"message": "User updated successfully, but failed to retrieve updated user details. This indicates an internal server issue."})
    
async def updatePassword(user_id: str, password_data: UserPasswordUpdate):
    try:
        object_id_from_path = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user ID format.")

    user = await user_collection.find_one({"_id": object_id_from_path})
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    stored_hashed_password = user.get("password")
    if stored_hashed_password is None:
        raise HTTPException(status_code=500, detail="No password found for this user. Cannot update.")
    
    if not bcrypt.checkpw(password_data.current_password.encode("utf-8"), stored_hashed_password.encode("utf-8")):
        raise HTTPException(status_code=400, detail="Invalid current password.")

    hashed_new_password = bcrypt.hashpw(password_data.new_password.encode("utf-8"), bcrypt.gensalt())

    result = await user_collection.update_one(
        {"_id": object_id_from_path},
        {"$set": {"password": hashed_new_password.decode("utf-8")}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update password. No changes recorded.")

    return JSONResponse(status_code=200, content={"message": "Password updated successfully."})

async def searchUsersByName(query: str):
    search_terms = query.strip().split()

    if not search_terms:
        return await getAllUsers()

    or_conditions = []
    for term in search_terms:
        or_conditions.append({"firstName": {"$regex": term, "$options": "i"}})
        or_conditions.append({"lastName": {"$regex": term, "$options": "i"}})
    
    mongo_query = {"$or": or_conditions}

    users = await user_collection.find(mongo_query).to_list(length=None)

    processed_users = []
    for user_doc in users:
        user_doc["_id"] = str(user_doc["_id"])
        if "role_id" in user_doc and isinstance(user_doc["role_id"], ObjectId):
            user_doc["role_id"] = str(user_doc["role_id"])
        
        if "role_id" in user_doc:
            role = await role_collection.find_one({"_id": ObjectId(user_doc["role_id"])})
            if role:
                role["_id"] = str(role["_id"])
                user_doc["role"] = role
        
        if "password" in user_doc:
            del user_doc["password"]
            
        processed_users.append(UserOut(**user_doc))
            
    return processed_users

async def searchUsersBySkills(skill_query: str):
    if not skill_query:
        return []
    
    mongo_query = {
        "skills": {
            "$regex": skill_query.strip(),
            "$options": "i"
        }
    }

    users = await user_collection.find(mongo_query).to_list(length=None)

    processed_users = []
    for user_doc in users:
        user_doc["_id"] = str(user_doc["_id"])
        if "role_id" in user_doc and isinstance(user_doc["role_id"], ObjectId):
            user_doc["role_id"] = str(user_doc["role_id"])
        
        if "role_id" in user_doc:
            role = await role_collection.find_one({"_id": ObjectId(user_doc["role_id"])})
            if role:
                role["_id"] = str(role["_id"])
                user_doc["role"] = role
        
        if "password" in user_doc:
            del user_doc["password"]
            
        processed_users.append(UserOut(**user_doc))
            
    return processed_users

