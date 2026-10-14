from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, EmailStr, Field, ConfigDict

# ---- Auth Schemas ----
class UserRegister(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=100)
    password: str = Field(..., min_length=6, max_length=128)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: EmailStr
    name: str
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ---- Profile Schemas ----
class PersonalData(BaseModel):
    full_name: Optional[str] = ""
    first_name: Optional[str] = ""
    last_name: Optional[str] = ""
    father_name: Optional[str] = ""
    mother_name: Optional[str] = ""
    dob: Optional[str] = ""  # YYYY-MM-DD
    gender: Optional[str] = ""
    nationality: Optional[str] = "Indian"
    category: Optional[str] = "General"  # General, OBC, SC, ST, EWS
    blood_group: Optional[str] = ""
    marital_status: Optional[str] = "Single"
    id_number: Optional[str] = ""

class ContactData(BaseModel):
    email: Optional[str] = ""
    phone: Optional[str] = ""
    alternate_phone: Optional[str] = ""
    address_line1: Optional[str] = ""
    address_line2: Optional[str] = ""
    city: Optional[str] = ""
    state: Optional[str] = ""
    pincode: Optional[str] = ""
    country: Optional[str] = "India"
    permanent_same_as_current: Optional[bool] = True
    permanent_address_line1: Optional[str] = ""
    permanent_city: Optional[str] = ""
    permanent_state: Optional[str] = ""
    permanent_pincode: Optional[str] = ""
    permanent_country: Optional[str] = "India"

class TenthEducation(BaseModel):
    board: Optional[str] = ""
    school_name: Optional[str] = ""
    passing_year: Optional[str] = ""
    roll_number: Optional[str] = ""
    marks_obtained: Optional[str] = ""
    max_marks: Optional[str] = ""
    percentage: Optional[str] = ""
    cgpa: Optional[str] = ""

class TwelfthEducation(BaseModel):
    board: Optional[str] = ""
    school_name: Optional[str] = ""
    passing_year: Optional[str] = ""
    roll_number: Optional[str] = ""
    stream: Optional[str] = ""
    marks_obtained: Optional[str] = ""
    max_marks: Optional[str] = ""
    percentage: Optional[str] = ""

class HigherEducation(BaseModel):
    degree: Optional[str] = ""
    institution: Optional[str] = ""
    university: Optional[str] = ""
    branch: Optional[str] = ""
    passing_year: Optional[str] = ""
    cgpa: Optional[str] = ""
    percentage: Optional[str] = ""

class EducationData(BaseModel):
    tenth: Optional[TenthEducation] = Field(default_factory=TenthEducation)
    twelfth: Optional[TwelfthEducation] = Field(default_factory=TwelfthEducation)
    undergraduate: Optional[HigherEducation] = Field(default_factory=HigherEducation)
    postgraduate: Optional[HigherEducation] = Field(default_factory=HigherEducation)

class ProfileUpdate(BaseModel):
    personal_data: Optional[dict[str, Any]] = None
    contact_data: Optional[dict[str, Any]] = None
    education_data: Optional[dict[str, Any]] = None
    work_data: Optional[list[dict[str, Any]]] = None
    documents_data: Optional[dict[str, Any]] = None
    preferences: Optional[dict[str, Any]] = None

class ProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    personal_data: dict[str, Any]
    contact_data: dict[str, Any]
    education_data: dict[str, Any]
    work_data: list[dict[str, Any]]
    documents_data: dict[str, Any]
    preferences: dict[str, Any]
    updated_at: datetime


# ---- Form History Schemas ----
class FormHistoryCreate(BaseModel):
    portal_name: str
    portal_url: str
    fields_filled_count: int = 0
    accuracy_rate: str = "100%"
    filled_fields: list[dict[str, Any]] = []

class FormHistoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    user_id: int
    portal_name: str
    portal_url: str
    fields_filled_count: int
    accuracy_rate: str
    filled_fields: list[dict[str, Any]]
    created_at: datetime


# ---- Issue Report Schemas ----
class IssueReportCreate(BaseModel):
    issue_type: str
    portal_url: Optional[str] = ""
    description: str
    diagnostic_data: Optional[dict[str, Any]] = {}

class IssueReportResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    issue_type: str
    portal_url: Optional[str]
    description: str
    created_at: datetime


# ---- Stats Schema ----
class UserStatsResponse(BaseModel):
    forms_filled: int
    time_saved: str
    accuracy_rate: str
    total_fields_populated: int
    sessions_recorded: int
