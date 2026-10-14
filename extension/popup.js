document.addEventListener('DOMContentLoaded', async () => {
  const vaultStatus = document.getElementById('vaultStatus');
  const btnScan = document.getElementById('btnScanPage');

  try {
    const { former_vault } = await chrome.storage.local.get('former_vault');
    if (former_vault) {
      const keysCount = Object.keys(former_vault).length;
      vaultStatus.textContent = `Active (${keysCount} attributes)`;
    }
  } catch (err) {
    vaultStatus.textContent = 'Active (Default Vault)';
  }

  btnScan.addEventListener('click', async () => {
    btnScan.textContent = 'Inspecting form...';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const pill = document.querySelector('#former-assistant-root');
          if (pill && pill.shadowRoot) {
            const btn = pill.shadowRoot.querySelector('#openDrawer') || pill.shadowRoot.querySelector('#btnQuickFill');
            if (btn) btn.click();
          }
        }
      });
      setTimeout(() => {
        window.close();
      }, 300);
    }
  });
});
