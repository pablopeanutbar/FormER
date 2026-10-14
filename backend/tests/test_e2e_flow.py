"""End-to-End full platform validation test simulating the Chrome Extension and Web Dashboard."""

def test_full_former_e2e_lifecycle(client):
    # Step 1: User registers on formER web dashboard
    reg_res = client.post("/api/auth/register", json={
        "name": "Aarav V. Sharma",
        "email": "aarav.sharma@domain.co",
        "password": "SecurePassword2026!"
    })
    assert reg_res.status_code == 201
    auth_token = reg_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {auth_token}"}

    # Step 2: User populates their structured Profile Vault in the Web Dashboard
    update_res = client.put("/api/profile", headers=headers, json={
        "personal_data": {
            "full_name": "Aarav V. Sharma",
            "father_name": "Vikram S. Sharma",
            "mother_name": "Sunita Sharma",
            "dob": "1998-08-14",
            "gender": "Male",
            "nationality": "Indian",
            "category": "General",
            "id_number": "9812 4019 8122"
        },
        "contact_data": {
            "email": "aarav.sharma@domain.co",
            "phone": "+91 9876543210",
            "address_line1": "Flat 402, Green Avenue, Vasant Kunj",
            "city": "New Delhi",
            "state": "Delhi",
            "pincode": "110070"
        },
        "education_data": {
            "tenth": {
                "roll_number": "6192041",
                "board": "CBSE",
                "percentage": "94.2%",
                "passing_year": "2014"
            },
            "twelfth": {
                "roll_number": "1208941",
                "board": "CBSE",
                "stream": "Science PCM",
                "percentage": "91.8%",
                "passing_year": "2016"
            },
            "undergraduate": {
                "degree": "Bachelor of Technology (B.Tech)",
                "branch": "Computer Science & Engineering",
                "university": "Indian Institute of Technology Delhi",
                "cgpa": "8.85",
                "passing_year": "2020"
            }
        }
    })
    assert update_res.status_code == 200

    # Step 3: Chrome Extension detects a multi-step admission portal page
    page_eval = client.post("/api/ml/classify-page", json={
        "url": "https://admissions.centraluniv.ac.in/apply/step1",
        "input_count": 18,
        "headings": [
            "Central University Admissions 2026",
            "1. Personal Details",
            "2. Contact & Address Details",
            "3. Class 10th / Secondary Examination Details",
            "4. Class 12th / Intermediate Examination Details",
            "5. Qualifying Graduation Degree"
        ],
        "buttons": ["Submit Application", "Save and Continue"]
    })
    assert page_eval.status_code == 200
    assert page_eval.json()["is_form_page"] is True

    # Step 4: Chrome Extension content script extracts fields and asks ML service to match
    test_portal_fields = [
        {"id": "f1", "name": "candidate_full_name", "label": "Candidate Full Name", "section": "1. Personal Details"},
        {"id": "f2", "name": "father_name", "label": "Father's Name", "section": "1. Personal Details"},
        {"id": "f3", "name": "dob", "label": "Date of Birth", "section": "1. Personal Details"},
        {"id": "f4", "name": "email", "label": "Email Address", "section": "2. Contact & Address Details"},
        {"id": "f5", "name": "mobile_number", "label": "Mobile Number", "section": "2. Contact & Address Details"},
        {"id": "f6", "name": "pincode", "label": "PIN Code", "section": "2. Contact & Address Details"},
        {"id": "f7", "name": "matric_roll_no", "label": "10th Roll Number", "section": "3. Class 10th / Secondary Examination Details"},
        {"id": "f8", "name": "tenth_percentage", "label": "Percentage of Marks", "section": "3. Class 10th / Secondary Examination Details"},
        {"id": "f9", "name": "inter_roll_no", "label": "12th Roll Number", "section": "4. Class 12th / Intermediate Examination Details"},
        {"id": "f10", "name": "twelfth_percentage", "label": "Percentage of Marks", "section": "4. Class 12th / Intermediate Examination Details"},
        {"id": "f11", "name": "ug_cgpa", "label": "Overall CGPA / Marks %", "section": "5. Qualifying Graduation Degree"}
    ]

    match_res = client.post("/api/ml/match-fields", headers=headers, json={"fields": test_portal_fields})
    assert match_res.status_code == 200
    match_data = match_res.json()
    assert match_data["total_fields"] == 11
    assert match_data["high_confidence_count"] >= 9
    assert match_data["average_confidence"] >= 0.85

    matched_by_id = {m["field_id"]: m for m in match_data["matches"]}
    assert matched_by_id["f1"]["suggested_value"] == "Aarav V. Sharma"
    assert matched_by_id["f2"]["suggested_value"] == "Vikram S. Sharma"
    assert matched_by_id["f4"]["suggested_value"] == "aarav.sharma@domain.co"
    assert matched_by_id["f7"]["suggested_value"] == "6192041"
    assert matched_by_id["f8"]["suggested_value"] == "94.2%"
    assert matched_by_id["f9"]["suggested_value"] == "1208941"
    assert matched_by_id["f10"]["suggested_value"] == "91.8%"
    assert matched_by_id["f11"]["suggested_value"] == "8.85"

    # Step 5: User reviews and approves fill -> Extension records session in Audit Log
    history_res = client.post("/api/history", headers=headers, json={
        "portal_name": "Central University Admissions 2026",
        "portal_url": "https://admissions.centraluniv.ac.in/apply/step1",
        "fields_filled_count": 11,
        "accuracy_rate": "100%",
        "filled_fields": [
            {"field": "Candidate Full Name", "value": "Aarav V. Sharma", "confidence": "98%"},
            {"field": "10th Percentage", "value": "94.2%", "confidence": "100%"},
            {"field": "12th Percentage", "value": "91.8%", "confidence": "100%"}
        ]
    })
    assert history_res.status_code == 201

    # Step 6: User returns to Web Dashboard and inspects updated analytics & history
    stats_res = client.get("/api/stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["forms_filled"] == 1
    assert stats["total_fields_populated"] == 11

    history_list = client.get("/api/history", headers=headers)
    assert history_list.status_code == 200
    assert len(history_list.json()) == 1
    assert history_list.json()[0]["portal_name"] == "Central University Admissions 2026"
