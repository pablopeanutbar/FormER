from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, Profile
from ..schemas import ProfileUpdate, ProfileResponse
from ..auth import get_current_user

router = APIRouter(prefix="/profile", tags=["Profile Vault"])

def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    """Recursively flattens nested profile dictionaries for quick lookup by extension."""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        elif isinstance(v, list):
            for i, elem in enumerate(v):
                if isinstance(elem, dict):
                    items.extend(flatten_dict(elem, f"{new_key}[{i}]", sep=sep).items())
                else:
                    items.append((f"{new_key}[{i}]", elem))
        else:
            if v is not None and str(v).strip() != "":
                items.append((new_key, str(v)))
    return dict(items)

@router.get("", response_model=ProfileResponse)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(
            user_id=current_user.id,
            personal_data={"full_name": current_user.name},
            contact_data={"email": current_user.email},
            education_data={},
            work_data=[],
            documents_data={},
            preferences={}
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("", response_model=ProfileResponse)
def update_profile(
    profile_in: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found.")

    if profile_in.personal_data is not None:
        merged = dict(profile.personal_data or {})
        merged.update(profile_in.personal_data)
        profile.personal_data = merged

    if profile_in.contact_data is not None:
        merged = dict(profile.contact_data or {})
        merged.update(profile_in.contact_data)
        profile.contact_data = merged

    if profile_in.education_data is not None:
        merged = dict(profile.education_data or {})
        merged.update(profile_in.education_data)
        profile.education_data = merged

    if profile_in.work_data is not None:
        profile.work_data = profile_in.work_data

    if profile_in.documents_data is not None:
        merged = dict(profile.documents_data or {})
        merged.update(profile_in.documents_data)
        profile.documents_data = merged

    if profile_in.preferences is not None:
        merged = dict(profile.preferences or {})
        merged.update(profile_in.preferences)
        profile.preferences = merged

    db.commit()
    db.refresh(profile)
    return profile

@router.get("/flattened", response_model=dict[str, str])
def get_flattened_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Returns a flat key-value dictionary designed specifically for browser extension autofill."""
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        return {}

    full_payload = {
        "personal": profile.personal_data or {},
        "contact": profile.contact_data or {},
        "education": profile.education_data or {},
        "work": profile.work_data or [],
    }
    return flatten_dict(full_payload)

@router.get("/export")
def export_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {
        "user": {"name": current_user.name, "email": current_user.email},
        "personal": profile.personal_data,
        "contact": profile.contact_data,
        "education": profile.education_data,
        "work": profile.work_data,
        "preferences": profile.preferences,
        "exported_at": profile.updated_at.isoformat()
    }
