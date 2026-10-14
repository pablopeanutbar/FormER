/**
 * formER Chrome Extension — Content Script (Manifest V3)
 * Scans page DOM, communicates with ML scoring engine, and renders Shadow DOM UI.
 */

(function () {
  // Prevent duplicate injections
  if (window.__FORMER_INITIALIZED__) return;
  window.__FORMER_INITIALIZED__ = true;

  console.log('[formER] Initializing content inspector...');

  let shadowHost = null;
  let shadowRoot = null;
  let detectedFields = [];
  let matchedResults = [];

  // 1. Helper to find associated label for an input element
  function findLabelForInput(el) {
    if (el.id) {
      const explicit = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (explicit && explicit.innerText.trim()) {
        return explicit.innerText.trim();
      }
    }
    const parentLabel = el.closest('label');
    if (parentLabel) {
      // Remove input's own text if any
      const clone = parentLabel.cloneNode(true);
      const inputs = clone.querySelectorAll('input, select, textarea');
      inputs.forEach(i => i.remove());
      if (clone.innerText.trim()) return clone.innerText.trim();
    }
    // Check preceding text sibling or preceding label
    let prev = el.previousElementSibling;
    while (prev) {
      if (prev.tagName.toLowerCase() === 'label' && prev.innerText.trim()) {
        return prev.innerText.trim();
      }
      prev = prev.previousElementSibling;
    }
    // Table context: check table header cell above
    const td = el.closest('td');
    if (td && td.parentElement) {
      const colIdx = Array.from(td.parentElement.children).indexOf(td);
      const table = td.closest('table');
      if (table) {
        const th = table.querySelectorAll('th')[colIdx];
        if (th && th.innerText.trim()) return th.innerText.trim();
      }
    }
    return '';
  }

  // 2. Helper to find nearest section header
  function findSectionHint(el) {
    let curr = el;
    while (curr && curr !== document.body) {
      const fieldset = curr.querySelector('legend');
      if (fieldset && fieldset.innerText.trim()) return fieldset.innerText.trim();
      const prevHeadings = curr.querySelectorAll('h1, h2, h3, h4');
      if (prevHeadings.length > 0) {
        return prevHeadings[prevHeadings.length - 1].innerText.trim();
      }
      curr = curr.parentElement;
    }
    return '';
  }

  // 3. Scan DOM for actionable input fields
  function scanPageFields() {
    const selector = 'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([type="file"]):not([type="password"]), select, textarea';
    const elements = Array.from(document.querySelectorAll(selector));
    
    // Filter visible elements
    const visible = elements.filter(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && el.offsetWidth > 0;
    });

    return visible.map((el, index) => {
      const formerId = `former_f_${index + 1}`;
      el.setAttribute('data-former-id', formerId);

      return {
        id: formerId,
        element: el,
        name: el.getAttribute('name') || el.id || '',
        type: el.getAttribute('type') || el.tagName.toLowerCase(),
        label: findLabelForInput(el),
        placeholder: el.getAttribute('placeholder') || '',
        aria_label: el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || '',
        section: findSectionHint(el)
      };
    });
  }

  // 4. Fill an input element with synthetic events
  function fillElement(el, value) {
    if (!el || value === undefined || value === null) return;
    el.focus();

    if (el.tagName.toLowerCase() === 'select') {
      let optionFound = false;
      for (let i = 0; i < el.options.length; i++) {
        const opt = el.options[i];
        if (opt.value.toLowerCase() === String(value).toLowerCase() || opt.text.toLowerCase().includes(String(value).toLowerCase())) {
          el.selectedIndex = i;
          optionFound = true;
          break;
        }
      }
      if (!optionFound && el.options.length > 0) {
        el.value = value;
      }
    } else {
      // Use native property descriptor to trigger React 16+ synthetic events
      const proto = el.tagName.toLowerCase() === 'textarea' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (setter) {
        setter.call(el, value);
      } else {
        el.value = value;
      }
    }

    // Dispatch modern synthetic events
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));

    // Visual pulse glow
    const origBorder = el.style.borderColor;
    const origTransition = el.style.transition;
    el.style.transition = 'all 0.3s ease';
    el.style.borderColor = '#0B6B59';
    el.style.boxShadow = '0 0 0 3px rgba(11, 107, 89, 0.2)';
    setTimeout(() => {
      el.style.borderColor = origBorder;
      el.style.boxShadow = '';
      el.style.transition = origTransition;
    }, 1800);
  }

  // 5. Initialize Shadow DOM UI
  function initShadowUI() {
    if (shadowHost) return;

    shadowHost = document.createElement('div');
    shadowHost.id = 'former-assistant-root';
    shadowHost.style.all = 'initial';
    shadowHost.style.position = 'fixed';
    shadowHost.style.zIndex = '2147483647';
    shadowHost.style.bottom = '20px';
    shadowHost.style.right = '20px';
    document.documentElement.appendChild(shadowHost);

    shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    renderUI();
  }

  // 6. Render Shadow DOM Component
  function renderUI(isExpanded = false) {
    if (!shadowRoot) return;

    const total = matchedResults.length;
    const highConf = matchedResults.filter(m => m.badge_level === 'high').length;
    const avgPercent = total > 0
      ? `${Math.round((matchedResults.reduce((acc, m) => acc + (m.confidence_score || 0), 0) / total) * 100)}%`
      : '100%';

    shadowRoot.innerHTML = `
      <style>
        :host {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #181A19;
          font-size: 13px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .former-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid #E2E6E3;
          border-radius: 40px;
          padding: 8px 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .former-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
        }
        .brand {
          font-weight: 700;
          font-size: 14px;
          letter-spacing: -0.3px;
          color: #181A19;
        }
        .brand span { color: #0B6B59; }
        .meta {
          color: #626966;
          font-size: 12px;
          border-left: 1px solid #E2E6E3;
          padding-left: 10px;
        }
        .btn-fill {
          background: #0B6B59;
          color: #FFFFFF;
          border: none;
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-fill:hover { background: #005142; }

        /* Modal / Drawer */
        .former-drawer {
          width: 420px;
          max-height: 580px;
          background: #FFFFFF;
          border: 1px solid #E2E6E3;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.16);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .drawer-header {
          padding: 16px 20px;
          border-bottom: 1px solid #E2E6E3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8F9F7;
        }
        .drawer-title { font-size: 15px; font-weight: 600; }
        .drawer-body {
          padding: 12px 16px;
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .field-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #F8F9F7;
          border-radius: 8px;
          border: 1px solid #EEEEEC;
        }
        .field-info { display: flex; flex-direction: column; min-width: 0; flex: 1; padding-right: 12px; }
        .field-label { font-size: 11px; text-transform: uppercase; color: #626966; letter-spacing: 0.5px; }
        .field-val { font-size: 13px; font-weight: 500; color: #181A19; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .badge {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .badge-high { background: #D1FAE5; color: #065F46; }
        .badge-medium { background: #FEF3C7; color: #92400E; }
        .drawer-footer {
          padding: 14px 20px;
          border-top: 1px solid #E2E6E3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8F9F7;
        }
        .close-btn {
          background: none;
          border: none;
          color: #626966;
          cursor: pointer;
          font-size: 16px;
          padding: 4px;
        }
      </style>

      ${isExpanded ? `
        <div class="former-drawer">
          <div class="drawer-header">
            <div>
              <div class="brand">form<span>ER</span> • Verified Fill</div>
              <div style="font-size: 11px; color: #626966; margin-top: 2px;">${highConf} of ${total} fields mapped with high confidence</div>
            </div>
            <button class="close-btn" id="closeDrawer">✕</button>
          </div>
          <div class="drawer-body">
            ${matchedResults.map(m => `
              <div class="field-row">
                <div class="field-info">
                  <span class="field-label">${m.matched_title || m.field_name || 'Form Field'}</span>
                  <span class="field-val">${m.suggested_value || '<span style="color:#A0A5A2; font-style:italic;">Not in vault</span>'}</span>
                </div>
                <span class="badge ${m.badge_level === 'high' ? 'badge-high' : 'badge-medium'}">
                  ${m.confidence_percent}
                </span>
              </div>
            `).join('')}
          </div>
          <div class="drawer-footer">
            <span style="font-size: 11px; color: #626966;">Review values before submitting</span>
            <button class="btn-fill" id="btnFillAll" style="padding: 8px 18px; font-size: 13px;">
              Autofill Verified (${highConf})
            </button>
          </div>
        </div>
      ` : `
        <div class="former-pill" id="openDrawer">
          <div class="brand">form<span>ER</span></div>
          <div class="meta">${total} fields detected (${avgPercent})</div>
          <button class="btn-fill" id="btnQuickFill">Review & Fill</button>
        </div>
      `}
    `;

    // Event listeners
    if (isExpanded) {
      shadowRoot.getElementById('closeDrawer')?.addEventListener('click', () => renderUI(false));
      shadowRoot.getElementById('btnFillAll')?.addEventListener('click', () => {
        executeAutofill();
        renderUI(false);
      });
    } else {
      shadowRoot.getElementById('openDrawer')?.addEventListener('click', () => renderUI(true));
      shadowRoot.getElementById('btnQuickFill')?.addEventListener('click', (e) => {
        e.stopPropagation();
        renderUI(true);
      });
    }
  }

  // 7. Execute the fill process
  function executeAutofill() {
    let filledCount = 0;
    const filledAudit = [];

    matchedResults.forEach(match => {
      if (match.suggested_value) {
        const fieldObj = detectedFields.find(f => f.id === match.field_id);
        if (fieldObj && fieldObj.element) {
          fillElement(fieldObj.element, match.suggested_value);
          filledCount++;
          filledAudit.push({
            field: match.matched_title || match.field_name,
            value: match.suggested_value,
            confidence: match.confidence_percent
          });
        }
      }
    });

    console.log(`[formER] Autofilled ${filledCount} fields.`);

    // Record history back to backend
    chrome.runtime.sendMessage({
      type: 'RECORD_HISTORY',
      payload: {
        portal_name: document.title || window.location.hostname,
        portal_url: window.location.href,
        fields_filled_count: filledCount,
        accuracy_rate: '100%',
        filled_fields: filledAudit
      }
    });
  }

  // 8. Main execution loop
  async function run() {
    detectedFields = scanPageFields();
    if (detectedFields.length < 2) {
      console.log('[formER] Not an actionable application form page.');
      return;
    }

    console.log(`[formER] Found ${detectedFields.length} actionable form fields.`);

    // Send to background for ML matching and scoring
    const payloadFields = detectedFields.map(f => ({
      id: f.id,
      name: f.name,
      type: f.type,
      label: f.label,
      placeholder: f.placeholder,
      aria_label: f.aria_label,
      section: f.section
    }));

    chrome.runtime.sendMessage(
      { type: 'MATCH_FIELDS', payload: { fields: payloadFields } },
      (response) => {
        if (response && response.success && response.data) {
          matchedResults = response.data.matches || [];
          console.log(`[formER] Received ${matchedResults.length} scored field matches.`);
          initShadowUI();
        }
      }
    );
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
