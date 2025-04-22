import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await api.login(credentials)
      user.value = response.data.user
      localStorage.setItem('authToken', response.data.token)
      router.push('/dashboard')
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      const response = await api.register(userData)
      user.value = response.data.user
      localStorage.setItem('authToken', response.data.token)
      router.push('/dashboard')
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('authToken')
    router.push('/')
  }

  return { user, loading, error, login, register, logout}
})