/**
 * formER Chrome Extension — Background Service Worker (Manifest V3)
 * Orchestrates ML field prediction, vault caching, and session auditing.
 */

const API_BASE = 'http://127.0.0.1:8000/api';

// Default canonical profile vault (used when user is offline or not yet logged in)
const DEFAULT_VAULT = {
  "personal.full_name": "Aarav V. Sharma",
  "personal.first_name": "Aarav",
  "personal.last_name": "Sharma",
  "personal.father_name": "Vikram S. Sharma",
  "personal.mother_name": "Sunita Sharma",
  "personal.dob": "1998-08-14",
  "personal.gender": "Male",
  "personal.nationality": "Indian",
  "personal.category": "General",
  "personal.id_number": "9812 4019 8122",
  
  "contact.email": "aarav.sharma@domain.co",
  "contact.phone": "+91 9876543210",
  "contact.alternate_phone": "+91 9811223344",
  "contact.address_line1": "Flat 402, Green Avenue, Vasant Kunj",
  "contact.city": "New Delhi",
  "contact.state": "Delhi",
  "contact.pincode": "110070",
  "contact.country": "India",

  "education.tenth.roll_number": "6192041",
  "education.tenth.board": "CBSE",
  "education.tenth.percentage": "94.2%",
  "education.tenth.passing_year": "2014",

  "education.twelfth.roll_number": "1208941",
  "education.twelfth.board": "CBSE",
  "education.twelfth.stream": "Science PCM",
  "education.twelfth.percentage": "91.8%",
  "education.twelfth.passing_year": "2016",

  "education.undergraduate.degree": "Bachelor of Technology (B.Tech)",
  "education.undergraduate.branch": "Computer Science & Engineering",
  "education.undergraduate.university": "Indian Institute of Technology Delhi",
  "education.undergraduate.cgpa": "8.85",
  "education.undergraduate.passing_year": "2020"
};

// Initialize extension storage on install
chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get(['former_vault', 'former_token']);
  if (!existing.former_vault) {
    await chrome.storage.local.set({ former_vault: DEFAULT_VAULT });
  }
  console.log('[formER] Extension background worker initialized.');
});

// Sync vault from remote API if auth token is present
async function fetchRemoteVault() {
  const { former_token } = await chrome.storage.local.get('former_token');
  if (!former_token) return DEFAULT_VAULT;

  try {
    const res = await fetch(`${API_BASE}/profile/flattened`, {
      headers: { 'Authorization': `Bearer ${former_token}` }
    });
    if (res.ok) {
      const data = await res.json();
      await chrome.storage.local.set({ former_vault: data });
      return data;
    }
  } catch (err) {
    console.warn('[formER] Remote sync failed, using cached vault:', err);
  }
  const { former_vault } = await chrome.storage.local.get('former_vault');
  return former_vault || DEFAULT_VAULT;
}

// Message Dispatcher
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, payload } = message;

  if (type === 'CLASSIFY_PAGE') {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/ml/classify-page`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const result = await res.json();
          sendResponse({ success: true, data: result });
          return;
        }
      } catch (err) {
        // Local heuristic fallback
        const isForm = (payload.input_count || 0) >= 3;
        sendResponse({
          success: true,
          data: { is_form_page: isForm, confidence: isForm ? 0.75 : 0.2, fallback: true }
        });
      }
    })();
    return true; // Keep channel open for async response
  }

  if (type === 'MATCH_FIELDS') {
    (async () => {
      try {
        const { former_vault } = await chrome.storage.local.get('former_vault');
        const vault = former_vault || DEFAULT_VAULT;

        const res = await fetch(`${API_BASE}/ml/match-fields`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: payload.fields, custom_vault: vault })
        });

        if (res.ok) {
          const result = await res.json();
          // Update extension badge with detected field count
          const count = result.total_fields || 0;
          if (sender.tab && sender.tab.id) {
            chrome.action.setBadgeText({ tabId: sender.tab.id, text: count > 0 ? String(count) : '' });
            chrome.action.setBadgeBackgroundColor({ tabId: sender.tab.id, color: '#0B6B59' });
          }
          sendResponse({ success: true, data: result });
          return;
        }
      } catch (err) {
        console.warn('[formER] ML service offline, using background fallback:', err);
        // Fallback local matching
        const { former_vault } = await chrome.storage.local.get('former_vault');
        const vault = former_vault || DEFAULT_VAULT;
        const matches = (payload.fields || []).map(f => {
          const label = (f.label || f.name || '').toLowerCase();
          let key = null;
          let val = '';
          let score = 0.5;

          if (label.includes('name') && !label.includes('father')) { key = 'personal.full_name'; val = vault[key]; score = 0.95; }
          else if (label.includes('father')) { key = 'personal.father_name'; val = vault[key]; score = 0.95; }
          else if (label.includes('email')) { key = 'contact.email'; val = vault[key]; score = 0.98; }
          else if (label.includes('phone') || label.includes('mobile')) { key = 'contact.phone'; val = vault[key]; score = 0.95; }
          else if (label.includes('10th') || label.includes('matric')) {
            if (label.includes('percent') || label.includes('marks')) { key = 'education.tenth.percentage'; val = vault[key]; score = 0.96; }
            else if (label.includes('roll')) { key = 'education.tenth.roll_number'; val = vault[key]; score = 0.96; }
          }
          else if (label.includes('12th') || label.includes('inter')) {
            if (label.includes('percent') || label.includes('marks')) { key = 'education.twelfth.percentage'; val = vault[key]; score = 0.96; }
            else if (label.includes('roll')) { key = 'education.twelfth.roll_number'; val = vault[key]; score = 0.96; }
          }

          return {
            field_id: f.id,
            field_name: f.name,
            matched_key: key,
            suggested_value: val || '',
            confidence_score: score,
            confidence_percent: `${Math.round(score * 100)}%`,
            badge_level: score >= 0.85 ? 'high' : 'medium'
          };
        });

        sendResponse({
          success: true,
          data: {
            total_fields: matches.length,
            high_confidence_count: matches.filter(m => m.badge_level === 'high').length,
            average_confidence: 0.92,
            matches
          }
        });
      }
    })();
    return true;
  }

  if (type === 'RECORD_HISTORY') {
    (async () => {
      try {
        const { former_token } = await chrome.storage.local.get('former_token');
        const headers = { 'Content-Type': 'application/json' };
        if (former_token) headers['Authorization'] = `Bearer ${former_token}`;

        await fetch(`${API_BASE}/history`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
        sendResponse({ success: true });
      } catch (e) {
        sendResponse({ success: false, error: e.message });
      }
    })();
    return true;
  }

  if (type === 'GET_VAULT') {
    (async () => {
      const { former_vault } = await chrome.storage.local.get('former_vault');
      sendResponse({ success: true, vault: former_vault || DEFAULT_VAULT });
    })();
    return true;
  }
});
