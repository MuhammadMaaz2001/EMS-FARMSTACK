from datetime import datetime, timedelta

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from typing import List, Optional
from pydantic import BaseModel
from pymongo import MongoClient
from starlette.middleware.cors import CORSMiddleware

from auth.Auth import verify_token  # Import the verify_token function


app = FastAPI()

SECRET_KEY = "ahsanahmedkhan"  # Replace this with a strong secret key
ALGORITHM = "HS256"

# New Test Branch

# List of allowed origins. Replace with your frontend URL.
origins = [
    "http://localhost:3000",  # Replace with the URL of your frontend
    "https://your-frontend-url.com",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],     # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],     # Allow all headers
)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017")  # Use your MongoDB URI
db = client.Emsdata  # Replace with your database name
user_collection = db.employees  # Collection name for employees
user_login_collection = db.login

# Pydantic model for Employee
class Employees(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    responsibility: str
    additional_information: str

# Helper to convert MongoDB ObjectId to string
def employee_helper(employee) -> dict:
    return {
        "id": str(employee["_id"]),
        "name": employee["name"],
        "email": employee["email"],
        "responsibility": employee["responsibility"],
        "additional_information": employee["additional_information"]
    }

# Create employee endpoint
@app.post("/create_employee/")
async def create_employee(employee_data: Employees):
    # Check if employee already exists by email
    if user_collection.find_one({"email": employee_data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Insert new employee into the MongoDB collection
    result = user_collection.insert_one(employee_data.dict(exclude_unset=True))  # exclude_unset to avoid saving None values
    created_employee = user_collection.find_one({"_id": result.inserted_id})

    return {"status": "Employee created successfully", "employee": employee_helper(created_employee)}

# Read employee by email
@app.get("/read_all/")
async def read_all_employees():
    employees = user_collection.find()  # Fetch all employees
    employee_list = [employee_helper(employee) for employee in employees]  # Convert each to dict format

    if employee_list:
        return {"employee_data": employee_list}
    else:
        raise HTTPException(status_code=404, detail="No employees found")


# Update employee information
class UpdateEmployee(BaseModel):
    responsibility: Optional[str] = None
    additional_information: Optional[str] = None

@app.put("/update/{email}")
async def update_employee(email: str, update_data: UpdateEmployee):
    if user_collection.find_one({"email": email}):
        update_result = user_collection.update_one(
            {"email": email},
            {"$set": update_data.dict(exclude_unset=True)}
        )
        updated_employee = user_collection.find_one({"email": email})
        return {
            "message": "User Data Updated Successfully",
            "new_data": employee_helper(updated_employee)
        }
    else:
        raise HTTPException(status_code=404, detail="Employee not found")

# Delete employee by email
@app.delete("/delete/{email}")
async def delete_employee(email: str):
    if user_collection.find_one({"email": email}):
        delete_result = user_collection.delete_one({"email": email})
        return {"result": "Data deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Employee not found")


@app.post("/login")
async def login(email: str = Form(...), password: str = Form(...)):
    # Validate and fetch the user from your database
    user = user_login_collection.find_one({
        "email": email,
        "password": password
    })
    if user:
        token_data = {
            "sub": user["email"],
            "exp": datetime.utcnow() + timedelta(hours=1)  # Token expiry time (e.g., 1 hour)
        }
        token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/api/validate-token")
async def validate_token(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token, SECRET_KEY, ALGORITHM)  # Call the verify_token function
    return {"isValid": True}  # If no exception is raised, the token is valid


# Sample route protected by JWT token
@app.get("/secure-data")
async def get_secure_data(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token, SECRET_KEY, ALGORITHM)  # Token validation
    return {"message": "This is protected data!", "user_data": payload}
