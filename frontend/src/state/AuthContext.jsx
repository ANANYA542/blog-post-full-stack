import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api.js'
import { getToken, setToken, clearToken } from '../utils/storage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => clearToken())
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    navigate('/')
  }

  const signup = async (payload) => {
    const { data } = await api.post('/auth/signup', payload)
    setToken(data.token)
    setUser(data.user)
    navigate('/')
  }

  const logout = () => {
    clearToken()
    setUser(null)
    navigate('/login')
  }

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
