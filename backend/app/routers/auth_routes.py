from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, Profile
from ..schemas import UserRegister, UserLogin, UserResponse, Token
from ..auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing = db.query(User).filter(User.email == user_in.email.lower()).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists."
        )

    # Create new user
    new_user = User(
        email=user_in.email.lower(),
        name=user_in.name,
        hashed_password=hash_password(user_in.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Initialize default empty profile with user's name and email
    default_personal = {
        "full_name": new_user.name,
        "first_name": new_user.name.split()[0] if new_user.name else "",
        "last_name": new_user.name.split()[-1] if len(new_user.name.split()) > 1 else "",
        "nationality": "Indian",
        "category": "General",
        "gender": "",
        "dob": ""
    }
    default_contact = {
        "email": new_user.email,
        "phone": "",
        "country": "India"
    }

    new_profile = Profile(
        user_id=new_user.id,
        personal_data=default_personal,
        contact_data=default_contact,
        education_data={"tenth": {}, "twelfth": {}, "undergraduate": {}, "postgraduate": {}},
        work_data=[],
        documents_data={},
        preferences={"auto_suggest": True, "strict_review": True, "encryption": "AES-256"}
    )
    db.add(new_profile)
    db.commit()

    token = create_access_token({"sub": str(new_user.id), "email": new_user.email})
    return Token(access_token=token, user=UserResponse.model_validate(new_user))

@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email.lower()).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = create_access_token({"sub": str(user.id), "email": user.email})
    return Token(access_token=token, user=UserResponse.model_validate(user))

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)
