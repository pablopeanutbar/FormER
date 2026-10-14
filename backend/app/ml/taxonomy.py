"""formER Field Taxonomy and Canonical Attribute Catalog"""

FIELD_TAXONOMY = {
    # ---- Personal Details ----
    "personal.full_name": {
        "title": "Candidate Full Name",
        "description": "Full legal name of the candidate or applicant",
        "synonyms": ["full name", "candidate name", "applicant name", "name of applicant", "name as per matriculation", "your name", "full_name", "candidate_name"],
        "regex": [r"full.*name", r"candidate.*name", r"applicant.*name", r"^name$"],
        "section": "personal"
    },
    "personal.first_name": {
        "title": "First Name",
        "description": "First or given name",
        "synonyms": ["first name", "given name", "fname", "forename"],
        "regex": [r"first.*name", r"^fname$"],
        "section": "personal"
    },
    "personal.last_name": {
        "title": "Last Name",
        "description": "Last name, family name or surname",
        "synonyms": ["last name", "surname", "family name", "lname"],
        "regex": [r"last.*name", r"surname", r"^lname$"],
        "section": "personal"
    },
    "personal.father_name": {
        "title": "Father's Name",
        "description": "Father's full name",
        "synonyms": ["father's name", "father name", "father/guardian name", "father / husband name", "father_name", "fathers_name"],
        "regex": [r"father.*name", r"guardian.*name"],
        "section": "personal"
    },
    "personal.mother_name": {
        "title": "Mother's Name",
        "description": "Mother's full name",
        "synonyms": ["mother's name", "mother name", "mother/guardian name", "mothers_name", "mother_name"],
        "regex": [r"mother.*name"],
        "section": "personal"
    },
    "personal.dob": {
        "title": "Date of Birth",
        "description": "Date of birth in DD/MM/YYYY or YYYY-MM-DD format",
        "synonyms": ["date of birth", "dob", "birth date", "d.o.b", "born on", "birthdate"],
        "regex": [r"date.*birth", r"^dob$", r"birth.*date"],
        "section": "personal"
    },
    "personal.gender": {
        "title": "Gender",
        "description": "Biological sex or gender identity",
        "synonyms": ["gender", "sex"],
        "regex": [r"^gender$", r"^sex$"],
        "section": "personal"
    },
    "personal.nationality": {
        "title": "Nationality",
        "description": "Country of citizenship",
        "synonyms": ["nationality", "citizenship", "country of citizenship"],
        "regex": [r"nationality", r"citizenship"],
        "section": "personal"
    },
    "personal.category": {
        "title": "Category / Caste",
        "description": "Social reservation category such as General, OBC, SC, ST, EWS",
        "synonyms": ["category", "social category", "reservation category", "caste", "community"],
        "regex": [r"social.*category", r"^category$", r"reservation"],
        "section": "personal"
    },
    "personal.id_number": {
        "title": "ID Proof / Aadhaar Number",
        "description": "National identity number, Aadhaar or Passport ID",
        "synonyms": ["aadhaar", "id number", "identity proof", "aadhaar number", "pan number", "national id"],
        "regex": [r"aadhaar", r"id.*number", r"pan.*number"],
        "section": "personal"
    },

    # ---- Contact Details ----
    "contact.email": {
        "title": "Email Address",
        "description": "Primary email contact address",
        "synonyms": ["email", "e-mail", "email address", "applicant email", "candidate email", "user_email"],
        "regex": [r"e-?mail.*address", r"^e-?mail$"],
        "section": "contact"
    },
    "contact.phone": {
        "title": "Mobile Number",
        "description": "Primary 10-digit mobile or telephone number",
        "synonyms": ["mobile", "mobile number", "phone", "phone number", "contact number", "cell", "telephone"],
        "regex": [r"mobile.*no", r"phone.*no", r"contact.*no", r"^mobile$", r"^phone$"],
        "section": "contact"
    },
    "contact.alternate_phone": {
        "title": "Alternate Phone Number",
        "description": "Secondary contact or emergency telephone number",
        "synonyms": ["alternate phone", "alt phone", "alternate mobile", "emergency contact"],
        "regex": [r"alt.*phone", r"alt.*mobile", r"emergency.*contact"],
        "section": "contact"
    },
    "contact.address_line1": {
        "title": "Address",
        "description": "Permanent or correspondence street address",
        "synonyms": ["address", "residential address", "communication address", "present address", "address line 1", "street address"],
        "regex": [r"address.*line.*1", r"^address$", r"residential.*address"],
        "section": "contact"
    },
    "contact.city": {
        "title": "City / District",
        "description": "City or municipal district",
        "synonyms": ["city", "town", "district", "city / district"],
        "regex": [r"^city$", r"^district$", r"^town$"],
        "section": "contact"
    },
    "contact.state": {
        "title": "State / Province",
        "description": "State, province, or union territory",
        "synonyms": ["state", "province", "state / ut", "domicile state"],
        "regex": [r"^state$", r"state.*ut"],
        "section": "contact"
    },
    "contact.pincode": {
        "title": "Postal PIN Code",
        "description": "Postal index number or ZIP code",
        "synonyms": ["pincode", "pin code", "zip", "zip code", "postal code"],
        "regex": [r"pin.*code", r"zip.*code", r"^pin$", r"^zip$"],
        "section": "contact"
    },

    # ---- 10th (Secondary) Education ----
    "education.tenth.roll_number": {
        "title": "Class 10th Roll Number",
        "description": "Matriculation or Secondary School Examination Roll Number",
        "synonyms": ["10th roll no", "10th roll number", "matric roll no", "class x roll", "ssc roll no", "10th hall ticket", "roll number", "roll no", "matric roll"],
        "regex": [r"10th.*roll", r"class.*x.*roll", r"matric.*roll", r"ssc.*roll"],
        "section": "tenth"
    },
    "education.tenth.board": {
        "title": "Class 10th Board",
        "description": "Education board for Class 10 (e.g., CBSE, ICSE, State Board)",
        "synonyms": ["10th board", "class 10 board", "class x board", "matric board", "ssc board", "board of 10th"],
        "regex": [r"10th.*board", r"class.*x.*board", r"matric.*board"],
        "section": "tenth"
    },
    "education.tenth.percentage": {
        "title": "Class 10th Percentage / Marks",
        "description": "Aggregate marks percentage in Class 10th",
        "synonyms": [
            "10th percentage", "10th %", "class 10 %", "class x percentage", "matric marks %", "10th marks %", "ssc percentage",
            "percentage of marks obtained", "percentage of marks", "marks obtained", "aggregate marks", "percentage", "aggregate %", "marks %"
        ],
        "regex": [r"10th.*(percent|%|marks)", r"class.*x.*(percent|%|marks)", r"matric.*(percent|%|marks)"],
        "section": "tenth"
    },
    "education.tenth.passing_year": {
        "title": "Class 10th Passing Year",
        "description": "Year of completing Class 10th",
        "synonyms": ["10th passing year", "year of passing 10th", "10th passing", "matric passing year", "year of passing class x"],
        "regex": [r"10th.*year", r"class.*x.*year", r"matric.*year"],
        "section": "tenth"
    },

    # ---- 12th (Higher Secondary) Education ----
    "education.twelfth.roll_number": {
        "title": "Class 12th Roll Number",
        "description": "Intermediate or Higher Secondary Examination Roll Number",
        "synonyms": ["12th roll no", "12th roll number", "class xii roll", "intermediate roll no", "hsc roll no", "12th hall ticket", "roll number", "roll no", "intermediate roll"],
        "regex": [r"12th.*roll", r"class.*xii.*roll", r"intermediate.*roll", r"hsc.*roll"],
        "section": "twelfth"
    },
    "education.twelfth.board": {
        "title": "Class 12th Board",
        "description": "Education board for Class 12 (e.g., CBSE, ISC, State Board)",
        "synonyms": ["12th board", "class 12 board", "class xii board", "intermediate board", "hsc board"],
        "regex": [r"12th.*board", r"class.*xii.*board", r"intermediate.*board"],
        "section": "twelfth"
    },
    "education.twelfth.stream": {
        "title": "Class 12th Stream",
        "description": "Stream of study (e.g., Science, Commerce, Arts)",
        "synonyms": ["12th stream", "stream", "discipline in 12th", "intermediate stream"],
        "regex": [r"12th.*stream", r"intermediate.*stream", r"^stream$"],
        "section": "twelfth"
    },
    "education.twelfth.percentage": {
        "title": "Class 12th Percentage / Marks",
        "description": "Aggregate marks percentage in Class 12th",
        "synonyms": [
            "12th percentage", "12th %", "class 12 %", "class xii percentage", "intermediate percentage", "hsc %", "12th marks %",
            "percentage of marks obtained", "percentage of marks", "marks obtained", "aggregate marks", "percentage", "aggregate %", "marks %"
        ],
        "regex": [r"12th.*(percent|%|marks)", r"class.*xii.*(percent|%|marks)", r"intermediate.*(percent|%|marks)"],
        "section": "twelfth"
    },
    "education.twelfth.passing_year": {
        "title": "Class 12th Passing Year",
        "description": "Year of completing Class 12th",
        "synonyms": ["12th passing year", "year of passing 12th", "12th passing", "intermediate passing year", "year of passing class xii"],
        "regex": [r"12th.*year", r"class.*xii.*year", r"intermediate.*year"],
        "section": "twelfth"
    },

    # ---- Undergraduate Degree ----
    "education.undergraduate.degree": {
        "title": "Graduation Degree Name",
        "description": "Qualifying undergraduate degree name (e.g., B.Tech, B.Sc, B.Com)",
        "synonyms": ["qualifying degree", "graduation degree", "ug degree", "degree name", "b.tech", "undergraduate degree"],
        "regex": [r"qualifying.*degree", r"graduation.*degree", r"^degree$"],
        "section": "undergraduate"
    },
    "education.undergraduate.branch": {
        "title": "Graduation Discipline / Branch",
        "description": "Major discipline or specialization (e.g., Computer Science, Electrical)",
        "synonyms": ["branch", "discipline", "specialization", "major", "stream / branch", "engineering branch"],
        "regex": [r"branch", r"discipline", r"specialization", r"^major$"],
        "section": "undergraduate"
    },
    "education.undergraduate.cgpa": {
        "title": "Graduation CGPA / Percentage",
        "description": "Cumulative Grade Point Average or percentage score",
        "synonyms": ["cgpa", "ug cgpa", "graduation cgpa", "c.g.p.a", "overall cgpa", "b.tech cgpa", "cumulative grade"],
        "regex": [r"c\.?g\.?p\.?a", r"graduation.*(marks|percent)", r"overall.*grade"],
        "section": "undergraduate"
    },
    "education.undergraduate.university": {
        "title": "University / Institution",
        "description": "Name of university or degree awarding institution",
        "synonyms": ["university", "institute", "college", "college name", "institution", "degree awarding institute"],
        "regex": [r"university", r"institution", r"college.*name"],
        "section": "undergraduate"
    },
    "education.undergraduate.passing_year": {
        "title": "Graduation Passing Year",
        "description": "Year of passing or expected graduation",
        "synonyms": ["graduation year", "passing year ug", "year of graduation", "year of completion"],
        "regex": [r"graduation.*year", r"passing.*year.*ug"],
        "section": "undergraduate"
    }
}
