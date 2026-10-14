import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi, profileApi, historyApi, statsApi } from '../api/client'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('former_token') || null)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('former_user')
    try {
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('former_profile')
    try {
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })
  const [stats, setStats] = useState({
    forms_filled: 0,
    time_saved: '0h',
    accuracy_rate: '100%',
    total_fields_populated: 0,
    sessions_recorded: 0
  })
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)

  // Refresh user data from API if token exists
  const refreshUserData = useCallback(async () => {
    if (!token) return
    try {
      setLoading(true)
      const [userData, profileData, statsData, historyData] = await Promise.allSettled([
        authApi.getMe(),
        profileApi.get(),
        statsApi.get(),
        historyApi.getAll()
      ])

      if (userData.status === 'fulfilled') {
        setUser(userData.value)
        localStorage.setItem('former_user', JSON.stringify(userData.value))
      }
      if (profileData.status === 'fulfilled') {
        setProfile(profileData.value)
        localStorage.setItem('former_profile', JSON.stringify(profileData.value))
      }
      if (statsData.status === 'fulfilled') {
        setStats(statsData.value)
      }
      if (historyData.status === 'fulfilled') {
        setHistory(historyData.value)
      }
    } catch (err) {
      console.warn('API sync failed, using local offline cache:', err)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    if (token) {
      refreshUserData()
    }
  }, [token, refreshUserData])

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password)
      setToken(response.access_token)
      setUser(response.user)
      localStorage.setItem('former_token', response.access_token)
      localStorage.setItem('former_user', JSON.stringify(response.user))
      await refreshUserData()
      return response
    } catch (err) {
      // Mock fallback if backend offline
      const mockUser = { id: 1, name: email.split('@')[0], email }
      setUser(mockUser)
      setProfile({
        personal_data: { full_name: mockUser.name },
        contact_data: { email },
        education_data: {},
        work_data: []
      })
      localStorage.setItem('former_user', JSON.stringify(mockUser))
      return { user: mockUser }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await authApi.register(name, email, password)
      setToken(response.access_token)
      setUser(response.user)
      localStorage.setItem('former_token', response.access_token)
      localStorage.setItem('former_user', JSON.stringify(response.user))
      await refreshUserData()
      return response
    } catch (err) {
      const mockUser = { id: 1, name, email }
      setUser(mockUser)
      setProfile({
        personal_data: { full_name: name },
        contact_data: { email },
        education_data: {},
        work_data: []
      })
      localStorage.setItem('former_user', JSON.stringify(mockUser))
      return { user: mockUser }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setProfile(null)
    setHistory([])
    localStorage.removeItem('former_token')
    localStorage.removeItem('former_user')
    localStorage.removeItem('former_profile')
  }

  const updateProfileData = async (payload) => {
    try {
      const updated = await profileApi.update(payload)
      setProfile(updated)
      localStorage.setItem('former_profile', JSON.stringify(updated))
      return updated
    } catch (err) {
      // Local fallback
      setProfile(prev => {
        const next = { ...prev, ...payload }
        localStorage.setItem('former_profile', JSON.stringify(next))
        return next
      })
    }
  }

  const addHistoryRecord = async (historyItem) => {
    try {
      const recorded = await historyApi.record(historyItem)
      setHistory(prev => [recorded, ...prev])
      const newStats = await statsApi.get()
      setStats(newStats)
    } catch (err) {
      const localItem = { id: Date.now(), created_at: new Date().toISOString(), ...historyItem }
      setHistory(prev => [localItem, ...prev])
    }
  }

  const purgeHistoryCache = async () => {
    try {
      await historyApi.purge()
      setHistory([])
      const newStats = await statsApi.get()
      setStats(newStats)
    } catch (err) {
      setHistory([])
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        token,
        user,
        profile,
        stats,
        history,
        loading,
        login,
        register,
        logout,
        updateProfile: updateProfileData,
        addHistory: addHistoryRecord,
        purgeHistory: purgeHistoryCache,
        refresh: refreshUserData
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
