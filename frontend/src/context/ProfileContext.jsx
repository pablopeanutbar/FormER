import { createContext, useContext, useState, useEffect } from 'react'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('former_profile')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return null
      }
    }
    return null
  })

  useEffect(() => {
    if (profile) {
      localStorage.setItem('former_profile', JSON.stringify(profile))
    } else {
      localStorage.removeItem('former_profile')
    }
  }, [profile])

  const login = (userData) => {
    setProfile({
      ...userData,
      formsFilled: 0,
      timeSaved: '0h',
      accuracy: '100%',
      history: []
    })
  }

  const logout = () => {
    setProfile(null)
  }

  const updateProfile = (data) => {
    setProfile(prev => ({ ...prev, ...data }))
  }

  const addHistory = (item) => {
    setProfile(prev => ({
      ...prev,
      formsFilled: (prev.formsFilled || 0) + 1,
      history: [
        { id: Date.now(), ...item },
        ...(prev.history || [])
      ]
    }))
  }

  return (
    <ProfileContext.Provider value={{ profile, login, logout, updateProfile, addHistory }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
