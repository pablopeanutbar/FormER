from typing import Any, Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, Profile
from ..auth import get_optional_current_user
from ..ml.matcher import semantic_matcher
from .profile_routes import flatten_dict

router = APIRouter(prefix="/ml", tags=["Machine Learning & Form Detection"])

class PageClassificationRequest(BaseModel):
    url: Optional[str] = ""
    input_count: int = 0
    headings: list[str] = []
    buttons: list[str] = []

class FieldContext(BaseModel):
    id: str
    name: Optional[str] = ""
    type: Optional[str] = "text"
    label: Optional[str] = ""
    placeholder: Optional[str] = ""
    aria_label: Optional[str] = ""
    section: Optional[str] = ""

class MatchFieldsRequest(BaseModel):
    fields: list[FieldContext]
    custom_vault: Optional[dict[str, str]] = None

@router.post("/classify-page")
def classify_form_page(req: PageClassificationRequest):
    """
    Tier 1 Form Page Detector: Evaluates page elements and returns whether the page is a form.
    """
    return semantic_matcher.classify_page(req.model_dump())

@router.post("/match-fields")
def match_form_fields(
    req: MatchFieldsRequest,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """
    Tier 3 Field Matcher & Scorer: Maps extracted DOM form fields against user profile data,
    computes confidence score (0.0 to 1.0), and provides badge levels (high, medium, low).
    """
    vault = req.custom_vault or {}
    if not vault and current_user:
        profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
        if profile:
            payload = {
                "personal": profile.personal_data or {},
                "contact": profile.contact_data or {},
                "education": profile.education_data or {},
                "work": profile.work_data or []
            }
            vault = flatten_dict(payload)

    fields_dict = [f.model_dump() for f in req.fields]
    results = semantic_matcher.match_batch(fields_dict, vault)

    # Compute aggregate match statistics
    total_fields = len(results)
    high_conf_count = sum(1 for r in results if r["badge_level"] == "high")
    med_conf_count = sum(1 for r in results if r["badge_level"] == "medium")
    avg_score = sum(r["confidence_score"] for r in results) / total_fields if total_fields > 0 else 0.0

    return {
        "total_fields": total_fields,
        "high_confidence_count": high_conf_count,
        "medium_confidence_count": med_conf_count,
        "average_confidence": round(avg_score, 2),
        "matches": results
    }
