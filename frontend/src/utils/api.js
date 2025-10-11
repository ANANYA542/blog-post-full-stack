import axios from 'axios'
import { getToken, clearToken } from './storage.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      clearToken()
      // optional: redirect via location to login
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
