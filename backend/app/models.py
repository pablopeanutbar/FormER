from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

def utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    history = relationship("FormHistory", back_populates="user", cascade="all, delete-orphan", order_by="desc(FormHistory.created_at)")
    issues = relationship("IssueReport", back_populates="user", cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Hierarchical structured profile sections stored as JSON
    personal_data = Column(JSON, default=dict)
    contact_data = Column(JSON, default=dict)
    education_data = Column(JSON, default=dict)
    work_data = Column(JSON, default=list)
    documents_data = Column(JSON, default=dict)
    preferences = Column(JSON, default=dict)
    
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    user = relationship("User", back_populates="profile")


class FormHistory(Base):
    __tablename__ = "form_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    portal_name = Column(String(255), nullable=False)
    portal_url = Column(String(1024), nullable=False)
    fields_filled_count = Column(Integer, default=0)
    accuracy_rate = Column(String(50), default="100%")
    filled_fields = Column(JSON, default=list)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="history")


class IssueReport(Base):
    __tablename__ = "issue_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    issue_type = Column(String(100), nullable=False)
    portal_url = Column(String(1024), nullable=True)
    description = Column(Text, nullable=False)
    diagnostic_data = Column(JSON, default=dict)
    created_at = Column(DateTime, default=utc_now)

    user = relationship("User", back_populates="issues")
