def test_page_classifier(client):
    # Non-form marketing page
    non_form_payload = {
        "url": "https://example.com/blog/article",
        "input_count": 0,
        "headings": ["Top 10 Tech Trends in 2026", "Recent Comments"],
        "buttons": ["Read More", "Subscribe"]
    }
    res1 = client.post("/api/ml/classify-page", json=non_form_payload)
    assert res1.status_code == 200
    assert res1.json()["is_form_page"] is False

    # Application form page
    form_payload = {
        "url": "https://university.ac.in/admission/apply-online",
        "input_count": 18,
        "headings": ["Undergraduate Admission Application 2026", "Personal Details", "Academic Qualifications"],
        "buttons": ["Save and Continue", "Proceed to Document Upload"]
    }
    res2 = client.post("/api/ml/classify-page", json=form_payload)
    assert res2.status_code == 200
    data2 = res2.json()
    assert data2["is_form_page"] is True
    assert data2["confidence"] >= 0.70

def test_field_matching_and_section_disambiguation(client):
    user_vault = {
        "personal.full_name": "Shariq Sharma",
        "personal.father_name": "Vikram Sharma",
        "personal.dob": "2000-08-14",
        "contact.email": "shariq@domain.co",
        "contact.phone": "+91 9876543210",
        "education.tenth.percentage": "94.2%",
        "education.tenth.roll_number": "6192041",
        "education.twelfth.percentage": "91.8%",
        "education.twelfth.roll_number": "1208941",
        "education.undergraduate.cgpa": "8.85"
    }

    fields = [
        {
            "id": "field_name",
            "name": "cand_name",
            "label": "Candidate Full Name",
            "placeholder": "Enter name as in 10th certificate",
            "section": "Personal Details"
        },
        {
            "id": "field_father",
            "name": "f_name",
            "label": "Father's Name",
            "placeholder": "Father/Guardian Name",
            "section": "Personal Details"
        },
        # Section disambiguation test 1: 10th percentage
        {
            "id": "tenth_pct",
            "name": "aggregate_marks",
            "label": "Percentage of Marks Obtained",
            "placeholder": "e.g. 94.2",
            "section": "Class 10th / Matriculation Details"
        },
        # Section disambiguation test 2: 12th percentage
        {
            "id": "twelfth_pct",
            "name": "aggregate_marks",
            "label": "Percentage of Marks Obtained",
            "placeholder": "e.g. 91.8",
            "section": "Class 12th / Intermediate Examination"
        }
    ]

    req_payload = {
        "fields": fields,
        "custom_vault": user_vault
    }

    res = client.post("/api/ml/match-fields", json=req_payload)
    assert res.status_code == 200
    data = res.json()
    assert data["total_fields"] == 4
    matches = {m["field_id"]: m for m in data["matches"]}

    # Candidate Name check
    assert matches["field_name"]["matched_key"] == "personal.full_name"
    assert matches["field_name"]["suggested_value"] == "Shariq Sharma"
    assert matches["field_name"]["confidence_score"] >= 0.85
    assert matches["field_name"]["badge_level"] == "high"

    # Father Name check
    assert matches["field_father"]["matched_key"] == "personal.father_name"
    assert matches["field_father"]["suggested_value"] == "Vikram Sharma"
    assert matches["field_father"]["confidence_score"] >= 0.85

    # 10th Percentage vs 12th Percentage section disambiguation check
    assert matches["tenth_pct"]["matched_key"] == "education.tenth.percentage"
    assert matches["tenth_pct"]["suggested_value"] == "94.2%"

    assert matches["twelfth_pct"]["matched_key"] == "education.twelfth.percentage"
    assert matches["twelfth_pct"]["suggested_value"] == "91.8%"
