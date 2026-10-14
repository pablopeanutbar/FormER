from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, FormHistory
from ..schemas import FormHistoryCreate, FormHistoryResponse
from ..auth import get_current_user

router = APIRouter(prefix="/history", tags=["Form History"])

@router.get("", response_model=list[FormHistoryResponse])
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(FormHistory).filter(FormHistory.user_id == current_user.id).order_by(FormHistory.created_at.desc()).all()

@router.post("", response_model=FormHistoryResponse, status_code=status.HTTP_201_CREATED)
def record_history(
    entry: FormHistoryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    history_record = FormHistory(
        user_id=current_user.id,
        portal_name=entry.portal_name,
        portal_url=entry.portal_url,
        fields_filled_count=entry.fields_filled_count,
        accuracy_rate=entry.accuracy_rate,
        filled_fields=entry.filled_fields
    )
    db.add(history_record)
    db.commit()
    db.refresh(history_record)
    return history_record

@router.delete("/purge", status_code=status.HTTP_200_OK)
def purge_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.query(FormHistory).filter(FormHistory.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Field cache and audit history purged successfully"}
