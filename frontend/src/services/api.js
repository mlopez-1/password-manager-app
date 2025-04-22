import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // Auth
  login(credentials) {
    return api.post('/auth/login', credentials)
  },
  register(userData) {
    return api.post('/auth/register', userData)
  },
  
  // Passwords
  getPasswords() {
    return api.get('/passwords')
  },
  addPassword(passwordData) {
    return api.post('/passwords', passwordData)
  },
  updatePassword(id, passwordData) {
    return api.put(`/passwords/${id}`, passwordData)
  },
  deletePassword(id) {
    return api.delete(`/passwords/${id}`)
  },
  decryptPassword(id) {
    return api.get(`/passwords/${id}/decrypt`)
  }
}