from fastapi import APIRouter, UploadFile, File, Form, Query
from controllers.UserController import *
from models.UserModel import *

router = APIRouter()

@router.post("/user/")
async def post_user(user:User):
    return await addUser(user)

@router.get("/users/")
async def get_users():
    return await getAllUsers()

@router.post("/user/login/")
async def login_user(user:UserLogin):
    return await loginUser(user)

@router.put("/user/{user_id}")
async def put_user(user_id: str, user_update_data: UserOut):
    return await updateUserFromUserOut(user_id, user_update_data)

@router.patch("/user/{user_id}/password")
async def patch_user_password(user_id: str, password_data: UserPasswordUpdate):
    return await updatePassword(user_id, password_data)

async def get_users_search(q: str = Query(..., min_length=1, description="Search query for first name or last name")):
    return await searchUsersByName(q)