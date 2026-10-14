from typing import Optional
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, IssueReport
from ..schemas import IssueReportCreate, IssueReportResponse
from ..auth import get_current_user, get_optional_current_user

router = APIRouter(prefix="/issues", tags=["Support & Issues"])

@router.post("", response_model=IssueReportResponse, status_code=status.HTTP_201_CREATED)
def report_issue(
    issue_in: IssueReportCreate,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    issue = IssueReport(
        user_id=current_user.id if current_user else None,
        issue_type=issue_in.issue_type,
        portal_url=issue_in.portal_url,
        description=issue_in.description,
        diagnostic_data=issue_in.diagnostic_data or {}
    )
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue

@router.get("", response_model=list[IssueReportResponse])
def get_user_issues(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(IssueReport).filter(IssueReport.user_id == current_user.id).order_by(IssueReport.created_at.desc()).all()
