from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import User, FormHistory
from ..schemas import UserStatsResponse
from ..auth import get_current_user

router = APIRouter(prefix="/stats", tags=["Dashboard Analytics"])

@router.get("", response_model=UserStatsResponse)
def get_user_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    history_records = db.query(FormHistory).filter(FormHistory.user_id == current_user.id).all()
    
    total_sessions = len(history_records)
    total_fields = sum(h.fields_filled_count or 0 for h in history_records)
    
    # Estimate time saved: average 20 mins per complex application form
    hours_saved = round((total_sessions * 20) / 60, 1)
    time_saved_str = f"{hours_saved}h" if hours_saved >= 1.0 else f"{int(total_sessions * 20)}m"
    if total_sessions == 0:
        time_saved_str = "0h"

    # Accuracy rate calculation
    accuracy = "100%"
    if total_sessions > 0:
        rates = []
        for h in history_records:
            try:
                rates.append(float(h.accuracy_rate.replace('%', '')))
            except (ValueError, AttributeError):
                rates.append(100.0)
        if rates:
            avg_acc = sum(rates) / len(rates)
            accuracy = f"{avg_acc:.1f}%"

    return UserStatsResponse(
        forms_filled=total_sessions,
        time_saved=time_saved_str,
        accuracy_rate=accuracy,
        total_fields_populated=total_fields,
        sessions_recorded=total_sessions
    )
