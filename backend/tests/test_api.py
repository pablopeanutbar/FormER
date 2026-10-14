def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "formER" in data["service"]

def test_register_and_login(client):
    # 1. Register a new user
    reg_payload = {
        "email": "testuser@example.com",
        "name": "Adarsh Sharma",
        "password": "Password123!"
    }
    reg_res = client.post("/api/auth/register", json=reg_payload)
    assert reg_res.status_code == 201
    reg_data = reg_res.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["email"] == "testuser@example.com"
    token = reg_data["access_token"]

    # 2. Duplicate registration should be rejected
    dup_res = client.post("/api/auth/register", json=reg_payload)
    assert dup_res.status_code == 400

    # 3. Login with correct credentials
    login_payload = {
        "email": "testuser@example.com",
        "password": "Password123!"
    }
    login_res = client.post("/api/auth/login", json=login_payload)
    assert login_res.status_code == 200
    assert "access_token" in login_res.json()

    # 4. Login with invalid password
    bad_login = client.post("/api/auth/login", json={"email": "testuser@example.com", "password": "wrong"})
    assert bad_login.status_code == 401

    # 5. Access /me endpoint
    headers = {"Authorization": f"Bearer {token}"}
    me_res = client.get("/api/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["name"] == "Adarsh Sharma"

def test_profile_lifecycle(client):
    # Register user
    reg = client.post("/api/auth/register", json={
        "email": "vaultuser@example.com",
        "name": "Priya Patel",
        "password": "SecurePassword99"
    })
    token = reg.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Read default initialized profile
    prof_res = client.get("/api/profile", headers=headers)
    assert prof_res.status_code == 200
    prof_data = prof_res.json()
    assert prof_data["personal_data"]["full_name"] == "Priya Patel"
    assert prof_data["contact_data"]["email"] == "vaultuser@example.com"

    # 2. Update profile with detailed information
    update_payload = {
        "personal_data": {
            "father_name": "Rajesh Patel",
            "dob": "2002-05-14",
            "gender": "Female",
            "nationality": "Indian"
        },
        "education_data": {
            "tenth": {
                "board": "CBSE",
                "percentage": "94.2%",
                "passing_year": "2018"
            },
            "twelfth": {
                "board": "CBSE",
                "stream": "Science PCM",
                "percentage": "91.8%",
                "passing_year": "2020"
            }
        },
        "contact_data": {
            "phone": "+91 9876543210",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400001"
        }
    }
    put_res = client.put("/api/profile", json=update_payload, headers=headers)
    assert put_res.status_code == 200
    updated = put_res.json()
    assert updated["personal_data"]["father_name"] == "Rajesh Patel"
    assert updated["education_data"]["tenth"]["percentage"] == "94.2%"
    assert updated["contact_data"]["phone"] == "+91 9876543210"

    # 3. Check flattened profile for Chrome Extension lookup
    flat_res = client.get("/api/profile/flattened", headers=headers)
    assert flat_res.status_code == 200
    flat_map = flat_res.json()
    assert flat_map["personal.father_name"] == "Rajesh Patel"
    assert flat_map["education.tenth.percentage"] == "94.2%"
    assert flat_map["contact.pincode"] == "400001"

def test_history_and_stats(client):
    reg = client.post("/api/auth/register", json={
        "email": "historyuser@example.com",
        "name": "Vikram Singh",
        "password": "Password123"
    })
    token = reg.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Record 2 autofill sessions
    client.post("/api/history", headers=headers, json={
        "portal_name": "GATE 2026 Registration",
        "portal_url": "https://gate2026.iit.ac.in/apply",
        "fields_filled_count": 28,
        "accuracy_rate": "100%",
        "filled_fields": [{"field": "Full Name", "value": "Vikram Singh"}]
    })

    client.post("/api/history", headers=headers, json={
        "portal_name": "UPSC Civil Services",
        "portal_url": "https://upsconline.nic.in/apply",
        "fields_filled_count": 42,
        "accuracy_rate": "98%",
        "filled_fields": [{"field": "Father Name", "value": "Suresh Singh"}]
    })

    # Fetch history list
    hist_res = client.get("/api/history", headers=headers)
    assert hist_res.status_code == 200
    items = hist_res.json()
    assert len(items) == 2
    assert items[0]["portal_name"] == "UPSC Civil Services"

    # Fetch stats
    stats_res = client.get("/api/stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["forms_filled"] == 2
    assert stats["total_fields_populated"] == 70
    assert stats["sessions_recorded"] == 2
