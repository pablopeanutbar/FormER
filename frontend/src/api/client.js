const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

function getHeaders() {
  const token = localStorage.getItem('former_token')
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const config = {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {})
    }
  }

  try {
    const res = await fetch(url, config)
    if (!res.ok) {
      let errDetail = 'Request failed'
      try {
        const errorJson = await res.json()
        errDetail = errorJson.detail || errorJson.message || errDetail
      } catch (e) {
        // use fallback string
      }
      throw new Error(errDetail)
    }
    return await res.json()
  } catch (err) {
    console.warn(`[formER API Error] ${endpoint}:`, err.message)
    throw err
  }
}

export const authApi = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  register: (name, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    }),
  getMe: () => request('/auth/me')
}

export const profileApi = {
  get: () => request('/profile'),
  update: (data) =>
    request('/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  getFlattened: () => request('/profile/flattened'),
  export: () => request('/profile/export')
}

export const historyApi = {
  getAll: () => request('/history'),
  record: (item) =>
    request('/history', {
      method: 'POST',
      body: JSON.stringify(item)
    }),
  purge: () =>
    request('/history/purge', {
      method: 'DELETE'
    })
}

export const statsApi = {
  get: () => request('/stats')
}

export const issuesApi = {
  submit: (issueData) =>
    request('/issues', {
      method: 'POST',
      body: JSON.stringify(issueData)
    })
}
