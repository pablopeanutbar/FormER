import re
from typing import Any, Optional
from .taxonomy import FIELD_TAXONOMY

def clean_text(text: Optional[str]) -> str:
    if not text:
        return ""
    # Convert camelCase to space separated
    s = re.sub(r'([a-z])([A-Z])', r'\1 \2', str(text))
    # Replace underscores and hyphens with spaces
    s = re.sub(r'[_\\-]', ' ', s)
    # Lowercase and clean multiple whitespace
    return re.sub(r'\s+', ' ', s.lower()).strip()

def tokenize(text: str) -> set[str]:
    cleaned = clean_text(text)
    # Remove common stop words
    stop_words = {"the", "a", "an", "of", "in", "to", "for", "and", "or", "enter", "your", "please", "select"}
    tokens = {t for t in re.findall(r'[a-z0-9]+', cleaned) if t not in stop_words}
    return tokens

def jaccard_similarity(tokens_a: set[str], tokens_b: set[str]) -> float:
    if not tokens_a or not tokens_b:
        return 0.0
    intersection = len(tokens_a.intersection(tokens_b))
    union = len(tokens_a.union(tokens_b))
    return intersection / union if union > 0 else 0.0

def ngram_overlap(s1: str, s2: str, n: int = 3) -> float:
    if len(s1) < n or len(s2) < n:
        return 1.0 if s1 == s2 and s1 != "" else 0.0
    ngrams1 = {s1[i:i+n] for i in range(len(s1) - n + 1)}
    ngrams2 = {s2[i:i+n] for i in range(len(s2) - n + 1)}
    intersection = len(ngrams1.intersection(ngrams2))
    union = len(ngrams1.union(ngrams2))
    return intersection / union if union > 0 else 0.0

class SemanticMatcher:
    def __init__(self):
        self.taxonomy = FIELD_TAXONOMY

    def classify_page(self, page_meta: dict[str, Any]) -> dict[str, Any]:
        """
        Tier 1 Classifier: Evaluates DOM elements, actionable submit controls, and text cues
        to determine if the active tab is an actionable application form page.
        """
        input_count = page_meta.get("input_count", 0)
        button_texts = [clean_text(b) for b in page_meta.get("buttons", [])]
        headings = [clean_text(h) for h in page_meta.get("headings", [])]
        url = clean_text(page_meta.get("url", ""))

        form_cues = [
            "apply", "admission", "register", "registration", "candidate", "applicant",
            "personal details", "qualifications", "education", "examination", "portal",
            "matriculation", "post graduate", "ug", "pg", "recruitment", "job application"
        ]
        submit_cues = ["submit", "save and continue", "next", "proceed", "save & next", "register now", "pay & submit"]

        cue_matches = 0
        all_text = " ".join(headings + button_texts + [url])
        for cue in form_cues:
            if cue in all_text:
                cue_matches += 1

        has_submit_btn = any(any(sc in btn for sc in submit_cues) for btn in button_texts)
        
        # Scoring heuristic
        score = 0.0
        if input_count >= 3:
            score += min(input_count * 0.04, 0.40)
        if cue_matches > 0:
            score += min(cue_matches * 0.12, 0.36)
        if has_submit_btn:
            score += 0.24

        score = min(score, 1.0)
        is_form = score >= 0.50 and input_count >= 2

        return {
            "is_form_page": is_form,
            "confidence": round(score, 3),
            "input_count": input_count,
            "cue_matches": cue_matches,
            "has_submit_action": has_submit_btn
        }

    def match_single_field(self, field_ctx: dict[str, Any], user_vault: dict[str, str]) -> dict[str, Any]:
        """
        Tier 3 Matching & Scoring: Maps a single DOM field context vector
        to canonical attributes and scores confidence.
        """
        field_id = field_ctx.get("id", "")
        name = clean_text(field_ctx.get("name", ""))
        label = clean_text(field_ctx.get("label", ""))
        placeholder = clean_text(field_ctx.get("placeholder", ""))
        aria_label = clean_text(field_ctx.get("aria_label", ""))
        section_hint = clean_text(field_ctx.get("section", ""))
        field_type = field_ctx.get("type", "text")

        # Synthesize context string and tokens
        combined_context = f"{label} {name} {placeholder} {aria_label} {section_hint}".strip()
        field_tokens = tokenize(combined_context)

        best_key = None
        best_score = 0.0
        match_reason = "No match"

        # Check section affinity for disambiguation
        is_tenth_section = any(t in section_hint for t in ["10th", "matric", "class x", "secondary", "ssc"])
        is_twelfth_section = any(t in section_hint for t in ["12th", "intermediate", "class xii", "higher secondary", "hsc"])
        is_ug_section = any(t in section_hint for t in ["graduation", "ug", "b.tech", "degree", "undergraduate", "bachelor"])

        for canonical_key, meta in self.taxonomy.items():
            current_score = 0.0
            current_reason = ""

            # Check 1: Regex matches on label or name
            for pattern in meta["regex"]:
                if re.search(pattern, label, re.IGNORECASE) or re.search(pattern, name, re.IGNORECASE):
                    current_score = 0.96
                    current_reason = "Regex pattern match"
                    break

            # Check 2: Exact and Substring synonym match
            if current_score < 0.90:
                for syn in meta["synonyms"]:
                    clean_syn = clean_text(syn)
                    if clean_syn == label or clean_syn == name or clean_syn == placeholder:
                        current_score = 0.93
                        current_reason = f"Exact synonym match ('{syn}')"
                        break
                    elif clean_syn in label or (len(clean_syn) > 3 and clean_syn in name):
                        sim = 0.88
                        if sim > current_score:
                            current_score = sim
                            current_reason = f"Partial synonym match ('{syn}')"

            # Check 3: Jaccard and n-gram overlap on tokens
            if current_score < 0.80:
                syn_tokens = set()
                for syn in meta["synonyms"]:
                    syn_tokens.update(tokenize(syn))
                syn_tokens.update(tokenize(meta["title"]))

                jaccard = jaccard_similarity(field_tokens, syn_tokens)
                ngram = max([ngram_overlap(label, clean_text(s)) for s in meta["synonyms"]] + [0.0])
                token_sim = (jaccard * 0.6) + (ngram * 0.4)

                if token_sim > 0.45:
                    current_score = max(current_score, min(token_sim * 0.95, 0.88))
                    current_reason = f"Semantic token similarity ({round(token_sim, 2)})"

            # Check 4: Section-Aware Disambiguation weighting
            key_section = meta.get("section")
            if key_section == "tenth":
                if is_tenth_section:
                    current_score = min(current_score + 0.15, 1.0)
                elif is_twelfth_section or is_ug_section:
                    current_score *= 0.30  # Demote wrong section
            elif key_section == "twelfth":
                if is_twelfth_section:
                    current_score = min(current_score + 0.15, 1.0)
                elif is_tenth_section or is_ug_section:
                    current_score *= 0.30
            elif key_section == "undergraduate":
                if is_ug_section:
                    current_score = min(current_score + 0.15, 1.0)
                elif is_tenth_section or is_twelfth_section:
                    current_score *= 0.30

            if current_score > best_score:
                best_score = current_score
                best_key = canonical_key
                match_reason = current_reason

        # Resolve value from user's vault
        suggested_value = ""
        if best_key and best_score >= 0.50:
            suggested_value = user_vault.get(best_key, "")

        # Assign confidence tier
        badge_level = "low"
        if best_score >= 0.85:
            badge_level = "high"
        elif best_score >= 0.60:
            badge_level = "medium"

        return {
            "field_id": field_id,
            "field_name": name,
            "matched_key": best_key,
            "matched_title": self.taxonomy.get(best_key, {}).get("title") if best_key else None,
            "suggested_value": suggested_value,
            "confidence_score": round(best_score, 2),
            "confidence_percent": f"{int(best_score * 100)}%",
            "badge_level": badge_level,
            "reason": match_reason
        }

    def match_batch(self, fields: list[dict[str, Any]], user_vault: dict[str, str]) -> list[dict[str, Any]]:
        return [self.match_single_field(f, user_vault) for f in fields]

semantic_matcher = SemanticMatcher()
